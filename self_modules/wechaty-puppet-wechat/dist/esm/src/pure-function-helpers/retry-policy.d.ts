import { RetryPolicy } from 'cockatiel';
/**
 * Create a retry policy that'll try whatever function we execute 3
 *  times with a randomized exponential backoff.
 *
 * https://github.com/connor4312/cockatiel#policyretry
 */
declare const retryPolicy: RetryPolicy;
export { retryPolicy, };
//# sourceMappingURL=retry-policy.d.ts.map