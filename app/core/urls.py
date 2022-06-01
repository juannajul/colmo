"""Main Url's module"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls', namespace="users")),
    path('', include(('inventory.urls', 'inventory'), namespace='inventory')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
] 

if bool(settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
