import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

const CLIENT_STATE = uuidv4();

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
  }

  componentDidMount() {
    this.authenticateSpotify();
  }

  authenticateSpotify() {
  }

  render() {
    return (<p>Look I rendered a UUID: {this.props.CLIENT_SCOPE}</p>);
  }
}

Feed.propTypes = {
  CLIENT_SCOPE: PropTypes.string.isRequired,
  CLIENT_ID: PropTypes.string.isRequired,
  RESPONSE_TYPE: PropTypes.string.isRequired,
  REDIRECT_URI: PropTypes.string.isRequired,
  SPOTIFY_AUTHORIZE_URI: PropTypes.string.isRequired,
};

export default Feed;
