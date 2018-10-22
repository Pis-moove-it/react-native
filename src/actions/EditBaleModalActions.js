import BaleController from '../controllers/BaleController';

export const actionTypes = {
  EDIT: 'EDIT',
  OPEN_EDIT_BALE_MODAL: 'OPEN_EDIT_BALE_MODAL',
  EDIT_REQUEST: 'EDIT_REQUEST',
  EDIT_SUCCESS: 'EDIT_SUCCESS',
  EDIT_ERROR: 'EDIT_ERROR',
  CLOSE_EDIT_BALE_MODAL: 'CLOSE_EDIT_BALE_MODAL',
};

const editRequest = () => ({
  type: actionTypes.EDIT_REQUEST,
});

const editSuccess = baleData => ({
  type: actionTypes.EDIT_SUCCESS,
  baleData,
});

const editError = error => ({
  type: actionTypes.EDIT_ERROR,
  error,
});

const openEditBaleModalType = bale => ({
  type: actionTypes.OPEN_EDIT_BALE_MODAL,
  bale,
});

export const openEditBaleModal = bale => (dispatch) => {
  dispatch(editRequest());
  dispatch(openEditBaleModalType(bale));
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
