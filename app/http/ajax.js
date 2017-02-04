/**
 * Created by zhuo on 2017/1/24.
 */
import axios from 'axios';
import env from '../config/env';

/**
 * ajax async call
 * @param obj   异步请求配置
 * @param obj.url   请求地址
 * @param obj.baseURL 请求地址基础路径可被绝对请求路径覆盖
 * @param obj.timeout 超时时间设置
 * @param obj.method 请求方式
 * @param obj.headers 请求头
 * @param obj.data 请求体
 * @param obj.params 请求参数
 * @param obj.auth 请求头
 * @param obj.log 自定义错误日志
 */
export function asyncCall(obj){
    console.log(obj)
    return axios.request({
        // `url` is the server URL that will be used for the request
        url: obj.url,

        // `method` is the request method to be used when making the request
        method: obj.method, // default

        // `baseURL` will be prepended to `url` unless `url` is absolute.
        // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
        // to methods of that instance.
        baseURL: obj.baseURL || env.config.origin,

        // Override timeout default for the library
        // Now all requests will wait 16 seconds before timing out
        timeout: obj.timeout || 16000,
        // `data` is the data to be sent as the request body
        // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
        // When no `transformRequest` is set, must be of one of the following types:
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - Browser only: FormData, File, Blob
        // - Node only: Stream
        data: obj.data ? obj.data : '',

        // `params` are the URL parameters to be sent with the request
        // Must be a plain object or a URLSearchParams object
        params: obj.params ? obj.params : '',

        // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
        // This will set an `Authorization` header, overwriting any existing
        // `Authorization` custom headers you have set using `headers`.
        auth: obj.auth ? obj.auth : '',
    }).then(function (response) {
        if(response.status == 200 && response.data.rspCd == '00000'){
            return response.data;
        }
        console.log(response);
        return 'err'
    }).catch(function (error) {
        console.log(error,obj.log);
        return 'err';
    });
}

/**
 * ajax synchronous call
 * @param obj   异步请求配置
 * @param obj.url   请求地址
 * @param obj.baseURL 请求地址基础路径可被绝对请求路径覆盖
 * @param obj.timeout 超时时间设置
 * @param obj.method 请求方式
 * @param obj.headers 请求头
 * @param obj.data 请求体
 * @param obj.params 请求参数
 * @param obj.auth 请求头
 * @param obj.log 自定义错误日志
 */
export function synchronous(obj){
    axios.request({
        // `url` is the server URL that will be used for the request
        url: obj.url,

        // `method` is the request method to be used when making the request
        method: obj.method, // default

        // `baseURL` will be prepended to `url` unless `url` is absolute.
        // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
        // to methods of that instance.
        baseURL: obj.baseURL || env.config.origin,

        // Override timeout default for the library
        // Now all requests will wait 16 seconds before timing out
        timeout: obj.timeout || 16000,
        // `data` is the data to be sent as the request body
        // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
        // When no `transformRequest` is set, must be of one of the following types:
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - Browser only: FormData, File, Blob
        // - Node only: Stream
        data: obj.data ? obj.data : '',

        // `params` are the URL parameters to be sent with the request
        // Must be a plain object or a URLSearchParams object
        params: obj.params ? obj.params : '',

        // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
        // This will set an `Authorization` header, overwriting any existing
        // `Authorization` custom headers you have set using `headers`.
        auth: obj.auth ? obj.auth : '',
    }).then(function (response) {
        if(response.status == 200 && response.data.rspCd == '00000'){
            return response.data;
        }
        console.log(response);
        return 'err'
    }).catch(function (error) {
        console.log(error,obj.log);
        return 'err';
    });
}




