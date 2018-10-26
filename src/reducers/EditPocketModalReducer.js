import { actionTypes } from '../actions/EditPocketModalActions';

export const initialState = {
  editPocketModalIsOpen: false,
};

const editPocketModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CREATE_POCKET_MODAL:
      return {
        ...state,
        editPocketModalIsOpen: action.isVisible,
      };
    case actionTypes.CLOSE_CREATE_POCKET_MODAL:
      return {
        ...state,
        editPocketModalIsOpen: action.isVisible,
      };
    default:
      return state;
  }
};

export default editPocketModalReducer;
