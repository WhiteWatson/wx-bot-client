import RxQueue from '../rx-queue.js';
/**
 * DebounceQueue drops a item if there's another one comes in a period of time.
 *
 * T: item type
 */
export declare class DebounceQueue<T = unknown> extends RxQueue<T> {
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
export default DebounceQueue;
//# sourceMappingURL=debounce-queue.d.ts.map