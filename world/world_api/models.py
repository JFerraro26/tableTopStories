from django.db import models


# Create your models here.
class Campaign(models.Model):
    Dnd5E = "5E"
    Pathfinder2E = "pf2E"
    SystemChoices = [
        (Dnd5E, "DnD 5E" ),
        (Pathfinder2E, "Pathfinder 2E")
    ]
    system = models.CharField(
        max_length=4,
        choices=SystemChoices,
        default=Pathfinder2E,
    )
    name = models.CharField(max_length=50)
    picture = models.URLField(max_length=300, blank=True, default="https://placehold.co/600x400")
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class World(models.Model):
    campaign = models.ForeignKey(
        Campaign,
        related_name="world",
        on_delete=models.PROTECT,
        null=True,
    )
    name = models.CharField(max_length=50)
    picture = models.URLField(max_length=300, blank=True, default="https://placehold.co/600x400")
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Country(models.Model):
    world = models.ForeignKey(
        World,
        related_name="country",
        on_delete=models.PROTECT,
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
        on_delete=models.PROTECT,
    )
    name = models.CharField(max_length=50)
    picture = models.URLField(max_length=300, default="https://placehold.co/600x400", blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class NpcVO(models.Model):
    name = models.CharField(max_length=50)
    picture = models.URLField(max_length=300, default="https://placehold.co/400x400", blank=True)
    chr_class = models.CharField(max_length=20, default="Civilian")
    description = models.TextField(blank=True)
    current_city = models.ForeignKey(
        City,
        related_name="npc_current",
        on_delete=models.PROTECT,
        blank=True,
    )
    visited_cities = models.ManyToManyField(
        City,
        related_name="npc_visited",
        blank=True,
    )

    def __str__(self):
        return self.name
