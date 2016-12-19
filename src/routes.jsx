import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';
import store from './configureStore.js';

import HomePage from './modules/homePage/container/homePage.jsx';
import AplayerPage from './modules/musicPlayer/container/aplayerPage.jsx'
import DplayerPage from './modules/videoPlayer/container/videoPage.jsx'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

export default (
    <Router history={history}>
        <Route path="/" component={ HomePage }>
            <Route path="aplayer" component={ AplayerPage }/>
            <Route path="dplayer" component={ DplayerPage }/>
            <Route path="*" component={ HomePage }/>
        </Route>
    </Router>
)
