import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.db.models import Q
from django.utils import timezone
from django.utils.text import slugify


class Course(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=80, unique=True, null=True, blank=True,
                            help_text="Used in page URLs, e.g. python-fundamentals. Auto-filled from the title.")
    description = models.TextField(blank=True)
    trainer = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL,
        related_name="courses_taught", limit_choices_to={"role": "trainer"},
    )
    trainer_name = models.CharField(max_length=80, blank=True,
                                    help_text="Name shown on the course, e.g. 'Mr. Aravind'. Leave blank to use the trainer account name.")
    duration_weeks = models.PositiveSmallIntegerField(default=1)
    meta = models.CharField(max_length=60, blank=True, help_text="Short line such as '8 Modules · 6h 30m'")
    banner_key = models.CharField(max_length=40, blank=True,
                                  help_text="Which banner image the website shows: python, react, sql, communication, excel, time, leadership, presentation")
    banner_icon = models.CharField(max_length=8, blank=True)
    rating = models.CharField(max_length=6, default="4.5")
    level = models.CharField(max_length=20, default="Beginner")
    certificate_available = models.BooleanField(default=True)
    category = models.CharField(max_length=60, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["title"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)[:70] or "course"
            slug, n = base, 2
            while Course.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug, n = f"{base}-{n}", n + 1
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def trainer_display(self):
        if self.trainer_name:
            return self.trainer_name
        return self.trainer.full_name if self.trainer else ""

    def __str__(self):
        return self.title


class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="modules")
    order = models.PositiveSmallIntegerField(default=1)
    slug = models.CharField(max_length=20, blank=True, help_text="e.g. m1. Auto-filled from the order.")
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    video_url = models.URLField(blank=True, help_text="YouTube embed link, e.g. https://www.youtube.com/embed/xxxx")
    notes = models.TextField(blank=True)
    notes_size = models.CharField(max_length=20, blank=True)
    estimated_time = models.CharField(max_length=30, blank=True)
    difficulty = models.CharField(max_length=20, default="Beginner")
    objectives = models.JSONField(default=list, blank=True, help_text='List of text lines, e.g. ["Learn A", "Learn B"]')
    due_after_days = models.PositiveSmallIntegerField(
        default=7, help_text="Assignment deadline = enrollment date + this many days")

    assignment_title = models.CharField(max_length=150, blank=True)
    assignment_description = models.TextField(blank=True)
    assignment_tasks = models.JSONField(default=list, blank=True, help_text='List of text lines')
    assignment_estimated_time = models.CharField(max_length=30, blank=True)
    assignment_difficulty = models.CharField(max_length=20, default="Easy", help_text="Easy, Medium or Advanced")

    class Meta:
        ordering = ["course", "order"]
        constraints = [models.UniqueConstraint(fields=["course", "slug"], name="unique_module_slug_per_course")]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = f"m{self.order}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.course.title} - {self.title}"


PRIORITY_BY_DIFFICULTY = {"Easy": "Low", "Medium": "Medium", "Advanced": "High"}


class Enrollment(models.Model):
    class Status(models.TextChoices):
        NOT_STARTED = "not_started", "Not started"
        IN_PROGRESS = "in_progress", "In progress"
        COMPLETED = "completed", "Completed"

    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="enrollments")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments")
    progress = models.PositiveSmallIntegerField(default=0)  # 0-100, recalculated from completed modules
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NOT_STARTED)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ("employee", "course")
        ordering = ["-enrolled_at"]

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        self.progress = max(0, min(100, self.progress))
        if self.progress >= 100:
            self.status = self.Status.COMPLETED
            self.completed_at = self.completed_at or timezone.now()
        elif self.progress > 0:
            self.status = self.Status.IN_PROGRESS
            self.completed_at = None
        super().save(*args, **kwargs)
        if self.status == self.Status.COMPLETED and self.course.certificate_available:
            Certificate.objects.get_or_create(employee=self.employee, course=self.course)
        if is_new:
            self.create_tasks()

    def recalculate_progress(self):
        """Progress = completed modules / total modules."""
        total = self.course.modules.count()
        if total:
            done = self.module_progress.filter(module__course=self.course).count()
            self.progress = round(done * 100 / total)
        self.save()

    def create_tasks(self):
        """One task per module assignment, with deadlines counted from the enrollment date."""
        start = timezone.localtime(self.enrolled_at).date()
        for m in self.course.modules.exclude(assignment_title=""):
            Task.objects.get_or_create(
                employee=self.employee, course=self.course, module=m,
                defaults=dict(
                    title=m.assignment_title,
                    description=m.assignment_description,
                    due_date=start + timedelta(days=m.due_after_days),
                    priority=PRIORITY_BY_DIFFICULTY.get(m.assignment_difficulty, "Medium"),
                    estimated_time=m.assignment_estimated_time,
                ),
            )

    def __str__(self):
        return f"{self.employee.username} - {self.course.title} ({self.progress}%)"


