import React from 'react';
import renderer from 'react-test-renderer';
import Register from '../app/pages/Register';

test('renders correctly', () => {
    const tree = renderer.create(<Register />).toJSON();
    expect(tree).toMatchSnapshot();
  });