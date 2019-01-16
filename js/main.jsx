import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './loginpage';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <LoginPage
      client_scope="user-read-email user-top-read user-read-recently-played playlist-modify-private"
      client_id="E62008c8210748e89b1baf8104e251ef"
      response_type="token"
      redirect_uri="http://localhost:1337/javascript_test/"
      spotify_authorize_uri="https://accounts.spotify.com/authorize"
    />
  </ErrorBoundary>,

  document.getElementById('reactEntry'),
);
