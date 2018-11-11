import ContainerStatusController from '../controllers/ContainerStatusController';

export const actionTypes = {
  CHANGE_CONTAINER_STATUS_REQUEST: 'CHANGE_CONTAINER_STATUS_REQUEST',
  CHANGE_CONTAINER_STATUS_SUCCESS: 'CHANGE_CONTAINER_STATUS_SUCCESS',
  CHANGE_CONTAINER_STATUS_ERROR: 'CHANGE_CONTAINER_STATUS_ERROR',
};

const changeRequest = () => ({
  type: actionTypes.CHANGE_CONTAINER_STATUS_REQUEST,
});

const changeSuccess = containerData => ({
  type: actionTypes.CHANGE_CONTAINER_STATUS_SUCCESS,
  containerData,
});

const changeError = error => ({
  type: actionTypes.CHANGE_CONTAINER_STATUS_ERROR,
  error,
});

export const changeContainerStatus = (token, container, status) => async (dispatch) => {
  dispatch(changeRequest());
  try {
    const { containerData } = ContainerStatusController.editContainerStatus(
      token,
      container,
      status,
    );
    dispatch(changeSuccess(containerData));
  } catch (error) {
    dispatch(changeError(error.message));
  }
};
