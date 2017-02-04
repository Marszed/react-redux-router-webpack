/**
 * Created by Marszed on 2017/2/2.
 */
const windowOrigin = window.location.origin;

/**
 * 接口调用地址配置
 * @type {{pro: {origin: string}, qa: {origin: string}, sit: {origin: string}}}
 */
let hostConfig = {
    pro: {
        origin: 'http://ip.port'
    },
    qa: {
        origin: 'http://qa.ip.port'
    },
    sit: {
        origin: 'http://ip.port'
    },
    test: {
        origin: 'http://172.23.1.45:8080'
    }
};

let env = {
    config: (windowOrigin == 'http://pro.ipx.com') ? hostConfig.pro : (windowOrigin == 'http://qa.ipx.com' ? hostConfig.qa : hostConfig.sit)
};

export default env;