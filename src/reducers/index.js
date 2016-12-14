import { combineReducers } from 'redux';
import home from './home'
import { routerStateReducer } from 'redux-router'

const rootReducer = combineReducers({
    home,
    router: routerStateReducer
})

export default rootReducer
