import React from 'react';
import PropTypes from 'prop-types';


class RangeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  render() {
    const { options, value } = this.props;
    return (
      <select value={value} onChange={this.handleChange}>
        { options.map(option => 
          <option key={option.value} value={option.value}>{option.label}</option>)
        }
      </select>
    );
  }
}

RangeSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RangeSelector;
