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
exports.RegressionSlopeValidator = void 0;
const core_1 = require("@angular/core");
const statistic_1 = require("../statistic");
const validator_1 = require("../validator");
/**
 * A validator that checks the regression slope of a specific metric.
 * Waits for the regression slope to be >=0.
 */
let RegressionSlopeValidator = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = validator_1.Validator;
    var RegressionSlopeValidator = _classThis = class extends _classSuper {
        constructor(_sampleSize, _metric) {
            super();
            this._sampleSize = _sampleSize;
            this._metric = _metric;
        }
        describe() {
            return { 'sampleSize': this._sampleSize, 'regressionSlopeMetric': this._metric };
        }
        validate(completeSample) {
            if (completeSample.length >= this._sampleSize) {
                const latestSample = completeSample.slice(completeSample.length - this._sampleSize, completeSample.length);
                const xValues = [];
                const yValues = [];
                for (let i = 0; i < latestSample.length; i++) {
                    // For now, we only use the array index as x value.
                    // TODO(tbosch): think about whether we should use time here instead
                    xValues.push(i);
                    yValues.push(latestSample[i].values[this._metric]);
                }
                const regressionSlope = statistic_1.Statistic.calculateRegressionSlope(xValues, statistic_1.Statistic.calculateMean(xValues), yValues, statistic_1.Statistic.calculateMean(yValues));
                return regressionSlope >= 0 ? latestSample : null;
            }
            else {
                return null;
            }
        }
    };
    __setFunctionName(_classThis, "RegressionSlopeValidator");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RegressionSlopeValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.SAMPLE_SIZE = new core_1.InjectionToken('RegressionSlopeValidator.sampleSize');
    _classThis.METRIC = new core_1.InjectionToken('RegressionSlopeValidator.metric');
    _classThis.PROVIDERS = [
        {
            provide: RegressionSlopeValidator,
            deps: [RegressionSlopeValidator.SAMPLE_SIZE, RegressionSlopeValidator.METRIC],
        },
        { provide: RegressionSlopeValidator.SAMPLE_SIZE, useValue: 10 },
        { provide: RegressionSlopeValidator.METRIC, useValue: 'scriptTime' },
    ];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RegressionSlopeValidator = _classThis;
})();
exports.RegressionSlopeValidator = RegressionSlopeValidator;
