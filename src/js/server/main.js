var Webpack_isomorphic_tools = require('webpack-isomorphic-tools')

// this must be equal to your Webpack configuration "context" parameter
var project_base_path = require('path').resolve(__dirname, '../../../')
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
// this global variable will be used later in express middleware
global.webpackIsomorphicTools = new Webpack_isomorphic_tools(require('../../../webpack/webpack-isomorphic-tools-configuration'))
// enter development mode if needed
// (you may also prefer to use a Webpack DefinePlugin variable)
.development(true)
// initializes a server-side instance of webpack-isomorphic-tools
// (the first parameter is the base path for your project
//  and is equal to the "context" parameter of you Webpack configuration)
// (if you prefer Promises over callbacks
//  you can omit the callback parameter
//  and then it will return a Promise instead)
.server(project_base_path, function()
{
  // webpack-isomorphic-tools is all set now.
  // here goes all your web application code:
  require('./express')
})
