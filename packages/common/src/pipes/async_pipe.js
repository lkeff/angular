"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncPipe = void 0;
const core_1 = require("@angular/core");
const invalid_pipe_argument_error_1 = require("./invalid_pipe_argument_error");
class SubscribableStrategy {
    createSubscription(async, updateLatestValue, onError) {
        // Subscription can be side-effectful, and we don't want any signal reads which happen in the
        // side effect of the subscription to be tracked by a component's template when that
        // subscription is triggered via the async pipe. So we wrap the subscription in `untracked` to
        // decouple from the current reactive context.
        //
        // `untracked` also prevents signal _writes_ which happen in the subscription side effect from
        // being treated as signal writes during the template evaluation (which throws errors).
        return (0, core_1.untracked)(() => async.subscribe({
            next: updateLatestValue,
            error: onError,
        }));
    }
    dispose(subscription) {
        // See the comment in `createSubscription` above on the use of `untracked`.
        (0, core_1.untracked)(() => subscription.unsubscribe());
    }
}
class PromiseStrategy {
    createSubscription(async, updateLatestValue, onError) {
        // According to the promise specification, promises are not cancellable by default.
        // Once a promise is created, it will either resolve or reject, and it doesn't
        // provide a built-in mechanism to cancel it.
        // There may be situations where a promise is provided, and it either resolves after
        // the pipe has been destroyed or never resolves at all. If the promise never
        // resolves — potentially due to factors beyond our control, such as third-party
        // libraries — this can lead to a memory leak.
        // When we use `async.then(updateLatestValue)`, the engine captures a reference to the
        // `updateLatestValue` function. This allows the promise to invoke that function when it
        // resolves. In this case, the promise directly captures a reference to the
        // `updateLatestValue` function. If the promise resolves later, it retains a reference
        // to the original `updateLatestValue`, meaning that even if the context where
        // `updateLatestValue` was defined has been destroyed, the function reference remains in memory.
        // This can lead to memory leaks if `updateLatestValue` is no longer needed or if it holds
        // onto resources that should be released.
        // When we do `async.then(v => ...)` the promise captures a reference to the lambda
        // function (the arrow function).
        // When we assign `updateLatestValue = null` within the context of an `unsubscribe` function,
        // we're changing the reference of `updateLatestValue` in the current scope to `null`.
        // The lambda will no longer have access to it after the assignment, effectively
        // preventing any further calls to the original function and allowing it to be garbage collected.
        async.then(
        // Using optional chaining because we may have set it to `null`; since the promise
        // is async, the view might be destroyed by the time the promise resolves.
        (v) => updateLatestValue === null || updateLatestValue === void 0 ? void 0 : updateLatestValue(v), (e) => onError === null || onError === void 0 ? void 0 : onError(e));
        return {
            unsubscribe: () => {
                updateLatestValue = null;
                onError = null;
            },
        };
    }
    dispose(subscription) {
        subscription.unsubscribe();
    }
}
const _promiseStrategy = new PromiseStrategy();
const _subscribableStrategy = new SubscribableStrategy();
/**
 * @ngModule CommonModule
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks. When the reference of the expression changes, the `async` pipe
 * automatically unsubscribes from the old `Observable` or `Promise` and subscribes to the new one.
 *
 * @usageNotes
 *
 * ### Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuously updates the view with the current time.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * @publicApi
 */
let AsyncPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'async',
            pure: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncPipe = _classThis = class {
        constructor(ref) {
            this._latestValue = null;
            this.markForCheckOnValueUpdate = true;
            this._subscription = null;
            this._obj = null;
            this._strategy = null;
            this.applicationErrorHandler = (0, core_1.inject)(core_1.ɵINTERNAL_APPLICATION_ERROR_HANDLER);
            // Assign `ref` into `this._ref` manually instead of declaring `_ref` in the constructor
            // parameter list, as the type of `this._ref` includes `null` unlike the type of `ref`.
            this._ref = ref;
        }
        ngOnDestroy() {
            if (this._subscription) {
                this._dispose();
            }
            // Clear the `ChangeDetectorRef` and its association with the view data, to mitigate
            // potential memory leaks in Observables that could otherwise cause the view data to
            // be retained.
            // https://github.com/angular/angular/issues/17624
            this._ref = null;
        }
        transform(obj) {
            if (!this._obj) {
                if (obj) {
                    try {
                        // Only call `markForCheck` if the value is updated asynchronously.
                        // Synchronous updates _during_ subscription should not wastefully mark for check -
                        // this value is already going to be returned from the transform function.
                        this.markForCheckOnValueUpdate = false;
                        this._subscribe(obj);
                    }
                    finally {
                        this.markForCheckOnValueUpdate = true;
                    }
                }
                return this._latestValue;
            }
            if (obj !== this._obj) {
                this._dispose();
                return this.transform(obj);
            }
            return this._latestValue;
        }
        _subscribe(obj) {
            this._obj = obj;
            this._strategy = this._selectStrategy(obj);
            this._subscription = this._strategy.createSubscription(obj, (value) => this._updateLatestValue(obj, value), (e) => this.applicationErrorHandler(e));
        }
        _selectStrategy(obj) {
            if ((0, core_1.ɵisPromise)(obj)) {
                return _promiseStrategy;
            }
            if ((0, core_1.ɵisSubscribable)(obj)) {
                return _subscribableStrategy;
            }
            throw (0, invalid_pipe_argument_error_1.invalidPipeArgumentError)(AsyncPipe, obj);
        }
        _dispose() {
            // Note: `dispose` is only called if a subscription has been initialized before, indicating
            // that `this._strategy` is also available.
            this._strategy.dispose(this._subscription);
            this._latestValue = null;
            this._subscription = null;
            this._obj = null;
        }
        _updateLatestValue(async, value) {
            var _a;
            if (async === this._obj) {
                this._latestValue = value;
                if (this.markForCheckOnValueUpdate) {
                    (_a = this._ref) === null || _a === void 0 ? void 0 : _a.markForCheck();
                }
            }
        }
    };
    __setFunctionName(_classThis, "AsyncPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncPipe = _classThis;
})();
exports.AsyncPipe = AsyncPipe;
