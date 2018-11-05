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

export const getPockets = (token, nextPage) => async (dispatch) => {
  dispatch(pocketRequest());
  try {
    const { pockets } = await PocketController.getPockets(token, nextPage);
    await dispatch(setPockets(pockets));
    dispatch(pocketSuccess());
  } catch (error) {
    dispatch(pocketError(error.message));
  }
};

export const editPocketSerialNumber = (token, pocket, serialNumber) => async (dispatch) => {
  dispatch(pocketRequest());
  try {
    const { pocketData } = await PocketController.editPocketSerialNumber(
      token,
      pocket,
      serialNumber,
    );
    await dispatch(setPocketData(pocketData));
    dispatch(pocketSuccess());
  } catch (error) {
    dispatch(pocketError(error.message));
  }
};

export const editPocketWeight = (token, pocket, weight) => async (dispatch) => {
  dispatch(pocketRequest());
  try {
    const { pocketData } = await PocketController.editPocketWeight(token, pocket, weight);
    await dispatch(setPocketData(pocketData));
    dispatch(pocketSuccess());
  } catch (error) {
    dispatch(pocketError(error.message));
  }
};

export const addPocketWeight = (token, pocket, weight) => async (dispatch) => {
  dispatch(pocketRequest());
  try {
    const { pocketData } = await PocketController.addPocketWeight(token, pocket, weight);
    await dispatch(setPocketData(pocketData));
    dispatch(pocketSuccess());
  } catch (error) {
    dispatch(pocketsError(error.message));
  }
};
