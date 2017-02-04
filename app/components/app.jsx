/**
 * Created by zhuo on 2017/1/24.
 */
import React from 'react';

export default class App extends React.Component {
    render() {
        return <div>
            <p>react-demo</p>
            <div>{this.props.children}</div>
        </div>;
    }
}