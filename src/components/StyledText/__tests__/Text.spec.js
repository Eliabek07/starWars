import { shallow } from 'enzyme';
import React from 'react';
import Text from '..'

it(`renders a view with a custom background`, () => {

    const component = shallow(<Text />);

    expect(component).toMatchSnapshot();
});