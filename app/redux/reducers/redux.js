import { combineReducers } from 'redux';
import { createReducer } from '../creater'
import { INPUT_USERNAME, INPUT_PASSWORD, ASYNC_DATA, ASYNC_ACTION_DATA } from '../actions/global'

export default combineReducers({
    username: createReducer('', {
        [INPUT_USERNAME](state, {value}){return value}
    }),
    password: createReducer('', {
        [INPUT_PASSWORD](state, {value}){return value}
    }),
    asyncData: createReducer('',{
        [ASYNC_DATA](state, {value}){return value}
    }),
    asyncActionData: createReducer('',{
        [ASYNC_ACTION_DATA](state, {value}){return value}
    })
})