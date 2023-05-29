from django.db import models


# Create your models here.
class World(models.Model):
    name = models.CharField(max_length=50)
    picture = models.URLField(max_length=300, blank=True, default="https://placehold.co/600x400")
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Country(models.Model):
    world = models.ForeignKey(
        World,
        related_name="countries",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=50)
    picture = models.URLField(max_length=300, default="https://placehold.co/600x400", blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class City(models.Model):
    country = models.ForeignKey(
        Country,
        related_name="cities",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=50)
    picture = models.URLField(max_length=300, default="https://placehold.co/600x400", blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class NpcVO(models.Model):
    name = models.CharField(max_length=50)
    vip = models.BooleanField(default=False)
    current_city = models.ForeignKey(
        City,
        related_name="npcs",
        on_delete=models.CASCADE,
        blank=True,
    )
    def __str__(self):
        return self.name
