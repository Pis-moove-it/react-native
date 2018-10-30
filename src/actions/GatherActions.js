export const actionTypes = {
  FINISH_TRAVEL: 'FINISH_TRAVEL',
};

const travelFinished = (date, hour, kmsTraveled, pocketsCollected) => ({
  type: actionTypes.FINISH_TRAVEL,
  date,
  hour,
  kmsTraveled,
  pocketsCollected,
});

export const finishTravel = (date, hour, kmsTraveled, pocketsCollected) => (dispatch) => {
  dispatch(travelFinished(date, hour, kmsTraveled, pocketsCollected));
};
