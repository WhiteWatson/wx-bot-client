import { PartialObserver, Subject, Subscription } from 'rxjs';
export declare class RxQueue<T = unknown> extends Subject<T> {
    period: number;
    private itemList;
    constructor(period?: number);
    next(item: T): void;
    subscribe(observer: PartialObserver<T>): Subscription;
    subscribe(next: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    subscribe(...args: never[]): never;
    version(): string;
}
export default RxQueue;
//# sourceMappingURL=rx-queue.d.ts.map