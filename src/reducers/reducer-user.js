import React from 'react';
import {SIGN_UP, LOGIN} from './../actions/index';

export default function(
  state = { data: {}, action: null, error: false }, action) {
  // Setting action type for the user data
  var newState = {};
  newState.data = {};
  newState.action = action.type;
  // Error check for any action type related to user
  if(action.error) {
    newState.error = action.error;
    return newState;
  }
  // Setting user data in case of no errors
  var token = null;
  switch (action.type) {
    case SIGN_UP:
    case LOGIN:
      token = action.payload.headers['x-auth'];
      sessionStorage.setItem('x-auth', token);
      newState.data = action.payload.data;
      return newState;
    default:
      return state;
  }
}
