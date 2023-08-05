from .models import Account
from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import (
    CreateAccountSerializer,
    UpdateAccountSerializer,
    LoginSerializer,
)
from knox.views import LoginView
from django.contrib.auth import login


# Create your views here.
class CreatAccountAPI(CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = CreateAccountSerializer
    permission_classes = (AllowAny,)


class UpdateAccountAPI(UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = UpdateAccountSerializer
    lookup_field = "id"


class LoginAPI(LoginView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            account = serializer.validated_data["account"]
            login(request, account)
            response = super().post(request, format=None)
            user_data = {
                "id": account.id,
                "username": account.username,
                "email": account.email,
                "image": account.image,
                "last_login": account.last_login,
                "is_staff": account.is_staff,
                "is_superuser": account.is_superuser,
                "date_joined": account.date_joined,
            }
            response.data["user"] = user_data
            return Response(response.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )
