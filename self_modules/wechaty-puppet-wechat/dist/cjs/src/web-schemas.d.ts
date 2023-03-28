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
export interface WebContactRawPayload {
    Alias: string;
    City: string;
    NickName: string;
    Province: string;
    RemarkName: string;
    Sex: number;
    Signature: string;
    StarFriend: string;
    Uin: string;
    UserName: string;
    HeadImgUrl: string;
    stranger?: string;
    VerifyFlag: number;
}
export interface WebMessageMediaPayload {
    ToUserName: string;
    MsgType: number;
    MediaId: string;
    FileName: string;
    FileSize: number;
    FileMd5?: string;
    FileType?: number;
    MMFileExt?: string;
    Signature?: string;
}
/**
 * from Message
 */
export interface WebRecomendInfo {
    UserName: string;
    NickName: string;
    Content: string;
    HeadImgUrl: string;
    Ticket: string;
    VerifyFlag: number;
}
/**
 *
 * Enum for MsgType values.
 * @enum {number}
 * @property {number} TEXT                - MsgType.TEXT                (1)     for TEXT
 * @property {number} IMAGE               - MsgType.IMAGE               (3)     for IMAGE
 * @property {number} VOICE               - MsgType.VOICE               (34)    for VOICE
 * @property {number} VERIFYMSG           - MsgType.VERIFYMSG           (37)    for VERIFYMSG
 * @property {number} POSSIBLEFRIEND_MSG  - MsgType.POSSIBLEFRIEND_MSG  (40)    for POSSIBLEFRIEND_MSG
 * @property {number} SHARECARD           - MsgType.SHARECARD           (42)    for SHARECARD
 * @property {number} VIDEO               - MsgType.VIDEO               (43)    for VIDEO
 * @property {number} EMOTICON            - MsgType.EMOTICON            (47)    for EMOTICON
 * @property {number} LOCATION            - MsgType.LOCATION            (48)    for LOCATION
 * @property {number} APP                 - MsgType.APP                 (49)    for APP
 * @property {number} VOIPMSG             - MsgType.VOIPMSG             (50)    for VOIPMSG
 * @property {number} STATUSNOTIFY        - MsgType.STATUSNOTIFY        (51)    for STATUSNOTIFY
 * @property {number} VOIPNOTIFY          - MsgType.VOIPNOTIFY          (52)    for VOIPNOTIFY
 * @property {number} VOIPINVITE          - MsgType.VOIPINVITE          (53)    for VOIPINVITE
 * @property {number} MICROVIDEO          - MsgType.MICROVIDEO          (62)    for MICROVIDEO
 * @property {number} SYSNOTICE           - MsgType.SYSNOTICE           (9999)  for SYSNOTICE
 * @property {number} SYS                 - MsgType.SYS                 (10000) for SYS
 * @property {number} RECALLED            - MsgType.RECALLED            (10002) for RECALLED
 */
export declare enum WebMessageType {
    TEXT = 1,
    IMAGE = 3,
    VOICE = 34,
    VERIFYMSG = 37,
    POSSIBLEFRIEND_MSG = 40,
    SHARECARD = 42,
    VIDEO = 43,
    EMOTICON = 47,
    LOCATION = 48,
    APP = 49,
    VOIPMSG = 50,
    STATUSNOTIFY = 51,
    VOIPNOTIFY = 52,
    VOIPINVITE = 53,
    MICROVIDEO = 62,
    SYSNOTICE = 9999,
    SYS = 10000,
    RECALLED = 10002
}
/**
 *
 * Enum for AppMsgType values.
 *
 * @enum {number}
 * @property {number} TEXT                    - AppMsgType.TEXT                     (1)     for TEXT
 * @property {number} IMG                     - AppMsgType.IMG                      (2)      for IMG
 * @property {number} AUDIO                   - AppMsgType.AUDIO                    (3)      for AUDIO
 * @property {number} VIDEO                   - AppMsgType.VIDEO                    (4)      for VIDEO
 * @property {number} URL                     - AppMsgType.URL                      (5)      for URL
 * @property {number} ATTACH                  - AppMsgType.ATTACH                   (6)      for ATTACH
 * @property {number} OPEN                    - AppMsgType.OPEN                     (7)      for OPEN
 * @property {number} EMOJI                   - AppMsgType.EMOJI                    (8)      for EMOJI
 * @property {number} VOICE_REMIND            - AppMsgType.VOICE_REMIND             (9)      for VOICE_REMIND
 * @property {number} SCAN_GOOD               - AppMsgType.SCAN_GOOD                (10)     for SCAN_GOOD
 * @property {number} GOOD                    - AppMsgType.GOOD                     (13)     for GOOD
 * @property {number} EMOTION                 - AppMsgType.EMOTION                  (15)     for EMOTION
 * @property {number} CARD_TICKET             - AppMsgType.CARD_TICKET              (16)     for CARD_TICKET
 * @property {number} REALTIME_SHARE_LOCATION - AppMsgType.REALTIME_SHARE_LOCATION  (17)     for REALTIME_SHARE_LOCATION
 * @property {number} TRANSFERS               - AppMsgType.TRANSFERS                (2e3)    for TRANSFERS
 * @property {number} RED_ENVELOPES           - AppMsgType.RED_ENVELOPES            (2001)   for RED_ENVELOPES
 * @property {number} READER_TYPE             - AppMsgType.READER_TYPE              (100001) for READER_TYPE
 */
