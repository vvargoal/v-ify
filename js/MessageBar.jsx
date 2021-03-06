import React from 'react';
import PropTypes from 'prop-types';


/**
 * For displaying messages to user.
 */
export default class MessageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowing: true };
    this.currentTimeout = null;
  }

  componentWillUnmount() {
    // Avoid warning where setTimeout is called on unmounted component
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
  }

  render() {
    const { isShowing } = this.state;
    const { message, isError, timeout } = this.props;

    /**
     * Remove message after timeout seconds.
     * Clear current timeout so timout resets with each message
     * Make sure timeout value meshes with css fade
     */
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
    this.currentTimeout = setTimeout(() => {
      this.setState({ isShowing: false });
    }, timeout);

    if (!isShowing || !message) {
      return <div />;
    }

    // For styling
    let className = 'message-bar';
    if (isError) {
      className += ' message-bar-error';
    }

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
