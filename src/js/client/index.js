import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose } from 'redux'

import {
  ReduxRouter,
  reduxReactRouter,
} from 'redux-router'

import { Provider } from 'react-redux'
import createHistory from 'history/lib/createBrowserHistory'

import routes from '../routes'
import reducer from './reducers';
import App from './containers/App'
import DevTools from './containers/DevTools'

const store = compose(reduxReactRouter({ createHistory }))(createStore)(reducer, window.__initialState);

const rootComponent = (
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>
);

const mountNode = document.getElementById('root');

// First render to match markup from server
ReactDOM.render(rootComponent, mountNode);
// Optional second render with dev-tools
ReactDOM.render((
  <div>
    {rootComponent}
    <DevTools />
  </div>
), mountNode);