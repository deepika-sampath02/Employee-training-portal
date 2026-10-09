"""
Employee-facing endpoints. The JSON uses camelCase and the same shape as the frontend's old
coursesData / tasksdata files, so existing React pages keep working.
"""
from datetime import timedelta

from django.db import transaction
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Enrollment, ModuleProgress, Task


def fmt_day(d):
    return f"{d.day} {d.strftime('%B')}"


def enrollments_for(user):
    return (
        Enrollment.objects.filter(employee=user, course__is_active=True)
        .select_related("course", "course__trainer")
        .prefetch_related("course__modules", "module_progress")
        .order_by("enrolled_at", "id")
    )


def course_payload(enrollment):
    course = enrollment.course
    done_ids = {mp.module_id for mp in enrollment.module_progress.all()}
    enrolled_day = timezone.localtime(enrollment.enrolled_at).date()
    modules, current_taken = [], False
    for m in course.modules.all():
        if m.id in done_ids:
            status = "completed"
        elif not current_taken:
            status, current_taken = "current", True
        else:
            status = "locked"
        due = fmt_day(enrolled_day + timedelta(days=m.due_after_days))
        modules.append({
            "id": m.slug,
            "title": m.title,
            "description": m.description,
            "status": status,
            "videoUrl": m.video_url,
            "notes": m.notes,
            "notesSize": m.notes_size,
            "estimatedTime": m.estimated_time,
            "difficulty": m.difficulty,
            "objectives": m.objectives,
            "deadline": due,
            "assignment": {
                "title": m.assignment_title,
                "description": m.assignment_description,
                "tasks": m.assignment_tasks,
                "estimatedTime": m.assignment_estimated_time,
                "dueDate": due,
                "difficulty": m.assignment_difficulty,
            },
        })
    weeks = course.duration_weeks
    return {
        "id": course.slug,
        "title": course.title,
        "trainer": course.trainer_display,
        "duration": f"{weeks} Week{'s' if weeks != 1 else ''}",
        "meta": course.meta,
        "bannerKey": course.banner_key,
        "bannerIcon": course.banner_icon,
        "rating": course.rating,
        "level": course.level,
        "certificate": "Available" if course.certificate_available else "Not available",
        "description": course.description,
        "modules": modules,
    }


def task_payload(task):
    return {
        "id": str(task.id),
        "courseId": task.course.slug if task.course else None,
        "moduleId": task.module.slug if task.module else None,
        "title": task.title,
        "description": task.description,
        "type": task.task_type,
        "priority": task.priority,
        "status": task.display_status,
        "dueDate": fmt_day(task.due_date) if task.due_date else "No due date",
        "estimatedTime": task.estimated_time or "-",
        "submission": task.submission,
    }


class MyCoursesView(APIView):
    """Courses assigned to the logged-in employee, with that employee's own progress."""

    def get(self, request):
        return Response([course_payload(e) for e in enrollments_for(request.user)])


class CompleteModuleView(APIView):
    """Marks one module complete. Modules must be done in order."""

    def post(self, request, course_slug, module_slug):
        with transaction.atomic():
            enrollment = get_object_or_404(
                Enrollment.objects.select_related("course"), employee=request.user, course__slug=course_slug)
            modules = list(enrollment.course.modules.all())
            target = next((m for m in modules if m.slug == module_slug), None)
            if target is None:
                raise ValidationError({"detail": "Module not found."})
            done_ids = set(enrollment.module_progress.values_list("module_id", flat=True))
            if target.id not in done_ids:
                for m in modules:
                    if m.id == target.id:
                        break
                    if m.id not in done_ids:
                        raise ValidationError({"detail": "Complete the earlier modules first."})
                ModuleProgress.objects.get_or_create(enrollment=enrollment, module=target)
                enrollment.recalculate_progress()
        fresh = enrollments_for(request.user).get(pk=enrollment.pk)
        return Response(course_payload(fresh))


class MyTasksView(APIView):
    def get(self, request):
        tasks = Task.objects.filter(employee=request.user).select_related("course", "module")
        return Response([task_payload(t) for t in tasks])


class SubmitTaskView(APIView):
    def post(self, request, pk):
        task = get_object_or_404(Task.objects.select_related("course", "module"), pk=pk, employee=request.user)
        task.mark_completed(str(request.data.get("submission", "")))
        return Response(task_payload(task))


class SubmitByModuleView(APIView):
    """Completes this employee's task(s) for one course module."""

    def post(self, request):
        course_id = str(request.data.get("courseId", ""))
        module_id = str(request.data.get("moduleId", ""))
        submission = str(request.data.get("submission", ""))
        tasks = Task.objects.filter(employee=request.user, course__slug=course_id, module__slug=module_id)
        count = 0
        for t in tasks:
            t.mark_completed(submission)
            count += 1
        return Response({"updated": count})
