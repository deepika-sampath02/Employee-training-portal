from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .student_views import (
    CompleteModuleView,
    MyCoursesView,
    MyTasksView,
    SubmitByModuleView,
    SubmitTaskView,
)
from .views import (
    CertificateViewSet,
    ContactView,
    CourseViewSet,
    DashboardView,
    EnrollmentViewSet,
    LiveSessionViewSet,
    NotificationViewSet,
    TaskViewSet,
)

router = DefaultRouter()
router.register("courses", CourseViewSet, basename="course")
router.register("enrollments", EnrollmentViewSet, basename="enrollment")
router.register("tasks", TaskViewSet, basename="task")
router.register("certificates", CertificateViewSet, basename="certificate")
router.register("sessions", LiveSessionViewSet, basename="session")
router.register("notifications", NotificationViewSet, basename="notification")

urlpatterns = [
    path("dashboard/", DashboardView.as_view()),
    path("contact/", ContactView.as_view()),
    # Employee-facing, frontend-shaped data
    path("my-courses/", MyCoursesView.as_view()),
    path("my-courses/<slug:course_slug>/modules/<slug:module_slug>/complete/", CompleteModuleView.as_view()),
    path("my-tasks/", MyTasksView.as_view()),
    path("my-tasks/submit-by-module/", SubmitByModuleView.as_view()),
    path("my-tasks/<int:pk>/submit/", SubmitTaskView.as_view()),
    path("", include(router.urls)),
]
