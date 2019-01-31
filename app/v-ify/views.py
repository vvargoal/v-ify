from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.utils.crypto import get_random_string
from django.template.loader import get_template
import logging
import requests
from . import settings

logger = logging.getLogger(__name__)

def index(request):
    """Test the js rendering."""
    template = get_template('js.html')
    context = {**request.session}
    return HttpResponse(template.render(context, request))
