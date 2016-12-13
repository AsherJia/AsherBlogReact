import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import home from './home'

const rootReducer = combineReducers({
    home,
    router: routerStateReducer
})

export default rootReducer
