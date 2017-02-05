/**
 * Created by marszed on 2017/2/4.
 */

/**
 * action生成器
 * @param type
 * action的类型名称
 * @param argNames
 * 所有附带数据的属性名称
 * @returns {Function}
 */
export function createAction (type, ...argNames){
    console.log('--action传入的参数是---');
    console.log('type===>',type);
    // 将 'value' 转成 ['value']
    console.log('argNames===>',argNames);
    // 返回一个匿名构造函数
    // 当通过dispatch 一个 action去更新state时，此处的...args为最新状态的值
    return function(...args) {
        console.log('----------更新后的新状态的值------');
        console.log(args)
        console.log(argNames)
        let action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
     }
}
/**
 * reducer生成器
 * @param initialState
 * initialState是初始状态；
 * @param handlers
 * handlers是由一堆函数组成的对象
 * @returns {reducer}
 * 每个函数的名称对应着一个action的类型
 * 每个函数接受的参数与reducer一样，是action和当前状态，返回值会被当做新状态。默认情况就不用处理了
 */
export function createReducer (initialState, handlers) {
    console.log('--reducer传入的参数是---');
    console.log('initialState===>',initialState);
    console.log('handlers===>',handlers);
    // reducer 收到 Action 以后，必须返回一个state, 此处放回一个计算完state的纯函数
    return function reducer(state = initialState, action) {
        console.log('action类型==>',action);
        if (handlers.hasOwnProperty(action.type)) {
            // 返回与action匹配的state
            // handlers[action.type](state, action)
            // 此处的handler是一个 key: 为asyncData, value: 为一个函数方法 function(state,action)
            // 这个函数方法return 的为最新状态的state
            console.log('action为 {type: "ASYNC_DATA", value: 此处是用户异步获取之后传入的值}----------',handlers);
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

