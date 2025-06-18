"use strict";
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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const animations_1 = require("@angular/animations");
const browser_1 = require("@angular/animations/browser");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
describe('NoopAnimationsModule', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ imports: [index_1.NoopAnimationsModule] });
    });
    noopAnimationTests();
});
describe('BrowserAnimationsModule with disableAnimations = true', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.BrowserAnimationsModule.withConfig({ disableAnimations: true })],
        });
    });
    noopAnimationTests();
});
describe('provideNoopAnimations()', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ providers: [(0, index_1.provideNoopAnimations)()] });
    });
    noopAnimationTests();
});
function noopAnimationTests() {
    it('should flush and fire callbacks when the zone becomes stable', (done) => {
        // This test is only meant to be run inside the browser.
        if (isNode) {
            done();
            return;
        }
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-cmp',
                    template: '<div [@myAnimation]="exp" (@myAnimation.start)="onStart($event)" (@myAnimation.done)="onDone($event)"></div>',
                    animations: [
                        (0, animations_1.trigger)('myAnimation', [
                            (0, animations_1.transition)('* => state', [
                                (0, animations_1.style)({ 'opacity': '0' }),
                                (0, animations_1.animate)(500, (0, animations_1.style)({ 'opacity': '1' })),
                            ]),
                        ]),
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                onStart(event) {
                    this.startEvent = event;
                }
                onDone(event) {
                    this.doneEvent = event;
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        cmp.exp = 'state';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(cmp.startEvent.triggerName).toEqual('myAnimation');
            expect(cmp.startEvent.phaseName).toEqual('start');
            expect(cmp.doneEvent.triggerName).toEqual('myAnimation');
            expect(cmp.doneEvent.phaseName).toEqual('done');
            done();
        });
    });
    it('should handle leave animation callbacks even if the element is destroyed in the process', (async) => {
        // This test is only meant to be run inside the browser.
        if (isNode) {
            async();
            return;
        }
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-cmp',
                    template: '<div *ngIf="exp" @myAnimation (@myAnimation.start)="onStart($event)" (@myAnimation.done)="onDone($event)"></div>',
                    animations: [
                        (0, animations_1.trigger)('myAnimation', [
                            (0, animations_1.transition)(':leave', [(0, animations_1.style)({ 'opacity': '0' }), (0, animations_1.animate)(500, (0, animations_1.style)({ 'opacity': '1' }))]),
                        ]),
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                onStart(event) {
                    this.startEvent = event;
                }
                onDone(event) {
                    this.doneEvent = event;
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
        const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        cmp.exp = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            cmp.startEvent = null;
            cmp.doneEvent = null;
            cmp.exp = false;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(cmp.startEvent.triggerName).toEqual('myAnimation');
                expect(cmp.startEvent.phaseName).toEqual('start');
                expect(cmp.startEvent.toState).toEqual('void');
                expect(cmp.doneEvent.triggerName).toEqual('myAnimation');
                expect(cmp.doneEvent.phaseName).toEqual('done');
                expect(cmp.doneEvent.toState).toEqual('void');
                async();
            });
        });
    });
}
