import { actionTypes } from '../actions/EditWeightPocketModalActions';

export const initialState = {
  hasWieight: false,
  editWeightPocketModalIsOpen: false,
};

const editWeightPocketModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_WEIGHT_POCKET_MODAL:
      return {
        ...state,
        hasWieight: action.pocketHasWeight,
        editWeightPocketModalIsOpen: action.isVisible,
      };
    case actionTypes.CLOSE_EDIT_WEIGHT_POCKET_MODAL:
      return {
        ...state,
        hasWieight: false,
        editWeightPocketModalIsOpen: action.isVisible,
      };
    default:
      return state;
  }
};

export default editWeightPocketModalReducer;
