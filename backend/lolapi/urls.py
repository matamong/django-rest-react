from django.urls import path
from .views import LolUserGameListView, LolUserGameRetrieveView, LolUserGameRenewalView, LolUserGameMyRetrieveView

urlpatterns = [
    path('usergames', LolUserGameListView.as_view()),
    path('usergame/<user>', LolUserGameRetrieveView.as_view()),
    path('usergame/renew/<lol_name>', LolUserGameRenewalView.as_view()),
    path('my/usergame', LolUserGameMyRetrieveView.as_view())
]