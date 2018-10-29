import { actionTypes } from '../actions/GatherActions';

export const initialState = {
  collectionId: null,
  error: false,
};

const gatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_COLLECTION_REQUEST:
      return {
        ...state,
        collectionId: null,
      };
    case actionTypes.START_COLLECTION_ERROR:
      return {
        ...state,
        error: true,
      };
    case actionTypes.START_COLLECTION_REQUEST_SUCCESS:
      return {
        ...state,
        collectionId: action.collectionId,
        error: false,
      };
    default:
      return state;
  }
};

export default gatherReducer;
