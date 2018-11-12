import ContainerStatusController from '../controllers/ContainerStatusController';

export const actionTypes = {
  CHANGE_CONTAINER_STATUS: 'CHANGE_CONTAINER_STATUS',
  CHANGE_CONTAINER_STATUS_REQUEST: 'CHANGE_CONTAINER_STATUS_REQUEST',
  CHANGE_CONTAINER_STATUS_SUCCESS: 'CHANGE_CONTAINER_STATUS_SUCCESS',
  CHANGE_CONTAINER_STATUS_ERROR: 'CHANGE_CONTAINER_STATUS_ERROR',
  OPEN_CHANGE_CONTAINER_STATUS_MODAL: 'OPEN_CHANGE_CONTAINER_STATUS_MODAL',
  CLOSE_CHANGE_CONTAINER_STATUS_MODAL: 'CLOSE_CHANGE_CONTAINER_STATUS_MODAL',
};

const openChangeContainerStatusModalType = container => ({
  type: actionTypes.OPEN_CHANGE_CONTAINER_STATUS_MODAL,
  container,
});

export const openChangeContainerStatusModal = container => (dispatch) => {
  dispatch(openChangeContainerStatusModalType(container));
};

const closeChangeContainerStatusModalType = () => ({
  type: actionTypes.CLOSE_CHANGE_CONTAINER_STATUS_MODAL,
});

export const closeChangeContainerStatusModal = () => (dispatch) => {
  dispatch(closeChangeContainerStatusModalType());
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
    const { containerData } = await ContainerStatusController.editContainerStatus(
      token,
      container,
      status,
    );
    dispatch(changeSuccess(containerData));
  } catch (error) {
    dispatch(changeError(error.message));
  }
};
