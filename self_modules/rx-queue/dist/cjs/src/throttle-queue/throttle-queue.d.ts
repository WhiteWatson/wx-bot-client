import RxQueue from '../rx-queue.js';
/**
 * ThrottleQueue
 *
 * passes one item and then drop all the following items in a period of time.
 *
 * T: item type
 */
export declare class ThrottleQueue<T = unknown> extends RxQueue<T> {
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
export default ThrottleQueue;
//# sourceMappingURL=throttle-queue.d.ts.map