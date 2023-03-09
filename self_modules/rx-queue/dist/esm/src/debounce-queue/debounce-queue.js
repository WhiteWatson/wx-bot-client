import { interval, Subject, } from 'rxjs';
import { debounce, } from 'rxjs/operators';
import RxQueue from '../rx-queue.js';
/**
 * DebounceQueue drops a item if there's another one comes in a period of time.
 *
 * T: item type
 */
export class DebounceQueue extends RxQueue {
    subscription;
    subject;
    /**
     *
     * @param period milliseconds
     */
    constructor(period) {
        super(period);
        this.subject = new Subject();
        this.subscription = this.subject.pipe(debounce(() => interval(this.period))).subscribe((item) => super.next(item));
    }
    next(item) {
        this.subject.next(item);
    }
    unsubscribe() {
        this.subscription.unsubscribe();
        super.unsubscribe();
    }
}
export default DebounceQueue;
//# sourceMappingURL=debounce-queue.js.map