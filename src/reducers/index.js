import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import UserReducer from './reducer-user';
import ProfileReducer from './reducer-profile';
import QuizReducer from './reducer-quiz';

const rootReducer = combineReducers({
  user: UserReducer,
  profile: ProfileReducer,
  quiz: QuizReducer,
  form: FormReducer
});

export default rootReducer;
