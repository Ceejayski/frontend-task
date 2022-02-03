import {
  ADD_USER, DELETE_USER, EDIT_USER_DETAILS, ERROR_FETCHING, GET_USER_DETAILS,
} from '../types';
import { addUser, editUser, removeUser } from '../utils/user.utils';

const INITIAL_STATE = {
  users: [],
  loading: true,
  error: '',
};

export default function userReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        loading: false,
        users: [...state.users, ...payload],
      };
    case ERROR_FETCHING:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: addUser({ current: state.users, user: payload }),
        pending: false,
      };
    case EDIT_USER_DETAILS:
      return {
        ...state,
        users: editUser({ current: state.users, main: payload }),
        pending: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: removeUser({ current: state.users, delUser: payload }),
        pending: false,
      };
    default:
      return state;
  }
}
