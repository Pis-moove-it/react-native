import editWeightPocketModalReducer, { initialState } from '../../reducers/EditWeightPocketModalReducer';
import { actionTypes } from '../../actions/EditWeightPocketModalActions';

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

describe('edit weight pocket modal reducer', () => {
  it('should return the same state', () => {
    expect(editWeightPocketModalReducer(initialState, { type: 'not_an_action' })).toEqual(initialState);
  });

  it('should a state with isVisible in true', () => {
    expect(editWeightPocketModalReducer(initialState, {
      type: actionTypes.OPEN_EDIT_WEIGHT_POCKET_MODAL,
      isVisible: true,
      pocketHasWeight: true,
    })).toEqual({
      hasWieight: true,
      editWeightPocketModalIsOpen: true,
    });
  });

  it('should a state with isVisible in false', () => {
    expect(editWeightPocketModalReducer(initialState, {
      type: actionTypes.CLOSE_EDIT_WEIGHT_POCKET_MODAL,
      isVisible: false,
    })).toEqual({
      hasWieight: false,
      editWeightPocketModalIsOpen: false,
    });
  });
});
