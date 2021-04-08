from rest_framework import serializers
from .models import LolUserGame, LolPosition, LolPreferMode
from drf_writable_nested.serializers import WritableNestedModelSerializer
from .datadragon import DataDragon
from accounts.serializers import ProfileSerializer
from riotwatcher import LolWatcher, ApiError
from django.conf import settings as conf_settings
RIOT_API_KEY = conf_settings.RIOT_API_KEY


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
    user = ProfileSerializer(read_only=True)
    odds = serializers.SerializerMethodField()

    class Meta:
        model = LolUserGame
        fields = ['lol_name', 'region', 'prefer_style', 'prefer_time', 
        'intro', 'lol_position', 'lol_prefer_mode', 'solo_tier' , 'solo_rank', 'main_champ_info', 'mic', 'user', 'odds']
        extra_kwargs = {
            'user': {'read_only': True},
            'lol_name': {'write_only': True}
        }

    
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
        if obj.main_champ_key == 0:
            name = 'Newbie'
            image_url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/4568.jpg'
            avatar_url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/4568.jpg'
        else:

            champion = data_dragon.get_champion_by_key(obj.main_champ_key)
            name = champion['name']
            image_url = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + champion['image']['full'].replace('.png', '_0.jpg'),
            avatar_url = 'http://ddragon.leagueoflegends.com/cdn/' + data_dragon.get_latest_version() + '/img/champion/' + champion['image']['full']

        return { 'name': name,
            'champion_image': image_url,
            'champion_avatar': avatar_url
        }

    def get_odds(self, obj):
        print(obj)
        lol_watcher = LolWatcher(RIOT_API_KEY)
        region = obj.region
        lol_name = obj.lol_name
        user_account_data = lol_watcher.summoner.by_name(region, lol_name)
        lol_id = user_account_data['id']

        try:
            spectator_data = lol_watcher.league.by_summoner(region, lol_id)
        except ApiError as err :
            return {'odds': '데이터 없음'}
        
        if len(spectator_data) < 1 :
            return {'odds': '데이터 없음'}
        
        print(spectator_data[0])
        total = spectator_data[0]['wins'] + spectator_data[0]['losses']
        odds = (spectator_data[0]['wins'] / total) * 100

        return {'win':spectator_data[0]['wins'], 'losses': spectator_data[0]['losses'], 'odds': str(odds)[:5]}

class LolMyUserGameSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    # If you have nested serializers and you're expecting more than one, 
    # you should add the (many=True) otherwise DRF will treat the manager as the object.
    # 이런 경우엔 create에서 list 를 map으로 돌려줘야한다.
    lol_position = LolPositionSerializer()
    lol_prefer_mode = LolPreferModeSerializer()
    main_champ_info = serializers.SerializerMethodField()
    user = ProfileSerializer(read_only=True)
    odds = serializers.SerializerMethodField()

    class Meta:
        model = LolUserGame
        fields = ['lol_name', 'region', 'prefer_style', 'prefer_time', 
        'intro', 'lol_position', 'lol_prefer_mode', 'solo_tier' , 'solo_rank', 'main_champ_info', 'mic', 'user', 'odds']
        extra_kwargs = {
            'user': {'read_only': True},
        }

    
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
        if obj.main_champ_key == 0:
            name = 'Newbie'
            image_url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/4568.jpg'
            avatar_url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/4568.jpg'
        else:

            champion = data_dragon.get_champion_by_key(obj.main_champ_key)
            name = champion['name']
            image_url = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + champion['image']['full'].replace('.png', '_0.jpg'),
            avatar_url = 'http://ddragon.leagueoflegends.com/cdn/' + data_dragon.get_latest_version() + '/img/champion/' + champion['image']['full']

        return { 'name': name,
            'champion_image': image_url,
            'champion_avatar': avatar_url
        }
    

    def get_odds(self, obj):
        print(obj)
        lol_watcher = LolWatcher(RIOT_API_KEY)
        region = obj.region
        lol_name = obj.lol_name
        user_account_data = lol_watcher.summoner.by_name(region, lol_name)
        lol_id = user_account_data['id']

        try:
            spectator_data = lol_watcher.league.by_summoner(region, lol_id)
        except ApiError as err :
            return {'odds': '데이터 없음'}
        
        if len(spectator_data) < 1 :
            return {'odds': '데이터 없음'}
        
        print(spectator_data[0])
        total = spectator_data[0]['wins'] + spectator_data[0]['losses']
        odds = (spectator_data[0]['wins'] / total) * 100

        return {'win':spectator_data[0]['wins'], 'losses': spectator_data[0]['losses'], 'odds': str(odds)[:5]}