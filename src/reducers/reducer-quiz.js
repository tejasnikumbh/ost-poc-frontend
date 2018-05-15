import React from 'react';
import {FETCH_QUIZ} from './../actions/index';

export default function(state = {data: {}, error: false}, action) {
  // In case of failed authentication
  if(action.error) {
    var newState = {};
    newState.data = action.payload;
    newState.error = true;
    return newState;
  }

  // In case of successful authentication
  switch(action.type) {
    case FETCH_QUIZ:
      console.log(action.payload.data);
      var newState = {};
      newState.data = action.payload.data;
      newState.error = false;
      return newState;
    default:
      return state;
  }
}
