import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import PocketList from '../../components/Pocket/PocketList';

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

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore();

// Minimal case
it('renders correctly only with required props', () => {
  const tree = renderer.create(<PocketList store={store} />).toJSON();
  expect(tree).toMatchSnapshot;
});
