/**
 * Created by marszed on 2017/2/4.
 */
import { createAction } from '../creater';
import ajax from '../../http/ajax';

export const INPUT_USERNAME = 'INPUT_USERNAME';
export const INPUT_PASSWORD = 'INPUT_PASSWORD';
export const ASYNC_DATA = 'ASYNC_DATA';
export const ASYNC_ACTION_DATA = 'ASYNC_ACTION_DATA';

export const inputUsername = createAction(INPUT_USERNAME, 'value');
export const inputPassword = createAction(INPUT_PASSWORD, 'value');
export const asyncData = createAction(ASYNC_DATA, 'value');

const asyncActionDataTemp = createAction(ASYNC_ACTION_DATA, 'value');
export const asyncActionData = function(obj){
    return dispatch => {
        ajax.post('http://123.57.152.75:8051/ifsys/getAllSysInfo.do',{
            data: {
                type: 'all',
                userName: obj.userName,
                passWord: obj.passWord
            }
        }).then(function (response) {
            if(response.status == 200 && response.data.rspCd == '00000'){
                dispatch(asyncActionDataTemp(response.data)); // 派发action
            }
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    }
};