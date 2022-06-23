"""Product view set."""

# Django rest framework
from multiprocessing import context
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

# Serializers
from inventory.serializers.products import ProductModelSerializer

# Models 
from inventory.models.products import Product, Brand

# Permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from inventory.premissions.brands import IsBrandOwner

# Serializers
from inventory.serializers.products import CreateProductSerializer


class ProductViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Product view set"""

    queryset = Product.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        """Return serializer based on actions"""
        if self.action == 'create':
            return CreateProductSerializer
        return ProductModelSerializer

    """
    def get_permissions(self):
        permissions = [IsAuthenticatedOrReadOnly]
        if self.action in ['update', 'partial_update', 'destroy']:
            permissions.append(IsBrandOwner)
        return [p() for p in permissions]
        """
