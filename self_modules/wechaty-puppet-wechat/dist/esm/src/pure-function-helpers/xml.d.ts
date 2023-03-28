export declare function stripHtml(html?: string): string;
export declare function unescapeHtml(str?: string): string;
export declare function digestEmoji(html?: string): string;
/**
 * unifyEmoji: the same emoji will be encoded as different xml code in browser. unify them.
 *
 *  from: <img class="emoji emoji1f602" text="_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />
 *  to:   <span class=\"emoji emoji1f602\"></span>
 *
 */
export declare function unifyEmoji(html?: string): string;
export declare function stripEmoji(html?: string): string;
export declare function plainText(html?: string): string;
//# sourceMappingURL=xml.d.ts.map