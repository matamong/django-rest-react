from rest_framework import serializers
from .models import MessageRoom, Message
from lolapi.models import LolUserGame
from accounts.serializers import ProfileSerializer
from .better_seralizer import BetterGameProfileSerializing



class MessageRoomSerializer(serializers.ModelSerializer):
    receiver = ProfileSerializer(read_only=True)
    sender = ProfileSerializer(read_only=True)
    sender_usergame_profile = serializers.SerializerMethodField()
    receiver_usergame_profile = serializers.SerializerMethodField()
    
    better = BetterGameProfileSerializing()

    class Meta:
        model = MessageRoom
        fields = '__all__'
        extra_kwargs = {
            'sender': {'read_only':True}, 
            'sender_usergame_profile': {'read_only': True},
            'receiver': {'read_only':True},
            'receiver_usergame_profile': {'read_only': True}
        }
    
    def get_sender_usergame_profile(self, obj):
        return self.better.get_seralized_game_profile(obj.sender, obj.game_name, obj.receiver_consent)

    def get_receiver_usergame_profile(self, obj):
        return self.better.get_seralized_game_profile(obj.receiver, obj.game_name, obj.receiver_consent)

        
class MessageSerializer(serializers.ModelSerializer):
    reply_user = ProfileSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('content', 'time_stamp', 'reply_user')
        extra_kwargs = {'reply_user': {'read_only':True}}