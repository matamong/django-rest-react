from django.urls import path
from .views import MyMessageRoomListView, MyMessageListView, MessageRoomRetrieveView

urlpatterns = [
    path('rooms', MyMessageRoomListView.as_view()),
    path('rooms/<int:id>', MessageRoomRetrieveView.as_view()),
