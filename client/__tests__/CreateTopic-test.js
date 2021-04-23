import React from 'react';
import renderer from 'react-test-renderer';
import CreateTopic from '../app/pages/CreateTopic';

test('renders correctly', () => {
    const tree = renderer.create(<CreateTopic />).toJSON();
    expect(tree).toMatchSnapshot();
  });