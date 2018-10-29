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
    default:
      return state;
  }
};

export default gatherReducer;
