"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plainText = exports.stripEmoji = exports.unifyEmoji = exports.digestEmoji = exports.unescapeHtml = exports.stripHtml = void 0;
function stripHtml(html) {
    if (!html) {
        return '';
    }
    return html.replace(/(<([^>]+)>)/ig, '');
}
exports.stripHtml = stripHtml;
function unescapeHtml(str) {
    if (!str) {
        return '';
    }
    return str
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
}
exports.unescapeHtml = unescapeHtml;
function digestEmoji(html) {
    if (!html) {
        return '';
    }
    return html
        .replace(/<img class="(\w*?emoji) (\w*?emoji[^"]+?)" text="(.*?)_web" src=[^>]+>/g, '$3') // <img class="emoji emoji1f4a4" text="[流汗]_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />
        .replace(/<span class="(\w*?emoji) (\w*?emoji[^"]+?)"><\/span>/g, '[$2]'); // '<span class="emoji emoji1f334"></span>'
}
exports.digestEmoji = digestEmoji;
/**
 * unifyEmoji: the same emoji will be encoded as different xml code in browser. unify them.
 *
 *  from: <img class="emoji emoji1f602" text="_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />
 *  to:   <span class=\"emoji emoji1f602\"></span>
 *
 */
function unifyEmoji(html) {
    if (!html) {
        return '';
    }
    return html
        .replace(/<img class="(\w*?emoji) (\w*?emoji[^"]+?)" text="(.*?)_web" src=[^>]+>/g, '<emoji code="$2"/>') // <img class="emoji emoji1f4a4" text="[流汗]_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />
        .replace(/<span class="(\w*?emoji) (\w*?emoji[^"]+?)"><\/span>/g, '<emoji code="$2"/>'); // '<span class="emoji emoji1f334"></span>'
}
exports.unifyEmoji = unifyEmoji;
function stripEmoji(html) {
    if (!html) {
        return '';
    }
    return html
        .replace(/<img class="(\w*?emoji) (\w*?emoji[^"]+?)" text="(.*?)_web" src=[^>]+>/g, '') // <img class="emoji emoji1f4a4" text="[流汗]_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />
        .replace(/<span class="(\w*?emoji) (\w*?emoji[^"]+?)"><\/span>/g, ''); // '<span class="emoji emoji1f334"></span>'
}
exports.stripEmoji = stripEmoji;
function plainText(html) {
    if (!html) {
        return '';
    }
    return stripHtml(unescapeHtml(stripHtml(digestEmoji(html))));
}
exports.plainText = plainText;
//# sourceMappingURL=xml.js.map