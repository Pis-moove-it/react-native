import GatherController from '../controllers/GatherController';
import { globalReset } from '../actions/GlobalActions';

export const actionTypes = {
  ADD_POCKET: 'ADD_POCKET',
  OPEN_CREATE_POCKET_MODAL: 'OPEN_CREATE_POCKET_MODAL',
  ADD_POCKET_REQUEST: 'ADD_POCKET_REQUEST',
  ADD_POCKET_SUCCESS: 'ADD_POCKET_SUCCESS',
  ADD_POCKET_ERROR: 'ADD_POCKET_ERROR',
  CLOSE_CREATE_POCKET_MODAL: 'CLOSE_CREATE_POCKET_MODAL',
};

const addPocketRequest = () => ({
  type: actionTypes.ADD_POCKET_REQUEST,
});

const addPocketSuccess = () => ({
  type: actionTypes.ADD_POCKET_SUCCESS,
});

const addPocketError = error => ({
  type: actionTypes.ADD_POCKET_ERROR,
  error,
});

export const addPocketToCollection = (
  token,
  routeId,
  collectionId,
  pocketsArray,
) => async (dispatch) => {
  dispatch(addPocketRequest());
  try {
    await GatherController.addPocketToCollection(token, routeId, collectionId, pocketsArray);
    dispatch(addPocketSuccess());
  } catch (error) {
    dispatch(addPocketError(error.message));
  }
};

const openCreatePocketModalType = () => ({
  type: actionTypes.OPEN_CREATE_POCKET_MODAL,
});

export const openCreatePocketModal = () => (dispatch) => {
  dispatch(globalReset());
  dispatch(openCreatePocketModalType());
};

const closeCreatePocketModalType = () => ({
  type: actionTypes.CLOSE_CREATE_POCKET_MODAL,
});

export const closeCreatePocketModal = () => (dispatch) => {
  dispatch(closeCreatePocketModalType());
};
