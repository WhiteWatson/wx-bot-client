import type { PuppetWeChat } from './puppet-wechat.js';
import type { WebMessageRawPayload } from './web-schemas.js';
export declare class Firer {
    puppet: PuppetWeChat;
    constructor(puppet: PuppetWeChat);
    checkFriendConfirm(rawPayload: WebMessageRawPayload): Promise<void>;
    checkRoomJoin(rawPayload: WebMessageRawPayload): Promise<boolean>;
    /**
     * You removed "Bruce LEE" from the group chat
     */
    checkRoomLeave(rawPayload: WebMessageRawPayload): Promise<boolean>;
    checkRoomTopic(rawPayload: WebMessageRawPayload): Promise<boolean>;
    /**
     * try to find FriendRequest Confirmation Message
     */
    private parseFriendConfirm;
    /**
     * try to find 'join' event for Room
     *
     * 1.
     *  You invited 管理员 to the group chat.
     *  You invited 李卓桓.PreAngel、Bruce LEE to the group chat.
     * 2.
     *  管理员 invited 小桔建群助手 to the group chat
     *  管理员 invited 庆次、小桔妹 to the group chat
     */
    private parseRoomJoin;
    private parseRoomLeave;
    private parseRoomTopic;
}
export default Firer;
//# sourceMappingURL=firer.d.ts.map