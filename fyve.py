import logging
import os
import redis

from flask import request, jsonify
from flask_oauth import Oauth

from make_app import make_json_app
from user import User

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

TWITTER_API_KEY = os.getenv('TWITTER_API_KEY')
TWITTER_API_SECRET = os.getenv('TWITTER_API_SECRET')
app = make_json_app(__name__)
redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
app.redis = redis.from_url(redis_url)

twitter = Oauth().remote_app('twitter',
    base_url='https://api.twitter.com/1/',
    request_token_url='https://api.twitter.com/oauth/request_token',
    access_token_url='https://api.twitter.com/oauth/access_token',
    authorize_url='https://api.twitter.com/oauth/authenticate',
    consumer_key=TWITTER_API_KEY,
    consumer_secret=TWITTER_API_SECRET
)

@app.route('/login')
def login():
    return twitter.authorize(callback=url_for('oauth_authorized',
        next=request.args.get('next') or request.referrer or None))

@app.route('/oauth-authorized')
@twitter.authorized_handler
def oauth_authorized(resp):
    next_url = request.args.get('next') or url_for('index')
    if resp is None:
        flash(u'You denied the request to sign in.')
        return redirect(next_url)

    session['twitter_token'] = (
        resp['oauth_token'],
        resp['oauth_token_secret']
    )
    session['twitter_user'] = resp['screen_name']

    flash('You were signed in as %s' % resp['screen_name'])
    return redirect(next_url)

@app.route('/')
def hello():
    return "high fyve! "*5000


@app.route('/auth', methods=['POST'])
def auth():
    pass


@app.route('/user', methods=['GET'])
def user_info():
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
