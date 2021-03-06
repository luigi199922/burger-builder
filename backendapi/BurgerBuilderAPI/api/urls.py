from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, IngredientViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'ingredients', IngredientViewSet)

urlpatterns = [
    path('', include(router.urls)),
]