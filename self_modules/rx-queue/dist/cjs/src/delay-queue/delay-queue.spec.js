#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tstest_1 = require("tstest");
const delay_queue_js_1 = __importDefault(require("./delay-queue.js"));
const EXPECTED_ITEM1 = { test: 'testing123' };
const EXPECTED_ITEM2 = { mol: 42 };
const EXPECTED_ITEM3 = 42;
const DELAY_PERIOD_TIME = 10; // milliseconds
(0, tstest_1.test)('DelayQueue 1 item', async (t) => {
    const q = new delay_queue_js_1.default(DELAY_PERIOD_TIME);
    const spy = tstest_1.sinon.spy();
    q.subscribe(spy);
    q.next(EXPECTED_ITEM1);
    t.equal(spy.callCount, 1, 'should called right after first item');
    t.deepEqual(spy.lastCall.args[0], EXPECTED_ITEM1, 'should get the first item immediately');
});
(0, tstest_1.test)('DelayQueue 2 item', async (t) => {
    const q = new delay_queue_js_1.default(DELAY_PERIOD_TIME);
    const spy = tstest_1.sinon.spy();
    q.subscribe(spy);
    q.next(EXPECTED_ITEM1);
    q.next(EXPECTED_ITEM2);
    t.equal(spy.callCount, 1, 'should get one item after next two item');
    t.deepEqual(spy.lastCall.args[0], EXPECTED_ITEM1, 'should get the first item only');
    await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3));
    t.equal(spy.callCount, 2, 'should get the second item after period delay');
    t.deepEqual(spy.lastCall.args[0], EXPECTED_ITEM2, 'should get the second item for last call');
});
(0, tstest_1.test)('DelayQueue 3 items', async (t) => {
    const q = new delay_queue_js_1.default(DELAY_PERIOD_TIME);
    const spy = tstest_1.sinon.spy();
    q.subscribe(spy);
    q.next(EXPECTED_ITEM1);
    q.next(EXPECTED_ITEM2);
    q.next(EXPECTED_ITEM3);
    t.equal(spy.callCount, 1, 'get first item immediatelly');
    t.deepEqual(spy.lastCall.args[0], EXPECTED_ITEM1, 'should received EXPECTED_ITEM1 immediatelly');
    await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3));
    t.equal(spy.callCount, 2, 'get second item after period');
    t.deepEqual(spy.lastCall.args[0], EXPECTED_ITEM2, 'should received EXPECTED_ITEM2 after 1 x period');
    await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3));
    t.equal(spy.callCount, 3, 'should get the third item after 2 x period');
    t.deepEqual(spy.lastCall.args[0], EXPECTED_ITEM3, 'should received EXPECTED_ITEM3 after 2 x period');
});
//# sourceMappingURL=delay-queue.spec.js.map