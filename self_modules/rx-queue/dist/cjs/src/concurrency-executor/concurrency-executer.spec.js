#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tstest_1 = require("tstest");
const concurrency_executer_js_1 = require("./concurrency-executer.js");
(0, tstest_1.test)('concurrencyExecuter() smoke testing', async (t) => {
    const sandbox = tstest_1.sinon.createSandbox({
        useFakeTimers: true,
    });
    const INPUT_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const CONCURRENCY = 2;
    const SLEEP_MS = 10;
    const task = async (v) => {
        await new Promise(resolve => setTimeout(resolve, SLEEP_MS));
        return v * 10;
    };
    const iterator = (0, concurrency_executer_js_1.concurrencyExecuter)(CONCURRENCY)(task)(INPUT_LIST);
    const outputList = [];
    (async () => {
        for await (const item of iterator) {
            outputList.push(item);
        }
    })().catch(e => t.fail(e));
    for (let i = 0; i < 3; i++) {
        t.equal(outputList.length, i * CONCURRENCY, 'should has ' + i * CONCURRENCY + ' output item(s) after ' + i + ' iteration(s)');
        await sandbox.clock.tickAsync(SLEEP_MS + 1);
    }
    t.pass('smoke testing passed');
    sandbox.restore();
});
//# sourceMappingURL=concurrency-executer.spec.js.map