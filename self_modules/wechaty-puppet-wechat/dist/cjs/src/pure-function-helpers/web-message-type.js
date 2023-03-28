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
exports.webMessageType = void 0;
const web_schemas_js_1 = require("../web-schemas.js");
const PUPPET = __importStar(require("wechaty-puppet"));
function webMessageType(rawPayload) {
    switch (rawPayload.MsgType) {
        case web_schemas_js_1.WebMessageType.TEXT:
            switch (rawPayload.SubMsgType) {
                case web_schemas_js_1.WebMessageType.LOCATION:
                    return PUPPET.types.Message.Attachment;
                default:
                    return PUPPET.types.Message.Text;
            }
        case web_schemas_js_1.WebMessageType.EMOTICON:
        case web_schemas_js_1.WebMessageType.IMAGE:
            return PUPPET.types.Message.Image;
        case web_schemas_js_1.WebMessageType.VOICE:
            return PUPPET.types.Message.Audio;
        case web_schemas_js_1.WebMessageType.MICROVIDEO:
        case web_schemas_js_1.WebMessageType.VIDEO:
            return PUPPET.types.Message.Video;
        case web_schemas_js_1.WebMessageType.APP:
            switch (rawPayload.AppMsgType) {
                case web_schemas_js_1.WebAppMsgType.ATTACH:
                case web_schemas_js_1.WebAppMsgType.URL:
                case web_schemas_js_1.WebAppMsgType.READER_TYPE:
                    return PUPPET.types.Message.Attachment;
                default:
                    return PUPPET.types.Message.Text;
            }
        /**
         * Treat those Types as TEXT
         *
         * Friendship is a SYS message
         * FIXME: should we use better message type at here???
         */
        case web_schemas_js_1.WebMessageType.SYS:
            return PUPPET.types.Message.Text;
        // add recall type
        case web_schemas_js_1.WebMessageType.RECALLED:
            return PUPPET.types.Message.Recalled;
        // VERIFYMSG           = 37,
        // POSSIBLEFRIEND_MSG  = 40,
        // SHARECARD           = 42,
        // LOCATION            = 48,
        // VOIPMSG             = 50,
        // STATUSNOTIFY        = 51,
        // VOIPNOTIFY          = 52,
        // VOIPINVITE          = 53,
        // SYSNOTICE           = 9999,
        // RECALLED            = 10002,
        default:
            return PUPPET.types.Message.Text;
    }
}
exports.webMessageType = webMessageType;
//# sourceMappingURL=web-message-type.js.map