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
exports.UserMetric = void 0;
const core_1 = require("@angular/core");
const common_options_1 = require("../common_options");
const metric_1 = require("../metric");
const web_driver_adapter_1 = require("../web_driver_adapter");
let UserMetric = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = metric_1.Metric;
    var UserMetric = _classThis = class extends _classSuper {
        constructor(_userMetrics, _wdAdapter) {
            super();
            this._userMetrics = _userMetrics;
            this._wdAdapter = _wdAdapter;
        }
        /**
         * Starts measuring
         */
        beginMeasure() {
            return Promise.resolve(true);
        }
        /**
         * Ends measuring.
         */
        endMeasure(restart) {
            let resolve;
            let reject;
            const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            const adapter = this._wdAdapter;
            const names = Object.keys(this._userMetrics);
            function getAndClearValues() {
                Promise.all(names.map((name) => adapter.executeScript(`return window.${name}`))).then((values) => {
                    if (values.every((v) => typeof v === 'number')) {
                        Promise.all(names.map((name) => adapter.executeScript(`delete window.${name}`))).then((_) => {
                            const map = {};
                            for (let i = 0, n = names.length; i < n; i++) {
                                map[names[i]] = values[i];
                            }
                            resolve(map);
                        }, reject);
                    }
                    else {
                        setTimeout(getAndClearValues, 100);
                    }
                }, reject);
            }
            getAndClearValues();
            return promise;
        }
        /**
         * Describes the metrics provided by this metric implementation.
         * (e.g. units, ...)
         */
        describe() {
            return this._userMetrics;
        }
    };
    __setFunctionName(_classThis, "UserMetric");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserMetric = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.PROVIDERS = [
        { provide: UserMetric, deps: [common_options_1.Options.USER_METRICS, web_driver_adapter_1.WebDriverAdapter] },
    ];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserMetric = _classThis;
})();
exports.UserMetric = UserMetric;
