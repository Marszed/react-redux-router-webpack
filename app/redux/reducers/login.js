import { combineReducers } from 'redux';
import { createReducer } from '../creater'
import { LOGIN_INFO } from '../actions/global'

export default combineReducers({
    loginInfo: createReducer('', {
        [LOGIN_INFO](state, {value}){return value}
    })
})