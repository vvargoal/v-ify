import React from 'react';


class RangeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <select value={this.props.value} onChange={this.handleChange}>
        { this.props.options.map((option) => 
            <option key={option.value} value={option.value}>{option.label}</option>
          )}
      </select>
    );
  }
}

export default RangeSelector;
