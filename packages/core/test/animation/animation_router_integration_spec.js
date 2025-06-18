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
const animations_2 = require("@angular/platform-browser/animations");
const router_1 = require("@angular/router");
(function () {
    // these tests are only meant to be run within the DOM (for now)
    if (isNode)
        return;
    describe('Animation Router Tests', function () {
        function getLog() {
            return testing_1.MockAnimationDriver.log;
        }
        function resetLog() {
            testing_1.MockAnimationDriver.log = [];
        }
        beforeEach(() => {
            resetLog();
            testing_2.TestBed.configureTestingModule({
                imports: [router_1.RouterModule.forRoot([]), animations_2.BrowserAnimationsModule],
                providers: [{ provide: browser_1.AnimationDriver, useClass: testing_1.MockAnimationDriver }],
            });
        });
        it('should query the old and new routes via :leave and :enter', (0, testing_2.fakeAsync)(() => {
            let ContainerCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        animations: [
                            (0, animations_1.trigger)('routerAnimations', [
                                (0, animations_1.transition)('page1 => page2', [
                                    (0, animations_1.query)(':leave', (0, animations_1.animateChild)()),
                                    (0, animations_1.query)(':enter', (0, animations_1.animateChild)()),
                                ]),
                            ]),
                        ],
                        template: `
          <div [@routerAnimations]="prepareRouteAnimation(r)">
            <router-outlet #r="outlet"></router-outlet>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ContainerCmp = _classThis = class {
                    constructor(router) {
                        this.router = router;
                    }
                    prepareRouteAnimation(r) {
                        const animation = r.activatedRouteData['animation'];
                        const value = animation ? animation['value'] : null;
                        return value;
                    }
                };
                __setFunctionName(_classThis, "ContainerCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContainerCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContainerCmp = _classThis;
            })();
            let Page1Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'page1',
                        template: `page1`,
                        animations: [
                            (0, animations_1.trigger)('page1Animation', [
                                (0, animations_1.transition)(':leave', [(0, animations_1.style)({ width: '200px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '0px' }))]),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _doAnimate_decorators;
                let _doAnimate_initializers = [];
                let _doAnimate_extraInitializers = [];
                var Page1Cmp = _classThis = class {
                    constructor() {
                        this.doAnimate = __runInitializers(this, _doAnimate_initializers, true);
                        __runInitializers(this, _doAnimate_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Page1Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _doAnimate_decorators = [(0, core_1.HostBinding)('@page1Animation')];
                    __esDecorate(null, null, _doAnimate_decorators, { kind: "field", name: "doAnimate", static: false, private: false, access: { has: obj => "doAnimate" in obj, get: obj => obj.doAnimate, set: (obj, value) => { obj.doAnimate = value; } }, metadata: _metadata }, _doAnimate_initializers, _doAnimate_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Page1Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Page1Cmp = _classThis;
            })();
            let Page2Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'page2',
                        template: `page2`,
                        animations: [
                            (0, animations_1.trigger)('page2Animation', [
                                (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _doAnimate_decorators;
                let _doAnimate_initializers = [];
                let _doAnimate_extraInitializers = [];
                var Page2Cmp = _classThis = class {
                    constructor() {
                        this.doAnimate = __runInitializers(this, _doAnimate_initializers, true);
                        __runInitializers(this, _doAnimate_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Page2Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _doAnimate_decorators = [(0, core_1.HostBinding)('@page2Animation')];
                    __esDecorate(null, null, _doAnimate_decorators, { kind: "field", name: "doAnimate", static: false, private: false, access: { has: obj => "doAnimate" in obj, get: obj => obj.doAnimate, set: (obj, value) => { obj.doAnimate = value; } }, metadata: _metadata }, _doAnimate_initializers, _doAnimate_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Page2Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Page2Cmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                declarations: [Page1Cmp, Page2Cmp, ContainerCmp],
                imports: [
                    router_1.RouterModule.forRoot([
                        { path: 'page1', component: Page1Cmp, data: makeAnimationData('page1') },
                        { path: 'page2', component: Page2Cmp, data: makeAnimationData('page2') },
                    ]),
                ],
            });
            const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_2.TestBed.createComponent(ContainerCmp);
            const cmp = fixture.componentInstance;
            cmp.router.initialNavigation();
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            cmp.router.navigateByUrl('/page1');
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            cmp.router.navigateByUrl('/page2');
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            const player = engine.players[0];
            const groupPlayer = player.getRealPlayer();
            const players = groupPlayer.players;
            expect(players.length).toEqual(2);
            const [p1, p2] = players;
            expect(p1.duration).toEqual(1000);
            expect(p1.keyframes).toEqual([
                new Map([
                    ['offset', 0],
                    ['width', '200px'],
                ]),
                new Map([
                    ['offset', 1],
                    ['width', '0px'],
                ]),
            ]);
            expect(p2.duration).toEqual(2000);
            expect(p2.keyframes).toEqual([
                new Map([
                    ['offset', 0],
                    ['opacity', '0'],
                ]),
                new Map([
                    ['offset', 0.5],
                    ['opacity', '0'],
                ]),
                new Map([
                    ['offset', 1],
                    ['opacity', '1'],
                ]),
            ]);
        }));
        it('should allow inner enter animations to be emulated within a routed item', (0, testing_2.fakeAsync)(() => {
            let ContainerCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        animations: [
                            (0, animations_1.trigger)('routerAnimations', [
                                (0, animations_1.transition)('page1 => page2', [(0, animations_1.query)(':enter', (0, animations_1.animateChild)())]),
                            ]),
                        ],
                        template: `
          <div [@routerAnimations]="prepareRouteAnimation(r)">
            <router-outlet #r="outlet"></router-outlet>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ContainerCmp = _classThis = class {
                    constructor(router) {
                        this.router = router;
                    }
                    prepareRouteAnimation(r) {
                        const animation = r.activatedRouteData['animation'];
                        const value = animation ? animation['value'] : null;
                        return value;
                    }
                };
                __setFunctionName(_classThis, "ContainerCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContainerCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContainerCmp = _classThis;
            })();
            let Page1Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'page1',
                        template: `page1`,
                        animations: [],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Page1Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Page1Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Page1Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Page1Cmp = _classThis;
            })();
            let Page2Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'page2',
                        template: `
          <h1>Page 2</h1>
          <div *ngIf="exp" class="if-one" @ifAnimation></div>
          <div *ngIf="exp" class="if-two" @ifAnimation></div>
        `,
                        animations: [
                            (0, animations_1.trigger)('page2Animation', [
                                (0, animations_1.transition)(':enter', [
                                    (0, animations_1.query)('.if-one', (0, animations_1.animateChild)()),
                                    (0, animations_1.query)('.if-two', (0, animations_1.animateChild)()),
                                ]),
                            ]),
                            (0, animations_1.trigger)('ifAnimation', [
                                (0, animations_1.transition)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _doAnimate_decorators;
                let _doAnimate_initializers = [];
                let _doAnimate_extraInitializers = [];
                var Page2Cmp = _classThis = class {
                    constructor() {
                        this.doAnimate = __runInitializers(this, _doAnimate_initializers, true);
                        this.exp = (__runInitializers(this, _doAnimate_extraInitializers), true);
                    }
                };
                __setFunctionName(_classThis, "Page2Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _doAnimate_decorators = [(0, core_1.HostBinding)('@page2Animation')];
                    __esDecorate(null, null, _doAnimate_decorators, { kind: "field", name: "doAnimate", static: false, private: false, access: { has: obj => "doAnimate" in obj, get: obj => obj.doAnimate, set: (obj, value) => { obj.doAnimate = value; } }, metadata: _metadata }, _doAnimate_initializers, _doAnimate_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Page2Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Page2Cmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                declarations: [Page1Cmp, Page2Cmp, ContainerCmp],
                imports: [
                    router_1.RouterModule.forRoot([
                        { path: 'page1', component: Page1Cmp, data: makeAnimationData('page1') },
                        { path: 'page2', component: Page2Cmp, data: makeAnimationData('page2') },
                    ]),
                ],
            });
            const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_2.TestBed.createComponent(ContainerCmp);
            const cmp = fixture.componentInstance;
            cmp.router.initialNavigation();
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            cmp.router.navigateByUrl('/page1');
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            cmp.router.navigateByUrl('/page2');
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            const player = engine.players[0];
            const groupPlayer = player.getRealPlayer();
            const players = groupPlayer.players;
            expect(players.length).toEqual(2);
            const [p1, p2] = players;
            expect(p1.keyframes).toEqual([
                new Map([
                    ['offset', 0],
                    ['opacity', '0'],
                ]),
                new Map([
                    ['offset', 1],
                    ['opacity', '1'],
                ]),
            ]);
            expect(p2.keyframes).toEqual([
                new Map([
                    ['offset', 0],
                    ['opacity', '0'],
                ]),
                new Map([
                    ['offset', 0.5],
                    ['opacity', '0'],
                ]),
                new Map([
                    ['offset', 1],
                    ['opacity', '1'],
                ]),
            ]);
        }));
        it('should allow inner leave animations to be emulated within a routed item', (0, testing_2.fakeAsync)(() => {
            let ContainerCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        animations: [
                            (0, animations_1.trigger)('routerAnimations', [
                                (0, animations_1.transition)('page1 => page2', [(0, animations_1.query)(':leave', (0, animations_1.animateChild)())]),
                            ]),
                        ],
                        template: `
          <div [@routerAnimations]="prepareRouteAnimation(r)">
            <router-outlet #r="outlet"></router-outlet>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ContainerCmp = _classThis = class {
                    constructor(router) {
                        this.router = router;
                    }
                    prepareRouteAnimation(r) {
                        const animation = r.activatedRouteData['animation'];
                        const value = animation ? animation['value'] : null;
                        return value;
                    }
                };
                __setFunctionName(_classThis, "ContainerCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContainerCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContainerCmp = _classThis;
            })();
            let Page1Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'page1',
                        template: `
          <h1>Page 1</h1>
          <div *ngIf="exp" class="if-one" @ifAnimation></div>
          <div *ngIf="exp" class="if-two" @ifAnimation></div>
        `,
                        animations: [
                            (0, animations_1.trigger)('page1Animation', [
                                (0, animations_1.transition)(':leave', [
                                    (0, animations_1.query)('.if-one', (0, animations_1.animateChild)()),
                                    (0, animations_1.query)('.if-two', (0, animations_1.animateChild)()),
                                ]),
                            ]),
                            (0, animations_1.trigger)('ifAnimation', [
                                (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _doAnimate_decorators;
                let _doAnimate_initializers = [];
                let _doAnimate_extraInitializers = [];
                var Page1Cmp = _classThis = class {
                    constructor() {
                        this.doAnimate = __runInitializers(this, _doAnimate_initializers, true);
                        this.exp = (__runInitializers(this, _doAnimate_extraInitializers), true);
                    }
                };
                __setFunctionName(_classThis, "Page1Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _doAnimate_decorators = [(0, core_1.HostBinding)('@page1Animation')];
                    __esDecorate(null, null, _doAnimate_decorators, { kind: "field", name: "doAnimate", static: false, private: false, access: { has: obj => "doAnimate" in obj, get: obj => obj.doAnimate, set: (obj, value) => { obj.doAnimate = value; } }, metadata: _metadata }, _doAnimate_initializers, _doAnimate_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Page1Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Page1Cmp = _classThis;
            })();
            let Page2Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'page2',
                        template: `page2`,
                        animations: [],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Page2Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Page2Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Page2Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Page2Cmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                declarations: [Page1Cmp, Page2Cmp, ContainerCmp],
                imports: [
                    router_1.RouterModule.forRoot([
                        { path: 'page1', component: Page1Cmp, data: makeAnimationData('page1') },
                        { path: 'page2', component: Page2Cmp, data: makeAnimationData('page2') },
                    ]),
                ],
            });
            const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_2.TestBed.createComponent(ContainerCmp);
            const cmp = fixture.componentInstance;
            cmp.router.initialNavigation();
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            cmp.router.navigateByUrl('/page1');
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            cmp.router.navigateByUrl('/page2');
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            const player = engine.players[0];
            const groupPlayer = player.getRealPlayer();
            const players = groupPlayer.players;
            expect(players.length).toEqual(2);
            const [p1, p2] = players;
            expect(p1.keyframes).toEqual([
                new Map([
                    ['offset', 0],
                    ['opacity', '1'],
                ]),
                new Map([
                    ['offset', 1],
                    ['opacity', '0'],
                ]),
            ]);
            expect(p2.keyframes).toEqual([
                new Map([
                    ['offset', 0],
                    ['opacity', '1'],
                ]),
                new Map([
                    ['offset', 0.5],
                    ['opacity', '1'],
                ]),
                new Map([
                    ['offset', 1],
                    ['opacity', '0'],
                ]),
            ]);
        }));
        it('should properly collect :enter / :leave router nodes even when another non-router *template component is within the trigger boundaries', (0, testing_2.fakeAsync)(() => {
            let ContainerCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        animations: [
                            (0, animations_1.trigger)('pageAnimation', [
                                (0, animations_1.transition)('page1 => page2', [
                                    (0, animations_1.query)('.router-container :leave', (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 0 }))),
                                    (0, animations_1.query)('.router-container :enter', (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))),
                                ]),
                            ]),
                        ],
                        template: `
          <div [@pageAnimation]="prepRoute(outlet)">
            <header>
              <div class="inner">
                <div *ngIf="!loading" class="title">Page Ready</div>
                <div *ngIf="loading" class="loading">loading...</div>
              </div>
            </header>
            <section class="router-container">
              <router-outlet #outlet="outlet"></router-outlet>
            </section>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ContainerCmp = _classThis = class {
                    constructor(router) {
                        this.router = router;
                        this.loading = false;
                    }
                    prepRoute(outlet) {
                        return outlet.activatedRouteData['animation'];
                    }
                };
                __setFunctionName(_classThis, "ContainerCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContainerCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContainerCmp = _classThis;
            })();
            let Page1Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'page1',
                        template: `page1`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Page1Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Page1Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Page1Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Page1Cmp = _classThis;
            })();
            let Page2Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'page2',
                        template: `page2`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Page2Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Page2Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Page2Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Page2Cmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                declarations: [Page1Cmp, Page2Cmp, ContainerCmp],
                imports: [
                    router_1.RouterModule.forRoot([
                        { path: 'page1', component: Page1Cmp, data: makeAnimationData('page1') },
                        { path: 'page2', component: Page2Cmp, data: makeAnimationData('page2') },
                    ]),
                ],
            });
            const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_2.TestBed.createComponent(ContainerCmp);
            const cmp = fixture.componentInstance;
            cmp.router.initialNavigation();
            (0, testing_2.tick)();
            fixture.detectChanges();
            engine.flush();
            cmp.router.navigateByUrl('/page1');
            (0, testing_2.tick)();
            cmp.loading = true;
            fixture.detectChanges();
            engine.flush();
            cmp.router.navigateByUrl('/page2');
            (0, testing_2.tick)();
            cmp.loading = false;
            fixture.detectChanges();
            engine.flush();
            const players = engine.players;
            expect(players.length).toEqual(1);
            const [p1] = players;
            const innerPlayers = p1.getRealPlayer().players;
            expect(innerPlayers.length).toEqual(2);
            const [ip1, ip2] = innerPlayers;
            expect(ip1.element.innerText).toEqual('page1');
            expect(ip2.element.innerText).toEqual('page2');
        }));
        it('should allow a recursive set of :leave animations to occur for nested routes', (0, testing_2.fakeAsync)(() => {
            let ContainerCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: '<router-outlet name="recur"></router-outlet>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ContainerCmp = _classThis = class {
                    constructor(_router) {
                        this._router = _router;
                        this.log = [];
                    }
                    enter() {
                        this._router.navigateByUrl('/(recur:recur/nested)');
                    }
                    leave() {
                        this._router.navigateByUrl('/');
                    }
                };
                __setFunctionName(_classThis, "ContainerCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContainerCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContainerCmp = _classThis;
            })();
            let RecurPageCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'recur-page',
                        template: 'Depth: {{ depth }} \n <router-outlet></router-outlet>',
                        animations: [
                            (0, animations_1.trigger)('pageAnimations', [
                                (0, animations_1.transition)(':leave', [
                                    (0, animations_1.group)([
                                        (0, animations_1.sequence)([(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 0 }))]),
                                        (0, animations_1.query)('@*', (0, animations_1.animateChild)(), { optional: true }),
                                    ]),
                                ]),
                            ]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _animatePage_decorators;
                let _animatePage_initializers = [];
                let _animatePage_extraInitializers = [];
                let _depth_decorators;
                let _depth_initializers = [];
                let _depth_extraInitializers = [];
                var RecurPageCmp = _classThis = class {
                    constructor(container, route) {
                        this.container = container;
                        this.route = route;
                        this.animatePage = __runInitializers(this, _animatePage_initializers, true);
                        this.depth = (__runInitializers(this, _animatePage_extraInitializers), __runInitializers(this, _depth_initializers, 0));
                        __runInitializers(this, _depth_extraInitializers);
                        this.container = container;
                        this.route = route;
                        this.route.data.subscribe((data) => {
                            this.container.log.push(`DEPTH ${data['depth']}`);
                            this.depth = data['depth'];
                        });
                    }
                };
                __setFunctionName(_classThis, "RecurPageCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _animatePage_decorators = [(0, core_1.HostBinding)('@pageAnimations')];
                    _depth_decorators = [(0, core_1.HostBinding)('attr.data-depth')];
                    __esDecorate(null, null, _animatePage_decorators, { kind: "field", name: "animatePage", static: false, private: false, access: { has: obj => "animatePage" in obj, get: obj => obj.animatePage, set: (obj, value) => { obj.animatePage = value; } }, metadata: _metadata }, _animatePage_initializers, _animatePage_extraInitializers);
                    __esDecorate(null, null, _depth_decorators, { kind: "field", name: "depth", static: false, private: false, access: { has: obj => "depth" in obj, get: obj => obj.depth, set: (obj, value) => { obj.depth = value; } }, metadata: _metadata }, _depth_initializers, _depth_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RecurPageCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RecurPageCmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                declarations: [ContainerCmp, RecurPageCmp],
                imports: [
                    router_1.RouterModule.forRoot([
                        {
                            path: 'recur',
                            component: RecurPageCmp,
                            outlet: 'recur',
                            data: { depth: 0 },
                            children: [{ path: 'nested', component: RecurPageCmp, data: { depth: 1 } }],
                        },
                    ]),
                ],
            });
            const fixture = testing_2.TestBed.createComponent(ContainerCmp);
            const cmp = fixture.componentInstance;
            cmp.enter();
            (0, testing_2.tick)();
            fixture.detectChanges();
            (0, testing_2.flushMicrotasks)();
            expect(cmp.log).toEqual(['DEPTH 0', 'DEPTH 1']);
            cmp.leave();
            (0, testing_2.tick)();
            fixture.detectChanges();
            const players = getLog();
            expect(players.length).toEqual(2);
            const [p1, p2] = players;
            expect(p1.element.getAttribute('data-depth')).toEqual('0');
            expect(p2.element.getAttribute('data-depth')).toEqual('1');
        }));
    });
});
function makeAnimationData(value, params = {}) {
    return { 'animation': { value, params } };
}
