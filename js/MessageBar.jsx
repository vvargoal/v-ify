import React from 'react';
import PropTypes from 'prop-types';

class MessageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showing: true };
  }

  componentDidMount() {
  }

  render() {
    const { showing } = this.state;
    const { message, isError, timeout } = this.props;

    if (!showing || !message) {
      return null;
    }

    // Status bar goes away after timeout
    setTimeout(() => {
      this.setState({ message: '', showing: false });
    }, timeout);

    return (
      <div className="MessageBar">
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
