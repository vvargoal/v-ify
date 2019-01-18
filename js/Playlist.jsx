import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import SongRow from './SongRow';

// Get access_token from super
// Fetch songs??
// Songrow will display songs
class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // TODO pass down url
    // TODO send time_range parameter
    fetch(this.props.endpoint, {
      headers: { Authorization: `Bearer ${this.props.access_token}` },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState(data);
      })
      .catch(error => console.log(error)); // TODO catch invalid credential
  }

  render() {
    if (this.state.items.length > 0) {
      return (
        <ul>
          {this.state.items.map(item => <SongRow {...item} />)}
        </ul>
      );
    }
    return ('No data to display');
  }
}

Playlist.propTypes = {
  access_token: PropTypes.string.isRequired,
  time_range: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default Playlist;
