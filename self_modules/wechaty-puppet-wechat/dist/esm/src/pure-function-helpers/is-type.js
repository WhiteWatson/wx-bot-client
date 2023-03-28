export function isRoomId(id) {
    return /^@@/.test(id);
}
export function isContactId(id) {
    return !isRoomId(id);
}
//# sourceMappingURL=is-type.js.map