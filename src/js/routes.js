import React from 'react';
import {Route} from 'react-router';
import {Counter} from './components';

export default (
  <Route path="/" component={Counter}>
    <Route path="Counter" component={Counter}/>
  </Route>
);