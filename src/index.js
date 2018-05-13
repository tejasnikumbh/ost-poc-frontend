import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class HelloComponent extends Component {
  render() {
    return(<div className="container"> Hello, API Active! </div>);
  }
}

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HelloComponent}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
