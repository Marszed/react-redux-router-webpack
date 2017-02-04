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
    return function(...args) {
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
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

