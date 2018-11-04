import pocketsListReducer, { initialState } from '../../reducers/PocketReducer';
import { actionTypes } from '../../actions/PocketActions';

const mockState = {
  pockets: ['Test'],
  pocketsQuantity: 1,
  isLoading: false,
};

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

describe('pockets list reducer', () => {
  it('should return the same state', () => {
    expect(pocketsListReducer(mockState, { type: 'not_an_action' })).toEqual(mockState);
  });

  it('should return the same state - using initialState', () => {
    expect(pocketsListReducer(initialState, { type: 'not_an_action2' })).toEqual(initialState);
  });

  it('should a return state with isLoading in true', () => {
    expect(pocketsListReducer(initialState, { type: actionTypes.POCKETS_REQUEST })).toEqual({
      pockets: [],
      pocketsQuantity: false,
      isLoading: true,
    });
  });

  it('should return a state with error in true', () => {
    expect(pocketsListReducer(initialState, { type: actionTypes.POCKETS_ERROR })).toEqual({
      pockets: [],
      pocketsQuantity: false,
      isLoading: false,
    });
  });

  it('should return a state with mock pockets', () => {
    expect(pocketsListReducer(initialState, {
      pockets: ['Test'],
      pocketsQuantity: ['Test'].length,
      type: actionTypes.POCKETS_SUCCESS,
    })).toEqual({
      pockets: ['Test'],
      pocketsQuantity: 1,
      isLoading: false,
    });
  });

  it('should return a state with different pockets', () => {
    expect(pocketsListReducer(mockState, {
      pockets: ['Test', 'Prueba'],
      pocketsQuantity: ['Test', 'Prueba'].length,
      type: actionTypes.POCKETS_SUCCESS,
    })).toEqual({
      pockets: ['Test', 'Prueba'],
      pocketsQuantity: 2,
      isLoading: false,
    });
  });
});
