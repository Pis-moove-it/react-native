import pocketsListReducer, { initialState } from '../../reducers/PocketReducer';
import { actionTypes } from '../../actions/PocketActions';

const mockState = {
  pockets: ['initial', 'mock', 'pockets'],
  isLoading: false,
  error: false,
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
    expect(pocketsListReducer(mockState, { pockets: [], type: 'not_an_action' })).toEqual(mockState);
  });

  it('should return the same state - using initialState', () => {
    expect(pocketsListReducer(initialState, { pockets: [], type: 'not_an_action2' })).toEqual(initialState);
  });

  it('should a return state with isLoading in true', () => {
    expect(pocketsListReducer(initialState, { pockets: [], type: actionTypes.POCKETS_REQUEST })).toEqual({
      pockets: [],
      isLoading: false,
      pocket: false,
    });
  });

  it('should return a state with error in true', () => {
    expect(pocketsListReducer(initialState, { pockets: [], type: actionTypes.POCKETS_ERROR })).toEqual({
      pockets: [],
      isLoading: false,
      pocket: false,
    });
  });

  it('should return a state with mock pockets', () => {
    expect(pocketsListReducer(initialState, {
      pockets: ['Test'],
      type: actionTypes.POCKETS_REQUEST_SUCCESS,
    })).toEqual({
      pockets: [],
      pocket: false,
      isLoading: false,
    });
  });

  it('should return a state with different pockets', () => {
    expect(pocketsListReducer(mockState, {
      pockets: ['new data'],
      type: actionTypes.POCKETS_REQUEST_SUCCESS,
    })).toEqual({
      pockets: ['initial', 'mock', 'pockets'],
      isLoading: false,
      error: false,
    });
  });
});
