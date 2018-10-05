import UserController from '../controllers/UserController';

export const actionTypes = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGOUT: 'USER_LOGOUT',
};

const loginRequest = () => ({
  type: actionTypes.USER_LOGIN_REQUEST,
});

const loginError = error => ({
  type: actionTypes.USER_LOGIN_ERROR,
  error,
});

const loginSuccess = user => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  user,
});

const logoutRequest = () => ({
  type: actionTypes.USER_LOGOUT,
});

export const login = (identifier, username) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await UserController.login(identifier, username);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logout = () => (dispatch) => {
  UserController.logout();
  dispatch(logoutRequest());
};
