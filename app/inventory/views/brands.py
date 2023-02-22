"""Brand views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

# Serializers
from inventory.serializers.brands import BrandModelSerializer, CreateBrandSerializer

# Models 
from inventory.models.products import Brand

# Permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from inventory.premissions.brands import IsBrandOwner

# Pagination
from rest_framework.pagination import PageNumberPagination

class BrandViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Brands view set"""
    lookup_field = 'slug'

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
    
    def get_queryset(self): 
        if self.action == 'active_brands':
            return Brand.objects.filter(is_active=True)
        return Brand.objects.all()

    @action(detail=False, methods=['get'])
    def active_brands(self, request, *args, **kwargs):
        # Get only active brands
        paginator = PageNumberPagination()
        paginator.page_size = 15
        products = self.filter_queryset(self.get_queryset())
        result_page = paginator.paginate_queryset(products, request)
        serializer = BrandModelSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

