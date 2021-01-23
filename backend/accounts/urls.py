from django.urls import path
from .views import MyProfileRetrieveView, EmailUserRetrieveView, NameUserRetrieveView

urlpatterns = [
    path('my', MyProfileRetrieveView.as_view()),
    path('search/email/<email>', EmailUserRetrieveView.as_view()),
    path('search/name/<name>', NameUserRetrieveView.as_view())
]