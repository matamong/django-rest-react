from rest_framework import serializers
from .models import LolUserGame, LolPosition, LolPreferMode
from drf_writable_nested.serializers import WritableNestedModelSerializer

class LolPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LolPosition
        exclude = ['usergame']

class LolPreferModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LolPreferMode
        exclude = ['usergame']
    

class LolUserGameSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    # If you have nested serializers and you're expecting more than one, 
    # you should add the (many=True) otherwise DRF will treat the manager as the object.
    # 이런 경우엔 create에서 list 를 map으로 돌려줘야한다.
    lol_position = LolPositionSerializer()
    lol_prefer_mode = LolPreferModeSerializer()

    class Meta:
        model = LolUserGame
        fields = ['lol_name', 'region', 'prefer_style', 'prefer_time', 'intro', 'lol_position', 'lol_prefer_mode']
    
    def create(self, validated_data):
        lol_position_data = validated_data.pop('lol_position')
        lol_prefer_mode_data = validated_data.pop('lol_prefer_mode')
        lol_user_game = LolUserGame.objects.create(**validated_data)
        LolPosition.objects.create(usergame=lol_user_game, **lol_position_data)
        LolPreferMode.objects.create(usergame=lol_user_game, **lol_prefer_mode_data)
        return lol_user_game
