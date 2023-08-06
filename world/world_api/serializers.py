from .models import District, City, Country, World
from rest_framework import serializers
from account_api.serializers import AccountSerializer
from account_api.models import Account


class DistrictListSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Account.objects.all()
    )

    class Meta:
        model = District
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "city",
            "created_by",
        ]


class DistrictDetailSerializer(serializers.ModelSerializer):
    created_by = AccountSerializer(many=False, read_only=True)

    class Meta:
        model = District
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "city",
            "created_by",
        ]


class CityListSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Account.objects.all()
    )

    class Meta:
        model = City
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "country",
            "created_by",
        ]


class CityDetailSerializer(serializers.ModelSerializer):
    districts = DistrictDetailSerializer(many=True, read_only=True)
    created_by = AccountSerializer(many=False, read_only=True)

    class Meta:
        model = City
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "country",
            "districts",
            "created_by",
        ]


class CountryListSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Account.objects.all()
    )

    class Meta:
        model = Country
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "world",
            "created_by",
        ]


class CountryDetailSerializer(serializers.ModelSerializer):
    cities = CityDetailSerializer(many=True, read_only=True)
    created_by = AccountSerializer(many=False, read_only=True)

    class Meta:
        model = Country
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "world",
            "cities",
            "created_by",
        ]


class WorldListSerializer(serializers.ModelSerializer):
    countries = CountryDetailSerializer(many=True, read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Account.objects.all()
    )

    class Meta:
        model = World
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "countries",
            "created_by",
        ]
        depth = 1


class WorldDetailSerializer(serializers.ModelSerializer):
    countries = CountryDetailSerializer(many=True, read_only=True)
    created_by = AccountSerializer(many=False, read_only=True)

    class Meta:
        model = World
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "countries",
            "created_by",
        ]
        depth = 1
