import logging
import os
import redis

from make_app import make_json_app

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

app = make_json_app(__name__)
redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
redis = redis.from_url(redis_url)

@app.route('/')
def hello():
    return "Hello world"
