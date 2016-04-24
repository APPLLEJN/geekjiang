import React from 'react'
import webpack from 'webpack'
import Express from 'express'
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

import config from '../../../webpack/webpack.config'
import reducer from '../client/reducers';
import routes from '../routes';
import {ReduxRouter} from 'redux-router';
import {reduxReactRouter, match} from 'redux-router/server'; // 'redux-router/server';
import request from 'superagent'
var app = Express()
var port = 3000
var webpackPort = 3001

// connect db
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/geekjiang');
//var compiler = webpack(config)

// var db = require('monk')('localhost:27017/geekjiang')
// var images = db.get('images');
// images.find({}, function(err, docs) {
//    console.log(docs)
// })
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件

var express = require('express');
var app = express();
app.get('/login', function(req, res) {
  // TO DO
  request
  .get('http://localhost:3050')
  .end(function(err, res){
    console.log(`this is err ${err}`)
  })
})
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <title>geekjiang</title>
        <link rel="stylesheet" type="text/css" href="http://localhost:3001/style.css" />
        <link rel="stylesheet" type="text/css" href="http://localhost:3000/css/slick.css" />
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>window.__initialState = ${initialState};</script>
        <script src="http://localhost:3001/bundle.js"></script>
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
  if (true) { //__DEVELOPMENT__
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
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
