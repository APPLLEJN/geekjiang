var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var isomorphicWebpackCongig =
{
  assets:
  {
    images:
    {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg'],
      parser: Webpack_isomorphic_tools_plugin.url_loader_parser,
    },
  },
  debug: true,
}

module.exports = isomorphicWebpackCongig
