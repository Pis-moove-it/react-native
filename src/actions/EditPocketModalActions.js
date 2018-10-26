export const actionTypes = {
  OPEN_EDIT_POCKET_MODAL: 'OPEN_EDIT_POCKET_MODAL',
  CLOSE_EDIT_POCKET_MODAL: 'CLOSE_EDIT_POCKET_MODAL',
};

const openEditPocketModalType = () => ({
  type: actionTypes.OPEN_EDIT_POCKET_MODAL,
  isVisible: true,
});

export const openEditPocketModal = () => (dispatch) => {
  dispatch(openEditPocketModalType());
};

const closeEditPocketModalType = () => ({
  type: actionTypes.CLOSE_EDIT_POCKET_MODAL,
  isVisible: false,
});

export const closeEditPocketModal = () => (dispatch) => {
  dispatch(closeEditPocketModalType());
};
