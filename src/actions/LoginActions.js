import LoginController from '../controllers/LoginController';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
};

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

const loginSuccess = (token, organization, identifier) => ({
  type: actionTypes.LOGIN_SUCCESS,
  token,
  organization,
  identifier,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

export const logout = () => (dispatch) => {
  LoginController.logout();
  dispatch(logoutRequest());
};

export const login = (organization, password) => async (dispatch) => {
  dispatch(logout());
  dispatch(loginRequest());
  try {
    const { token, name, identifier } = await LoginController.login(
      organization,
      password,
      '/organizations/login',
    );
    dispatch(loginSuccess(token, name, identifier));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};
