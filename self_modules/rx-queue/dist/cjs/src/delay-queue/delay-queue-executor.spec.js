#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tstest_1 = require("tstest");
const delay_queue_executor_js_1 = __importDefault(require("./delay-queue-executor.js"));
const DELAY_PERIOD_TIME = 10;
const EXPECTED_VAL1 = 1;
const EXPECTED_VAL2 = 2;
const EXPECTED_VAL3 = 3;
const MEANING_OF_LIFE = 42;
(0, tstest_1.test)('DelayQueueExecutor execute once', async (t) => {
    const spy = tstest_1.sinon.spy();
    const delay = new delay_queue_executor_js_1.default(DELAY_PERIOD_TIME);
    delay
        .execute(() => spy(EXPECTED_VAL1))
        .catch(() => { });
    t.ok(spy.calledOnce, 'should received 1 call immediately');
    t.equal(spy.firstCall.args[0], EXPECTED_VAL1, 'should get EXPECTED_VAL1');
});
(0, tstest_1.test)('DelayQueueExecutor execute thrice', async (t) => {
    const spy = tstest_1.sinon.spy();
    const delay = new delay_queue_executor_js_1.default(DELAY_PERIOD_TIME);
    delay.execute(() => spy(EXPECTED_VAL1)).catch(() => { });
    delay.execute(() => spy(EXPECTED_VAL2)).catch(() => { });
    delay.execute(() => spy(EXPECTED_VAL3)).catch(() => { });
    t.equal(spy.callCount, 1, 'should call once immediately');
    t.equal(spy.lastCall.args[0], EXPECTED_VAL1, 'should get EXPECTED_VAL1');
    await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3));
    t.equal(spy.callCount, 2, 'should call twice after DELAY_PERIOD_TIME');
    t.equal(spy.lastCall.args[0], EXPECTED_VAL2, 'should get EXPECTED_VAL2');
    await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3));
    t.equal(spy.callCount, 3, 'should call thrice after 2 x DELAY_PERIOD_TIME');
    t.equal(spy.lastCall.args[0], EXPECTED_VAL3, 'should get EXPECTED_VAL3');
    await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3));
    t.equal(spy.callCount, 3, 'should keep third call...');
});
(0, tstest_1.test)('DelayQueueExecutor return Promise', async (t) => {
    const delay = new delay_queue_executor_js_1.default(0);
    const mol = await delay.execute(() => MEANING_OF_LIFE);
    t.equal(mol, MEANING_OF_LIFE, 'should get the function return value');
    const p = delay.execute(() => Promise.resolve(MEANING_OF_LIFE));
    t.ok(p instanceof Promise, 'should get the function return value(promise)');
    const value = await p;
    t.equal(value, MEANING_OF_LIFE, 'should get the function return value by await');
});
//# sourceMappingURL=delay-queue-executor.spec.js.map