/**
 * Created by zhuo on 2017/1/24.
 */
import React from 'react';
import ajax from '../http/ajax';
import '../../static/scss/handle/handle'

let handleBox = React.createClass({
    getDefaultProps : function () {
        return {
            title : 'Hello World'
        };
    },
    // 验证组件实例的属性是否符合要求
    propTypes: {
        title: React.PropTypes.string.isRequired,
    },
    // 定义初始状态
    getInitialState: function() {
        return {
            liked: false,
            active: false,
            value: '你好!',
            data: '这是初始数据....'
        };
    },
    handleClick: function(event) {
        this.setState({
            liked: !this.state.liked
        });
    },
    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },
    handleColor: function(event){
        this.setState({
            active: !this.state.active
        });
    },
    handleGetData: function(){
        ajax.get('http://123.57.152.75:8051/ifsys/getAllSysInfo.do',{
            data: {
                type: 'all'
            }
        }).then(function (response) {
            console.log(response);
            if(response.status == 200 && response.data.rspCd == '00000'){
                this.setState({
                    data: JSON.stringify(response.data)
                });
            }
        }.bind(this)).catch(function (error) {
            this.setState({
                data: '服务器异常，数据获取失败'
            });
            console.log(error);
        }.bind(this));
    },
    /**
     * 组件生命走起的三种状态
     * Mounting：已插入真实 DOM
     * Updating：正在被重新渲染
     * Unmounting：已移出真实 DOM
     * @returns {XML}
     */
    /**
     * 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数
     * componentWillMount()
     * componentDidMount()
     * componentWillUpdate(object nextProps, object nextState)
     * componentDidUpdate(object prevProps, object prevState)
     * componentWillUnmount()
     */
    componentWillMount:function(){
        console.log('已插入真实 DOM-状态之前');
    },
    componentDidMount:function(){
        console.log('已插入真实 DOM-状态之后');
    },
    componentWillUpdate:function(nextProps,nextState){
        console.log('正在被重新渲染 DOM-状态之前',nextProps,nextState);
    },
    componentDidUpdate:function(nextProps,nextState){
        console.log('正在被重新渲染 DOM-状态之后',nextProps,nextState);
    },
    componentWillUnmount:function(){
        console.log('已移出真实 DOM-状态之前');
    },
    render: function() {
        let text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <div className="handle-box">
                <h5>click事件测试</h5>
                <p onClick={this.handleClick}
                   style={{cursor: 'pointer'}}>
                    You {text} this. Click to toggle1.
                    <span>{this.props.title}</span>
                </p>
                <h5>input事件测试</h5>
                <p>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <span>{this.state.value}</span>
                </p>
                <h5>组件生命周期测试</h5>
                <p><button className={this.state.active ? 'active' : 'default'} onClick={this.handleColor}>点击换个字体色，重新渲染</button></p>
                <h5>ajax测试</h5>
                <div>
                    <button onClick={this.handleGetData}>点我获取{this.props.name}</button>
                    <p>{this.state.data}</p>
                </div>
            </div>
        );
    }
});

export default handleBox;