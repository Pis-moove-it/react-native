import gatherReducer, { initialState } from '../../reducers/GatherReducer';
import { actionTypes } from '../../actions/GatherActions';
import { actionTypes as createPocketactionTypes } from '../../actions/CreatePocketModalActions';
import TickIcon from '../../assets/images/Tick.png';

const mockState = {
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
      type: actionTypes.START_COLLECTION_REQUEST,
    })).toEqual({
      travelImage: false,
      kmsTraveled: 0,
      pocketsCollected: 0,
      collectionId: false,
      isLoading: false,
      containers: [],
      isLoadingContainers: false,
      containerIdSelected: null,
      isTravelling: false,
      pocketCounter: 0,
      isLoadingEvent: false,
      isOverlayVisible: true,
      isOverlayLoading: true,
      finishSuccess: false,
      eventId: false,
      eventCoordinates: false,
      eventCreatedSuccess: false,
    });
  });

  it('should a state with isFetching in true', () => {
    expect(gatherReducer(initialState, {
      type: actionTypes.END_COLLECTION_REQUEST,
    })).toEqual({
      travelImage: false,
      kmsTraveled: 0,
      pocketsCollected: 0,
      collectionId: false,
      isLoading: true,
      containers: [],
      isLoadingContainers: false,
      containerIdSelected: null,
      isTravelling: false,
      pocketCounter: 0,
      isLoadingEvent: false,
      isOverlayVisible: true,
      isOverlayLoading: false,
      finishSuccess: false,
      eventId: false,
      eventCoordinates: false,
      eventCreatedSuccess: false,
    });
  });

  it('should a state with isFetching in true', () => {
    expect(gatherReducer(initialState, {
      type: actionTypes.END_COLLECTION_SUCCESS,
    })).toEqual({
      travelImage: false,
      kmsTraveled: 0,
      pocketsCollected: 0,
      collectionId: false,
      isLoading: false,
      containers: [],
      isLoadingContainers: false,
      containerIdSelected: null,
      isTravelling: false,
      pocketCounter: 0,
      isLoadingEvent: false,
      isOverlayVisible: true,
      isOverlayLoading: false,
      finishSuccess: true,
      eventId: false,
      eventCoordinates: false,
      eventCreatedSuccess: false,
    });
  });
});
