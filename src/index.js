import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import store from './configureStore';

import IndexPage from './containers/home/home.jsx'
import PostPage from './containers/home/post.jsx'

import { Router, Route, browserHistory } from 'react-router';

render(
    <Provider store={ store }>
       <Router history = { browserHistory }>
            <Route path="/" component={ IndexPage }></Route>
            <Route path="/user" component={ PostPage }></Route>
        </Router>
    </Provider>,
document.getElementById('root')
)

// https://github.com/AsherJia/react-redux-starter-kit/tree/master/src/routes
// https://medium.com/@awesomejerry/react-redux-router-in-universal-app-a1db480dab61#.t7fhuy5oh
// https://github.com/bailicangdu
// http://rekit.js.org/
// http://feathersjs.com/
