import RxQueue from '../rx-queue.js';
/**
 * DelayQueue passes all the items and add delays between items.
 * T: item type
 */
export declare class DelayQueue<T = unknown> extends RxQueue<T> {
    private subscription;
    private subject;
    /**
     *
     * @param period milliseconds
     */
    constructor(period?: number);
    next(item: T): void;
    unsubscribe(): void;
}
export default DelayQueue;
//# sourceMappingURL=delay-queue.d.ts.map