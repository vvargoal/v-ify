import React from 'react';
import PropTypes from 'prop-types';

class UserBar extends React.Component {
  constructor(props) {
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <div className="login-box">
        <div className="login-left">
          <div className="user-name">{{ display_name }}</div>
          <div className="logout">
            <a style="padding-left: 2px" href="/accounts/logout"> Logout</a>
          </div>
        </div>
        <div className="login-right">
          <img src="{{ image_url }}"/>
        </div>
      </div>
    );
  }
}

UserBar.propTypes = {
  access_token: PropTypes.string.isRequired,
};

export default UserBar;
