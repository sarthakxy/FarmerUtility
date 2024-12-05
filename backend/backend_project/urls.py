
# backend_project/urls.py

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("crop_management.urls")),  # Include URLs from crop_management app
]
