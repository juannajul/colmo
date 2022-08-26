from django.contrib.auth import authenticate, password_validation

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from users.models import User

class UserModelSerializer(serializers.ModelSerializer): # porque cuando llamas a serializer sin data solo una data no sabe que llamar pq no definimos campos
    """User model serializer."""

    class Meta:
        """Meta class."""
        #definir atributos del serializer
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
        )

class LoginSerializer(serializers.Serializer):
    """User authentication serializer.
    fields for authentication :
    email, password
    """

    class Meta:
        model = User
        fields = '__all__'

    email = serializers.EmailField(
        label='Email',
        write_only=True
    )
    password = serializers.CharField(
        label='Password',
        write_only=True,
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, data):
        """Validate user credentials."""
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                msg = 'Unable to authenticate with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')
        data['user'] = user
        return data

class UserSignUpSerializer(serializers.Serializer):
    """User sign up serializer.
    """

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        min_length=4,
        max_length=20,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, max_length=64)
    password_confirmation = serializers.CharField(min_length=8, max_length=64)
    first_name = serializers.CharField(min_length=2, max_length=30)
    last_name = serializers.CharField(min_length=2, max_length=30)
    
    def validate(self, data):
        """Verify password match."""
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError('Passwords dont match.')
        password_validation.validate_password(passwd)
        return data
    
    def create(self, data):
        """Handle user and prifle creation."""
        data.pop('password_confirmation') # delete password confirmation from data
        user = User.objects.create_user(**data, is_brand=False, is_active=True)
        return user
