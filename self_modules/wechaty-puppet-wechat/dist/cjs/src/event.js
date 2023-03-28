"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const gerror_1 = require("gerror");
const config_js_1 = require("./config.js");
// import {
//   PuppetScanEvent,
// }                 from 'wechaty-puppet'
const firer_js_1 = require("./firer.js");
const web_schemas_js_1 = require("./web-schemas.js");
const normalize_scan_status_js_1 = require("./pure-function-helpers/normalize-scan-status.js");
exports.Event = {
    onDing,
    onLog,
    onLogin,
    onLogout,
    onMessage,
    onScan,
    onUnload,
};
function onDing(data) {
    config_js_1.log.silly('PuppetWeChatEvent', 'onDing(%s)', data);
    this.emit('heartbeat', { data });
}
async function onScan(
// Do not use PuppetScanPayload at here, use { code: number, url: string } instead,
//  because this is related with Browser Hook Code:
//    wechaty-bro.js
payloadFromBrowser) {
    config_js_1.log.verbose('PuppetWeChatEvent', 'onScan({code: %d, url: %s})', payloadFromBrowser.code, payloadFromBrowser.url);
    // if (this.state.inactive()) {
    //   log.verbose('PuppetWeChatEvent', 'onScan(%s) state.inactive()=%s, NOOP',
    //                                 payload, this.state.inactive())
    //   return
    // }
    this.scanPayload = {
        qrcode: payloadFromBrowser.url,
        status: payloadFromBrowser.code,
    };
    /**
     * When wx.qq.com push a new QRCode to Scan, there will be cookie updates(?)
     */
    await this.saveCookie();
    if (this.isLoggedIn) {
        config_js_1.log.verbose('PuppetWeChatEvent', 'onScan() there has user when got a scan event. emit logout and set it to null');
        await this.logout();
    }
    // feed watchDog a `scan` type of food
    const food = {
        data: payloadFromBrowser,
        type: 'scan',
    };
    this.emit('heartbeat', food);
    const qrcode = payloadFromBrowser.url.replace(/\/qrcode\//, '/l/');
    const status = (0, normalize_scan_status_js_1.normalizeScanStatus)(payloadFromBrowser.code);
    this.emit('scan', { qrcode, status });
}
function onLog(data) {
    config_js_1.log.silly('PuppetWeChatEvent', 'onLog(%s)', data);
}
async function onLogin(note, ttl = 30) {
    config_js_1.log.verbose('PuppetWeChatEvent', 'onLogin(%s, %d)', note, ttl);
    const TTL_WAIT_MILLISECONDS = 1 * 1000;
    if (ttl <= 0) {
        config_js_1.log.verbose('PuppetWeChatEvent', 'onLogin(%s) TTL expired');
        this.emit('error', gerror_1.GError.from('onLogin() TTL expired.'));
        return;
    }
    // if (this.state.inactive()) {
    //   log.verbose('PuppetWeChatEvent', 'onLogin(%s, %d) state.inactive()=%s, NOOP',
    //                                 note, ttl, this.state.inactive())
    //   return
    // }
    if (this.isLoggedIn) {
        throw new Error('onLogin() user had already logined: ' + this.currentUserId);
        // await this.logout()
    }
    this.scanPayload = undefined;
    try {
        /**
         * save login user id to this.userId
         *
         * issue #772: this.bridge might not inited if the 'login' event fired too fast(because of auto login)
         */
        const userId = await this.bridge.getUserName();
        if (!userId) {
            config_js_1.log.verbose('PuppetWeChatEvent', 'onLogin() browser not fully loaded(ttl=%d), retry later', ttl);
            const html = await this.bridge.innerHTML();
            config_js_1.log.silly('PuppetWeChatEvent', 'onLogin() innerHTML: %s', html.substr(0, 500));
            setTimeout(this.wrapAsync(onLogin.bind(this, note, ttl - 1)), TTL_WAIT_MILLISECONDS);
            return;
        }
        config_js_1.log.silly('PuppetWeChatEvent', 'bridge.getUserName: %s', userId);
        // const user = this.Contact.load(userId)
        // await user.ready()
        config_js_1.log.silly('PuppetWeChatEvent', `onLogin() user ${userId} logined`);
        // if (this.state.active() === true) {
        await this.saveCookie();
        // }
        // fix issue https://github.com/Chatie/wechaty-puppet-wechat/issues/107
        // we do not wait `ready` before emit `login`
        this.waitStable().catch(e => {
            config_js_1.log.error('PuppetWeChatEvent', 'onLogin() this.waitStable() rejection: %s', e && e.message);
        });
        await this.login(userId);
    }
    catch (e) {
        config_js_1.log.error('PuppetWeChatEvent', 'onLogin() exception: %s', e);
        throw e;
    }
}
async function onLogout(data) {
    config_js_1.log.verbose('PuppetWeChatEvent', 'onLogout(%s)', data);
    if (this.isLoggedIn) {
        await this.logout();
    }
    else {
        // not logged-in???
        config_js_1.log.error('PuppetWeChatEvent', 'onLogout() without self-user');
    }
}
async function onMessage(rawPayload) {
    const firer = new firer_js_1.Firer(this);
    /**
     * Fire Events if match message type & content
     */
    switch (rawPayload.MsgType) {
        case web_schemas_js_1.WebMessageType.VERIFYMSG:
            this.emit('friendship', { friendshipId: rawPayload.MsgId });
            // firer.checkFriendRequest(rawPayload)
            break;
        case web_schemas_js_1.WebMessageType.SYS:
            /**
             * /^@@/.test() return true means it's a room
             */
            if (/^@@/.test(rawPayload.FromUserName)) {
                const joinResult = await firer.checkRoomJoin(rawPayload);
                const leaveResult = await firer.checkRoomLeave(rawPayload);
                const topicRestul = await firer.checkRoomTopic(rawPayload);
                if (!joinResult && !leaveResult && !topicRestul) {
                    config_js_1.log.silly('PuppetWeChatEvent', `checkRoomSystem message: <${rawPayload.Content}> not found`);
                }
            }
            else {
                await firer.checkFriendConfirm(rawPayload);
            }
            break;
    }
    this.emit('message', { messageId: rawPayload.MsgId });
}
async function onUnload() {
    config_js_1.log.silly('PuppetWeChatEvent', 'onUnload()');
    /*
    try {
      await this.quit()
      await this.init()
    } catch (e) {
      log.error('PuppetWeChatEvent', 'onUnload() exception: %s', e as Error)
      this.emit('error', e)
      throw e
    }
    */
}
//# sourceMappingURL=event.js.map