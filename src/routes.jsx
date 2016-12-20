import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';
import store from './configureStore.js';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const HomePage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./modules/homePage/container/homePage.jsx'))
  })
}

const AplayerPage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./modules/musicPlayer/container/aplayerPage.jsx'))
  })
}

const DplayerPage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./modules/videoPlayer/container/videoPage.jsx'))
  })
}

export default (
    <Router history={history}>
        <Route path="/" getComponent={ HomePage }>
            <Route path="aplayer" getComponent={ AplayerPage }/>
            <Route path="dplayer" getComponent={ DplayerPage }/>
            <Route path="*" getComponent={ HomePage }/>
        </Route>
    </Router>
)
