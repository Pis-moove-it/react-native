import PocketController from '../controllers/PocketController';

export const actionTypes = {
  POCKETS: 'POCKETS',
  POCKETS_REQUEST: 'POCKETS_REQUEST',
  POCKETS_SUCCESS: 'POCKETS_SUCCESS',
  POCKETS_ERROR: 'POCKETS_ERROR',
};

const pocketsRequest = () => ({
  type: actionTypes.POCKETS_REQUEST,
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

export const setPockets = pockets => async (dispatch) => {
  dispatch(pocketsRequest());
  dispatch(pocketsSuccess(pockets, pockets.length));
};

export const getPockets = (token, nextPage) => async (dispatch) => {
  dispatch(pocketsRequest());
  try {
    const { pockets } = await PocketController.getPockets(token, nextPage);
    dispatch(pocketsSuccess(pockets, pockets.length));
  } catch (error) {
    dispatch(pocketsError(error.message));
  }
};
