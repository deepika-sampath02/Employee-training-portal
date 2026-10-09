from rest_framework import serializers

from .models import Certificate, ContactMessage, Course, Enrollment, LiveSession, Notification, Task


class CourseSerializer(serializers.ModelSerializer):
    trainer_name_display = serializers.CharField(source="trainer_display", read_only=True)
    modules_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ["id", "slug", "title", "description", "trainer", "trainer_name", "trainer_name_display",
                  "modules_count", "duration_weeks", "meta", "banner_key", "banner_icon", "rating",
                  "level", "certificate_available", "category", "is_active"]
        read_only_fields = ["slug"]

    def get_modules_count(self, obj):
        return obj.modules.count()


class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)
    trainer_name = serializers.CharField(source="course.trainer_display", read_only=True)
    modules_count = serializers.SerializerMethodField()
    duration_weeks = serializers.IntegerField(source="course.duration_weeks", read_only=True)
    employee_name = serializers.CharField(source="employee.full_name", read_only=True)

    class Meta:
        model = Enrollment
        fields = ["id", "employee", "employee_name", "course", "course_title", "trainer_name",
                  "modules_count", "duration_weeks", "progress", "status", "enrolled_at", "completed_at"]
        read_only_fields = ["status", "enrolled_at", "completed_at"]

    def get_modules_count(self, obj):
        return obj.course.modules.count()


class TaskSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True, default=None)
    display_status = serializers.CharField(read_only=True)

    class Meta:
        model = Task
        fields = ["id", "employee", "course", "course_title", "module", "title", "description",
                  "task_type", "priority", "estimated_time", "due_date", "status", "display_status",
                  "submission"]
        read_only_fields = ["submission"]


class CertificateSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)
    employee_name = serializers.CharField(source="employee.full_name", read_only=True)

    class Meta:
        model = Certificate
        fields = ["id", "certificate_id", "employee", "employee_name", "course", "course_title", "issued_at"]


class LiveSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveSession
        fields = ["id", "title", "session_type", "course", "start", "end", "join_url"]


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["id", "message", "is_read", "created_at"]
        read_only_fields = ["message", "created_at"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "work_email", "company", "message"]
