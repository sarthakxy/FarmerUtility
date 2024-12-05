from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CropViewSet, register, login_view

router = DefaultRouter()
router.register(r'crops', CropViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
]
