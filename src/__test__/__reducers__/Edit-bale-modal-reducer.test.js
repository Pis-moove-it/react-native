import editBaleModalReducer, { initialState } from '../../reducers/EditBaleModalReducer';
import { actionTypes } from '../../actions/EditBaleModalActions';

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

describe('edit bale modal reducer', () => {
  it('should return the same state', () => {
    expect(editBaleModalReducer(initialState, { users: [], type: 'not_an_action' })).toEqual(initialState);
  });

  it('should a state with isVisible in false', () => {
    expect(editBaleModalReducer(initialState, {
      type: actionTypes.CLOSE_EDIT_BALE_MODAL,
    })).toEqual({
      bale: false,
      baleData: false,
      editBaleModalIsOpen: false,
      isLoading: false,
      material: false,
      weight: false,
    });
  });

  it('should a state with isVisible in true', () => {
    expect(editBaleModalReducer(initialState, {
      type: actionTypes.OPEN_EDIT_BALE_MODAL,
      bale: '99',
      material: 'Glass',
      weight: '99',
    })).toEqual({
      bale: '99',
      baleData: false,
      editBaleModalIsOpen: true,
      isLoading: false,
      material: 'Glass',
      weight: '99',
    });
  });
});
