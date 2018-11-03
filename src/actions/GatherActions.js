import GatherController from '../controllers/GatherController';

export const actionTypes = {
  FINISH_TRAVEL: 'FINISH_TRAVEL',
  START_COLLECTION: 'START_COLLECTION',
  START_COLLECTION_REQUEST: 'START_COLLECTION_REQUEST',
  START_COLLECTION_SUCCESS: 'START_COLLECTION_SUCCESS',
  START_COLLECTION_ERROR: 'START_COLLECTION_ERROR',
};

const travelFinished = (date, hour, travelImage, kmsTraveled, pocketsCollected) => ({
  type: actionTypes.FINISH_TRAVEL,
  date,
  hour,
  travelImage,
  kmsTraveled,
  pocketsCollected,
});

export const finishTravel = (
  date,
  hour,
  travelImage,
  kmsTraveled,
  pocketsCollected,
) => (dispatch) => {
  dispatch(travelFinished(date, hour, travelImage, kmsTraveled, pocketsCollected));
};

const startCollectionRequest = () => ({
  type: actionTypes.START_COLLECTION_REQUEST,
});

const startCollectionSuccess = identifier => ({
  type: actionTypes.START_COLLECTION_SUCCESS,
  identifier,
});

const startCollectionError = error => ({
  type: actionTypes.START_COLLECTION_ERROR,
  error,
});

export const startCollection = token => async (dispatch) => {
  dispatch(startCollectionRequest());
  try {
    const { identifier } = await GatherController.startCollection(token);
    dispatch(startCollectionSuccess(identifier));
  } catch (error) {
    dispatch(startCollectionError(error.message));
  }
};
