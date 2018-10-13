import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as balesActions from '../../actions/BalesActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user = { name: 'Test' };

describe('UserActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore(user);

  it('should create an action for bales request', () => {
    const expectedAction = { type: balesActions.actionTypes.BALES_REQUEST };

    // Dispatch the action
    store.dispatch(balesActions.fetchBales());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('creates BALES_REQUEST_SUCCESS when fetching bales has been done', () => {
    fetchMock
      .getOnce('/todos', { body: { todos: ['do something'] }, headers: { 'content-type': 'application/json' } })
  ​
    const expectedActions = [
      { type: balesActions.actionTypes.BALES_REQUEST },
      { type: balesActions.actionTypes.BALES_REQUEST_SUCCESS, body: {  } }
    ]
    const store = mockStore({ todos: [] })
  ​
    return store.dispatch(actions.fetchBales()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates BALES_ERROR when fetching bales has been done but returns an error', () => {
    fetchMock
      .getOnce('/todos', { body: { todos: ['do something'] }, headers: { 'content-type': 'application/json' } })
  ​
    const expectedActions = [
      { type: balesActions.actionTypes.BALES_REQUEST },
      { type: balesActions.actionTypes.BALES_REQUEST_ERROR, body: {  } }
    ]
    const store = mockStore({ todos: [] })
  ​
    return store.dispatch(actions.fetchBales()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

});
