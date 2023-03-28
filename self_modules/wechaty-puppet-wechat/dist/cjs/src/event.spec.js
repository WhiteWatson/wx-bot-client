#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const tstest_1 = require("tstest");
const puppet_wechat_js_1 = require("./puppet-wechat.js");
(0, tstest_1.test)('Puppet Puppeteer Event smoke testing', async (t) => {
    const puppet = new puppet_wechat_js_1.PuppetWeChat();
    try {
        await puppet.start();
        t.pass('should be inited');
        await puppet.stop();
        t.pass('should be quited');
    }
    catch (e) {
        t.fail('exception: ' + e.message);
    }
});
//# sourceMappingURL=event.spec.js.map