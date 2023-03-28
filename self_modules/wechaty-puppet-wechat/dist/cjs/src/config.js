"use strict";
/// <reference path="./typings.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrCodeForChatie = exports.MEMORY_SLOT = exports.log = exports.VERSION = void 0;
const wechaty_puppet_1 = require("wechaty-puppet");
Object.defineProperty(exports, "log", { enumerable: true, get: function () { return wechaty_puppet_1.log; } });
const file_box_1 = require("file-box");
const qr_image_1 = __importDefault(require("qr-image"));
const package_json_js_1 = require("./package-json.js");
const VERSION = package_json_js_1.packageJson.version || '0.0.0';
exports.VERSION = VERSION;
function qrCodeForChatie() {
    const CHATIE_OFFICIAL_ACCOUNT_QRCODE = 'http://weixin.qq.com/r/qymXj7DEO_1ErfTs93y5';
    const name = 'qrcode-for-chatie.png';
    const type = 'png';
    const qrStream = qr_image_1.default.image(CHATIE_OFFICIAL_ACCOUNT_QRCODE, { type });
    return file_box_1.FileBox.fromStream(qrStream, name);
}
exports.qrCodeForChatie = qrCodeForChatie;
const MEMORY_SLOT = 'PUPPET_WECHAT';
exports.MEMORY_SLOT = MEMORY_SLOT;
//# sourceMappingURL=config.js.map