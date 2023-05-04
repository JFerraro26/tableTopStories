from django.shortcuts import render
from .models import World
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse


# Create your views here.
class WorldListEncoder(ModelEncoder):
    model = World
    properties = [
        "id",
        "name",
        "picture",
        "description",
    ]

@require_http_methods(["FET", "POST"])
def world_list_or_create(request):
    if request.method == "GET":
        worlds = World.objects.all()
        return JsonResponse(
            {"worlds": worlds},
            encoder=WorldListEncoder,
        )
