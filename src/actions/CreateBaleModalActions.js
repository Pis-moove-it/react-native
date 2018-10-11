export const actionTypes = {
  OPEN_CREATE_BALE_MODAL: 'OPEN_CREATE_BALE_MODAL',
  CLOSE_CREATE_BALE_MODAL: 'CLOSE_CREATE_BALE_MODAL',
};

const openCreateBaleModalType = () => ({
  type: actionTypes.OPEN_CREATE_BALE_MODAL,
  isVisible: true,
});

export const openCreateBaleModal = () => (dispatch) => {
  dispatch(openCreateBaleModalType());
};

const closeCreateBaleModalType = () => ({
  type: actionTypes.CLOSE_CREATE_BALE_MODALT,
  isVisible: false,
});

export const closeCreateBaleModal = () => (dispatch) => {
  dispatch(closeCreateBaleModalType());
};
