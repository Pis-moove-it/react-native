import UserController from '../controllers/UserController';

export const actionTypes = {
  USERS_API_REQUEST: 'USERS_API_REQUEST',
  USERS_API_ERROR: 'USERS_API_ERROR',
  USERS_REQUEST_SUCCESS: 'USERS_REQUEST_SUCCESS',
};

const usersRequest = () => ({
  type: actionTypes.USERS_API_REQUEST,
});

const usersError = error => ({
  type: actionTypes.USERS_API_ERROR,
  error,
});

const usersSucces = users => ({
  type: actionTypes.USERS_REQUEST_SUCCESS,
  users,
});

export const fetchUsers = (token, organization) => async (dispatch) => {
  dispatch(usersRequest());
  try {
    const { users } = await UserController.getUsers(token, organization);
    dispatch(usersSucces(users));
  } catch (error) {
    dispatch(usersError(error.message));
  }
};
