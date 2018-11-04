import { actionTypes } from '../actions/GatherActions';

export const initialState = {
  date: false,
  hour: false,
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
};

const gatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FINISH_TRAVEL:
      return {
        ...state,
        date: action.date,
        hour: action.hour,
        travelImage: action.travelImage,
        kmsTraveled: action.kmsTraveled,
        pocketsCollected: action.pocketsCollected,
      };
    case actionTypes.START_COLLECTION_REQUEST:
      return {
        ...state,
        collectionId: false,
        isLoading: true,
        isTravelling: true,
      };
    case actionTypes.START_COLLECTION_SUCCESS:
      return {
        ...state,
        collectionId: action.identifier,
        isLoading: false,
      };
    case actionTypes.ADD_POCKET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ADD_POCKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pocketCounter: state.pocketCounter + 1,
      };
    case actionTypes.END_COLLECTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        isTravelling: false,
      };
    case actionTypes.END_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pocketCounter: 0,
      };
    case actionTypes.GET_CONTAINERS_REQUEST:
      return {
        ...state,
        isLoadingContainers: true,
      };
    case actionTypes.GET_CONTAINERS_SUCCESS:
      return {
        ...state,
        containers: action.containers,
        isLoadingContainers: false,
      };
    case actionTypes.SET_CONTAINER_ID:
      return {
        ...state,
        containerIdSelected: action.containerIdSelected,
      };
    default:
      return state;
  }
};

export default gatherReducer;
