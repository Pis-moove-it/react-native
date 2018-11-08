// DEPRECADO

import PocketController from '../controllers/PocketController';

export const actionTypes = {
  EDIT_POCKET_SERIAL: 'EDIT_POCKET_SERIAL',
  OPEN_EDIT_POCKET_SERIAL_MODAL: 'OPEN_EDIT_POCKET_SERIAL_MODAL',
  EDIT_POCKET_SERIAL_REQUEST: 'EDIT_POCKET_SERIAL_REQUEST',
  EDIT_POCKET_SERIAL_SUCCESS: 'EDIT_POCKET_SERIAL_SUCCESS',
  EDIT_POCKET_SERIAL_ERROR: 'EDIT_POCKET_SERIAL_ERROR',
  CLOSE_EDIT_POCKET_SERIAL_MODAL: 'CLOSE_EDIT_POCKET_SERIAL_MODAL',
};

const editSNRequest = () => ({
  type: actionTypes.EDIT_POCKET_SERIAL_REQUEST,
});

const editSNSuccess = pocketData => ({
  type: actionTypes.EDIT_POCKET_SERIAL_SUCCESS,
  pocketData,
});

const editSNError = error => ({
  type: actionTypes.EDIT_POCKET_SERIAL_ERROR,
  error,
});

export const openEditIdPocketModal = (pocket, serialNumber) => (dispatch) => {
  dispatch(editSNRequest());
  dispatch(openModal(pocket, serialNumber));
};

export const editPocketSerialNumber = (token, pocket, serialNumber) => async (dispatch) => {
  dispatch(editSNRequest());
  try {
    const { pocketData } = await PocketController.editPocketSerialNumber(
      token,
      pocket,
      serialNumber,
    );
    dispatch(editSNSuccess(pocketData));
  } catch (error) {
    dispatch(editSNError(error.message));
  }
};
