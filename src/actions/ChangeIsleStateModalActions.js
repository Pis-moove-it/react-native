export const actionTypes = {
  OPEN_CHANGE_ISLE_STATE_MODAL: 'OPEN_CHANGE_ISLE_STATE_MODAL',
  CLOSE_CHANGE_ISLE_STATE_MODAL: 'CLOSE_CHANGE_ISLE_STATE_MODAL',
};

const openChangeIsleStateModalType = container => ({
  type: actionTypes.OPEN_CHANGE_ISLE_STATE_MODAL,
  container,
});

export const openChangeIsleStateModal = container => (dispatch) => {
  dispatch(openChangeIsleStateModalType(container));
};

const closeChangeIsleStateModalType = () => ({
  type: actionTypes.CLOSE_CHANGE_ISLE_STATE_MODAL,
});

export const closeChangeIsleStateModal = () => (dispatch) => {
  dispatch(closeChangeIsleStateModalType());
};
