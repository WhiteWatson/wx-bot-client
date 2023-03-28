"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageExtname = void 0;
const web_schemas_js_1 = require("../web-schemas.js");
function messageExtname(rawPayload) {
    let ext;
    // const type = this.type()
    switch (rawPayload.MsgType) {
        case web_schemas_js_1.WebMessageType.EMOTICON:
            ext = '.gif';
            break;
        case web_schemas_js_1.WebMessageType.IMAGE:
            ext = '.jpg';
            break;
        case web_schemas_js_1.WebMessageType.VIDEO:
        case web_schemas_js_1.WebMessageType.MICROVIDEO:
            ext = '.mp4';
            break;
        case web_schemas_js_1.WebMessageType.VOICE:
            ext = '.mp3';
            break;
        case web_schemas_js_1.WebMessageType.APP:
            switch (rawPayload.AppMsgType) {
                case web_schemas_js_1.WebAppMsgType.URL:
                    ext = '.url'; // XXX
                    break;
                default:
                    ext = '.' + rawPayload.MsgType;
                    break;
            }
            break;
        case web_schemas_js_1.WebMessageType.TEXT:
            if (rawPayload.SubMsgType === web_schemas_js_1.WebMessageType.LOCATION) {
                ext = '.jpg';
            }
            ext = '.' + rawPayload.MsgType;
            break;
        default:
            ext = '.' + rawPayload.MsgType;
    }
    return ext;
}
exports.messageExtname = messageExtname;
//# sourceMappingURL=message-extname.js.map