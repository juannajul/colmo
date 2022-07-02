"""Product view set."""

# Django rest framework
from itertools import product
from multiprocessing import context
from unicodedata import category
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

# Serializers
from inventory.serializers.products import ProductModelSerializer

# Models 
from inventory.models.products import Product, Brand, Category

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

    #queryset = Product.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        """Return serializer based on actions"""
        if self.action == 'create':
            return CreateProductSerializer
        if self.action == 'men_products':
            return ProductModelSerializer
        return ProductModelSerializer

    """
    def get_permissions(self):
        permissions = [IsAuthenticatedOrReadOnly]
        if self.action in ['update', 'partial_update', 'destroy']:
            permissions.append(IsBrandOwner)
        return [p() for p in permissions]
        """

    def get_queryset(self): 
        if self.action == 'product_by_category':
            category = Category.objects.get(slug=self.kwargs['slug'])
            return Product.objects.filter(category=category)
        return Product.objects.all()

    @action(detail=True, methods=["get"])
    def product_by_category(self, request, *args, **kwargs):
        """List products by category."""
        products = self.get_queryset()
        serializer = ProductModelSerializer(products, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

