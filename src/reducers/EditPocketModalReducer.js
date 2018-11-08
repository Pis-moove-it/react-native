import { actionTypes } from '../actions/EditPocketModalActions';

export const initialState = {
  pocket: false,
  pocketData: false,
  serialNumber: false,
  weight: false,
  hasWeight: false,
  isOpen: false,
  isLoading: false,
};

const editPocketModal = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_POCKET_MODAL:
      return {
        ...state,
        pocket: action.pocket,
        pocketData: false,
        serialNumber: action.serialNumber,
        weight: action.weight,
        hasWeight: action.hasWeight,
        isOpen: true,
        isLoading: false,
      };
    case actionTypes.EDIT_POCKET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.EDIT_POCKET_SUCCESS:
      return {
        ...state,
        pocketData: action.pocketData,
        isOpen: false,
      };
    case actionTypes.EDIT_POCKET_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CLOSE_EDIT_POCKET_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default editPocketModal;
