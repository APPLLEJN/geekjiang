import React from 'react'

// html page markup
import Html from './html'

// will be used in express_application.use(...)
export function page_rendering_middleware(request, response)
{
  // clear require() cache if in development mode
  // (makes asset hot reloading work)
  if (_development_)
  {
    webpack_isomorphic_tools.refresh()
  }

  // for react-router example of determining current page by URL take a look at this:
  // https://github.com/halt-hammerzeit/webapp/blob/master/code/server/webpage%20rendering.js
  const page_component = [determine your page component here using request.path]

  // for a Redux Flux store implementation you can see the same example:
  // https://github.com/halt-hammerzeit/webapp/blob/master/code/server/webpage%20rendering.js
  const flux_store = [initialize and populate your flux store depending on the page being shown]

  // render the page to string and send it to the browser as text/html
  response.send('<!doctype html>\n' +
        React.renderToString(<Html assets={webpack_isomorphic_tools.assets()} component={page_component} store={flux_store}/>))
}
