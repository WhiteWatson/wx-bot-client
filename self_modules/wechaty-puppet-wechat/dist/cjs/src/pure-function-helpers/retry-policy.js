"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryPolicy = void 0;
const cockatiel_1 = require("cockatiel");
const wechaty_puppet_1 = require("wechaty-puppet");
function getRetryPolicy() {
    const policy = cockatiel_1.Policy
        .handleAll()
        .retry()
        .attempts(10)
        .exponential({
        /**
         * ExponentialBackoff
         *  https://github.com/connor4312/cockatiel#exponentialbackoff
         */
        initialDelay: 1000,
        maxAttempts: 10,
        maxDelay: 10 * 1000,
    });
    policy.onRetry(reason => wechaty_puppet_1.log.silly('wechaty', 'retry-policy getRetryPolicy policy.onRetry() reason: "%s"', JSON.stringify(reason)));
    policy.onSuccess(({ duration }) => wechaty_puppet_1.log.silly('wechaty', 'retry-policy getRetryPolicy policy.onSuccess(): retry call ran in %s ms', duration));
    return policy;
}
/**
 * Create a retry policy that'll try whatever function we execute 3
 *  times with a randomized exponential backoff.
 *
 * https://github.com/connor4312/cockatiel#policyretry
 */
const retryPolicy = getRetryPolicy();
exports.retryPolicy = retryPolicy;
//# sourceMappingURL=retry-policy.js.map