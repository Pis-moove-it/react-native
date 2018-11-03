import { actionTypes } from '../actions/EditIdPocketModalActions';

export const initialState = {
  editPocketModalIsOpen: false,
};

const editPocketModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_POCKET_MODAL:
      return {
        ...state,
        editPocketModalIsOpen: action.isVisible,
      };
    case actionTypes.CLOSE_EDIT_POCKET_MODAL:
      return {
        ...state,
        editPocketModalIsOpen: action.isVisible,
      };
    default:
      return state;
  }
};

export default editPocketModalReducer;
