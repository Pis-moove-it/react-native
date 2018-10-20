import { actionTypes } from '../actions/CreateBaleModalActions';

export const initialState = {
  createBaleModalIsOpen: false,
};

const createBaleModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CREATE_BALE_MODAL:
      return {
        ...state,
        createBaleModalIsOpen: true,
      };
    case actionTypes.CLOSE_CREATE_BALE_MODAL:
      return {
        ...state,
        createBaleModalIsOpen: false,
      };
    default:
      return state;
  }
};

export default createBaleModalReducer;
