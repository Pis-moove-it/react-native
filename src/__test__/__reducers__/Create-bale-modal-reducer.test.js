import createBaleModalReducer, { initialState } from '../../reducers/CreateBaleModalReducer';
import { actionTypes } from '../../actions/CreateBaleModalActions';

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

describe('create bale modal reducer', () => {
  it('should return the same state', () => {
    expect(createBaleModalReducer(initialState, { users: [], type: 'not_an_action' })).toEqual(initialState);
  });

  it('should a state with isVisible in false', () => {
    expect(createBaleModalReducer(initialState, {
      type: actionTypes.CLOSE_CREATE_BALE_MODAL,
    })).toEqual({
      baleData: false,
      createBaleModalIsOpen: false,
      isLoading: false,
    });
  });

  it('should a state with isVisible in true', () => {
    expect(createBaleModalReducer(initialState, {
      type: actionTypes.OPEN_CREATE_BALE_MODAL,
    })).toEqual({
      baleData: false,
      createBaleModalIsOpen: true,
      isLoading: false,
    });
  });
});
