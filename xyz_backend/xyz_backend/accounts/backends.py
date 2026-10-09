from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class UsernameOrEmailBackend(ModelBackend):
    """Lets employees sign in with either their username (e.g. super_admin) or email."""

    def authenticate(self, request, username=None, password=None, **kwargs):
        if not username or not password:
            return None
        User = get_user_model()
        identifier = username.strip()
        prefix = identifier.split("@")[0] if "@" in identifier else identifier
        user = (
            User.objects.filter(username__iexact=identifier).first()
            or User.objects.filter(email__iexact=identifier).first()
            or User.objects.filter(employee_id__iexact=identifier).first()
            or User.objects.filter(username__iexact=prefix).first()
            or User.objects.filter(email__istartswith=identifier).first()
        )
        if user is None:
            # Run the hasher anyway so response time doesn't reveal whether the account exists.
            User().set_password(password)
            return None
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
