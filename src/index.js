import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configureStore';

import routes from './routes.jsx';

render(
    <Provider store={ store }>
        { routes }
    </Provider>,
    document.getElementById('root')
)

// https://github.com/AsherJia/react-redux-starter-kit/tree/master/src/routes
// https://medium.com/@awesomejerry/react-redux-router-in-universal-app-a1db480dab61#.t7fhuy5oh
// https://github.com/bailicangdu
// http://rekit.js.org/
// http://feathersjs.com/
