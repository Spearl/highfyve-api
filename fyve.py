import logging
import os
import redis

from make_app import make_json_app

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

TWITTER_API_KEY = os.getenv('TWITTER_API_KEY')
TWITTER_API_SECRET = os.getenv('TWITTER_API_SECRET')
app = make_json_app(__name__)
redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
redis = redis.from_url(redis_url)

@app.route('/')
def hello():
    return "high fyve!"

@app.route('/fiver')
def fiver():
    pass

@app.route('/fivee')
def fivee():
    pass

@app.route('/bail')
def bail():
    pass

@app.route('/successawesome')
def success():
    pass

@app.route('/rating')
def rate():
    pass
