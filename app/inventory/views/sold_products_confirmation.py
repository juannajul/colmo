"""Sold product confirmation views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Serializers
from inventory.serializers.sold_products_confirmation import SoldProductConfirmationModelSerializer, CreateSoldProductConfirmationModelSerializer

# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend 
from rest_framework.pagination import PageNumberPagination

# Models 
from inventory.models.sold_confirmation import SoldProductConfirmation

class SoldProductConfirmationViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Sold product confirmation view set"""

    queryset = SoldProductConfirmation.objects.all()
    #serializer_class = SoldProductConfirmationModelSerializer

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    search_fields = ('sold_number_code',)
    oridering_fields = ('created_at',)

    def get_serializer_class(self):
        """Return serializer based on actions"""
        if self.action == 'create':
            return CreateSoldProductConfirmationModelSerializer
        return SoldProductConfirmationModelSerializer

    def list(self, request, *args, **kwargs):
        """List confirmations."""
        paginator = PageNumberPagination()
        paginator.page_size = 30
        products_confirmation = self.filter_queryset(self.get_queryset())
        result_page = paginator.paginate_queryset(products_confirmation, request)
        serializer = SoldProductConfirmationModelSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)