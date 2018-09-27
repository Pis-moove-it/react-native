import getDataApi from '../api';
import axios from 'axios';

export const actionTypes = {
  API_REQUEST: 'API_REQUEST',
  API_ERROR: 'API_ERROR',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
};

const getData = () => ({
  type: actionTypes.API_REQUEST,
});

const getDataError = error => ({
  type: actionTypes.API_ERROR,
  error,
});

const getDataSuccess = data => ({
  type: actionTypes.REQUEST_SUCCESS,
  data,
});


export const fetchData = () => {
  return (dispatch) => {
    dispatch(getData());
    getDataApi()
      .then((response) => {
        dispatch(getDataSuccess(response.data))
      })
      .catch((err) => console.log("Error"))
  }
};
