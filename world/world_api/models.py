from django.db import models
from account_api.models import Account


# Create your models here.
class World(models.Model):
    name = models.CharField(max_length=50)
    picture = models.URLField(
        max_length=300, blank=True, default="https://placehold.co/600x400"
    )
    description = models.TextField(blank=True)
    created_by = models.OneToOneField(
        Account, related_name="world", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Country(models.Model):
    world = models.ForeignKey(
        World,
        related_name="countries",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=50)
    picture = models.URLField(
        max_length=300, default="https://placehold.co/600x400", blank=True
    )
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(
        Account, related_name="country", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class City(models.Model):
    country = models.ForeignKey(
        Country,
        related_name="cities",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=50)
    picture = models.URLField(
        max_length=300, default="https://placehold.co/600x400", blank=True
    )
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(
        Account, related_name="city", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class District(models.Model):
    city = models.ForeignKey(
        City,
        related_name="districts",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=50)
    picture = models.URLField(
        max_length=300, default="https://placehold.co/600x400", blank=True
    )
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(
        Account, related_name="district", on_delete=models.CASCADE
    )
