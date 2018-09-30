import usersListReducer, { initialState } from '../../reducers/UsersAPIReducer';
import { actionTypes } from '../../actions/UsersAPIActions';

const mockState = {
  users: ['initial', 'mock', 'users'],
  isFetching: false,
  error: false,
};

describe('api reducer', () => {
  it('should return the same state', () => {
    expect(usersListReducer(mockState, { users: [], type: 'not_an_action' })).toEqual(mockState);
  });

  it('should return the same state - using initialState', () => {
    expect(usersListReducer(initialState, { users: [], type: 'not_an_action2' })).toEqual(initialState);
  });

  it('should a state with isFetching in true', () => {
    expect(usersListReducer(initialState, { users: [], type: actionTypes.USERS_API_REQUEST })).toEqual({
      users: [],
      isFetching: true,
      error: false,
    });
  });

  it('should return a state with error in true', () => {
    expect(usersListReducer(initialState, { users: [], type: actionTypes.USERS_API_ERROR })).toEqual({
      users: [],
      isFetching: false,
      error: true,
    });
  });

  it('should return a state with mock users', () => {
    expect(usersListReducer(initialState, { users: ['Test'], type: actionTypes.USERS_REQUEST_SUCCESS })).toEqual({
      users: ['Test'],
      isFetching: false,
      error: false,
    });
  });

  it('should return a state with different users', () => {
    expect(usersListReducer(mockState, { users: ['new data'], type: actionTypes.USERS_REQUEST_SUCCESS })).toEqual({
      users: ['new data'],
      isFetching: false,
      error: false,
    });
  });
});
