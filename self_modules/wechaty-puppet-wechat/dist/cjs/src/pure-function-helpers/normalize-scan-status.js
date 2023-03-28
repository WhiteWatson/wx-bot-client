"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeScanStatus = void 0;
const types_1 = require("wechaty-puppet/types");
function normalizeScanStatus(status) {
    switch (status) {
        case 0:
            return types_1.ScanStatus.Waiting;
        case 200:
            return types_1.ScanStatus.Confirmed;
        case 201:
            return types_1.ScanStatus.Scanned;
        case 408:
            // No scan after 2 minute ...
            return types_1.ScanStatus.Timeout;
        default:
            throw new Error('unsupported scan status: ' + status);
    }
}
exports.normalizeScanStatus = normalizeScanStatus;
//# sourceMappingURL=normalize-scan-status.js.map