from django.urls import path
from .views import MyProfileRetrieveView

urlpatterns = [
    path('my', MyProfileRetrieveView.as_view())
]