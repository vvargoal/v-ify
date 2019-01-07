from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.utils.crypto import get_random_string
from django.template.loader import get_template
import requests

from . import settings

SPOTIFY_API_URL = 'https://api.spotify.com/v1/'

# todo this is broken
# @login_required
def index(request):
    """Display useful info."""
    # check if authcode in session
    # check if authcode is active
    # if 'access_token' in request.session:
    #     return HttpResponse(f"You're at the vstats index. {request.session['access_token']}")
    template = get_template('index.html')
    # TODO is this a good idea
    context = {**request.session}
    return HttpResponse(template.render(context, request))

def login(request):
    """Redirect to spotify for authentication."""
    scope = 'user-read-email user-top-read user-read-recently-played playlist-modify-private'
    request.session['state'] = get_random_string(length=16)
    request.session['auth_state'] = 'spotify_auth_state'
    url_endpoint = 'https://accounts.spotify.com/authorize?'
    params = {'response_type': 'code',
              'client_id': settings.SPOTIFY_CLIENT_ID,
              'scope': scope,
              'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
              'state': request.session['state']}
    req = requests.get(url_endpoint, params=params)
    return redirect(req.url)

def logout_view(request):
    """Logout of session."""
    logout(request)
    return HttpResponse("You have been logged out.")

def callback(request):
    """Parse authentication from spotify and generate auth token."""
    # validate code, state
    # create user if needed and login

    error = request.GET.get('error')
    if error is not None:
        return HttpResponse(f"Invalid login: {error}")

    state = request.GET.get('state')
    if (state is None
            or 'state' not in request.session
            or state != request.session['state']):
        return HttpResponse(f"Invalid login")

    code = request.GET.get('code')
    # print(code, state)
    url = 'https://accounts.spotify.com/api/token'
    data = {'code': code,
            'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
            'grant_type': 'authorization_code',
            'client_id': settings.SPOTIFY_CLIENT_ID,
            'client_secret': settings.SPOTIFY_CLIENT_SECRET}
    response = requests.post(url, data=data)
    try:
        response_data = response.json()
    except ValueError as err:
        return HttpResponse(f"Invalid login: {err}")

    if response.status_code != 200:
        return HttpResponse(f"Invalid login: {response_data}")

    request.session['access_token'] = response_data['access_token']
    request.session['refresh_token'] = response_data['refresh_token']

    get_spotify_user_info(request)

    return redirect('index')

def get_from_spotify(request, endpoint, data=None):
    """Returns spotify data in json format."""
    url = SPOTIFY_API_URL + endpoint 
    headers = {'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': f"Bearer {request.session['access_token']}"}
    response = requests.get(url, headers=headers, data=data)

    if response.status_code != 200:
        pass

    try:
        response_data = response.json()
    except ValueError as err:
        pass

    return response_data

def get_spotify_user_info(request):
    """
        Fills in user info into requests session.
        Requires auth_token is valid.
    """
    response_data = get_from_spotify(request, 'me')

    request.session['display_name'] = response_data['display_name']
    request.session['email'] = response_data['email']
    request.session['spotify_id'] = response_data['id']
    request.session['image_url'] = response_data['images'][0]['url']

def get_top(request):
    pass

def get_top_tracks(request):
    pass

def refresh_token(request):
    """Refresh access token with spotify."""
