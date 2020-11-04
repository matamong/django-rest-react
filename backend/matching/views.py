from rest_framework.views import APIView
from rest_framework import generics
from .models import Game, UserGame
from .serializers import GameSerializer, UserGameSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

# Create your views here.

class GameListView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (permissions.AllowAny, )

class GameDetailView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (permissions.AllowAny, )
    lookup_field = 'name'

class UserGameView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get_object_from_name(self, name):
        try:
            return Game.objects.get(name=name)
        except Game.DoesNotExist:
            return False

    def post(self, request, format=None):
        permission_classes = (permissions.AllowAny, )
        data = self.request.data
        serializer = UserGameSerializer(data=data)
        name=data['gameName']
        user = self.request.user
        print('>>>>>>>>>>>>>>', user)
        if serializer.is_valid():
            usergame = UserGame(
            user = user,
            game = self.get_object_from_name(name),
            game_nickname = data['game_nickname'],
            is_random_agreed = data['is_random_agreed'],
            is_profile_agreed = data['is_profile_agreed'],
            self_introduction = data['self_introduction']
            )

            usergame.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

