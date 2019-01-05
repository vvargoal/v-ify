from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.utils.crypto import get_random_string
import requests

from . import settings

# todo this is broken
# @login_required
def index(request):
    return HttpResponse(f"Hello, world. You're at the vstats index. {request.session['access_token']}")

def login(request):
    scope = 'user-read-email user-top-read user-read-recently-played playlist-modify-private'
    request.session['state'] = get_random_string(length=16)
    auth_state = 'spotify_auth_state'
    url_endpoint = 'https://accounts.spotify.com/authorize?'
    params = {'response_type': 'code',
              'client_id': settings.SPOTIFY_CLIENT_ID,
              'scope': scope,
              'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
              'state': request.session['state']}
    req = requests.get(url_endpoint, params=params)
    return redirect(req.url)

def logout_view(request):
    logout(request)
    return HttpResponse("You have been logged out.")

def callback(request):
    """Get access token from spotify and redirect."""
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

    req = requests.post(url, data=data)

    try:
        response_data = req.json()
    except ValueError as err:
        return HttpResponse(f"Invalid login: {err}")

    if req.status_code != 200:
        return HttpResponse(f"Invalid login: {response_data}")

    request.session['access_token'] = response_data['access_token']
    request.session['refresh_token'] = response_data['refresh_token']

    # redirect_url = request.GET.get('')

    return redirect('index')

def refresh_token(request):
    """Refresh access token with spotify."""
