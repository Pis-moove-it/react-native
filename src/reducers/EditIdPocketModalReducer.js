// DEPRECADO

import { actionTypes } from '../actions/EditIdPocketModalActions';

export const initialState = {
  pocket: false,
  pocketData: false,
  serialNumber: false,
  editPocketModalIsOpen: false,
  isLoading: false,
};

const editPocketModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_POCKET_SERIAL_MODAL:
      return {
        ...state,
        pocket: action.pocket,
        pocketData: false,
        serialNumber: action.serialNumber,
        editPocketModalIsOpen: true,
        isLoading: false,
      };
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
    case actionTypes.CLOSE_EDIT_POCKET_SERIAL_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default editPocketModalReducer;
