import React from 'react';

const OPTIONS = ['short_term', 'medium_term', 'long_term'];

class RangeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: OPTIONS[1] } 

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ value: event.target.value });
  }

  render() {
    console.log(OPTIONS);
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        { OPTIONS.map(option => <option value={option}>{option}</option>) }
      </select>
    );
  }
}

export default RangeSelector;
