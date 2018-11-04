import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as gatherActions from '../../actions/GatherActions';

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

describe('GatherActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore(user);

  it('should create an action for finishing the travel', () => {
    const expectedAction = { type: gatherActions.actionTypes.FINISH_TRAVEL };

    // Dispatch the action
    store.dispatch(gatherActions.finishTravel());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('should create an action for bales request', () => {
    const expectedAction = { type: gatherActions.actionTypes.START_COLLECTION_REQUEST };

    // Dispatch the action
    store.dispatch(gatherActions.startCollection());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('should create an action for add pockets to route request', () => {
    const expectedAction = { type: gatherActions.actionTypes.ADD_POCKET_REQUEST };

    // Dispatch the action
    store.dispatch(gatherActions.addPocketToCollection());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('should create an action to end route', () => {
    const expectedAction = { type: gatherActions.actionTypes.END_COLLECTION_REQUEST };

    // Dispatch the action
    store.dispatch(gatherActions.endCollection());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
