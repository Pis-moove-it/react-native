import { actionTypes } from '../actions/LoginActions';

const initialState = {
  token: false,
  organization: false,
  isLoading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        organization: action.organization,
        isLoading: false,
      };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
