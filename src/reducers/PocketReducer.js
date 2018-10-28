import { actionTypes } from '../actions/BalesActions';

export const initialState = {
  pocket: false,
  pockets: [],
  isLoading: false,
};

const pocketListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POCKET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.POCKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.POCKET_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.POCKET_SET:
      return {
        ...state,
        pocket: false,
        pockets: action.pockets,
      };
    case actionTypes.POCKET_SET_DATA:
      return {
        ...state,
        pocket: action.pocketData,
      };
    default:
      return state;
  }
};

export default pocketListReducer;
