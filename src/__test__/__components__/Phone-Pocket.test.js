import React from 'react';
import renderer from 'react-test-renderer';
import PhonePocket from '../../components/Pocket/PhonePocket';
import PocketInfo from '../../components/Pocket/PocketInfo';

jest.mock(
  'react-native-localization',
  () =>
    class RNLocalization {
      language = 'en';

      constructor(props) {
        this.props = props;
        this.setLanguage(this.language);
      }

      setLanguage(interfaceLanguage) {
        this.language = interfaceLanguage;
      }
    },
);

// Different props combinations

it('renders correctly only with unweighted pocket', () => {
  const tree = renderer.create(<PhonePocket id="test_1" pocketState="Unweighed" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly only with weighted pocket', () => {
  const mockPocket = {
    id: 'id_1',
    pocketState: 'Weight',
  };

  const tree = renderer
    .create(<PhonePocket id={mockPocket.id} pocketState={mockPocket.pocketState} />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

// Time and weight

it('renders correctly with time but unweighed', () => {
  const tree = renderer
    .create(<PhonePocket id="1234" time="13:30" pocketState="Unweighed" />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with weight', () => {
  const tree = renderer.create(<PhonePocket weight="123" pocketState="Weighed" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with id, time and weight', () => {
  const tree = renderer
    .create(<PhonePocket id="12345" time="13:30" weight="123" pocketState="Weighed" />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

// Pocket information

it('renders correctly only with required props', () => {
  const tree = renderer.create(<PocketInfo />).toJSON();
  expect(tree).toMatchSnapshot;
});

// Id, type and weight

it('renders correctly with time but unweighed', () => {
  const tree = renderer.create(<PocketInfo time="13:30" pocketState="Unweighed" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with weight', () => {
  const tree = renderer.create(<PocketInfo weight="123" pocketState="Weighed" />).toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly with type and weight', () => {
  const tree = renderer
    .create(<PocketInfo type="Test" weight="123" pocketState="Weighed" />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});
