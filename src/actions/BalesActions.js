import BaleController from '../controllers/BaleController';

export const actionTypes = {
  BALES: 'BALES',
  BALES_REQUEST: 'BALES_REQUEST',
  BALES_RESET: 'BALES_RESET',
  BALES_SUCCESS: 'BALES_SUCCESS',
  BALES_ERROR: 'BALES_ERROR',
  BALES_END: 'BALES_END',
};

const balesRequest = () => ({
  type: actionTypes.BALES_REQUEST,
});

const balesReset = () => ({
  type: actionTypes.BALES_RESET,
});

const balesSuccess = (bales, balesQuantity) => ({
  type: actionTypes.BALES_SUCCESS,
  bales,
  balesQuantity,
});

const balesError = error => ({
  type: actionTypes.BALES_ERROR,
  error,
});

const setBalesEnd = isEnd => ({
  type: actionTypes.BALES_END,
  isEnd,
});

export const setBales = bales => async (dispatch) => {
  dispatch(balesReset());
  dispatch(balesRequest());
  dispatch(balesSuccess(bales, bales.length));
};

export const fetchBales = (token, oldBales, nextPage) => async (dispatch) => {
  dispatch(balesRequest());
  try {
    const { bales } = await BaleController.getBales(token, nextPage);

    if (bales.length < 10) dispatch(setBalesEnd(true));
    else dispatch(setBalesEnd(false));

    if (nextPage === 1) dispatch(balesSuccess(bales, bales.length));
    else dispatch(balesSuccess(oldBales.concat(bales), oldBales.length));
  } catch (error) {
    dispatch(balesError(error.message));
  }
};
