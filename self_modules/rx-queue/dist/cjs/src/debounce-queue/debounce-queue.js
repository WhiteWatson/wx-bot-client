"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebounceQueue = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const rx_queue_js_1 = __importDefault(require("../rx-queue.js"));
/**
 * DebounceQueue drops a item if there's another one comes in a period of time.
 *
 * T: item type
 */
class DebounceQueue extends rx_queue_js_1.default {
    subscription;
    subject;
    /**
     *
     * @param period milliseconds
     */
    constructor(period) {
        super(period);
        this.subject = new rxjs_1.Subject();
        this.subscription = this.subject.pipe((0, operators_1.debounce)(() => (0, rxjs_1.interval)(this.period))).subscribe((item) => super.next(item));
    }
    next(item) {
        this.subject.next(item);
    }
    unsubscribe() {
        this.subscription.unsubscribe();
        super.unsubscribe();
    }
}
exports.DebounceQueue = DebounceQueue;
exports.default = DebounceQueue;
//# sourceMappingURL=debounce-queue.js.map