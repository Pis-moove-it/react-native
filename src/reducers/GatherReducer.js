import { actionTypes } from '../actions/GatherActions';

export const initialState = {
  collectionId: false,
  isLoading: false,
};

const gatherReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default gatherReducer;
