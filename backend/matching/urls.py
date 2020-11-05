from django.urls import path
from .views import GameListView, GameDetailView, UserGameView, UserGameDetailView, MatchingListView

urlpatterns = [
    path('<game_name>', MatchingListView.as_view()),
    path('games', GameListView.as_view()),
    path('games/<str:name>/', GameDetailView.as_view()),
    path('usergames', UserGameView.as_view()),
    path('usergames/<int:pk>/', UserGameDetailView.as_view())
]
