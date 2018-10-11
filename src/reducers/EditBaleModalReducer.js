import { actionTypes } from '../actions/EditBaleModalActions';

const INITIAL_STATE = {
  editBaleModalIsOpen: false,
};

const editBaleModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_BALE_MODAL:
      return {
        ...state,
        editBaleModalIsOpen: action.isVisible,
      };
    case actionTypes.CLOSE_EDIT_BALE_MODAL:
      return {
        ...state,
        editBaleModalIsOpen: action.isVisible,
      };
    default:
      return state;
  }
};

export default editBaleModalReducer;
