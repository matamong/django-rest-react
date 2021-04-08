from django.contrib import admin
from .models import UserAccount, Profile, Avatar, Title

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_diplay = ('email', 'name')
    search_fields = ('email', 'name')

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'avatar', 'title')

class AvatarAdmin(admin.ModelAdmin):
    list_display = ('name', 'url')

class TitleAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(UserAccount, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Avatar, AvatarAdmin)
admin.site.register(Title, TitleAdmin)