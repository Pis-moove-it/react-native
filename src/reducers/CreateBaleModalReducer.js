import { actionTypes } from '../actions/CreateBaleModalActions';

const INITIAL_STATE = {
  createBaleModalIsOpen: true,
};

const createBaleModalReducer = (state = INITIAL_STATE, action) => {
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
