from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    """Read/write serializer used by admins to manage employees."""

    password = serializers.CharField(write_only=True, required=False, style={"input_type": "password"})
    full_name = serializers.CharField(read_only=True)
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            "id", "employee_id", "username", "email", "password",
            "first_name", "last_name", "full_name", "phone",
            "department", "designation", "joining_date",
            "role", "is_active", "photo", "photo_url", "date_created",
        ]
        read_only_fields = ["id", "date_created", "full_name", "photo_url"]
        extra_kwargs = {"photo": {"write_only": True, "required": False}, "employee_id": {"required": False}}

    def get_photo_url(self, obj):
        if not obj.photo:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url

    def validate_role(self, value):
        request = self.context.get("request")
        if request and value == Employee.Role.SUPER_ADMIN and request.user.role != Employee.Role.SUPER_ADMIN:
            raise serializers.ValidationError("Only a super admin can assign the super admin role.")
        return value

    def validate_email(self, value):
        return value.strip().lower()

    def validate(self, attrs):
        if self.instance is None and not attrs.get("password"):
            raise serializers.ValidationError({"password": "A password is required for new employees."})
        if attrs.get("password"):
            validate_password(attrs["password"], self.instance)
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Employee(**validated_data)
        user.set_password(password)
        if user.role == Employee.Role.SUPER_ADMIN:
            user.is_staff = True
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class ProfileSerializer(serializers.ModelSerializer):
    """What a logged-in employee sees about themselves; limited fields are editable."""

    full_name = serializers.CharField(read_only=True)
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            "id", "employee_id", "username", "email", "first_name", "last_name",
            "full_name", "phone", "department", "designation", "joining_date",
            "role", "photo", "photo_url",
        ]
        read_only_fields = [
            "id", "employee_id", "username", "email", "department", "designation",
            "joining_date", "role", "full_name", "photo_url",
        ]
        extra_kwargs = {"photo": {"write_only": True, "required": False}}

    def get_photo_url(self, obj):
        if not obj.photo:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url


class LoginSerializer(serializers.Serializer):
    # Your login form's field is labelled "Email Address" but also holds "super_admin",
    # so accept it under any of these names.
    identifier = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True)
    remember_me = serializers.BooleanField(required=False, default=False)

    def validate(self, attrs):
        ident = attrs.get("identifier") or attrs.get("username") or attrs.get("email")
        if not ident:
            raise serializers.ValidationError("Enter your email or username.")
        attrs["identifier"] = ident
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_new_password(self, value):
        validate_password(value, self.context["request"].user)
        return value
