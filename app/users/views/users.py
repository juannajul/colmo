# Django rest framework
from rest_framework import permissions
from rest_framework import mixins, viewsets, status
from rest_framework import views
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import login, logout

from users.models.users import User
# Serializers
from users.serializers.users import LoginSerializer, UserSignUpSerializer, UserModelSerializer

# Permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated

class UserViewset(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """User view set.

    Handle sign up, login and account verification.
    """
    queryset = User.objects.filter(is_active=True)
    #serializer_class = UserModelSerializer
    lookup_field = 'username'

    def get_permissions(self):
        if self.action == 'signup':
            permissions = [AllowAny]
        if self.action == 'login':
            permissions = [AllowAny]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        """Return serializer based on actions"""
        if self.action == 'login':
            return LoginSerializer
        if self.action == 'signup':
            return UserSignUpSerializer
        return UserModelSerializer
        
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        msg = "Successfully logged in."
        return Response(msg, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def signup(self, request, *args, **kwargs):
        """Sign up user."""
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        """Logout user."""
        logout(request)
        msg = "Successfully logged out."
        return Response(msg, status=status.HTTP_200_OK)