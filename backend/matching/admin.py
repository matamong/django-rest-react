from django.contrib import admin
from .models import Game, UserGame

# Register your models here.

class GameAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'genre')
    list_display_links = ('name', 'genre')
    list_filter = ('genre', )
    search_fields = ('name', 'genre')
    list_per_page = 5

admin.site.register(Game, GameAdmin)

class UserGameAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'game')
    list_display_links = ('user', )
    list_filter = ('user', 'game')
    search_fields = ('user', )
    list_per_page = 10

admin.site.register(UserGame, UserGameAdmin)