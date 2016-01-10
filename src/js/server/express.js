var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../../../webpack.config')
var open = require("open")
var app = new (require('express'))()
var port = 3000
import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import {ReduxRouter} from '../../src'; // 'redux-router'
import { Provider } from 'react-redux';
import App from '../client/containers/App'
import configureStore from '../client/store/configureStore'
import { renderToString } from 'react-dom/server'

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

var db = require('monk')('localhost:27017/geekjiang')
var images = db.get('images');
images.find({}, function(err, docs) {
   console.log(docs)
})

// 每当收到请求时都会触发
app.use(handleRender);
app.get(handleRender);

function handleRender(req, res) {
	const store = configureStore()

	// 把组件渲染成字符串
	  const html = renderToString(
	    <Provider store={store}>
	      <App />
	    </Provider>
	  )

	 // 从 store 中获得初始state
	  const initialState = store.getState();

	  // 把渲染后的页面内容发送给客户端
	  res.send(renderFullPage(html, initialState));
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

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
      </head>
      <body>
        <div id="${MOUNT_ID}">${markup}</div>
        <script>window.__initialState = ${initialState};</script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
};

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    open("http://localhost:"+port);
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})



