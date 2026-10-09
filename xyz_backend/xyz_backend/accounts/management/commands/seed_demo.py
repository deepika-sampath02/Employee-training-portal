import json
from datetime import timedelta
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone

from accounts.models import Employee
from learning.models import Course, Enrollment, LiveSession, Module, ModuleProgress, Notification, Task

CATALOG = Path(__file__).resolve().parents[3] / "learning" / "catalog.json"
MODULE_FIELDS = [
    "title", "description", "video_url", "notes", "notes_size", "estimated_time", "difficulty",
    "objectives", "due_after_days", "assignment_title", "assignment_description", "assignment_tasks",
    "assignment_estimated_time", "assignment_difficulty",
]


class Command(BaseCommand):
    help = (
        "Create the super_admin account, the course catalog, and demo employees with sample progress. "
        "Safe to re-run. Usage: python manage.py seed_demo --password 'YourStrongPass1!'"
    )

    def add_arguments(self, parser):
        parser.add_argument("--password", required=True, help="Password given to every NEW seeded account")
        parser.add_argument("--admin-email", default="super_admin@xyzacademy.com")
        parser.add_argument("--no-demo-data", action="store_true",
                            help="Only create super_admin and the course catalog (no demo employees)")

    def handle(self, *args, **opts):
        pw = opts["password"]
        if len(pw) < 8:
            raise CommandError("Use a password of at least 8 characters.")

        admin, created = Employee.objects.get_or_create(
            username="super_admin",
            defaults=dict(email=opts["admin_email"], first_name="Super", last_name="Admin",
                          role=Employee.Role.SUPER_ADMIN, is_staff=True, is_superuser=True,
                          department="Administration", designation="Super Administrator"),
        )
        if created:
            admin.set_password(pw)
            admin.save()
        self.stdout.write(f"super_admin: {'created' if created else 'already exists (password unchanged)'}")

        catalog = self.load_catalog()
        self.stdout.write(f"course catalog: {len(catalog)} courses loaded")

        if opts["no_demo_data"]:
            return

        def make(username, email, first, last, role, dept, desig):
            u, new = Employee.objects.get_or_create(
                username=username,
                defaults=dict(email=email, first_name=first, last_name=last, role=role,
                              department=dept, designation=desig),
            )
            if new:
                u.set_password(pw)
                u.save()
            return u

        make("aravind", "aravind@xyzacademy.com", "Aravind", "", "trainer", "Training", "Senior Trainer")
        deepika = make("deepika", "deepika@xyzacademy.com", "Deepika", "S.", "employee", "Engineering", "Software Developer")
        make("hr_admin", "hr@xyzacademy.com", "Priya", "Nair", "admin", "Human Resources", "HR Manager")

        # Give Deepika the same starting progress your original frontend demo data showed.
        for entry in catalog:
            course = Course.objects.get(slug=entry["slug"])
            enrollment, new = Enrollment.objects.get_or_create(employee=deepika, course=course)
            if enrollment.module_progress.exists():
                continue  # already has progress, leave it alone
            enrollment.create_tasks()  # safe to repeat; also covers enrollments from an older database
            for m in entry["modules"]:
                if m.get("demo_status") == "completed":
                    module = Module.objects.get(course=course, slug=m["slug"])
                    ModuleProgress.objects.get_or_create(enrollment=enrollment, module=module)
                    for t in Task.objects.filter(employee=deepika, module=module):
                        t.mark_completed("Submitted")
            enrollment.recalculate_progress()

        now = timezone.now()
        if not LiveSession.objects.exists():
            for i, (t, kind) in enumerate([("Python Q&A & Debugging", "Live Q&A Class"),
                                           ("React Live Workshop", "Interactive Live Session"),
                                           ("SQL Webinar: Joins", "Webinar"),
                                           ("Time Management Seminar", "Online Session")]):
                start = (now + timedelta(days=2 + i * 3)).replace(minute=0, second=0, microsecond=0)
                LiveSession.objects.create(title=t, session_type=kind, start=start,
                                           end=start + timedelta(hours=1, minutes=30))

        if not Notification.objects.filter(employee=deepika).exists():
            Notification.objects.create(employee=deepika, message="New assignment added: Loop Practice")
            Notification.objects.create(employee=deepika, message="Upcoming session: Python Q&A & Debugging")

        self.stdout.write(self.style.SUCCESS("Demo data ready. Logins: super_admin, hr_admin, aravind, deepika"))

    def load_catalog(self):
        catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
        for entry in catalog:
            course, _ = Course.objects.get_or_create(
                slug=entry["slug"],
                defaults=dict(
                    title=entry["title"], trainer_name=entry["trainer_name"], description=entry["description"],
                    duration_weeks=entry["duration_weeks"], meta=entry["meta"], banner_key=entry["banner_key"],
                    banner_icon=entry["banner_icon"], rating=entry["rating"], level=entry["level"],
                    certificate_available=entry["certificate_available"],
                ),
            )
            for m in entry["modules"]:
                Module.objects.get_or_create(
                    course=course, slug=m["slug"],
                    defaults=dict(order=m["order"], **{k: m[k] for k in MODULE_FIELDS}),
                )
        return catalog
