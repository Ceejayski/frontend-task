/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import userServices from '../../services/user.services';
import {
  ADD_USER, DELETE_USER, EDIT_USER_DETAILS, ERROR_FETCHING, GET_USER_DETAILS,
} from '../types';

export const getUserDetails = () => (dispatch) => userServices.getUserData().then((res) => {
  const result = res.data.map(({
    id, name, username, email, address: { city },
  }) => ({
    id, name, username, email, city,
  }));
  dispatch({
    type: GET_USER_DETAILS,
    payload: result,
  });
}, (error) => {
  const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
  dispatch({
    type: ERROR_FETCHING,
    payload: message,
  });
});

export const addNewUser = (user) => (dispatch) => new Promise((res, rej) => {
  const main = { ...user, username: 'NAN', city: 'NAN' };
  dispatch({
    type: ADD_USER,
    payload: main,
  });
});

export const deleteUser = (user) => (dispatch) => new Promise((res, rej) => {
  dispatch({
    type: DELETE_USER,
    payload: user,
  });
});

export const editCurrentUser = (user) => (dispatch) => new Promise((res, rej) => {
  dispatch({
    type: EDIT_USER_DETAILS,
    payload: user,
  });
});
