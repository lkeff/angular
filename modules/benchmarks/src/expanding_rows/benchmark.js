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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandingRowBenchmarkModule = exports.InitializationRoot = void 0;
exports.execTimed = execTimed;
exports.nextTick = nextTick;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const benchmark_module_1 = require("./benchmark_module");
const benchmarkable_expanding_row_1 = require("./benchmarkable_expanding_row");
const benchmarkable_expanding_row_module_1 = require("./benchmarkable_expanding_row_module");
let InitializationRoot = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'benchmark-root',
            encapsulation: core_1.ViewEncapsulation.None,
            template: ` <h2>cfc-expanding-row initialization benchmark</h2>

    <section>
      <button id="reset" (click)="reset()">Reset</button>
      <button id="init" (click)="init()">Init</button>
      <button id="run" (click)="runAll()">Run All</button>
    </section>

    <benchmark-area>
      <benchmarkable-expanding-row></benchmarkable-expanding-row>
    </benchmark-area>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _expandingRow_decorators;
    let _expandingRow_initializers = [];
    let _expandingRow_extraInitializers = [];
    var InitializationRoot = _classThis = class {
        ngAfterViewInit() { }
        reset() {
            this.expandingRow.reset();
        }
        init() {
            this.expandingRow.init();
        }
        runAll() {
            return __awaiter(this, void 0, void 0, function* () {
                yield execTimed('initialization_benchmark', () => __awaiter(this, void 0, void 0, function* () {
                    yield this.doInit();
                }));
            });
        }
        handleInitClick() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.doInit();
            });
        }
        doInit() {
            return __awaiter(this, void 0, void 0, function* () {
                yield execTimed('initial_load', () => __awaiter(this, void 0, void 0, function* () {
                    this.expandingRow.init();
                }));
            });
        }
        constructor() {
            this.expandingRow = __runInitializers(this, _expandingRow_initializers, void 0);
            __runInitializers(this, _expandingRow_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "InitializationRoot");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _expandingRow_decorators = [(0, core_1.ViewChild)(benchmarkable_expanding_row_1.BenchmarkableExpandingRow, { static: true })];
        __esDecorate(null, null, _expandingRow_decorators, { kind: "field", name: "expandingRow", static: false, private: false, access: { has: obj => "expandingRow" in obj, get: obj => obj.expandingRow, set: (obj, value) => { obj.expandingRow = value; } }, metadata: _metadata }, _expandingRow_initializers, _expandingRow_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InitializationRoot = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InitializationRoot = _classThis;
})();
exports.InitializationRoot = InitializationRoot;
let ExpandingRowBenchmarkModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [InitializationRoot],
            exports: [InitializationRoot],
            imports: [common_1.CommonModule, benchmarkable_expanding_row_module_1.BenchmarkableExpandingRowModule, benchmark_module_1.BenchmarkModule, platform_browser_1.BrowserModule],
            bootstrap: [InitializationRoot],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExpandingRowBenchmarkModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ExpandingRowBenchmarkModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpandingRowBenchmarkModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpandingRowBenchmarkModule = _classThis;
})();
exports.ExpandingRowBenchmarkModule = ExpandingRowBenchmarkModule;
function execTimed(description, func) {
    return __awaiter(this, void 0, void 0, function* () {
        console.time(description);
        yield func();
        yield nextTick(200);
        console.timeEnd(description);
    });
}
function nextTick() {
    return __awaiter(this, arguments, void 0, function* (delay = 1) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, delay);
        });
    });
}
