export const actionTypes = {
  OPEN_EDIT_BALE_MODAL: 'OPEN_EDIT_BALE_MODAL',
  CLOSE_EDIT_BALE_MODAL: 'OPEN_EDIT_BALE_MODAL',
};

const openEditBaleModalType = () => ({
  type: actionTypes.OPEN_EDIT_BALE_MODAL,
  isVisible: true,
});

export const openEditBaleModal = () => (dispatch) => {
  dispatch(openEditBaleModalType());
};

const closeEditBaleModalType = () => ({
  type: actionTypes.CLOSE_EDIT_BALE_MODAL,
  isVisible: false,
});

export const closeEditBaleModal = () => (dispatch) => {
  dispatch(closeEditBaleModalType());
};
