import PocketController from '../controllers/PocketController';

export const actionTypes = {
  POCKETS: 'POCKETS',
  POCKETS_REQUEST: 'POCKETS_REQUEST',
  POCKETS_RESET: 'POCKETS_RESET',
  POCKETS_SUCCESS: 'POCKETS_SUCCESS',
  POCKETS_ERROR: 'POCKETS_ERROR',
  POCKETS_END: 'POCKETS_END',
};

const pocketsRequest = () => ({
  type: actionTypes.POCKETS_REQUEST,
});

const pocketsReset = () => ({
  type: actionTypes.POCKETS_RESET,
});

const pocketsSuccess = (pockets, pocketsQuantity) => ({
  type: actionTypes.POCKETS_SUCCESS,
  pockets,
  pocketsQuantity,
});

const pocketsError = error => ({
  type: actionTypes.POCKETS_ERROR,
  error,
});

const setPocketsEnd = isEnd => ({
  type: actionTypes.POCKETS_END,
  isEnd,
});

export const setPockets = pockets => async (dispatch) => {
  dispatch(pocketsReset());
  dispatch(pocketsRequest());
  dispatch(pocketsSuccess(pockets, pockets.length));
};

export const getPockets = (token, oldPockets, nextPage) => async (dispatch) => {
  dispatch(pocketsRequest());
  try {
    const { pockets } = await PocketController.getPockets(token, nextPage);
    dispatch(setPocketsEnd(pockets.length < 10));

    if (nextPage === 1) dispatch(pocketsSuccess(pockets, pockets.length));
    else dispatch(pocketsSuccess(oldPockets.concat(pockets), oldPockets.length));
  } catch (error) {
    dispatch(pocketsError(error.message));
  }
};
