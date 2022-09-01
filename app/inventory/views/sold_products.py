"""Categories views."""

# Django rest framework
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

# Serializers
from inventory.serializers.sold_products import SoldProductModelSerializer

#pagination
from rest_framework.pagination import PageNumberPagination

# Models 
from inventory.models.sold_confirmation import SoldProduct, SoldProductConfirmation

class SoldProductViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    """Category view set"""

    #queryset = SoldProduct.objects.all()
    serializer_class = SoldProductModelSerializer

    def get_queryset(self): 
        if self.action == 'product_confirmation':
            confirmation = SoldProductConfirmation.objects.get(pk=self.kwargs['pk'])
            product = SoldProduct.objects.filter(sold_confirmation=confirmation)
            return product
        return 

    @action(detail=True, methods=["get"])
    def product_confirmation(self, request, *args, **kwargs):
        """List products by category."""
        paginator = PageNumberPagination()
        paginator.page_size = 15
        products = self.filter_queryset(self.get_queryset())
        result_page = paginator.paginate_queryset(products, request)
        serializer = SoldProductModelSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)