""" Discount codes serializers. """

# Django restframework
from rest_framework import serializers

# Models
from inventory.models.discount_codes import DiscountCode

class DiscountCodeModelSerializer(serializers.ModelSerializer):
    """ Category model serializer."""
    code = serializers.SlugField()
    class Meta:
        model = DiscountCode
        fields = '__all__'
  
    def validate(self, data):
        """Code UPPERCASE."""
        code = data['code'].upper()
        data['code'] = code
        if DiscountCode.objects.filter(code=code).exists():
            raise serializers.ValidationError('This code already exists.')
            
        return data
