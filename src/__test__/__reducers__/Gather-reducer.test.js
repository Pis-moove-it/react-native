import gatherReducer, { initialState } from '../../reducers/GatherReducer';
import { actionTypes } from '../../actions/GatherActions';
import TickIcon from '../../assets/images/Tick.png';

const mockState = {
  date: '11/3',
  hour: '1:57',
  travelImage: TickIcon,
  kmsTraveled: 175,
  pocketsCollected: 17,
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

  it('should return a state with isFetching in true', () => {
    expect(gatherReducer(initialState, {
      collectionId: false,
      type: actionTypes.START_COLLECTION_REQUEST,
    })).toEqual({
      date: false,
      hour: false,
      travelImage: false,
      kmsTraveled: 0,
      pocketsCollected: 0,
      collectionId: false,
      isLoading: true,
    });
  });

  it('should a state with isFetching in true', () => {
    expect(gatherReducer(initialState, {
      collectionId: false,
      type: actionTypes.ADD_POCKET_REQUEST,
    })).toEqual({
      collectionId: false,
      isLoading: true,
    });
  });

  it('should a state with isFetching in true', () => {
    expect(gatherReducer(initialState, {
      collectionId: false,
      type: actionTypes.ADD_POCKET_SUCCESS,
    })).toEqual({
      collectionId: false,
      isLoading: false,
    });
  });

  it('should a state with isFetching in true', () => {
    expect(gatherReducer(initialState, {
      collectionId: false,
      type: actionTypes.END_COLLECTION_REQUEST,
    })).toEqual({
      collectionId: false,
      isLoading: true,
    });
  });

  it('should a state with isFetching in true', () => {
    expect(gatherReducer(initialState, {
      collectionId: false,
      type: actionTypes.END_COLLECTION_SUCCESS,
    })).toEqual({
      collectionId: false,
      isLoading: false,
    });
  });
});
