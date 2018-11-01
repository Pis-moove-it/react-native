export const actionTypes = {
  OPEN_EDIT_POCKET_MODAL: 'OPEN_EDIT_POCKET_MODAL',
  CLOSE_EDIT_POCKET_MODAL: 'CLOSE_EDIT_POCKET_MODAL',
};

const openEditIdPocketModalType = () => ({
  type: actionTypes.OPEN_EDIT_POCKET_MODAL,
  isVisible: true,
});

export const openEditIdPocketModal = () => (dispatch) => {
  dispatch(openEditIdPocketModalType());
};

const closeEditIdPocketModalType = () => ({
  type: actionTypes.CLOSE_EDIT_POCKET_MODAL,
  isVisible: false,
});

export const closeEditIdPocketModal = () => (dispatch) => {
  dispatch(closeEditIdPocketModalType());
};
