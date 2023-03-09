#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
import { test } from 'tstest';
import { asyncScheduler, interval, } from 'rxjs';
import { map, take, } from 'rxjs/operators';
import { TestScheduler, } from 'rxjs/testing';
/**
 * See: https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
 * See Also: https://github.com/ohjames/rxjs-websockets/blob/master/src/index.spec.ts
 */
test('marble smoke testing', async (t) => {
    function timeRange(start, end, step = 1000, schedulerX = asyncScheduler) {
        return interval(step, schedulerX).pipe(map(n => n + start), take(end - start + 1));
    }
    const scheduler = new TestScheduler((actual, expected) => {
        // console.log('Actual:', actual, '\n\n', 'Expected:', expected);
        t.ok(JSON.stringify(actual) === JSON.stringify(expected), 'two observable should be equal to the defination from marble diagram');
    });
    const source = timeRange(2, 8, 50, scheduler);
    const values = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };
    scheduler.expectObservable(source).toBe('-----2----3----4----5----6----7----(8|)', values);
    scheduler.flush();
});
//# sourceMappingURL=rx.spec.js.map