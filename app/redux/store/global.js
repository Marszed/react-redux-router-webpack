/**
 * Created by marszed on 2017/2/4.
 */
import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import login from '../reducers/login';
import redux from '../reducers/redux';
import { logger, crashReporter } from '../middleware/logger';


const reducers = {
    redux,
    login
};

let store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk,logger,crashReporter)
);

export default store;