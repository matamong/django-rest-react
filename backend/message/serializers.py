from rest_framework import serializers
from .models import MessageRoom, Message
from accounts.serializers import ProfileSerializer


class MessageRoomSerializer(serializers.ModelSerializer):
    receiver = ProfileSerializer(read_only=True)
    sender = ProfileSerializer(read_only=True)

    class Meta:
        model = MessageRoom
        fields = '__all__'
        extra_kwargs = {'receiver': {'read_only':True}, 'sender': {'read_only':True}}


class MessageSerializer(serializers.ModelSerializer):
    reply_user = ProfileSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('content', 'time_stamp', 'reply_user')
        extra_kwargs = {'reply_user': {'read_only':True}}