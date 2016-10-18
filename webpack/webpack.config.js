var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HOST = process.env.HOST || 'localhost'
var WEBPACK_PORT = process.env.PORT ? (parseInt(process.env.PORT, 10) + 1) : 3001
var ASSERTPATH = path.join(__dirname, '/')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))

var webpackConfig = {
  devtool: 'eval',
  entry: {
    'index': ['./src/js/client/index.js',
              'webpack/hot/dev-server',
              'webpack-hot-middleware/client?path=http://' + HOST + ':' + WEBPACK_PORT + '/__webpack_hmr'
            ]
  },
  output: {
    path: ASSERTPATH,
    publicPath: 'http://' + HOST + ':' + WEBPACK_PORT + '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
    new ExtractTextPlugin('style.css', {allChunks: true }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpack_isomorphic_tools_plugin.development(),
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
