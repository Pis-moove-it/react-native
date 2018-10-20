import BaleController from '../controllers/BaleController';

export const actionTypes = {
  OPEN_CREATE_BALE_MODAL: 'OPEN_CREATE_BALE_MODAL',
  CLOSE_CREATE_BALE_MODAL: 'CLOSE_CREATE_BALE_MODAL',
};

const openCreateBaleModalType = () => ({
  type: actionTypes.OPEN_CREATE_BALE_MODAL,
});

export const openCreateBaleModal = () => (dispatch) => {
  dispatch(openCreateBaleModalType());
};

const closeCreateBaleModalType = () => ({
  type: actionTypes.CLOSE_CREATE_BALE_MODAL,
});

export const closeCreateBaleModal = () => (dispatch) => {
  dispatch(closeCreateBaleModalType());
};

export const newBale = (token, weight, material) => async (dispatch) => {
  try {
    const { baleData } = await BaleController.newBale(token, weight, material);
    dispatch(closeCreateBaleModal(baleData));
  } catch (error) {
    dispatch(openCreateBaleModal(error.message));
  }
};
