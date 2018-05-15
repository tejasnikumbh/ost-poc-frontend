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
import Thankyou from './components/thankyou';
import Hello from './components/hello';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/thankyou" component={Thankyou}/>
        <Route path="/quiz/instruction" component={QuizInstruction}/>
        <Route path="/quiz/:id/" component={QuizContent}/>
        <Route path="/" component={Hello}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
