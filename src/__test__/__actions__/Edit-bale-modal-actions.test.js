import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as editBaleModalActions from '../../actions/EditBaleModalActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('EditBaleModalActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore();

  it('should create an action for open edit bale modal', () => {
    const expectedAction = {
      isVisible: true,
      type: editBaleModalActions.actionTypes.OPEN_EDIT_BALE_MODAL,
    };

    // Dispatch the action
    store.dispatch(editBaleModalActions.openEditBaleModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('should create an action for close edit bale modal', () => {
    const expectedAction = {
      isVisible: false,
      type: editBaleModalActions.actionTypes.CLOSE_EDIT_BALE_MODAL,
    };

    // Dispatch the action
    store.dispatch(editBaleModalActions.closeEditBaleModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
