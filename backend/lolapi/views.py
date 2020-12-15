from rest_framework.views import APIView
from rest_framework import generics
from .models import LolUserGame, LolPosition, LolPreferMode
from .serializers import LolUserGameSerializer, LolPositionSerializer, LolPreferModeSerializer
from rest_framework import permissions
from riotwatcher import LolWatcher, ApiError
from matching.permissions import IsOwnerAndAdminOnly, IsOwnerOrReadOnly, IsOwnerOnly
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .datadragon import DataDragon
from rest_framework.response import Response


# Create your views here.
class LolUserGameMyRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOnly]
    # queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer
    
    def get_object(self):
        try:
            usergame = LolUserGame.objects.get(user=self.request.user)
        except LolUserGame.DoesNotExist: 
            usergame = None
        return usergame
        
    def perform_update(self, serializer):
        lol_watcher = LolWatcher('RGAPI-303862fd-d3fb-4901-8875-3ab7c39d1398')
        request_region = self.request.data['region']
        request_lol_name = self.request.data['lol_name']
        
        user_account_data = lol_watcher.summoner.by_name(request_region, request_lol_name)
        lol_id = user_account_data['id']
        user_rank_data = lol_watcher.league.by_summoner(request_region, lol_id)
        user_champion_mastery_data = lol_watcher.champion_mastery.by_summoner(request_region, lol_id)

        # user_chamion_mastery 없으믄 기본값(아무것도 없는 사진)으로 저장.

        print(user_rank_data)
        if len(user_rank_data) == 1 :
            solo_rank = user_rank_data[0]['tier']
            solo_tier = user_rank_data[0]['rank']
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        elif len(user_rank_data) == 0:
            solo_tier = 'UNRANKED'
            solo_rank = 'UNRANKED'
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        else:
            solo_rank = user_rank_data[0]['tier']
            solo_tier = user_rank_data[0]['rank']
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


class LolUserGameRetrieveView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer
    lookup_field = 'lol_name'

    def get_object(self):
        try:
            usergame = LolUserGame.objects.get(lol_name=self.kwargs.get("nickname"))
        except LolUserGame.DoesNotExist: 
            usergame = None
        return usergame


class LolUserGameRenewalView(generics.UpdateAPIView):
    permissions_classes = [IsAuthenticated]
    queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer
    lookup_field = 'lol_name'

    def perform_update(self, serializer):
        lol_watcher = LolWatcher('RGAPI-303862fd-d3fb-4901-8875-3ab7c39d1398')
        request_region = self.request.data['region']
        request_lol_name = self.request.data['lol_name']

        user_account_data = lol_watcher.summoner.by_name(request_region, request_lol_name)
        lol_id = user_account_data['id']
        user_rank_data = lol_watcher.league.by_summoner(request_region, lol_id)
        user_champion_mastery_data = lol_watcher.champion_mastery.by_summoner(request_region, lol_id)
        print(user_rank_data)

        if len(user_rank_data) == 1 :
            solo_rank = user_rank_data[0]['tier']
            solo_tier = user_rank_data[0]['rank']
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        elif len(user_rank_data) == 0:
            solo_tier = 'UNRANKED'
            solo_rank = 'UNRANKED'
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        else:
            solo_rank = user_rank_data[0]['tier']
            solo_tier = user_rank_data[0]['rank']
            flex_tier = user_rank_data[1]['tier']
            flex_rank = user_rank_data[1]['rank']
        
        serializer.save(
            user = self.request.user, 
            lol_id = lol_id,
            lol_lv = user_account_data['summonerLevel'],
            solo_tier = solo_tier,
            solo_rank = solo_rank,
            flex_tier = flex_tier,
            flex_rank = flex_rank,
            main_champ_key = user_champion_mastery_data[0]['championId']
        )


class LoLMatchingListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer

    # 1. 해당 유저가 usergame 오브젝트를 가지고 있는지 확인
    # 2. 유저가 작성한 조건들로 filtering.
    # 2. 해당 유저의 tier 와 같은 오브젝트를 리스트로 내보냄

    def list(self, request):
        try:
            usergame = LolUserGame.objects.get(user=self.request.user)
        except LolUserGame.DoesNotExist: 
            usergame = None
        queryset = LolUserGame.objects.filter(solo_tier=usergame.solo_tier).exclude(user=self.request.user)
        serializer = LolUserGameSerializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data)

class LoLRandomMatchingListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer

    # 1. 해당 유저가 usergame 오브젝트를 가지고 있는지 확인
    # 2. 유저가 작성한 조건들로 filtering.
    # 2. 해당 유저의 tier 와 같은 오브젝트를 리스트로 내보냄

    def list(self, request):
        try:
            usergame = LolUserGame.objects.get(user=self.request.user)
        except LolUserGame.DoesNotExist: 
            usergame = None
        
        queryset = LolUserGame.objects.filter(solo_tier=usergame.solo_tier).exclude(user=self.request.user)
        serializer = LolUserGameSerializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data)


class LolUserGameListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = LolUserGame.objects.all()
    serializer_class = LolUserGameSerializer

    # https://stackoverflow.com/questions/35518273/how-to-set-current-user-to-user-field-in-django-rest-framework
    def perform_create(self, serializer):
        # setting 값 다 되어있는 RiotAPI클래스 불러와서 API 로 정보가져오기.
        lol_watcher = LolWatcher('RGAPI-303862fd-d3fb-4901-8875-3ab7c39d1398')
        request_region = self.request.data['region']
        request_lol_name = self.request.data['lol_name']
        
        user_account_data = lol_watcher.summoner.by_name(request_region, request_lol_name)
        lol_id = user_account_data['id']
        user_rank_data = lol_watcher.league.by_summoner(request_region, lol_id)
        user_champion_mastery_data = lol_watcher.champion_mastery.by_summoner(request_region, lol_id)

        print(user_rank_data)

        if len(user_rank_data) == 1 :
            solo_rank = user_rank_data[0]['tier']
            solo_tier = user_rank_data[0]['rank']
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        elif len(user_rank_data) == 0:
            solo_tier = 'UNRANKED'
            solo_rank = 'UNRANKED'
            flex_tier = 'UNRANKED'
            flex_rank = 'UNRANKED'
        else:
            solo_rank = user_rank_data[0]['tier']
            solo_tier = user_rank_data[0]['rank']
            flex_tier = user_rank_data[1]['tier']
            flex_rank = user_rank_data[1]['rank']
        
        if len(user_champion_mastery_data) == 0 :
            main_champ = 0
        else:
            main_champ = user_champion_mastery_data[0]['championId']

        self.request.data['user'] = self.request.user

        serializer.save(
            user = self.request.user, 
            lol_id = lol_id,
            lol_lv = user_account_data['summonerLevel'],
            solo_tier = solo_tier,
            solo_rank = solo_rank,
            flex_tier = flex_tier,
            flex_rank = flex_rank,
            main_champ_key = main_champ
        )