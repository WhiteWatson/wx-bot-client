import { isRoomId, } from './is-type.js';
import { messageFilename, } from './message-filename.js';
import { webMessageType, } from './web-message-type.js';
export function messageRawPayloadParser(rawPayload) {
    const id = rawPayload.MsgId;
    const talkerId = rawPayload.MMActualSender; // MMPeerUserName
    const text = rawPayload.MMActualContent; // Content has @id prefix added by wx
    const timestamp = rawPayload.MMDisplayTime; // Javascript timestamp of milliseconds
    const msgFileName = messageFilename(rawPayload) || undefined;
    let roomId;
    let listenerId;
    // FIXME: has there any better method to know the room ID?
    if (rawPayload.MMIsChatRoom) {
        if (isRoomId(rawPayload.FromUserName)) {
            roomId = rawPayload.FromUserName; // MMPeerUserName always eq FromUserName ?
        }
        else if (isRoomId(rawPayload.ToUserName)) {
            roomId = rawPayload.ToUserName;
        }
        else {
            throw new Error('parse found a room message, but neither FromUserName nor ToUserName is a room(/^@@/)');
        }
        // console.log('rawPayload.FromUserName: ', rawPayload.FromUserName)
        // console.log('rawPayload.ToUserName: ', rawPayload.ToUserName)
        // console.log('rawPayload.MMPeerUserName: ', rawPayload.MMPeerUserName)
    }
    if (rawPayload.ToUserName) {
        if (!isRoomId(rawPayload.ToUserName)) {
            // if a message in room without any specific receiver, then it will set to be `undefined`
            listenerId = rawPayload.ToUserName;
        }
    }
    const type = webMessageType(rawPayload);
    const payloadBase = {
        filename: msgFileName,
        id,
        mentionIdList: [],
        talkerId,
        text,
        timestamp,
        type,
    };
    let payload;
    if (listenerId) {
        payload = {
            ...payloadBase,
            listenerId,
            roomId,
        };
    }
    else if (roomId) {
        payload = {
            ...payloadBase,
            listenerId,
            roomId,
        };
    }
    else {
        throw new Error('neither roomId nor listenerId');
    }
    return payload;
}
//# sourceMappingURL=message-raw-payload-parser.js.map