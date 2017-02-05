/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import { connect } from 'react-redux';

// 将state.data绑定到相应的React组件的Props的data
// 此处的state[redux] 对应的是 store中reducers一个reducer生成的元数据
function mapStateToProps(state) {
    // 拷贝源对象自身的并且可枚举的属性到目标对象身上
    return Object.assign({}, state.redux)
}

class test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: 'test'};
    }
    render() {
        return <div>
            <h5>跨路由测试store中的数据--->{this.state.name}</h5>
            <div>{
                !this.props.asyncData.sysList ? '暂无数据' :
                    this.props.asyncData.sysList.map(function(data,index){
                        return <p key={data.id}>系统名称：{data.sysName},序号:{index}</p>;
                    })
            }</div>
        </div>;
    }
}

export default connect(mapStateToProps)(test);