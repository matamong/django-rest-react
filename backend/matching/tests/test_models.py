from django.test import TestCase
from ..models import Game, UserGame
from accounts.models import UserAccount

class BaseModelTestCase(TestCase):

    # 클래스 전체에서 사용되는 설정으로 테스트 할 때 딱 한 번만 실행된다.
    @classmethod
    def setUpClass(cls):
        super(BaseModelTestCase, cls).setUpClass()
        cls.user = UserAccount(
            email = 'gameduosdev@gmail.com',
            name = 'gameduosdev',
            is_active = 1,
            is_staff = 1,
        )
        cls.user.save()
        cls.game = Game(
            name = 'lol', 
            genre = 'AOS', 
            developer = 'Riot',
            publisher = 'Riot'
            )
        cls.game.save()
        cls.usergame = UserGame(
            user = cls.user,
            game = cls.game,
            game_nickname = '마석용',
            is_random_agreed = 1,
            is_profile_agreed = 1,
            self_introduction = 'ㅎㅇ'
        )
        cls.usergame.save()

class GameModelTestCase(BaseModelTestCase):
    def test_created_properly(self):
        self.assertEqual(self.game.name, 'lol')
        self.assertEqual(self.game.genre, 'AOS')

class UserGameModelTestCase(BaseModelTestCase):
    def test_created_propery(self):
        self.assertEqual(self.usergame.game_nickname, '마석용')
        self.assertEqual(self.game.id ,self.usergame.game.id)
        self.assertEqual(self.user.id, self.usergame.user.id)