import DelayQueue from './delay-queue.js';
export interface ExecutionUnit<T = unknown> {
    fn: () => T;
    name: string;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (e?: any) => void;
}
/**
 * DelayQueueExecutor calls functions one by one with a delay time period between calls.
 */
export declare class DelayQueueExecutor<T = unknown> extends DelayQueue<ExecutionUnit<T>> {
    private readonly delayQueueSubscription;
    /**
     *
     * @param period milliseconds
     */
    constructor(period: number);
    execute(fn: () => T, name?: string): Promise<T>;
    unsubscribe(): void;
}
export default DelayQueueExecutor;
//# sourceMappingURL=delay-queue-executor.d.ts.map