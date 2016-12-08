import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import IndexPage from './containers/home/home.jsx'

export default (
    <Route path="/" component={ IndexPage }>
    </Route>
)
