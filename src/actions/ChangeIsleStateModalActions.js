export const actionTypes = {
  OPEN_CHANGE_ISLE_STATE_MODAL: 'OPEN_CHANGE_ISLE_STATE_MODAL',
  CLOSE_CHANGE_ISLE_STATE_MODAL: 'CLOSE_CHANGE_ISLE_STATE_MODAL',
};

const openChangeIsleStateModalType = () => ({
  type: actionTypes.OPEN_CHANGE_ISLE_STATE_MODAL,
});

export const openChangeIsleStateModal = () => (dispatch) => {
  dispatch(openChangeIsleStateModalType());
};

const closeChangeIsleStateModalType = () => ({
  type: actionTypes.CLOSE_CHANGE_ISLE_STATE_MODAL,
});

export const closeChangeIsleStateModal = () => (dispatch) => {
  dispatch(closeChangeIsleStateModalType());
};
