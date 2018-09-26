import apiReducer, { initialState } from '../../reducers/APIReducer';
import { actionTypes } from '../../actions/APIActions';

const mockState = {
  data: ['initial', 'mock', 'data'],
  isFetching: false,
  error: false,
};

describe('api reducer', () => {
  it('should return the same state', () => {
    expect(apiReducer(mockState, { data: [], type: 'not_an_action' })).toEqual(mockState);
  });

  it('should return the same state - using initialState', () => {
    expect(apiReducer(initialState, { data: [], type: 'not_an_action2' })).toEqual(initialState);
  });

  it('should a state with isFetching in true', () => {
    expect(apiReducer(initialState, { data: [], type: actionTypes.API_REQUEST })).toEqual({
      data: [],
      isFetching: true,
      error: false,
    });
  });

  it('should return a state with error in true', () => {
    expect(apiReducer(initialState, { data: [], type: actionTypes.API_ERROR })).toEqual({
      data: [],
      isFetching: false,
      error: true,
    });
  });

  it('should return a state with mock data', () => {
    expect(apiReducer(initialState, { data: ['Test'], type: actionTypes.REQUEST_SUCCESS })).toEqual({
      data: ['Test'],
      isFetching: false,
      error: false,
    });
  });

  it('should return a state with different data', () => {
    expect(apiReducer(mockState, { data: ['new data'], type: actionTypes.REQUEST_SUCCESS })).toEqual({
      data: ['new data'],
      isFetching: false,
      error: false,
    });
  });
});
