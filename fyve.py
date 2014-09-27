import logging
import os
import redis
import uuid

from flask import request, jsonify, render_template, abort, json
# from flask_oauth import OAuth

from make_app import make_json_app
from user import User

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

TWITTER_API_KEY = os.getenv('TWITTER_API_KEY')
TWITTER_API_SECRET = os.getenv('TWITTER_API_SECRET')
app = make_json_app(__name__)
redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
app.redis = redis.from_url(redis_url)

MAX_FYVE_DISTANCE = 0.011

# twitter = OAuth().remote_app('twitter',
#     base_url='https://api.twitter.com/1/',
#     request_token_url='https://api.twitter.com/oauth/request_token',
#     access_token_url='https://api.twitter.com/oauth/access_token',
#     authorize_url='https://api.twitter.com/oauth/authenticate',
#     consumer_key=TWITTER_API_KEY,
#     consumer_secret=TWITTER_API_SECRET
# )

# @app.route('/login')
# def login():
#     return twitter.authorize(callback=url_for('oauth_authorized',
#         next=request.args.get('next') or request.referrer or None))

# @app.route('/oauth-authorized')
# @twitter.authorized_handler
# def oauth_authorized(resp):
#     next_url = request.args.get('next') or url_for('index')
#     if resp is None:
#         flash(u'You denied the request to sign in.')
#         return redirect(next_url)

#     session['twitter_token'] = (
#         resp['oauth_token'],
#         resp['oauth_token_secret']
#     )
#     session['twitter_user'] = resp['screen_name']

#     flash('You were signed in as %s' % resp['screen_name'])
#     return redirect(next_url)


@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = User(username)
    if not user.exists:
        user['api_key'] = str(uuid.uuid4()).replace('-','')
        user['password'] = password
        user['photo'] = request.form['photo']
        user.save()
        user.save_token()
    else:
        user.load()
        if password != user['password']:
            abort(401)
    return jsonify({'api_key': user['api_key']})


@app.route('/')
def fyve():
    return render_template('index.html')


@app.route('/fiver', methods=['GET', 'POST'])
def fiver():
    user = User.get_user_from_token(request.form['token'])
    user.load()
    if request.method == 'POST':
        user['lat'] = request.form['lat']
        user['lng'] = request.form['lng']
        user.save()
        fivee_wait_list = User.get_wait_list('fivee')
        fivee_match = None
        fivee_distance = None
        for str_fivee in fivee_wait_list:
            fivee = json.loads(str_fivee)
            distance = user.distance(fivee['lat'], fivee['lng'])
            if fivee_distance is None or distance < fivee_distance:
                fivee_distance = distance
                fivee_match = str_fivee

        if fivee_distance is None or fivee_distance > MAX_FYVE_DISTANCE:
            # No matches
            user['match'] = "..."
            user['status'] = "waiting"
            user.save()
            User.insert_into_wait_list('fiver', json.dumps(user.wait_list_format))
            return jsonify({})

        # We found a valid match!
        User.remove_from_wait_list('fivee', fivee_match)
        fivee_match = User(json.loads(fivee_match)['username'])
        fivee_match.load()
        fivee_match['match'] = user['username']
        fivee_match['status'] = "matched"
        fivee_match.save()
        user['match'] = fivee_match['username']
        user['status'] = "matched"
        user.save()

        return jsonify(fivee_match.match_format)

    else:
        # Checking in for match
        if user['match'] == "...":
            # Still waiting
            return jsonify({})
        # We have a match!
        match_user = User(user['match'])
        match_user.load()
        return jsonify(match_user.match_format)


@app.route('/fivee', methods=['GET', 'POST'])
def fivee():
    user = User.get_user_from_token(request.form['token'])
    user.load()
    if request.method == 'POST':
        user['lat'] = request.form['lat']
        user['lng'] = request.form['lng']
        user.save()
        fiver_wait_list = User.get_wait_list('fiver')
        fiver_match = None
        fiver_distance = None
        for str_fiver in fiver_wait_list:
            fiver = json.loads(str_fiver)
            distance = user.distance(fiver['lat'], fiver['lng'])
            if fiver_distance is None or distance < fiver_distance:
                fiver_distance = distance
                fiver_match = str_fiver

        if fiver_distance is None or fiver_distance > MAX_FYVE_DISTANCE:
            # No matches
            user['match'] = "..."
            user['status'] = "waiting"
            user.save()
            User.insert_into_wait_list('fivee', json.dumps(user.wait_list_format))
            return jsonify({})

        # We found a match!
        User.remove_from_wait_list('fiver', fiver_match)
        fiver_match = User(json.loads(fiver_match)['username'])
        fiver_match['match'] = user['username']
        fiver_match['status'] = "matched"
        fiver_match.save()
        user['match'] = fiver_match['username']
        user['status'] = "matched"
        user.save()

        return jsonify(fiver_match.match_format)

    else:
        # Checking in for a match
        if user['match'] == "...":
            # Still waiting
            assert user['status'] == "waiting"
            return jsonify({})
        # We have a match!
        match_user = User(user['match'])
        match_user.load()
        return jsonify(match_user.match_format)


@app.route('/status', methods=['GET'])
def status():
    user = User.get_user_from_token(request.form['token'])
    user.load()

    return jsonify(user.status_format)


@app.route('/bail', methods=['POST'])
def bail():
    user = User.get_user_from_token(request.form['token'])
    user.load()

    user_left_hanging = User(user['match'])
    user_left_hanging.load()
    user_left_hanging['status'] = "left hanging"
    user_left_hanging.save()

    user['status'] = "cancelled"
    user.save()

    return jsonify({})


@app.route('/successawesome', methods=['POST'])
def success():
    user = User.get_user_from_token(request.form['token'])
    user.load()
    user_fyved = User(user['match'])
    user_fyved.load()

    # Fuck yeah!
    user['status'] = "fyved"
    user.save()
    user_fyved['status'] = "fyved"
    user_fyved.save()

    return jsonify({})


@app.route('/rating', methods=['POST'])
def rate():
    rated_user = User(request.form['username'])
    rated_user.rate(request.form['rating'])

    return jsonify({})
