from rest_framework import serializers
from .models import LolUserGame, LolPosition, LolPreferMode
from drf_writable_nested.serializers import WritableNestedModelSerializer
from .datadragon import DataDragon

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
    main_champ_info = serializers.SerializerMethodField()

    class Meta:
        model = LolUserGame
        fields = ['lol_name', 'region', 'prefer_style', 'prefer_time', 'intro', 'lol_position', 'lol_prefer_mode', 'main_champ_info']
    
    def create(self, validated_data):
        lol_position_data = validated_data.pop('lol_position')
        lol_prefer_mode_data = validated_data.pop('lol_prefer_mode')
        lol_user_game = LolUserGame.objects.create(**validated_data)
        LolPosition.objects.create(usergame=lol_user_game, **lol_position_data)
        LolPreferMode.objects.create(usergame=lol_user_game, **lol_prefer_mode_data)
        return lol_user_game


    # https://stackoverflow.com/questions/38758962/how-to-append-extra-data-to-the-existing-serializer-in-django
    # https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield
    # https://stackoverflow.com/questions/22988878/pass-extra-arguments-to-serializer-class-in-django-rest-framework
    # 1. serializer에서 datadragon 가져와서 instance에다가 계속 append하자. https://stackoverflow.com/questions/60445973/how-to-get-all-instances-in-serializer-method-field
    def get_main_champ_info(self, obj):
        
        data_dragon = DataDragon()
        champion = data_dragon.get_champion_by_key(obj.main_champ_key)
        name = champion['name']

        return { 'name': name,
            'champion_image': 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' +champion['image']['full'],
            'champion_avatar': 'http://ddragon.leagueoflegends.com/cdn/' + data_dragon.get_latest_version() + '/img/champion/' + champion['image']['full']
        }