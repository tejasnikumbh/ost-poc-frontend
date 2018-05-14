import { combineReducers } from 'redux';
import { reducer as QuizReducer } from 'redux-form';

import UserReducer from './reducer-user';
import ProfileReducer from './reducer-profile';

const rootReducer = combineReducers({
  user: UserReducer,
  profile: ProfileReducer,
  form: QuizReducer
});

export default rootReducer;
