import { combineReducers } from 'redux';
import { reducer as QuizReducer } from 'redux-form';

import UserReducer from './reducer-user';

const rootReducer = combineReducers({
  user: UserReducer,
  form: QuizReducer
});

export default rootReducer;
