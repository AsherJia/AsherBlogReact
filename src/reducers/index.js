import { combineReducers } from 'redux';
import home from './home';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    home,
    routing: routerReducer
})

export default rootReducer
