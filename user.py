import logging
import math

from redis_object import RedisObject

log = logging.getLogger(__name__)


class User(RedisObject):
    def __init__(self, username):
        super(User, self).__init__()
        self['username'] = username

    @property
    def key(self):
        return "%s:%s" % ('u', self['username'])

    @property
    def ratings_key(self):
        return "%s:%s" % ('ratings', self['username'])

    @property
    def wait_list_format(self):
        list_format = {
            "username": self['username'],
            "lat": self['lat'],
            "lng": self['lng']
        }
        return list_format

    @property
    def match_format(self):
        match = self.wait_list_format
        match['photo'] = self['photo']
        return match

    @property
    def status_format(self):
        return {"status": self['status']}

    def save_token(self):
        self.redis.set(self['api_key'], self['username'])

    def rate(self, rating):
        try:
            rating = int(rating)
        except ValueError:
            return

        self.redis.sadd(self.ratings_key, rating)

    @classmethod
    def get_user_from_token(cls, token):
        username = cls.get_redis().get(token)
        return cls(username) if username else None

    @classmethod
    def get_wait_list(cls, list_key):
        return cls.get_redis().smembers(list_key)

    @classmethod
    def insert_into_wait_list(cls, list_key, value):
        return cls.get_redis().sadd(list_key, value)

    @classmethod
    def remove_from_wait_list(cls, list_key, value):
        return cls.get_redis().srem(list_key, value)

    def distance(self, lat, lng):
        return math.sqrt((lat - self['lat'])**2 + (lng - self['lng'])**2)
