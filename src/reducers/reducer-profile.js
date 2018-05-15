import React from 'react';
import {VIEW_PROFILE} from './../actions/index';

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
    case VIEW_PROFILE:
      var newState = {};
      newState.data = action.payload.data;
      newState.error = false;
      return newState;
    default:
      return state;
  }
}
