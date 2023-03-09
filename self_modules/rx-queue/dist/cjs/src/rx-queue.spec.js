#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-shadowed-variable
const tstest_1 = require("tstest");
const rx_queue_js_1 = __importDefault(require("./rx-queue.js"));
(0, tstest_1.test)('RxQueue subscribe & next', async (t) => {
    const EXPECTED_ITEM = { test: 'testing123' };
    const spy = tstest_1.sinon.spy();
    const q = new rx_queue_js_1.default();
    q.subscribe(spy);
    q.next(EXPECTED_ITEM);
    t.ok(spy.calledOnce, 'should received 1 call');
    t.deepEqual(spy.firstCall.args[0], EXPECTED_ITEM, 'should received EXPECTED_ITEM');
});
(0, tstest_1.test)('RxQueue version()', async (t) => {
    const q = new rx_queue_js_1.default();
    t.ok(/^\d+\.\d+\.\d+$/.test(q.version()), 'get version');
});
//# sourceMappingURL=rx-queue.spec.js.map