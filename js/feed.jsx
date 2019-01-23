import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import uuidv4 from 'uuid/v4';

const stateKey = 'spotify_auth_state';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    const url_params = queryString.parse(location.search);
    console.log(url_params);
    if (PerformanceNavigationTiming.type === 'back_forward') { // eslint-disable-line no-undef
      this.state = history.state;
    } else {
      this.state = {
        // TODO enum?
        time_range: 'short_term',
        url_params: queryString.parse(location.search),
      };
    }
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
  }

  componentDidMount() {
    this.authenticateSpotify();
  }

  authenticateSpotify() {
    localStorage.setItem(stateKey, uuidv4());
    const params = {
      response_type: this.props.response_type,
      client_id: this.props.client_id,
      scope: this.props.scope,
      redirect_uri: this.props.redirect_uri,
      state: localStorage.getItem(stateKey),
    };
    const url = `${this.props.spotify_authorize_uri}?${queryString.stringify(params)}`;
    window.location.replace(url);
  }

  render() {
    return (<p>Look I rendered a UUID: {this.props.scope}</p>);
  }
}

Feed.propTypes = {
  scope: PropTypes.string.isRequired,
  client_id: PropTypes.string.isRequired,
  response_type: PropTypes.string.isRequired,
  redirect_uri: PropTypes.string.isRequired,
  spotify_authorize_uri: PropTypes.string.isRequired,
};

export default Feed;
