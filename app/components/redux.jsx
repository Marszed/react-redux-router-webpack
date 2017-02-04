/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import ajax from '../http/ajax';
import { connect } from 'react-redux';
import {inputUsername, inputPassword, asyncData, asyncActionData} from '../redux/actions/redux'

// 将state.data绑定到相应的React组件的Props的data
// 此处的state[redux] 对应的是 store中reducers一个reducer生成的元数据
function mapStateToProps(state) {
    return {
        username: state.redux.username,
        password: state.redux.password,
        asyncData: state.redux.asyncData,
        asyncActionData: state.redux.asyncActionData
    };
}

function asyncCall(url,data,fun,obj){

}

let redux = React.createClass({
    handleClickAsync: function(event){
        ajax.post('http://123.57.152.75:8051/ifsys/getAllSysInfo.do',{
            data: {
                type: 'all',
                userName: this.refs.userName.value, // 通过ref获取用户输入的用户名
                passWord: this.props.password // 通过store获取用户输入的密码
            }
        }).then(function (response) {
            console.log(response);
            if(response.status == 200 && response.data.rspCd == '00000'){
                this.props.dispatch(asyncData(response.data)); // 派发action
            }
        }.bind(this)).catch(function (error) {
            this.setState({
                data: '服务器异常，数据获取失败'
            });
            console.log(error);
        }.bind(this));
    },
    handleClickAsyncAction: function(event){
        this.props.dispatch(asyncActionData({
            type: 'all',
            userName: this.refs.userName.value, // 通过ref获取用户输入的用户名
            passWord: this.props.password // 通过store获取用户输入的密码
        }))
    },
    inputUsernameHandler(event){
        this.props.dispatch(inputUsername(event.target.value))
    },
    inputPasswordHandler(event){
        this.props.dispatch(inputPassword(event.target.value))
    },
    render: function() {
        return <div>
            <div>
                <div>早上好，{this.props.username},你的密码是:{this.props.password}</div>
                <div>用户名：<input type="text" onChange={this.inputUsernameHandler} ref="userName"/></div>
                <div>密　码：<input type="password" onChange={this.inputPasswordHandler}/></div>
                <button onClick={this.handleClickAsync}>组件内异步获取数据存store</button>
                <button onClick={this.handleClickAsyncAction}>异步action获取数据存store</button>
                <div>
                    <h5 style={{color: 'red'}}>组件内异步获取数据存store展示</h5>
                    <div>{
                        !this.props.asyncData.sysList ? '暂无数据' :
                            this.props.asyncData.sysList.map(function(data,index){
                                return <p key={data.id}>系统名称：{data.sysName},序号:{index}</p>;
                            })
                    }</div>
                </div>
                <div>
                    <h5 style={{color: 'green'}}>异步action获取数据存store展示</h5>
                    <div>{
                        !this.props.asyncActionData.sysList ? '暂无数据' :
                            this.props.asyncActionData.sysList.map(function(data,index){
                                return <p key={data.id}>系统名称：{data.sysName},序号:{index}</p>;
                            })
                    }</div>
                </div>
            </div>
        </div>;
    }
});

// 通过react-redux提供的connect方法
// 将我们需要的state中的数据和actions中的方法绑定到相应的React组件的Props上
export default connect(mapStateToProps)(redux);