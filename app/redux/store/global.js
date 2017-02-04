/**
 * Created by marszed on 2017/2/4.
 */
import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import redux from '../reducers/redux';
import { logger, crashReporter } from '../middleware/logger';


const reducers = {
    redux
};

let store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk,logger,crashReporter)
);

export default store;