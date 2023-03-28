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
const tstest_1 = require("tstest");
const config_js_1 = require("../src/config.js");
const puppet_wechat_js_1 = require("../src/puppet-wechat.js");
const web_schemas_js_1 = require("../src/web-schemas.js");
const file_box_1 = require("file-box");
const request_1 = __importDefault(require("request"));
class PuppetTest extends puppet_wechat_js_1.PuppetWeChat {
    getExtName(filename) {
        return super.getExtName(filename);
    }
    getMsgType(ext) {
        return super.getMsgType(ext);
    }
}
(0, tstest_1.test)('Send Attachment', async (t) => {
    const puppet = new PuppetTest();
    const sandbox = tstest_1.sinon.createSandbox();
    sandbox.stub(puppet.bridge, 'getCheckUploadUrl').returns(Promise.resolve('getCheckUploadUrl'));
    sandbox.stub(puppet.bridge, 'getUploadMediaUrl').returns(Promise.resolve('getUploadMediaUrl'));
    sandbox.stub(puppet.bridge, 'getBaseRequest').returns(Promise.resolve('{}'));
    sandbox.stub(puppet.bridge, 'getPassticket').returns(Promise.resolve('getPassticket'));
    sandbox.stub(puppet.bridge, 'cookies').returns(Promise.resolve([]));
    sandbox.stub(puppet.bridge, 'hostname').returns(Promise.resolve('hostname'));
    sandbox.replaceGetter(puppet, 'currentUserId', () => 'currentUserId');
    const conversationId = 'filehelper';
    const uploadMediaUrl = await puppet.bridge.getUploadMediaUrl();
    const checkUploadUrl = await puppet.bridge.getCheckUploadUrl();
    const mockedResCheckUpload = {
        AESKey: 'AESKey',
        Signature: 'Signature',
    };
    const mockedResUploadMedia = {
        MediaId: 'MediaId',
    };
    const mockSendMedia = async (msg) => {
        config_js_1.log.silly('TestMessage', 'mocked bridge.sendMedia(%o)', msg);
        const ext = puppet.getExtName(msg.FileName);
        const msgType = puppet.getMsgType(ext);
        t.match(msg.MMFileExt, /^\w+$/, 'MMFileExt should match /^\\w+$/');
        t.equal(msg.MsgType, msgType, `MsgType should be "${msgType}"`);
        t.equal(msg.MMFileExt, ext, `MMFileExt should be "${ext}"`);
        return true;
    };
    const mockPostRequest = (options, callback) => {
        config_js_1.log.silly('TestMessage', 'mocked request.post(%o)', options);
        let path = null;
        if ('url' in options) {
            if (typeof options.url === 'object') {
                path = options.url.path;
            }
            else {
                path = options.url;
            }
        }
        else if ('uri' in options) {
            if (typeof options.uri === 'object') {
                path = options.uri.path;
            }
            else {
                path = options.uri;
            }
        }
        if (path && callback) {
            if (path.includes(uploadMediaUrl)) {
                config_js_1.log.silly('TestMessage', 'requesting %s:%o', uploadMediaUrl, options.formData);
                const formData = options.formData;
                const uploadmediarequest = JSON.parse(formData.uploadmediarequest);
                const name = formData.name;
                const ext = puppet.getExtName(name);
                let mediatype;
                switch (puppet.getMsgType(ext)) {
                    case web_schemas_js_1.WebMessageType.IMAGE:
                        mediatype = 'pic';
                        break;
                    case web_schemas_js_1.WebMessageType.VIDEO:
                        mediatype = 'video';
                        break;
                    default:
                        mediatype = 'doc';
                }
                t.equal(formData.mediatype, mediatype, `mediatype should be "${mediatype}"`);
                t.equal(uploadmediarequest.MediaType, 4, 'MediaType should be 4');
                t.equal(uploadmediarequest.UploadType, 2, 'UploadType should be 2');
                callback(null, {}, mockedResUploadMedia);
            }
            else if (path.includes(checkUploadUrl)) {
                callback(null, {}, mockedResCheckUpload);
            }
            else {
                config_js_1.log.silly('Unknown request:%s', path);
            }
        }
        return null;
    };
    sandbox.stub(puppet.bridge, 'sendMedia').callsFake(mockSendMedia);
    sandbox.stub(request_1.default, 'post').callsFake(mockPostRequest);
    await Promise.all([
        'gif',
        'png',
        'jpg',
        'jpeg',
        'bmp',
        'gif',
        'html',
        'txt',
        'docx',
        'doc',
        'xlsx',
        'csv',
        'mp3',
        'mp4',
        'mkv',
    ].map(async (ext) => {
        const giffile = file_box_1.FileBox.fromBuffer(Buffer.alloc(10), 'test.' + ext);
        await puppet.messageSendFile(conversationId, giffile);
    }));
    sandbox.restore();
});
//# sourceMappingURL=puppeteer-attachment.spec.js.map