import { concat, of, Subject, timer, } from 'rxjs';
import { concatMap, ignoreElements, } from 'rxjs/operators';
import RxQueue from '../rx-queue.js';
/**
 * DelayQueue passes all the items and add delays between items.
 * T: item type
 */
export class DelayQueue extends RxQueue {
    subscription;
    subject;
    /**
     *
     * @param period milliseconds
     */
    constructor(period) {
        super(period);
        this.subject = new Subject();
        this.subscription = this.subject.pipe(concatMap(x => concat(of(x), // emit first item right away
        /**
         * Issue #71 - DelayQueue failed: behavior breaking change after RxJS from v6 to v7
         *  https://github.com/huan/rx-queue/issues/71
         */
        timer(this.period).pipe(ignoreElements())))).subscribe((item) => super.next(item));
    }
    next(item) {
        this.subject.next(item);
    }
    unsubscribe() {
        this.subscription.unsubscribe();
        super.unsubscribe();
    }
}
export default DelayQueue;
//# sourceMappingURL=delay-queue.js.map