import React from 'react'
import { Route } from 'react-router'
import App from './client/containers/App'
import UserPage from './client/containers/UserPage'
import RepoPage from './client/containers/RepoPage'
import Containers from './client/containers/Containers'

export default (
  <Route path="/"  component={App}>
  	<Route path="/Containers" component={Containers}/>
  </Route>
)