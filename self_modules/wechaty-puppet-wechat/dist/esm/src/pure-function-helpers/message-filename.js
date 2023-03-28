import { messageExtname, } from './message-extname.js';
export function messageFilename(rawPayload) {
    let guessFilename = rawPayload.FileName || rawPayload.MediaId || rawPayload.MsgId;
    const re = /\.[a-z0-9]{1,7}$/i;
    if (!re.test(guessFilename)) {
        if (rawPayload.MMAppMsgFileExt) {
            guessFilename += '.' + rawPayload.MMAppMsgFileExt;
        }
        else {
            guessFilename += messageExtname(rawPayload);
        }
    }
    return guessFilename;
}
//# sourceMappingURL=message-filename.js.map