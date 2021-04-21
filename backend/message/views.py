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

        return Response(serializer.data)

    def perform_create(self, serializer):
        try:
            receiver_obj = UserAccount.objects.get(name=self.request.data['receiver'])
        except UserAccount.DoesNotExist:
            raise Http404

        message_room_obj = MessageRoom.objects.filter(
            Q(sender=self.request.user) & Q(receiver=receiver_obj)
        )
        if message_room_obj.exists():
            raise ValidationError('이미 존재하는 매칭방입니다.')

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


        
class MyMessageListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    pagination_class = None

    def list(self, request, **kwargs):
        # 룸 있는지 확인
        try:
            message_room_obj = MessageRoom.objects.get(id=kwargs['message_room'])
        except MessageRoom.DoesNotExist: 
            raise Http404
        
        # 당사자 맞는지 확인
        if message_room_obj.sender.id == self.request.user.id or message_room_obj.receiver.id == self.request.user.id:
            queryset = Message.objects.filter(message_room=message_room_obj).order_by('time_stamp')
            serializer = MessageSerializer(queryset, many=True)
            
            try:
                sender_obj = UserAccount.objects.get(id=message_room_obj.sender.id)
                sender_name = sender_obj.name
                receiver_obj = UserAccount.objects.get(id=message_room_obj.receiver.id)
                receiver_name = receiver_obj.name
            except UserAccount.DoesNotExist:
                sender_name = 'withdrawn'
                receiver_name = 'withdrawn'


            return Response(serializer.data)
        else:
            raise PermissionDenied('메시지를 주고받는 당사자가 아닙니다.')

        

    def perform_create(self, serializer):
        # 룸 있는지 확인
        try:
            message_room_obj = MessageRoom.objects.get(id=self.kwargs['message_room'])
        except MessageRoom.DoesNotExist: 
            raise Http404
        
        # 당사자 맞는지 확인
        if message_room_obj.sender.id == self.request.user.id or message_room_obj.receiver.id == self.request.user.id:
            serializer.save(
            reply_user = self.request.user,
            message_room = message_room_obj
            )
        else:
            raise PermissionDenied('메시지를 주고받는 당사자가 아닙니다.')

        