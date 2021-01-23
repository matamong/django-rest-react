from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import UserAccount
from .serializers import MyProfileSerializer

# Create your views here.
class MyProfileRetrieveView(generics.RetrieveAPIView):
    permission_class = [IsAuthenticated]
    serializer_class = MyProfileSerializer

    def get_object(self):
        try:
            user = UserAccount.objects.get(email=self.request.user)
        except UserAccount.DoesNotExist:
            user = None
        return user

class EmailUserRetrieveView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = UserAccount.objects.all()
    serializer_class = MyProfileRetrieveView
    lookup_field = 'email'

class NameUserRetrieveView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = UserAccount.objects.all()
    serializer_class = MyProfileRetrieveView
    lookup_field = 'name'
