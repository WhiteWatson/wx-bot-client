/// <reference types="node" />
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
import { EventEmitter } from 'events';
import puppeteer from 'puppeteer';
import type { MemoryCard } from 'memory-card';
import type { WebContactRawPayload, WebMessageMediaPayload, WebMessageRawPayload, WebRoomRawPayload } from './web-schemas.js';
export interface InjectResult {
    code: number;
    message: string;
}
export interface BridgeOptions {
    endpoint?: string;
    head?: boolean;
    launchOptions?: puppeteer.LaunchOptions;
    memory: MemoryCard;
    stealthless?: boolean;
    uos?: boolean;
    uosExtSpam?: string;
}
export declare type Cookie = puppeteer.Protocol.Network.Cookie;
export declare class Bridge extends EventEmitter {
    options: BridgeOptions;
    private browser;
    private page;
    private state;
    private wrapAsync;
    constructor(options: BridgeOptions);
    start(): Promise<void>;
    initBrowser(): Promise<puppeteer.Browser>;
    onDialog(dialog: puppeteer.Dialog): Promise<void>;
    onLoad(page: puppeteer.Page): Promise<void>;
    initPage(browser: puppeteer.Browser): Promise<puppeteer.Page>;
    private uosPatch;
    readyAngular(page: puppeteer.Page): Promise<void>;
    inject(page: puppeteer.Page): Promise<void>;
    logout(): Promise<any>;
    stop(): Promise<void>;
    getUserName(): Promise<string>;
    contactAlias(contactId: string, alias: null | string): Promise<boolean>;
    contactList(): Promise<string[]>;
    roomList(): Promise<string[]>;
    roomDelMember(roomId: string, contactId: string): Promise<number>;
    roomAddMember(roomId: string, contactId: string): Promise<number>;
    roomModTopic(roomId: string, topic: string): Promise<string>;
    roomCreate(contactIdList: string[], topic?: string): Promise<string>;
    verifyUserRequest(contactId: string, hello: string): Promise<boolean>;
    verifyUserOk(contactId: string, ticket: string): Promise<boolean>;
    send(toUserName: string, text: string): Promise<void>;
    getMsgImg(id: string): Promise<string>;
    getMsgEmoticon(id: string): Promise<string>;
    getMsgVideo(id: string): Promise<string>;
    getMsgVoice(id: string): Promise<string>;
    getMsgPublicLinkImg(id: string): Promise<string>;
    getMessage(id: string): Promise<WebMessageRawPayload>;
    getContact(id: string): Promise<WebContactRawPayload | WebRoomRawPayload>;
    getBaseRequest(): Promise<string>;
    getPassticket(): Promise<string>;
    getCheckUploadUrl(): Promise<string>;
    getUploadMediaUrl(): Promise<string>;
    sendMedia(mediaData: WebMessageMediaPayload): Promise<boolean>;
    forward(baseData: WebMessageRawPayload, patchData: WebMessageRawPayload): Promise<boolean>;
    /**
     * Proxy Call to Wechaty in Bridge
     */
    proxyWechaty(wechatyFunc: string, ...args: any[]): Promise<any>;
    ding(data: any): void;
    preHtmlToXml(text: string): string;
    innerHTML(): Promise<string>;
    /**
     * Throw if there's a blocked message
     */
    testBlockedMessage(text?: string): Promise<string | false>;
    clickSwitchAccount(page: puppeteer.Page): Promise<boolean>;
    hostname(): Promise<string | null>;
    cookies(cookieList: Cookie[]): Promise<void>;
    cookies(): Promise<Cookie[]>;
    /**
     * name
     */
    entryUrl(cookieList?: puppeteer.Protocol.Network.Cookie[]): string;
    reload(): Promise<void>;
    evaluate(fn: () => any, ...args: any[]): Promise<any>;
}
export default Bridge;
//# sourceMappingURL=bridge.d.ts.map