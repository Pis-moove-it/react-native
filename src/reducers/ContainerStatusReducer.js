import { actionTypes } from '../actions/ContainerStatusActions';

export const initialState = {
  status: false,
  changeContainerStatusModalIsOpen: false,
  container: false,
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
        changeContainerStatusModalIsOpen: false,
        isLoading: false,
      };
    case actionTypes.CHANGE_CONTAINER_STATUS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.OPEN_CHANGE_CONTAINER_STATUS_MODAL:
      return {
        ...state,
        changeContainerStatusModalIsOpen: true,
        container: action.container,
      };
    case actionTypes.CLOSE_CHANGE_CONTAINER_STATUS_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default containerStatusReducer;
