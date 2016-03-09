var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HOST = process.env.HOST || 'localhost'
var WEBPACK_PORT = process.env.PORT ? (parseInt(process.env.PORT, 10) + 1) : 8051
var webpackConfig = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/js/client/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: 'http://' + HOST + ':' + WEBPACK_PORT + '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', {allChunks: true }),
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
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' 
      } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  }
}

module.export = webpackConfig