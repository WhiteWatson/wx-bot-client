export const packageJson = {
    "name": "wechaty-puppet-wechat",
    "version": "1.18.4",
    "description": "Puppet WeChat for Wechaty",
    "type": "module",
    "exports": {
        ".": {
            "import": "./dist/esm/src/mod.js",
            "require": "./dist/cjs/src/mod.js"
        }
    },
    "typings": "./dist/esm/src/mod.d.ts",
    "engines": {
        "node": ">=16",
        "npm": ">=7"
    },
    "scripts": {
        "build": "tsc && tsc -p tsconfig.cjs.json",
        "clean": "shx rm -fr dist/*",
        "dist": "npm-run-all clean build dist:commonjs dist:copy",
        "dist:commonjs": "jq -n \"{ type: \\\"commonjs\\\" }\" > dist/cjs/package.json",
        "dist:copy": "npm-run-all copy:esm copy:cjs",
        "copy:js": "shx cp src/*.js dist/src/",
        "copy:esm": "shx cp -R commonjs/ dist/esm/ && shx cp src/*.js dist/esm/src/",
        "copy:cjs": "shx cp -R commonjs/ dist/cjs/ && shx cp src/*.js dist/cjs/src/",
        "lint": "npm run lint:es && npm run lint:ts && npm run lint:md",
        "lint:es": "eslint --ignore-pattern fixtures/ \"src/**/*.ts\" \"tests/**/*.ts\"",
        "lint:md": "markdownlint README.md",
        "lint:ts": "tsc --isolatedModules --noEmit",
        "start": "cross-env NODE_OPTIONS=\"--no-warnings --loader=ts-node/esm\" node examples/ding-dong-bot.ts",
        "test": "npm-run-all lint test:unit",
        "test:pack": "bash -x scripts/npm-pack-testing.sh",
        "test:unit": "cross-env NODE_OPTIONS=\"--no-warnings --loader=ts-node/esm\" TAP_TIMEOUT=60 tap \"src/**/*.spec.ts\" \"tests/**/*.spec.ts\""
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/wechaty/puppet-wechat.git"
    },
    "keywords": [
        "chatie",
        "wechaty",
        "wechat",
        "chatbot",
        "bot",
        "sdk",
        "puppet",
        "weixin"
    ],
    "author": "Huan LI <zixia@zixia.net>",
    "license": "Apache-2.0",
    "bugs": {
        "url": "https://github.com/wechaty/puppet-wechat/issues"
    },
    "devDependencies": {
        "@chatie/eslint-config": "^1.0.4",
        "@chatie/git-scripts": "^0.6.2",
        "@chatie/semver": "^0.4.7",
        "@chatie/tsconfig": "^4.6.3",
        "@types/md5": "^2.3.2",
        "@types/mime": "^2.0.3",
        "@types/qr-image": "^3.2.5",
        "@types/request": "^2.48.8",
        "@types/xml2js": "^0.4.9",
        "why-is-node-running": "^2.2.1"
    },
    "peerDependencies": {
        "wechaty-puppet": "^1.18.3"
    },
    "homepage": "https://github.com/wechaty/puppet-wechat#readme",
    "dependencies": {
        "cockatiel": "^2.0.2",
        "md5": "^2.3.0",
        "mime": "^3.0.0",
        "puppeteer": "^13.5.1",
        "puppeteer-extra": "^3.2.3",
        "puppeteer-extra-plugin-stealth": "^2.9.0",
        "qr-image": "^3.2.0",
        "request": "^2.88.2",
        "rx-queue": "^1.0.5",
        "rxjs": "^7.5.5",
        "state-switch": "^1.6.3",
        "watchdog": "^0.8.17",
        "xml2js": "^0.4.23"
    },
    "files": [
        "bin/",
        "dist/",
        "src/"
    ],
    "tap": {
        "check-coverage": false
    },
    "publishConfig": {
        "access": "public",
        "tag": "next"
    },
    "git": {
        "scripts": {
            "pre-push": "npx git-scripts-pre-push"
        }
    }
};
//# sourceMappingURL=package-json.js.map