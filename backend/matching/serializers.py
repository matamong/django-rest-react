from rest_framework import serializers
from .models import Game, UserGame
from lolapi.serializers import LolUserGameSerializer

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class UserGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGame
        exclude = ('user', 'game')

class MyUserGamesSerializer(serializers.Serializer):
    lol_usergame = LolUserGameSerializer
    other_usergames = UserGameSerializer(many=True)