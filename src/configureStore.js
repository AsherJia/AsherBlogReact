import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import createLogger from 'redux-logger';

const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger())
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