export declare enum WebAppMsgType {
    TEXT = 1,
    IMG = 2,
    AUDIO = 3,
    VIDEO = 4,
    URL = 5,
    ATTACH = 6,
    OPEN = 7,
    EMOJI = 8,
    VOICE_REMIND = 9,
    SCAN_GOOD = 10,
    GOOD = 13,
    EMOTION = 15,
    CARD_TICKET = 16,
    REALTIME_SHARE_LOCATION = 17,
    TRANSFERS = 2000,
    RED_ENVELOPES = 2001,
    READER_TYPE = 100001
}
/**
 * MsgSendStatus from webwx-app
 *  @see https://github.com/wechaty/webwx-app-tracker/blob/a12c78fb8bd7186c0f3bb0e18dd611151e6b8aac/formatted/webwxApp.js#L7520-L7524
 *
 *  //msg send status
 *    MSG_SEND_STATUS_READY: 0
 *    MSG_SEND_STATUS_SENDING: 1
 *    MSG_SEND_STATUS_SUCC: 2
 *    MSG_SEND_STATUS_FAIL: 5
 */
export declare enum MsgSendStatus {
    READY = 0,
    SENDING = 1,
    SUCCESS = 2,
    FAIL = 5
}
export interface WebMessageRawPayload {
    MsgId: string;
    MMActualSender: string;
    MMPeerUserName: string;
    ToUserName: string;
    FromUserName: string;
    MMActualContent: string;
    Content: string;
    MMDigest: string;
    MMDisplayTime: number;
    CreateTime: number;
    /**
     * MsgType == MSGTYPE_APP && message.AppMsgType == CONF.APPMSGTYPE_URL
     * class="cover" mm-src="{{getMsgImg(message.MsgId,'slave')}}"
     */
    Url: string;
    MMAppMsgDesc: string;
    /**
     * Attachment
     *
     * MsgType == MSGTYPE_APP && message.AppMsgType == CONF.APPMSGTYPE_ATTACH
     */
    FileName: string;
    FileSize: number;
    MediaId: string;
    MMFileExt: string;
    Signature: string;
    MMAppMsgFileExt: string;
    MMAppMsgFileSize: string;
    MMAppMsgDownloadUrl: string;
    MMUploadProgress: number;
    /**
     * 模板消息
     * MSGTYPE_APP && message.AppMsgType == CONF.APPMSGTYPE_READER_TYPE
     *  item.url
     *  item.title
     *  item.pub_time
     *  item.cover
     *  item.digest
     */
    MMCategory: any[];
    /**
     * Type
     *
     * MsgType == CONF.MSGTYPE_VOICE : ng-style="{'width':40 + 7*message.VoiceLength/1000}
     */
    MsgType: number;
    AppMsgType: WebAppMsgType;
    SubMsgType: WebMessageType;
    /**
     * Status-es
     */
    Status: string;
    MMStatus: MsgSendStatus;
    MMFileStatus: number;
    /**
     * Location
     */
    MMLocationUrl: string;
    MMLocationDesc: string;
    /**
     * MsgType == CONF.MSGTYPE_EMOTICON
     *
     * getMsgImg(message.MsgId,'big',message)
     */
    /**
     * Image
     *
     *  getMsgImg(message.MsgId,'slave')
     */
    MMImgStyle: string;
    MMPreviewSrc: string;
    MMThumbSrc: string;
    /**
     * Friend Request & ShareCard ?
     *
     * MsgType == CONF.MSGTYPE_SHARECARD" ng-click="showProfile($event,message.RecommendInfo.UserName)
     * MsgType == CONF.MSGTYPE_VERIFYMSG
     */
    RecommendInfo?: WebRecomendInfo;
    /**
     * Transpond Message
     */
    MsgIdBeforeTranspond?: string;
    isTranspond?: boolean;
    MMSourceMsgId?: string;
    MMSendContent?: string;
    MMIsChatRoom?: boolean;
}
/**
 * UploadMediaType from webwx-app
 *  @see https://github.com/wechaty/webwx-app-tracker/blob/a12c78fb8bd7186c0f3bb0e18dd611151e6b8aac/formatted/webwxApp.js#L7545-L7549
 *
 *  //upload media type
 *    UPLOAD_MEDIA_TYPE_IMAGE: 1
 *    UPLOAD_MEDIA_TYPE_VIDEO: 2
 *    UPLOAD_MEDIA_TYPE_AUDIO: 3
 *    UPLOAD_MEDIA_TYPE_ATTACHMENT: 4,
 */
export declare enum UploadMediaType {
    Unknown = 0,
    Image = 1,
    Video = 2,
    Audio = 3,
    Attachment = 4
}
export interface WebRoomRawMember {
    UserName: string;
    NickName: string;
    DisplayName: string;
    HeadImgUrl: string;
}
export interface WebRoomRawPayload {
    UserName: string;
    EncryChatRoomId: string;
    NickName: string;
    OwnerUin: number;
    ChatRoomOwner: string;
    MemberList?: WebRoomRawMember[];
}
//# sourceMappingURL=web-schemas.d.ts.map