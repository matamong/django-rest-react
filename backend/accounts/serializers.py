from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import Profile, Avatar, Title
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        exclude = ['id']

class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        exclude = ['id']

class CustomProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('avatar', 'title')
        extra_kwargs = {'user': {'write_only': True}}

### 
class MyProfileSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('email', 'name', 'profile')
    
    def get_profile(self, obj):
        try:
            profile = Profile.objects.get(user=obj.id)
        except Profile.DoesNotExist:
            return {}
        return {
            'avatar_name': profile.avatar.name,
            'avatar_url': profile.avatar.url,
            'title': profile.title.name
        }

class ProfileSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('name', 'profile')
    
    def get_profile(self, obj):
        try:
            profile = Profile.objects.get(user=obj.id)
        except Profile.DoesNotExist:
            return {
                'avatar_name': '개발프로필',
                'avatar_url': '	https://raw.githubusercontent.com/matamatamong/img/main/Django-rest-React/Front/avatar.png',
                'title': '게임듀오즈인'
            }
        return {
            'avatar_name': profile.avatar.name,
            'avatar_url': profile.avatar.url,
            'title': profile.title.name
        }

###


class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token.
    """
    access_token = serializers.CharField(
        allow_blank=False,
        trim_whitespace=True,
    )