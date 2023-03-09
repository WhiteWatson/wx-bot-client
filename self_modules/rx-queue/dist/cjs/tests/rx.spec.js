#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tstest_1 = require("tstest");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const testing_1 = require("rxjs/testing");
/**
 * See: https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
 * See Also: https://github.com/ohjames/rxjs-websockets/blob/master/src/index.spec.ts
 */
(0, tstest_1.test)('marble smoke testing', async (t) => {
    function timeRange(start, end, step = 1000, schedulerX = rxjs_1.asyncScheduler) {
        return (0, rxjs_1.interval)(step, schedulerX).pipe((0, operators_1.map)(n => n + start), (0, operators_1.take)(end - start + 1));
    }
    const scheduler = new testing_1.TestScheduler((actual, expected) => {
        // console.log('Actual:', actual, '\n\n', 'Expected:', expected);
        t.ok(JSON.stringify(actual) === JSON.stringify(expected), 'two observable should be equal to the defination from marble diagram');
    });
    const source = timeRange(2, 8, 50, scheduler);
    const values = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };
    scheduler.expectObservable(source).toBe('-----2----3----4----5----6----7----(8|)', values);
    scheduler.flush();
});
//# sourceMappingURL=rx.spec.js.map