import { actionTypes } from '../actions/EditWeightPocketModalActions';

export const initialState = {
  pocket: false,
  pocketData: false,
  weight: false,
  hasWeight: false,
  editWeightPocketModalIsOpen: false,
  isLoading: false,
};

const editWeightPocketModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_POCKET_WEIGHT_MODAL:
      return {
        ...state,
        pocket: action.pocket,
        pocketData: false,
        weight: action.weight,
        hasWeight: action.hasWeight,
        editWeightPocketModalIsOpen: true,
        isLoading: false,
      };
    case actionTypes.EDIT_POCKET_WEIGHT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.EDIT_POCKET_WEIGHT_SUCCESS:
      return {
        ...state,
        pocket: false,
        pocketData: action.pocketData,
        weight: false,
        hasWeight: false,
        editWeightPocketModalIsOpen: false,
        isLoading: false,
      };
    case actionTypes.EDIT_POCKET_WEIGHT_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CLOSE_EDIT_POCKET_WEIGHT_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default editWeightPocketModalReducer;
