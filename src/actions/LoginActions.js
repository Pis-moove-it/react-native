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

const loginSuccess = organization => ({
  type: actionTypes.LOGIN_SUCCESS,
  organization,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

export const login = (organization, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const logedOrganization = await LoginController.login(
      organization,
      password,
    );
    dispatch(loginSuccess(logedOrganization));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logout = () => (dispatch) => {
  LoginController.logout();
  dispatch(logoutRequest());
};
