import { getUsersApi } from '../api';

export const actionTypes = {
  USERS_API_REQUEST: 'USERS_API_REQUEST',
  USERS_API_ERROR: 'USERS_API_ERROR',
  USERS_REQUEST_SUCCESS: 'USERS_REQUEST_SUCCESS',
};

const getUsers = () => ({
  type: actionTypes.USERS_API_REQUEST,
});

const getUsersError = error => ({
  type: actionTypes.USERS_API_ERROR,
  error,
});

const getUsersSuccess = users => ({
  type: actionTypes.USERS_REQUEST_SUCCESS,
  users,
});

export const fetchUsers = () => (dispatch) => {
  dispatch(getUsers());
  getUsersApi(1)
    .then((response) => {
      dispatch(getUsersSuccess(response.data));
    })
    .catch(err => console.log('Error'));
};
