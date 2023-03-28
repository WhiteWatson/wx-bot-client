"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WECHATY_PUPPET_WECHAT_PUPPETEER_UOS = exports.WECHATY_PUPPET_WECHAT_TOKEN = exports.WECHATY_PUPPET_WECHAT_ENDPOINT = exports.WECHATY_PUPPET_WECHAT_PUPPETEER_STEALTHLESS = exports.WECHATY_PUPPET_WECHAT_PUPPETEER_HEAD = void 0;
const wechaty_puppet_1 = require("wechaty-puppet");
function WECHATY_PUPPET_WECHAT_PUPPETEER_HEAD(value) {
    if (typeof value !== 'undefined') {
        return value;
    }
    return !!process.env['WECHATY_PUPPET_WECHAT_PUPPETEER_HEAD'];
}
exports.WECHATY_PUPPET_WECHAT_PUPPETEER_HEAD = WECHATY_PUPPET_WECHAT_PUPPETEER_HEAD;
const WECHATY_PUPPET_WECHAT_PUPPETEER_STEALTHLESS = (value) => {
    if (typeof value !== 'undefined') {
        return value;
    }
    return !!process.env['WECHATY_PUPPET_WECHAT_PUPPETEER_STEALTHLESS'];
};
exports.WECHATY_PUPPET_WECHAT_PUPPETEER_STEALTHLESS = WECHATY_PUPPET_WECHAT_PUPPETEER_STEALTHLESS;
const WECHATY_PUPPET_WECHAT_ENDPOINT = (value) => {
    if (typeof value !== 'undefined') {
        return value;
    }
    if (process.env['WECHATY_PUPPET_WECHAT_ENDPOINT']) {
        return process.env['WECHATY_PUPPET_WECHAT_ENDPOINT'];
    }
    if (process.env['WECHATY_PUPPET_PUPPETEER_ENDPOINT']) {
        wechaty_puppet_1.log.warn('PuppetWeChat', 'WECHATY_PUPPET_PUPPETEER_ENDPOINT deprecated, use WECHATY_PUPPET_WECHAT_ENDPOINT instead.');
        return process.env['WECHATY_PUPPET_PUPPETEER_ENDPOINT'];
    }
    return undefined;
};
exports.WECHATY_PUPPET_WECHAT_ENDPOINT = WECHATY_PUPPET_WECHAT_ENDPOINT;
const WECHATY_PUPPET_WECHAT_TOKEN = (value) => {
    if (typeof value !== 'undefined') {
        return value;
    }
    return process.env['WECHATY_PUPPET_WECHAT_TOKEN'];
};
exports.WECHATY_PUPPET_WECHAT_TOKEN = WECHATY_PUPPET_WECHAT_TOKEN;
const WECHATY_PUPPET_WECHAT_PUPPETEER_UOS = (value) => {
    if (typeof value !== 'undefined') {
        return value;
    }
    return /^(true|1)$/i.test(String(process.env['WECHATY_PUPPET_WECHAT_PUPPETEER_UOS']));
};
exports.WECHATY_PUPPET_WECHAT_PUPPETEER_UOS = WECHATY_PUPPET_WECHAT_PUPPETEER_UOS;
//# sourceMappingURL=env-vars.js.map