import balesListReducer, { initialState } from '../../reducers/BalesReducer';
import { actionTypes } from '../../actions/BalesActions';

const mockState = {
  users: ['initial', 'mock', 'bales'],
  isFetching: false,
  error: false,
};

describe('bales list reducer', () => {
  it('should return the same state', () => {
    expect(balesListReducer(mockState, { users: [], type: 'not_an_action' })).toEqual(mockState);
  });

  it('should return the same state - using initialState', () => {
    expect(balesListReducer(initialState, { users: [], type: 'not_an_action2' })).toEqual(initialState);
  });

  it('should a state with isFetching in true', () => {
    expect(balesListReducer(initialState, { users: [], type: actionTypes.BALES_REQUEST })).toEqual({
      users: [],
      isFetching: true,
      error: false,
    });
  });

  it('should return a state with error in true', () => {
    expect(balesListReducer(initialState, { users: [], type: actionTypes.BALES_ERROR })).toEqual({
      users: [],
      isFetching: false,
      error: true,
    });
  });

  it('should return a state with mock users', () => {
    expect(balesListReducer(initialState, { users: ['Test'], type: actionTypes.BALES_REQUEST_SUCCESS })).toEqual({
      users: ['Test'],
      isFetching: false,
      error: false,
    });
  });

  it('should return a state with different users', () => {
    expect(balesListReducer(mockState, { users: ['new data'], type: actionTypes.BALES_REQUEST_SUCCESS })).toEqual({
      users: ['new data'],
      isFetching: false,
      error: false,
    });
  });
});
