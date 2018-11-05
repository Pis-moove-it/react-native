import { actionTypes } from '../actions/EditBaleModalActions';

export const initialState = {
  bale: false,
  baleData: false,
  editBaleModalIsOpen: false,
  material: false,
  isLoading: false,
  weight: false,
};

const editBaleModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_BALE_MODAL:
      return {
        ...state,
        bale: action.bale,
        baleData: false,
        editBaleModalIsOpen: true,
        material: action.material,
        isLoading: false,
        weight: action.weight,
      };
    case actionTypes.EDIT_BALE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.EDIT_BALE_SUCCESS:
      return {
        ...state,
        bale: false,
        baleData: action.baleData,
        editBaleModalIsOpen: false,
        material: false,
        isLoading: false,
        weight: false,
      };
    case actionTypes.EDIT_BALE_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CLOSE_EDIT_BALE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default editBaleModalReducer;
