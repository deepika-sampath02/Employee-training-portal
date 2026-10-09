from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(UserAdmin):
    list_display = ("employee_id", "username", "full_name", "email", "department", "role", "is_active")
    list_filter = ("role", "department", "is_active")
    search_fields = ("employee_id", "username", "email", "first_name", "last_name")
    ordering = ("employee_id",)

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Employee details", {"fields": ("employee_id", "first_name", "last_name", "email", "phone",
                                         "department", "designation", "joining_date", "photo")}),
        ("Access", {"fields": ("role", "is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("username", "email", "first_name", "last_name",
                                                  "role", "password1", "password2")}),
    )
