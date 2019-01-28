import React from 'react';
import PropTypes from 'prop-types';

class TextForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  render() {
    const { value } = this.props;
    return (
      <input
        type="text"
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

TextForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextForm;
