#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tstest_1 = require("tstest");
const cjs_js_1 = require("./cjs.js");
(0, tstest_1.test)('ESM: codeRoot', async (t) => {
    t.ok(cjs_js_1.codeRoot, 'should exists "codeRoot"');
});
//# sourceMappingURL=cjs.spec.js.map