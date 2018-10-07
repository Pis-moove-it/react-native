import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as userActions from '../../actions/UserActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user = { name: 'Joaquin' };
const credentials = {
  email: 'user@test.com',
  password: 'password',
};

describe('UserActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore(user);

  it('should create an action for login', () => {
    const expectedAction = { type: userActions.actionTypes.USER_LOGIN_REQUEST };

    // Dispatch the action
    store.dispatch(userActions.login(credentials.email, credentials.password));

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('should create an action for logout', () => {
    const expectedAction = {
      type: userActions.actionTypes.USER_LOGOUT,
    };

    // Dispatch the action
    store.dispatch(userActions.logout());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
