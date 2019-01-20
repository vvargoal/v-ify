import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import SongRow from './SongRow';
import RangeSelector from './RangeSelector';
import createQueryUrl from './Utilities';

const time_range_options = [
  { value: 'short_term', label: 'Last month' },
  { value: 'medium_term', label: 'Last 6 months' },
  { value: 'long_term', label: 'Last year' }
]

const limit_options = [
  { value: 10, label: 'Top 10' },
  { value: 20, label: 'Top 20' },
  { value: 50, label: 'Top 50' }
]

// Get access_token from super
// Fetch songs
// Display songs in react-table
class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      time_range: time_range_options[1].value,
      limit: 20,
    };

    this.fetchTopTracks = this.fetchTopTracks.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }

  componentDidMount() {
    // TODO pass down url
    // TODO send time_range parameter
    this.fetchTopTracks();
  }

  fetchTopTracks() {
    const params = { 
      time_range: this.state.time_range, 
      limit: this.state.limit 
    };
    fetch(createQueryUrl(this.props.endpoint, params), {
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

  handleTimeChange(value) {
    // Function version of setState ensures that state is 
    // set to the correct value before fetchTopTracks call
    // Otherwise the call will use state state values, as 
    // setState is async
    this.setState({ time_range: value }, this.fetchTopTracks);
  }

  handleLimitChange(value) {
    // See handleTimeChange
    this.setState({ limit: value }, this.fetchTopTracks);
  }

  render() {
    console.log('rendered state: ', this.state);
    return (
      <div>
        <ReactTable
          data={this.state.items}
          showPagination={false}
          columns={[
            {
              Header: 
                <div className="Playlist-selectors">
                  <RangeSelector 
                    options={time_range_options} 
                    value={this.state.time_range}
                    onChange={this.handleTimeChange}
                  />
                  <RangeSelector 
                    options={limit_options} 
                    value={this.state.limit}
                    onChange={this.handleLimitChange}
                  />
                  <button type="button">Save Playlist</button>
                </div>,
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
