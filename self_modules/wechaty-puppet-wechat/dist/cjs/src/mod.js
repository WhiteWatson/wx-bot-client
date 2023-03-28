"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppetWeChat = exports.log = exports.VERSION = void 0;
/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
const puppet_wechat_js_1 = require("./puppet-wechat.js");
Object.defineProperty(exports, "PuppetWeChat", { enumerable: true, get: function () { return puppet_wechat_js_1.PuppetWeChat; } });
var config_js_1 = require("./config.js");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return config_js_1.VERSION; } });
Object.defineProperty(exports, "log", { enumerable: true, get: function () { return config_js_1.log; } });
exports.default = puppet_wechat_js_1.PuppetWeChat;
//# sourceMappingURL=mod.js.map