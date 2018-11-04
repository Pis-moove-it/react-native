import GatherController from '../controllers/GatherController';

export const actionTypes = {
  FINISH_TRAVEL: 'FINISH_TRAVEL',
  START_COLLECTION: 'START_COLLECTION',
  START_COLLECTION_REQUEST: 'START_COLLECTION_REQUEST',
  START_COLLECTION_SUCCESS: 'START_COLLECTION_SUCCESS',
  START_COLLECTION_ERROR: 'START_COLLECTION_ERROR',
  ADD_POCKET_REQUEST: 'ADD_POCKET_REQUEST',
  ADD_POCKET_SUCCESS: 'ADD_POCKET_SUCCESS',
  ADD_POCKET_ERROR: 'ADD_POCKET_ERROR',
  END_COLLECTION_REQUEST: 'END_COLLECTION_REQUEST',
  END_COLLECTION_SUCCESS: 'END_COLLECTION_SUCCESS',
  END_COLLECTION_ERROR: 'END_COLLECTION_ERROR',
  GET_CONTAINERS_REQUEST: 'GET_CONTAINERS_REQUEST',
  GET_CONTAINERS_SUCCESS: 'GET_CONTAINERS_SUCCESS',
  GET_CONTAINERS_ERROR: 'GET_CONTAINERS_ERROR',
  SET_CONTAINER_ID: 'SET_CONTAINER_ID',
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

const endCollectionRequest = () => ({
  type: actionTypes.END_COLLECTION_REQUEST,
});

const endCollectionSuccess = () => ({
  type: actionTypes.END_COLLECTION_SUCCESS,
});

const endCollectionError = error => ({
  type: actionTypes.END_COLLECTION_ERROR,
  error,
});

const getContainersRequest = () => ({
  type: actionTypes.GET_CONTAINERS_REQUEST,
});

const getContainersSuccess = containers => ({
  type: actionTypes.GET_CONTAINERS_SUCCESS,
  containers,
});

const getContainersError = error => ({
  type: actionTypes.GET_CONTAINERS_ERROR,
  error,
});

export const setContainerId = containerIdSelected => ({
  type: actionTypes.SET_CONTAINER_ID,
  containerIdSelected,
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
    console.log(error);
    dispatch(addPocketError(error.message));
  }
};

export const endCollection = (token, routeId, routeLength, routeImage) => async (dispatch) => {
  dispatch(endCollectionRequest());
  try {
    await GatherController.endCollection(token, routeId, routeLength, routeImage);
    dispatch(endCollectionSuccess());
  } catch (error) {
    dispatch(endCollectionError(error.message));
  }
};

export const getContainers = token => async (dispatch) => {
  dispatch(getContainersRequest());
  try {
    const { containers } = await GatherController.getContainers(token);
    dispatch(getContainersSuccess(containers));
  } catch (error) {
    dispatch(getContainersError(error.message));
  }
};
