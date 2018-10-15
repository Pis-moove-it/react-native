export const actionTypes = {
  OPEN_CREATE_POCKET_MODAL: 'OPEN_CREATE_POCKET_MODAL',
  CLOSE_CREATE_POCKET_MODAL: 'CLOSE_CREATE_POCKET_MODAL',
};

const openCreatePocketModalType = () => ({
  type: actionTypes.OPEN_CREATE_POCKET_MODAL,
  isVisible: true,
});

export const openCreatePocketModal = () => (dispatch) => {
  dispatch(openCreatePocketModalType());
};

const closeCreatePocketModalType = () => ({
  type: actionTypes.CLOSE_CREATE_POCKET_MODAL,
  isVisible: false,
});

export const closeCreatePocketModal = () => (dispatch) => {
  dispatch(closeCreatePocketModalType());
};
