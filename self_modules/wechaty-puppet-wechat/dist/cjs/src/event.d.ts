import type { PuppetWeChat } from './puppet-wechat.js';
import { WebMessageRawPayload } from './web-schemas.js';
export declare const Event: {
    onDing: typeof onDing;
    onLog: typeof onLog;
    onLogin: typeof onLogin;
    onLogout: typeof onLogout;
    onMessage: typeof onMessage;
    onScan: typeof onScan;
    onUnload: typeof onUnload;
};
declare function onDing(this: PuppetWeChat, data: any): void;
declare function onScan(this: PuppetWeChat, payloadFromBrowser: {
    code: number;
    url: string;
}): Promise<void>;
declare function onLog(data: any): void;
declare function onLogin(this: PuppetWeChat, note: string, ttl?: number): Promise<void>;
declare function onLogout(this: PuppetWeChat, data: any): Promise<void>;
declare function onMessage(this: PuppetWeChat, rawPayload: WebMessageRawPayload): Promise<void>;
declare function onUnload(this: PuppetWeChat): Promise<void>;
export {};
//# sourceMappingURL=event.d.ts.map