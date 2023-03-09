import { interval, Subject, } from 'rxjs';
import { throttle, } from 'rxjs/operators';
import RxQueue from '../rx-queue.js';
/**
 * ThrottleQueue
 *
 * passes one item and then drop all the following items in a period of time.
 *
 * T: item type
 */
export class ThrottleQueue extends RxQueue {
    subscription;
    subject;
    /**
     *
     * @param period milliseconds
     */
    constructor(period) {
        super(period);
        this.subject = new Subject();
        this.subscription = this.subject.pipe(throttle(() => interval(this.period))).subscribe((item) => super.next(item));
    }
    next(item) {
        this.subject.next(item);
    }
    unsubscribe() {
        this.subscription.unsubscribe();
        super.unsubscribe();
    }
}
export default ThrottleQueue;
//# sourceMappingURL=throttle-queue.js.map