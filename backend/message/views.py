from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import MessageRoom, Message
from accounts.models import UserAccount
from .serializers import MessageRoomSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.http import Http404, HttpResponseForbidden
from django.db.models import Q
from rest_framework.exceptions import ValidationError

# Create your views here.
class MyMessageRoomListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MessageRoom.objects.all()
    serializer_class = MessageRoomSerializer
    pagination_class = None
    

    def list(self, request):
        try:
            message_room = MessageRoom.objects.filter(Q(sender=self.request.user) | Q(receiver=self.request.user))
        except MessageRoom.DoesNotExist: 
            raise Http404

        queryset = MessageRoom.objects.filter(Q(sender=self.request.user) | Q(receiver=self.request.user)).order_by('created_at')
        serializer = MessageRoomSerializer(queryset, many=True)
        print(serializer.data)

        return Response(serializer.data)

    def perform_create(self, serializer):
        try:
            receiver_obj = UserAccount.objects.get(name=self.request.data['receiver'])
        except UserAccount.DoesNotExist:
            raise Http404

        message_room_obj = MessageRoom.objects.filter(Q(sender=self.request.user) | Q(receiver=self.request.user))
        if message_room_obj.exists():
            raise ValidationError('이미 존재하는 매칭방입니다.')

        print(receiver_obj)

        serializer.save(
        sender = self.request.user,
        receiver = receiver_obj
        )

class MessageRoomRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MessageRoom.objects.all()
    serializer_class = MessageRoomSerializer
    pagination_class = None
    lookup_field = 'id'

    def get_object(self):        
        message_room_obj = super().get_object()
        if message_room_obj.sender.id == self.request.user.id or message_room_obj.receiver.id == self.request.user.id:
            return message_room_obj
        else:
            raise PermissionDenied('메시지를 주고받는 당사자가 아닙니다.')
    
    def perform_update(self, serializer):
        message_room_obj = super().get_object()
        if message_room_obj.receiver.id == self.request.user.id:
            serializer.save(
                receiver_consent = True
            )
        else:
            raise PermissionDenied('매칭을 수락받은 분만 수정이 가능합니다.')

