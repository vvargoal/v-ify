import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './feed';

ReactDOM.render(
  <Feed CLIENT_SCOPE="user-read-email user-top-read user-read-recently-played playlist-modify-private" CLIENT_ID="e62008c8210748e89b1baf8104e251ef" RESPONSE_TYPE="token" REDIRECT_URI="" SPOTIFY_AUTHORIZE_URI="https://accounts.spotify.com/authorize" />,

  document.getElementById('reactEntry'),
);
