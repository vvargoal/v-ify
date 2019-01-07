class Spotify_object():
    def __init__(self, data: dict) -> None:
        self.id = data['id']
        self.uri = data['uri']
        self.type = data['type']
        self.href = data['href']
        self.external_urls = data['external_urls']

class Music_object(Spotify_object):
    def __init__(self, data: dict) -> None:
        super().__init__(data)
        self.name = data['name']

class Artist(Music_object):
    """
    external_urls	an external URL object	Known external URLs for this artist.
    href	string	A link to the Web API endpoint providing full details
    id	string	The Spotify ID for the artist.
    name	string	The name of the artist
    type	string	The object type: "artist"
    uri	string	The Spotify URI for the artist.
    """
    def __init__(self, data: dict) -> None:
        super().__init__(data)
        if data['type'] != 'artist':
            raise ValueError

class Track(Music_object):
    """track object (simplified)"""
    def __init__(self, data: dict) -> None:
        super().__init__(data)
        if data['type'] != 'track':
            raise ValueError

class Album(Music_object):
    """
    artists	array of simplified artist objects	The artists of the album. Each artist object includes a link in href to more detailed information about the artist.
    available_markets	array of strings	The markets in which the album is available: ISO 3166-1 alpha-2 country codes. Note that an album is considered available in a market when at least 1 of its tracks is available in that market.
    external_urls	an external URL object	Known external URLs for this album.
    href	string	A link to the Web API endpoint providing full details of the album.
    id	string	The [/documentation/web-api/#spotify-uris-and-ids) for the album.
    images	array of image objects	The cover art for the album in various sizes, widest first.
    name	string	The name of the album. In case of an album takedown, the value may be an empty string.
    release_date	string	The date the album was first released, for example 1981. Depending on the precision, it might be shown as 1981-12 or 1981-12-15.
    release_date_precision	string	The precision with which release_date value is known: year , month , or day.
    type	string	The object type: “album”
    uri	string	The Spotify URI for the album.
    """
    def __init__(self, data: dict) -> None:
        super().__init__(data)
        if data['type'] != 'album':
            raise ValueError
        self.artists = data['artists']
        self.images = data['images']
        self.release_date = data['release_date']

# TODO probably won't use
class User(Spotify_object):
    """
    display_name	string	The name displayed on the user’s profile. null if not available.
    email	string	The user’s email address, as entered by the user when creating their account. Important! This email address is unverified; there is no proof that it actually belongs to the user. This field is only available when the current user has granted access to the user-read-email scope.
    images	an array of image objects	The user’s profile image.
    type	string	The object type: “user”
    """
    def __init__(self, data: dict) -> None:
        super().__init__(data)
        if data['type'] != 'user':
            raise ValueError
        self.display_name = data['display_name']
        self.email = data['email']
        self.images = data['images']

class Playlist(Music_object):
    def __init__(self, data: dict) -> None:
        super().__init__(data)
        if data['type'] != 'playlist':
            raise ValueError
