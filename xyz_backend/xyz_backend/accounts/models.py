from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class EmployeeManager(BaseUserManager):
    use_in_migrations = True

    def _create(self, username, email, password, **extra):
        if not username:
            raise ValueError("Username is required")
        if not email:
            raise ValueError("Email is required")
        user = self.model(username=username, email=self.normalize_email(email), **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password=None, **extra):
        extra.setdefault("is_staff", False)
        extra.setdefault("is_superuser", False)
        extra.setdefault("role", Employee.Role.EMPLOYEE)
        return self._create(username, email, password, **extra)

    def create_superuser(self, username, email, password=None, **extra):
        extra.setdefault("is_staff", True)
        extra.setdefault("is_superuser", True)
        extra.setdefault("role", Employee.Role.SUPER_ADMIN)
        return self._create(username, email, password, **extra)


class Employee(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        SUPER_ADMIN = "super_admin", "Super Admin"
        ADMIN = "admin", "HR / Admin"
        TRAINER = "trainer", "Trainer"
        EMPLOYEE = "employee", "Employee"

    # Login identity
    username = models.CharField(max_length=60, unique=True)
    email = models.EmailField(unique=True)

    # Employee details
    employee_id = models.CharField(max_length=20, unique=True, blank=True)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=80, blank=True)
    designation = models.CharField(max_length=80, blank=True)
    photo = models.ImageField(upload_to="employee_photos/", blank=True, null=True)
    joining_date = models.DateField(default=timezone.localdate)

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.EMPLOYEE)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # access to Django admin site
    date_created = models.DateTimeField(auto_now_add=True)

    objects = EmployeeManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        ordering = ["first_name", "last_name"]

    def save(self, *args, **kwargs):
        if not self.employee_id:
            last = Employee.objects.order_by("-id").values_list("id", flat=True).first() or 0
            self.employee_id = f"EMP{last + 1:04d}"
            while Employee.objects.filter(employee_id=self.employee_id).exists():
                last += 1
                self.employee_id = f"EMP{last + 1:04d}"
        super().save(*args, **kwargs)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def is_admin_role(self):
        return self.role in (self.Role.SUPER_ADMIN, self.Role.ADMIN)

    def __str__(self):
        return f"{self.full_name} ({self.employee_id})"
