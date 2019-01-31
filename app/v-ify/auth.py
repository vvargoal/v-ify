from django.contrib.auth.models import User

class SpotifyBackend:
    def authenticate(self, request, token=None):
        # Check the token and return a user.
        pass

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist: # pylint: disable=maybe-no-member
            return None
