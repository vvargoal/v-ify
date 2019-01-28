import React from 'react';
import PropTypes from 'prop-types';
import Playlist from './Playlist';
import LoginBar from './LoginBar';


class AdjustablePlaylist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      access_token,
      id,
      display_name,
      images,
    } = this.props;

    return (
      // TODO need to add notifier bar
      <div className="AdjustablePlaylist">
        <LoginBar
          display_name={display_name}
          id={id}
          images={images}
        />
        <Playlist
          access_token={access_token}
          id={id}
          endpoint="https://api.spotify.com/v1/me/top/tracks"
        />
      </div>
    );
  }
}

AdjustablePlaylist.propTypes = {
  access_token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  display_name: PropTypes.string.isRequired,
};

export default AdjustablePlaylist;
