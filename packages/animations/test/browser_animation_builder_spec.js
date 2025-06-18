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
const animations_1 = require("../src/animations");
const browser_1 = require("../browser");
const testing_1 = require("../browser/testing");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const animations_2 = require("@angular/platform-browser/animations");
const async_1 = require("@angular/platform-browser/animations/async");
const testing_3 = require("@angular/platform-browser/testing");
describe('BrowserAnimationBuilder', () => {
    if (isNode) {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
        return;
    }
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            providers: [{ provide: browser_1.AnimationDriver, useClass: testing_1.MockAnimationDriver }],
        });
    });
    it('should inject AnimationBuilder into a component', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'ani-cmp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor(builder) {
                    this.builder = builder;
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
        testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
        const fixture = testing_2.TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        fixture.detectChanges();
        expect(cmp.builder instanceof animations_1.ɵBrowserAnimationBuilder).toBeTruthy();
    });
    it("should listen on start and done on the animation builder's player after it has been reset", (0, testing_2.fakeAsync)(() => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'ani-cmp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _target_decorators;
            let _target_initializers = [];
            let _target_extraInitializers = [];
            var Cmp = _classThis = class {
                constructor(builder) {
                    this.builder = builder;
                    this.target = __runInitializers(this, _target_initializers, void 0);
                    __runInitializers(this, _target_extraInitializers);
                    this.builder = builder;
                }
                build() {
                    const definition = this.builder.build([
                        (0, animations_1.style)({ opacity: 0 }),
                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                    ]);
                    return definition.create(this.target);
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _target_decorators = [(0, core_1.ViewChild)('target')];
                __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
        const fixture = testing_2.TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        fixture.detectChanges();
        const player = cmp.build();
        let startedCount = 0;
        player.onStart(() => startedCount++);
        let finishedCount = 0;
        player.onDone(() => finishedCount++);
        player.init();
        (0, testing_2.flushMicrotasks)();
        expect(startedCount).toEqual(0);
        expect(finishedCount).toEqual(0);
        player.play();
        (0, testing_2.flushMicrotasks)();
        expect(startedCount).toEqual(1);
        expect(finishedCount).toEqual(0);
        player.finish();
        (0, testing_2.flushMicrotasks)();
        expect(startedCount).toEqual(1);
        expect(finishedCount).toEqual(1);
        player.play();
        player.finish();
        (0, testing_2.flushMicrotasks)();
        expect(startedCount).toEqual(1);
        expect(finishedCount).toEqual(1);
        [0, 1, 2, 3].forEach((i) => {
            player.reset();
            player.play();
            (0, testing_2.flushMicrotasks)();
            expect(startedCount).toEqual(i + 2);
            expect(finishedCount).toEqual(i + 1);
            player.finish();
            (0, testing_2.flushMicrotasks)();
            expect(startedCount).toEqual(i + 2);
            expect(finishedCount).toEqual(i + 2);
        });
    }));
    it("should listen on start and done on the animation builder's player", (0, testing_2.fakeAsync)(() => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'ani-cmp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _target_decorators;
            let _target_initializers = [];
            let _target_extraInitializers = [];
            var Cmp = _classThis = class {
                constructor(builder) {
                    this.builder = builder;
                    this.target = __runInitializers(this, _target_initializers, void 0);
                    __runInitializers(this, _target_extraInitializers);
                    this.builder = builder;
                }
                build() {
                    const definition = this.builder.build([
                        (0, animations_1.style)({ opacity: 0 }),
                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                    ]);
                    return definition.create(this.target);
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _target_decorators = [(0, core_1.ViewChild)('target')];
                __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
        const fixture = testing_2.TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        fixture.detectChanges();
        const player = cmp.build();
        let started = false;
        player.onStart(() => (started = true));
        let finished = false;
        player.onDone(() => (finished = true));
        let destroyed = false;
        player.onDestroy(() => (destroyed = true));
        player.init();
        (0, testing_2.flushMicrotasks)();
        expect(started).toBeFalsy();
        expect(finished).toBeFalsy();
        expect(destroyed).toBeFalsy();
        player.play();
        (0, testing_2.flushMicrotasks)();
        expect(started).toBeTruthy();
        expect(finished).toBeFalsy();
        expect(destroyed).toBeFalsy();
        player.finish();
        (0, testing_2.flushMicrotasks)();
        expect(started).toBeTruthy();
        expect(finished).toBeTruthy();
        expect(destroyed).toBeFalsy();
        player.destroy();
        (0, testing_2.flushMicrotasks)();
        expect(started).toBeTruthy();
        expect(finished).toBeTruthy();
        expect(destroyed).toBeTruthy();
    }));
    it('should update `hasStarted()` on `play()` and `reset()`', (0, testing_2.fakeAsync)(() => {
        let CmpAnother = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'ani-another-cmp',
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _target_decorators;
            let _target_initializers = [];
            let _target_extraInitializers = [];
            var CmpAnother = _classThis = class {
                constructor(builder) {
                    this.builder = builder;
                    this.target = __runInitializers(this, _target_initializers, void 0);
                    __runInitializers(this, _target_extraInitializers);
                    this.builder = builder;
                }
                build() {
                    const definition = this.builder.build([
                        (0, animations_1.style)({ opacity: 0 }),
                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                    ]);
                    return definition.create(this.target);
                }
            };
            __setFunctionName(_classThis, "CmpAnother");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _target_decorators = [(0, core_1.ViewChild)('target')];
                __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CmpAnother = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CmpAnother = _classThis;
        })();
        testing_2.TestBed.configureTestingModule({ declarations: [CmpAnother] });
        const fixture = testing_2.TestBed.createComponent(CmpAnother);
        const cmp = fixture.componentInstance;
        fixture.detectChanges();
        const player = cmp.build();
        expect(player.hasStarted()).toBeFalsy();
        (0, testing_2.flushMicrotasks)();
        player.play();
        (0, testing_2.flushMicrotasks)();
        expect(player.hasStarted()).toBeTruthy();
        player.reset();
        (0, testing_2.flushMicrotasks)();
        expect(player.hasStarted()).toBeFalsy();
    }));
    describe('without Animations enabled', () => {
        beforeEach(() => {
            // We need to reset the test environment because
            // browser_tests.init.ts inits the environment with the NoopAnimationsModule
            testing_2.TestBed.resetTestEnvironment();
            testing_2.TestBed.initTestEnvironment([testing_3.BrowserTestingModule], (0, testing_3.platformBrowserTesting)());
        });
        it('should throw an error when injecting AnimationBuilder without animation providers set', () => {
            expect(() => testing_2.TestBed.inject(animations_1.AnimationBuilder)).toThrowError(/Angular detected that the `AnimationBuilder` was injected/);
        });
        afterEach(() => {
            // We're reset the test environment to their default values, cf browser_tests.init.ts
            testing_2.TestBed.resetTestEnvironment();
            testing_2.TestBed.initTestEnvironment([testing_3.BrowserTestingModule, animations_2.NoopAnimationsModule], (0, testing_3.platformBrowserTesting)());
        });
    });
    describe('with Animations async', () => {
        beforeEach(() => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.RendererFactory2,
                        useFactory: (doc, renderer, zone) => {
                            // Using a empty promise to prevent switching to the delegate to  AnimationRenderer
                            return new async_1.ɵAsyncAnimationRendererFactory(doc, renderer, zone, 'noop', new Promise(() => { }));
                        },
                        deps: [common_1.DOCUMENT, platform_browser_1.ɵDomRendererFactory2, core_1.NgZone],
                    },
                ],
            });
        });
        it('should be able to build', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _target_decorators;
                let _target_initializers = [];
                let _target_extraInitializers = [];
                var Cmp = _classThis = class {
                    constructor(builder) {
                        this.builder = builder;
                        this.target = __runInitializers(this, _target_initializers, void 0);
                        __runInitializers(this, _target_extraInitializers);
                        this.builder = builder;
                    }
                    build() {
                        const definition = this.builder.build([(0, animations_1.style)({ 'transform': `rotate(0deg)` })]);
                        return definition.create(this.target);
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _target_decorators = [(0, core_1.ViewChild)('target')];
                    __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
            const fixture = testing_2.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            fixture.detectChanges();
            cmp.build();
        });
    });
});
