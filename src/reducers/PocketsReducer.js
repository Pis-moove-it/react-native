import { actionTypes } from '../actions/PocketsActions';

export const initialState = {
  pockets: [],
  isFetching: false,
  error: false,
};

const pocketsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POCKETS_REQUEST:
      return {
        ...state,
        pockets: [],
        isFetching: true,
      };
    case actionTypes.POCKETS_ERROR:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case actionTypes.POCKETS_REQUEST_SUCCESS:
      return {
        ...state,
        pockets: action.pockets,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default pocketsListReducer;
