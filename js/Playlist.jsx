import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import SongRow from './SongRow';
import RangeSelector from './RangeSelector';

// Get access_token from super
// Fetch songs
// Display songs in react-table
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
    return (
      <div>
        <ReactTable
          data={this.state.items}
          showPagination={false}
          columns={[
            {
              Header: <RangeSelector />,
              columns: [
                {
                  Header: 'Title',
                  accessor: 'name', // Needed for sorting
                  Cell: d => <a href={d.original.uri}>{d.original.name}</a>,
                },
                {
                  Header: 'Artist',
                  id: 'artist',
                  accessor: d => d.artists[0].name, // TODO this could break 
                  // Display artists as comma seperated links to uri
                  Cell: d => {
                    const output = d.original.artists.map((artist,i) => 
                      <React.Fragment key={i}>
                        <a href={artist.uri}>{artist.name}</a>
                        { d.original.artists.length - 1 === i ? '' : ', ' } 
                      </React.Fragment>
                    );
                    return output;
                  },
                },
              ],
            },
          ]}
          pageSize={this.state.items.length}
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
