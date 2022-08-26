"""User models."""
from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """User model."""
    email = models.EmailField(
        'email adress',
        unique=True,
        error_messages={
            'unique': 'A user with that email already exists.'
        }
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    is_brand = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.username
