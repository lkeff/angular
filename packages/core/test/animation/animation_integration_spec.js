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
const testing_1 = require("@angular/animations/browser/testing");
const core_1 = require("../../src/core");
const testing_2 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const animations_2 = require("@angular/platform-browser/animations");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const DEFAULT_NAMESPACE_ID = 'id';
const DEFAULT_COMPONENT_ID = '1';
(function () {
    // these tests are only meant to be run within the DOM (for now)
    if (isNode)
        return;
    describe('animation tests', function () {
        function getLog() {
            return testing_1.MockAnimationDriver.log;
        }
        function resetLog() {
            testing_1.MockAnimationDriver.log = [];
        }
        beforeEach(() => {
            resetLog();
            testing_2.TestBed.configureTestingModule({
                providers: [{ provide: browser_1.AnimationDriver, useClass: testing_1.MockAnimationDriver }],
                imports: [animations_2.BrowserAnimationsModule],
            });
        });
        describe('animation modules', function () {
            it('should hint at BrowserAnimationsModule being used', () => {
                testing_2.TestBed.resetTestingModule();
                testing_2.TestBed.configureTestingModule({
                    declarations: [SharedAnimationCmp],
                    imports: [animations_2.BrowserAnimationsModule],
                });
                const fixture = testing_2.TestBed.createComponent(SharedAnimationCmp);
                expect(fixture.componentInstance.animationType).toEqual('BrowserAnimations');
            });
            it('should hint at NoopAnimationsModule being used', () => {
                testing_2.TestBed.resetTestingModule();
                testing_2.TestBed.configureTestingModule({
                    declarations: [SharedAnimationCmp],
                    imports: [animations_2.NoopAnimationsModule],
                });
                const fixture = testing_2.TestBed.createComponent(SharedAnimationCmp);
                expect(fixture.componentInstance.animationType).toEqual('NoopAnimations');
            });
            it('should hint at NoopAnimationsModule being used when BrowserAnimationsModule is provided with disabled animations', () => {
                testing_2.TestBed.resetTestingModule();
                testing_2.TestBed.configureTestingModule({
                    declarations: [SharedAnimationCmp],
                    imports: [animations_2.BrowserAnimationsModule.withConfig({ disableAnimations: true })],
                });
                const fixture = testing_2.TestBed.createComponent(SharedAnimationCmp);
                expect(fixture.componentInstance.animationType).toEqual('NoopAnimations');
            });
        });
        let SharedAnimationCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<p>template text</p>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SharedAnimationCmp = _classThis = class {
                constructor(animationType) {
                    this.animationType = animationType;
                }
            };
            __setFunctionName(_classThis, "SharedAnimationCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SharedAnimationCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SharedAnimationCmp = _classThis;
        })();
        describe('fakeAsync testing', () => {
            it('should only require one flushMicrotasks call to kick off animation callbacks', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
            <div [@myAnimation]="exp" (@myAnimation.start)="cb('start')" (@myAnimation.done)="cb('done')"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => on, * => off', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
                            this.status = '';
                        }
                        cb(status) {
                            this.status = status;
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
                cmp.exp = 'on';
                fixture.detectChanges();
                expect(cmp.status).toEqual('');
                (0, testing_2.flushMicrotasks)();
                expect(cmp.status).toEqual('start');
                let player = testing_1.MockAnimationDriver.log.pop();
                player.finish();
                expect(cmp.status).toEqual('done');
                cmp.status = '';
                cmp.exp = 'off';
                fixture.detectChanges();
                expect(cmp.status).toEqual('');
                player = testing_1.MockAnimationDriver.log.pop();
                player.finish();
                expect(cmp.status).toEqual('');
                (0, testing_2.flushMicrotasks)();
                expect(cmp.status).toEqual('done');
            }));
            it('should always run .start callbacks before .done callbacks even for noop animations', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
                <div [@myAnimation]="exp" (@myAnimation.start)="cb('start')" (@myAnimation.done)="cb('done')"></div>
          `,
                            animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('* => go', [])])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
                            this.log = [];
                        }
                        cb(status) {
                            this.log.push(status);
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
                cmp.exp = 'go';
                fixture.detectChanges();
                expect(cmp.log).toEqual([]);
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['start', 'done']);
            }));
            it('should emit the correct totalTime value for a noop-animation', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
                <div [@myAnimation]="exp" (@myAnimation.start)="cb($event)" (@myAnimation.done)="cb($event)"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('* => go', [(0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 0 }))])]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
                            this.log = [];
                        }
                        cb(event) {
                            this.log.push(event);
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
                testing_2.TestBed.configureTestingModule({
                    declarations: [Cmp],
                    providers: [{ provide: browser_1.AnimationDriver, useClass: browser_1.NoopAnimationDriver }],
                });
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'go';
                fixture.detectChanges();
                expect(cmp.log).toEqual([]);
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log.length).toEqual(2);
                const [start, end] = cmp.log;
                expect(start.totalTime).toEqual(1000);
                expect(end.totalTime).toEqual(1000);
            }));
        });
        describe('component fixture integration', () => {
            describe('whenRenderingDone', () => {
                it('should wait until the animations are finished until continuing', (0, testing_2.fakeAsync)(() => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'cmp',
                                template: `
              <div [@myAnimation]="exp"></div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('* => on', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))])]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = false;
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
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(Cmp);
                    const cmp = fixture.componentInstance;
                    let isDone = false;
                    fixture.whenRenderingDone().then(() => (isDone = true));
                    expect(isDone).toBe(false);
                    cmp.exp = 'on';
                    fixture.detectChanges();
                    engine.flush();
                    expect(isDone).toBe(false);
                    const players = engine.players;
                    expect(players.length).toEqual(1);
                    players[0].finish();
                    expect(isDone).toBe(false);
                    (0, testing_2.flushMicrotasks)();
                    expect(isDone).toBe(true);
                }));
                it('should wait for a noop animation to finish before continuing', (0, testing_2.fakeAsync)(() => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'cmp',
                                template: `
              <div [@myAnimation]="exp"></div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('* => on', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))])]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = false;
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
                    testing_2.TestBed.configureTestingModule({
                        providers: [{ provide: browser_1.AnimationDriver, useClass: browser_1.NoopAnimationDriver }],
                        declarations: [Cmp],
                    });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(Cmp);
                    const cmp = fixture.componentInstance;
                    let isDone = false;
                    fixture.whenRenderingDone().then(() => (isDone = true));
                    expect(isDone).toBe(false);
                    cmp.exp = 'off';
                    fixture.detectChanges();
                    engine.flush();
                    expect(isDone).toBe(false);
                    (0, testing_2.flushMicrotasks)();
                    expect(isDone).toBe(true);
                }));
                it('should wait for active animations to finish even if they have already started', (0, testing_2.fakeAsync)(() => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'cmp',
                                template: `
                <div [@myAnimation]="exp"></div>
              `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('* => on', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))])]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = false;
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
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(Cmp);
                    const cmp = fixture.componentInstance;
                    cmp.exp = 'on';
                    fixture.detectChanges();
                    engine.flush();
                    const players = engine.players;
                    expect(players.length).toEqual(1);
                    let isDone = false;
                    fixture.whenRenderingDone().then(() => (isDone = true));
                    (0, testing_2.flushMicrotasks)();
                    expect(isDone).toBe(false);
                    players[0].finish();
                    (0, testing_2.flushMicrotasks)();
                    expect(isDone).toBe(true);
                }));
            });
        });
        describe('animation triggers', () => {
            it('should trigger a state change animation from void => state', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div *ngIf="exp" [@myAnimation]="exp"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('void => *', [
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
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(1);
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['opacity', '0'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['opacity', '1'],
                    ]),
                ]);
            });
            // https://github.com/angular/angular/issues/32794
            it('should support nested animation triggers', () => {
                const REUSABLE_ANIMATION = [
                    (0, animations_1.trigger)('myAnimation', [
                        (0, animations_1.transition)('void => *', [
                            (0, animations_1.style)({ 'opacity': '0' }),
                            (0, animations_1.animate)(500, (0, animations_1.style)({ 'opacity': '1' })),
                        ]),
                    ]),
                ];
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div @myAnimation></div>
        `,
                            animations: [REUSABLE_ANIMATION],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(1);
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['opacity', '0'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['opacity', '1'],
                    ]),
                ]);
            });
            it('should allow a transition to use a function to determine what method to run', () => {
                let valueToMatch = '';
                let capturedElement;
                const transitionFn = (fromState, toState, element) => {
                    capturedElement = element;
                    return toState == valueToMatch;
                };
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: '<div #element [@myAnimation]="exp"></div>',
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)(transitionFn, [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1234, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _element_decorators;
                    let _element_initializers = [];
                    let _element_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.element = __runInitializers(this, _element_initializers, void 0);
                            this.exp = (__runInitializers(this, _element_extraInitializers), '');
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _element_decorators = [(0, core_1.ViewChild)('element')];
                        __esDecorate(null, null, _element_decorators, { kind: "field", name: "element", static: false, private: false, access: { has: obj => "element" in obj, get: obj => obj.element, set: (obj, value) => { obj.element = value; } }, metadata: _metadata }, _element_initializers, _element_extraInitializers);
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
                valueToMatch = cmp.exp = 'something';
                fixture.detectChanges();
                const element = cmp.element.nativeElement;
                let players = getLog();
                expect(players.length).toEqual(1);
                let [p1] = players;
                expect(p1.totalTime).toEqual(1234);
                expect(capturedElement).toEqual(element);
                resetLog();
                valueToMatch = 'something-else';
                cmp.exp = 'this-wont-match';
                fixture.detectChanges();
                players = getLog();
                expect(players.length).toEqual(0);
            });
            it('should allow a transition to use a function to determine what method to run and expose any parameter values', () => {
                const transitionFn = (fromState, toState, element, params) => {
                    return params['doMatch'] == true;
                };
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: '<div [@myAnimation]="{value:exp, params: {doMatch:doMatch}}"></div>',
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)(transitionFn, [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(3333, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.doMatch = false;
                            this.exp = '';
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
                cmp.doMatch = true;
                fixture.detectChanges();
                let players = getLog();
                expect(players.length).toEqual(1);
                let [p1] = players;
                expect(p1.totalTime).toEqual(3333);
                resetLog();
                cmp.doMatch = false;
                cmp.exp = 'this-wont-match';
                fixture.detectChanges();
                players = getLog();
                expect(players.length).toEqual(0);
            });
            it('should allow a state value to be `0`', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
            <div [@myAnimation]="exp"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('0 => 1', [
                                        (0, animations_1.style)({ height: '0px' }),
                                        (0, animations_1.animate)(1234, (0, animations_1.style)({ height: '100px' })),
                                    ]),
                                    (0, animations_1.transition)('* => 1', [(0, animations_1.style)({ width: '0px' }), (0, animations_1.animate)(4567, (0, animations_1.style)({ width: '100px' }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 0;
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp = 1;
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(1);
                const player = getLog().pop();
                expect(player.duration).toEqual(1234);
            });
            it('should always cancel the previous transition if a follow-up transition is not matched', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div [@myAnimation]="exp" (@myAnimation.start)="callback($event)" (@myAnimation.done)="callback($event)"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('a => b', [
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
                        callback(event) {
                            if (event.phaseName == 'done') {
                                this.doneEvent = event;
                            }
                            else {
                                this.startEvent = event;
                            }
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'a';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(0);
                expect(engine.players.length).toEqual(0);
                (0, testing_2.flushMicrotasks)();
                expect(cmp.startEvent.toState).toEqual('a');
                expect(cmp.startEvent.totalTime).toEqual(0);
                expect(cmp.startEvent.toState).toEqual('a');
                expect(cmp.startEvent.totalTime).toEqual(0);
                resetLog();
                cmp.exp = 'b';
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(1);
                expect(engine.players.length).toEqual(1);
                (0, testing_2.flushMicrotasks)();
                expect(cmp.startEvent.toState).toEqual('b');
                expect(cmp.startEvent.totalTime).toEqual(500);
                expect(cmp.startEvent.toState).toEqual('b');
                expect(cmp.startEvent.totalTime).toEqual(500);
                resetLog();
                let completed = false;
                players[0].onDone(() => (completed = true));
                cmp.exp = 'c';
                fixture.detectChanges();
                engine.flush();
                expect(engine.players.length).toEqual(0);
                expect(getLog().length).toEqual(0);
                (0, testing_2.flushMicrotasks)();
                expect(cmp.startEvent.toState).toEqual('c');
                expect(cmp.startEvent.totalTime).toEqual(0);
                expect(cmp.startEvent.toState).toEqual('c');
                expect(cmp.startEvent.totalTime).toEqual(0);
                expect(completed).toBe(true);
            }));
            it('should always fire inner callbacks even if no animation is fired when a view is inserted', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div *ngIf="exp">
            <div @myAnimation (@myAnimation.start)="track($event)" (@myAnimation.done)="track($event)"></div>
          </div>
        `,
                            animations: [(0, animations_1.trigger)('myAnimation', [])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
                            this.log = [];
                        }
                        track(event) {
                            this.log.push(`${event.triggerName}-${event.phaseName}`);
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual([]);
                cmp.exp = true;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['myAnimation-start', 'myAnimation-done']);
            }));
            it('should only turn a view removal as into `void` state transition', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div *ngIf="exp1" [@myAnimation]="exp2"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('void <=> *', [
                                        (0, animations_1.style)({ width: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '100px' })),
                                    ]),
                                    (0, animations_1.transition)('* => *', [
                                        (0, animations_1.style)({ height: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp1 = false;
                            this.exp2 = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                function resetState() {
                    cmp.exp2 = 'something';
                    fixture.detectChanges();
                    engine.flush();
                    resetLog();
                }
                cmp.exp1 = true;
                cmp.exp2 = null;
                fixture.detectChanges();
                engine.flush();
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['width', '0px'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['width', '100px'],
                    ]),
                ]);
                resetState();
                cmp.exp2 = false;
                fixture.detectChanges();
                engine.flush();
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['height', '0px'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['height', '100px'],
                    ]),
                ]);
                resetState();
                cmp.exp2 = 0;
                fixture.detectChanges();
                engine.flush();
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['height', '0px'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['height', '100px'],
                    ]),
                ]);
                resetState();
                cmp.exp2 = '';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['height', '0px'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['height', '100px'],
                    ]),
                ]);
                resetState();
                cmp.exp2 = undefined;
                fixture.detectChanges();
                engine.flush();
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['height', '0px'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['height', '100px'],
                    ]),
                ]);
                resetState();
                cmp.exp1 = false;
                cmp.exp2 = 'abc';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['width', '0px'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['width', '100px'],
                    ]),
                ]);
            });
            it('should stringify boolean triggers to `1` and `0`', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div [@myAnimation]="exp"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('void => 1', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                    (0, animations_1.transition)('1 => 0', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['opacity', '0'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['opacity', '1'],
                    ]),
                ]);
                cmp.exp = false;
                fixture.detectChanges();
                engine.flush();
                expect(getLog().pop().keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['opacity', '1'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['opacity', '0'],
                    ]),
                ]);
            });
            it('should understand boolean values as `true` and `false` for transition animations', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div [@myAnimation]="exp"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('true => false', [
                                        (0, animations_1.style)({ opacity: 0 }),
                                        (0, animations_1.animate)(1234, (0, animations_1.style)({ opacity: 1 })),
                                    ]),
                                    (0, animations_1.transition)('false => true', [
                                        (0, animations_1.style)({ opacity: 1 }),
                                        (0, animations_1.animate)(4567, (0, animations_1.style)({ opacity: 0 })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                cmp.exp = false;
                fixture.detectChanges();
                let players = getLog();
                expect(players.length).toEqual(1);
                let [player] = players;
                expect(player.duration).toEqual(1234);
            });
            it('should understand boolean values as `true` and `false` for transition animations and apply the corresponding state() value', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div [@myAnimation]="exp"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.state)('true', (0, animations_1.style)({ color: 'red' })),
                                    (0, animations_1.state)('false', (0, animations_1.style)({ color: 'blue' })),
                                    (0, animations_1.transition)('true <=> false', [(0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'gold' })), (0, animations_1.animate)(1000)]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = false;
                fixture.detectChanges();
                cmp.exp = true;
                fixture.detectChanges();
                let players = getLog();
                expect(players.length).toEqual(1);
                let [player] = players;
                expect(player.keyframes).toEqual([
                    new Map([
                        ['color', 'blue'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['color', 'gold'],
                        ['offset', 0.5],
                    ]),
                    new Map([
                        ['color', 'red'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should not throw an error if a trigger with the same name exists in separate components', () => {
                let Cmp1 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp1',
                            template: '...',
                            animations: [(0, animations_1.trigger)('trig', [])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp1 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Cmp1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp1 = _classThis;
                })();
                let Cmp2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp2',
                            template: '...',
                            animations: [(0, animations_1.trigger)('trig', [])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Cmp2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp2 = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [Cmp1, Cmp2] });
                const cmp1 = testing_2.TestBed.createComponent(Cmp1);
                const cmp2 = testing_2.TestBed.createComponent(Cmp2);
            });
            describe('host bindings', () => {
                it('should trigger a state change animation from state => state on the component host element', (0, testing_2.fakeAsync)(() => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-cmp',
                                template: '...',
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('a => b', [
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
                        let _exp_decorators;
                        let _exp_initializers = [];
                        let _exp_extraInitializers = [];
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = __runInitializers(this, _exp_initializers, 'a');
                                __runInitializers(this, _exp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "Cmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _exp_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                            __esDecorate(null, null, _exp_decorators, { kind: "field", name: "exp", static: false, private: false, access: { has: obj => "exp" in obj, get: obj => obj.exp, set: (obj, value) => { obj.exp = value; } }, metadata: _metadata }, _exp_initializers, _exp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Cmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Cmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(Cmp);
                    const cmp = fixture.componentInstance;
                    fixture.detectChanges();
                    engine.flush();
                    expect(getLog().length).toEqual(0);
                    cmp.exp = 'b';
                    fixture.detectChanges();
                    engine.flush();
                    expect(getLog().length).toEqual(1);
                    const data = getLog().pop();
                    expect(data.element).toEqual(fixture.elementRef.nativeElement);
                    expect(data.keyframes).toEqual([
                        new Map([
                            ['offset', 0],
                            ['opacity', '0'],
                        ]),
                        new Map([
                            ['offset', 1],
                            ['opacity', '1'],
                        ]),
                    ]);
                }));
                it('should trigger a leave animation when the inner has ViewContainerRef injected', (0, testing_2.fakeAsync)(() => {
                    let ParentCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                template: `
             <child-cmp *ngIf="exp"></child-cmp>
           `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentCmp = _classThis = class {
                            constructor() {
                                this.exp = true;
                            }
                        };
                        __setFunctionName(_classThis, "ParentCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentCmp = _classThis;
                    })();
                    let ChildCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child-cmp',
                                template: '...',
                                animations: [
                                    (0, animations_1.trigger)('host', [
                                        (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _hostAnimation_decorators;
                        let _hostAnimation_initializers = [];
                        let _hostAnimation_extraInitializers = [];
                        var ChildCmp = _classThis = class {
                            constructor(vcr) {
                                this.vcr = vcr;
                                this.hostAnimation = __runInitializers(this, _hostAnimation_initializers, true);
                                __runInitializers(this, _hostAnimation_extraInitializers);
                                this.vcr = vcr;
                            }
                        };
                        __setFunctionName(_classThis, "ChildCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _hostAnimation_decorators = [(0, core_1.HostBinding)('@host')];
                            __esDecorate(null, null, _hostAnimation_decorators, { kind: "field", name: "hostAnimation", static: false, private: false, access: { has: obj => "hostAnimation" in obj, get: obj => obj.hostAnimation, set: (obj, value) => { obj.hostAnimation = value; } }, metadata: _metadata }, _hostAnimation_initializers, _hostAnimation_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildCmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(ParentCmp);
                    const cmp = fixture.componentInstance;
                    fixture.detectChanges();
                    engine.flush();
                    expect(getLog().length).toEqual(0);
                    cmp.exp = false;
                    fixture.detectChanges();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(1);
                    engine.flush();
                    expect(getLog().length).toEqual(1);
                    const [player] = getLog();
                    expect(player.keyframes).toEqual([
                        new Map([
                            ['opacity', '1'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '0'],
                            ['offset', 1],
                        ]),
                    ]);
                    player.finish();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(0);
                }));
                it('should trigger a leave animation when the inner components host binding updates', (0, testing_2.fakeAsync)(() => {
                    let ParentCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                template: `
                <child-cmp *ngIf="exp"></child-cmp>
              `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentCmp = _classThis = class {
                            constructor() {
                                this.exp = true;
                            }
                        };
                        __setFunctionName(_classThis, "ParentCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentCmp = _classThis;
                    })();
                    let ChildCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child-cmp',
                                template: '...',
                                animations: [
                                    (0, animations_1.trigger)('host', [
                                        (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _hostAnimation_decorators;
                        let _hostAnimation_initializers = [];
                        let _hostAnimation_extraInitializers = [];
                        var ChildCmp = _classThis = class {
                            constructor() {
                                this.hostAnimation = __runInitializers(this, _hostAnimation_initializers, true);
                                __runInitializers(this, _hostAnimation_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "ChildCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _hostAnimation_decorators = [(0, core_1.HostBinding)('@host')];
                            __esDecorate(null, null, _hostAnimation_decorators, { kind: "field", name: "hostAnimation", static: false, private: false, access: { has: obj => "hostAnimation" in obj, get: obj => obj.hostAnimation, set: (obj, value) => { obj.hostAnimation = value; } }, metadata: _metadata }, _hostAnimation_initializers, _hostAnimation_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildCmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(ParentCmp);
                    const cmp = fixture.componentInstance;
                    fixture.detectChanges();
                    engine.flush();
                    expect(getLog().length).toEqual(0);
                    cmp.exp = false;
                    fixture.detectChanges();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(1);
                    engine.flush();
                    expect(getLog().length).toEqual(1);
                    const [player] = getLog();
                    expect(player.keyframes).toEqual([
                        new Map([
                            ['opacity', '1'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '0'],
                            ['offset', 1],
                        ]),
                    ]);
                    player.finish();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(0);
                }));
                it('should wait for child animations before removing parent', (0, testing_2.fakeAsync)(() => {
                    let ParentCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<child-cmp *ngIf="exp" @parentTrigger></child-cmp>',
                                animations: [
                                    (0, animations_1.trigger)('parentTrigger', [
                                        (0, animations_1.transition)(':leave', [(0, animations_1.group)([(0, animations_1.query)('@*', (0, animations_1.animateChild)())])]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentCmp = _classThis = class {
                            constructor() {
                                this.exp = true;
                            }
                        };
                        __setFunctionName(_classThis, "ParentCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentCmp = _classThis;
                    })();
                    let ChildCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child-cmp',
                                template: '<p @childTrigger>Hello there</p>',
                                animations: [
                                    (0, animations_1.trigger)('childTrigger', [
                                        (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)('200ms', (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ChildCmp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ChildCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildCmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(ParentCmp);
                    fixture.detectChanges();
                    engine.flush();
                    expect(getLog().length).toBe(0);
                    fixture.componentInstance.exp = false;
                    fixture.detectChanges();
                    expect(fixture.nativeElement.children.length).toBe(1);
                    engine.flush();
                    expect(getLog().length).toBe(2);
                    const player = getLog()[1];
                    expect(player.keyframes).toEqual([
                        new Map([
                            ['opacity', '1'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '0'],
                            ['offset', 1],
                        ]),
                    ]);
                    player.finish();
                    (0, testing_2.flushMicrotasks)();
                    expect(fixture.nativeElement.children.length).toBe(0);
                }));
                // animationRenderer => nonAnimationRenderer
                it('should trigger a leave animation when the outer components element binding updates on the host component element', (0, testing_2.fakeAsync)(() => {
                    let ParentCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                animations: [
                                    (0, animations_1.trigger)('host', [
                                        (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ],
                                template: `
                <child-cmp *ngIf="exp" @host></child-cmp>
              `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentCmp = _classThis = class {
                            constructor() {
                                this.exp = true;
                            }
                        };
                        __setFunctionName(_classThis, "ParentCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentCmp = _classThis;
                    })();
                    let ChildCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child-cmp',
                                template: '...',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ChildCmp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ChildCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildCmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(ParentCmp);
                    const cmp = fixture.componentInstance;
                    fixture.detectChanges();
                    engine.flush();
                    expect(getLog().length).toEqual(0);
                    cmp.exp = false;
                    fixture.detectChanges();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(1);
                    engine.flush();
                    expect(getLog().length).toEqual(1);
                    const [player] = getLog();
                    expect(player.keyframes).toEqual([
                        new Map([
                            ['opacity', '1'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '0'],
                            ['offset', 1],
                        ]),
                    ]);
                    player.finish();
                    (0, testing_2.flushMicrotasks)();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(0);
                }));
                it('should trigger a leave animation when both the inner and outer components trigger on the same element', (0, testing_2.fakeAsync)(() => {
                    let ParentCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                animations: [
                                    (0, animations_1.trigger)('host', [
                                        (0, animations_1.transition)(':leave', [
                                            (0, animations_1.style)({ height: '100px' }),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '0px' })),
                                        ]),
                                    ]),
                                ],
                                template: `
                <child-cmp *ngIf="exp" @host></child-cmp>
              `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentCmp = _classThis = class {
                            constructor() {
                                this.exp = true;
                            }
                        };
                        __setFunctionName(_classThis, "ParentCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentCmp = _classThis;
                    })();
                    let ChildCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child-cmp',
                                template: '...',
                                animations: [
                                    (0, animations_1.trigger)('host', [
                                        (0, animations_1.transition)(':leave', [
                                            (0, animations_1.style)({ width: '100px' }),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '0px' })),
                                        ]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _hostAnimation_decorators;
                        let _hostAnimation_initializers = [];
                        let _hostAnimation_extraInitializers = [];
                        var ChildCmp = _classThis = class {
                            constructor() {
                                this.hostAnimation = __runInitializers(this, _hostAnimation_initializers, true);
                                __runInitializers(this, _hostAnimation_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "ChildCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _hostAnimation_decorators = [(0, core_1.HostBinding)('@host')];
                            __esDecorate(null, null, _hostAnimation_decorators, { kind: "field", name: "hostAnimation", static: false, private: false, access: { has: obj => "hostAnimation" in obj, get: obj => obj.hostAnimation, set: (obj, value) => { obj.hostAnimation = value; } }, metadata: _metadata }, _hostAnimation_initializers, _hostAnimation_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildCmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(ParentCmp);
                    const cmp = fixture.componentInstance;
                    fixture.detectChanges();
                    engine.flush();
                    expect(getLog().length).toEqual(0);
                    cmp.exp = false;
                    fixture.detectChanges();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(1);
                    engine.flush();
                    expect(getLog().length).toEqual(2);
                    const [p1, p2] = getLog();
                    expect(p1.keyframes).toEqual([
                        new Map([
                            ['width', '100px'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['width', '0px'],
                            ['offset', 1],
                        ]),
                    ]);
                    expect(p2.keyframes).toEqual([
                        new Map([
                            ['height', '100px'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['height', '0px'],
                            ['offset', 1],
                        ]),
                    ]);
                    p1.finish();
                    p2.finish();
                    (0, testing_2.flushMicrotasks)();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(0);
                }));
                it('should not throw when the host element is removed and no animation triggers', (0, testing_2.fakeAsync)(() => {
                    let ParentCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                template: `
                <child-cmp *ngIf="exp"></child-cmp>
              `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentCmp = _classThis = class {
                            constructor() {
                                this.exp = true;
                            }
                        };
                        __setFunctionName(_classThis, "ParentCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentCmp = _classThis;
                    })();
                    let ChildCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child-cmp',
                                template: '...',
                                animations: [(0, animations_1.trigger)('host', [(0, animations_1.transition)('a => b', [(0, animations_1.style)({ height: '100px' })])])],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _hostAnimation_decorators;
                        let _hostAnimation_initializers = [];
                        let _hostAnimation_extraInitializers = [];
                        var ChildCmp = _classThis = class {
                            constructor() {
                                this.hostAnimation = __runInitializers(this, _hostAnimation_initializers, 'a');
                                __runInitializers(this, _hostAnimation_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "ChildCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _hostAnimation_decorators = [(0, core_1.HostBinding)('@host')];
                            __esDecorate(null, null, _hostAnimation_decorators, { kind: "field", name: "hostAnimation", static: false, private: false, access: { has: obj => "hostAnimation" in obj, get: obj => obj.hostAnimation, set: (obj, value) => { obj.hostAnimation = value; } }, metadata: _metadata }, _hostAnimation_initializers, _hostAnimation_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildCmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(ParentCmp);
                    const cmp = fixture.componentInstance;
                    fixture.detectChanges();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(1);
                    engine.flush();
                    expect(getLog().length).toEqual(0);
                    cmp.exp = false;
                    fixture.detectChanges();
                    engine.flush();
                    (0, testing_2.flushMicrotasks)();
                    expect(getLog().length).toEqual(0);
                    expect(fixture.debugElement.nativeElement.children.length).toBe(0);
                    (0, testing_2.flushMicrotasks)();
                    expect(fixture.debugElement.nativeElement.children.length).toBe(0);
                }));
                it('should properly evaluate pre/auto-style values when components are inserted/removed which contain host animations', (0, testing_2.fakeAsync)(() => {
                    let ParentCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                template: `
                <child-cmp *ngFor="let item of items"></child-cmp>
              `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentCmp = _classThis = class {
                            constructor() {
                                this.items = [1, 2, 3, 4, 5];
                            }
                        };
                        __setFunctionName(_classThis, "ParentCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentCmp = _classThis;
                    })();
                    let ChildCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child-cmp',
                                template: '... child ...',
                                animations: [
                                    (0, animations_1.trigger)('host', [(0, animations_1.transition)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _hostAnimation_decorators;
                        let _hostAnimation_initializers = [];
                        let _hostAnimation_extraInitializers = [];
                        var ChildCmp = _classThis = class {
                            constructor() {
                                this.hostAnimation = __runInitializers(this, _hostAnimation_initializers, 'a');
                                __runInitializers(this, _hostAnimation_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "ChildCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _hostAnimation_decorators = [(0, core_1.HostBinding)('@host')];
                            __esDecorate(null, null, _hostAnimation_decorators, { kind: "field", name: "hostAnimation", static: false, private: false, access: { has: obj => "hostAnimation" in obj, get: obj => obj.hostAnimation, set: (obj, value) => { obj.hostAnimation = value; } }, metadata: _metadata }, _hostAnimation_initializers, _hostAnimation_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildCmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(ParentCmp);
                    const cmp = fixture.componentInstance;
                    const element = fixture.nativeElement;
                    fixture.detectChanges();
                    cmp.items = [0, 2, 4, 6]; // 1,3,5 get removed
                    fixture.detectChanges();
                    const items = element.querySelectorAll('child-cmp');
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        expect(item.style['display']).toBeFalsy();
                    }
                }));
            });
            it('should cancel and merge in mid-animation styles into the follow-up animation, but only for animation keyframes that start right away', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
          <div [@myAnimation]="exp"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('a => b', [
                                        (0, animations_1.style)({ 'opacity': '0' }),
                                        (0, animations_1.animate)(500, (0, animations_1.style)({ 'opacity': '1' })),
                                    ]),
                                    (0, animations_1.transition)('b => c', [
                                        (0, animations_1.group)([
                                            (0, animations_1.animate)(500, (0, animations_1.style)({ 'width': '100px' })),
                                            (0, animations_1.animate)(500, (0, animations_1.style)({ 'height': '100px' })),
                                        ]),
                                        (0, animations_1.animate)(500, (0, animations_1.keyframes)([(0, animations_1.style)({ 'opacity': '0' }), (0, animations_1.style)({ 'opacity': '1' })])),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'a';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(0);
                resetLog();
                cmp.exp = 'b';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(1);
                resetLog();
                cmp.exp = 'c';
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(3);
                const [p1, p2, p3] = players;
                expect(p1.previousStyles).toEqual(new Map([['opacity', animations_1.AUTO_STYLE]]));
                expect(p2.previousStyles).toEqual(new Map([['opacity', animations_1.AUTO_STYLE]]));
                expect(p3.previousStyles).toEqual(new Map());
            });
            it('should provide the styling of previous players that are grouped', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
          <div [@myAnimation]="exp"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('1 => 2', [
                                        (0, animations_1.group)([
                                            (0, animations_1.animate)(500, (0, animations_1.style)({ 'width': '100px' })),
                                            (0, animations_1.animate)(500, (0, animations_1.style)({ 'height': '100px' })),
                                        ]),
                                        (0, animations_1.animate)(500, (0, animations_1.keyframes)([(0, animations_1.style)({ 'opacity': '0' }), (0, animations_1.style)({ 'opacity': '1' })])),
                                    ]),
                                    (0, animations_1.transition)('2 => 3', [
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
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                fixture.detectChanges();
                engine.flush();
                cmp.exp = '1';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(0);
                resetLog();
                cmp.exp = '2';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(3);
                resetLog();
                cmp.exp = '3';
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(1);
                const player = players[0];
                const pp = player.previousPlayers;
                expect(pp.length).toEqual(3);
                expect(pp[0].currentSnapshot).toEqual(new Map([['width', animations_1.AUTO_STYLE]]));
                expect(pp[1].currentSnapshot).toEqual(new Map([['height', animations_1.AUTO_STYLE]]));
                expect(pp[2].currentSnapshot).toEqual(new Map([['opacity', animations_1.AUTO_STYLE]]));
            });
            it('should provide the styling of previous players that are grouped and queried and make sure match the players with the correct elements', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
          <div class="container" [@myAnimation]="exp">
            <div class="inner"></div>
          </div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('1 => 2', [
                                        (0, animations_1.style)({ fontSize: '10px' }),
                                        (0, animations_1.query)('.inner', [(0, animations_1.style)({ fontSize: '20px' })]),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ fontSize: '100px' })),
                                        (0, animations_1.query)('.inner', [(0, animations_1.animate)('1s', (0, animations_1.style)({ fontSize: '200px' }))]),
                                    ]),
                                    (0, animations_1.transition)('2 => 3', [
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ fontSize: '0px' })),
                                        (0, animations_1.query)('.inner', [(0, animations_1.animate)('1s', (0, animations_1.style)({ fontSize: '0px' }))]),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                fixture.detectChanges();
                cmp.exp = '1';
                fixture.detectChanges();
                resetLog();
                cmp.exp = '2';
                fixture.detectChanges();
                resetLog();
                cmp.exp = '3';
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(2);
                const [p1, p2] = players;
                const pp1 = p1.previousPlayers;
                expect(p1.element.classList.contains('container')).toBeTruthy();
                for (let i = 0; i < pp1.length; i++) {
                    expect(pp1[i].element).toEqual(p1.element);
                }
                const pp2 = p2.previousPlayers;
                expect(p2.element.classList.contains('inner')).toBeTruthy();
                for (let i = 0; i < pp2.length; i++) {
                    expect(pp2[i].element).toEqual(p2.element);
                }
            });
            it('should properly balance styles between states even if there are no destination state styles', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div @myAnimation *ngIf="exp"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.state)('void', (0, animations_1.style)({ opacity: 0, width: '0px', height: '0px' })),
                                    (0, animations_1.transition)(':enter', (0, animations_1.animate)(1000)),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                const [p1] = getLog();
                expect(p1.keyframes).toEqual([
                    new Map([
                        ['opacity', '0'],
                        ['width', '0px'],
                        ['height', '0px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', animations_1.AUTO_STYLE],
                        ['width', animations_1.AUTO_STYLE],
                        ['height', animations_1.AUTO_STYLE],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should not apply the destination styles if the final animate step already contains styles', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div @myAnimation *ngIf="exp"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.state)('void', (0, animations_1.style)({ color: 'red' })),
                                    (0, animations_1.state)('*', (0, animations_1.style)({ color: 'blue' })),
                                    (0, animations_1.transition)(':enter', [
                                        (0, animations_1.style)({ fontSize: '0px ' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ fontSize: '100px' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(1);
                // notice how the final color is NOT blue
                expect(players[0].keyframes).toEqual([
                    new Map([
                        ['fontSize', '0px'],
                        ['color', 'red'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['fontSize', '100px'],
                        ['color', 'red'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should invoke an animation trigger that is state-less', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div *ngFor="let item of items" @myAnimation></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.items = [];
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.items = [1, 2, 3, 4, 5];
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(5);
                for (let i = 0; i < 5; i++) {
                    const item = getLog()[i];
                    expect(item.duration).toEqual(1000);
                    expect(item.keyframes).toEqual([
                        new Map([
                            ['opacity', '0'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '1'],
                            ['offset', 1],
                        ]),
                    ]);
                }
            });
            it('should retain styles on the element once the animation is complete', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #green @green></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('green', [
                                    (0, animations_1.state)('*', (0, animations_1.style)({ backgroundColor: 'green' })),
                                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(500)),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _element_decorators;
                    let _element_initializers = [];
                    let _element_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.element = __runInitializers(this, _element_initializers, void 0);
                            __runInitializers(this, _element_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _element_decorators = [(0, core_1.ViewChild)('green')];
                        __esDecorate(null, null, _element_decorators, { kind: "field", name: "element", static: false, private: false, access: { has: obj => "element" in obj, get: obj => obj.element, set: (obj, value) => { obj.element = value; } }, metadata: _metadata }, _element_initializers, _element_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                fixture.detectChanges();
                engine.flush();
                const player = engine.players.pop();
                player.finish();
                expect((0, browser_util_1.hasStyle)(cmp.element.nativeElement, 'background-color', 'green')).toBeTruthy();
            });
            it('should retain state styles when the underlying DOM structure changes even if there are no insert/remove animations', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div class="item" *ngFor="let item of items" [@color]="colorExp">
              {{ item }}
            </div>
          `,
                            animations: [(0, animations_1.trigger)('color', [(0, animations_1.state)('green', (0, animations_1.style)({ backgroundColor: 'green' }))])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.colorExp = 'green';
                            this.items = [0, 1, 2, 3];
                        }
                        reorder() {
                            const temp = this.items[0];
                            this.items[0] = this.items[1];
                            this.items[1] = temp;
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
                let elements = fixture.nativeElement.querySelectorAll('.item');
                assertBackgroundColor(elements[0], 'green');
                assertBackgroundColor(elements[1], 'green');
                assertBackgroundColor(elements[2], 'green');
                assertBackgroundColor(elements[3], 'green');
                elements[0].title = '0a';
                elements[1].title = '1a';
                cmp.reorder();
                fixture.detectChanges();
                elements = fixture.nativeElement.querySelectorAll('.item');
                assertBackgroundColor(elements[0], 'green');
                assertBackgroundColor(elements[1], 'green');
                assertBackgroundColor(elements[2], 'green');
                assertBackgroundColor(elements[3], 'green');
                function assertBackgroundColor(element, color) {
                    expect(element.style.getPropertyValue('background-color')).toEqual(color);
                }
            });
            it('should retain state styles when the underlying DOM structure changes even if there are insert/remove animations', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div class="item" *ngFor="let item of items" [@color]="colorExp">
              {{ item }}
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('color', [
                                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(500)),
                                    (0, animations_1.state)('green', (0, animations_1.style)({ backgroundColor: 'green' })),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.colorExp = 'green';
                            this.items = [0, 1, 2, 3];
                        }
                        reorder() {
                            const temp = this.items[0];
                            this.items[0] = this.items[1];
                            this.items[1] = temp;
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
                getLog().forEach((p) => p.finish());
                let elements = fixture.nativeElement.querySelectorAll('.item');
                assertBackgroundColor(elements[0], 'green');
                assertBackgroundColor(elements[1], 'green');
                assertBackgroundColor(elements[2], 'green');
                assertBackgroundColor(elements[3], 'green');
                elements[0].title = '0a';
                elements[1].title = '1a';
                cmp.reorder();
                fixture.detectChanges();
                getLog().forEach((p) => p.finish());
                elements = fixture.nativeElement.querySelectorAll('.item');
                assertBackgroundColor(elements[0], 'green');
                assertBackgroundColor(elements[1], 'green');
                assertBackgroundColor(elements[2], 'green');
                assertBackgroundColor(elements[3], 'green');
                function assertBackgroundColor(element, color) {
                    expect(element.style.getPropertyValue('background-color')).toEqual(color);
                }
            });
            it('should keep/restore the trigger value when there are move operations (with *ngFor + trackBy)', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
          <div *ngFor="let item of items, trackBy: trackItem"
               @myAnimation (@myAnimation.start)="cb($event)">
            item{{ item }}
          </div>
        `,
                            animations: [(0, animations_1.trigger)('myAnimation', [])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.items = [];
                            this.log = [];
                        }
                        cb(event) {
                            this.log.push(`[${event.element.innerText.trim()}] ${event.fromState} => ${event.toState}`);
                        }
                        trackItem(_index, item) {
                            return item.toString();
                        }
                        addItem() {
                            this.items.push(this.items.length);
                        }
                        removeItem() {
                            this.items.pop();
                        }
                        reverseItems() {
                            this.items = this.items.reverse();
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                fixture.detectChanges();
                const completeAnimations = () => {
                    fixture.detectChanges();
                    (0, testing_2.flushMicrotasks)();
                    engine.players.forEach((player) => player.finish());
                };
                cmp.log = [];
                [0, 1, 2].forEach(() => cmp.addItem());
                completeAnimations();
                expect(cmp.log).toEqual([
                    '[item0] void => null',
                    '[item1] void => null',
                    '[item2] void => null',
                ]);
                cmp.reverseItems();
                completeAnimations();
                cmp.log = [];
                [0, 1, 2].forEach(() => cmp.removeItem());
                completeAnimations();
                expect(cmp.log).toEqual([
                    '[item2] null => void',
                    '[item1] null => void',
                    '[item0] null => void',
                ]);
            }));
            it('should animate removals of nodes to the `void` state for each animation trigger, but treat all auto styles as pre styles', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div *ngIf="exp" class="ng-if" [@trig1]="exp2" @trig2></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('trig1', [(0, animations_1.transition)('state => void', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
                                (0, animations_1.trigger)('trig2', [(0, animations_1.transition)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ width: '0px' }))])]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = true;
                            this.exp2 = 'state';
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                resetLog();
                const element = fixture.nativeElement.querySelector('.ng-if');
                assertHasParent(element, true);
                cmp.exp = false;
                fixture.detectChanges();
                engine.flush();
                assertHasParent(element, true);
                expect(getLog().length).toEqual(2);
                const player2 = getLog().pop();
                const player1 = getLog().pop();
                expect(player2.keyframes).toEqual([
                    new Map([
                        ['width', animations_1.ɵPRE_STYLE],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['width', '0px'],
                        ['offset', 1],
                    ]),
                ]);
                expect(player1.keyframes).toEqual([
                    new Map([
                        ['opacity', animations_1.ɵPRE_STYLE],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '0'],
                        ['offset', 1],
                    ]),
                ]);
                player2.finish();
                player1.finish();
                assertHasParent(element, false);
            });
            it('should properly cancel all existing animations when a removal occurs', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div *ngIf="exp" [@myAnimation]="exp"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ width: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '100px' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'go';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(1);
                const [player1] = getLog();
                resetLog();
                let finished = false;
                player1.onDone(() => (finished = true));
                let destroyed = false;
                player1.onDestroy(() => (destroyed = true));
                cmp.exp = null;
                fixture.detectChanges();
                engine.flush();
                expect(finished).toBeTruthy();
                expect(destroyed).toBeTruthy();
            });
            it('should not run inner child animations when a parent is set to be removed', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div *ngIf="exp" class="parent" >
              <div [@myAnimation]="exp2"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('a => b', [(0, animations_1.animate)(1000, (0, animations_1.style)({ width: '0px' }))])]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = true;
                            this.exp2 = '0';
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                cmp.exp2 = 'a';
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp = false;
                cmp.exp2 = 'b';
                fixture.detectChanges();
                engine.flush();
                expect(getLog().length).toEqual(0);
            });
            it('should cancel all active inner child animations when a parent removal animation is set to go', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div *ngIf="exp1" @parent>
              <div [@child]="exp2" class="child1"></div>
              <div [@child]="exp2" class="child2"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('a => b', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp1 = true;
                cmp.exp2 = 'a';
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp2 = 'b';
                fixture.detectChanges();
                engine.flush();
                let players = getLog();
                expect(players.length).toEqual(2);
                const [p1, p2] = players;
                let count = 0;
                p1.onDone(() => count++);
                p2.onDone(() => count++);
                cmp.exp1 = false;
                fixture.detectChanges();
                engine.flush();
                expect(count).toEqual(2);
            });
            it('should destroy inner animations when a parent node is set for removal', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent class="parent">
              <div [@child]="exp" class="child1"></div>
              <div [@child]="exp" class="child2"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('a => b', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _parentElement_decorators;
                    let _parentElement_initializers = [];
                    let _parentElement_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.parentElement = __runInitializers(this, _parentElement_initializers, void 0);
                            __runInitializers(this, _parentElement_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _parentElement_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _parentElement_decorators, { kind: "field", name: "parentElement", static: false, private: false, access: { has: obj => "parentElement" in obj, get: obj => obj.parentElement, set: (obj, value) => { obj.parentElement = value; } }, metadata: _metadata }, _parentElement_initializers, _parentElement_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                const someTrigger = (0, animations_1.trigger)('someTrigger', []);
                const hostElement = fixture.nativeElement;
                engine.register(DEFAULT_NAMESPACE_ID, hostElement);
                engine.registerTrigger(DEFAULT_COMPONENT_ID, DEFAULT_NAMESPACE_ID, hostElement, someTrigger.name, someTrigger);
                cmp.exp = 'a';
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp = 'b';
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(2);
                const [p1, p2] = players;
                let count = 0;
                p1.onDone(() => count++);
                p2.onDone(() => count++);
                engine.onRemove(DEFAULT_NAMESPACE_ID, cmp.parentElement.nativeElement, null);
                expect(count).toEqual(2);
            });
            it('should allow inner removals to happen when a non removal-based parent animation is set to animate', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent [@parent]="exp1" class="parent">
              <div #child *ngIf="exp2" class="child"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('a => b', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _parent_decorators;
                    let _parent_initializers = [];
                    let _parent_extraInitializers = [];
                    let _child_decorators;
                    let _child_initializers = [];
                    let _child_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.parent = __runInitializers(this, _parent_initializers, void 0);
                            this.child = (__runInitializers(this, _parent_extraInitializers), __runInitializers(this, _child_initializers, void 0));
                            __runInitializers(this, _child_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _parent_decorators = [(0, core_1.ViewChild)('parent')];
                        _child_decorators = [(0, core_1.ViewChild)('child')];
                        __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
                        __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp1 = 'a';
                cmp.exp2 = true;
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp1 = 'b';
                fixture.detectChanges();
                engine.flush();
                const player = getLog()[0];
                const p = cmp.parent.nativeElement;
                const c = cmp.child.nativeElement;
                expect(p.contains(c)).toBeTruthy();
                cmp.exp2 = false;
                fixture.detectChanges();
                engine.flush();
                expect(p.contains(c)).toBeFalsy();
                player.finish();
                expect(p.contains(c)).toBeFalsy();
            });
            it('should make inner removals wait until a parent based removal animation has finished', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent *ngIf="exp1" @parent class="parent">
              <div #child1 *ngIf="exp2" class="child1"></div>
              <div #child2 *ngIf="exp2" class="child2"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _parent_decorators;
                    let _parent_initializers = [];
                    let _parent_extraInitializers = [];
                    let _child1Elm_decorators;
                    let _child1Elm_initializers = [];
                    let _child1Elm_extraInitializers = [];
                    let _child2Elm_decorators;
                    let _child2Elm_initializers = [];
                    let _child2Elm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.parent = __runInitializers(this, _parent_initializers, void 0);
                            this.child1Elm = (__runInitializers(this, _parent_extraInitializers), __runInitializers(this, _child1Elm_initializers, void 0));
                            this.child2Elm = (__runInitializers(this, _child1Elm_extraInitializers), __runInitializers(this, _child2Elm_initializers, void 0));
                            __runInitializers(this, _child2Elm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _parent_decorators = [(0, core_1.ViewChild)('parent')];
                        _child1Elm_decorators = [(0, core_1.ViewChild)('child1')];
                        _child2Elm_decorators = [(0, core_1.ViewChild)('child2')];
                        __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
                        __esDecorate(null, null, _child1Elm_decorators, { kind: "field", name: "child1Elm", static: false, private: false, access: { has: obj => "child1Elm" in obj, get: obj => obj.child1Elm, set: (obj, value) => { obj.child1Elm = value; } }, metadata: _metadata }, _child1Elm_initializers, _child1Elm_extraInitializers);
                        __esDecorate(null, null, _child2Elm_decorators, { kind: "field", name: "child2Elm", static: false, private: false, access: { has: obj => "child2Elm" in obj, get: obj => obj.child2Elm, set: (obj, value) => { obj.child2Elm = value; } }, metadata: _metadata }, _child2Elm_initializers, _child2Elm_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp1 = true;
                cmp.exp2 = true;
                fixture.detectChanges();
                engine.flush();
                resetLog();
                const p = cmp.parent.nativeElement;
                const c1 = cmp.child1Elm.nativeElement;
                const c2 = cmp.child2Elm.nativeElement;
                cmp.exp1 = false;
                cmp.exp2 = false;
                fixture.detectChanges();
                engine.flush();
                expect(p.contains(c1)).toBeTruthy();
                expect(p.contains(c2)).toBeTruthy();
                cmp.exp2 = false;
                fixture.detectChanges();
                engine.flush();
                expect(p.contains(c1)).toBeTruthy();
                expect(p.contains(c2)).toBeTruthy();
            });
            it('should detect trigger changes based on object.value properties', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="{value:exp}"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => 1', [(0, animations_1.animate)(1234, (0, animations_1.style)({ opacity: 0 }))]),
                                    (0, animations_1.transition)('* => 2', [(0, animations_1.animate)(5678, (0, animations_1.style)({ opacity: 0 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = '1';
                fixture.detectChanges();
                engine.flush();
                let players = getLog();
                expect(players.length).toEqual(1);
                expect(players[0].duration).toEqual(1234);
                resetLog();
                cmp.exp = '2';
                fixture.detectChanges();
                engine.flush();
                players = getLog();
                expect(players.length).toEqual(1);
                expect(players[0].duration).toEqual(5678);
            });
            it('should not render animations when the object expression value is the same as it was previously', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="{value:exp,params:params}"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('* => *', [(0, animations_1.animate)(1234, (0, animations_1.style)({ opacity: 0 }))])]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = '1';
                cmp.params = {};
                fixture.detectChanges();
                engine.flush();
                let players = getLog();
                expect(players.length).toEqual(1);
                expect(players[0].duration).toEqual(1234);
                resetLog();
                cmp.exp = '1';
                cmp.params = {};
                fixture.detectChanges();
                engine.flush();
                players = getLog();
                expect(players.length).toEqual(0);
            });
            it("should update the final state styles when params update even if the expression hasn't changed", (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="{value:exp,params:{color:color}}"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.state)('*', (0, animations_1.style)({ color: '{{ color }}' }), { params: { color: 'black' } }),
                                    (0, animations_1.transition)('* => 1', (0, animations_1.animate)(500)),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = '1';
                cmp.color = 'red';
                fixture.detectChanges();
                const player = getLog()[0];
                const element = player.element;
                player.finish();
                (0, testing_2.flushMicrotasks)();
                expect((0, browser_util_1.hasStyle)(element, 'color', 'red')).toBeTruthy();
                cmp.exp = '1';
                cmp.color = 'blue';
                fixture.detectChanges();
                resetLog();
                (0, testing_2.flushMicrotasks)();
                expect((0, browser_util_1.hasStyle)(element, 'color', 'blue')).toBeTruthy();
                cmp.exp = '1';
                cmp.color = null;
                fixture.detectChanges();
                resetLog();
                (0, testing_2.flushMicrotasks)();
                expect((0, browser_util_1.hasStyle)(element, 'color', 'black')).toBeTruthy();
            }));
            it('should substitute in values if the provided state match is an object with values', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('a => b', [(0, animations_1.style)({ opacity: '{{ start }}' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '{{ end }}' }))], buildParams({ start: '0', end: '1' })),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = { value: 'a' };
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp = { value: 'b', params: { start: 0.3, end: 0.6 } };
                fixture.detectChanges();
                engine.flush();
                const player = getLog().pop();
                expect(player.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.3'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '0.6'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should retain substituted styles on the element once the animation is complete if referenced in the final state', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="{value:exp, params: { color: color }}"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.state)('start', (0, animations_1.style)({
                                        color: '{{ color }}',
                                        fontSize: '{{ fontSize }}px',
                                        width: '{{ width }}',
                                    }), { params: { color: 'red', fontSize: '200', width: '10px' } }),
                                    (0, animations_1.state)('final', (0, animations_1.style)({ color: '{{ color }}', fontSize: '{{ fontSize }}px', width: '888px' }), { params: { color: 'green', fontSize: '50', width: '100px' } }),
                                    (0, animations_1.transition)('start => final', (0, animations_1.animate)(500)),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'start';
                cmp.color = 'red';
                fixture.detectChanges();
                resetLog();
                cmp.exp = 'final';
                cmp.color = 'blue';
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(1);
                const [p1] = players;
                expect(p1.keyframes).toEqual([
                    new Map([
                        ['color', 'red'],
                        ['fontSize', '200px'],
                        ['width', '10px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['color', 'blue'],
                        ['fontSize', '50px'],
                        ['width', '888px'],
                        ['offset', 1],
                    ]),
                ]);
                const element = p1.element;
                p1.finish();
                (0, testing_2.flushMicrotasks)();
                expect((0, browser_util_1.hasStyle)(element, 'color', 'blue')).toBeTruthy();
                expect((0, browser_util_1.hasStyle)(element, 'fontSize', '50px')).toBeTruthy();
                expect((0, browser_util_1.hasStyle)(element, 'width', '888px')).toBeTruthy();
            }));
            it('should only evaluate final state param substitutions from the expression and state values and not from the transition options ', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.state)('start', (0, animations_1.style)({
                                        width: '{{ width }}',
                                        height: '{{ height }}',
                                    }), { params: { width: '0px', height: '0px' } }),
                                    (0, animations_1.state)('final', (0, animations_1.style)({
                                        width: '{{ width }}',
                                        height: '{{ height }}',
                                    }), { params: { width: '100px', height: '100px' } }),
                                    (0, animations_1.transition)('start => final', [(0, animations_1.animate)(500)], {
                                        params: { width: '333px', height: '666px' },
                                    }),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'start';
                fixture.detectChanges();
                resetLog();
                cmp.exp = 'final';
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(1);
                const [p1] = players;
                expect(p1.keyframes).toEqual([
                    new Map([
                        ['width', '0px'],
                        ['height', '0px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['width', '100px'],
                        ['height', '100px'],
                        ['offset', 1],
                    ]),
                ]);
                const element = p1.element;
                p1.finish();
                (0, testing_2.flushMicrotasks)();
                expect((0, browser_util_1.hasStyle)(element, 'width', '100px')).toBeTruthy();
                expect((0, browser_util_1.hasStyle)(element, 'height', '100px')).toBeTruthy();
            }));
            it('should apply default params when resolved animation value is null or undefined', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `<div [@myAnimation]="exp"></div>`,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('a => b', [(0, animations_1.style)({ opacity: '{{ start }}' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '{{ end }}' }))], buildParams({ start: '0.4', end: '0.7' })),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = { value: 'a' };
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp = { value: 'b', params: { start: undefined, end: null } };
                fixture.detectChanges();
                engine.flush();
                const player = getLog().pop();
                expect(player.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.4'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '0.7'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should not flush animations twice when an inner component runs change detection', () => {
                let OuterCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'outer-cmp',
                            template: `
            <div *ngIf="exp" @outer></div>
            <inner-cmp #inner></inner-cmp>
          `,
                            animations: [
                                (0, animations_1.trigger)('outer', [
                                    (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _inner_decorators;
                    let _inner_initializers = [];
                    let _inner_extraInitializers = [];
                    var OuterCmp = _classThis = class {
                        constructor() {
                            this.inner = __runInitializers(this, _inner_initializers, void 0);
                            this.exp = (__runInitializers(this, _inner_extraInitializers), null);
                        }
                        update() {
                            this.exp = 'go';
                        }
                        ngDoCheck() {
                            if (this.exp == 'go') {
                                this.inner.update();
                            }
                        }
                    };
                    __setFunctionName(_classThis, "OuterCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _inner_decorators = [(0, core_1.ViewChild)('inner')];
                        __esDecorate(null, null, _inner_decorators, { kind: "field", name: "inner", static: false, private: false, access: { has: obj => "inner" in obj, get: obj => obj.inner, set: (obj, value) => { obj.inner = value; } }, metadata: _metadata }, _inner_initializers, _inner_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OuterCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OuterCmp = _classThis;
                })();
                let InnerCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'inner-cmp',
                            template: `
            <div *ngIf="exp" @inner></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('inner', [
                                    (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var InnerCmp = _classThis = class {
                        constructor(_ref) {
                            this._ref = _ref;
                        }
                        update() {
                            this.exp = 'go';
                            this._ref.detectChanges();
                        }
                    };
                    __setFunctionName(_classThis, "InnerCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        InnerCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return InnerCmp = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [OuterCmp, InnerCmp] });
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(OuterCmp);
                const cmp = fixture.componentInstance;
                fixture.detectChanges();
                expect(getLog()).toEqual([]);
                cmp.update();
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(2);
            });
            describe('transition aliases', () => {
                describe(':increment', () => {
                    it('should detect when a value has incremented', () => {
                        let Cmp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'if-cmp',
                                    template: `
          <div [@myAnimation]="exp"></div>
        `,
                                    animations: [
                                        (0, animations_1.trigger)('myAnimation', [
                                            (0, animations_1.transition)(':increment', [(0, animations_1.animate)(1234, (0, animations_1.style)({ background: 'red' }))]),
                                        ]),
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var Cmp = _classThis = class {
                                constructor() {
                                    this.exp = 0;
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
                        let players = getLog();
                        expect(players.length).toEqual(0);
                        cmp.exp++;
                        fixture.detectChanges();
                        players = getLog();
                        expect(players.length).toEqual(1);
                        expect(players[0].duration).toEqual(1234);
                        resetLog();
                        cmp.exp = 5;
                        fixture.detectChanges();
                        players = getLog();
                        expect(players.length).toEqual(1);
                        expect(players[0].duration).toEqual(1234);
                    });
                });
                describe(':decrement', () => {
                    it('should detect when a value has decremented', () => {
                        let Cmp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'if-cmp',
                                    template: `
          <div [@myAnimation]="exp"></div>
        `,
                                    animations: [
                                        (0, animations_1.trigger)('myAnimation', [
                                            (0, animations_1.transition)(':decrement', [(0, animations_1.animate)(1234, (0, animations_1.style)({ background: 'red' }))]),
                                        ]),
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var Cmp = _classThis = class {
                                constructor() {
                                    this.exp = 5;
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
                        let players = getLog();
                        expect(players.length).toEqual(0);
                        cmp.exp--;
                        fixture.detectChanges();
                        players = getLog();
                        expect(players.length).toEqual(1);
                        expect(players[0].duration).toEqual(1234);
                        resetLog();
                        cmp.exp = 0;
                        fixture.detectChanges();
                        players = getLog();
                        expect(players.length).toEqual(1);
                        expect(players[0].duration).toEqual(1234);
                    });
                });
            });
            it('should animate nodes properly when they have been re-ordered', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
                <div *ngFor="let item of items" [class]="'class-' + item.value">
                  <div [@myAnimation]="item.count">
                    {{ item.value }}
                  </div>
                </div>
              `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.state)('0', (0, animations_1.style)({ opacity: 0 })),
                                    (0, animations_1.state)('1', (0, animations_1.style)({ opacity: 0.4 })),
                                    (0, animations_1.state)('2', (0, animations_1.style)({ opacity: 0.8 })),
                                    (0, animations_1.transition)('* => 1, * => 2', [(0, animations_1.animate)(1000)]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.items = [
                                { value: '1', count: 0 },
                                { value: '2', count: 0 },
                                { value: '3', count: 0 },
                                { value: '4', count: 0 },
                                { value: '5', count: 0 },
                            ];
                        }
                        reOrder() {
                            this.items = [
                                this.items[4],
                                this.items[1],
                                this.items[3],
                                this.items[0],
                                this.items[2],
                            ];
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
                const one = cmp.items[0];
                const two = cmp.items[1];
                one.count++;
                fixture.detectChanges();
                cmp.reOrder();
                fixture.detectChanges();
                resetLog();
                one.count++;
                two.count++;
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(2);
            });
        });
        it('should not animate i18n insertBefore', () => {
            // I18n uses `insertBefore` API to insert nodes in correct order. Animation assumes that
            // any `insertBefore` is a move and tries to animate it.
            // NOTE: This test was extracted from `g3`
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div i18n>Hello <span>World</span>!</div>`,
                        animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('* => *', [(0, animations_1.animate)(1000)])])],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
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
            fixture.detectChanges();
            const players = getLog();
            const span = fixture.debugElement.nativeElement.querySelector('span');
            expect(span.innerText).toEqual('World');
            // We should not insert `ng-star-inserted` into the span class.
            expect(span.className).not.toContain('ng-star-inserted');
        });
        describe('animation listeners', () => {
            it('should trigger a `start` state change listener for when the animation changes state from void => state', (0, testing_2.fakeAsync)(() => {
                var _a, _b, _c, _d, _e;
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div *ngIf="exp" [@myAnimation]="exp" (@myAnimation.start)="callback($event)"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('void => *', [
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
                        constructor() {
                            this.exp = false;
                            this.callback = (event) => {
                                this.event = event;
                            };
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'true';
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect((_a = cmp.event) === null || _a === void 0 ? void 0 : _a.triggerName).toEqual('myAnimation');
                expect((_b = cmp.event) === null || _b === void 0 ? void 0 : _b.phaseName).toEqual('start');
                expect((_c = cmp.event) === null || _c === void 0 ? void 0 : _c.totalTime).toEqual(500);
                expect((_d = cmp.event) === null || _d === void 0 ? void 0 : _d.fromState).toEqual('void');
                expect((_e = cmp.event) === null || _e === void 0 ? void 0 : _e.toState).toEqual('true');
            }));
            it('should trigger a `done` state change listener for when the animation changes state from a => b', (0, testing_2.fakeAsync)(() => {
                var _a, _b, _c, _d, _e;
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div *ngIf="exp" [@myAnimation123]="exp" (@myAnimation123.done)="callback($event)"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation123', [
                                    (0, animations_1.transition)('* => b', [
                                        (0, animations_1.style)({ 'opacity': '0' }),
                                        (0, animations_1.animate)(999, (0, animations_1.style)({ 'opacity': '1' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
                            this.callback = (event) => {
                                this.event = event;
                            };
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'b';
                fixture.detectChanges();
                engine.flush();
                expect(cmp.event).toBeFalsy();
                const player = engine.players.pop();
                player.finish();
                (0, testing_2.flushMicrotasks)();
                expect((_a = cmp.event) === null || _a === void 0 ? void 0 : _a.triggerName).toEqual('myAnimation123');
                expect((_b = cmp.event) === null || _b === void 0 ? void 0 : _b.phaseName).toEqual('done');
                expect((_c = cmp.event) === null || _c === void 0 ? void 0 : _c.totalTime).toEqual(999);
                expect((_d = cmp.event) === null || _d === void 0 ? void 0 : _d.fromState).toEqual('void');
                expect((_e = cmp.event) === null || _e === void 0 ? void 0 : _e.toState).toEqual('b');
            }));
            it('should handle callbacks for multiple triggers running simultaneously', (0, testing_2.fakeAsync)(() => {
                var _a, _b;
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div [@ani1]="exp1" (@ani1.done)="callback1($event)"></div>
          <div [@ani2]="exp2" (@ani2.done)="callback2($event)"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('ani1', [
                                    (0, animations_1.transition)('* => a', [
                                        (0, animations_1.style)({ 'opacity': '0' }),
                                        (0, animations_1.animate)(999, (0, animations_1.style)({ 'opacity': '1' })),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('ani2', [
                                    (0, animations_1.transition)('* => b', [
                                        (0, animations_1.style)({ 'width': '0px' }),
                                        (0, animations_1.animate)(999, (0, animations_1.style)({ 'width': '100px' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp1 = false;
                            this.exp2 = false;
                            this.callback1 = (event) => {
                                this.event1 = event;
                            };
                            this.callback2 = (event) => {
                                this.event2 = event;
                            };
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp1 = 'a';
                cmp.exp2 = 'b';
                fixture.detectChanges();
                engine.flush();
                expect(cmp.event1).toBeFalsy();
                expect(cmp.event2).toBeFalsy();
                const player1 = engine.players[0];
                const player2 = engine.players[1];
                player1.finish();
                player2.finish();
                expect(cmp.event1).toBeFalsy();
                expect(cmp.event2).toBeFalsy();
                (0, testing_2.flushMicrotasks)();
                expect((_a = cmp.event1) === null || _a === void 0 ? void 0 : _a.triggerName).toBeTruthy('ani1');
                expect((_b = cmp.event2) === null || _b === void 0 ? void 0 : _b.triggerName).toBeTruthy('ani2');
            }));
            it('should handle callbacks for multiple triggers running simultaneously on the same element', (0, testing_2.fakeAsync)(() => {
                var _a, _b;
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
          <div [@ani1]="exp1" (@ani1.done)="callback1($event)" [@ani2]="exp2" (@ani2.done)="callback2($event)"></div>
        `,
                            animations: [
                                (0, animations_1.trigger)('ani1', [
                                    (0, animations_1.transition)('* => a', [
                                        (0, animations_1.style)({ 'opacity': '0' }),
                                        (0, animations_1.animate)(999, (0, animations_1.style)({ 'opacity': '1' })),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('ani2', [
                                    (0, animations_1.transition)('* => b', [
                                        (0, animations_1.style)({ 'width': '0px' }),
                                        (0, animations_1.animate)(999, (0, animations_1.style)({ 'width': '100px' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp1 = false;
                            this.exp2 = false;
                            this.callback1 = (event) => {
                                this.event1 = event;
                            };
                            this.callback2 = (event) => {
                                this.event2 = event;
                            };
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp1 = 'a';
                cmp.exp2 = 'b';
                fixture.detectChanges();
                engine.flush();
                expect(cmp.event1).toBeFalsy();
                expect(cmp.event2).toBeFalsy();
                const player1 = engine.players[0];
                const player2 = engine.players[1];
                player1.finish();
                player2.finish();
                expect(cmp.event1).toBeFalsy();
                expect(cmp.event2).toBeFalsy();
                (0, testing_2.flushMicrotasks)();
                expect((_a = cmp.event1) === null || _a === void 0 ? void 0 : _a.triggerName).toBeTruthy('ani1');
                expect((_b = cmp.event2) === null || _b === void 0 ? void 0 : _b.triggerName).toBeTruthy('ani2');
            }));
            it('should handle a leave animation for multiple triggers even if not all triggers have their own leave transition specified', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'if-cmp',
                            template: `
               <div *ngIf="exp" @foo @bar>123</div>
             `,
                            animations: [
                                (0, animations_1.trigger)('foo', [
                                    (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                                (0, animations_1.trigger)('bar', [(0, animations_1.transition)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const elm = fixture.elementRef.nativeElement;
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                let players = getLog();
                expect(players.length).toEqual(1);
                let [p1] = players;
                p1.finish();
                (0, testing_2.flushMicrotasks)();
                expect(elm.innerText.trim()).toEqual('123');
                resetLog();
                cmp.exp = false;
                fixture.detectChanges();
                players = getLog();
                expect(players.length).toEqual(1);
                [p1] = players;
                p1.finish();
                (0, testing_2.flushMicrotasks)();
                expect(elm.innerText.trim()).toEqual('');
            }));
            it('should trigger a state change listener for when the animation changes state from void => state on the host element', (0, testing_2.fakeAsync)(() => {
                var _a, _b, _c, _d, _e;
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-cmp',
                            template: `...`,
                            animations: [
                                (0, animations_1.trigger)('myAnimation2', [
                                    (0, animations_1.transition)('void => *', [
                                        (0, animations_1.style)({ 'opacity': '0' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ 'opacity': '1' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _exp_decorators;
                    let _exp_initializers = [];
                    let _exp_extraInitializers = [];
                    let _callback_decorators;
                    let _callback_initializers = [];
                    let _callback_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = __runInitializers(this, _exp_initializers, false);
                            this.callback = (__runInitializers(this, _exp_extraInitializers), __runInitializers(this, _callback_initializers, (event) => {
                                this.event = event;
                            }));
                            __runInitializers(this, _callback_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _exp_decorators = [(0, core_1.HostBinding)('@myAnimation2')];
                        _callback_decorators = [(0, core_1.HostListener)('@myAnimation2.start', ['$event'])];
                        __esDecorate(null, null, _exp_decorators, { kind: "field", name: "exp", static: false, private: false, access: { has: obj => "exp" in obj, get: obj => obj.exp, set: (obj, value) => { obj.exp = value; } }, metadata: _metadata }, _exp_initializers, _exp_extraInitializers);
                        __esDecorate(null, null, _callback_decorators, { kind: "field", name: "callback", static: false, private: false, access: { has: obj => "callback" in obj, get: obj => obj.callback, set: (obj, value) => { obj.callback = value; } }, metadata: _metadata }, _callback_initializers, _callback_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'TRUE';
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect((_a = cmp.event) === null || _a === void 0 ? void 0 : _a.triggerName).toEqual('myAnimation2');
                expect((_b = cmp.event) === null || _b === void 0 ? void 0 : _b.phaseName).toEqual('start');
                expect((_c = cmp.event) === null || _c === void 0 ? void 0 : _c.totalTime).toEqual(1000);
                expect((_d = cmp.event) === null || _d === void 0 ? void 0 : _d.fromState).toEqual('void');
                expect((_e = cmp.event) === null || _e === void 0 ? void 0 : _e.toState).toEqual('TRUE');
            }));
            it('should always fire callbacks even when a transition is not detected', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-cmp',
                            template: `
              <div [@myAnimation]="exp" (@myAnimation.start)="callback($event)" (@myAnimation.done)="callback($event)"></div>
            `,
                            animations: [(0, animations_1.trigger)('myAnimation', [])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.log = [];
                            this.callback = (event) => this.log.push(`${event.phaseName} => ${event.toState}`);
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
                testing_2.TestBed.configureTestingModule({
                    providers: [{ provide: browser_1.AnimationDriver, useClass: browser_1.NoopAnimationDriver }],
                    declarations: [Cmp],
                });
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'a';
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['start => a', 'done => a']);
                cmp.log = [];
                cmp.exp = 'b';
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['start => b', 'done => b']);
            }));
            it('should fire callback events for leave animations even if there is no leave transition', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-cmp',
                            template: `
              <div *ngIf="exp" @myAnimation (@myAnimation.start)="callback($event)" (@myAnimation.done)="callback($event)"></div>
            `,
                            animations: [(0, animations_1.trigger)('myAnimation', [])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
                            this.log = [];
                            this.callback = (event) => {
                                const state = event.toState || '_default_';
                                this.log.push(`${event.phaseName} => ${state}`);
                            };
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
                testing_2.TestBed.configureTestingModule({
                    providers: [{ provide: browser_1.AnimationDriver, useClass: browser_1.NoopAnimationDriver }],
                    declarations: [Cmp],
                });
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['start => _default_', 'done => _default_']);
                cmp.log = [];
                cmp.exp = false;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['start => void', 'done => void']);
            }));
            it('should fire callbacks on a sub animation once it starts and finishes', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-cmp',
                            template: `
              <div class="parent"
                  [@parent]="exp1"
                  (@parent.start)="cb('parent-start',$event)"
                  (@parent.done)="cb('parent-done', $event)">
                <div class="child"
                  [@child]="exp2"
                  (@child.start)="cb('child-start',$event)"
                  (@child.done)="cb('child-done', $event)"></div>
              </div>
            `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ width: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '100px' })),
                                        (0, animations_1.query)('.child', [(0, animations_1.animateChild)({ duration: '1s' })]),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '0px' })),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ height: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.log = [];
                        }
                        cb(name, event) {
                            this.log.push(name);
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp1 = 'go';
                cmp.exp2 = 'go';
                fixture.detectChanges();
                engine.flush();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['parent-start', 'child-start']);
                cmp.log = [];
                const players = getLog();
                expect(players.length).toEqual(4);
                // players:
                //  - _scp (skipped child player): player for the child animation
                //  - pp1 (parent player 1): player for parent animation (from 0px to 100px)
                //  - pcp (parent child player):
                //     player for child animation executed by parent via query and animateChild
                //  - pp2 (parent player 2): player for parent animation (from 100px to 0px)
                const [_scp, pp1, pcp, pp2] = players;
                pp1.finish();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual([]);
                pcp.finish();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual([]);
                pp2.finish();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['parent-done', 'child-done']);
            }));
            it('should fire callbacks and collect the correct the totalTime and element details for any queried sub animations', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-cmp',
                            template: `
              <div class="parent" [@parent]="exp" (@parent.done)="cb('all','done', $event)">
                <div *ngFor="let item of items"
                     class="item item-{{ item }}"
                     @child
                     (@child.start)="cb('c-' + item, 'start', $event)"
                     (@child.done)="cb('c-' + item, 'done', $event)">
                  {{ item }}
                </div>
              </div>
            `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ opacity: 0 }),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 })),
                                        (0, animations_1.query)('.item', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                        (0, animations_1.query)('.item', [(0, animations_1.animateChild)({ duration: '1.8s', delay: '300ms' })]),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1500, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.log = [];
                            this.events = {};
                            this.items = [0, 1, 2, 3];
                        }
                        cb(name, phase, event) {
                            this.log.push(name + '-' + phase);
                            this.events[name] = event;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'go';
                fixture.detectChanges();
                engine.flush();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['c-0-start', 'c-1-start', 'c-2-start', 'c-3-start']);
                cmp.log = [];
                const players = getLog();
                expect(players.length).toEqual(13);
                // players:
                //  - _sc1p, _sc2p, _sc3p, _sc4p (skipped child n (1 to 4) players):
                //     players for the children animations
                //  - pp1 (parent player 1): player for parent animation (from opacity 0 to opacity 1)
                //  - pc1p1, pc2p1, pc3p1, pc4p1 (parent child n (1 to 4) player 1):
                //     players for children animations executed by parent via query and animate
                //     (from opacity 0 to opacity 1)
                //  - pc1p2, pc2p2, pc3p2, pc4p2 (parent child n (1 to 4) player 2):
                //     players for children animations executed by parent via query and animateChild
                const [_sc1p, _sc2p, _sc3p, _sc4p, pp1, pc1p1, pc2p1, pc3p1, pc4p1, pc1p2, pc2p2, pc3p2, pc4p2,] = getLog();
                pp1.finish();
                pc1p1.finish();
                pc2p1.finish();
                pc3p1.finish();
                pc4p1.finish();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual([]);
                pc1p2.finish();
                pc2p2.finish();
                pc3p2.finish();
                pc4p2.finish();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['all-done', 'c-0-done', 'c-1-done', 'c-2-done', 'c-3-done']);
                expect(cmp.events['all'].totalTime).toEqual(4100); // 1000 + 1000 + 1800 + 300
                expect(cmp.events['all'].element.innerText.trim().replaceAll('\n', ' ')).toEqual('0 1 2 3');
                expect(cmp.events['c-0'].totalTime).toEqual(1500);
                expect(cmp.events['c-0'].element.innerText.trim()).toEqual('0');
                expect(cmp.events['c-1'].totalTime).toEqual(1500);
                expect(cmp.events['c-1'].element.innerText.trim()).toEqual('1');
                expect(cmp.events['c-2'].totalTime).toEqual(1500);
                expect(cmp.events['c-2'].element.innerText.trim()).toEqual('2');
                expect(cmp.events['c-3'].totalTime).toEqual(1500);
                expect(cmp.events['c-3'].element.innerText.trim()).toEqual('3');
            }));
        });
        describe('animation control flags', () => {
            describe('[@.disabled]', () => {
                it('should disable child animations when set to true', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'if-cmp',
                                template: `
              <div [@.disabled]="disableExp">
                <div [@myAnimation]="exp"></div>
              </div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => 1, * => 2', [(0, animations_1.animate)(1234, (0, animations_1.style)({ width: '100px' }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = false;
                                this.disableExp = false;
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
                    resetLog();
                    cmp.disableExp = true;
                    cmp.exp = '1';
                    fixture.detectChanges();
                    let players = getLog();
                    expect(players.length).toEqual(0);
                    cmp.disableExp = false;
                    cmp.exp = '2';
                    fixture.detectChanges();
                    players = getLog();
                    expect(players.length).toEqual(1);
                    expect(players[0].totalTime).toEqual(1234);
                });
                it('should ensure state() values are applied when an animation is disabled', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'if-cmp',
                                template: `
              <div [@.disabled]="disableExp">
                <div [@myAnimation]="exp" #elm></div>
              </div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.state)('1', (0, animations_1.style)({ height: '100px' })),
                                        (0, animations_1.state)('2', (0, animations_1.style)({ height: '200px' })),
                                        (0, animations_1.state)('3', (0, animations_1.style)({ height: '300px' })),
                                        (0, animations_1.transition)('* => *', (0, animations_1.animate)(500)),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _element_decorators;
                        let _element_initializers = [];
                        let _element_extraInitializers = [];
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = false;
                                this.disableExp = false;
                                this.element = __runInitializers(this, _element_initializers, void 0);
                                __runInitializers(this, _element_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "Cmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _element_decorators = [(0, core_1.ViewChild)('elm', { static: true })];
                            __esDecorate(null, null, _element_decorators, { kind: "field", name: "element", static: false, private: false, access: { has: obj => "element" in obj, get: obj => obj.element, set: (obj, value) => { obj.element = value; } }, metadata: _metadata }, _element_initializers, _element_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Cmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Cmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
                    const fixture = testing_2.TestBed.createComponent(Cmp);
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    function assertHeight(element, height) {
                        expect(element.style['height']).toEqual(height);
                    }
                    fixture.detectChanges();
                    const cmp = fixture.componentInstance;
                    const element = cmp.element.nativeElement;
                    fixture.detectChanges();
                    cmp.disableExp = true;
                    cmp.exp = '1';
                    fixture.detectChanges();
                    assertHeight(element, '100px');
                    cmp.exp = '2';
                    fixture.detectChanges();
                    assertHeight(element, '200px');
                    cmp.exp = '3';
                    fixture.detectChanges();
                    assertHeight(element, '300px');
                });
                it('should disable animations for the element that they are disabled on', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'if-cmp',
                                template: `
              <div [@.disabled]="disableExp" [@myAnimation]="exp"></div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => 1, * => 2', [(0, animations_1.animate)(1234, (0, animations_1.style)({ width: '100px' }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = false;
                                this.disableExp = false;
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
                    resetLog();
                    cmp.disableExp = true;
                    cmp.exp = '1';
                    fixture.detectChanges();
                    let players = getLog();
                    expect(players.length).toEqual(0);
                    resetLog();
                    cmp.disableExp = false;
                    cmp.exp = '2';
                    fixture.detectChanges();
                    players = getLog();
                    expect(players.length).toEqual(1);
                    expect(players[0].totalTime).toEqual(1234);
                });
                it('should respect inner disabled nodes once a parent becomes enabled', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'if-cmp',
                                template: `
              <div [@.disabled]="disableParentExp">
                <div [@.disabled]="disableChildExp">
                  <div [@myAnimation]="exp"></div>
                </div>
              </div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => 1, * => 2, * => 3', [(0, animations_1.animate)(1234, (0, animations_1.style)({ width: '100px' }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.disableParentExp = false;
                                this.disableChildExp = false;
                                this.exp = '';
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
                    resetLog();
                    cmp.disableParentExp = true;
                    cmp.disableChildExp = true;
                    cmp.exp = '1';
                    fixture.detectChanges();
                    let players = getLog();
                    expect(players.length).toEqual(0);
                    cmp.disableParentExp = false;
                    cmp.exp = '2';
                    fixture.detectChanges();
                    players = getLog();
                    expect(players.length).toEqual(0);
                    cmp.disableChildExp = false;
                    cmp.exp = '3';
                    fixture.detectChanges();
                    players = getLog();
                    expect(players.length).toEqual(1);
                });
                it('should properly handle dom operations when disabled', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'if-cmp',
                                template: `
              <div [@.disabled]="disableExp" #parent>
                <div *ngIf="exp" @myAnimation></div>
              </div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1234, (0, animations_1.style)({ opacity: 1 }))]),
                                        (0, animations_1.transition)(':leave', [(0, animations_1.animate)(1234, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _parentElm_decorators;
                        let _parentElm_initializers = [];
                        let _parentElm_extraInitializers = [];
                        var Cmp = _classThis = class {
                            constructor() {
                                this.parentElm = __runInitializers(this, _parentElm_initializers, void 0);
                                this.disableExp = (__runInitializers(this, _parentElm_extraInitializers), false);
                                this.exp = false;
                            }
                        };
                        __setFunctionName(_classThis, "Cmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _parentElm_decorators = [(0, core_1.ViewChild)('parent')];
                            __esDecorate(null, null, _parentElm_decorators, { kind: "field", name: "parentElm", static: false, private: false, access: { has: obj => "parentElm" in obj, get: obj => obj.parentElm, set: (obj, value) => { obj.parentElm = value; } }, metadata: _metadata }, _parentElm_initializers, _parentElm_extraInitializers);
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
                    cmp.disableExp = true;
                    fixture.detectChanges();
                    resetLog();
                    const parent = cmp.parentElm.nativeElement;
                    cmp.exp = true;
                    fixture.detectChanges();
                    expect(getLog().length).toEqual(0);
                    expect(parent.childElementCount).toEqual(1);
                    cmp.exp = false;
                    fixture.detectChanges();
                    expect(getLog().length).toEqual(0);
                    expect(parent.childElementCount).toEqual(0);
                });
                it('should properly resolve animation event listeners when disabled', (0, testing_2.fakeAsync)(() => {
                    var _a, _b, _c, _d, _e, _f;
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'if-cmp',
                                template: `
              <div [@.disabled]="disableExp">
                <div [@myAnimation]="exp" (@myAnimation.start)="startEvent=$event" (@myAnimation.done)="doneEvent=$event"></div>
              </div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => 1, * => 2', [
                                            (0, animations_1.style)({ opacity: 0 }),
                                            (0, animations_1.animate)(9876, (0, animations_1.style)({ opacity: 1 })),
                                        ]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.disableExp = false;
                                this.exp = '';
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
                    cmp.disableExp = true;
                    fixture.detectChanges();
                    resetLog();
                    expect(cmp.startEvent).toBeFalsy();
                    expect(cmp.doneEvent).toBeFalsy();
                    cmp.exp = '1';
                    fixture.detectChanges();
                    (0, testing_2.flushMicrotasks)();
                    expect((_a = cmp.startEvent) === null || _a === void 0 ? void 0 : _a.totalTime).toEqual(9876);
                    expect((_b = cmp.startEvent) === null || _b === void 0 ? void 0 : _b.disabled).toBeTruthy();
                    expect((_c = cmp.doneEvent) === null || _c === void 0 ? void 0 : _c.totalTime).toEqual(9876);
                    expect((_d = cmp.doneEvent) === null || _d === void 0 ? void 0 : _d.disabled).toBeTruthy();
                    cmp.exp = '2';
                    cmp.disableExp = false;
                    fixture.detectChanges();
                    (0, testing_2.flushMicrotasks)();
                    expect((_e = cmp.startEvent) === null || _e === void 0 ? void 0 : _e.totalTime).toEqual(9876);
                    expect((_f = cmp.startEvent) === null || _f === void 0 ? void 0 : _f.disabled).toBeFalsy();
                    // the done event isn't fired because it's an actual animation
                }));
                it('should work when there are no animations on the component handling the disable/enable flag', () => {
                    let ParentCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                template: `
              <div [@.disabled]="disableExp">
                <child-cmp #child></child-cmp>
              </div>
                `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _child_decorators;
                        let _child_initializers = [];
                        let _child_extraInitializers = [];
                        var ParentCmp = _classThis = class {
                            constructor() {
                                this.child = __runInitializers(this, _child_initializers, null);
                                this.disableExp = (__runInitializers(this, _child_extraInitializers), false);
                            }
                        };
                        __setFunctionName(_classThis, "ParentCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _child_decorators = [(0, core_1.ViewChild)('child')];
                            __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentCmp = _classThis;
                    })();
                    let ChildCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child-cmp',
                                template: `
                <div [@myAnimation]="exp"></div>
                `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => go, * => goAgain', [
                                            (0, animations_1.style)({ opacity: 0 }),
                                            (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 })),
                                        ]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ChildCmp = _classThis = class {
                            constructor() {
                                this.exp = '';
                            }
                        };
                        __setFunctionName(_classThis, "ChildCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildCmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp] });
                    const fixture = testing_2.TestBed.createComponent(ParentCmp);
                    const cmp = fixture.componentInstance;
                    cmp.disableExp = true;
                    fixture.detectChanges();
                    resetLog();
                    const child = cmp.child;
                    child.exp = 'go';
                    fixture.detectChanges();
                    expect(getLog().length).toEqual(0);
                    resetLog();
                    cmp.disableExp = false;
                    child.exp = 'goAgain';
                    fixture.detectChanges();
                    expect(getLog().length).toEqual(1);
                });
                it('should treat the property as true when the expression is missing', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => go', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(500, (0, animations_1.style)({ opacity: 1 }))]),
                                    ]),
                                ],
                                template: `
              <div @.disabled>
                <div [@myAnimation]="exp"></div>
              </div>
                `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = '';
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
                    resetLog();
                    cmp.exp = 'go';
                    fixture.detectChanges();
                    expect(getLog().length).toEqual(0);
                });
                it('should respect parent/sub animations when the respective area in the DOM is disabled', (0, testing_2.fakeAsync)(() => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent-cmp',
                                animations: [
                                    (0, animations_1.trigger)('parent', [
                                        (0, animations_1.transition)('* => empty', [
                                            (0, animations_1.style)({ opacity: 0 }),
                                            (0, animations_1.query)('@child', [(0, animations_1.animateChild)()]),
                                            (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 })),
                                        ]),
                                    ]),
                                    (0, animations_1.trigger)('child', [(0, animations_1.transition)(':leave', [(0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 0 }))])]),
                                ],
                                template: `
              <div [@.disabled]="disableExp" #container>
                <div [@parent]="exp" (@parent.done)="onDone($event)">
                  <div class="item" *ngFor="let item of items" @child (@child.done)="onDone($event)"></div>
                </div>
              </div>
                `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _container_decorators;
                        let _container_initializers = [];
                        let _container_extraInitializers = [];
                        var Cmp = _classThis = class {
                            constructor() {
                                this.container = __runInitializers(this, _container_initializers, void 0);
                                this.disableExp = (__runInitializers(this, _container_extraInitializers), false);
                                this.exp = '';
                                this.items = [];
                                this.doneLog = [];
                            }
                            onDone(event) {
                                this.doneLog.push(event);
                            }
                        };
                        __setFunctionName(_classThis, "Cmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _container_decorators = [(0, core_1.ViewChild)('container')];
                            __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Cmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Cmp = _classThis;
                    })();
                    testing_2.TestBed.configureTestingModule({ declarations: [Cmp] });
                    const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                    const fixture = testing_2.TestBed.createComponent(Cmp);
                    const cmp = fixture.componentInstance;
                    cmp.disableExp = true;
                    cmp.items = [0, 1, 2, 3, 4];
                    fixture.detectChanges();
                    (0, testing_2.flushMicrotasks)();
                    cmp.exp = 'empty';
                    cmp.items = [];
                    cmp.doneLog = [];
                    fixture.detectChanges();
                    (0, testing_2.flushMicrotasks)();
                    const elms = cmp.container.nativeElement.querySelectorAll('.item');
                    expect(elms.length).toEqual(0);
                    expect(cmp.doneLog.length).toEqual(6);
                }));
            });
        });
        describe('animation normalization', () => {
            it('should convert hyphenated properties to camelcase by default', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
               <div [@myAnimation]="exp"></div>
             `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ 'background-color': 'red', height: '100px', fontSize: '100px' }),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ 'background-color': 'blue', height: '200px', fontSize: '200px' })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                cmp.exp = 'go';
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(1);
                expect(players[0].keyframes).toEqual([
                    new Map([
                        ['backgroundColor', 'red'],
                        ['height', '100px'],
                        ['fontSize', '100px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['backgroundColor', 'blue'],
                        ['height', '200px'],
                        ['fontSize', '200px'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should convert hyphenated properties to camelCase by default that are auto/pre style properties', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
               <div [@myAnimation]="exp"></div>
             `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ 'background-color': animations_1.AUTO_STYLE, 'font-size': '100px' }),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ 'background-color': 'blue', 'font-size': animations_1.ɵPRE_STYLE })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                cmp.exp = 'go';
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(1);
                expect(players[0].keyframes).toEqual([
                    new Map([
                        ['backgroundColor', animations_1.AUTO_STYLE],
                        ['fontSize', '100px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['backgroundColor', 'blue'],
                        ['fontSize', animations_1.ɵPRE_STYLE],
                        ['offset', 1],
                    ]),
                ]);
            });
        });
        it('should throw neither state() or transition() are used inside of trigger()', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'if-cmp',
                        template: `
          <div [@myAnimation]="exp"></div>
        `,
                        animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.animate)(1000, (0, animations_1.style)({ width: '100px' }))])],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.exp = false;
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
            expect(() => {
                testing_2.TestBed.createComponent(Cmp);
            }).toThrowError(/only state\(\) and transition\(\) definitions can sit inside of a trigger\(\)/);
        });
        describe('animation and useAnimation functions', () => {
            it('should apply the delay specified in the animation', () => {
                const animationMetaData = (0, animations_1.animation)([(0, animations_1.style)({ color: 'red' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'green' }))], { delay: 3000 });
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
         <div @anim *ngIf="exp">
         </div>
       `,
                            animations: [(0, animations_1.trigger)('anim', [(0, animations_1.transition)(':enter', (0, animations_1.useAnimation)(animationMetaData))])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(1);
                const [player] = players;
                expect(player.delay).toEqual(3000);
                expect(player.duration).toEqual(1000);
                expect(player.keyframes).toEqual([
                    new Map([
                        ['color', 'red'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['color', 'green'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should apply the delay specified in the animation using params', () => {
                const animationMetaData = (0, animations_1.animation)([(0, animations_1.style)({ color: 'red' }), (0, animations_1.animate)(500, (0, animations_1.style)({ color: 'green' }))], { delay: '{{animationDelay}}ms', params: { animationDelay: 5500 } });
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
         <div @anim *ngIf="exp">
         </div>
       `,
                            animations: [(0, animations_1.trigger)('anim', [(0, animations_1.transition)(':enter', (0, animations_1.useAnimation)(animationMetaData))])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(1);
                const [player] = players;
                expect(player.delay).toEqual(5500);
                expect(player.duration).toEqual(500);
                expect(player.keyframes).toEqual([
                    new Map([
                        ['color', 'red'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['color', 'green'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should apply the delay specified in the useAnimation call', () => {
                const animationMetaData = (0, animations_1.animation)([
                    (0, animations_1.style)({ color: 'red' }),
                    (0, animations_1.animate)(550, (0, animations_1.style)({ color: 'green' })),
                ]);
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
         <div @anim *ngIf="exp">
         </div>
       `,
                            animations: [
                                (0, animations_1.trigger)('anim', [(0, animations_1.transition)(':enter', (0, animations_1.useAnimation)(animationMetaData, { delay: 1500 }))]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(1);
                const [player] = players;
                expect(player.delay).toEqual(1500);
                expect(player.duration).toEqual(550);
                expect(player.keyframes).toEqual([
                    new Map([
                        ['color', 'red'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['color', 'green'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should apply the delay specified in the useAnimation call using params', () => {
                const animationMetaData = (0, animations_1.animation)([
                    (0, animations_1.style)({ color: 'red' }),
                    (0, animations_1.animate)(700, (0, animations_1.style)({ color: 'green' })),
                ]);
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
         <div @anim *ngIf="exp">
         </div>
       `,
                            animations: [
                                (0, animations_1.trigger)('anim', [
                                    (0, animations_1.transition)(':enter', (0, animations_1.useAnimation)(animationMetaData, {
                                        delay: '{{useAnimationDelay}}ms',
                                        params: { useAnimationDelay: 7500 },
                                    })),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(1);
                const [player] = players;
                expect(player.delay).toEqual(7500);
                expect(player.duration).toEqual(700);
                expect(player.keyframes).toEqual([
                    new Map([
                        ['color', 'red'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['color', 'green'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should combine the delays specified in the animation and the useAnimation with that of the caller', () => {
                const animationMetaData = (0, animations_1.animation)([(0, animations_1.style)({ color: 'red' }), (0, animations_1.animate)(567, (0, animations_1.style)({ color: 'green' }))], { delay: 1000 });
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
         <div @anim *ngIf="exp">
         </div>
       `,
                            animations: [
                                (0, animations_1.trigger)('anim', [
                                    (0, animations_1.transition)(':enter', (0, animations_1.useAnimation)(animationMetaData, { delay: 34 }), { delay: 200 }),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(1);
                const [player] = players;
                expect(player.delay).toEqual(1234);
                expect(player.duration).toEqual(567);
                expect(player.keyframes).toEqual([
                    new Map([
                        ['color', 'red'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['color', 'green'],
                        ['offset', 1],
                    ]),
                ]);
            });
        });
        it('should combine multiple errors together into one exception when an animation fails to be built', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'if-cmp',
                        template: `
          <div [@foo]="fooExp" [@bar]="barExp"></div>
        `,
                        animations: [
                            (0, animations_1.trigger)('foo', [
                                (0, animations_1.transition)(':enter', []),
                                (0, animations_1.transition)('* => *', [(0, animations_1.query)('foo', (0, animations_1.animate)(1000, (0, animations_1.style)({ background: 'red' })))]),
                            ]),
                            (0, animations_1.trigger)('bar', [
                                (0, animations_1.transition)(':enter', []),
                                (0, animations_1.transition)('* => *', [(0, animations_1.query)('bar', (0, animations_1.animate)(1000, (0, animations_1.style)({ background: 'blue' })))]),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.fooExp = false;
                        this.barExp = false;
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
            const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_2.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            fixture.detectChanges();
            cmp.fooExp = 'go';
            cmp.barExp = 'go';
            let errorMsg = '';
            try {
                fixture.detectChanges();
            }
            catch (e) {
                errorMsg = e.message;
            }
            expect(errorMsg).toMatch(/@foo has failed due to:/);
            expect(errorMsg).toMatch(/`query\("foo"\)` returned zero elements/);
            expect(errorMsg).toMatch(/@bar has failed due to:/);
            expect(errorMsg).toMatch(/`query\("bar"\)` returned zero elements/);
        });
        it('should not throw an error if styles overlap in separate transitions', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'if-cmp',
                        template: `
          <div [@myAnimation]="exp"></div>
        `,
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [
                                (0, animations_1.transition)('void => *', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('0.5s 1s', (0, animations_1.style)({ opacity: 1 }))]),
                                (0, animations_1.transition)('* => void', [
                                    (0, animations_1.animate)(1000, (0, animations_1.style)({ height: 0 })),
                                    (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 })),
                                ]),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.exp = false;
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
            expect(() => {
                testing_2.TestBed.createComponent(Cmp);
            }).not.toThrowError();
        });
        it("should add the transition provided delay to all the transition's timelines", () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp',
                        template: `
       <div @parent *ngIf="exp">
         <div @child *ngIf="exp"></div>
       </div>
     `,
                        animations: [
                            (0, animations_1.trigger)('parent', [
                                (0, animations_1.transition)(':enter', [
                                    (0, animations_1.style)({ background: 'red' }),
                                    (0, animations_1.group)([
                                        (0, animations_1.animate)('1s 3s ease', (0, animations_1.style)({ background: 'green' })),
                                        (0, animations_1.query)('@child', (0, animations_1.animateChild)()),
                                    ], { delay: 111 }),
                                ], { delay: '2s' }),
                            ]),
                            (0, animations_1.trigger)('child', [
                                (0, animations_1.transition)(':enter', [(0, animations_1.style)({ color: 'white' }), (0, animations_1.animate)('2s 3s ease', (0, animations_1.style)({ color: 'black' }))], { delay: 222 }),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.exp = false;
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
            const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_2.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            cmp.exp = true;
            fixture.detectChanges();
            engine.flush();
            const players = getLog();
            expect(players.length).toEqual(4);
            // players:
            //  - scp (skipped child player): player for the child animation
            //  - pp1 (parent player 1): player for parent animation (from background red to red)
            //  - pp2 (parent player 2): player for parent animation (from background red to green)
            //  - pcp (parent child player):
            //     player for child animation executed by parent via query and animateChild
            const [scp, pp1, pp2, pcp] = players;
            expect(scp.delay).toEqual(222);
            expect(pp1.delay).toEqual(2000);
            expect(pp2.delay).toEqual(2111); // 2000 + 111
            expect(pcp.delay).toEqual(0); // all the delays are included in the child animation
            expect(pcp.duration).toEqual(7333); // 2s + 3s + 2000 + 111 + 222
        });
        it('should keep (transition from/to) styles defined in different timelines', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp',
                        template: '<div @animation *ngIf="exp"></div>',
                        animations: [
                            (0, animations_1.trigger)('animation', [
                                (0, animations_1.transition)(':enter', [
                                    (0, animations_1.group)([
                                        (0, animations_1.style)({ opacity: 0, color: 'red' }),
                                        // Note: the objective of this test is to make sure the animation
                                        // transitions from opacity 0 and color red to opacity 1 and color blue,
                                        // even though the two styles are defined in different timelines
                                        (0, animations_1.animate)(500, (0, animations_1.style)({ opacity: 1, color: 'blue' })),
                                    ]),
                                ]),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.exp = false;
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
            const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_2.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            cmp.exp = true;
            fixture.detectChanges();
            engine.flush();
            const players = getLog();
            expect(players.length).toEqual(1);
            const [player] = players;
            expect(player.keyframes).toEqual([
                new Map([
                    ['opacity', '0'],
                    ['color', 'red'],
                    ['offset', 0],
                ]),
                new Map([
                    ['opacity', '1'],
                    ['color', 'blue'],
                    ['offset', 1],
                ]),
            ]);
        });
        describe('errors for not using the animation module', () => {
            beforeEach(() => {
                testing_2.TestBed.configureTestingModule({
                    providers: [{ provide: core_1.RendererFactory2, useExisting: platform_browser_1.ɵDomRendererFactory2 }],
                });
            });
            function syntheticPropError(name, nameKind) {
                return `NG05105: Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Make sure \`provideAnimationsAsync()\`, \`provideAnimations()\` or \`provideNoopAnimations()\` call was added to a list of providers used to bootstrap an application.
  - There is a corresponding animation configuration named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.dev/api/core/Component#animations).`;
            }
            describe('when modules are missing', () => {
                it('should throw when using an @prop binding without the animation module', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `<div [@myAnimation]="true"></div>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
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
                    const comp = testing_2.TestBed.createComponent(Cmp);
                    expect(() => comp.detectChanges()).toThrowError(syntheticPropError('@myAnimation', 'property'));
                });
                it('should throw when using an @prop listener without the animation module', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `<div (@myAnimation.start)="a = true"></div>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.a = false;
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
                    expect(() => testing_2.TestBed.createComponent(Cmp)).toThrowError(syntheticPropError('@myAnimation.start', 'listener'));
                });
            });
            describe('when modules are present, but animations are missing', () => {
                it('should throw when using an @prop property, BrowserAnimationModule is imported, but there is no animation rule', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `<div [@myAnimation]="true"></div>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
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
                    testing_2.TestBed.configureTestingModule({ declarations: [Cmp], imports: [animations_2.BrowserAnimationsModule] });
                    const comp = testing_2.TestBed.createComponent(Cmp);
                    expect(() => comp.detectChanges()).toThrowError(syntheticPropError('@myAnimation', 'property'));
                });
                it('should throw when using an @prop listener, BrowserAnimationModule is imported, but there is no animation rule', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `<div (@myAnimation.start)="true"></div>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
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
                    testing_2.TestBed.configureTestingModule({ declarations: [Cmp], imports: [animations_2.BrowserAnimationsModule] });
                    expect(() => testing_2.TestBed.createComponent(Cmp)).toThrowError(syntheticPropError('@myAnimation.start', 'listener'));
                });
            });
        });
        describe('non-animatable css props', () => {
            function buildAndAnimateSimpleTestComponent(triggerAnimationData) {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
          <div *ngIf="exp" [@myAnimation]="exp">
            <p *ngIf="exp"></p>
          </div>
        `,
                            animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)('void => *', triggerAnimationData)])],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = false;
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
            }
            it('should show a warning if the animation tries to transition a non-animatable property', () => {
                const spyWarn = spyOn(console, 'warn');
                buildAndAnimateSimpleTestComponent([
                    (0, animations_1.style)({ display: 'block' }),
                    (0, animations_1.animate)(500, (0, animations_1.style)({ display: 'inline' })),
                ]);
                expect(spyWarn).toHaveBeenCalledOnceWith('Warning: The animation trigger "myAnimation" is attempting to animate the following' +
                    ' not animatable properties: display' +
                    '\n' +
                    '(to check the list of all animatable properties visit https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)');
            });
            it('should not show a warning if the animation tries to transition an animatable property', () => {
                const spyWarn = spyOn(console, 'warn');
                buildAndAnimateSimpleTestComponent([
                    (0, animations_1.style)({ fontSize: 5 }),
                    (0, animations_1.animate)(500, (0, animations_1.style)({ fontSize: 15 })),
                ]);
                expect(spyWarn).not.toHaveBeenCalled();
            });
            it('should show a single warning if the animation tries to transition multiple non-animatable properties', () => {
                const spyWarn = spyOn(console, 'warn');
                buildAndAnimateSimpleTestComponent([
                    (0, animations_1.style)({ display: 'block', fontStyle: 'normal' }),
                    (0, animations_1.animate)(500, (0, animations_1.style)({ display: 'inline', fontStyle: 'italic' })),
                ]);
                expect(spyWarn).toHaveBeenCalledOnceWith('Warning: The animation trigger "myAnimation" is attempting to animate the following' +
                    ' not animatable properties: display, fontStyle' +
                    '\n' +
                    '(to check the list of all animatable properties visit https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)');
            });
            it('should only warn on non-animatable properties if the animation tries to transition both animate and non-animatable properties', () => {
                const spyWarn = spyOn(console, 'warn');
                buildAndAnimateSimpleTestComponent([
                    (0, animations_1.style)({ 'flex-direction': 'column', fontSize: 5 }),
                    (0, animations_1.animate)(500, (0, animations_1.style)({ 'flex-direction': 'row', fontSize: 10 })),
                ]);
                expect(spyWarn).toHaveBeenCalledOnceWith('Warning: The animation trigger "myAnimation" is attempting to animate the following' +
                    ' not animatable properties: flex-direction' +
                    '\n' +
                    '(to check the list of all animatable properties visit https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)');
            });
            it('should not show a warning if the animation uses but does not animate a non-animatable property', () => {
                const spyWarn = spyOn(console, 'warn');
                buildAndAnimateSimpleTestComponent([(0, animations_1.transition)('void => *', [(0, animations_1.style)({ display: 'block' })])]);
                expect(spyWarn).not.toHaveBeenCalled();
            });
            it('should not show a warning if the same non-animatable property is used (with different values) on different elements in the same transition', () => {
                const spyWarn = spyOn(console, 'warn');
                buildAndAnimateSimpleTestComponent([
                    (0, animations_1.style)({ position: 'relative' }),
                    (0, animations_1.query)(':enter', [
                        (0, animations_1.style)({
                            position: 'absolute',
                        }),
                    ]),
                ]);
                expect(spyWarn).not.toHaveBeenCalled();
            });
            it('should not show a warning if a different easing function is used in different steps', () => {
                const spyWarn = spyOn(console, 'warn');
                buildAndAnimateSimpleTestComponent([
                    (0, animations_1.sequence)([
                        (0, animations_1.animate)('1s ease-in', (0, animations_1.style)({ background: 'red' })),
                        (0, animations_1.animate)('1s ease-out', (0, animations_1.style)({ background: 'green' })),
                    ]),
                ]);
                expect(spyWarn).not.toHaveBeenCalled();
            });
        });
    });
})();
function assertHasParent(element, yes) {
    const parent = element.parentNode;
    if (yes) {
        expect(parent).toBeTruthy();
    }
    else {
        expect(parent).toBeFalsy();
    }
}
function buildParams(params) {
    return { params };
}
