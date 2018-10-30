import gatherReducer, { initialState } from '../../reducers/GatherReducer';
import { actionTypes } from '../../actions/GatherActions';

const mockState = {
  collectionId: 14,
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

describe('gather reducer', () => {
  it('should return the same state', () => {
    expect(gatherReducer(mockState, { collectionId: false, type: 'not_an_action' })).toEqual(mockState);
  });

  it('should return the same state - using initialState', () => {
    expect(gatherReducer(initialState, { collectionId: false, type: 'not_an_action2' })).toEqual(initialState);
  });

  it('should a state with isFetching in true', () => {
    expect(gatherReducer(initialState, {
      collectionId: false,
      type: actionTypes.START_COLLECTION_REQUEST,
    })).toEqual({
      collectionId: false,
      isLoading: true,
    });
  });
});
