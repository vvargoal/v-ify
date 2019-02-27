import React from 'react';
import { shallow } from 'enzyme';
import LoginBar from '../LoginBar';

describe('LoginBar', () => {
  test('displays name', () => {
    const display_name = 'Yay Yayerton';
    const id = 'yayerton';
    const props = { display_name, id };
    const wrapper = shallow(<LoginBar {...props} />);

    console.log(wrapper.text());
    expect(wrapper.text()).toContain(display_name);
    expect(wrapper.text()).not.toContain(id);
  });
});
