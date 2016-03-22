var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HOST = process.env.HOST || 'localhost'
var WEBPACK_PORT = process.env.PORT ? (parseInt(process.env.PORT, 10) + 1) : 8051
var ASSERTPATH = path.join(__dirname, '/')

var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var webpack_isomorphic_tools_plugin =
  // webpack-isomorphic-tools settings reside in a separate .js file
  // (because they will be used in the web server code too).
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development()
var webpackConfig = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'index': ['./src/js/client/index.js','webpack/hot/dev-server','webpack-dev-server/client?http://' + HOST + ':' + WEBPACK_PORT + '/']
  },
  output: {
    path: ASSERTPATH,
    publicPath: 'http://' + HOST + ':' + WEBPACK_PORT + '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', {allChunks: true }),
    webpack_isomorphic_tools_plugin,
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: webpack_isomorphic_tools_plugin.regular_expression('images'),
        loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
      }
    ]
  }
}

module.exports = webpackConfig
