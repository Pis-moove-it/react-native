import { actionTypes } from '../actions/CreateBaleModalActions';

export const initialState = {
  baleData: false,
  createBaleModalIsOpen: false,
  isLoading: false,
};

const createBaleModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CREATE_BALE_MODAL:
      return {
        ...state,
        baleData: false,
        createBaleModalIsOpen: true,
        isLoading: false,
      };
    case actionTypes.CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATE_SUCCESS:
      return {
        ...state,
        baleData: action.baleData,
        createBaleModalIsOpen: false,
        isLoading: false,
      };
    case actionTypes.CREATE_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CLOSE_CREATE_BALE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default createBaleModalReducer;
