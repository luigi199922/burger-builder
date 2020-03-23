from .models import Order, Ingredient
from rest_framework import serializers

class OrderSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Order
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'