from rest_framework.views import APIView
from rest_framework import generics
from .models import LolUserGame, LolPosition, LolPreferMode
from .serializers import LolUserGameSerializer, LolPositionSerializer, LolPreferModeSerializer
from rest_framework import permissions
from riotwatcher import LolWatcher, ApiError
from matching.permissions import IsOwnerAndAdminOnly, IsOwnerOrReadOnly
from rest_framework.permissions import IsAdminUser, IsAuthenticated


# Create your views here.

class LolUserGameRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer
    lookup_field = 'lol_name'

    def perform_update(self, serializer):
        lol_watcher = LolWatcher('RGAPI-a99bcdb7-0767-42a6-98f6-146f719bfa73')
        request_region = self.request.data['region']
        request_lol_name = self.request.data['lol_name']
        
        user_account_data = lol_watcher.summoner.by_name(request_region, request_lol_name)
        lol_id = user_account_data['id']
        user_rank_data = lol_watcher.league.by_summoner(request_region, lol_id)
        user_champion_mastery_data = lol_watcher.champion_mastery.by_summoner(request_region, lol_id)

        if len(user_rank_data) == 1 :
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        else:
            flex_tier = user_rank_data[1]['tier']
            flex_rank = user_rank_data[1]['rank']

        self.request.data['user'] = self.request.user

        serializer.save(
            user = self.request.user, 
            lol_id = lol_id,
            lol_lv = user_account_data['summonerLevel'],
            solo_tier = user_rank_data[0]['tier'],
            solo_rank = user_rank_data[0]['rank'],
            flex_tier = flex_tier,
            flex_rank = flex_rank,
            main_champ_key = user_champion_mastery_data[0]['championId']
        )
        
class LolUserGameRenewalView(generics.UpdateAPIView):
    permissions_classes = [IsAuthenticated]
    queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer
    lookup_field = 'lol_name'

    def perform_update(self, serializer):
        lol_watcher = LolWatcher('RGAPI-a99bcdb7-0767-42a6-98f6-146f719bfa73')
        request_region = self.request.data['region']
        request_lol_name = self.request.data['lol_name']

        user_account_data = lol_watcher.summoner.by_name(request_region, request_lol_name)
        lol_id = user_account_data['id']
        user_rank_data = lol_watcher.league.by_summoner(request_region, lol_id)
        user_champion_mastery_data = lol_watcher.champion_mastery.by_summoner(request_region, lol_id)

        if len(user_rank_data) == 1 :
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        else:
            flex_tier = user_rank_data[1]['tier']
            flex_rank = user_rank_data[1]['rank']
        
        serializer.save(
            user = self.request.user, 
            lol_id = lol_id,
            lol_lv = user_account_data['summonerLevel'],
            solo_tier = user_rank_data[0]['tier'],
            solo_rank = user_rank_data[0]['rank'],
            flex_tier = flex_tier,
            flex_rank = flex_rank,
            main_champ_key = user_champion_mastery_data[0]['championId']
        )

class LolUserGameListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer

    # https://stackoverflow.com/questions/35518273/how-to-set-current-user-to-user-field-in-django-rest-framework
    def perform_create(self, serializer):
        # setting 값 다 되어있는 RiotAPI클래스 불러와서 API 로 정보가져오기.
        lol_watcher = LolWatcher('RGAPI-a99bcdb7-0767-42a6-98f6-146f719bfa73')
        request_region = self.request.data['region']
        request_lol_name = self.request.data['lol_name']
        
        user_account_data = lol_watcher.summoner.by_name(request_region, request_lol_name)
        lol_id = user_account_data['id']
        user_rank_data = lol_watcher.league.by_summoner(request_region, lol_id)
        user_champion_mastery_data = lol_watcher.champion_mastery.by_summoner(request_region, lol_id)

        if len(user_rank_data) == 1 :
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        else:
            flex_tier = user_rank_data[1]['tier']
            flex_rank = user_rank_data[1]['rank']

        self.request.data['user'] = self.request.user

        serializer.save(
            user = self.request.user, 
            lol_id = lol_id,
            lol_lv = user_account_data['summonerLevel'],
            solo_tier = user_rank_data[0]['tier'],
            solo_rank = user_rank_data[0]['rank'],
            flex_tier = flex_tier,
            flex_rank = flex_rank,
            main_champ_key = user_champion_mastery_data[0]['championId']
        )
