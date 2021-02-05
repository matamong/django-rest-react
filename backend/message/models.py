from django.db import models
from django.conf import settings
from django.utils import timezone


# Create your models here.

class MessageRoom(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sender' , on_delete=models.SET_NULL, null=True)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='receiver', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    game_name = models.CharField(max_length=300, null=True)
    receiver_consent = models.BooleanField(default=False)


class Message(models.Model):
    message_room = models.ForeignKey(MessageRoom, related_name='message_room', on_delete=models.SET_NULL, null=True)
    reply_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    time_stamp = models.DateTimeField(default=timezone.now)