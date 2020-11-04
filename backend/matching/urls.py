from django.urls import path
from .views import GameListView, GameDetailView, UserGameView

urlpatterns = [
    path('games', GameListView.as_view()),
    path('games/<str:name>/', GameDetailView.as_view()),
    path('usergames', UserGameView.as_view())
]
