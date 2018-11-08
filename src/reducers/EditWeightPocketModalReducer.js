import { actionTypes } from '../actions/EditWeightPocketModalActions';

export const initialState = {
  pocket: false,
  pocketData: false,
  weight: false,
  hasWeight: false,
  editWeightPocketModalIsOpen: false,
  isLoading: false,
  serialNumber: false,
};

const editWeightPocketModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_POCKET_MODAL:
      return {
        ...state,
        pocket: action.pocket,
        pocketData: false,
        weight: action.weight,
        serialNumber: action.serialNumber,
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
    case actionTypes.CLOSE_EDIT_POCKET_MODAL:
      return initialState;
    case actionTypes.EDIT_POCKET_SERIAL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.EDIT_POCKET_SERIAL_SUCCESS:
      return {
        ...state,
        pocket: false,
        pocketData: action.pocketData,
        serialNumber: false,
        editPocketModalIsOpen: false,
        isLoading: false,
      };
    case actionTypes.EDIT_POCKET_SERIAL_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default editWeightPocketModalReducer;
