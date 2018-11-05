import { actionTypes } from '../actions/PocketActions';

export const initialState = {
  pockets: [],
  pocketsQuantity: false,
  isLoading: false,
};

const pocketListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POCKETS_REQUEST:
      return {
        ...state,
        pockets: [],
        pocketsQuantity: false,
        isLoading: true,
      };
    case actionTypes.POCKETS_SUCCESS:
      return {
        ...state,
        pockets: action.pockets,
        pocketsQuantity: action.pocketsQuantity,
        isLoading: false,
      };
    case actionTypes.POCKETS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default pocketListReducer;
