"""Product sizes views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Serializers
from inventory.serializers.product_sizes import ProductSizesModelSerializer, CreateProductSizesSerializer

# Models 
from inventory.models.products import ProductSizes

# Permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from inventory.premissions.brands import IsBrandOwner

class ProductSizesViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Product sizes view set"""

    queryset = ProductSizes.objects.all()

    def get_serializer_class(self):
        """Return serializer based on actions"""
        if self.action == 'create':
            return CreateProductSizesSerializer
        return ProductSizesModelSerializer


