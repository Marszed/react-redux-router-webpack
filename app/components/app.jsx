/**
 * Created by zhuo on 2017/1/24.
 */
import React from 'react';
import { Link, RouteContext } from 'react-router';

export default class App extends React.Component {
    mixins(){
        return [ RouteContext ]
    }
    render() {
        return <div>{this.props.children}</div>;
    }
}