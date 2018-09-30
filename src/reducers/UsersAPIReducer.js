import { actionTypes } from '../actions/UsersAPIActions';

export const initialState = {
  users: [],
  isFetching: false,
  error: false,
};

const usersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_API_REQUEST:
      return {
        ...state,
        users: [],
        isFetching: true,
      };
    case actionTypes.USERS_API_ERROR:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case actionTypes.USERS_REQUEST_SUCCESS:
      return {
        ...state,
        users: action.users,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default usersListReducer;
