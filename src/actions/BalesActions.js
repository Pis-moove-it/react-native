import BaleController from '../controllers/BaleController';

export const actionTypes = {
  BALES: 'BALES',
  BALES_REQUEST: 'BALES_REQUEST',
  BALES_RESET: 'BALES_RESET',
  BALES_SUCCESS: 'BALES_SUCCESS',
  BALES_ERROR: 'BALES_ERROR',
  BALES_ADD: 'BALES_ADD',
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

export const setBaleCount = newBales => ({
  type: actionTypes.BALES_ADD,
  newBales,
});

export const setBales = bales => async (dispatch) => {
  dispatch(balesReset());
  dispatch(balesRequest());
  dispatch(balesSuccess(bales, bales.length));
};

export const fetchBales = (token, oldBales, nextPage, newBales) => async (dispatch) => {
  dispatch(balesRequest());
  try {
    const { bales } = await BaleController.getBales(token, nextPage);
    dispatch(setBalesEnd(bales.length < 10));

    if (nextPage === 1) {
      dispatch(balesSuccess(bales, bales.length));
    } else if (newBales > 0) {
      await dispatch(balesSuccess(
        oldBales.concat(bales.slice(newBales)),
        oldBales.length + bales.length + -newBales,
      ));
    } else {
      dispatch(balesSuccess(oldBales.concat(bales), oldBales.length + bales.length));
    }

    await dispatch(setBaleCount(0));
  } catch (error) {
    dispatch(balesError(error.message));
  }
};
