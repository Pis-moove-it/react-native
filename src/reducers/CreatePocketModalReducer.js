import { actionTypes } from '../actions/CreatePocketModalActions';

export const initialState = {
  createPocketModalIsOpen: false,
};

const createPocketModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CREATE_POCKET_MODAL:
      return {
        ...state,
        createPocketModalIsOpen: action.isVisible,
      };
    case actionTypes.CLOSE_CREATE_POCKET_MODAL:
      return {
        ...state,
        createPocketModalIsOpen: action.isVisible,
      };
    default:
      return state;
  }
};

export default createPocketModalReducer;
