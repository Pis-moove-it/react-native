import { actionTypes } from '../actions/BalesActions';

export const initialState = {
  bales: [],
  isFetching: false,
  error: false,
};

const balesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BALES_REQUEST:
      return {
        ...state,
        bales: [],
        isFetching: true,
      };
    case actionTypes.BALES_ERROR:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case actionTypes.BALES_REQUEST_SUCCESS:
      return {
        ...state,
        bales: action.bales,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default balesListReducer;
