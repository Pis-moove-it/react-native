import balesListReducer, { initialState } from '../../reducers/BalesReducer';
import { actionTypes } from '../../actions/BalesActions';

const mockState = {
  bales: ['initial', 'mock', 'bales'],
  isFetching: false,
};

const array = ['bale1', 'bale2'];

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

describe('bales list reducer', () => {
  it('should return the same state', () => {
    expect(balesListReducer(mockState, { bales: [], type: 'not_an_action' })).toEqual(mockState);
  });

  it('should return the same state - using initialState', () => {
    expect(balesListReducer(initialState, { bales: [], type: 'not_an_action2' })).toEqual(initialState);
  });

  it('should a state with isFetching in true', () => {
    expect(balesListReducer(initialState, { type: actionTypes.BALES_REQUEST })).toEqual({
      bales: [],
      balesQuantity: false,
      isFetching: true,
    });
  });

  it('should return a state with error in true', () => {
    expect(balesListReducer(initialState, { type: actionTypes.BALES_ERROR })).toEqual({
      bales: [],
      balesQuantity: false,
      isFetching: false,
    });
  });

  it('should return a state with mock bales', () => {
    expect(balesListReducer(initialState, {
      bales: array,
      balesQuantity: array.length,
      type: actionTypes.BALES_SUCCESS,
    })).toEqual({
      bales: ['bale1', 'bale2'],
      balesQuantity: 2,
      isFetching: false,
    });
  });

  it('should return a state with different bales', () => {
    expect(balesListReducer(mockState, {
      bales: array,
      balesQuantity: array.length,
      type: actionTypes.BALES_SUCCESS,
    })).toEqual({
      bales: ['bale1', 'bale2'],
      balesQuantity: 2,
      isFetching: false,
    });
  });
});
