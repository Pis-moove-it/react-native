import { actionTypes } from '../actions/EditBaleModalActions';

export const initialState = {
  bale: false,
  editBaleModalIsOpen: false,
};

const editBaleModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_BALE_MODAL:
      return {
        ...state,
        bale: action.bale,
        editBaleModalIsOpen: true,
      };
    case actionTypes.CLOSE_EDIT_BALE_MODAL:
      return {
        ...state,
        bale: false,
        editBaleModalIsOpen: false,
      };
    default:
      return state;
  }
};

export default editBaleModalReducer;
