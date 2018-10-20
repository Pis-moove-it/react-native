import BaleController from '../controllers/BaleController';

export const actionTypes = {
  OPEN_EDIT_BALE_MODAL: 'OPEN_EDIT_BALE_MODAL',
  CLOSE_EDIT_BALE_MODAL: 'CLOSE_EDIT_BALE_MODAL',
};

const openEditBaleModalType = bale => ({
  type: actionTypes.OPEN_EDIT_BALE_MODAL,
  bale,
});

export const openEditBaleModal = bale => (dispatch) => {
  dispatch(openEditBaleModalType(bale));
};

const closeEditBaleModalType = () => ({
  type: actionTypes.CLOSE_EDIT_BALE_MODAL,
});

export const closeEditBaleModal = () => (dispatch) => {
  dispatch(closeEditBaleModalType());
};

export const editBale = (token, bale, weight, material) => async (dispatch) => {
  try {
    const { baleData } = await BaleController.editBale(token, bale, weight, material);
    dispatch(closeEditBaleModal(baleData));
  } catch (error) {
    dispatch(openEditBaleModal(error.message));
  }
};
