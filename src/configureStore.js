import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux'

const middleware = routerMiddleware(browserHistory)

const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger()),
    applyMiddleware(middleware)
)(createStore)

function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState)
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}

export default configureStore()
