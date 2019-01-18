import React from 'react';
import PropTypes from 'prop-types';

// This could probably be a function
// Job is to render item data derived from api call

class SongRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li key={this.props.name}>
        <a href={this.props.uri}>{this.props.name}</a> -
        {this.props.artists.map(artist =>
          <a href={artist.uri}>{artist.name}</a>)}
      </li>
    );
  }
}

SongRow.propTypes = {
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  artists: PropTypes.array.isRequired, // TODO can you make this array of string?
};

export default SongRow;
