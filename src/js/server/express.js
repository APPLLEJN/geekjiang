import React from 'react'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import qs from 'query-string';
import serialize from 'serialize-javascript';
import { createMemoryHistory } from 'history';
import open from 'open'

import config from '../../../webpack.config'
import reducer from '../client/reducers';
import routes from '../routes';
import {ReduxRouter} from 'redux-router';
import {reduxReactRouter, match} from 'redux-router/server'; // 'redux-router/server';

var app = express()
var port = 3000
var webpackPort = 8081
//var compiler = webpack(config)

// var db = require('monk')('localhost:27017/geekjiang')
// var images = db.get('images');
// images.find({}, function(err, docs) {
//    console.log(docs)
// })
app.use(express.static(path.resolve('src')))
const getMarkup = (store) => {
  const initialState = serialize(store.getState());
  const markup = renderToString(
    <Provider store={store} key="provider">
      <ReduxRouter/>
    </Provider>
  );
	
  return `<!doctype html>
    <html>
      <head>
        <title>Redux React Router – Server rendering Example</title>
        <link rel="stylesheet" type="text/css" href="http://localhost:8051/style.css" />
        <link rel="stylesheet" type="text/css" href="http://localhost:3000/css/slick.css" />
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>window.__initialState = ${initialState};</script>
        <script src="http://localhost:8051/bundle.js"></script>
      </body>
    </html>
  `;
};

// app.use(webpackDevMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// app.use(webpackHotMiddleware(compiler));

app.use((req, res) => {
  // TO DO 
  // console.log(createStore, createMemoryHistory)
  const store = reduxReactRouter({ routes, createHistory: createMemoryHistory })(createStore)(reducer);
  const query = qs.stringify(req.query);
  const url = req.path + (query.length ? '?' + query : '');

  store.dispatch(match(url, (error, redirectLocation, routerState) => {
    if (error) {
      console.error('Router error:', error);
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!routerState) {
      res.status(400).send('Not Found');
    } else {
      res.status(200).send(getMarkup(store));
    }
  }));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    open("http://localhost:"+port);
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})



