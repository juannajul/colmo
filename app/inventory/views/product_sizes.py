"""Product sizes views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Serializers
from inventory.serializers.product_sizes import ProductSizesModelSerializer

# Models 
from inventory.models.products import ProductSizes

class ProductSizesViewSet(
    mixins.ListModelMixin,
    mixins. UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Product sizes view set"""

    queryset = ProductSizes.objects.all()
    serializer_class = ProductSizesModelSerializer

