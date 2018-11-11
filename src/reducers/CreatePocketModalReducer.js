import { actionTypes } from '../actions/CreatePocketModalActions';

export const initialState = {
  createPocketModalIsOpen: false,
  isLoading: false,
};

const createPocketModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CREATE_POCKET_MODAL:
      return {
        ...state,
        createPocketModalIsOpen: true,
      };
    case actionTypes.ADD_POCKET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ADD_POCKET_SUCCESS:
      return {
        ...state,
        createPocketModalIsOpen: false,
        isLoading: false,
      };
    case actionTypes.ADD_POCKET_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CLOSE_CREATE_POCKET_MODAL:
      return {
        ...state,
        createPocketModalIsOpen: false,
      };
    default:
      return state;
  }
};

export default createPocketModalReducer;
