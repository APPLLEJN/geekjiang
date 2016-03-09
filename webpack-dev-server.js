var path = require('path')
var webpack = require('webpack')
var Express = require('express')

var tenYears = 1000 * 60 * 60 * 24 * 365 * 10
var HOST = process.env.HOST || 'localhost'
var WEBPACK_PORT = process.env.PORT ? (parseInt(process.env.PORT, 10) + 1) : 8051
var webpackConfig = require('./webpack.config')
var compiler = webpack(webpackConfig)

var serverOptions = {
  contentBase: 'http://' + HOST + ':' + WEBPACK_PORT,
  quiet: false,
  // noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'max-age=' + tenYears,
    Expires: new Date(Date.now() + tenYears),
  },
  stats: {colors: true}
};

var app = new Express()

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(WEBPACK_PORT, function onAppListening(err) {
  if (err) {
    console.error(err)
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', WEBPACK_PORT)
  }
})



// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
// var reduxSrc = path.join(__dirname, '..', '..', 'src')
// var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules')
// var fs = require('fs')
// if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
//   // Resolve Redux to source
//   module.exports.resolve = { alias: { 'redux': reduxSrc } }
//   // Compile Redux from source
//   module.exports.module.loaders.push({
//     test: /\.js$/,
//     loaders: [ 'babel' ],
//     include: reduxSrc
//   })
// }

// export default config;
