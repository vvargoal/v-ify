"""Views for v-ify."""
import logging
from django.shortcuts import redirect
from django.http import HttpResponse
from django.template.loader import get_template

logger = logging.getLogger(__name__)

def index(request):
    """Entrypoint for React app."""
    template = get_template('index.html')
    context = {**request.session}
    return HttpResponse(template.render(context, request))

def logout_view(_):
    """Logout redirect."""
    return redirect('index')
