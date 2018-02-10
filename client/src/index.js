import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Security, Auth } from '@okta/okta-react';

import './index.css';
import config from './app.config';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers/index';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers, composeEnhancers(applyMiddleware(logger, thunk))
);
/* eslint-enable */

const auth = new Auth({
    history,
    issuer: config.issuer,
    client_id: config.client_id,
    redirect_uri: config.redirect_uri,
    onAuthRequired: ({history}) => history.push('/login')
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Security auth={auth}>
                <App />
            </Security>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();