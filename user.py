import logging

from redis_object import RedisObject

log = logging.getLogger(__name__)


class User(RedisObject):
    def __init__(self, username):
        self.username = username

    @property
    def key(self):
        return "%s:%s" % ('u', self.username)
