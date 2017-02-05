/**
 * Created by zhuo on 2017/1/24.
 */
import React from 'react';
import { Link } from 'react-router';
import '../../static/css/home/nav';


export default class home extends React.Component {
    render() {
        return <div>
            <h3>主页-菜单栏</h3>
            <ul className="homepage-nav">
                <li><Link to="/handle" activeClassName="active-nav">react运用</Link></li>
                <li><Link to="/lang" activeClassName="active-nav">国际化</Link></li>
                <li><Link to="/redux" activeClassName="active-nav">redux运用</Link></li>
                <li><Link to="/test" activeClassName="active-nav">router运用</Link></li>
                <li><Link to="/validation" activeClassName="active-nav">validation运用</Link></li>
            </ul>
        </div>;
    }
}