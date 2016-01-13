import express from 'express'
import webpack from 'webpack'
import React from 'react'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config'
import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import { renderToString } from 'react-dom/server'
import qs from 'query-string';
import serialize from 'serialize-javascript';
import { createMemoryHistory } from 'history';
import open from 'open'

import reducer from './reducer';
import routes from './routes';

var app = new (require('express'))()
var port = 3000
var compiler = webpack(config)

// 每当收到请求时都会触发
// app.use(handleRender);
//var db = require('monk')('localhost/mydb')

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
        <div id="root">${markup}</div>
        <script>window.__initialState = ${initialState};</script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
};

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use((req, res) => {
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

// function handleRender(req, res) {
// 	const store = configureStore()

// 	// 把组件渲染成字符串
// 	  const html = renderToString(
// 	    <Provider store={store}>
// 	      <App />
// 	    </Provider>
// 	  )

// 	 // 从 store 中获得初始 state
// 	  const initialState = store.getState();

// 	  // 把渲染后的页面内容发送给客户端
// 	  res.send(renderFullPage(html, initialState));
// }

// function renderFullPage(html, initialState) {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <title>Redux Universal Example</title>
//       </head>
//       <body>
//         <div id="root">${html}</div>
//         <script>
//           window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
//         </script>
//         <script src="/static/bundle.js"></script>
//       </body>
//     </html>
//     `
// }

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    open('http://localhost:' + port)
  }
})

