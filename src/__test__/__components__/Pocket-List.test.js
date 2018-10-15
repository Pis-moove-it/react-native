import React from 'react';
import renderer from 'react-test-renderer';
import PocketList from '../../components/Pocket/PocketList';

// Minimal case
it('renders correctly only with required props', () => {
  const tree = renderer.create(<PocketList />).toJSON();
  expect(tree).toMatchSnapshot;
});
