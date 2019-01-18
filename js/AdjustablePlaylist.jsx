import React from 'react';
import PropTypes from 'prop-types';
import PlaylistHeader from './PlaylistHeader';
import Playlist from './Playlist';

// Needs a dropdown to change state, then render playlist
// - dropdown live in header
// based on that state
// Pass down access token to playlist

const TIME_RANGES = ['short_term', 'medium_term', 'long_term'];

class AdjustablePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time_range: TIME_RANGES[0],
    };
  }
  render() {
    return (
      <div className="AdjustablePlaylist">
        <PlaylistHeader time_range={this.state.time_range} />
        <Playlist
          access_token={this.props.access_token}
          time_range={this.state.time_range}
          endpoint="https://api.spotify.com/v1/me/top/tracks"
        />
      </div>
    );
  }
}

AdjustablePlaylist.propTypes = {
  access_token: PropTypes.string.isRequired,
};

export default AdjustablePlaylist;
