webpackJsonp([1],{419:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=l(79),o=n(a),i=l(350);l(420);var u=o.default.createClass({displayName:"handleBox",getDefaultProps:function(){return{title:"Hello World"}},propTypes:{title:o.default.PropTypes.string.isRequired},getInitialState:function(){return{liked:!1,active:!1,value:"你好!",data:"这是初始数据...."}},handleClick:function(e){this.setState({liked:!this.state.liked})},handleChange:function(e){this.setState({value:e.target.value})},handleColor:function(e){this.setState({active:!this.state.active})},handleGetData:function(){var e=function(e){this.setState({data:JSON.stringify(e.data)})}.bind(this);(0,i.asyncCall)({url:"http://123.57.152.75:8051/ifsys/getAllSysInfo.do",method:"post",data:{type:"all"},log:"获取系统列表信息出错"},e)},componentWillMount:function(){console.log("已插入真实 DOM-状态之前")},componentDidMount:function(){console.log("已插入真实 DOM-状态之后")},componentWillUpdate:function(e,t){console.log("正在被重新渲染 DOM-状态之前",e,t)},componentDidUpdate:function(e,t){console.log("正在被重新渲染 DOM-状态之后",e,t)},componentWillUnmount:function(){console.log("已移出真实 DOM-状态之前")},render:function(){var e=this.state.liked?"like":"haven't liked";return o.default.createElement("div",{className:"handle-box"},o.default.createElement("h5",null,"click事件测试"),o.default.createElement("p",{onClick:this.handleClick,style:{cursor:"pointer"}},"You ",e," this. Click to toggle1.",o.default.createElement("span",null,this.props.title)),o.default.createElement("h5",null,"input事件测试"),o.default.createElement("p",null,o.default.createElement("input",{type:"text",value:this.state.value,onChange:this.handleChange}),o.default.createElement("span",null,this.state.value)),o.default.createElement("h5",null,"组件生命周期测试"),o.default.createElement("p",null,o.default.createElement("button",{className:this.state.active?"active":"default",onClick:this.handleColor},"点击换个字体色，重新渲染")),o.default.createElement("h5",null,"ajax测试"),o.default.createElement("div",null,o.default.createElement("button",{onClick:this.handleGetData},"点我获取",this.props.name),o.default.createElement("p",null,this.state.data)))}});t.default=u},420:function(e,t,l){var n=l(421);"string"==typeof n&&(n=[[e.id,n,""]]);var a=l(381)(n,{});n.locals&&(e.exports=n.locals),n.locals||e.hot.accept(421,function(){var t=l(421);"string"==typeof t&&(t=[[e.id,t,""]]),a(t)}),e.hot.dispose(function(){a()})},421:function(e,t,l){t=e.exports=l(380)(),t.push([e.id,".handle-box>h5{color:green;margin:10px 0}.handle-box .active,.handle-box .default{color:#666;background-color:#fff;border:0;font-size:16px;cursor:pointer}.handle-box .active{color:gold}",""])}});