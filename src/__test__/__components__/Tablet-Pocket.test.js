import React from 'react';
import renderer from 'react-test-renderer';
import TabletPocket from '../../components/Pocket/TabletPocket';

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
  const tree = renderer
    .create(<TabletPocket id="test_1" time="mm:ss" weight="dd" pocketState="Unweighed" />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders correctly only with weighted pocket - with params', () => {
  const mockPocket = {
    id: 'id_1',
    time: '20:30',
    weight: '20',
    pocketState: 'Weight',
  };

  const tree = renderer
    .create(<TabletPocket
      id={mockPocket.id}
      time={mockPocket.time}
      weight={mockPocket.weight}
      pocketState={mockPocket.pocketState}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot;
});