class ModuleProgress(models.Model):
    """A module an employee has completed."""

    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name="module_progress")
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="completions")
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("enrollment", "module")

    def __str__(self):
        return f"{self.enrollment.employee.username} completed {self.module}"


class Task(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        COMPLETED = "completed", "Completed"

    class TaskType(models.TextChoices):
        ASSIGNMENT = "Assignment", "Assignment"
        QUIZ = "Quiz", "Quiz"
        PROJECT = "Project", "Project"
        READING = "Reading", "Reading"

    class Priority(models.TextChoices):
        HIGH = "High", "High"
        MEDIUM = "Medium", "Medium"
        LOW = "Low", "Low"

    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tasks")
    course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.SET_NULL, related_name="tasks")
    module = models.ForeignKey(Module, null=True, blank=True, on_delete=models.SET_NULL, related_name="tasks")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    task_type = models.CharField(max_length=20, choices=TaskType.choices, default=TaskType.ASSIGNMENT)
    priority = models.CharField(max_length=10, choices=Priority.choices, default=Priority.MEDIUM)
    estimated_time = models.CharField(max_length=30, blank=True)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    submission = models.TextField(blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["due_date", "-created_at"]
        constraints = [
            models.UniqueConstraint(fields=["employee", "module"], condition=Q(module__isnull=False),
                                    name="one_task_per_employee_module"),
        ]

    @property
    def display_status(self):
        """pending / completed / overdue - overdue is worked out from the due date."""
        if self.status == self.Status.COMPLETED:
            return "completed"
        if self.due_date and self.due_date < timezone.localdate():
            return "overdue"
        return "pending"

    def mark_completed(self, submission=""):
        self.status = self.Status.COMPLETED
        self.submission = (submission or "Submitted")[:5000]
        self.completed_at = timezone.now()
        self.save(update_fields=["status", "submission", "completed_at"])

    def __str__(self):
        return self.title


class Certificate(models.Model):
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="certificates")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="certificates")
    certificate_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    issued_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("employee", "course")
        ordering = ["-issued_at"]

    def __str__(self):
        return f"Certificate: {self.employee.username} - {self.course.title}"


class LiveSession(models.Model):
    title = models.CharField(max_length=150)
    session_type = models.CharField(max_length=60, default="Live Session")
    course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.SET_NULL, related_name="sessions")
    start = models.DateTimeField()
    end = models.DateTimeField()
    join_url = models.URLField(blank=True)
    # Empty attendees = open to everyone enrolled in the course (or everyone if no course).
    attendees = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="sessions")

    class Meta:
        ordering = ["start"]

    def __str__(self):
        return self.title


class Notification(models.Model):
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications")
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.message


class ContactMessage(models.Model):
    """Submissions from the public Contact Us form."""

    name = models.CharField(max_length=120)
    work_email = models.EmailField()
    company = models.CharField(max_length=150, blank=True)
    message = models.TextField(max_length=3000)
    created_at = models.DateTimeField(auto_now_add=True)
    handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.work_email}>"
