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
    console.log("This is data: ", this.state.items);
    return (
      <div>
        <ReactTable
          data={this.state.items}
          columns={[
            {
              Header: 'Playlist',
              columns: [
                {
                  Header: 'Title',
                  accessor: 'name',
                },
                {
                  Header: 'Artist',
                  id: 'artist',
                  accessor: d => d.artists[0].name,
                },
              ],
            },
          ]}
          defaultPageSize={50}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

Playlist.propTypes = {
  access_token: PropTypes.string.isRequired,
  time_range: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default Playlist;
