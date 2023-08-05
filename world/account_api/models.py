from typing import Any
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser
import uuid


# Create your models here.
class AccountManger(BaseUserManager):
    def create_account(
        self,
        username: str,
        email: str,
        password: str = None,
        image: str = None,
        is_staff=False,
        is_superuser=False,
        id: uuid = None,
    ) -> "Account":
        if not email:
            raise ValueError("Account must have an email")
        if not username:
            raise ValueError("Account must have a username")
        account = self.model(email=self.normalize_email(email))
        account.id = id
        account.username = username
        account.image = image
        account.set_password(password)
        account.is_active = True
        account.is_staff = is_staff
        account.is_superuser = is_superuser
        account.save()

        return account

    def create_superuser(
        self,
        username: str,
        email: str,
        password: str,
        image: str = None,
        id: uuid = None,
    ) -> "Account":
        account = self.create_account(
            id=id,
            username=username,
            email=email,
            password=password,
            image=image,
            is_staff=True,
            is_superuser=True,
        )
        account.save()

        return account


class Account(AbstractUser):
    username = models.CharField(max_length=255, unique=True, blank=False)
    email = models.EmailField(max_length=255, unique=True, blank=False)
    image = models.URLField(max_length=255, null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = AccountManger()

    def __str__(self):
        return self.email

    def has_module_perms(self, app_label):
        return True

    def has_perm(self, perm, obj=None):
        return True
