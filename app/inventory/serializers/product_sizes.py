"""Product sizes serializers."""

# Django rest framework
from rest_framework import serializers
from ..models.products import Sizes

# Models
from inventory.models.products import ProductSizes

from inventory.models.products import Product


class ProductSizesModelSerializer(serializers.ModelSerializer):
    """Product sizes model serializer."""

    class Meta:
        model = ProductSizes
        fields = '__all__'
        

class CreateProductSizesSerializer(serializers.ModelSerializer):
    """Create product sizes serializer."""
    #size = serializers.StringRelatedField()

    class Meta:
        model = ProductSizes
        fields = ('size', "qty")

class UpdateProductSizesSerializer(serializers.ModelSerializer):
    """Product sizes model serializer."""

    class Meta:
        model = ProductSizes
        fields = '__all__'

    def update(self, instance, validated_data):
        print(instance)
        print(validated_data)
        product_size = ProductSizes.objects.get(id=instance.id)
        product_size.qty = validated_data['qty']
        product_size.size = validated_data['size']
        product_size.save()
        product = Product.objects.get(sizes__id=product_size.id)
        product_sizes = ProductSizes.objects.filter(item_product_sizes=product.id)
        stock = 0
        for product_size in product_sizes:
            stock += product_size.qty
        product.stock = stock
        product.save()
        return validated_data


        