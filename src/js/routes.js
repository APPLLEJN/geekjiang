import React from 'react';
import {Route} from 'react-router';
import {Counter, Containers} from './client/components';

export default (
  <Route path="/" component={Containers}>
    <Route path="Counter" component={Counter}/>
  </Route>
);