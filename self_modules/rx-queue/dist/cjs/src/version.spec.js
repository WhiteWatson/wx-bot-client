#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tstest_1 = require("tstest");
const version_js_1 = require("./version.js");
(0, tstest_1.test)('Make sure the VERSION is fresh in source code', async (t) => {
    t.equal(version_js_1.VERSION, '0.0.0', 'version should be 0.0.0 in source code, only updated before publish to NPM');
});
//# sourceMappingURL=version.spec.js.map