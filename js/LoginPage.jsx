import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import queryString from 'query-string';
import AdjustablePlaylist from './AdjustablePlaylist';
import createQueryUrl from './Utilities';

const stateKey = 'spotify_auth_state';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // Check if redirected by spotify auth request
    // If so, save access_token.
    // Existence will be checked by render to bypass login button.
    const hashParams = queryString.parse(window.location.hash);
    if ('access_token' in hashParams && 'state' in hashParams) {
      if (hashParams.state !== localStorage.getItem(stateKey)) {
        throw new Error('Recieved state does not match stored.');
      }
      this.state = {
        access_token: hashParams.access_token,
      };
      // Remove spotify auth data from location
      window.history.replaceState('', document.title, window.location.pathname);
      this.getSpotifyUserInfo();
    } else {
      this.state = {};
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.getSpotifyUserInfo = this.getSpotifyUserInfo.bind(this);
  }

  getSpotifyUserInfo() {
    const endpoint = 'https://api.spotify.com/v1/me';
    const { access_token } = this.state;
    // TODO make this a seperate function
    // response and data handlers?
    fetch(endpoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const { id, display_name, images } = data;
        this.setState({ id, display_name, images });
      })
      .catch(error => console.log(error));
  }

  handleLogin() {
    // Authenticate to spotify with "Implicit Grant flow"
    // Spotify will redirect back to this URI, which will
    // be detected and handled in the constructor.

    // stateKey used for CSRF prevention
    localStorage.setItem(stateKey, uuidv4());

    const redirect_uri = window.location.href;

    const {
      response_type,
      client_id,
      scope,
      spotify_authorize_uri,
    } = this.props;

    const params = {
      response_type,
      client_id,
      scope,
      redirect_uri,
      state: localStorage.getItem(stateKey),
    };

    const url = createQueryUrl(spotify_authorize_uri, params);
    window.location.replace(url);
  }

  render() {
    if ('display_name' in this.state) {
      const {
        access_token,
        id,
        display_name,
        images,
      } = this.state;
      return (
        <AdjustablePlaylist
          access_token={access_token}
          id={id}
          display_name={display_name}
          images={images}
        />
      );
    }
    return (
      <div className="container">
        <div id="login">
          <h1>Log in to see your Spotify Top Tracks</h1>
          <button
            type="button"
            id="login-button"
            onClick={this.handleLogin}
          >
            Log in with Spotify
          </button>
        </div>
        <div id="loggedin">
          <div id="user-profile" />
          <div id="oauth" />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  scope: PropTypes.string.isRequired,
  client_id: PropTypes.string.isRequired,
  response_type: PropTypes.string.isRequired,
  spotify_authorize_uri: PropTypes.string.isRequired,
};

export default LoginPage;
