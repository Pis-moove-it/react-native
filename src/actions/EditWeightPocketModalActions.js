import PocketController from '../controllers/PocketController';

export const actionTypes = {
  EDIT_POCKET_WEIGHT: 'EDIT_POCKET_WEIGHT',
  OPEN_EDIT_POCKET_MODAL: 'OPEN_EDIT_POCKET_MODAL',
  EDIT_POCKET_WEIGHT_REQUEST: 'EDIT_POCKET_WEIGHT_REQUEST',
  EDIT_POCKET_WEIGHT_SUCCESS: 'EDIT_POCKET_WEIGHT_SUCCESS',
  EDIT_POCKET_WEIGHT_ERROR: 'EDIT_POCKET_WEIGHT_ERROR',
  CLOSE_EDIT_POCKET_MODAL: 'CLOSE_EDIT_POCKET_MODAL',
  EDIT_POCKET_SERIAL: 'EDIT_POCKET_SERIAL',
  EDIT_POCKET_SERIAL_REQUEST: 'EDIT_POCKET_SERIAL_REQUEST',
  EDIT_POCKET_SERIAL_SUCCESS: 'EDIT_POCKET_SERIAL_SUCCESS',
  EDIT_POCKET_SERIAL_ERROR: 'EDIT_POCKET_SERIAL_ERROR',
};

const editRequest = () => ({
  type: actionTypes.EDIT_POCKET_WEIGHT_REQUEST,
});

const editSuccess = pocketData => ({
  type: actionTypes.EDIT_POCKET_WEIGHT_SUCCESS,
  pocketData,
});

const editError = error => ({
  type: actionTypes.EDIT_POCKET_WEIGHT_ERROR,
  error,
});

const openModal = (pocket, weight, hasWeight, serialNumber) => ({
  type: actionTypes.OPEN_EDIT_POCKET_MODAL,
  pocket,
  weight,
  hasWeight,
  serialNumber,
});

const closeModal = () => ({
  type: actionTypes.CLOSE_EDIT_POCKET_MODAL,
});

const editSerialNumberRequest = () => ({
  type: actionTypes.EDIT_POCKET_SERIAL_REQUEST,
});

const editSerialNumberSuccess = pocketData => ({
  type: actionTypes.EDIT_POCKET_SERIAL_SUCCESS,
  pocketData,
});

const editSerialNumberError = error => ({
  type: actionTypes.EDIT_POCKET_SERIAL_ERROR,
  error,
});

export const openEditIdPocketModal = (pocket, serialNumber) => (dispatch) => {
  dispatch(editSerialNumberRequest());
  dispatch(openModal(pocket, serialNumber));
};

export const editPocketSerialNumber = (token, pocket, serialNumber) => async (dispatch) => {
  dispatch(editSerialNumberRequest());
  try {
    const { pocketData } = await PocketController.editPocketSerialNumber(
      token,
      pocket,
      serialNumber,
    );
    dispatch(editSerialNumberSuccess(pocketData));
  } catch (error) {
    dispatch(editSerialNumberError(error.message));
  }
};

export const openEditWeightPocketModal = (pocket, weight, hasWeight, serialNumber) => (dispatch) => {
  dispatch(editRequest());
  dispatch(openModal(pocket, weight, hasWeight, serialNumber));
};

export const closeEditWeightPocketModal = () => (dispatch) => {
  dispatch(closeModal());
};

export const editPocketWeight = (token, pocket, weight, serialNumber) => async (dispatch) => {
  dispatch(editRequest());
  try {
    const { pocketData } = await PocketController.editPocketWeight(token, pocket, weight);
    const { pocketDataSN } = await PocketController.editPocketSerialNumber(
      token,
      pocket,
      serialNumber,
    );
    dispatch(editSuccess(pocketData));
    dispatch(editSerialNumberSuccess(pocketDataSN));
  } catch (error) {
    dispatch(editError(error.message));
  }
};

export const addPocketWeight = (token, pocket, weight, serialNumber) => async (dispatch) => {
  dispatch(editRequest());
  try {
    const { pocketData } = await PocketController.addPocketWeight(token, pocket, weight);
    const { pocketDataSN } = await PocketController.editPocketSerialNumber(
      token,
      pocket,
      serialNumber,
    );
    dispatch(editSuccess(pocketData));
    dispatch(editSerialNumberSuccess(pocketDataSN));
  } catch (error) {
    dispatch(editError(error.message));
  }
};
