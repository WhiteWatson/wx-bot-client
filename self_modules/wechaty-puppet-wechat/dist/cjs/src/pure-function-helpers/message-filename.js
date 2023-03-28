"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFilename = void 0;
const message_extname_js_1 = require("./message-extname.js");
function messageFilename(rawPayload) {
    let guessFilename = rawPayload.FileName || rawPayload.MediaId || rawPayload.MsgId;
    const re = /\.[a-z0-9]{1,7}$/i;
    if (!re.test(guessFilename)) {
        if (rawPayload.MMAppMsgFileExt) {
            guessFilename += '.' + rawPayload.MMAppMsgFileExt;
        }
        else {
            guessFilename += (0, message_extname_js_1.messageExtname)(rawPayload);
        }
    }
    return guessFilename;
}
exports.messageFilename = messageFilename;
//# sourceMappingURL=message-filename.js.map