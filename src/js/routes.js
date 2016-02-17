import React from 'react'
import { Route } from 'react-router'
import App from './client/containers/App'
import UserPage from './client/containers/UserPage'
import RepoPage from './client/containers/RepoPage'

export default (
  <Route path="/" component={App}>
    <Route path="/:login/:name"
           component={RepoPage} />
    <Route path="/:login"
           component={UserPage} />
  </Route>
)