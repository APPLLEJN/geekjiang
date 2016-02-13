import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose } from 'redux'

import { ReduxRouter, reduxReactRouter } from 'redux-router'

import { Provider } from 'react-redux'
import createHistory from 'history/lib/createBrowserHistory'

import routes from '../routes'
import reducer from './reducers';
import configureStore from './store/configureStore';

import App from './containers/App'
import DevTools from './containers/DevTools'

import style from '../../css/common.css'

const store = configureStore(window.__initialState || {});

const rootComponent = (
  <Provider store={store}>
  	<div>
	    <ReduxRouter routes={routes} />
	    <DevTools/>
    </div>
  </Provider>
);

const mountNode = document.getElementById('root');

// First render to match markup from server
ReactDOM.render(rootComponent, mountNode);
// Optional second render with dev-tools
ReactDOM.render((
  <div>
    {rootComponent}
  </div>
), mountNode);