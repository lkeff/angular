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
const index_1 = require("../../index");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const index_2 = require("../index");
const async_1 = require("../async");
const dom_renderer_1 = require("../../src/dom/dom_renderer");
const testing_2 = require("@angular/private/testing");
const browser_util_1 = require("../../testing/src/browser_util");
(function () {
    if (isNode)
        return;
    describe('AnimationRenderer', () => {
        let element;
        beforeEach(() => {
            element = (0, browser_util_1.el)('<div></div>');
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: browser_1.ɵAnimationEngine, useClass: MockAnimationEngine }],
                imports: [index_2.BrowserAnimationsModule],
            });
        });
        function makeRenderer(animationTriggers = []) {
            const type = {
                id: 'id',
                encapsulation: null,
                styles: [],
                data: { 'animation': animationTriggers },
            };
            return testing_1.TestBed.inject(core_1.RendererFactory2).createRenderer(element, type);
        }
        it("should hook into the engine's insert operations when appending children", () => {
            const renderer = makeRenderer();
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const container = (0, browser_util_1.el)('<div></div>');
            renderer.appendChild(container, element);
            expect(engine.captures['onInsert'].pop()).toEqual([element]);
        });
        it("should hook into the engine's insert operations when inserting a child before another", () => {
            const renderer = makeRenderer();
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const container = (0, browser_util_1.el)('<div></div>');
            const element2 = (0, browser_util_1.el)('<div></div>');
            container.appendChild(element2);
            renderer.insertBefore(container, element, element2);
            expect(engine.captures['onInsert'].pop()).toEqual([element]);
        });
        it("should hook into the engine's insert operations when removing children", () => {
            const renderer = makeRenderer();
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            renderer.removeChild(null, element);
            expect(engine.captures['onRemove'].pop()).toEqual([element]);
        });
        it("should hook into the engine's setProperty call if the property begins with `@`", () => {
            const renderer = makeRenderer();
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            renderer.setProperty(element, 'prop', 'value');
            expect(engine.captures['setProperty']).toBeFalsy();
            renderer.setProperty(element, '@prop', 'value');
            expect(engine.captures['setProperty'].pop()).toEqual([element, 'prop', 'value']);
        });
        // https://github.com/angular/angular/issues/32794
        it('should support nested animation triggers', () => {
            makeRenderer([[(0, animations_1.trigger)('myAnimation', [])]]);
            const { triggers } = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            expect(triggers.length).toEqual(1);
            expect(triggers[0].name).toEqual('myAnimation');
        });
        describe('listen', () => {
            it("should hook into the engine's listen call if the property begins with `@`", () => {
                const renderer = makeRenderer();
                const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
                const cb = (event) => {
                    return true;
                };
                renderer.listen(element, 'event', cb);
                expect(engine.captures['listen']).toBeFalsy();
                renderer.listen(element, '@event.phase', cb);
                expect(engine.captures['listen'].pop()).toEqual([element, 'event', 'phase']);
            });
            it('should resolve the body|document|window nodes given their values as strings as input', () => {
                const renderer = makeRenderer();
                const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
                const cb = (event) => {
                    return true;
                };
                renderer.listen('body', '@event', cb);
                expect(engine.captures['listen'].pop()[0]).toBe(document.body);
                renderer.listen('document', '@event', cb);
                expect(engine.captures['listen'].pop()[0]).toBe(document);
                renderer.listen('window', '@event', cb);
                expect(engine.captures['listen'].pop()[0]).toBe(window);
            });
        });
        describe('registering animations', () => {
            it('should only create a trigger definition once even if the registered multiple times');
        });
        describe('flushing animations', () => {
            // these tests are only meant to be run within the DOM
            if (isNode)
                return;
            it('should flush and fire callbacks when the zone becomes stable', (async) => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-cmp',
                            template: '<div [@myAnimation]="exp" (@myAnimation.start)="onStart($event)"></div>',
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
                            this.event = event;
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
                testing_1.TestBed.configureTestingModule({
                    providers: [{ provide: browser_1.ɵAnimationEngine, useClass: index_2.ɵInjectableAnimationEngine }],
                    declarations: [Cmp],
                });
                const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_1.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = 'state';
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(cmp.event.triggerName).toEqual('myAnimation');
                    expect(cmp.event.phaseName).toEqual('start');
                    cmp.event = null;
                    engine.flush();
                    expect(cmp.event).toBeFalsy();
                    async();
                });
            });
            it('should properly insert/remove nodes through the animation renderer that do not contain animations', (async) => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-cmp',
                            template: '<div #elm *ngIf="exp"></div>',
                            animations: [
                                (0, animations_1.trigger)('someAnimation', [
                                    (0, animations_1.transition)('* => *', [
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
                        _element_decorators = [(0, core_1.ViewChild)('elm')];
                        __esDecorate(null, null, _element_decorators, { kind: "field", name: "element", static: false, private: false, access: { has: obj => "element" in obj, get: obj => obj.element, set: (obj, value) => { obj.element = value; } }, metadata: _metadata }, _element_initializers, _element_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    providers: [{ provide: browser_1.ɵAnimationEngine, useClass: index_2.ɵInjectableAnimationEngine }],
                    declarations: [Cmp],
                });
                const fixture = testing_1.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    cmp.exp = false;
                    const element = cmp.element;
                    expect(element.nativeElement.parentNode).toBeTruthy();
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        expect(element.nativeElement.parentNode).toBeFalsy();
                        async();
                    });
                });
            });
            it('should only queue up dom removals if the element itself contains a valid leave animation', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-cmp',
                            template: `
               <div #elm1 *ngIf="exp1"></div>
               <div #elm2 @animation1 *ngIf="exp2"></div>
               <div #elm3 @animation2 *ngIf="exp3"></div>
            `,
                            animations: [
                                (0, animations_1.trigger)('animation1', [(0, animations_1.transition)('a => b', [])]),
                                (0, animations_1.trigger)('animation2', [(0, animations_1.transition)(':leave', [])]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _elm1_decorators;
                    let _elm1_initializers = [];
                    let _elm1_extraInitializers = [];
                    let _elm2_decorators;
                    let _elm2_initializers = [];
                    let _elm2_extraInitializers = [];
                    let _elm3_decorators;
                    let _elm3_initializers = [];
                    let _elm3_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp1 = true;
                            this.exp2 = true;
                            this.exp3 = true;
                            this.elm1 = __runInitializers(this, _elm1_initializers, void 0);
                            this.elm2 = (__runInitializers(this, _elm1_extraInitializers), __runInitializers(this, _elm2_initializers, void 0));
                            this.elm3 = (__runInitializers(this, _elm2_extraInitializers), __runInitializers(this, _elm3_initializers, void 0));
                            __runInitializers(this, _elm3_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _elm1_decorators = [(0, core_1.ViewChild)('elm1')];
                        _elm2_decorators = [(0, core_1.ViewChild)('elm2')];
                        _elm3_decorators = [(0, core_1.ViewChild)('elm3')];
                        __esDecorate(null, null, _elm1_decorators, { kind: "field", name: "elm1", static: false, private: false, access: { has: obj => "elm1" in obj, get: obj => obj.elm1, set: (obj, value) => { obj.elm1 = value; } }, metadata: _metadata }, _elm1_initializers, _elm1_extraInitializers);
                        __esDecorate(null, null, _elm2_decorators, { kind: "field", name: "elm2", static: false, private: false, access: { has: obj => "elm2" in obj, get: obj => obj.elm2, set: (obj, value) => { obj.elm2 = value; } }, metadata: _metadata }, _elm2_initializers, _elm2_extraInitializers);
                        __esDecorate(null, null, _elm3_decorators, { kind: "field", name: "elm3", static: false, private: false, access: { has: obj => "elm3" in obj, get: obj => obj.elm3, set: (obj, value) => { obj.elm3 = value; } }, metadata: _metadata }, _elm3_initializers, _elm3_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    providers: [{ provide: browser_1.ɵAnimationEngine, useClass: index_2.ɵInjectableAnimationEngine }],
                    declarations: [Cmp],
                });
                const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_1.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                fixture.detectChanges();
                const elm1 = cmp.elm1;
                const elm2 = cmp.elm2;
                const elm3 = cmp.elm3;
                assertHasParent(elm1);
                assertHasParent(elm2);
                assertHasParent(elm3);
                engine.flush();
                finishPlayers(engine.players);
                cmp.exp1 = false;
                fixture.detectChanges();
                assertHasParent(elm1, false);
                assertHasParent(elm2);
                assertHasParent(elm3);
                engine.flush();
                expect(engine.players.length).toEqual(0);
                cmp.exp2 = false;
                fixture.detectChanges();
                assertHasParent(elm1, false);
                assertHasParent(elm2, false);
                assertHasParent(elm3);
                engine.flush();
                expect(engine.players.length).toEqual(0);
                cmp.exp3 = false;
                fixture.detectChanges();
                assertHasParent(elm1, false);
                assertHasParent(elm2, false);
                assertHasParent(elm3);
                engine.flush();
                expect(engine.players.length).toEqual(1);
            });
        });
    });
    describe('AnimationRendererFactory', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.RendererFactory2,
                        useClass: ExtendedAnimationRendererFactory,
                        deps: [dom_renderer_1.DomRendererFactory2, browser_1.ɵAnimationEngine, core_1.NgZone],
                    },
                ],
                imports: [index_2.BrowserAnimationsModule],
            });
        });
        it('should provide hooks at the start and end of change detection', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `
          <div [@myAnimation]="exp"></div>
        `,
                        animations: [(0, animations_1.trigger)('myAnimation', [])],
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
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: browser_1.ɵAnimationEngine, useClass: index_2.ɵInjectableAnimationEngine }],
                declarations: [Cmp],
            });
            const renderer = testing_1.TestBed.inject(core_1.RendererFactory2);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            renderer.log = [];
            fixture.changeDetectorRef.detectChanges();
            expect(renderer.log).toEqual(['begin', 'end']);
            renderer.log = [];
            fixture.changeDetectorRef.detectChanges();
            expect(renderer.log).toEqual(['begin', 'end']);
        });
    });
    describe('destroy', () => {
        beforeEach(core_1.destroyPlatform);
        afterEach(core_1.destroyPlatform);
        // See https://github.com/angular/angular/issues/39955
        it('should clear bootstrapped component contents when the `BrowserAnimationsModule` is imported', (0, testing_2.withBody)('<div>before</div><app-root></app-root><div>after</div>', () => __awaiter(this, void 0, void 0, function* () {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        template: 'app-root content',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            let AppModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [index_2.BrowserAnimationsModule],
                        declarations: [AppComponent],
                        bootstrap: [AppComponent],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppModule = _classThis = class {
                };
                __setFunctionName(_classThis, "AppModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppModule = _classThis;
            })();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(AppModule);
            const root = document.body.querySelector('app-root');
            expect(root.textContent).toEqual('app-root content');
            expect(document.body.childNodes.length).toEqual(3);
            ngModuleRef.destroy();
            expect(document.body.querySelector('app-root')).toBeFalsy(); // host element is removed
            expect(document.body.childNodes.length).toEqual(2); // other elements are preserved
        })));
        // See https://github.com/angular/angular/issues/45108
        it('should clear bootstrapped component contents when the animation engine is requested during initialization', (0, testing_2.withBody)('<div>before</div><app-root></app-root><div>after</div>', () => __awaiter(this, void 0, void 0, function* () {
            let AppService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppService = _classThis = class {
                    // The `RendererFactory2` is injected here explicitly because we import the
                    // `BrowserAnimationsModule`. The `RendererFactory2` will be provided with
                    // `AnimationRendererFactory` which relies on the `AnimationEngine`. We want to ensure
                    // that `ApplicationRef` is created earlier before the `AnimationEngine`, because
                    // previously the `AnimationEngine` was created before the `ApplicationRef` (see the
                    // link above to the original issue). The `ApplicationRef` was created after
                    // `APP_INITIALIZER` has been run but before the root module is bootstrapped.
                    constructor(rendererFactory) { }
                };
                __setFunctionName(_classThis, "AppService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppService = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        template: 'app-root content',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            let AppModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [index_2.BrowserAnimationsModule],
                        declarations: [AppComponent],
                        bootstrap: [AppComponent],
                        providers: [
                            // The `APP_INITIALIZER` token is requested before the root module is bootstrapped,
                            // the `useFactory` just injects the `AppService` that injects the
                            // `RendererFactory2`.
                            {
                                provide: core_1.APP_INITIALIZER,
                                useFactory: () => (appService) => appService,
                                deps: [AppService],
                                multi: true,
                            },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppModule = _classThis = class {
                };
                __setFunctionName(_classThis, "AppModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppModule = _classThis;
            })();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(AppModule);
            const root = document.body.querySelector('app-root');
            expect(root.textContent).toEqual('app-root content');
            expect(document.body.childNodes.length).toEqual(3);
            ngModuleRef.destroy();
            expect(document.body.querySelector('app-root')).toBeFalsy(); // host element is removed
            expect(document.body.childNodes.length).toEqual(2); // other elements are preserved
        })));
        // See https://github.com/angular/angular/issues/45108
        it('should clear standalone bootstrapped component contents when the animation engine is requested during initialization', (0, testing_2.withBody)('<div>before</div><app-root></app-root><div>after</div>', () => __awaiter(this, void 0, void 0, function* () {
            let AppService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppService = _classThis = class {
                    // The `RendererFactory2` is injected here explicitly because we import the
                    // `BrowserAnimationsModule`. The `RendererFactory2` will be provided with
                    // `AnimationRendererFactory` which relies on the `AnimationEngine`. We want to ensure
                    // that `ApplicationRef` is created earlier before the `AnimationEngine`, because
                    // previously the `AnimationEngine` was created before the `ApplicationRef` (see the
                    // link above to the original issue). The `ApplicationRef` was created after
                    // `APP_INITIALIZER` has been run but before the root module is bootstrapped.
                    constructor(rendererFactory) { }
                };
                __setFunctionName(_classThis, "AppService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppService = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'app-root', template: 'app-root content', standalone: true })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const appRef = yield (0, index_1.bootstrapApplication)(AppComponent, {
                providers: [
                    (0, core_1.importProvidersFrom)(index_2.BrowserAnimationsModule),
                    // The `APP_INITIALIZER` token is requested before the standalone component is
                    // bootstrapped, the `useFactory` just injects the `AppService` that injects the
                    // `RendererFactory2`.
                    {
                        provide: core_1.APP_INITIALIZER,
                        useFactory: () => (appService) => appService,
                        deps: [AppService],
                        multi: true,
                    },
                ],
            });
            const root = document.body.querySelector('app-root');
            expect(root.textContent).toEqual('app-root content');
            expect(document.body.childNodes.length).toEqual(3);
            appRef.destroy();
            expect(document.body.querySelector('app-root')).toBeFalsy(); // host element is removed
            expect(document.body.childNodes.length).toEqual(2); // other elements are
        })));
        it('should clear bootstrapped component contents when async animations are used', (0, testing_2.withBody)('<div>before</div><app-root></app-root><div>after</div>', () => __awaiter(this, void 0, void 0, function* () {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'app-root', template: 'app-root content', standalone: true })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const appRef = yield (0, index_1.bootstrapApplication)(AppComponent, {
                providers: [(0, async_1.provideAnimationsAsync)()],
            });
            const root = document.body.querySelector('app-root');
            expect(root.textContent).toEqual('app-root content');
            expect(document.body.childNodes.length).toEqual(3);
            appRef.destroy();
            expect(document.body.querySelector('app-root')).toBeFalsy(); // host element is removed
            expect(document.body.childNodes.length).toEqual(2); // other elements are
        })));
    });
})();
let MockAnimationEngine = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = index_2.ɵInjectableAnimationEngine;
    var MockAnimationEngine = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.captures = {};
            this.triggers = [];
        }
        _capture(name, args) {
            const data = (this.captures[name] = this.captures[name] || []);
            data.push(args);
        }
        registerTrigger(componentId, namespaceId, hostElement, name, metadata) {
            this.triggers.push(metadata);
        }
        onInsert(namespaceId, element) {
            this._capture('onInsert', [element]);
        }
        onRemove(namespaceId, element, domFn) {
            this._capture('onRemove', [element]);
        }
        process(namespaceId, element, property, value) {
            this._capture('setProperty', [element, property, value]);
            return true;
        }
        listen(namespaceId, element, eventName, eventPhase, callback) {
            // we don't capture the callback here since the renderer wraps it in a zone
            this._capture('listen', [element, eventName, eventPhase]);
            return () => { };
        }
        flush() { }
        destroy(namespaceId) { }
    };
    __setFunctionName(_classThis, "MockAnimationEngine");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MockAnimationEngine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MockAnimationEngine = _classThis;
})();
let ExtendedAnimationRendererFactory = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = browser_1.ɵAnimationRendererFactory;
    var ExtendedAnimationRendererFactory = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.log = [];
        }
        begin() {
            super.begin();
            this.log.push('begin');
        }
        end() {
            super.end();
            this.log.push('end');
        }
    };
    __setFunctionName(_classThis, "ExtendedAnimationRendererFactory");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExtendedAnimationRendererFactory = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExtendedAnimationRendererFactory = _classThis;
})();
function assertHasParent(element, yes = true) {
    const parent = element.nativeElement.parentNode;
    if (yes) {
        expect(parent).toBeTruthy();
    }
    else {
        expect(parent).toBeFalsy();
    }
}
function finishPlayers(players) {
    players.forEach((player) => player.finish());
}
