import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';
import store from './configureStore.js';

import IndexPage from './containers/home/home.jsx';
import PostPage from './containers/home/post.jsx';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

export default (
    <Router history={history}>
        <Route path="/" component={IndexPage}>
            <Route path="about" component={PostPage}/>
            <Route path="users" component={PostPage}>
                <Route path="/user/:userId" component={PostPage}/>
            </Route>
            <Route path="*" component={PostPage}/>
        </Route>
    </Router>
)
