/**
 * Created by zhuo on 2017/1/24.
 */
import React from 'react';
import { Link, Lifecycle } from 'react-router';
import { connect } from 'react-redux';
import '../../static/css/home/nav';

function mapStateToProps(state) {
    // 拷贝源对象自身的并且可枚举的属性到目标对象身上
    return Object.assign({}, state.login)
}

class home extends React.Component {
    constructor(props) {
        super(props);
    }
    mixins(){
        return [Lifecycle]
    }
    render() {
        return <div>
            <div className="ipx_dev_lf">
                <div className="ipx_dev_logo ipxblue_bg">
                    <Link to="/" activeClassName="active-nav" title="IPX-国际不动产交易"/>
                </div>
                <div className="ipx_dev_nav">
                    <Link to="/dashboard" className="ipx_dev_nav_box">
                        <li><i className="iconfont icon-dashboard"></i><span><b></b><cite>Dashboard</cite></span></li>
                    </Link>
                    <Link to="/projectList" className="ipx_dev_nav_box">
                        <li className="active"><i className="iconfont icon-projects"></i><span><b></b><cite>Project Listing</cite></span></li>
                    </Link>
                    <Link to="/createProject" className="ipx_dev_nav_box">
                        <li><i className="iconfont icon-add"></i><span><b></b><cite>Create New Project</cite></span></li>
                    </Link>
                    <Link to="/setting" className="ipx_dev_nav_box">
                        <li><i className="iconfont icon-setting"></i><span><b></b><cite>Setting</cite></span></li>
                    </Link>
                </div>
            </div>
            <div className="ipx_dev_cont">{this.props.children}</div>
        </div>;
    }
}

export default connect(mapStateToProps)(home);