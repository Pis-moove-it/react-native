import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as pocketsActions from '../../actions/PocketsActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user = { name: 'Test' };

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

describe('UserActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore(user);

  it('should create an action for pockets request', () => {
    const expectedAction = { type: pocketsActions.actionTypes.POCKETS_REQUEST };

    // Dispatch the action
    store.dispatch(pocketsActions.fetchPockets());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
