from datetime import timedelta

from django.contrib.auth import authenticate
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Employee
from .permissions import IsAdminRole
from .serializers import (
    ChangePasswordSerializer,
    EmployeeSerializer,
    LoginSerializer,
    ProfileSerializer,
)


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "login"

    def post(self, request):
        ser = LoginSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        user = authenticate(
            request,
            username=ser.validated_data["identifier"],
            password=ser.validated_data["password"],
        )
        # Same message for unknown user / wrong password / deactivated account.
        if user is None:
            return Response(
                {"detail": "Invalid credentials or inactive account."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)
        if ser.validated_data["remember_me"]:
            refresh.set_exp(lifetime=timedelta(days=30))
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": ProfileSerializer(user, context={"request": request}).data,
            }
        )


class MeView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request):
        return Response(ProfileSerializer(request.user, context={"request": request}).data)

    def patch(self, request):
        ser = ProfileSerializer(request.user, data=request.data, partial=True, context={"request": request})
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ser.data)


class ChangePasswordView(APIView):
    def post(self, request):
        ser = ChangePasswordSerializer(data=request.data, context={"request": request})
        ser.is_valid(raise_exception=True)
        if not request.user.check_password(ser.validated_data["old_password"]):
            return Response({"old_password": "Current password is incorrect."}, status=400)
        request.user.set_password(ser.validated_data["new_password"])
        request.user.save()
        return Response({"detail": "Password updated."})


class EmployeeViewSet(viewsets.ModelViewSet):
    """Admin-only employee management: list, create, edit, deactivate, reset password."""

    serializer_class = EmployeeSerializer
    permission_classes = [IsAdminRole]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get_queryset(self):
        qs = Employee.objects.all()
        p = self.request.query_params
        if q := p.get("search"):
            from django.db.models import Q

            qs = qs.filter(
                Q(first_name__icontains=q) | Q(last_name__icontains=q)
                | Q(email__icontains=q) | Q(employee_id__icontains=q)
                | Q(username__icontains=q)
            )
        if role := p.get("role"):
            qs = qs.filter(role=role)
        if dept := p.get("department"):
            qs = qs.filter(department__iexact=dept)
        if p.get("active") in ("true", "false"):
            qs = qs.filter(is_active=p["active"] == "true")
        return qs

    def _guard_super_admin(self, target):
        """Only a super admin may modify another super admin."""
        if target.role == Employee.Role.SUPER_ADMIN and self.request.user.role != Employee.Role.SUPER_ADMIN:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied("Only a super admin can modify a super admin.")

    def perform_update(self, serializer):
        self._guard_super_admin(serializer.instance)
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        # Never hard-delete: it would erase training records. Deactivate instead.
        target = self.get_object()
        self._guard_super_admin(target)
        if target == request.user:
            return Response({"detail": "You cannot deactivate your own account."}, status=400)
        target.is_active = False
        target.save(update_fields=["is_active"])
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["post"])
    def activate(self, request, pk=None):
        target = self.get_object()
        target.is_active = True
        target.save(update_fields=["is_active"])
        return Response(self.get_serializer(target).data)

    @action(detail=True, methods=["post"], url_path="reset-password")
    def reset_password(self, request, pk=None):
        from django.contrib.auth.password_validation import validate_password

        target = self.get_object()
        self._guard_super_admin(target)
        pw = request.data.get("password", "")
        validate_password(pw, target)
        target.set_password(pw)
        target.save()
        return Response({"detail": "Password reset."})
