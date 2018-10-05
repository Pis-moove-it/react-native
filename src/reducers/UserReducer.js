import { actionTypes } from "../actions/UserActions";

const initialState = {
  user: false,
  isLoading: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoading: false
      };
    case actionTypes.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
