import createPocketModalActions, { initialState } from '../../reducers/CreatePocketModalReducer';
import { actionTypes } from '../../actions/CreatePocketModalActions';

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

describe('create pocket modal reducer', () => {
  it('should return the same initial state', () => {
    expect(createPocketModalActions(initialState, { type: 'not_an_action' })).toEqual(initialState);
  });

  it('should a state with isVisible in true', () => {
    expect(createPocketModalActions(initialState, {
      type: actionTypes.OPEN_CREATE_POCKET_MODAL,
      isVisible: true,
    })).toEqual({
      createPocketModalIsOpen: true,
    });
  });

  it('should a state with isVisible in false', () => {
    expect(createPocketModalActions(initialState, {
      type: actionTypes.CLOSE_CREATE_POCKET_MODAL,
      isVisible: false,
    })).toEqual({
      createPocketModalIsOpen: false,
    });
  });
});
