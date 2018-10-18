import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as createBaleModalActions from '../../actions/CreateBaleModalActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('createBaleModalActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore();

  it('should create an action for open create bale modal', () => {
    const expectedAction = { isVisible: true, type: createBaleModalActions.actionTypes.OPEN_CREATE_BALE_MODAL };

    // Dispatch the action
    store.dispatch(createBaleModalActions.openCreateBaleModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('should create an action for close create bale modal', () => {
    const expectedAction = { isVisible: false, type: createBaleModalActions.actionTypes.CLOSE_CREATE_BALE_MODAL };

    // Dispatch the action
    store.dispatch(createBaleModalActions.closeCreateBaleModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
