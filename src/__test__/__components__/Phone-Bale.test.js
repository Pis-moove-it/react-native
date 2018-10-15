import React from 'react';
import renderer from 'react-test-renderer';
import PhoneBale from '../../components/Bale/PhoneBale';
import BaleInfo from '../../components/Bale/BaleInfo';

// Minimal case
it('renders correctly only with required props', () => {
  const tree = renderer.create(<PhoneBale />).toJSON();
  expect(tree).toMatchSnapshot;
});

// Id, type and weight
it('renders correctly with id', () => {
  const tree = renderer.create(<PhoneBale id="12345" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with type', () => {
  const tree = renderer.create(<PhoneBale type="Test" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with weight', () => {
  const tree = renderer.create(<PhoneBale weight="123" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with type and weight', () => {
  const tree = renderer.create(<PhoneBale type="Test" weight="123" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with id, type and weight', () => {
  const tree = renderer.create(<PhoneBale id="12345" type="Test" weight="123" />).toJSON();
  expect(tree).toMatchSnapshot;
});

// Bale Information
it('renders correctly only with required props', () => {
  const tree = renderer.create(<BaleInfo />).toJSON();
  expect(tree).toMatchSnapshot;
});

// Id, type and weight

it('renders correctly with type', () => {
  const tree = renderer.create(<BaleInfo type="Test" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with weight', () => {
  const tree = renderer.create(<BaleInfo weight="123" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with type and weight', () => {
  const tree = renderer.create(<BaleInfo type="Test" weight="123" />).toJSON();
  expect(tree).toMatchSnapshot;
});
