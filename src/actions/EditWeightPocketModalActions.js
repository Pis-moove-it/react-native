import PocketController from '../controllers/PocketController';
import { setPockets } from './PocketActions';

export const actionTypes = {
  EDIT_POCKET_WEIGHT: 'EDIT_POCKET_WEIGHT',
  OPEN_EDIT_POCKET_WEIGHT_MODAL: 'OPEN_EDIT_POCKET_WEIGHT_MODAL',
  EDIT_POCKET_WEIGHT_REQUEST: 'EDIT_POCKET_WEIGHT_REQUEST',
  EDIT_POCKET_WEIGHT_SUCCESS: 'EDIT_POCKET_WEIGHT_SUCCESS',
  EDIT_POCKET_WEIGHT_ERROR: 'EDIT_POCKET_WEIGHT_ERROR',
  CLOSE_EDIT_POCKET_WEIGHT_MODAL: 'CLOSE_EDIT_POCKET_WEIGHT_MODAL',
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

const openModal = (pocket, weight, hasWeight) => ({
  type: actionTypes.OPEN_EDIT_POCKET_WEIGHT_MODAL,
  pocket,
  weight,
  hasWeight,
});

export const openEditWeightPocketModal = (pocket, weight, hasWeight) => (dispatch) => {
  dispatch(editRequest());
  dispatch(openModal(pocket, weight, hasWeight));
};

const closeModal = () => ({
  type: actionTypes.CLOSE_EDIT_POCKET_WEIGHT_MODAL,
});

export const closeEditWeightPocketModal = () => (dispatch) => {
  dispatch(closeModal());
};

export const editPocketWeight = (token, pocket, weight, pockets) => async (dispatch) => {
  dispatch(editRequest());
  try {
    const { pocketData } = await PocketController.editPocketWeight(token, pocket, weight);

    const pocketsArray = [];
    pockets.map((element) => {
      if (element.id !== pocketData.id) pocketsArray.push(element);
      else pocketsArray.push(pocketData);
    });

    dispatch(setPockets(pocketsArray));
    dispatch(editSuccess(pocketData));
  } catch (error) {
    dispatch(editError(error.message));
  }
};

export const addPocketWeight = (token, pocket, weight) => async (dispatch) => {
  dispatch(editRequest());
  try {
    const { pocketData } = await PocketController.addPocketWeight(token, pocket, weight);
    dispatch(editSuccess(pocketData));
  } catch (error) {
    dispatch(editError(error.message));
  }
};
