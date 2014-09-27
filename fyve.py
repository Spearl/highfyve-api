import logging
import os
import redis

from flask import request

from make_app import make_json_app
from user import User

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

TWITTER_API_KEY = os.getenv('TWITTER_API_KEY')
TWITTER_API_SECRET = os.getenv('TWITTER_API_SECRET')
app = make_json_app(__name__)
redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
app.redis = redis.from_url(redis_url)


@app.route('/')
def hello():
    return "high fyve! "*1000


@app.route('/auth', methods=['POST'])
def auth():
    pass


@app.route('/fiver', methods=['GET', 'POST'])
def fiver():
    if request.method == 'POST':
        pass
    else:
        pass


@app.route('/fivee', methods=['GET', 'POST'])
def fivee():
    if request.method == 'POST':
        pass
    else:
        pass


@app.route('/bail', methods=['POST'])
def bail():
    pass


@app.route('/successawesome', methods=['POST'])
def success():
    pass


@app.route('/rating', methods=['POST'])
def rate():
    pass
