import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as containerStatusActions from '../../actions/ContainerStatusActions';

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

describe('ContainerStatusActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore();

  it('should create an action for open change container status modal', () => {
    const expectedAction = [
      {
        container: undefined,
        type: containerStatusActions.actionTypes.OPEN_CHANGE_CONTAINER_STATUS_MODAL,
      },
    ];

    // Dispatch the action
    store.dispatch(containerStatusActions.openChangeContainerStatusModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual(expectedAction);
  });

  it('should create an action for close change container status modal', () => {
    const expectedAction = {
      type: containerStatusActions.actionTypes.CLOSE_CHANGE_CONTAINER_STATUS_MODAL,
    };

    // Dispatch the action
    store.dispatch(containerStatusActions.closeChangeContainerStatusModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
