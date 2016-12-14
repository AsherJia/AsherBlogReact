import React from 'react';
import { Route } from 'react-router';

import IndexPage from './containers/home/home.jsx'
import PostPage from './containers/home/post.jsx'

export default (
    <Route path="/">
        <Route path="user" component={ PostPage }>
            <Route path="tt" component={ IndexPage }></Route>
        </Route>
        <Route path="s1" component={ PostPage }></Route>
    </Route>
)
