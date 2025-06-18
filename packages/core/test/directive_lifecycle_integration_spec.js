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
const core_1 = require("../src/core");
const testing_1 = require("../testing");
const testing_internal_1 = require("../testing/src/testing_internal");
describe('directive lifecycle integration spec', () => {
    let log;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [LifecycleCmp, LifecycleDir, MyComp5],
            providers: [testing_internal_1.Log],
        }).overrideComponent(MyComp5, { set: { template: '<div [field]="123" lifecycle></div>' } });
    });
    beforeEach((0, testing_1.inject)([testing_internal_1.Log], (_log) => {
        log = _log;
    }));
    it('should invoke lifecycle methods ngOnChanges > ngOnInit > ngDoCheck > ngAfterContentChecked', () => {
        const fixture = testing_1.TestBed.createComponent(MyComp5);
        fixture.detectChanges();
        expect(log.result()).toEqual('ngOnChanges; ngOnInit; ngDoCheck; ngAfterContentInit; ngAfterContentChecked; child_ngDoCheck; ' +
            'ngAfterViewInit; ngAfterViewChecked');
        log.clear();
        fixture.detectChanges();
        expect(log.result()).toEqual('ngDoCheck; ngAfterContentChecked; child_ngDoCheck; ngAfterViewChecked');
    });
});
let LifecycleDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[lifecycle-dir]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LifecycleDir = _classThis = class {
        constructor(_log) {
            this._log = _log;
        }
        ngDoCheck() {
            this._log.add('child_ngDoCheck');
        }
    };
    __setFunctionName(_classThis, "LifecycleDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LifecycleDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LifecycleDir = _classThis;
})();
let LifecycleCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: '[lifecycle]',
            inputs: ['field'],
            template: `<div lifecycle-dir></div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LifecycleCmp = _classThis = class {
        constructor(_log) {
            this._log = _log;
            this.field = 0;
        }
        ngOnChanges() {
            this._log.add('ngOnChanges');
        }
        ngOnInit() {
            this._log.add('ngOnInit');
        }
        ngDoCheck() {
            this._log.add('ngDoCheck');
        }
        ngAfterContentInit() {
            this._log.add('ngAfterContentInit');
        }
        ngAfterContentChecked() {
            this._log.add('ngAfterContentChecked');
        }
        ngAfterViewInit() {
            this._log.add('ngAfterViewInit');
        }
        ngAfterViewChecked() {
            this._log.add('ngAfterViewChecked');
        }
    };
    __setFunctionName(_classThis, "LifecycleCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LifecycleCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LifecycleCmp = _classThis;
})();
let MyComp5 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-comp',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyComp5 = _classThis = class {
    };
    __setFunctionName(_classThis, "MyComp5");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyComp5 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyComp5 = _classThis;
})();
