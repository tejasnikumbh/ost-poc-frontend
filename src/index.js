import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './components/login';
import Profile from './components/profile';
import QuizInstruction from './components/quiz-instruction';
import QuizContent from './components/quiz-content';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/quiz/instruction" component={QuizInstruction}/>
        <Route path="/quiz/:id/" component={QuizContent}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
