import { actionTypes } from '../actions/APIActions';

const initialState = {
  data: false,
  isFetching: false,
  error: false,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.API_REQUEST:
      return {
        ...state,
        data: false,
        isFetching: true,
      };
    case actionTypes.API_ERROR:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default apiReducer;
