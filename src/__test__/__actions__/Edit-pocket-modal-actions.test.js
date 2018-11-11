import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as editPocketModalActions from '../../actions/EditPocketModalActions';

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

describe('EditPocketModalActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore();

  it('should create an action for open edit pocket modal', () => {
    const expectedAction = [
      {
        type: editPocketModalActions.actionTypes.EDIT_POCKET_REQUEST,
      },
      {
        type: editPocketModalActions.actionTypes.OPEN_EDIT_POCKET_MODAL,
      },
    ];

    // Dispatch the action
    store.dispatch(editPocketModalActions.openEditPocketModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual(expectedAction);
  });

  it('should create an action for close edit pocket modal', () => {
    const expectedAction = {
      type: editPocketModalActions.actionTypes.CLOSE_EDIT_POCKET_MODAL,
    };

    // Dispatch the action
    store.dispatch(editPocketModalActions.closeEditPocketModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
