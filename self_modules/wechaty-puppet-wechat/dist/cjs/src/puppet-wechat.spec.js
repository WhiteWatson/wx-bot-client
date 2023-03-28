#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const tstest_1 = require("tstest"); // const sinonTest   = require('sinon-test')(sinon, {
//   useFakeTimers: {  // https://github.com/sinonjs/lolex
//     advanceTimeDelta  : 10,
//     shouldAdvanceTime : true,
//   },
// })
// import { log }    from './config'
// log.level('silly')
const why_is_node_running_1 = __importDefault(require("why-is-node-running"));
const bridge_js_1 = require("./bridge.js");
const event_js_1 = require("./event.js");
const puppet_wechat_js_1 = require("./puppet-wechat.js");
class PuppetTest extends puppet_wechat_js_1.PuppetWeChat {
    contactRawPayload(id) {
        return super.contactRawPayload(id);
    }
    roomRawPayload(id) {
        return super.roomRawPayload(id);
    }
    messageRawPayload(id) {
        return super.messageRawPayload(id);
    }
}
// test('Puppet smoke testing', async t => {
//   const puppet  = new PuppetTest()
//   const wechaty = new WechatyTest({ puppet })
//   wechaty.initPuppetAccessory(puppet)
//   t.ok(puppet.state.inactive(), 'should be OFF state after instanciate')
//   puppet.state.active('pending')
//   t.ok(puppet.state.active(), 'should be ON state after set')
//   t.ok(puppet.state.pending(), 'should be pending state after set')
// })
(0, tstest_1.test)('login/logout events', async (t) => {
    const sandbox = tstest_1.sinon.createSandbox();
    try {
        const puppet = new PuppetTest();
        sandbox.stub(event_js_1.Event, 'onScan'); // block the scan event to prevent reset logined user
        sandbox.stub(bridge_js_1.Bridge.prototype, 'getUserName').resolves('mockedUserName');
        sandbox.stub(bridge_js_1.Bridge.prototype, 'contactList')
            .onFirstCall().resolves([])
            .onSecondCall().resolves(['1'])
            .resolves(['1', '2']);
        sandbox.stub(puppet, 'contactRawPayload').resolves({
            NickName: 'mockedNickName',
            UserName: 'mockedUserName',
        });
        // sandbox.stub(puppet, 'waitStable').resolves()
        const readySpy = sandbox.spy();
        puppet.on('ready', readySpy);
        await puppet.start();
        t.pass('should be inited');
        t.equal(puppet.isLoggedIn, false, 'should be not logined');
        const future = new Promise(resolve => puppet.once('login', resolve))
            .catch(e => t.fail(e));
        puppet.bridge.emit('login', 'TestPuppetWeChat');
        await future;
        t.equal(puppet.isLoggedIn, true, 'should be logined');
        t.ok(puppet.bridge.getUserName.called, 'bridge.getUserName should be called');
        // FIXME: improve the performance of the test by mocking the time
        // TODO(huan) July 2018: use sinon.clock / sinon.useFakeTimers() at here
        await new Promise(resolve => setTimeout(resolve, 7000));
        // Puppet will not ready the contact, so the contactRawPayload might not be called at here. Huan, 2018.6
        // t.ok((puppet.contactRawPayload as any).called,  'puppet.contactRawPayload should be called')
        t.ok(bridge_js_1.Bridge.prototype.contactList.called, 'contactList stub should be called');
        /**
         * 6 times is:
         *
         * 0, 1, 2 is for first 3 calls for contactList()
         *
         * 3, 4, 5 is PuppetWeChat.waitStable() for `unchangedNum` to reach 3 times.
         */
        t.equal(bridge_js_1.Bridge.prototype.contactList.callCount, 6, 'should call stubContacList 6 times');
        t.ok(readySpy.called, 'should emit ready event, after login');
        const LOGOUT_FIRED = 'logoutFired';
        const logoutPromise = new Promise((resolve) => puppet.once('logout', () => resolve(LOGOUT_FIRED)));
        puppet.bridge.emit('logout');
        t.equal(await logoutPromise, LOGOUT_FIRED, 'should fire logout event');
        await new Promise(setImmediate);
        t.equal(puppet.isLoggedIn, false, 'should be logouted');
        await puppet.stop();
    }
    catch (e) {
        t.fail(e);
    }
    finally {
        sandbox.restore();
    }
});
/**
 * FIXME: increase test times from 1 to 3 Huan(202006)
 */
(0, tstest_1.test)('PuppetWechat perfect restart', async (t) => {
    const puppet = new puppet_wechat_js_1.PuppetWeChat();
    let n = 1;
    while (n--) {
        await puppet.start();
        // await new Promise(resolve => setTimeout(resolve, 1000))
        await puppet.stop();
        t.pass(`perfect restart #${n}`);
    }
    void why_is_node_running_1.default;
    // setInterval(whyIsNodeRunning, 5000)
});
//# sourceMappingURL=puppet-wechat.spec.js.map