/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import Tool from '../lib/tool';
import { FormattedDate,FormattedPlural, FormattedMessage, FormattedHTMLMessage, IntlProvider } from 'react-intl';
// 加载主页国际化语言包
import zhCN from '../lang/zhCN/lang';
import enUS from '../lang/enUS/lang';
let defaultLang = (Tool.langPackageInject() === 'zhCN') ? zhCN : enUS;


export default React.createClass({
    // 定义初始状态
    getInitialState: function() {
        return {
            data: '许卓'
        };
    },
    handleClick: function(event) {
        this.setState({
            data: this.state.data === '许卓' ? '彭䶮' : '许卓'
        });
    },
    render: function() {
        return <div>
            <h5>日期时间</h5>
            <p>
                <FormattedDate
                    value={new Date(1486098415898)}
                />
                <i>----</i>
                <FormattedDate
                    value={Date.now()}
                />
            </p>
            <h5>数字量词</h5>
            <p>
                <i>one green </i>
                <FormattedPlural
                    value={1}
                    one='apple'
                    other='apples'/>
                <i>----</i>
                <i>two red </i>
                <FormattedPlural
                    value={2}
                    one='apple'
                    other='apples'/>
            </p>
            <h5>字符串格式化</h5>
            <p>
                <FormattedMessage
                    id='say'
                    description='say hello to 132'
                    defaultMessage='Hello, 123!'
                />
            </p>
            <h5>动态参数字符串格式化</h5>
            <p onClick={this.handleClick} style={{cursor: 'pointer'}}>
                <FormattedMessage
                    id='text'
                    description='say hello to Howard'
                    defaultMessage='Hello, { data }!'
                    values={{'data': this.state.data}}
                />
                <i>点击我试试!!!</i>
            </p>
            <h5>国际化语言包拆分</h5>
            <IntlProvider locale={navigator.language} messages={defaultLang}>
                <FormattedHTMLMessage
                    id='word'
                    description='一 二 三 !!!!'
                    defaultMessage='one two three !!!'
                />
            </IntlProvider>
        </div>;
    }
});