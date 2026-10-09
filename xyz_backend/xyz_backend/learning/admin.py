from django.contrib import admin

from .models import (
    Certificate, ContactMessage, Course, Enrollment, LiveSession, Module, ModuleProgress, Notification, Task,
)


class ModuleInline(admin.StackedInline):
    model = Module
    extra = 0
    ordering = ("order",)
    fieldsets = (
        (None, {"fields": ("order", "slug", "title", "description", "video_url", "notes", "notes_size",
                           "estimated_time", "difficulty", "objectives", "due_after_days")}),
        ("Assignment for this module", {"fields": ("assignment_title", "assignment_description", "assignment_tasks",
                                                    "assignment_estimated_time", "assignment_difficulty")}),
    )


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "trainer_name", "level", "duration_weeks", "is_active")
    list_filter = ("level", "is_active")
    search_fields = ("title", "slug")
    inlines = [ModuleInline]


class ModuleProgressInline(admin.TabularInline):
    model = ModuleProgress
    extra = 0


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("employee", "course", "progress", "status", "enrolled_at")
    list_filter = ("status", "course")
    search_fields = ("employee__username", "employee__first_name", "course__title")
    inlines = [ModuleProgressInline]


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "employee", "course", "priority", "due_date", "status")
    list_filter = ("status", "priority", "task_type", "course")
    search_fields = ("title", "employee__username")


admin.site.register(Certificate)
admin.site.register(LiveSession)
admin.site.register(Notification)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "work_email", "company", "created_at", "handled")
    list_filter = ("handled",)
