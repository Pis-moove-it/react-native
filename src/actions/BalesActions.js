import { getBalesApi } from '../api';

export const actionTypes = {
  BALES_REQUEST: 'BALES_REQUEST',
  BALES_ERROR: 'BALES_ERROR',
  BALES_REQUEST_SUCCESS: 'BALES_REQUEST_SUCCESS',
};

const getBales = () => ({
  type: actionTypes.BALES_REQUEST,
});

const getBalesError = error => ({
  type: actionTypes.BALES_ERROR,
  error,
});

const getBalesSuccess = bales => ({
  type: actionTypes.BALES_REQUEST_SUCCESS,
  bales,
});

export const fetchBales = () => (dispatch) => {
  dispatch(getBales());
  getBalesApi()
    .then((response) => {
      dispatch(getBalesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getBalesError(error));
    });
};
