#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tstest_1 = require("tstest");
const package_json_js_1 = require("./package-json.js");
(0, tstest_1.test)('Make sure the packageJson is fresh in source code', async (t) => {
    const keyNum = Object.keys(package_json_js_1.packageJson).length;
    t.equal(keyNum, 0, 'packageJson should be empty in source code, only updated before publish to NPM');
});
//# sourceMappingURL=package-json.spec.js.map