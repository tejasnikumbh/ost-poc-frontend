import React from 'react';
import {VIEW_PROFILE} from './../actions/index';


export default function(state = {data: {}, isAuthenticated: false}, action) {
  if(action.error) {
    return state;
  }

  switch(action.type) {
    case VIEW_PROFILE:
      var newState = {};
      newState.data = action.payload.data;
      newState.isAuthenticated = true;
      return newState;
    default:
      return state;
  }
}
