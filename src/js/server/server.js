// to support es6 in node
require('babel-register')
// to support await/async
require("babel-polyfill")

require.extensions['.css'] = () => {
  return;
};

require('./main')
