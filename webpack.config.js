/**
 * Created by jiangnan on 15/11/15.
 */
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3000', // WebpackDevServer host and port
        'webpack/hot/dev-server',
        './app/entry.js' // Your appʼs entry point
    ],
    output: {
        path: __dirname + '/app',
        publicPath: "/app",
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
            loader: 'react-hot!jsx-loader?harmony'
        },{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    }
};