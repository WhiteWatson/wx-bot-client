#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 * If you know how iterators work and how they are consumed you would't need any extra library,
 *  since it can become very easy to build your own concurrency yourself.
 *    — @Endless
 *
 * Inspired by: @link https://stackoverflow.com/a/51020535/1123955
 */
declare type ExecuterTask<S, T> = (value: S) => T | Promise<T>;
/**
 * Execute task with the concurrency on an iterator
 * The order will not be guaranteed. (mostly will be different)
 */
declare const concurrencyExecuter: (concurrency?: number) => <S, T>(task: ExecuterTask<S, T>) => (iterator: S[] | IterableIterator<S>) => AsyncIterableIterator<T>;
export { concurrencyExecuter, };
//# sourceMappingURL=concurrency-executer.d.ts.map