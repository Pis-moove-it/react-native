export const actionTypes = {
  FINISH_TRAVEL: 'FINISH_TRAVEL',
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
