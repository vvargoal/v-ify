import React from 'react';


class RangeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultOption.value,
    }; 

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ 
      value: event.target.value,
    });
    this.props.onChange(event.target.value);
  }

  render() {
    console.log(this.props.options);
    console.log(this.state.value);
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        { this.props.options.map((option) => 
            <option value={option.value}>{option.label}</option>
          )}
      </select>
    );
  }
}

export default RangeSelector;
