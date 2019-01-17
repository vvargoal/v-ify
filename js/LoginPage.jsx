import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import uuidv4 from 'uuid/v4';
import AdjustablePlaylist from './AdjustablePlaylist';

const stateKey = 'spotify_auth_state';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    const hashParams = queryString.parse(location.hash);
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
      history.pushState('', document.title, window.location.pathname);
    // TODO see if this actually makes sense anymore
    } else if (PerformanceNavigationTiming.type === 'back_forward') { // eslint-disable-line no-undef
      this.state = history.state;
    } else {
      this.state = {};
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
  }

  handleLogin() {
    // Authenticate to spotify with "Implicit Grant flow"
    // Spotify will redirect back to this URI, which will
    // be detected and handled in the constructor.
    localStorage.setItem(stateKey, uuidv4());
    const params = {
      response_type: this.props.response_type,
      client_id: this.props.client_id,
      scope: this.props.client_scope,
      redirect_uri: this.props.redirect_uri,
      state: localStorage.getItem(stateKey),
    };
    const url = `${this.props.spotify_authorize_uri}?${queryString.stringify(params)}`;
    window.location.replace(url);
  }

  render() {
    if ('access_token' in this.state) {
      return <AdjustablePlaylist access_token={this.state.access_token} />;
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
  client_scope: PropTypes.string.isRequired,
  client_id: PropTypes.string.isRequired,
  response_type: PropTypes.string.isRequired,
  redirect_uri: PropTypes.string.isRequired,
  spotify_authorize_uri: PropTypes.string.isRequired,
};

export default LoginPage;
