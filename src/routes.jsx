import React from 'react';
import { Route, IndexRedirect, IndexRoute, browserHistory  } from 'react-router';

import IndexPage from './containers/home/home.jsx'

export default (
    <Router history = { browserHistory }>
        <Route path="edit" component={ IndexPage }>
        </Route>
    </Router>
)
