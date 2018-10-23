import PocketController from '../controllers/PocketController';

export const actionTypes = {
  POCKETS_REQUEST: 'POCKETS_REQUEST',
  POCKETS_ERROR: 'POCKETS_ERROR',
  POCKETS_REQUEST_SUCCESS: 'POCKETS_REQUEST_SUCCESS',
};

const getPockets = () => ({
  type: actionTypes.POCKETS_REQUEST,
});

const getPocketsError = error => ({
  type: actionTypes.POCKETS_ERROR,
  error,
});

const getPocketsSuccess = pockets => ({
  type: actionTypes.POCKETS_REQUEST_SUCCESS,
  pockets,
});

export const fetchPockets = token => async (dispatch) => {
  dispatch(getPockets());
  try {
    const { pockets } = await PocketController.getPockets(token);
    dispatch(getPocketsSuccess(pockets));
  } catch (error) {
    dispatch(getPocketsError(error.message));
  }
};
