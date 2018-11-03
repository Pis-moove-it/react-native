import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as editWeightPocketModalActions from '../../actions/EditWeightPocketModalActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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

describe('editWeightPocketModalActions', () => {
  const store = mockStore();

  afterEach(() => {
    store.clearActions();
  });

  it('should create an action for open edit weight pocket modal with weight', () => {
    const expectedAction = [
      {
        type: editWeightPocketModalActions.actionTypes.EDIT_POCKET_WEIGHT_REQUEST,
      },
      {
        type: editWeightPocketModalActions.actionTypes.OPEN_EDIT_POCKET_WEIGHT_MODAL,
        pocket: true,
        weight: undefined,
        hasWeight: undefined,
      },
    ];

    // Dispatch the action
    store.dispatch(editWeightPocketModalActions.openEditWeightPocketModal(true));

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual(expectedAction);
  });

  it('should create an action for open edit weight pocket modal without weight', () => {
    const expectedAction = [
      {
        type: editWeightPocketModalActions.actionTypes.EDIT_POCKET_WEIGHT_REQUEST,
      },
      {
        type: editWeightPocketModalActions.actionTypes.OPEN_EDIT_POCKET_WEIGHT_MODAL,
        pocket: false,
        weight: undefined,
        hasWeight: undefined,
      },
    ];

    // Dispatch the action
    store.dispatch(editWeightPocketModalActions.openEditWeightPocketModal(false));

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual(expectedAction);
  });

  it('should create an action for close edit weight pocket modal', () => {
    const expectedAction = [
      {
        type: editWeightPocketModalActions.actionTypes.CLOSE_EDIT_POCKET_WEIGHT_MODAL,
      },
    ];

    // Dispatch the action
    store.dispatch(editWeightPocketModalActions.closeEditWeightPocketModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual(expectedAction);
  });
});
