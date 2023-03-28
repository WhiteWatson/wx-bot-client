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
export var WebMessageType;
(function (WebMessageType) {
    WebMessageType[WebMessageType["TEXT"] = 1] = "TEXT";
    WebMessageType[WebMessageType["IMAGE"] = 3] = "IMAGE";
    WebMessageType[WebMessageType["VOICE"] = 34] = "VOICE";
    WebMessageType[WebMessageType["VERIFYMSG"] = 37] = "VERIFYMSG";
    WebMessageType[WebMessageType["POSSIBLEFRIEND_MSG"] = 40] = "POSSIBLEFRIEND_MSG";
    WebMessageType[WebMessageType["SHARECARD"] = 42] = "SHARECARD";
    WebMessageType[WebMessageType["VIDEO"] = 43] = "VIDEO";
    WebMessageType[WebMessageType["EMOTICON"] = 47] = "EMOTICON";
    WebMessageType[WebMessageType["LOCATION"] = 48] = "LOCATION";
    WebMessageType[WebMessageType["APP"] = 49] = "APP";
    WebMessageType[WebMessageType["VOIPMSG"] = 50] = "VOIPMSG";
    WebMessageType[WebMessageType["STATUSNOTIFY"] = 51] = "STATUSNOTIFY";
    WebMessageType[WebMessageType["VOIPNOTIFY"] = 52] = "VOIPNOTIFY";
    WebMessageType[WebMessageType["VOIPINVITE"] = 53] = "VOIPINVITE";
    WebMessageType[WebMessageType["MICROVIDEO"] = 62] = "MICROVIDEO";
    WebMessageType[WebMessageType["SYSNOTICE"] = 9999] = "SYSNOTICE";
    WebMessageType[WebMessageType["SYS"] = 10000] = "SYS";
    WebMessageType[WebMessageType["RECALLED"] = 10002] = "RECALLED";
})(WebMessageType || (WebMessageType = {}));
// export type MessageTypeName = 'TEXT' | 'IMAGE' | 'VOICE' | 'VERIFYMSG' | 'POSSIBLEFRIEND_MSG'
// | 'SHARECARD' | 'VIDEO' | 'EMOTICON' | 'LOCATION' | 'APP' | 'VOIPMSG' | 'STATUSNOTIFY'
// | 'VOIPNOTIFY' | 'VOIPINVITE' | 'MICROVIDEO' | 'SYSNOTICE' | 'SYS' | 'RECALLED'
// export type MessageTypeValue = 1 | 3 | 34 | 37 | 40 | 42 | 43 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 62 | 9999 | 10000 | 10002
// export interface WebMsgTypeDict {
//   [index: string]: string|number,
//   //   MessageTypeName:  MessageTypeValue
//   // , MessageTypeValue: MessageTypeName
// }
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
export var WebAppMsgType;
(function (WebAppMsgType) {
    WebAppMsgType[WebAppMsgType["TEXT"] = 1] = "TEXT";
    WebAppMsgType[WebAppMsgType["IMG"] = 2] = "IMG";
    WebAppMsgType[WebAppMsgType["AUDIO"] = 3] = "AUDIO";
    WebAppMsgType[WebAppMsgType["VIDEO"] = 4] = "VIDEO";
    WebAppMsgType[WebAppMsgType["URL"] = 5] = "URL";
    WebAppMsgType[WebAppMsgType["ATTACH"] = 6] = "ATTACH";
    WebAppMsgType[WebAppMsgType["OPEN"] = 7] = "OPEN";
    WebAppMsgType[WebAppMsgType["EMOJI"] = 8] = "EMOJI";
    WebAppMsgType[WebAppMsgType["VOICE_REMIND"] = 9] = "VOICE_REMIND";
    WebAppMsgType[WebAppMsgType["SCAN_GOOD"] = 10] = "SCAN_GOOD";
    WebAppMsgType[WebAppMsgType["GOOD"] = 13] = "GOOD";
    WebAppMsgType[WebAppMsgType["EMOTION"] = 15] = "EMOTION";
    WebAppMsgType[WebAppMsgType["CARD_TICKET"] = 16] = "CARD_TICKET";
    WebAppMsgType[WebAppMsgType["REALTIME_SHARE_LOCATION"] = 17] = "REALTIME_SHARE_LOCATION";
    WebAppMsgType[WebAppMsgType["TRANSFERS"] = 2000] = "TRANSFERS";
    WebAppMsgType[WebAppMsgType["RED_ENVELOPES"] = 2001] = "RED_ENVELOPES";
    WebAppMsgType[WebAppMsgType["READER_TYPE"] = 100001] = "READER_TYPE";
})(WebAppMsgType || (WebAppMsgType = {}));
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
export var MsgSendStatus;
(function (MsgSendStatus) {
    MsgSendStatus[MsgSendStatus["READY"] = 0] = "READY";
    MsgSendStatus[MsgSendStatus["SENDING"] = 1] = "SENDING";
    MsgSendStatus[MsgSendStatus["SUCCESS"] = 2] = "SUCCESS";
    MsgSendStatus[MsgSendStatus["FAIL"] = 5] = "FAIL";
})(MsgSendStatus || (MsgSendStatus = {}));
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
export var UploadMediaType;
(function (UploadMediaType) {
    UploadMediaType[UploadMediaType["Unknown"] = 0] = "Unknown";
    UploadMediaType[UploadMediaType["Image"] = 1] = "Image";
    UploadMediaType[UploadMediaType["Video"] = 2] = "Video";
    UploadMediaType[UploadMediaType["Audio"] = 3] = "Audio";
    UploadMediaType[UploadMediaType["Attachment"] = 4] = "Attachment";
})(UploadMediaType || (UploadMediaType = {}));
//# sourceMappingURL=web-schemas.js.map