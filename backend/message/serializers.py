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
    last_message = serializers.SerializerMethodField()
    
    better = BetterGameProfileSerializing()

    class Meta:
        model = MessageRoom
        fields = '__all__'
        extra_kwargs = {
            'sender': {'read_only':True}, 
            'sender_usergame_profile': {'read_only': True},
            'receiver': {'read_only':True},
            'receiver_usergame_profile': {'read_only': True},
            'last_message': {'read_only': True}
        }
    
    def get_sender_usergame_profile(self, obj):
        return self.better.get_seralized_game_profile(obj.sender, obj.game_name, obj.receiver_consent)

    def get_receiver_usergame_profile(self, obj):
        return self.better.get_seralized_game_profile(obj.receiver, obj.game_name, obj.receiver_consent)
    
    def get_last_message(self, obj):
        try:
            last_message_obj = Message.objects.filter(message_room=obj).latest('time_stamp')
            return {
                'id': last_message_obj.id,
                'content' : last_message_obj.content,
                'reply_user' : last_message_obj.reply_user.name,
                'time_stamp' : last_message_obj.time_stamp
            }
        except Message.DoesNotExist:
            return {
                'id': '',
                'content' : '',
                'reply_user' : '',
                'time_stamp' : ''
            }


        
class MessageSerializer(serializers.ModelSerializer):
    reply_user = ProfileSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('content', 'time_stamp', 'reply_user')
        extra_kwargs = {'reply_user': {'read_only':True}}