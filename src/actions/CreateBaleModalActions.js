import BaleController from '../controllers/BaleController';

export const actionTypes = {
  CREATE_BALE: 'CREATE_BALE',
  OPEN_CREATE_BALE_MODAL: 'OPEN_CREATE_BALE_MODAL',
  CREATE_BALE_REQUEST: 'CREATE_BALE_REQUEST',
  CREATE_BALE_SUCCESS: 'CREATE_BALE_SUCCESS',
  CREATE_BALE_ERROR: 'CREATE_BALE_ERROR',
  CLOSE_CREATE_BALE_MODAL: 'CLOSE_CREATE_BALE_MODAL',
};

const createRequest = () => ({
  type: actionTypes.CREATE_BALE_REQUEST,
});

const createSuccess = baleData => ({
  type: actionTypes.CREATE_BALE_SUCCESS,
  baleData,
});

const createError = error => ({
  type: actionTypes.CREATE_BALE_ERROR,
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
