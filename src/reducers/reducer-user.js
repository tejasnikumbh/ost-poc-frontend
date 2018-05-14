import React from 'react';
import {SIGN_UP, LOGIN} from './../actions/index';

export default function(state = {}, action) {
  var token = null;
  switch (action.type) {
    case SIGN_UP:
      token = action.payload.headers['x-auth'];
      sessionStorage.setItem('x-auth', token);
      return action.payload.data;
    case LOGIN:
      console.log(action.payload);
      token = action.payload.headers['x-auth'];
      sessionStorage.setItem('x-auth', token);
      return action.payload.data;
    default:
      return state;
  }
}
