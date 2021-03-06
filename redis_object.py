import logging

import flask

log = logging.getLogger(__name__)


class RedisObject(object):

    def __init__(self):
        self.data = {}

    @property
    def key(self):
        raise NotImplementedError

    @property
    def exists(self):
        return self.redis.exists(self.key)

    @property
    def redis(self):
        return self.get_redis()

    def __getitem__(self, key):
        return self.data.get(key)

    def __setitem__(self, key, value):
        self.data[key] = value

    def save(self):
        self.redis.hmset(self.key, self.data)

    def load(self):
        self.data = self.redis.hgetall(self.key)

    @classmethod
    def get_redis(cls):
        return flask.current_app.redis
