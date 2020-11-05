from rest_framework.views import APIView
from rest_framework import generics
from .models import Game, UserGame
from .serializers import GameSerializer, UserGameSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from accounts.models import UserAccount
from rest_framework.exceptions import PermissionDenied, ValidationError
from .permissions import IsOwnerAndAdminOnly

# Create your views here.

class MatchingListView(generics.ListAPIView):
    """
    Get the list of user who have a same game_name in DB
    """
    queryset = UserGame.objects.all()
    serializer_class = UserGameSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        game_name = self.kwargs['game_name']
        game_id = Game.objects.get(name=game_name)

        return UserGame.objects.filter(game=game_id)

    
class GameListView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (permissions.AllowAny, )

class GameDetailView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (permissions.AllowAny, )
    lookup_field = 'name' 

class UserGameDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwnerAndAdminOnly]
    queryset = UserGame.objects.all()
    serializer_class = UserGameSerializer

class UserGameView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        queryset = UserGame.objects.all()
        serializer = UserGameSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
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
            self.request.data['user'] = self.request.user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object_from_name(self, name):
        try:
            return Game.objects.get(name=name)
        except Game.DoesNotExist:
            return False
    
    def get_user_from_email(self, email):
        try:
           return UserAccount.objects.filter(email=email)
        except UserAccount.DoesNotExist:
            return False
