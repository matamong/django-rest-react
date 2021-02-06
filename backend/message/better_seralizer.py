from lolapi.models import LolUserGame
from matching.models import UserGame

class BetterGameProfileSerializing:
    
    def get_seralized_game_profile(self, user_obj, game_name, is_agreed):
        if game_name == "lol":
            return self.set_lol_serializer(LolUserGame.objects.get(user=user_obj), is_agreed)
        else: 
            return self.set_usergame_serializer(UserGame.object.get(user=user_obj), is_agreed)
    
    def set_lol_serializer(self, lol_usergame_obj, is_agreed):
        if is_agreed == True:
            lol_name = lol_usergame_obj.lol_name
        else:
            lol_name = "***"
            
        return {
                "game_nickname": lol_name,
                "region": lol_usergame_obj.region,
                "lv" : lol_usergame_obj.lol_lv,
                "rank": {
                    "솔로 티어": lol_usergame_obj.solo_tier,
                    "솔로 랭크": lol_usergame_obj.solo_rank,
                    "자유 티어": lol_usergame_obj.flex_tier,
                    "자유 랭크": lol_usergame_obj.flex_rank
                },
                "prefer_style": lol_usergame_obj.prefer_style,
                "prefer_time": lol_usergame_obj.prefer_time,
                "mic": lol_usergame_obj.mic
            }
    
    def set_usergame_serializer(self, usergame_obj, is_agreed):
        pass