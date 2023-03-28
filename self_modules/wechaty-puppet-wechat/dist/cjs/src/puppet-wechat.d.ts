import type { LaunchOptions } from 'puppeteer';
import { Watchdog } from 'watchdog';
import * as PUPPET from 'wechaty-puppet';
import type { FileBoxInterface } from 'file-box';
import { Bridge } from './bridge.js';
import { WebContactRawPayload, WebMessageRawPayload, WebMessageType, WebRoomRawMember, WebRoomRawPayload } from './web-schemas.js';
export declare type ScanFoodType = 'scan' | 'login' | 'logout';
declare type PuppetWeChatOptions = PUPPET.PuppetOptions & {
    head?: boolean;
    launchOptions?: LaunchOptions;
    stealthless?: boolean;
    uos?: boolean;
};
export declare class PuppetWeChat extends PUPPET.Puppet {
    options: PuppetWeChatOptions;
    static readonly VERSION: string;
    bridge: Bridge;
    scanPayload?: PUPPET.payloads.EventScan;
    scanWatchdog: Watchdog<ScanFoodType>;
    private fileId;
    constructor(options?: PuppetWeChatOptions);
    onStart(): Promise<void>;
    onStop(): Promise<void>;
    /**
     * Deal with SCAN events
     *
     * if web browser stay at login qrcode page long time,
     * sometimes the qrcode will not refresh, leave there expired.
     * so we need to refresh the page after a while
     */
    private initWatchdogForScan;
    private initBridge;
    private getBaseRequest;
    /**
     *
     * Message
     *
     */
    messageRawPayload(id: string): Promise<WebMessageRawPayload>;
    messageRawPayloadParser(rawPayload: WebMessageRawPayload): Promise<PUPPET.payloads.Message>;
    messageRecall(messageId: string): Promise<boolean>;
    messageFile(messageId: string): Promise<FileBoxInterface>;
    messageUrl(messageId: string): Promise<PUPPET.payloads.UrlLink>;
    messageMiniProgram(messageId: string): Promise<PUPPET.payloads.MiniProgram>;
    private messageRawPayloadToFile;
    messageSendUrl(conversationId: string, urlLinkPayload: PUPPET.payloads.UrlLink): Promise<void>;
    messageSendMiniProgram(conversationId: string, miniProgramPayload: PUPPET.payloads.MiniProgram): Promise<void>;
    /**
     * TODO: Test this function if it could work...
     */
    messageForward(conversationId: string, messageId: string): Promise<void>;
    messageSendText(conversationId: string, text: string): Promise<void>;
    /**
     * logout from browser, then server will emit `logout` event
     */
    logout(reason?: string): Promise<void>;
    /**
     *
     * ContactSelf
     *
     *
     */
    contactSelfQRCode(): Promise<string>;
    contactSelfName(name: string): Promise<void>;
    contactSelfSignature(signature: string): Promise<void>;
    /**
     *
     * Contact
     *
     */
    contactRawPayload(id: string): Promise<WebContactRawPayload>;
    contactRawPayloadParser(rawPayload: WebContactRawPayload): Promise<PUPPET.payloads.Contact>;
    ding(data?: string): void;
    contactAvatar(contactId: string): Promise<FileBoxInterface>;
    contactAvatar(contactId: string, file: FileBoxInterface): Promise<void>;
    contactAlias(contactId: string): Promise<string>;
    contactAlias(contactId: string, alias: string | null): Promise<void>;
    contactList(): Promise<string[]>;
    /**
     *
     * Room
     *
     */
    roomRawPayload(id: string): Promise<WebRoomRawPayload>;
    roomRawPayloadParser(rawPayload: WebRoomRawPayload): Promise<PUPPET.payloads.Room>;
    roomList(): Promise<string[]>;
    roomDel(roomId: string, contactId: string): Promise<void>;
    roomAvatar(roomId: string): Promise<FileBoxInterface>;
    roomAdd(roomId: string, contactId: string): Promise<void>;
    roomTopic(roomId: string): Promise<string>;
    roomTopic(roomId: string, topic: string): Promise<void>;
    roomCreate(contactIdList: string[], topic: string): Promise<string>;
    roomAnnounce(roomId: string): Promise<string>;
    roomAnnounce(roomId: string, text: string): Promise<void>;
    roomQuit(roomId: string): Promise<void>;
    roomQRCode(roomId: string): Promise<string>;
    roomMemberList(roomId: string): Promise<string[]>;
    roomMemberRawPayload(roomId: string, contactId: string): Promise<WebRoomRawMember>;
    roomMemberRawPayloadParser(rawPayload: WebRoomRawMember): Promise<PUPPET.payloads.RoomMember>;
    /**
     *
     * Room Invitation
     *
     */
    roomInvitationAccept(roomInvitationId: string): Promise<void>;
    roomInvitationRawPayload(roomInvitationId: string): Promise<any>;
    roomInvitationRawPayloadParser(rawPayload: any): Promise<PUPPET.payloads.RoomInvitation>;
    /**
     *
     * Friendship
     *
     */
    friendshipRawPayload(id: string): Promise<WebMessageRawPayload>;
    friendshipRawPayloadParser(rawPayload: WebMessageRawPayload): Promise<PUPPET.payloads.Friendship>;
    friendshipSearchPhone(phone: string): Promise<null | string>;
    friendshipSearchWeixin(weixin: string): Promise<null | string>;
    friendshipAdd(contactId: string, hello: string): Promise<void>;
    friendshipAccept(friendshipId: string): Promise<void>;
    /**
     * @private
     * For issue #668
     */
    waitStable(): Promise<void>;
    /**
     * https://www.chatie.io:8080/api
     * location.hostname = www.chatie.io
     * location.host = www.chatie.io:8080
     * See: https://stackoverflow.com/a/11379802/1123955
     */
    private hostname;
    private cookies;
    saveCookie(): Promise<void>;
    /**
     * `isImg()` @see https://github.com/wechaty/webwx-app-tracker/blob/a12c78fb8bd7186c0f3bb0e18dd611151e6b8aac/formatted/webwxApp.js#L3441-L3450
     * `getMsgType()` @see https://github.com/wechaty/webwx-app-tracker/blob/a12c78fb8bd7186c0f3bb0e18dd611151e6b8aac/formatted/webwxApp.js#L3452-L3463
     */
    protected getMsgType(ext: string): WebMessageType;
    private messageRawPayloadToUrl;
    protected getExtName(filename: string): string;
    private uploadMedia;
    messageSendFile(conversationId: string, file: FileBoxInterface): Promise<void>;
    messageSendContact(conversationId: string, contactId: string): Promise<void>;
    messageImage(messageId: string, imageType: PUPPET.types.Image): Promise<FileBoxInterface>;
    messageContact(messageId: string): Promise<string>;
    /**
     *
     * Tag
     *
     */
    tagContactAdd(tagId: string, contactId: string): Promise<void>;
    tagContactRemove(tagId: string, contactId: string): Promise<void>;
    tagContactDelete(tagId: string): Promise<void>;
    tagContactList(contactId?: string): Promise<string[]>;
    contactCorporationRemark(contactId: string, corporationRemark: string | null): Promise<never>;
    contactDescription(contactId: string, description: string | null): Promise<never>;
    contactPhone(contactId: string, phoneList: string[]): Promise<void>;
    conversationReadMark(conversationId: string, hasRead?: boolean): Promise<void>;
}
export default PuppetWeChat;
//# sourceMappingURL=puppet-wechat.d.ts.map