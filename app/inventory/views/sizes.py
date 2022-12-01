"""Product sizes views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Serializers
from inventory.serializers.sizes import SizesModelSerializer

# Models 
from inventory.models.products import Sizes

# Pagination
from inventory.custom_pagination import SizePagination

class SizesViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Sizes view set"""

    queryset = Sizes.objects.all()
    serializer_class = SizesModelSerializer
    pagination_class = SizePagination

