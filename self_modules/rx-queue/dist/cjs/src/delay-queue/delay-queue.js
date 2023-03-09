"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayQueue = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const rx_queue_js_1 = __importDefault(require("../rx-queue.js"));
/**
 * DelayQueue passes all the items and add delays between items.
 * T: item type
 */
class DelayQueue extends rx_queue_js_1.default {
    subscription;
    subject;
    /**
     *
     * @param period milliseconds
     */
    constructor(period) {
        super(period);
        this.subject = new rxjs_1.Subject();
        this.subscription = this.subject.pipe((0, operators_1.concatMap)(x => (0, rxjs_1.concat)((0, rxjs_1.of)(x), // emit first item right away
        /**
         * Issue #71 - DelayQueue failed: behavior breaking change after RxJS from v6 to v7
         *  https://github.com/huan/rx-queue/issues/71
         */
        (0, rxjs_1.timer)(this.period).pipe((0, operators_1.ignoreElements)())))).subscribe((item) => super.next(item));
    }
    next(item) {
        this.subject.next(item);
    }
    unsubscribe() {
        this.subscription.unsubscribe();
        super.unsubscribe();
    }
}
exports.DelayQueue = DelayQueue;
exports.default = DelayQueue;
//# sourceMappingURL=delay-queue.js.map