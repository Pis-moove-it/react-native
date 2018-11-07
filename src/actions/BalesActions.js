import BaleController from '../controllers/BaleController';

export const actionTypes = {
  BALES: 'BALES',
  BALES_REQUEST: 'BALES_REQUEST',
  BALES_SUCCESS: 'BALES_SUCCESS',
  BALES_ERROR: 'BALES_ERROR',
};

const getBales = () => ({
  type: actionTypes.BALES_REQUEST,
});

const getBalesSuccess = (bales, balesQuantity) => ({
  type: actionTypes.BALES_SUCCESS,
  bales,
  balesQuantity,
});

const getBalesError = error => ({
  type: actionTypes.BALES_ERROR,
  error,
});

export const setBales = bales => async (dispatch) => {
  dispatch(getBales());
  dispatch(getBalesSuccess(bales, bales.length));
};

export const fetchBales = (token, nextPage) => async (dispatch) => {
  dispatch(getBales());
  try {
    const { bales } = await BaleController.getBales(token, nextPage);
    dispatch(getBalesSuccess(bales, bales.length));
  } catch (error) {
    dispatch(getBalesError(error.message));
  }
};
