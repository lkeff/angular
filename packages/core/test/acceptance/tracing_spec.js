"use strict";
/*!
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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
describe('TracingService', () => {
    let actions;
    let listeners;
    let fakeSnapshot;
    let mockTracingService;
    let clickCount;
    beforeEach(() => {
        actions = [];
        listeners = [];
        clickCount = 0;
        fakeSnapshot = {
            run: function (action, fn) {
                actions.push(action);
                return fn();
            },
            dispose() { },
        };
        mockTracingService = {
            snapshot: jasmine.createSpy('snapshot').and.returnValue(fakeSnapshot),
            wrapEventListener: jasmine
                .createSpy('wrapEventListener')
                .and.callFake((_element, event, handler) => {
                if (event === 'click') {
                    const originalHandler = handler;
                    handler = function () {
                        clickCount++;
                        originalHandler.apply(this, arguments);
                    };
                }
                listeners.push({ event, handler });
                return handler;
            }),
        };
    });
    it('should take a snapshot after change detection', () => {
        testing_1.TestBed.configureTestingModule({
            providers: [{ provide: core_1.ɵTracingService, useValue: mockTracingService }],
        });
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        expect(mockTracingService.snapshot).not.toHaveBeenCalled();
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();
        expect(mockTracingService.snapshot).toHaveBeenCalledTimes(1);
        expect(actions).toEqual([core_1.ɵTracingAction.CHANGE_DETECTION]);
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();
        expect(mockTracingService.snapshot).toHaveBeenCalledTimes(2);
        expect(actions).toEqual([core_1.ɵTracingAction.CHANGE_DETECTION, core_1.ɵTracingAction.CHANGE_DETECTION]);
    });
    it('should take a snapshot after `afterRender`', (0, testing_1.fakeAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [{ provide: core_1.ɵTracingService, useValue: mockTracingService }],
        });
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    (0, core_1.afterEveryRender)(() => { });
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();
        expect(mockTracingService.snapshot).toHaveBeenCalledTimes(4);
        expect(actions).toEqual([
            core_1.ɵTracingAction.CHANGE_DETECTION,
            core_1.ɵTracingAction.CHANGE_DETECTION,
            core_1.ɵTracingAction.AFTER_NEXT_RENDER,
        ]);
    }));
    it('should be able to wrap event listeners through the tracing service', (0, testing_1.fakeAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [{ provide: core_1.ɵTracingService, useValue: mockTracingService }],
        });
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '<button (click)="noop()"></button> <span (mousedown)="noop()"></span>' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                noop() { }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(listeners).toEqual([
            { event: 'click', handler: jasmine.any(Function) },
            { event: 'mousedown', handler: jasmine.any(Function) },
        ]);
        expect(clickCount).toBe(0);
        fixture.nativeElement.querySelector('button').click();
        fixture.detectChanges();
        expect(clickCount).toBe(1);
    }));
});
