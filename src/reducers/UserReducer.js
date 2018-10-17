import { actionTypes } from '../actions/UserActions';

const initialState = {
  user: false,
  userData: false,
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.userData.name,
        userData: action.userData,
        isLoading: false,
      };
    case actionTypes.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
