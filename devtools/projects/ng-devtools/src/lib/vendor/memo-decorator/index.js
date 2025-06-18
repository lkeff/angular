"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memo = void 0;
function memoize(func, resolver, cache) {
    const memoized = function () {
        var _a;
        const args = arguments;
        // @ts-ignore: ignore implicit any type
        const key = resolver.apply(this, args);
        const cache = memoized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        // @ts-ignore: ignore implicit any type
        const result = func.apply(this, args);
        memoized.cache = (_a = cache.set(key, result)) !== null && _a !== void 0 ? _a : cache;
        return result;
    };
    memoized.cache = cache;
    return memoized;
}
const defaultResolver = (...args) => args[0];
const memo = (config = {}) => (_, __, descriptor) => {
    var _a, _b;
    if (typeof descriptor.value !== 'function') {
        throw new Error('Memoization can be applied only to methods');
    }
    const resolver = (_a = config.resolver) !== null && _a !== void 0 ? _a : defaultResolver;
    const cache = (_b = config.cache) !== null && _b !== void 0 ? _b : new Map();
    descriptor.value = memoize(descriptor.value, resolver, cache);
    return descriptor;
};
exports.memo = memo;
