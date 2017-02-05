/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import { Form } from 'formsy-react';
import MyInput from '../validations/Input';
import { connect } from 'react-redux';
import { loginInfo } from '../../redux/actions/global'


// 将state.data绑定到相应的React组件的Props的data
// 此处的state[redux] 对应的是 store中reducers一个reducer生成的元数据
function mapStateToProps(state) {
    // 拷贝源对象自身的并且可枚举的属性到目标对象身上
    return Object.assign({}, state.redux)
}

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false
        };
        this.submit = this.submit.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }
    routerWillLeave(nextLocation) {
        console.log('-------')
        console.log(loginInfo)
        if (!this.props.loginInfo){
            alert('please login!');
        }
    }
    submit(data) {
        this.props.dispatch(loginInfo(data));
        this.props.router.push('home');
    }
    enableButton() {
        this.setState({ canSubmit: true });
    }
    disableButton() {
        this.setState({ canSubmit: false });
    }
    render() {
        return (
            <Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
                <MyInput value="" name="email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
                <MyInput value="" name="password" title="Password" type="password" required />
                <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                <p>登录密码:123456</p>
            </Form>
        );
    }
}

export default connect(mapStateToProps)(login);