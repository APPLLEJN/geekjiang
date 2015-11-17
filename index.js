/**
 * Created by jiangnan on 15/11/14.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true
}).listen(3000, '127.0.0.1', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});