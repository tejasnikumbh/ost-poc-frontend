import React from 'react';
import {SUBMIT_QUIZ} from './../actions/index';

export default function(state = {data: {}, error: false}, action) {
  // In case of failed submission
  if(action.error) {
    var newState = {};
    newState.data = action.payload;
    newState.error = true;
    return newState;
  }

  // In case of successful submission
  switch(action.type) {
    case SUBMIT_QUIZ:
      var newState = {};
      newState.data = action.payload.data;
      newState.error = false;
      return newState;
    default:
      return state;
  }
}
