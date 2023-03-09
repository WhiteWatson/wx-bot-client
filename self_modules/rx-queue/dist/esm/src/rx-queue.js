import { Subject, } from 'rxjs';
import { VERSION, } from './config.js';
// default set to 500 milliseconds
const DEFAULT_PERIOD_TIME = 500;
// https://codepen.io/maindg/pen/xRwGvL
export class RxQueue extends Subject {
    period;
    itemList = [];
    constructor(period = DEFAULT_PERIOD_TIME) {
        super();
        this.period = period;
    }
    next(item) {
        if (this.observers.length > 0) {
            super.next(item);
        }
        else {
            this.itemList.push(item);
        }
    }
    subscribe(nextOrObserver, error, complete) {
        let subscription; // TypeScript strict require strong typing differenciation
        if (typeof nextOrObserver === 'function') {
            subscription = super.subscribe(nextOrObserver, error, complete);
        }
        else {
            subscription = super.subscribe(nextOrObserver);
        }
        this.itemList.forEach(item => this.next(item));
        this.itemList = [];
        return subscription;
    }
    version() {
        return VERSION;
    }
}
export default RxQueue;
//# sourceMappingURL=rx-queue.js.map