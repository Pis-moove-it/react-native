import { actionTypes } from '../actions/GatherActions';

export const initialState = {
  date: false,
  hour: false,
  travelImage: false,
  kmsTraveled: 0,
  pocketsCollected: 0,
};

const gatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FINISH_TRAVEL:
      return {
        ...state,
        date: action.date,
        hour: action.hour,
        travelImage: action.travelImage,
        kmsTraveled: action.kmsTraveled,
        pocketsCollected: action.pocketsCollected,
      };
    default:
      return state;
  }
};

export default gatherReducer;
