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
      messageNumber: 0,
    };

    this.handleMessages = this.handleMessages.bind(this);
  }

  handleMessages(message, isError = false) {
    this.setState(prevState => ({
      message,
      isError,
      messageNumber: prevState.messageNumber + 1,
    }));
  }

  render() {
    const {
      access_token,
      id,
      display_name,
      images,
    } = this.props;

    const { message, isError, messageNumber } = this.state;

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
          timeout={3000}
          key={messageNumber}
        />
        <Playlist
          access_token={access_token}
          id={id}
          endpoint="https://api.spotify.com/v1/me/top/tracks"
          printMessage={this.handleMessages}
        />
        <div className="github-link">
          <a href="http://github.com/vvargoal/v-ify">Github</a>
        </div>
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
