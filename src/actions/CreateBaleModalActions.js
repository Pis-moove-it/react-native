export const actionTypes = {
  OPEN_CREATE_BALE_MODAL: 'OPEN_CREATE_BALE_MODAL',
  CLOSE_CREATE_BALE_MODAL: 'CLOSE_CREATE_BALE_MODAL',
};

const openCreateBaleModalType = () => ({
  type: actionTypes.OPEN_CREATE_BALE_MODAL,
  isVisible: false,
});

export const openCreateBaleModal = () => (dispatch) => {
  console.log('modal open');
  dispatch(openCreateBaleModalType());
};

const closeCreateBaleModalType = () => ({
  type: actionTypes.CLOSE_CREATE_BALE_MODAL,
  isVisible: false,
});

export const closeCreateBaleModal = () => (dispatch) => {
  dispatch(closeCreateBaleModalType());
};
