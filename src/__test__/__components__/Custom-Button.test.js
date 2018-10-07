import React from 'react';
import renderer from 'react-test-renderer';
import HistoryIcon from '../../assets/images/HistoryIcon.png';

import CustomButton from '../../components/common/CustomButton';
import Colors from '../../helpers/Colors';

const iconStyle1 = {
  backgroundColor: Colors.primary,
  alignItems: 'center',
};

const iconStyle2 = {
  height: 30,
  width: 20,
};

const textIconStyle1 = {
  width: 30,
};

const textStyle1 = {
  backgroundColor: Colors.black,
  fontSize: 14,
  fontWeight: '500',
};

// Minimal case
it('renders correctly only with required props', () => {
  const tree = renderer.create(<CustomButton icon={HistoryIcon} />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with icon and icon-styles', () => {
  const tree = renderer
    .create(<CustomButton icon={HistoryIcon} title="test_2" style={iconStyle1} />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

// Icon and text
it('renders correctly with title and icon', () => {
  const tree = renderer.create(<CustomButton icon={HistoryIcon} title="test_2" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with title, icon and icon-styles without overriding', () => {
  const tree = renderer
    .create(<CustomButton icon={HistoryIcon} title="test_3" style={iconStyle1} />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with title, icon and icon-styles overriding', () => {
  const tree = renderer
    .create(<CustomButton icon={HistoryIcon} title="test_4" style={iconStyle2} />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with title, icon and styles for both', () => {
  const tree = renderer
    .create(<CustomButton icon={HistoryIcon} title="test_5" style={textIconStyle1} />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

// Border cases
it('renders correctly with icon and text-styles', () => {
  const tree = renderer
    .create(<CustomButton icon={HistoryIcon} title="test_6" textStyle={textStyle1} />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});
