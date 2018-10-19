import React from 'react';
import renderer from 'react-test-renderer';
import PhonePocket from '../../components/Pocket/PhonePocket';

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
