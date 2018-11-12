import { actionTypes } from '../actions/BalesActions';

export const initialState = {
  bales: [],
  balesQuantity: false,
  newBales: 0,
  isEnd: false,
  isFetching: false,
};

const balesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BALES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.BALES_RESET:
      return initialState;
    case actionTypes.BALES_SUCCESS:
      return {
        ...state,
        bales: action.bales,
        balesQuantity: action.balesQuantity,
        isFetching: false,
      };
    case actionTypes.BALES_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    case actionTypes.BALES_ADD:
      return {
        ...state,
        newBales: action.newBales,
      };
    case actionTypes.BALES_END:
      return {
        ...state,
        isEnd: action.isEnd,
      };
    default:
      return state;
  }
};

export default balesListReducer;
