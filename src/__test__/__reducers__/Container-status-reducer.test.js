import containerStatusReducer, { initialState } from '../../reducers/ContainerStatusReducer';
import { actionTypes } from '../../actions/ContainerStatusActions';

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

describe('container status reducer', () => {
  it('should return the same state', () => {
    expect(containerStatusReducer(initialState, { type: 'not_an_action' })).toEqual(initialState);
  });

  it('should a state with changeContainerStatusModalIsOpen in false', () => {
    expect(containerStatusReducer(initialState, {
      type: actionTypes.CLOSE_CHANGE_CONTAINER_STATUS_MODAL,
    })).toEqual({
      status: false,
      changeContainerStatusModalIsOpen: false,
      container: false,
      isLoading: false,
    });
  });

  it('should a state with changeContainerStatusModalIsOpen in true', () => {
    expect(containerStatusReducer(initialState, {
      type: actionTypes.OPEN_CHANGE_CONTAINER_STATUS_MODAL,
      status: 'Ok',
      container: '1',
    })).toEqual({
      status: false,
      changeContainerStatusModalIsOpen: true,
      container: '1',
      isLoading: false,
    });
  });
});
