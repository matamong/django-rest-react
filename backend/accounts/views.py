from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import UserAccount, Profile
from .serializers import MyProfileSerializer, SocialSerializer, CustomProfileSerializer, ProfileSerializer
from django.views import View
from django.http import JsonResponse

## social
from django.conf import settings

from rest_framework import serializers
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from requests.exceptions import HTTPError

from social_django.utils import psa
from rest_framework_simplejwt.tokens import RefreshToken


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
    serializer_class = ProfileSerializer
    lookup_field = 'email'

class NameUserRetrieveView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = UserAccount.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'name'

class ProfileListCreateView(generics.ListCreateAPIView):
    permission_class = [IsAuthenticated]
    serializer_class = CustomProfileSerializer
    queryset = Profile.objects.all()
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(
            user = self.request.user
        )

        


@api_view(http_method_names=['POST'])
@permission_classes([AllowAny])
@psa()
def exchange_token(request, backend):

    serializer = SocialSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        # set up non-field errors key
        # http://www.django-rest-framework.org/api-guide/exceptions/#exception-handling-in-rest-framework-views
        try:
            nfe = settings.NON_FIELD_ERRORS_KEY
        except AttributeError:
            nfe = 'non_field_errors'

        try:
            user = request.backend.do_auth(serializer.validated_data['access_token'])
        except HTTPError as e:
            return Response(
                {'errors': {
                    'token': 'Invalid token',
                    'detail': str(e),
                }},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if user:
            if user.is_active:
                refresh = RefreshToken.for_user(user=user)
                return Response({'access': str(refresh.access_token)})
            else:
                return Response(
                    {'errors': {nfe: 'This user account is inactive'}},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {'errors': {nfe: "Authentication Failed"}},
                status=status.HTTP_400_BAD_REQUEST,
            )