/**
 * Created by jiangnan on 15/11/14.
 */
var webpack = require('webpack');
var http = require('http');
var webpackConfig = require('../../../webpack.config.js');
webpackConfig.entry.unshift("webpack-hot-middleware/client?http://localhost:8080");
var compiler = webpack(webpackConfig);
var express = require('express');
var app = express();

const server = http.createServer(app)

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

server.listen(8080, err => {
    if(err) console.log(`error ${err}`)
    console.log('server at localhost:8080')
})