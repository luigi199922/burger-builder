from django.contrib import admin
from .models import Order, Ingredient

admin.site.register(Ingredient)
admin.site.register(Order)
# Register your models here.
