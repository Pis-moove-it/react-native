import { actionTypes } from '../actions/BalesActions';

export const initialState = {
  bales: [],
  balesQuantity: false,
  isFetching: false,
};

const balesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BALES_REQUEST:
      return {
        ...state,
        bales: [],
        balesQuantity: false,
        isFetching: true,
      };
    case actionTypes.BALES_ERROR:
      return {
        ...state,
        balesQuantity: false,
        isFetching: false,
      };
    case actionTypes.BALES_SUCCESS:
      return {
        ...state,
        bales: action.bales,
        balesQuantity: action.balesQuantity,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default balesListReducer;
