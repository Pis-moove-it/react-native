import { actionTypes } from '../actions/RoleActions';

const initialState = {
  role: false,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ROLE_SELECTION:
      return {
        ...state,
        role: action.role,
      };
    case actionTypes.ROLE_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default roleReducer;
