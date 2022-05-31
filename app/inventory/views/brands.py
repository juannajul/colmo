"""Product sizes views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Serializers
from inventory.serializers.brands import BrandModelSerializer, CreateBrandSerializer

# Models 
from inventory.models.products import Brand

# Permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from inventory.premissions.brands import IsBrandOwner

class BrandViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Brands view set"""

    queryset = Brand.objects.all()

    def get_serializer_class(self):
        """Return serializer based on actions"""
        if self.action == 'create':
            return CreateBrandSerializer
        return BrandModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticatedOrReadOnly]
        if self.action in ['update', 'partial_update', 'destroy']:
            permissions.append(IsBrandOwner)
        return [p() for p in permissions]

