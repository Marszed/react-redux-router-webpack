/**
 * react及其插件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute, onLeave } from 'react-router';
import store from './redux/store/global';

/**
 * 引入全局公用样式
 */
import '../static/css/DanUI.css'
import '../static/css/ipxfont.css'
import '../static/css/ipx_develp_main.css'

/**
 * 国际化
 */
import { addLocaleData,IntlProvider } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
addLocaleData([...en,...zh]);
// 加载全局国际化语言包
import globalZHCN from './lang/zhCN/global'
import globalEnUS from './lang/enUS/global'
let globalDefaultLang = (Tool.langPackageInject() === 'zhCN') ? globalZHCN : globalEnUS;

/**
 * 自定义组件
 */
import App from './components/app.jsx';
import Login from './components/login/login.jsx';

/**
 * 自定义工具方法库
 */
import Tool from './lib/tool';

// 登录验证
const loginAuth = (nextState, replace) => {
    if (!store.getState()['login']['loginInfo'] || store.getState()['login']['loginInfo']['password'] != '123456') {
        // Redirect to Home page if not an Admin
        replace({ pathname: '/' })
    }
};


/**
 * 路由配置
 * 通过getComponent做路由懒加载
 */
let routes = <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="home"
           onEnter={loginAuth}
           getComponent = {(nextState,callback)=>{
                require.ensure([],(require)=>{
                    callback(null,require("./components/home").default)
                },"home")
            }}/>
    <Route path="handle"
           onEnter={loginAuth}
           getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/handle").default)
            },"handle")
        }}/>
    <Route path="handle"
           onEnter={loginAuth}
           getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/handle").default)
            },"handle")
        }}/>
    <Route path="redux"
           onEnter={loginAuth}
           getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/redux").default)
            },"redux")
        }}/>
    <Route path="lang"
           onEnter={loginAuth}
           getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/lang").default)
            },"lang")
        }}/>
    <Route path="test"
           onEnter={loginAuth}
           getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/test").default)
            },"test")
        }}/>
    <Route path="validation"
           onEnter={loginAuth}
           getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/validation").default)
            },"validation")
        }}/>
</Route>;

// 路由，数据池,国际化注入
ReactDOM.render(
    <IntlProvider locale={window.navigator.language} messages={globalDefaultLang}>
        <Provider store={store}>
            <Router history={hashHistory} routes={routes} />
        </Provider>
    </IntlProvider>, document.getElementById('app'));
