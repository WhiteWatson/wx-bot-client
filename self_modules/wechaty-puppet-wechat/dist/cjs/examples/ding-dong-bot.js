"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const PUPPET = __importStar(require("wechaty-puppet"));
const file_box_1 = require("file-box");
const mod_js_1 = require("../src/mod.js");
/**
 *
 * 1. Declare your Bot!
 *
 */
const puppet = new mod_js_1.PuppetWeChat();
/**
 *
 * 2. Register event handlers for Bot
 *
 */
puppet
    .on('logout', onLogout)
    .on('login', onLogin)
    .on('scan', onScan)
    .on('error', onError)
    .on('message', onMessage);
/**
 *
 * 3. Start the bot!
 *
 */
puppet.start()
    .catch(async (e) => {
    console.error('Bot start() fail:', e);
    await puppet.stop();
    process.exit(-1);
});
/**
 *
 * 4. You are all set. ;-]
 *
 */
/**
 *
 * 5. Define Event Handler Functions for:
 *  `scan`, `login`, `logout`, `error`, and `message`
 *
 */
function onScan(payload) {
    if (payload.qrcode) {
        // Generate a QR Code online via
        // http://goqr.me/api/doc/create-qr-code/
        const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(payload.qrcode),
        ].join('');
        console.info(`[${payload.status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `);
    }
    else {
        console.info(`[${payload.status}]`);
    }
}
function onLogin(payload) {
    console.info(`${payload.contactId} login`);
    puppet.messageSendText(payload.contactId, 'Wechaty login').catch(console.error);
}
function onLogout(payload) {
    console.info(`${payload.contactId} logouted`);
}
function onError(payload) {
    console.error('Bot error:', payload.data);
    /*
    if (bot.isLoggedIn) {
      bot.say('Wechaty error: ' + (e as Error).message).catch(console.error)
    }
    */
}
/**
 *
 * 6. The most important handler is for:
 *    dealing with Messages.
 *
 */
async function onMessage(payload) {
    const messagePayload = await puppet.messagePayload(payload.messageId);
    console.info(JSON.stringify(messagePayload));
    if (messagePayload.type === PUPPET.types.Message.Text
        && /^ding$/i.test(messagePayload.text || '')) {
        const conversationId = messagePayload.roomId || messagePayload.talkerId;
        if (!conversationId) {
            throw new Error('no conversation id');
        }
        await puppet.messageSendText(conversationId, 'dong');
        const fileBox = file_box_1.FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png');
        await puppet.messageSendFile(conversationId, fileBox);
    }
}
/**
 *
 * 7. Output the Welcome Message
 *
 */
const welcome = `
Puppet Version: ${puppet.version()}

Please wait... I'm trying to login in...

`;
console.info(welcome);
//# sourceMappingURL=ding-dong-bot.js.map