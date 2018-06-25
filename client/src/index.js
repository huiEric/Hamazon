import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {sessionReducer, sessionService} from "redux-react-session";
import thunkMiddleware from "redux-thunk";
import { Provider } from 'react-redux';


// Add session reducer
const reducer = combineReducers({
    session: sessionReducer
});

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));

// Init the session service
sessionService.initSessionService(store);

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

// render(
//     <Provider store={store}>
//         <Routes/>
//     </Provider>, document.getElementById('root')
// );
