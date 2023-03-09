"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayQueueExecutor = void 0;
const delay_queue_js_1 = __importDefault(require("./delay-queue.js"));
/**
 * DelayQueueExecutor calls functions one by one with a delay time period between calls.
 */
class DelayQueueExecutor extends delay_queue_js_1.default {
    delayQueueSubscription;
    /**
     *
     * @param period milliseconds
     */
    constructor(period) {
        super(period);
        this.delayQueueSubscription = this.subscribe(unit => {
            try {
                const ret = unit.fn();
                return unit.resolve(ret);
            }
            catch (e) {
                return unit.reject(e);
            }
        });
    }
    async execute(fn, name) {
        return new Promise((resolve, reject) => {
            const unit = {
                fn,
                name: name || fn.name,
                reject,
                resolve,
            };
            this.next(unit);
        });
    }
    unsubscribe() {
        this.delayQueueSubscription.unsubscribe();
        super.unsubscribe();
    }
}
exports.DelayQueueExecutor = DelayQueueExecutor;
exports.default = DelayQueueExecutor;
//# sourceMappingURL=delay-queue-executor.js.map