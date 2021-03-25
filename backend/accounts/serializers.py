from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')

class MyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'name')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name',)


class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token.
    """
    access_token = serializers.CharField(
        allow_blank=False,
        trim_whitespace=True,
    )