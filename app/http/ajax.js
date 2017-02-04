/**
 * Created by zhuo on 2017/1/24.
 */
import axios from 'axios';
import env from '../config/env';

let ajax = axios.create();

// Override timeout default for the library
// Now all requests will wait 16 seconds before timing out
ajax.defaults.timeout = 16000;

// Override timeout for this request as it's known to take a long time
/*ajax.get('/longRequest', {
 timeout: 5000
 });*/

// `baseURL` will be prepended to `url` unless `url` is absolute.
// It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
// to methods of that instance.
ajax.defaults.baseURL = env.config.origin;

// Alter defaults after instance has been created
// global set request headers
// ajax.defaults.headers.common['sid'] = '123456';

export default ajax;


