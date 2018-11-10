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
      type: actionTypes.OPEN_EDIT_POCKET_WEIGHT_MODAL,
      pocket: '001',
      weight: '500',
      hasWeight: true,
    })).toEqual({
      pocket: '001',
      pocketData: false,
      weight: '500',
      hasWeight: true,
      editWeightPocketModalIsOpen: true,
      isLoading: false,
    });
  });

  it('should a state with isVisible in false', () => {
    expect(editWeightPocketModalReducer(initialState, {
      type: actionTypes.CLOSE_EDIT_POCKET_WEIGHT_MODAL,
    })).toEqual({
      pocket: false,
      pocketData: false,
      weight: false,
      hasWeight: false,
      editWeightPocketModalIsOpen: false,
      isLoading: false,
    });
  });
});
