import gatherReducer, { initialState } from '../../reducers/GatherReducer';
import { actionTypes } from '../../actions/GatherActions';

const mockState = {
  collectionId: 14,
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

describe('gather reducer', () => {
  it('should return the same state', () => {
    expect(gatherReducer(mockState, { collectionId: null, type: 'not_an_action' })).toEqual(mockState);
  });

  it('should return the same state - using initialState', () => {
    expect(gatherReducer(initialState, { collectionId: null, type: 'not_an_action2' })).toEqual(initialState);
  });

  it('should return a state with error in true', () => {
    expect(gatherReducer(initialState, { collectionId: null, type: actionTypes.START_COLLECTION_ERROR })).toEqual({
      collectionId: null,
      error: true,
    });
  });

  it('should return a state with a mock collectionId', () => {
    expect(gatherReducer(initialState, {
      collectionId: 12,
      type: actionTypes.START_COLLECTION_REQUEST_SUCCESS,
    })).toEqual({
      collectionId: 12,
      error: false,
    });
  });

  it('should return a state with different bales', () => {
    expect(gatherReducer(mockState, {
      collectionId: 12,
      type: actionTypes.START_COLLECTION_REQUEST_SUCCESS,
    })).toEqual({
      collectionId: 12,
      error: false,
    });
  });
});
