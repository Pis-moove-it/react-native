import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as createPocketModalActions from '../../actions/CreatePocketModalActions';
import { actionTypes as globalActionTypes } from '../../actions/GlobalActions';

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

describe('createPocketModalActions', () => {
  const store = mockStore();

  afterEach(() => {
    store.clearActions();
  });

  it('should create an action for open create pocket modal', () => {
    const expectedAction = [
      {
        type: globalActionTypes.GLOBAL_RESET,
      },
      {
        type: createPocketModalActions.actionTypes.OPEN_CREATE_POCKET_MODAL,
      },
    ];

    // Dispatch the action
    store.dispatch(createPocketModalActions.openCreatePocketModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual(expectedAction);
  });

  it('should create an action for close create pocket modal', () => {
    const expectedAction = [
      {
        type: createPocketModalActions.actionTypes.CLOSE_CREATE_POCKET_MODAL,
      },
    ];

    // Dispatch the action
    store.dispatch(createPocketModalActions.closeCreatePocketModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual(expectedAction);
  });
});
