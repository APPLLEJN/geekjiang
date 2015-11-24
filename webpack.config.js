/**
 * Created by jiangnan on 15/11/15.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
         // WebpackDevServer host and port //form the server index.js
         'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './app/js/client/index.js' // Your appʼs entry point
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "http://localhost:8080/",
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    eslint: {
        configFile: '.eslintrc'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel!react-hot!jsx-loader?harmony'
        },{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel!babel-loader',
        }]
    }
};