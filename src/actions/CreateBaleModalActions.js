import BaleController from '../controllers/BaleController';

export const actionTypes = {
  CREATE: 'CREATE',
  OPEN_CREATE_BALE_MODAL: 'OPEN_CREATE_BALE_MODAL',
  CREATE_REQUEST: 'CREATE_REQUEST',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_ERROR: 'CREATE_ERROR',
  CLOSE_CREATE_BALE_MODAL: 'CLOSE_CREATE_BALE_MODAL',
};

const createRequest = () => ({
  type: actionTypes.CREATE_REQUEST,
});

const createSuccess = baleData => ({
  type: actionTypes.CREATE_SUCCESS,
  baleData,
});

const createError = error => ({
  type: actionTypes.CREATE_ERROR,
  error,
});

const openCreateBaleModalType = () => ({
  type: actionTypes.OPEN_CREATE_BALE_MODAL,
});

export const openCreateBaleModal = () => (dispatch) => {
  dispatch(createRequest());
  dispatch(openCreateBaleModalType());
};

const closeCreateBaleModalType = () => ({
  type: actionTypes.CLOSE_CREATE_BALE_MODAL,
});

export const closeCreateBaleModal = () => (dispatch) => {
  dispatch(closeCreateBaleModalType());
};

export const newBale = (token, weight, material) => async (dispatch) => {
  dispatch(createRequest());
  try {
    const { baleData } = await BaleController.newBale(token, weight, material);
    dispatch(createSuccess(baleData));
  } catch (error) {
    dispatch(createError(error.message));
  }
};
