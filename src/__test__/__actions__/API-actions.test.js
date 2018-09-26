import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as apiActions from '../../actions/APIActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user = { name: 'Joaquin' };

describe('APIActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore(user);

  it('should create an action for API REQUEST', () => {
    const expectedAction = { type: apiActions.actionTypes.API_REQUEST };

    // Dispatch the action
    store.dispatch(apiActions.fetchData());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
