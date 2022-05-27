"""Categories views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Serializers
from inventory.serializers.categories import CategoryModelSerializer

# Models 
from inventory.models.products import Category

class CategoryViewSet(mixins.ListModelMixin,
    mixins. UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Category view set"""

    queryset = Category.objects.all()
    serializer_class = CategoryModelSerializer
    lookup_field = 'slug'
