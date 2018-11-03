import { actionTypes } from '../actions/GatherActions';

export const initialState = {
  date: false,
  hour: false,
  travelImage: false,
  kmsTraveled: 0,
  pocketsCollected: 0,
  collectionId: false,
  isLoading: false,
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
      };
    case actionTypes.END_COLLECTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.END_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default gatherReducer;
