"""Discount codes views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Serializers
from inventory.serializers.discount_codes import DiscountCodeModelSerializer

# Models 
from inventory.models.discount_codes import DiscountCode

class DiscountCodesViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Sizes view set"""

    queryset = DiscountCode.objects.all()
    serializer_class = DiscountCodeModelSerializer
    lookup_field = 'code'

