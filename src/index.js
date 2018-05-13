import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PostsIndex from './containers/posts-index';
import PostsNew from './containers/posts-new';
import PostsDetail from './containers/posts-detail';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/posts/new" component={PostsNew}/>
        <Route path="/posts/:id" component={PostsDetail}/>
        <Route path="/" component={PostsIndex}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
