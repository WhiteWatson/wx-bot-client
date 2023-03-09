import DelayQueue from './delay-queue.js';
/**
 * DelayQueueExecutor calls functions one by one with a delay time period between calls.
 */
export class DelayQueueExecutor extends DelayQueue {
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
export default DelayQueueExecutor;
//# sourceMappingURL=delay-queue-executor.js.map