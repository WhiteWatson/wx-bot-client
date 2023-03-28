/**
 * Huan(202109): from Add mention - wechaty/wechaty#362
 *  https://github.com/wechaty/wechaty/pull/362/files
 */
import { Puppet } from 'wechaty-puppet';
/**
 *
 * Get message mentioned contactList.
 *
 * Message event table as follows
 *
 * |                                                                            | Web  |  Mac PC Client | iOS Mobile |  android Mobile |
 * | :---                                                                       | :--: |     :----:     |   :---:    |     :---:       |
 * | [You were mentioned] tip ([有人@我]的提示)                                   |  ✘   |        √       |     √      |       √         |
 * | Identify magic code (8197) by copy & paste in mobile                       |  ✘   |        √       |     √      |       ✘         |
 * | Identify magic code (8197) by programming                                  |  ✘   |        ✘       |     ✘      |       ✘         |
 * | Identify two contacts with the same roomAlias by [You were  mentioned] tip |  ✘   |        ✘       |     √      |       √         |
 *
 * @returns {Promise<Contact[]>} - Return message mentioned contactList
 *
 * @example
 * const contactList = await message.mention()
 * console.log(contactList)
 */
declare function parseMentionIdList(puppet: Puppet, roomId: string, text: string): Promise<string[]>;
export { parseMentionIdList };
//# sourceMappingURL=parse-mention-id-list.d.ts.map