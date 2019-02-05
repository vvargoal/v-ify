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
    const hashParams = queryString.parse(window.location.hash);
    console.log(hashParams);

    // Check if redirected by spotify auth request
    // If so, save access_token.
    // Existence will be checked by render to bypass login button.
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
    // TODO see if this actually makes sense anymore
    // TODO doesn't seem to work
    } else if (PerformanceNavigationTiming.type === 'back_forward') { // eslint-disable-line no-undef
      this.state = window.history.state;
    } else {
      this.state = {};
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.getSpotifyUserInfo = this.getSpotifyUserInfo.bind(this);
  }

  componentDidMount() {
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
        console.log('User data: ', data.id);
      })
      .catch(error => console.log(error));
  }

  handleLogin() {
    // Authenticate to spotify with "Implicit Grant flow"
    // Spotify will redirect back to this URI, which will
    // be detected and handled in the constructor.

    // stateKey used for CSRF prevention
    localStorage.setItem(stateKey, uuidv4());

    const {
      response_type,
      client_id,
      scope,
      redirect_uri,
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
    if ('access_token' in this.state) {
      const { access_token, id, display_name, images } = this.state;
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
          <h1>This is an example of the Implicit Grant flow</h1>
          <button id="login-button" onClick={this.handleLogin}>Log in with Spotify</button>
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
  redirect_uri: PropTypes.string.isRequired,
  spotify_authorize_uri: PropTypes.string.isRequired,
};

export default LoginPage;
