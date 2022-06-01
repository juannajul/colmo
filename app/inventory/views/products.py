"""Product view set."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Serializers
from inventory.serializers.products import ProductModelSerializer

# Models 
from inventory.models.products import Product



class ProductViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Product view set"""

    queryset = Product.objects.all()
    serializer_class = ProductModelSerializer
    lookup_field = 'slug'

