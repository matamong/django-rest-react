from django.urls import path
from django.conf.urls import url
from .views import MyProfileRetrieveView, EmailUserRetrieveView, NameUserRetrieveView, exchange_token

urlpatterns = [
    path('my', MyProfileRetrieveView.as_view()),
    path('search/email/<email>', EmailUserRetrieveView.as_view()),
    path('search/name/<name>', NameUserRetrieveView.as_view()),
    url(r'social/(?P<backend>[^/]+)/$', exchange_token),
]