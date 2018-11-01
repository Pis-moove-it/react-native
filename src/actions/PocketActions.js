import PocketController from '../controllers/PocketController';

export const actionTypes = {
  POCKET: 'POCKET',
  POCKET_REQUEST: 'POCKET_REQUEST',
  POCKET_SUCCESS: 'POCKET_SUCCESS',
  POCKET_ERROR: 'POCKET_ERROR',
  POCKET_SET: 'POCKET_SET',
  POCKET_SET_DATA: 'POCKET_SET_DATA',
};

const pocketRequest = () => ({
  type: actionTypes.POCKET_REQUEST,
});

const pocketSuccess = () => ({
  type: actionTypes.POCKET_SUCCESS,
});

const pocketError = error => ({
  type: actionTypes.POCKET_ERROR,
  error,
});

const setPockets = pockets => ({
  type: actionTypes.POCKET_SET,
  pockets,
});

const setPocketData = pocketData => ({
  type: actionTypes.POCKET_SET_DATA,
  pocketData,
});

export const getPockets = token => async (dispatch) => {
  dispatch(pocketRequest());
  try {
    const { pockets } = await PocketController.getPockets(token);
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
    dispatch(pocketError(error.message));
  }
};
