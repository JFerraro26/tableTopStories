from .models import Account
from rest_framework import serializers
from django.contrib.auth import authenticate


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = fields = [
            "id",
            "username",
        ]


class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            "id",
            "username",
            "email",
            "password",
            "image",
            "last_login",
            "is_staff",
            "is_superuser",
            "date_joined",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "last_login": {"read_only": True},
            "is_staff": {"read_only": True},
            "is_superuser": {"read_only": True},
            "date_joined": {"read_only": True},
        }

    def validate(self, attrs):
        email = attrs.get("email", "").strip().lower()
        username = attrs.get("username", "").strip().lower()
        if Account.objects.filter(email=email).exists():
            raise serializers.ValidationError("Account with this email already exists")
        elif Account.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                "Account with this username already exists"
            )
        return attrs

    def create(self, validate_data):
        account = Account.objects.create_account(**validate_data)
        return account


class UpdateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            "id",
            "username",
            "email",
            "password",
            "image",
            "last_login",
            "is_staff",
            "is_superuser",
            "date_joined",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "last_login": {"read_only": True},
            "is_staff": {"read_only": True},
            "is_superuser": {"read_only": True},
            "date_joined": {"read_only": True},
        }

    def update(self, instance, validated_data):
        password = validated_data.pop("password")
        if password:
            instance.set_password(password)
        instance = super().update(instance, validated_data)
        return instance


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, trim_whitespace=False
    )

    def validate(self, attrs):
        email = attrs["email"].lower()
        password = attrs["password"]
        print("attrs", attrs)
        if not email or not password:
            raise serializers.ValidationError("Please give both email and password.")

        if not Account.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email does not exist.")

        account = authenticate(
            request=self.context["request"], email=email, password=password
        )
        if not account:
            raise serializers.ValidationError("Wrong Credentials.")

        attrs["account"] = account
        return attrs
