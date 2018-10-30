import BaleController from '../controllers/BaleController';

export const actionTypes = {
  BALES: 'BALES',
  BALES_REQUEST: 'BALES_REQUEST',
  BALES_ERROR: 'BALES_ERROR',
  BALES_SUCCESS: 'BALES_SUCCESS',
};

const getBales = () => ({
  type: actionTypes.BALES_REQUEST,
});

const getBalesError = error => ({
  type: actionTypes.BALES_ERROR,
  error,
});

const getBalesSuccess = (bales, balesQuantity) => ({
  type: actionTypes.BALES_SUCCESS,
  bales,
  balesQuantity,
});

export const fetchBales = token => async (dispatch) => {
  dispatch(getBales());
  try {
    const { bales } = await BaleController.getBales(token);
    dispatch(getBalesSuccess(bales, bales.length));
  } catch (error) {
    dispatch(getBalesError(error.message));
  }
};
