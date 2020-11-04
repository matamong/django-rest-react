from django.db import models
from django.utils.timezone import now
from django.conf import settings

# Create your models here.

class Game(models.Model):
    class GameGenre(models.TextChoices):
        FPS = 'FPS'
        AOS = 'AOS'
        MMORPG = 'MMORPG'
        SIMULATION = 'SIMULATION'
        PUZZLE = 'PUZZLE'
        DEFENCE = 'DEFENCE'
        ADVENTURE = 'ADVENTURE'
        ACTION_ADVENTURE = 'ACTION_ADVENTURE'
        HORROR = 'HORROR'
        CASUAL = 'CASUAL'
        RHYTHM = 'RHYTHM'

    name = models.CharField(max_length=200, unique=True)
    genre = models.CharField(max_length=200, choices=GameGenre.choices)
    developer = models.CharField(max_length=200)
    publisher = models.CharField(max_length=200)
    game_photo = models.ImageField(upload_to='game/%Y/%m/%d/')

    def __str__(self):
        return self.name

class UserGame(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    game_nickname = models.CharField(max_length=200)
    is_random_agreed = models.BooleanField(default=True)
    is_profile_agreed = models.BooleanField(default=True)
    created_date = models.DateField(default=now)
    self_introduction = models.TextField(blank=True)
