import React from 'react';
import PropTypes from 'prop-types';
import Playlist from './Playlist';
import LoginBar from './LoginBar';
import MessageBar from './MessageBar';


class AdjustablePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isError: false,
    };

    this.handleMessages = this.handleMessages.bind(this);
  }

  handleMessages(message, isError = false) {
    this.setState({ message, isError, isShowing: true });
  }

  render() {
    const {
      access_token,
      id,
      display_name,
      images,
    } = this.props;

    const { message, isError, isShowing } = this.state;

    return (
      <div className="AdjustablePlaylist">
        <LoginBar
          display_name={display_name}
          id={id}
          images={images}
        />
        <MessageBar
          message={message}
          isError={isError}
          isShowing={isShowing}
          timeout={3000}
        />
        <Playlist
          access_token={access_token}
          id={id}
          endpoint="https://api.spotify.com/v1/me/top/tracks"
          printMessage={this.handleMessages}
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
