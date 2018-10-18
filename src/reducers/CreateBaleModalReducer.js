import { actionTypes } from '../actions/CreateBaleModalActions';

export const initialState = {
  createBaleModalIsOpen: false,
};

const createBaleModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CREATE_BALE_MODAL:
      return {
        ...state,
        createBaleModalIsOpen: action.isVisible,
      };
    case actionTypes.CLOSE_CREATE_BALE_MODAL:
      return {
        ...state,
        createBaleModalIsOpen: action.isVisible,
      };
    default:
      return state;
  }
};

export default createBaleModalReducer;
