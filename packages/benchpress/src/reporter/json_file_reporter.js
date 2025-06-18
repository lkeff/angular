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
exports.JsonFileReporter = void 0;
const core_1 = require("@angular/core");
const common_options_1 = require("../common_options");
const reporter_1 = require("../reporter");
const sample_description_1 = require("../sample_description");
const text_reporter_base_1 = require("./text_reporter_base");
const util_1 = require("./util");
/**
 * A reporter that writes results into a json file.
 */
let JsonFileReporter = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = reporter_1.Reporter;
    var JsonFileReporter = _classThis = class extends _classSuper {
        constructor(_description, _columnWidth, _path, _writeFile, _now) {
            super();
            this._description = _description;
            this._columnWidth = _columnWidth;
            this._path = _path;
            this._writeFile = _writeFile;
            this._now = _now;
            this.textReporter = new text_reporter_base_1.TextReporterBase(this._columnWidth, this._description);
        }
        reportMeasureValues(measureValues) {
            return Promise.resolve(null);
        }
        reportSample(completeSample, validSample) {
            const stats = {};
            (0, util_1.sortedProps)(this._description.metrics).forEach((metricName) => {
                stats[metricName] = (0, util_1.formatStats)(validSample, metricName);
            });
            const content = JSON.stringify({
                'description': this._description,
                'metricsText': this.textReporter.metricsHeader(),
                'stats': stats,
                'statsText': this.textReporter.sampleStats(validSample),
                'validSampleTexts': validSample.map((s) => this.textReporter.sampleMetrics(s)),
                'completeSample': completeSample,
                'validSample': validSample,
            }, null, 2);
            const filePath = `${this._path}/${this._description.id}_${this._now().getTime()}.json`;
            return this._writeFile(filePath, content);
        }
    };
    __setFunctionName(_classThis, "JsonFileReporter");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JsonFileReporter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.PATH = new core_1.InjectionToken('JsonFileReporter.path');
    _classThis.PROVIDERS = [
        {
            provide: JsonFileReporter,
            deps: [
                sample_description_1.SampleDescription,
                text_reporter_base_1.COLUMN_WIDTH,
                JsonFileReporter.PATH,
                common_options_1.Options.WRITE_FILE,
                common_options_1.Options.NOW,
            ],
        },
        { provide: text_reporter_base_1.COLUMN_WIDTH, useValue: text_reporter_base_1.defaultColumnWidth },
        { provide: JsonFileReporter.PATH, useValue: '.' },
    ];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JsonFileReporter = _classThis;
})();
exports.JsonFileReporter = JsonFileReporter;
