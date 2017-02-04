/**
 * react及其插件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import store from './redux/store/global';

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
import Home from './components/home.jsx';

/**
 * 自定义工具方法库
 */
import Tool from './lib/tool';

/**
 * 路由配置
 * 通过getComponent做路由懒加载
 */
let routes = <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="handle" name="新数据" getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/handle").default)
            },"handle")
        }}/>
    <Route path="redux" getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/redux").default)
            },"redux")
        }}/>
    <Route path="lang" getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/lang").default)
            },"lang")
        }}/>
    <Route path="test" getComponent={
        (nextState,callback)=>{
            require.ensure([],(require)=>{
                callback(null,require("./components/test").default)
            },"child")
        }}/>
</Route>;

// 路由，数据池,国际化注入
ReactDOM.render(
    <IntlProvider locale={window.navigator.language} messages={globalDefaultLang}>
        <Provider store={store}>
            <Router history={hashHistory} routes={routes} />
        </Provider>
    </IntlProvider>, document.getElementById('app'));
