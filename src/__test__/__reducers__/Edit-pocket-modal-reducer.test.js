import editPocketModalReducer, { initialState } from '../../reducers/EditPocketModalReducer';
import { actionTypes } from '../../actions/EditPocketModalActions';

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

describe('edit pocket modal reducer', () => {
  it('should return the same state', () => {
    expect(editPocketModalReducer(initialState, { users: [], type: 'not_an_action' })).toEqual(initialState);
  });

  it('should a state with isVisible in false', () => {
    expect(editPocketModalReducer(initialState, {
      type: actionTypes.CLOSE_EDIT_POCKET_MODAL,
    })).toEqual({
      pocket: false,
      pocketData: false,
      serialNumber: false,
      weight: false,
      hasWeight: false,
      isOpen: false,
      isLoading: false,
    });
  });

  it('should a state with isVisible in true', () => {
    expect(editPocketModalReducer(initialState, {
      type: actionTypes.OPEN_EDIT_POCKET_MODAL,
      pocket: '99',
      serialNumber: '001',
      weight: '99',
      hasWeight: true,
    })).toEqual({
      pocket: '99',
      pocketData: false,
      serialNumber: '001',
      weight: '99',
      hasWeight: true,
      isOpen: true,
      isLoading: false,
    });
  });
});
