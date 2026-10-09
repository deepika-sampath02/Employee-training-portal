from django.db.models import Avg, Q
from django.utils import timezone
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import SAFE_METHODS, AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from accounts.permissions import IsAdminRole
from accounts.serializers import ProfileSerializer

from .models import Certificate, ContactMessage, Course, Enrollment, LiveSession, Notification, Task
from .serializers import (
    CertificateSerializer,
    ContactMessageSerializer,
    CourseSerializer,
    EnrollmentSerializer,
    LiveSessionSerializer,
    NotificationSerializer,
    TaskSerializer,
)


class AdminWriteOrPublicRead(BasePermission):
    """Anyone can read (public Courses page); only admins can change."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        u = request.user
        return bool(u and u.is_authenticated and u.is_admin_role)


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [AdminWriteOrPublicRead]

    def get_queryset(self):
        qs = Course.objects.select_related("trainer").prefetch_related("modules")
        u = self.request.user
        if not (u.is_authenticated and u.is_admin_role):
            qs = qs.filter(is_active=True)
        return qs


class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer

    def get_permissions(self):
        # Employees may only read their own enrollments and update their own progress.
        if self.action in ("create", "destroy", "update"):
            return [IsAdminRole()]
        return super().get_permissions()

    def get_queryset(self):
        qs = Enrollment.objects.select_related("employee", "course", "course__trainer")
        u = self.request.user
        if u.is_admin_role:
            if emp := self.request.query_params.get("employee"):
                qs = qs.filter(employee_id=emp)
            return qs
        return qs.filter(employee=u)

    def partial_update(self, request, *args, **kwargs):
        enrollment = self.get_object()
        if not request.user.is_admin_role:
            # Employees can only move their own progress forward - nothing else.
            try:
                new = int(request.data.get("progress"))
            except (TypeError, ValueError):
                return Response({"progress": "A number from 0 to 100 is required."}, status=400)
            enrollment.progress = max(enrollment.progress, min(100, new))
            enrollment.save()
            return Response(self.get_serializer(enrollment).data)
        return super().partial_update(request, *args, **kwargs)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_permissions(self):
        if self.action in ("create", "destroy", "update"):
            return [IsAdminRole()]
        return super().get_permissions()

    def get_queryset(self):
        qs = Task.objects.select_related("course")
        u = self.request.user
        if u.is_admin_role:
            if emp := self.request.query_params.get("employee"):
                qs = qs.filter(employee_id=emp)
            return qs
        return qs.filter(employee=u)

    def partial_update(self, request, *args, **kwargs):
        if not request.user.is_admin_role:
            raise PermissionDenied("Employees submit tasks through /api/my-tasks/<id>/submit/.")
        return super().partial_update(request, *args, **kwargs)


class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CertificateSerializer

    def get_queryset(self):
        qs = Certificate.objects.select_related("employee", "course")
        return qs if self.request.user.is_admin_role else qs.filter(employee=self.request.user)


def sessions_for(user):
    """Upcoming sessions the user is invited to or enrolled in the course of."""
    enrolled = Enrollment.objects.filter(employee=user).values_list("course_id", flat=True)
    return (
        LiveSession.objects.filter(end__gte=timezone.now())
        .filter(Q(attendees=user) | Q(course_id__in=enrolled) | Q(course__isnull=True, attendees__isnull=True))
        .distinct()
    )


class LiveSessionViewSet(viewsets.ModelViewSet):
    serializer_class = LiveSessionSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsAdminRole()]
        return super().get_permissions()

    def get_queryset(self):
        u = self.request.user
        return LiveSession.objects.all() if u.is_admin_role else sessions_for(u)


class NotificationViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = NotificationSerializer
    http_method_names = ["get", "patch", "post", "head", "options"]

    def get_queryset(self):
        return Notification.objects.filter(employee=self.request.user)

    @action(detail=False, methods=["post"], url_path="mark-all-read")
    def mark_all_read(self, request):
        self.get_queryset().update(is_read=True)
        return Response({"detail": "All notifications marked as read."})


class DashboardView(APIView):
    """Everything the employee dashboard page needs in one call."""

    def get(self, request):
        user = request.user
        enrollments = Enrollment.objects.filter(employee=user).select_related("course", "course__trainer")
        tasks_pending = Task.objects.filter(employee=user).exclude(status=Task.Status.COMPLETED).count()
        avg = enrollments.aggregate(a=Avg("progress"))["a"] or 0
        return Response(
            {
                "user": ProfileSerializer(user, context={"request": request}).data,
                "stats": {
                    "my_courses": enrollments.count(),
                    "my_tasks": tasks_pending,
                    "completed": Certificate.objects.filter(employee=user).count(),
                    "average_progress": round(avg),
                },
                "courses": EnrollmentSerializer(enrollments[:5], many=True).data,
                "upcoming_sessions": LiveSessionSerializer(sessions_for(user)[:5], many=True).data,
                "unread_notifications": Notification.objects.filter(employee=user, is_read=False).count(),
            }
        )


class ContactView(APIView):
    """Public Contact Us form."""

    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact"

    def post(self, request):
        ser = ContactMessageSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response({"detail": "Thanks! We'll get back to you within one business day."},
                        status=status.HTTP_201_CREATED)
