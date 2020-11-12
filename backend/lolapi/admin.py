from django.contrib import admin
from .models import LolUserGame, LolPosition, LolPreferMode

# Register your models here.

class LolUserGameAdmin(admin.ModelAdmin):
    list_diplay = ('id')

admin.site.register(LolUserGame, LolUserGameAdmin)


class LolPositionAdmin(admin.ModelAdmin):
    list_display = ('id',)

admin.site.register(LolPosition, LolPositionAdmin)


class LolPreferModeAdmin(admin. ModelAdmin):
    list_display = ('id',)

admin.site.register(LolPreferMode, LolPreferModeAdmin)
