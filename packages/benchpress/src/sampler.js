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
exports.SampleState = exports.Sampler = void 0;
const core_1 = require("@angular/core");
const common_options_1 = require("./common_options");
const measure_values_1 = require("./measure_values");
const metric_1 = require("./metric");
const reporter_1 = require("./reporter");
const validator_1 = require("./validator");
const web_driver_adapter_1 = require("./web_driver_adapter");
/**
 * The Sampler owns the sample loop:
 * 1. calls the prepare/execute callbacks,
 * 2. gets data from the metric
 * 3. asks the validator for a valid sample
 * 4. reports the new data to the reporter
 * 5. loop until there is a valid sample
 */
let Sampler = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Sampler = _classThis = class {
        constructor(_driver, _metric, _reporter, _validator, _prepare, _execute, _now) {
            this._driver = _driver;
            this._metric = _metric;
            this._reporter = _reporter;
            this._validator = _validator;
            this._prepare = _prepare;
            this._execute = _execute;
            this._now = _now;
        }
        sample() {
            const loop = (lastState) => {
                return this._iterate(lastState).then((newState) => {
                    if (newState.validSample != null) {
                        return newState;
                    }
                    else {
                        return loop(newState);
                    }
                });
            };
            return loop(new SampleState([], null));
        }
        _iterate(lastState) {
            let resultPromise;
            if (this._prepare !== common_options_1.Options.NO_PREPARE) {
                resultPromise = this._driver.waitFor(this._prepare);
            }
            else {
                resultPromise = Promise.resolve(null);
            }
            if (this._prepare !== common_options_1.Options.NO_PREPARE || lastState.completeSample.length === 0) {
                resultPromise = resultPromise.then((_) => this._metric.beginMeasure());
            }
            return resultPromise
                .then((_) => this._driver.waitFor(this._execute))
                .then((_) => this._metric.endMeasure(this._prepare === common_options_1.Options.NO_PREPARE))
                .then((measureValues) => {
                if (!!measureValues['invalid']) {
                    return lastState;
                }
                return this._report(lastState, measureValues);
            });
        }
        _report(state, metricValues) {
            const measureValues = new measure_values_1.MeasureValues(state.completeSample.length, this._now(), metricValues);
            const completeSample = state.completeSample.concat([measureValues]);
            const validSample = this._validator.validate(completeSample);
            let resultPromise = this._reporter.reportMeasureValues(measureValues);
            if (validSample != null) {
                resultPromise = resultPromise.then((_) => this._reporter.reportSample(completeSample, validSample));
            }
            return resultPromise.then((_) => new SampleState(completeSample, validSample));
        }
    };
    __setFunctionName(_classThis, "Sampler");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Sampler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.PROVIDERS = [
        {
            provide: Sampler,
            deps: [
                web_driver_adapter_1.WebDriverAdapter,
                metric_1.Metric,
                reporter_1.Reporter,
                validator_1.Validator,
                common_options_1.Options.PREPARE,
                common_options_1.Options.EXECUTE,
                common_options_1.Options.NOW,
            ],
        },
    ];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Sampler = _classThis;
})();
exports.Sampler = Sampler;
class SampleState {
    constructor(completeSample, validSample) {
        this.completeSample = completeSample;
        this.validSample = validSample;
    }
}
exports.SampleState = SampleState;
