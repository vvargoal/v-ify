import React from 'react';
import PropTypes from 'prop-types';


/**
 * For displaying messages to user.
 */
class MessageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowing: true };
  }

  render() {
    const { isShowing } = this.state;
    const { message, isError, timeout } = this.props;

    // For styling
    let className = 'message-bar';
    if (isShowing && message) {
      className += ' message-bar-show';
    }
    if (isError) {
      className += ' message-bar-error';
    }

    /**
     * Remove message after timeout seconds.
     * Make sure timeout value meshes with css fade
     */
    setTimeout(() => {
      this.setState({ isShowing: false });
    }, timeout);

    return (
      <div className={className}>
        {message}
      </div>
    );
  }
}

MessageBar.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  timeout: PropTypes.number.isRequired,
};

export default MessageBar;
