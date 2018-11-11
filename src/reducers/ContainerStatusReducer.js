import { actionTypes } from '../actions/ContainerStatusActions';

export const initialState = {
  status: false,
  isLoading: false,
};

const containerStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CONTAINER_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CHANGE_CONTAINER_STATUS_SUCCESS:
      return {
        ...state,
        status: action.status,
        isLoading: false,
      };
    case actionTypes.CHANGE_CONTAINER_STATUS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default containerStatusReducer;
