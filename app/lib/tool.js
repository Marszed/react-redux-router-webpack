/**
 * Created by Marszed on 2017/2/2.
 */

/**
 * 工具方法库
 * @type {{}}
 */

let Tool = {};

const keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" +  "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

// get query key-value
Tool.getQueryString = function(name){
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = locationHref.split('?')[1] ? locationHref.split('?')[1].match(reg) : '';
    if (r != null) return decodeURI(r[2]);
    return null;
};

// timeDate format
Tool.timeFormat = function (format, date, datePipe, timePipe) {
    let type = typeof date;
    datePipe = (typeof datePipe != 'undefined') ? datePipe : '-';
    timePipe = (typeof timePipe != 'undefined') ? timePipe : ':';
    let ret = null;
    if (type == 'string' || type == "number") {
        let oDate = new Date(date);
    } else if (type == 'object') {
        let oDate = date;
    } else {
        let oDate = new Date();
    }

    let Y = oDate.getFullYear(), M = oDate.getMonth() + 1, D = oDate.getDate();
    let H = oDate.getHours(), I = oDate.getMinutes(), S = oDate.getSeconds();

    let c = function (a, pipe) {
        let ret = [];
        for (let i = 0, len = a.length; i < len; i++) {
            let x = a[i];
            x = x < 10 ? '0' + x : x;
            ret.push(x)
        }
        return ret.join(pipe);
    };

    switch (format) {
        case 'YM':
            ret = c([Y, M], datePipe);
            break;
        case 'MD':
            ret = c([M, D], datePipe);
            break;
        case 'HI':
            ret = c([H, I], timePipe);
            break;
        case 'HIS':
            ret = c([H, I, S], timePipe);
            break;
        case 'IS':
            ret = c([I, S], timePipe);
            break;
        case 'YMDHI':
            ret = c([Y, M, D], datePipe) + ' ' + c([H, I], timePipe);
            break;
        case 'YMDHIS':
            ret = c([Y, M, D], datePipe) + ' ' + c([H, I, S], timePipe);
            break;
        case 'YMD':
            ret = c([Y, M, D], datePipe);
            break;
        default:
            ret = c([Y, M, D], datePipe);
    }
    return ret;
};


//get sessionStorage
Tool.getSessionStorage = function (key) {
    let r;
    if (window.sessionStorage) {
        r = JSON.parse(window.sessionStorage.getItem(key));
    }
    return r;
};

//set sessionStorage
Tool.setSessionStorage = function (key, value) {
    value = JSON.stringify(value);
    if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
    }
};

//get localStorage
Tool.getLocalStorage = function (key) {
    let r;
    if (window.localStorage) {
        r = JSON.parse(window.localStorage.getItem(key));
    }
    return r;
};

//set localStorage
Tool.setLocalStorage = function (key, value) {
    value = JSON.stringify(value);
    if (window.localStorage) {
        window.localStorage.setItem(key, value);
    }
};

//del localStorage
Tool.delLocalStorage = function (key) {
    if (window.localStorage) {
        window.localStorage.removeItem(key);
    }
};

// update localStorage key value
Tool.updateLocalStorage = function (type, key, val) {
    let obj = Tool.getLocalStorage(type) ? Tool.getLocalStorage(type) : false;
    if (obj) {
        for (let k in obj) {
            if (k == key) {
                if (val === 'delete') {
                    delete obj[k];
                    Tool.setLocalStorage(type, obj);
                    break;
                } else {
                    obj[key] = val;
                }
            } else {
                obj[val.proId] = val;
            }
            Tool.setLocalStorage(type, obj);
        }
    } else {
        let temp = {};
        temp[key] = val;
        Tool.setLocalStorage(type, temp);
    }
};

// string prototype extension
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

// get set cookie
Tool.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        let expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            let date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            }
            else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        let path = options.path ? '; path=' + (options.path) : '';
        let domain = options.domain ? '; domain=' + (options.domain) : '';
        let secure = options.secure ? '; secure' : '';
        document.cookie = [
            name,
            '=',
            encodeURIComponent(value),
            expires,
            path,
            domain,
            secure
        ].join('');
    }
    else {
        let cookieValue = null;
        if (document.cookie && document.cookie != '') {
            let cookies = document.cookie.split(';');
            for (let i = 0, len = cookies.length; i < len; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

// base64加密
Tool.encode64 = function (input) {
    input = escape(input);
    let output = "";
    let chr1, chr2, chr3 = "";
    let enc1, enc2, enc3, enc4 = "";
    let i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
};

// base64解密
Tool.decode64 = function (input) {
    let output = "";
    let chr1, chr2, chr3 = "";
    let enc1, enc2, enc3, enc4 = "";
    let i = 0;
    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    let base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        console && console.log("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return unescape(output);
};

// language package inject
Tool.langPackageInject = function(){
    switch(window.navigator.language.toLowerCase().split(/[_-]+/)[0]){
        case 'en':
            return 'enUS';
        case 'zh':
            return 'zhCN';
        default:
            return 'enUS';
    }
};

export default Tool;
