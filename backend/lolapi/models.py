from django.db import models
from django.conf import settings

# Create your models here.

class LolUserGame(models.Model):
    class Region(models.TextChoices):
        BRAZIL = 'BR'
        EUROPE_NORDIC_AND_EAST = 'EUN1'
        EUROPE_WEST = 'EUW1'
        LATIN_AMERICA_NORTH = 'LA1'
        LATIN_AMERICA_SOUTH = 'LA2'
        NORTH_AMERICA = 'NA'
        OCEANIA = 'OC1'
        RUSSIA = 'RU1'
        TURKEY = 'TR'
        JAPAN = 'JP1'
        REPUBLIC_OF_KOREA = 'KR'
        
    class Tier(models.TextChoices):
        CHALLENGER = 'CHALLENGER'
        GRANDMASTER = 'GRANDMASTER'
        MASTER = 'MASTER'
        DIAMOND = 'DIAMOND'
        PLATINUM = 'PLATINUM'
        GOLD = 'GOLD'
        SILVER = 'SILVER'
        BRONZE = 'BRONZE'
        IRON = 'IRON'
        UNRANKED = 'UNRANKED'
    
    class Rank(models.TextChoices):
        UNRANKED = 'UNRANKED'
        ONE = 'I'
        TWO = 'II'
        THREE ='III'
        FOUR = 'IV'
        FIVE = 'V'
    
    class Style(models.IntegerChoices):
        ENJOY = 1
        A_LITTLE_ENJOY = 2
        AVERAGE = 3
        A_LITTLE_TIGHT = 4
        TIGHT = 5

    user = models.OneToOneField(settings.AUTH_USER_MODEL, unique=True, on_delete=models.CASCADE)
    lol_name = models.CharField(max_length=200, unique=True)
    region = models.CharField(max_length=10, choices=Region.choices, default=Region.REPUBLIC_OF_KOREA)
    lol_id = models.CharField(max_length=200)
    lol_ppuid = models.CharField(max_length=300)
    lol_lv = models.IntegerField(blank=True, null=True)
    solo_tier = models.CharField(max_length=50, choices=Tier.choices, default=Tier.UNRANKED)
    solo_rank = models.CharField(max_length=10, choices=Rank.choices, default=Tier.UNRANKED)
    flex_tier = models.CharField(max_length=50, choices=Tier.choices, default=Tier.UNRANKED)
    flex_rank = models.CharField(max_length=10, choices=Rank.choices, default=Tier.UNRANKED)
    prefer_style = models.IntegerField(choices=Style.choices)
    prefer_time = models.CharField(max_length=200)
    main_champ_key = models.IntegerField(blank=True, null=True) # 프론트에서 고평가 챔프 api 불러와서 선택하게 해주기
    intro = models.TextField()
    # 매칭용 숫자 넣기 티어 랭크 합쳐서 점수로 

    def __str__(self):
        return self.lol_name

class LolPosition(models.Model):
    class Proficiency(models.IntegerChoices):
        NEVER = 0
        BAD_BUT_POSSIBLE = 1
        NOT_BAD = 2
        SO_SO = 3
        GOOD = 4
        VERY_GOOD = 5

    usergame = models.OneToOneField(LolUserGame, related_name='lol_position', on_delete=models.CASCADE)
    is_top_possible = models.IntegerField(choices=Proficiency.choices)
    is_jungle_possible = models.IntegerField(choices=Proficiency.choices)
    is_mid_possible = models.IntegerField(choices=Proficiency.choices)
    is_ad_possible = models.IntegerField(choices=Proficiency.choices)
    is_sup_possible = models.IntegerField(choices=Proficiency.choices)


class LolPreferMode(models.Model):
    usergame = models.OneToOneField(LolUserGame, related_name='lol_prefer_mode', on_delete=models.CASCADE)
    ai = models.BooleanField()
    normal = models.BooleanField()
    solo_duo_rank = models.BooleanField()
    flex_rank = models.BooleanField()
    howling_abyss = models.BooleanField()
    team_fight_tactics = models.BooleanField()
    team_fight_tactics_rank = models.BooleanField()
    

