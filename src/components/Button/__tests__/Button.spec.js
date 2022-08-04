import { shallow } from 'enzyme';
import React from 'react';
import Button from '../'

const mockPress = jest.fn()

it(`renders a view with a custom background`, () => {

    const component = shallow(<Button onPressNavigation={mockPress} />);

    expect(component).toMatchSnapshot();
});