from django.urls import path
from .views import LolUserGameListView, LolUserGameRetrieveView, LolUserGameRenewalView

urlpatterns = [
    path('usergame', LolUserGameListView.as_view()),
    path('usergame/<lol_name>', LolUserGameRetrieveView.as_view()),
    path('usergame/renew/<lol_name>', LolUserGameRenewalView.as_view())
]