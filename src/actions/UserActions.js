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

const loginSuccess = userData => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userData,
});

const logoutRequest = () => ({
  type: actionTypes.USER_LOGOUT,
});

export const logout = () => (dispatch) => {
  UserController.logout();
  dispatch(logoutRequest());
};

export const login = (token, organization, user) => async (dispatch) => {
  dispatch(logout());
  dispatch(loginRequest());
  try {
    const { userData } = await UserController.login(token, organization, user);
    dispatch(loginSuccess(userData));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};
