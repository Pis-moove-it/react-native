import BaleController from '../controllers/BaleController';

export const actionTypes = {
  EDIT_BALE: 'EDIT_BALE',
  OPEN_EDIT_BALE_MODAL: 'OPEN_EDIT_BALE_MODAL',
  EDIT_BALE_REQUEST: 'EDIT_BALE_REQUEST',
  EDIT_BALE_SUCCESS: 'EDIT_BALE_SUCCESS',
  EDIT_BALE_ERROR: 'EDIT_BALE_ERROR',
  CLOSE_EDIT_BALE_MODAL: 'CLOSE_EDIT_BALE_MODAL',
};

const editRequest = () => ({
  type: actionTypes.EDIT_BALE_REQUEST,
});

const editSuccess = baleData => ({
  type: actionTypes.EDIT_BALE_SUCCESS,
  baleData,
});

const editError = error => ({
  type: actionTypes.EDIT_BALE_ERROR,
  error,
});

const openEditBaleModalType = (bale, material, weight) => ({
  type: actionTypes.OPEN_EDIT_BALE_MODAL,
  bale,
  material,
  weight,
});

export const openEditBaleModal = (bale, material, weight) => (dispatch) => {
  dispatch(editRequest());
  dispatch(openEditBaleModalType(bale, material, weight));
};

const closeEditBaleModalType = () => ({
  type: actionTypes.CLOSE_EDIT_BALE_MODAL,
});

export const closeEditBaleModal = () => (dispatch) => {
  dispatch(closeEditBaleModalType());
};

export const editBale = (token, bale, weight, material) => async (dispatch) => {
  dispatch(editRequest());
  try {
    const { baleData } = await BaleController.editBale(token, bale, weight, material);
    dispatch(editSuccess(baleData));
  } catch (error) {
    dispatch(editError(error.message));
  }
};
