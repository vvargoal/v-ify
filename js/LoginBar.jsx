import React from 'react';
import PropTypes from 'prop-types';

const blank_user_url = '/static/images/unknown_user.png';

export default function LoginBar(props) {
  const { display_name, images, id } = props;
  const image_url = (images && images.length > 0) ? images[0].url : blank_user_url;
  return (
    <header className="header">
      <div className="title">
        <a href="/">v-ify</a>
      </div>
      <div className="login-box">
        <div className="login-left">
          <div className="user-name">{display_name}</div>
          <div className="logout">
            <a href="/logout"> Logout</a>
          </div>
        </div>
        <div className="login-right">
          <img alt={id} src={image_url} />
        </div>
      </div>
    </header>
  );
}

LoginBar.propTypes = {
  display_name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // images: PropTypes.arrayOf(React.propTypes.string).isRequired,
};
