from django.urls import path
from .views import LolUserGameListView, LolUserGameRetrieveView, LolUserGameRenewalView, LolUserGameMyRetrieveView, LoLMatchingListView

urlpatterns = [
    path('', LoLMatchingListView.as_view()),
    path('usergames', LolUserGameListView.as_view()),
    path('usergame/<nickname>', LolUserGameRetrieveView.as_view()),
    path('usergame/renew/<lol_name>', LolUserGameRenewalView.as_view()),
    path('my/usergame', LolUserGameMyRetrieveView.as_view())
]