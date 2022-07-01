from django.urls import path

from . import views

app_name = 'colmo'

urlpatterns = [
    path('', views.index, name="index"),
]