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
const util_1 = require("@angular/animations/browser/src/util");
const testing_1 = require("@angular/animations/browser/testing");
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_2 = require("../../testing");
const animations_2 = require("@angular/platform-browser/animations");
const directives_1 = require("../../src/metadata/directives");
(function () {
    // these tests are only meant to be run within the DOM (for now)
    if (isNode)
        return;
    describe('animation query tests', function () {
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
                imports: [animations_2.BrowserAnimationsModule, common_1.CommonModule],
            });
        });
        describe('query()', () => {
            it('should be able to query all elements that contain animation triggers via @*', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@parent]="exp0">
              <div class="a" [@a]="exp1"></div>
              <div class="b" [@b]="exp2"></div>
              <section>
                <div class="c" @c></div>
              </section>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)('@*', [
                                            (0, animations_1.style)({ backgroundColor: 'blue' }),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ backgroundColor: 'red' })),
                                        ]),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('a', [(0, animations_1.transition)('* => 1', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
                                (0, animations_1.trigger)('b', [
                                    (0, animations_1.transition)('* => 1', [
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 })),
                                        (0, animations_1.query)('.b-inner', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('c', [(0, animations_1.transition)('* => 1', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
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
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp0 = 'go';
                fixture.detectChanges();
                let players = getLog();
                expect(players.length).toEqual(3); // a,b,c
                resetLog();
                const [p1, p2, p3] = players;
                expect(p1.element.classList.contains('a')).toBeTruthy();
                expect(p2.element.classList.contains('b')).toBeTruthy();
                expect(p3.element.classList.contains('c')).toBeTruthy();
            });
            it('should be able to query currently animating elements via :animating', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@parent]="exp0">
              <div class="a" [@a]="exp1"></div>
              <div class="b" [@b]="exp2">
                <div class="b-inner"></div>
              </div>
              <div class="c" [@c]="exp3"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)(':animating', [
                                            (0, animations_1.style)({ backgroundColor: 'blue' }),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ backgroundColor: 'red' })),
                                        ]),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('a', [(0, animations_1.transition)('* => 1', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
                                (0, animations_1.trigger)('b', [
                                    (0, animations_1.transition)('* => 1', [
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 })),
                                        (0, animations_1.query)('.b-inner', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('c', [(0, animations_1.transition)('* => 1', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
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
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                cmp.exp0 = '';
                cmp.exp1 = 1;
                cmp.exp2 = 1;
                // note that exp3 is skipped here
                fixture.detectChanges();
                let players = getLog();
                expect(players.length).toEqual(3); // a,b,b-inner and not c
                resetLog();
                cmp.exp0 = 'go';
                fixture.detectChanges();
                const expectedKeyframes = [
                    new Map([
                        ['backgroundColor', 'blue'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['backgroundColor', 'red'],
                        ['offset', 1],
                    ]),
                ];
                players = getLog();
                expect(players.length).toEqual(3);
                const [p1, p2, p3] = players;
                expect(p1.element.classList.contains('a')).toBeTruthy();
                expect(p1.keyframes).toEqual(expectedKeyframes);
                expect(p2.element.classList.contains('b')).toBeTruthy();
                expect(p2.keyframes).toEqual(expectedKeyframes);
                expect(p3.element.classList.contains('b-inner')).toBeTruthy();
                expect(p3.keyframes).toEqual(expectedKeyframes);
            });
            it('should be able to query triggers directly by name', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp0">
              <div class="f1" @foo></div>
              <div class="f2" [@foo]></div>
              <div class="f3" [@foo]="exp1"></div>
              <div class="b1" @bar></div>
              <div class="b2" [@bar]></div>
              <div class="b3" [@bar]="exp2"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('foo', []),
                                (0, animations_1.trigger)('bar', []),
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => foo', [(0, animations_1.query)('@foo', [(0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'red' }))])]),
                                    (0, animations_1.transition)('* => bar', [(0, animations_1.query)('@bar', [(0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'blue' }))])]),
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
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp0 = 'foo';
                fixture.detectChanges();
                engine.flush();
                let players = getLog();
                expect(players.length).toEqual(3);
                const [p1, p2, p3] = players;
                resetLog();
                expect(p1.element.classList.contains('f1')).toBeTruthy();
                expect(p2.element.classList.contains('f2')).toBeTruthy();
                expect(p3.element.classList.contains('f3')).toBeTruthy();
                cmp.exp0 = 'bar';
                fixture.detectChanges();
                engine.flush();
                players = getLog();
                expect(players.length).toEqual(3);
                const [p4, p5, p6] = players;
                resetLog();
                expect(p4.element.classList.contains('b1')).toBeTruthy();
                expect(p5.element.classList.contains('b2')).toBeTruthy();
                expect(p6.element.classList.contains('b3')).toBeTruthy();
            });
            it('should be able to query all active animations using :animating in a query', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp" #parent>
              <div *ngFor="let item of items" class="item e-{{ item }}">
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => a', [
                                        (0, animations_1.query)('.item:nth-child(odd)', [
                                            (0, animations_1.style)({ opacity: 0 }),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                                        ]),
                                    ]),
                                    (0, animations_1.transition)('* => b', [
                                        (0, animations_1.query)('.item:animating', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
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
                            this.items = [0, 1, 2, 3, 4];
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
                let players = getLog();
                expect(players.length).toEqual(3);
                resetLog();
                cmp.exp = 'b';
                fixture.detectChanges();
                engine.flush();
                players = getLog();
                expect(players.length).toEqual(3);
                expect(players[0].element.classList.contains('e-0')).toBeTruthy();
                expect(players[1].element.classList.contains('e-2')).toBeTruthy();
                expect(players[2].element.classList.contains('e-4')).toBeTruthy();
            });
            it('should be able to query all actively queued animation triggers via `@*:animating`', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@parent]="exp0">
              <div class="c1" [@child]="exp1"></div>
              <div class="c2" [@child]="exp2"></div>
              <div class="c3" [@child]="exp3"></div>
              <div class="c4" [@child]="exp4"></div>
              <div class="c5" [@child]="exp5"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => *', [
                                        (0, animations_1.query)('@*:animating', [(0, animations_1.animate)(1000, (0, animations_1.style)({ background: 'red' }))], {
                                            optional: true,
                                        }),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('child', [(0, animations_1.transition)('* => *', [])]),
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
                cmp.exp1 = 0;
                cmp.exp2 = 0;
                cmp.exp3 = 0;
                cmp.exp4 = 0;
                cmp.exp5 = 0;
                fixture.detectChanges();
                cmp.exp0 = 0;
                fixture.detectChanges();
                let players = engine.players;
                cancelAllPlayers(players);
                cmp.exp2 = 1;
                cmp.exp4 = 1;
                fixture.detectChanges();
                cmp.exp0 = 1;
                fixture.detectChanges();
                players = engine.players;
                cancelAllPlayers(players);
                expect(players.length).toEqual(3);
                cmp.exp1 = 2;
                cmp.exp2 = 2;
                cmp.exp3 = 2;
                cmp.exp4 = 2;
                cmp.exp5 = 2;
                fixture.detectChanges();
                cmp.exp0 = 2;
                fixture.detectChanges();
                players = engine.players;
                cancelAllPlayers(players);
                expect(players.length).toEqual(6);
                cmp.exp0 = 3;
                fixture.detectChanges();
                players = engine.players;
                cancelAllPlayers(players);
                expect(players.length).toEqual(1);
            });
            it('should collect styles for the same elements between queries', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp">
              <header></header>
              <footer></footer>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)(':self, header, footer', (0, animations_1.style)({ opacity: '0.01' })),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '1' })),
                                        (0, animations_1.query)('header, footer', [(0, animations_1.stagger)(500, [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '1' }))])]),
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
                            this.items = [0, 1, 2];
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
                const players = getLog();
                expect(players.length).toEqual(6);
                const [p1, p2, p3, p4, p5, p6] = players;
                expect(p1.delay).toEqual(0);
                expect(p1.duration).toEqual(0);
                expect(p1.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 1],
                    ]),
                ]);
                expect(p2.delay).toEqual(0);
                expect(p2.duration).toEqual(0);
                expect(p2.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 1],
                    ]),
                ]);
                expect(p3.delay).toEqual(0);
                expect(p3.duration).toEqual(0);
                expect(p3.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 1],
                    ]),
                ]);
                expect(p4.delay).toEqual(0);
                expect(p4.duration).toEqual(1000);
                expect(p4.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '1'],
                        ['offset', 1],
                    ]),
                ]);
                expect(p5.delay).toEqual(1000);
                expect(p5.duration).toEqual(1000);
                expect(p5.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '1'],
                        ['offset', 1],
                    ]),
                ]);
                expect(p6.delay).toEqual(1500);
                expect(p6.duration).toEqual(1000);
                expect(p6.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.01'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '1'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should retain style values when :self is used inside of a query', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp"></div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)(':self', (0, animations_1.style)({ opacity: '0.5' })),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '1' })),
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
                const players = getLog();
                expect(players.length).toEqual(2);
                const [p1, p2] = players;
                expect(p1.delay).toEqual(0);
                expect(p1.duration).toEqual(0);
                expect(p1.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.5'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '0.5'],
                        ['offset', 1],
                    ]),
                ]);
                expect(p2.delay).toEqual(0);
                expect(p2.duration).toEqual(1000);
                expect(p2.keyframes).toEqual([
                    new Map([
                        ['opacity', '0.5'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '1'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should properly apply stagger after various other steps within a query', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp">
              <header></header>
              <footer></footer>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)(':self, header, footer', [
                                            (0, animations_1.style)({ opacity: '0' }),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '0.3' })),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '0.6' })),
                                            (0, animations_1.stagger)(500, [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '1' }))]),
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
                            this.items = [0, 1, 2];
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
                const players = getLog();
                expect(players.length).toEqual(3);
                const [p1, p2, p3] = players;
                expect(p1.delay).toEqual(0);
                expect(p1.duration).toEqual(3000);
                expect(p2.delay).toEqual(0);
                expect(p2.duration).toEqual(3500);
                expect(p3.delay).toEqual(0);
                expect(p3.duration).toEqual(4000);
            });
            it('should properly apply pre styling before a stagger is issued', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
          <div [@myAnimation]="exp">
            <div *ngFor="let item of items" class="item">
              {{ item }}
            </div>
          </div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)(':enter', [
                                            (0, animations_1.style)({ opacity: 0 }),
                                            (0, animations_1.stagger)(100, [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
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
                            this.items = [0, 1, 2, 3, 4];
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
                const players = getLog();
                expect(players.length).toEqual(5);
                for (let i = 0; i < players.length; i++) {
                    const player = players[i];
                    const kf = player.keyframes;
                    const limit = kf.length - 1;
                    const staggerDelay = 100 * i;
                    const duration = 1000 + staggerDelay;
                    expect(kf[0]).toEqual(new Map([
                        ['opacity', '0'],
                        ['offset', 0],
                    ]));
                    if (limit > 1) {
                        const offsetAtStaggerDelay = staggerDelay / duration;
                        expect(kf[1]).toEqual(new Map([
                            ['opacity', '0'],
                            ['offset', offsetAtStaggerDelay],
                        ]));
                    }
                    expect(kf[limit]).toEqual(new Map([
                        ['opacity', '1'],
                        ['offset', 1],
                    ]));
                    expect(player.duration).toEqual(duration);
                }
            });
            it('should apply a full stagger step delay if the timing data is left undefined', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
          <div [@myAnimation]="exp">
            <div *ngFor="let item of items" class="item">
              {{ item }}
            </div>
          </div>
        `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)('.item', [
                                            (0, animations_1.stagger)('full', [
                                                (0, animations_1.style)({ opacity: 0 }),
                                                (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0.5 })),
                                                (0, animations_1.animate)(500, (0, animations_1.style)({ opacity: 1 })),
                                            ]),
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
                            this.items = [0, 1, 2, 3, 4];
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
                const players = getLog();
                expect(players.length).toEqual(5);
                const [p1, p2, p3, p4, p5] = players;
                expect(p1.delay).toEqual(0);
                expect(p2.delay).toEqual(1500);
                expect(p3.delay).toEqual(3000);
                expect(p4.delay).toEqual(4500);
                expect(p5.delay).toEqual(6000);
            });
            it('should persist inner sub trigger styles once their animation is complete', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div @parent *ngIf="exp1">
              <div class="child" [@child]="exp2"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [(0, animations_1.transition)(':enter', [(0, animations_1.query)('.child', [(0, animations_1.animateChild)()])])]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.state)('*, void', (0, animations_1.style)({ height: '0px' })),
                                    (0, animations_1.state)('b', (0, animations_1.style)({ height: '444px' })),
                                    (0, animations_1.transition)('* => *', (0, animations_1.animate)(500)),
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
                cmp.exp2 = 'b';
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(2);
                const player = players[1];
                expect(player.keyframes).toEqual([
                    new Map([
                        ['height', '0px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['height', '444px'],
                        ['offset', 1],
                    ]),
                ]);
                player.finish();
                expect(player.element.style.height).toEqual('444px');
            });
            it('should find newly inserted items in the component via :enter', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div @myAnimation>
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)(':enter', [
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0.5 }))]),
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
                            this.items = [0, 1, 2];
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
                const players = getLog();
                expect(players.length).toEqual(3);
                const [p1, p2, p3] = players;
                expect(p1.element.innerText.trim()).toEqual('0');
                expect(p2.element.innerText.trim()).toEqual('1');
                expect(p3.element.innerText.trim()).toEqual('2');
                players.forEach((p) => {
                    expect(p.keyframes).toEqual([
                        new Map([
                            ['opacity', '0'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '0.5'],
                            ['offset', 1],
                        ]),
                    ]);
                });
            });
            it('should cleanup :enter and :leave artifacts from nodes when any animation sequences fail to be built', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="items.length" class="parent" #container>
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
              <div *ngIf="items.length == 0" class="child">Leave!</div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => 0', []),
                                    (0, animations_1.transition)('* => *', [
                                        (0, animations_1.query)('.child:enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                        (0, animations_1.query)('.incorrect-child:leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ]),
                            ],
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
                            this.items = (__runInitializers(this, _container_extraInitializers), []);
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
                cmp.items = [];
                fixture.detectChanges();
                cmp.items = [0, 1, 2, 3, 4];
                expect(() => {
                    fixture.detectChanges();
                }).toThrow();
                const children = cmp.container.nativeElement.querySelectorAll('.child');
                expect(children.length).toEqual(5);
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    expect(child.classList.contains(util_1.ENTER_CLASSNAME)).toBe(false);
                    expect(child.classList.contains(util_1.LEAVE_CLASSNAME)).toBe(false);
                }
            });
            it('should find elements that have been removed via :leave', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp" class="parent">
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('a => b', [
                                        (0, animations_1.query)(':leave', [(0, animations_1.style)({ opacity: 1 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0.5 }))]),
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
                            this.items = [4, 2, 0];
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
                resetLog();
                cmp.exp = 'b';
                cmp.items = [];
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(3);
                const [p1, p2, p3] = players;
                expect(p1.element.innerText.trim()).toEqual('4');
                expect(p2.element.innerText.trim()).toEqual('2');
                expect(p3.element.innerText.trim()).toEqual('0');
                players.forEach((p) => {
                    expect(p.keyframes).toEqual([
                        new Map([
                            ['opacity', '1'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '0.5'],
                            ['offset', 1],
                        ]),
                    ]);
                });
            });
            it('should find :enter nodes that have been inserted around non enter nodes', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp" class="parent">
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
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
                cmp.exp = 'no';
                cmp.items = [2];
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp = 'go';
                cmp.items = [0, 1, 2, 3, 4];
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(4);
                const [p1, p2, p3, p4] = players;
                expect(p1.element.innerText.trim()).toEqual('0');
                expect(p2.element.innerText.trim()).toEqual('1');
                expect(p3.element.innerText.trim()).toEqual('3');
                expect(p4.element.innerText.trim()).toEqual('4');
            });
            it('should find :enter/:leave nodes that are nested inside of ng-container elements', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="items.length" class="parent">
              <ng-container *ngFor="let item of items">
                <section>
                  <div *ngIf="item % 2 == 0">even {{ item }}</div>
                  <div *ngIf="item % 2 == 1">odd {{ item }}</div>
                </section>
              </ng-container>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('0 => 5', [
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: '0' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '1' }))]),
                                    ]),
                                    (0, animations_1.transition)('5 => 0', [
                                        (0, animations_1.query)(':leave', [(0, animations_1.style)({ opacity: '1' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '0' }))]),
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
                cmp.items = [];
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.items = [0, 1, 2, 3, 4];
                fixture.detectChanges();
                engine.flush();
                let players = getLog();
                expect(players.length).toEqual(5);
                for (let i = 0; i < 5; i++) {
                    let player = players[i];
                    expect(player.keyframes).toEqual([
                        new Map([
                            ['opacity', '0'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '1'],
                            ['offset', 1],
                        ]),
                    ]);
                    let elm = player.element;
                    let text = i % 2 == 0 ? `even ${i}` : `odd ${i}`;
                    expect(elm.innerText.trim()).toEqual(text);
                }
                resetLog();
                cmp.items = [];
                fixture.detectChanges();
                engine.flush();
                players = getLog();
                expect(players.length).toEqual(5);
                for (let i = 0; i < 5; i++) {
                    let player = players[i];
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
                    let elm = player.element;
                    let text = i % 2 == 0 ? `even ${i}` : `odd ${i}`;
                    expect(elm.innerText.trim()).toEqual(text);
                }
            });
            it('should properly cancel items that were queried into a former animation and pass in the associated styles into the follow-up players per element', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp" class="parent">
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => on', [
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ width: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: 200 }))]),
                                    ]),
                                    (0, animations_1.transition)('* => off', [
                                        (0, animations_1.query)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ width: 0 }))]),
                                        (0, animations_1.query)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
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
                cmp.exp = 'on';
                cmp.items = [0, 1, 2, 3, 4];
                fixture.detectChanges();
                engine.flush();
                const previousPlayers = getLog();
                expect(previousPlayers.length).toEqual(10);
                resetLog();
                cmp.exp = 'off';
                cmp.items = [0, 1, 2];
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(4);
                const [p1, p2, p3, p4] = players;
                // p1 && p2 are the starting players for item3 and item4
                expect(p1.previousStyles).toEqual(new Map([
                    ['opacity', animations_1.AUTO_STYLE],
                    ['width', animations_1.AUTO_STYLE],
                    ['height', animations_1.AUTO_STYLE],
                ]));
                expect(p2.previousStyles).toEqual(new Map([
                    ['opacity', animations_1.AUTO_STYLE],
                    ['width', animations_1.AUTO_STYLE],
                    ['height', animations_1.AUTO_STYLE],
                ]));
                // p3 && p4 are the following players for item3 and item4
                expect(p3.previousStyles).toEqual(new Map());
                expect(p4.previousStyles).toEqual(new Map());
            });
            it('should not remove a parent container if its contents are queried into by an ancestor element', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp1" class="ancestor" #ancestor>
              <div class="parent" *ngIf="exp2" #parent>
                <div class="child"></div>
                <div class="child"></div>
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)('.child', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _ancestorElm_decorators;
                    let _ancestorElm_initializers = [];
                    let _ancestorElm_extraInitializers = [];
                    let _parentElm_decorators;
                    let _parentElm_initializers = [];
                    let _parentElm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp1 = '';
                            this.exp2 = true;
                            this.ancestorElm = __runInitializers(this, _ancestorElm_initializers, void 0);
                            this.parentElm = (__runInitializers(this, _ancestorElm_extraInitializers), __runInitializers(this, _parentElm_initializers, void 0));
                            __runInitializers(this, _parentElm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _ancestorElm_decorators = [(0, core_1.ViewChild)('ancestor')];
                        _parentElm_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _ancestorElm_decorators, { kind: "field", name: "ancestorElm", static: false, private: false, access: { has: obj => "ancestorElm" in obj, get: obj => obj.ancestorElm, set: (obj, value) => { obj.ancestorElm = value; } }, metadata: _metadata }, _ancestorElm_initializers, _ancestorElm_extraInitializers);
                        __esDecorate(null, null, _parentElm_decorators, { kind: "field", name: "parentElm", static: false, private: false, access: { has: obj => "parentElm" in obj, get: obj => obj.parentElm, set: (obj, value) => { obj.parentElm = value; } }, metadata: _metadata }, _parentElm_initializers, _parentElm_extraInitializers);
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
                resetLog();
                const ancestorElm = cmp.ancestorElm.nativeElement;
                const parentElm = cmp.parentElm.nativeElement;
                cmp.exp1 = 'go';
                cmp.exp2 = false;
                fixture.detectChanges();
                engine.flush();
                expect(ancestorElm.contains(parentElm)).toBe(true);
                const players = getLog();
                expect(players.length).toEqual(2);
                const [p1, p2] = players;
                expect(parentElm.contains(p1.element)).toBe(true);
                expect(parentElm.contains(p2.element)).toBe(true);
                cancelAllPlayers(players);
                expect(ancestorElm.contains(parentElm)).toBe(false);
            });
            it('should only retain a to-be-removed node if the inner queried items are apart of an animation issued by an ancestor', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@one]="exp1" [@two]="exp2" class="ancestor" #ancestor>
              <header>hello</header>
              <div class="parent" *ngIf="parentExp" #parent>
                <div class="child">child</div>
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('one', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)('.child', [(0, animations_1.style)({ height: '100px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '0px' }))]),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('two', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)('header', [(0, animations_1.style)({ width: '100px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '0px' }))]),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _ancestorElm_decorators;
                    let _ancestorElm_initializers = [];
                    let _ancestorElm_extraInitializers = [];
                    let _parentElm_decorators;
                    let _parentElm_initializers = [];
                    let _parentElm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp1 = '';
                            this.exp2 = '';
                            this.parentExp = true;
                            this.ancestorElm = __runInitializers(this, _ancestorElm_initializers, void 0);
                            this.parentElm = (__runInitializers(this, _ancestorElm_extraInitializers), __runInitializers(this, _parentElm_initializers, void 0));
                            __runInitializers(this, _parentElm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _ancestorElm_decorators = [(0, core_1.ViewChild)('ancestor')];
                        _parentElm_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _ancestorElm_decorators, { kind: "field", name: "ancestorElm", static: false, private: false, access: { has: obj => "ancestorElm" in obj, get: obj => obj.ancestorElm, set: (obj, value) => { obj.ancestorElm = value; } }, metadata: _metadata }, _ancestorElm_initializers, _ancestorElm_extraInitializers);
                        __esDecorate(null, null, _parentElm_decorators, { kind: "field", name: "parentElm", static: false, private: false, access: { has: obj => "parentElm" in obj, get: obj => obj.parentElm, set: (obj, value) => { obj.parentElm = value; } }, metadata: _metadata }, _parentElm_initializers, _parentElm_extraInitializers);
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
                resetLog();
                const ancestorElm = cmp.ancestorElm.nativeElement;
                const parentElm = cmp.parentElm.nativeElement;
                expect(ancestorElm.contains(parentElm)).toBe(true);
                cmp.exp1 = 'go';
                fixture.detectChanges();
                engine.flush();
                expect(ancestorElm.contains(parentElm)).toBe(true);
                const onePlayers = getLog();
                expect(onePlayers.length).toEqual(1); // element.child
                const [childPlayer] = onePlayers;
                let childPlayerComplete = false;
                childPlayer.onDone(() => (childPlayerComplete = true));
                resetLog();
                (0, testing_2.flushMicrotasks)();
                expect(childPlayerComplete).toBe(false);
                cmp.exp2 = 'go';
                cmp.parentExp = false;
                fixture.detectChanges();
                engine.flush();
                const twoPlayers = getLog();
                expect(twoPlayers.length).toEqual(1); // the header element
                expect(ancestorElm.contains(parentElm)).toBe(false);
                expect(childPlayerComplete).toBe(true);
            }));
            it('should finish queried players in an animation when the next animation takes over', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp" class="parent">
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => on', [
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                    ]),
                                    (0, animations_1.transition)('* => off', []),
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
                cmp.exp = 'on';
                cmp.items = [0, 1, 2, 3, 4];
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(5);
                let count = 0;
                players.forEach((p) => {
                    p.onDone(() => count++);
                });
                expect(count).toEqual(0);
                cmp.exp = 'off';
                fixture.detectChanges();
                engine.flush();
                expect(count).toEqual(5);
            });
            it('should finish queried players when the previous player is finished', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp" class="parent">
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => on', [
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                    ]),
                                    (0, animations_1.transition)('* => off', []),
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
                cmp.exp = 'on';
                cmp.items = [0, 1, 2, 3, 4];
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(5);
                let count = 0;
                players.forEach((p) => {
                    p.onDone(() => count++);
                });
                expect(count).toEqual(0);
                expect(engine.players.length).toEqual(1);
                engine.players[0].finish();
                expect(count).toEqual(5);
            });
            it('should allow multiple triggers to animate on queried elements at the same time', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@one]="exp1" [@two]="exp2" class="parent">
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('one', [
                                    (0, animations_1.transition)('* => on', [
                                        (0, animations_1.query)('.child', [(0, animations_1.style)({ width: '0px' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '100px' }))]),
                                    ]),
                                    (0, animations_1.transition)('* => off', []),
                                ]),
                                (0, animations_1.trigger)('two', [
                                    (0, animations_1.transition)('* => on', [
                                        (0, animations_1.query)('.child:nth-child(odd)', [
                                            (0, animations_1.style)({ height: '0px' }),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' })),
                                        ]),
                                    ]),
                                    (0, animations_1.transition)('* => off', []),
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
                cmp.exp1 = 'on';
                cmp.items = [0, 1, 2, 3, 4];
                fixture.detectChanges();
                engine.flush();
                let players = getLog();
                expect(players.length).toEqual(5);
                let count = 0;
                players.forEach((p) => {
                    p.onDone(() => count++);
                });
                resetLog();
                expect(count).toEqual(0);
                cmp.exp2 = 'on';
                fixture.detectChanges();
                engine.flush();
                expect(count).toEqual(0);
                players = getLog();
                expect(players.length).toEqual(3);
                players.forEach((p) => {
                    p.onDone(() => count++);
                });
                cmp.exp1 = 'off';
                fixture.detectChanges();
                engine.flush();
                expect(count).toEqual(5);
                cmp.exp2 = 'off';
                fixture.detectChanges();
                engine.flush();
                expect(count).toEqual(8);
            });
            it("should cancel inner queried animations if a trigger state value changes, but isn't detected as a valid transition", () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp" class="parent">
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => on', [
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
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
                cmp.exp = 'on';
                cmp.items = [0, 1, 2, 3, 4];
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(5);
                let count = 0;
                players.forEach((p) => {
                    p.onDone(() => count++);
                });
                expect(count).toEqual(0);
                cmp.exp = 'off';
                fixture.detectChanges();
                engine.flush();
                expect(count).toEqual(5);
            });
            it('should allow for queried items to restore their styling back to the original state via animate(time, "*")', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@myAnimation]="exp" class="parent">
              <div *ngFor="let item of items" class="child">
                {{ item }}
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => on', [
                                        (0, animations_1.query)(':enter', [
                                            (0, animations_1.style)({ opacity: '0', width: '0px', height: '0px' }),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '1' })),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)(['*', { height: '200px' }])),
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
                cmp.items = [0, 1, 2];
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(3);
                players.forEach((p) => {
                    expect(p.keyframes).toEqual([
                        new Map([
                            ['opacity', '0'],
                            ['width', '0px'],
                            ['height', '0px'],
                            ['offset', 0],
                        ]),
                        new Map([
                            ['opacity', '1'],
                            ['width', '0px'],
                            ['height', '0px'],
                            ['offset', 0.5],
                        ]),
                        new Map([
                            ['opacity', animations_1.AUTO_STYLE],
                            ['width', animations_1.AUTO_STYLE],
                            ['height', '200px'],
                            ['offset', 1],
                        ]),
                    ]);
                });
            });
            it('should query elements in sub components that do not contain animations using the :enter selector', () => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent-cmp',
                            template: `
            <div [@myAnimation]="exp">
              <child-cmp #child></child-cmp>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => on', [
                                        (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                    ]),
                                ]),
                            ],
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
                            this.child = __runInitializers(this, _child_initializers, void 0);
                            __runInitializers(this, _child_extraInitializers);
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
            <div *ngFor="let item of items">
              {{ item }}
            </div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildCmp = _classThis = class {
                        constructor() {
                            this.items = [];
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
                fixture.detectChanges();
                cmp.exp = 'on';
                cmp.child.items = [1, 2, 3];
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(3);
                expect(players[0].element.innerText.trim()).toEqual('1');
                expect(players[1].element.innerText.trim()).toEqual('2');
                expect(players[2].element.innerText.trim()).toEqual('3');
            });
            it('should query elements in sub components that do not contain animations using the :leave selector', () => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent-cmp',
                            template: `
            <div [@myAnimation]="exp">
              <child-cmp #child></child-cmp>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [
                                    (0, animations_1.transition)('* => on', [(0, animations_1.query)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
                                ]),
                            ],
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
                            this.child = __runInitializers(this, _child_initializers, void 0);
                            __runInitializers(this, _child_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ParentCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _child_decorators = [(0, core_1.ViewChild)('child', { static: true })];
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
            <div *ngFor="let item of items">
              {{ item }}
            </div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildCmp = _classThis = class {
                        constructor() {
                            this.items = [];
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
                cmp.child.items = [4, 5, 6];
                fixture.detectChanges();
                cmp.exp = 'on';
                cmp.child.items = [];
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(3);
                expect(players[0].element.innerText.trim()).toEqual('4');
                expect(players[1].element.innerText.trim()).toEqual('5');
                expect(players[2].element.innerText.trim()).toEqual('6');
            });
            describe('options.limit', () => {
                it('should limit results when a limit value is passed into the query options', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'cmp',
                                template: `
             <div [@myAnimation]="exp">
              <div *ngFor="let item of items" class="item">
                {{ item }}
              </div>
             </div>
          `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => go', [
                                            (0, animations_1.query)('.item', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))], {
                                                limit: 2,
                                            }),
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
                    const fixture = testing_2.TestBed.createComponent(Cmp);
                    const cmp = fixture.componentInstance;
                    cmp.items = ['a', 'b', 'c', 'd', 'e'];
                    fixture.detectChanges();
                    cmp.exp = 'go';
                    fixture.detectChanges();
                    const players = getLog();
                    expect(players.length).toEqual(2);
                    expect(players[0].element.innerText.trim()).toEqual('a');
                    expect(players[1].element.innerText.trim()).toEqual('b');
                });
                it('should support negative limit values by pulling in elements from the end of the query', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'cmp',
                                template: `
             <div [@myAnimation]="exp">
              <div *ngFor="let item of items" class="item">
                {{ item }}
              </div>
             </div>
          `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => go', [
                                            (0, animations_1.query)('.item', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))], {
                                                limit: -3,
                                            }),
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
                    const fixture = testing_2.TestBed.createComponent(Cmp);
                    const cmp = fixture.componentInstance;
                    cmp.items = ['a', 'b', 'c', 'd', 'e'];
                    fixture.detectChanges();
                    cmp.exp = 'go';
                    fixture.detectChanges();
                    const players = getLog();
                    expect(players.length).toEqual(3);
                    expect(players[0].element.innerText.trim()).toEqual('c');
                    expect(players[1].element.innerText.trim()).toEqual('d');
                    expect(players[2].element.innerText.trim()).toEqual('e');
                });
            });
        });
        describe('sub triggers', () => {
            it('should animate a sub trigger that exists in an inner element in the template', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent class="parent" [@parent]="exp1">
              <div #child class="child" [@child]="exp2"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go1', [
                                        (0, animations_1.style)({ width: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '100px' })),
                                        (0, animations_1.query)('.child', [(0, animations_1.animateChild)()]),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('* => go2', [
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
                    let _elm1_decorators;
                    let _elm1_initializers = [];
                    let _elm1_extraInitializers = [];
                    let _elm2_decorators;
                    let _elm2_initializers = [];
                    let _elm2_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.elm1 = __runInitializers(this, _elm1_initializers, void 0);
                            this.elm2 = (__runInitializers(this, _elm1_extraInitializers), __runInitializers(this, _elm2_initializers, void 0));
                            __runInitializers(this, _elm2_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _elm1_decorators = [(0, core_1.ViewChild)('parent')];
                        _elm2_decorators = [(0, core_1.ViewChild)('child')];
                        __esDecorate(null, null, _elm1_decorators, { kind: "field", name: "elm1", static: false, private: false, access: { has: obj => "elm1" in obj, get: obj => obj.elm1, set: (obj, value) => { obj.elm1 = value; } }, metadata: _metadata }, _elm1_initializers, _elm1_extraInitializers);
                        __esDecorate(null, null, _elm2_decorators, { kind: "field", name: "elm2", static: false, private: false, access: { has: obj => "elm2" in obj, get: obj => obj.elm2, set: (obj, value) => { obj.elm2 = value; } }, metadata: _metadata }, _elm2_initializers, _elm2_extraInitializers);
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
                cmp.exp1 = 'go1';
                cmp.exp2 = 'go2';
                fixture.detectChanges();
                engine.flush();
                const elm1 = cmp.elm1;
                const elm2 = cmp.elm2;
                const players = getLog();
                // players:
                //  - _scp (skipped child player): player for the child animation
                //  - pp (parent player): player for parent animation (from 0px to 100px)
                //  - pcp (parent child player):
                //      player for child animation executed by parent via query and animateChild
                const [_scp, pp, pcp] = players;
                expect(pp.delay).toEqual(0);
                expect(pp.element).toEqual(elm1.nativeElement);
                expect(pp.duration).toEqual(1000);
                expect(pp.keyframes).toEqual([
                    new Map([
                        ['width', '0px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['width', '100px'],
                        ['offset', 1],
                    ]),
                ]);
                expect(pcp.delay).toEqual(0);
                expect(pcp.element).toEqual(elm2.nativeElement);
                expect(pcp.duration).toEqual(2000);
                expect(pcp.keyframes).toEqual([
                    new Map([
                        ['height', '0px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['height', '0px'],
                        ['offset', 0.5],
                    ]),
                    new Map([
                        ['height', '100px'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should run and operate a series of triggers on a list of elements with overridden timing data', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent class="parent" [@parent]="exp">
              <div class="item" *ngFor="let item of items" @child></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ opacity: '0' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '1' })),
                                        (0, animations_1.query)('.item', [(0, animations_1.animateChild)({ duration: '2.5s', delay: '500ms' })]),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: '0' })),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)(':enter', [
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
                    let _elm_decorators;
                    let _elm_initializers = [];
                    let _elm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.items = [0, 1, 2, 3, 4];
                            this.elm = __runInitializers(this, _elm_initializers, void 0);
                            __runInitializers(this, _elm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _elm_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _elm_decorators, { kind: "field", name: "elm", static: false, private: false, access: { has: obj => "elm" in obj, get: obj => obj.elm, set: (obj, value) => { obj.elm = value; } }, metadata: _metadata }, _elm_initializers, _elm_extraInitializers);
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
                const parent = cmp.elm.nativeElement;
                const elements = parent.querySelectorAll('.item');
                const players = getLog();
                expect(players.length).toEqual(12);
                // players:
                //  - _sc1p, _sc2p, _sc3p, _sc4p (skipped child n (1 to 4) players):
                //     players for the children animations
                //  - pp1 (parent player 1): player for parent animation (from opacity 0 to opacity 1)
                //  - pc1p, pc2p, pc3p, pc4p, pc5p  (parent child n (1 to 4) player):
                //     players for children animations executed by parent via query and animateChild
                //  - pp2 (parent player 2): player for parent animation (from opacity 1 to opacity 0)
                const [_sc1p, _sc2p, _sc3p, _sc4p, _sc5p, pp1, pc1p, pc2p, pc3p, pc4p, pc5p, pp2] = players;
                expect(pp1.element).toEqual(parent);
                expect(pp1.delay).toEqual(0);
                expect(pp1.duration).toEqual(1000);
                expect(pc1p.element).toEqual(elements[0]);
                expect(pc1p.delay).toEqual(0);
                expect(pc1p.duration).toEqual(4000);
                expect(pc2p.element).toEqual(elements[1]);
                expect(pc2p.delay).toEqual(0);
                expect(pc2p.duration).toEqual(4000);
                expect(pc3p.element).toEqual(elements[2]);
                expect(pc3p.delay).toEqual(0);
                expect(pc3p.duration).toEqual(4000);
                expect(pc4p.element).toEqual(elements[3]);
                expect(pc4p.delay).toEqual(0);
                expect(pc4p.duration).toEqual(4000);
                expect(pc5p.element).toEqual(elements[4]);
                expect(pc5p.delay).toEqual(0);
                expect(pc5p.duration).toEqual(4000);
                expect(pp2.element).toEqual(parent);
                expect(pp2.delay).toEqual(4000);
                expect(pp2.duration).toEqual(1000);
            });
            it("should silently continue if a sub trigger is animated that doesn't exist", () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent class="parent" [@parent]="exp">
              <div class="child"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ opacity: 0 }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                                        (0, animations_1.query)('.child', [(0, animations_1.animateChild)({ duration: '1s' })]),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _elm_decorators;
                    let _elm_initializers = [];
                    let _elm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.items = [0, 1, 2, 3, 4];
                            this.elm = __runInitializers(this, _elm_initializers, void 0);
                            __runInitializers(this, _elm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _elm_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _elm_decorators, { kind: "field", name: "elm", static: false, private: false, access: { has: obj => "elm" in obj, get: obj => obj.elm, set: (obj, value) => { obj.elm = value; } }, metadata: _metadata }, _elm_initializers, _elm_extraInitializers);
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
                const parent = cmp.elm.nativeElement;
                const players = getLog();
                expect(players.length).toEqual(2);
                const [pA, pZ] = players;
                expect(pA.element).toEqual(parent);
                expect(pA.delay).toEqual(0);
                expect(pA.duration).toEqual(1000);
                expect(pZ.element).toEqual(parent);
                expect(pZ.delay).toEqual(1000);
                expect(pZ.duration).toEqual(1000);
            });
            it("should silently continue if a sub trigger is animated that doesn't contain a trigger that is setup for animation", () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent class="parent" [@parent]="exp1">
              <div [@child]="exp2" class="child"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('a => z', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('a => z', [
                                        (0, animations_1.style)({ opacity: 0 }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                                        (0, animations_1.query)('.child', [(0, animations_1.animateChild)({ duration: '1s' })]),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _elm_decorators;
                    let _elm_initializers = [];
                    let _elm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.elm = __runInitializers(this, _elm_initializers, void 0);
                            __runInitializers(this, _elm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _elm_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _elm_decorators, { kind: "field", name: "elm", static: false, private: false, access: { has: obj => "elm" in obj, get: obj => obj.elm, set: (obj, value) => { obj.elm = value; } }, metadata: _metadata }, _elm_initializers, _elm_extraInitializers);
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
                cmp.exp2 = 'a';
                fixture.detectChanges();
                engine.flush();
                resetLog();
                cmp.exp1 = 'z';
                fixture.detectChanges();
                engine.flush();
                const parent = cmp.elm.nativeElement;
                const players = getLog();
                expect(players.length).toEqual(2);
                const [pA, pZ] = players;
                expect(pA.element).toEqual(parent);
                expect(pA.delay).toEqual(0);
                expect(pA.duration).toEqual(1000);
                expect(pZ.element).toEqual(parent);
                expect(pZ.delay).toEqual(1000);
                expect(pZ.duration).toEqual(1000);
            });
            it('should animate all sub triggers on the element at the same time', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent class="parent" [@parent]="exp1">
              <div [@w]="exp2" [@h]="exp2" class="child"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('w', [
                                    (0, animations_1.transition)('* => go', [(0, animations_1.style)({ width: 0 }), (0, animations_1.animate)(1800, (0, animations_1.style)({ width: '100px' }))]),
                                ]),
                                (0, animations_1.trigger)('h', [
                                    (0, animations_1.transition)('* => go', [(0, animations_1.style)({ height: 0 }), (0, animations_1.animate)(1500, (0, animations_1.style)({ height: '100px' }))]),
                                ]),
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ opacity: 0 }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                                        (0, animations_1.query)('.child', [(0, animations_1.animateChild)()]),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _elm_decorators;
                    let _elm_initializers = [];
                    let _elm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.elm = __runInitializers(this, _elm_initializers, void 0);
                            __runInitializers(this, _elm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _elm_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _elm_decorators, { kind: "field", name: "elm", static: false, private: false, access: { has: obj => "elm" in obj, get: obj => obj.elm, set: (obj, value) => { obj.elm = value; } }, metadata: _metadata }, _elm_initializers, _elm_extraInitializers);
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
                const players = getLog();
                expect(players.length).toEqual(6);
                // players:
                //  - _scwp (skipped child w player): player for the child animation (trigger w)
                //  - _schp (skipped child h player): player for the child animation (trigger h)
                //  - _pp1 (parent player 1): player for parent animation (from opacity 0 to opacity 1)
                //  - pcwp (parent child w player):
                //      player for child w animation executed by parent via query and animateChild
                //  - pchp (parent child h player):
                //      player for child w animation executed by parent via query and animateChild
                //  - pp2 (parent player 2): player for parent animation (from opacity 1 to opacity 0)
                const [_scwp, _schp, _pp1, pcwp, pchp, pp2] = players;
                expect(pcwp.delay).toEqual(0);
                expect(pcwp.duration).toEqual(2800);
                expect(pchp.delay).toEqual(0);
                expect(pchp.duration).toEqual(2500);
                expect(pp2.delay).toEqual(2800);
                expect(pp2.duration).toEqual(1000);
            });
            it('should skip a sub animation when a zero duration value is passed in', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div #parent class="parent" [@parent]="exp1">
              <div [@child]="exp2" class="child"></div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('* => go', [(0, animations_1.style)({ width: 0 }), (0, animations_1.animate)(1800, (0, animations_1.style)({ width: '100px' }))]),
                                ]),
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ opacity: 0 }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                                        (0, animations_1.query)('.child', [(0, animations_1.animateChild)({ duration: '0' })]),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 })),
                                    ]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _elm_decorators;
                    let _elm_initializers = [];
                    let _elm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.elm = __runInitializers(this, _elm_initializers, void 0);
                            __runInitializers(this, _elm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _elm_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _elm_decorators, { kind: "field", name: "elm", static: false, private: false, access: { has: obj => "elm" in obj, get: obj => obj.elm, set: (obj, value) => { obj.elm = value; } }, metadata: _metadata }, _elm_initializers, _elm_extraInitializers);
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
                const players = getLog();
                expect(players.length).toEqual(3);
                // players:
                //  - _scp (skipped child player): player for the child animation
                //  - pp1 (parent player 1): player for parent animation (from opacity 0 to opacity 1)
                //  - ( the player for the child animation executed by parent via query
                //      and animateChild is skipped entirely )
                //  - pp2 (parent player 2): player for parent animation (from opacity 1 to opacity 0)
                const [_scp, pp1, pp2] = players;
                expect(pp1.delay).toEqual(0);
                expect(pp1.duration).toEqual(1000);
                expect(pp2.delay).toEqual(1000);
                expect(pp2.duration).toEqual(1000);
            });
            it('should only allow a sub animation to be used up by a parent trigger once', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div [@parent]="exp1" class="parent1" #parent>
              <div [@parent]="exp1" class="parent2">
                <div [@child]="exp2" class="child">
                </div>
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ opacity: 0 }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                                        (0, animations_1.query)('.child', (0, animations_1.animateChild)()),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('* => go', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1800, (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _elm_decorators;
                    let _elm_initializers = [];
                    let _elm_extraInitializers = [];
                    var Cmp = _classThis = class {
                        constructor() {
                            this.elm = __runInitializers(this, _elm_initializers, void 0);
                            __runInitializers(this, _elm_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _elm_decorators = [(0, core_1.ViewChild)('parent')];
                        __esDecorate(null, null, _elm_decorators, { kind: "field", name: "elm", static: false, private: false, access: { has: obj => "elm" in obj, get: obj => obj.elm, set: (obj, value) => { obj.elm = value; } }, metadata: _metadata }, _elm_initializers, _elm_extraInitializers);
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
                const players = getLog();
                expect(players.length).toEqual(5);
                // players:
                //  - _scp (skipped child player): player for the child animation
                // (note: parent2 is evaluated first because it is inside of parent1)
                //  - p2p (parent 2 player): player for parent animation (from opacity 0 to opacity 1)
                //  - p2cp (parent 2 child player):
                //      player for child animation executed by parent 2 via query and animateChild
                //  - p1p (parent 1 player): player for parent animation (from opacity 0 to opacity 1)
                //  - p1cp (parent 1 child player):
                //      player for child animation executed by parent 1 via query and animateChild
                const [_scp, p2p, p2cp, p1p, p1cp] = players;
                expect(p2p.element.classList.contains('parent2')).toBeTruthy();
                expect(p2cp.element.classList.contains('child')).toBeTruthy();
                expect(p1p.element.classList.contains('parent1')).toBeTruthy();
                expect(p1cp.element.classList.contains('child')).toBeTruthy();
            });
            it('should emulate a leave animation on the nearest sub host elements when a parent is removed', (0, testing_2.fakeAsync)(() => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div @parent *ngIf="exp" class="parent1" #parent>
              <child-cmp #child @leave (@leave.start)="animateStart($event)"></child-cmp>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('leave', [(0, animations_1.transition)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'gold' }))])]),
                                (0, animations_1.trigger)('parent', [(0, animations_1.transition)(':leave', [(0, animations_1.query)(':leave', (0, animations_1.animateChild)())])]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _childElm_decorators;
                    let _childElm_initializers = [];
                    let _childElm_extraInitializers = [];
                    var ParentCmp = _classThis = class {
                        constructor() {
                            this.exp = true;
                            this.childElm = __runInitializers(this, _childElm_initializers, void 0);
                            this.childEvent = __runInitializers(this, _childElm_extraInitializers);
                        }
                        animateStart(event) {
                            if (event.toState == 'void') {
                                this.childEvent = event;
                            }
                        }
                    };
                    __setFunctionName(_classThis, "ParentCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _childElm_decorators = [(0, core_1.ViewChild)('child')];
                        __esDecorate(null, null, _childElm_decorators, { kind: "field", name: "childElm", static: false, private: false, access: { has: obj => "childElm" in obj, get: obj => obj.childElm, set: (obj, value) => { obj.childElm = value; } }, metadata: _metadata }, _childElm_initializers, _childElm_extraInitializers);
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
                                (0, animations_1.trigger)('child', [(0, animations_1.transition)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'gold' }))])]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _instanceExtraInitializers = [];
                    let _animate_decorators;
                    let _animate_initializers = [];
                    let _animate_extraInitializers = [];
                    let _animateStart_decorators;
                    var ChildCmp = _classThis = class {
                        animateStart(event) {
                            if (event.toState == 'void') {
                                this.childEvent = event;
                            }
                        }
                        constructor() {
                            this.childEvent = __runInitializers(this, _instanceExtraInitializers);
                            this.animate = __runInitializers(this, _animate_initializers, true);
                            __runInitializers(this, _animate_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ChildCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _animate_decorators = [(0, core_1.HostBinding)('@child')];
                        _animateStart_decorators = [(0, directives_1.HostListener)('@child.start', ['$event'])];
                        __esDecorate(_classThis, null, _animateStart_decorators, { kind: "method", name: "animateStart", static: false, private: false, access: { has: obj => "animateStart" in obj, get: obj => obj.animateStart }, metadata: _metadata }, null, _instanceExtraInitializers);
                        __esDecorate(null, null, _animate_decorators, { kind: "field", name: "animate", static: false, private: false, access: { has: obj => "animate" in obj, get: obj => obj.animate, set: (obj, value) => { obj.animate = value; } }, metadata: _metadata }, _animate_initializers, _animate_extraInitializers);
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
                fixture.detectChanges();
                const childCmp = cmp.childElm;
                cmp.exp = false;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.childEvent.toState).toEqual('void');
                expect(cmp.childEvent.totalTime).toEqual(1000);
                expect(childCmp.childEvent.toState).toEqual('void');
                expect(childCmp.childEvent.totalTime).toEqual(1000);
            }));
            it("should emulate a leave animation on a sub component's inner elements when a parent leave animation occurs with animateChild", () => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div @myAnimation *ngIf="exp" class="parent">
              <child-cmp></child-cmp>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)(':leave', [(0, animations_1.query)('@*', (0, animations_1.animateChild)())])]),
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
                            template: `
               <section>
                 <div class="inner-div" @myChildAnimation></div>
               </section>
             `,
                            animations: [
                                (0, animations_1.trigger)('myChildAnimation', [
                                    (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))]),
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
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                cmp.exp = false;
                fixture.detectChanges();
                let players = getLog();
                expect(players.length).toEqual(2);
                // players:
                //  - _scp (skipped child player): player for the child animation
                //  - pcp (parent child player):
                //     player for child animation executed by parent via query and animateChild
                const [_scp, pcp] = players;
                expect(pcp.element.classList.contains('inner-div')).toBeTruthy();
                expect(pcp.keyframes).toEqual([
                    new Map([
                        ['opacity', '0'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '1'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it(`should emulate a leave animation on a nested sub component's inner elements when a parent leave animation occurs with animateChild`, () => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div @myAnimation *ngIf="exp" class="parent">
              <child-cmp></child-cmp>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('myAnimation', [(0, animations_1.transition)(':leave', [(0, animations_1.query)('@*', (0, animations_1.animateChild)())])]),
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
                            template: `
               <nested-child-cmp></nested-child-cmp>
             `,
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
                let NestedChildCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'nested-child-cmp',
                            template: `
               <section>
                 <div class="inner-div" @myChildAnimation></div>
               </section>
             `,
                            animations: [
                                (0, animations_1.trigger)('myChildAnimation', [
                                    (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var NestedChildCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "NestedChildCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        NestedChildCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return NestedChildCmp = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp, NestedChildCmp] });
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(ParentCmp);
                const cmp = fixture.componentInstance;
                cmp.exp = true;
                fixture.detectChanges();
                cmp.exp = false;
                fixture.detectChanges();
                // Inspect the players of the AnimationEngine and not those from getLog. The latter only
                // returns the actual animation players, which the parent leave animation is not part
                // of given that it does not have animation instructions of its own.
                const players = engine.players;
                expect(players.length).toEqual(1);
                const player = players[0];
                const realPlayer = player.getRealPlayer();
                expect(player.element.classList.contains('parent')).toBeTruthy();
                expect(realPlayer.element.classList.contains('inner-div')).toBeTruthy();
                expect(realPlayer.keyframes).toEqual([
                    new Map([
                        ['opacity', '0'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['opacity', '1'],
                        ['offset', 1],
                    ]),
                ]);
            });
            it('should not cause a removal of inner @trigger DOM nodes when a parent animation occurs', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            template: `
            <div @parent *ngIf="exp" class="parent">
              this <div @child>child</div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)(':leave', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))]),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('* => something', [
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
                    var Cmp = _classThis = class {
                        constructor() {
                            this.exp = true;
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
                cmp.exp = true;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                cmp.exp = false;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                const players = getLog();
                expect(players.length).toEqual(1);
                const element = players[0].element;
                expect(element.innerText.trim()).toMatch(/this\s+child/gm);
            }));
            it('should only mark outermost *directive nodes :enter and :leave when inserts and removals occur', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            animations: [
                                (0, animations_1.trigger)('anim', [
                                    (0, animations_1.transition)('* => enter', [(0, animations_1.query)(':enter', [(0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'red' }))])]),
                                    (0, animations_1.transition)('* => leave', [(0, animations_1.query)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'blue' }))])]),
                                ]),
                            ],
                            template: `
            <section class="container" [@anim]="exp ? 'enter' : 'leave'">
              <div class="a" *ngIf="exp">
                <div class="b" *ngIf="exp">
                  <div class="c" *ngIf="exp">
                    text
                  </div>
                </div>
              </div>
              <div>
                <div class="d" *ngIf="exp">
                  text2
                </div>
              </div>
            </section>
          `,
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
                const container = fixture.elementRef.nativeElement;
                cmp.exp = true;
                fixture.detectChanges();
                engine.flush();
                let players = getLog();
                resetLog();
                expect(players.length).toEqual(2);
                const [p1, p2] = players;
                expect(p1.element.classList.contains('a')).toBeTrue();
                expect(p2.element.classList.contains('d')).toBeTrue();
                cmp.exp = false;
                fixture.detectChanges();
                engine.flush();
                players = getLog();
                resetLog();
                expect(players.length).toEqual(2);
                const [p3, p4] = players;
                expect(p3.element.classList.contains('a')).toBeTrue();
                expect(p4.element.classList.contains('d')).toBeTrue();
            });
            it('should collect multiple root levels of :enter and :leave nodes', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            animations: [
                                (0, animations_1.trigger)('pageAnimation', [
                                    (0, animations_1.transition)(':enter', []),
                                    (0, animations_1.transition)('* => *', [
                                        (0, animations_1.query)(':leave', [(0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 0 }))], { optional: true }),
                                        (0, animations_1.query)(':enter', [(0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 }))], { optional: true }),
                                    ]),
                                ]),
                            ],
                            template: `
            <div [@pageAnimation]="status">
              <header>
                <div *ngIf="!loading" class="title">{{ title }}</div>
                <div *ngIf="loading" class="loading">loading...</div>
              </header>
              <section>
                <div class="page">
                  <div *ngIf="page1" class="page1">
                    <div *ngIf="true">page 1</div>
                  </div>
                  <div *ngIf="page2" class="page2">
                    <div *ngIf="true">page 2</div>
                  </div>
                </div>
              </section>
            </div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.page1 = false;
                            this.page2 = false;
                            this.loading = false;
                        }
                        get title() {
                            if (this.page1) {
                                return 'hello from page1';
                            }
                            return 'greetings from page2';
                        }
                        get status() {
                            if (this.loading)
                                return 'loading';
                            if (this.page1)
                                return 'page1';
                            if (this.page2)
                                return 'page2';
                            return '';
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
                cmp.loading = true;
                fixture.detectChanges();
                engine.flush();
                let players = getLog();
                resetLog();
                cancelAllPlayers(players);
                cmp.page1 = true;
                cmp.loading = false;
                fixture.detectChanges();
                engine.flush();
                let p1;
                let p2;
                let p3;
                players = getLog();
                expect(players.length).toEqual(3);
                [p1, p2, p3] = players;
                expect(p1.element.classList.contains('loading')).toBe(true);
                expect(p2.element.classList.contains('title')).toBe(true);
                expect(p3.element.classList.contains('page1')).toBe(true);
                resetLog();
                cancelAllPlayers(players);
                cmp.page1 = false;
                cmp.loading = true;
                fixture.detectChanges();
                players = getLog();
                cancelAllPlayers(players);
                expect(players.length).toEqual(3);
                [p1, p2, p3] = players;
                expect(p1.element.classList.contains('title')).toBe(true);
                expect(p2.element.classList.contains('page1')).toBe(true);
                expect(p3.element.classList.contains('loading')).toBe(true);
                resetLog();
                cancelAllPlayers(players);
                cmp.page2 = true;
                cmp.loading = false;
                fixture.detectChanges();
                engine.flush();
                players = getLog();
                expect(players.length).toEqual(3);
                [p1, p2, p3] = players;
                expect(p1.element.classList.contains('loading')).toBe(true);
                expect(p2.element.classList.contains('title')).toBe(true);
                expect(p3.element.classList.contains('page2')).toBe(true);
            });
            it('should emulate leave animation callbacks for all sub elements that have leave triggers within the component', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ani-cmp',
                            animations: [
                                (0, animations_1.trigger)('parent', []),
                                (0, animations_1.trigger)('child', []),
                                (0, animations_1.trigger)('childWithAnimation', [
                                    (0, animations_1.transition)(':leave', [(0, animations_1.animate)(1000, (0, animations_1.style)({ background: 'red' }))]),
                                ]),
                            ],
                            template: `
            <div data-name="p" class="parent" @parent *ngIf="exp" (@parent.start)="callback($event)" (@parent.done)="callback($event)">
              <div data-name="c1" @child (@child.start)="callback($event)" (@child.done)="callback($event)"></div>
              <div data-name="c2" @child (@child.start)="callback($event)" (@child.done)="callback($event)"></div>
              <div data-name="c3" @childWithAnimation (@childWithAnimation.start)="callback($event)" (@childWithAnimation.done)="callback($event)"></div>
            </div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.log = [];
                        }
                        callback(event) {
                            this.log.push(event.element.getAttribute('data-name') + '-' + event.phaseName);
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
                (0, testing_2.flushMicrotasks)();
                cmp.log = [];
                cmp.exp = false;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual([
                    'c1-start',
                    'c1-done',
                    'c2-start',
                    'c2-done',
                    'p-start',
                    'c3-start',
                    'c3-done',
                    'p-done',
                ]);
            }));
            it('should build, but not run sub triggers when a parent animation is scheduled', () => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent-cmp',
                            animations: [
                                (0, animations_1.trigger)('parent', [(0, animations_1.transition)('* => *', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))])]),
                            ],
                            template: '<div [@parent]="exp"><child-cmp #child></child-cmp></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _childCmp_decorators;
                    let _childCmp_initializers = [];
                    let _childCmp_extraInitializers = [];
                    var ParentCmp = _classThis = class {
                        constructor() {
                            this.childCmp = __runInitializers(this, _childCmp_initializers, void 0);
                            __runInitializers(this, _childCmp_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ParentCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _childCmp_decorators = [(0, core_1.ViewChild)('child')];
                        __esDecorate(null, null, _childCmp_decorators, { kind: "field", name: "childCmp", static: false, private: false, access: { has: obj => "childCmp" in obj, get: obj => obj.childCmp, set: (obj, value) => { obj.childCmp = value; } }, metadata: _metadata }, _childCmp_initializers, _childCmp_extraInitializers);
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
                            animations: [
                                (0, animations_1.trigger)('child', [(0, animations_1.transition)('* => *', [(0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'red' }))])]),
                            ],
                            template: '<div [@child]="exp"></div>',
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
                resetLog();
                const cmp = fixture.componentInstance;
                const childCmp = cmp.childCmp;
                cmp.exp = 1;
                childCmp.exp = 1;
                fixture.detectChanges();
                engine.flush();
                // we have 2 players, but the child is not used even though
                // it is created.
                const players = getLog();
                expect(players.length).toEqual(2);
                expect(engine.players.length).toEqual(1);
                expect(engine.players[0].getRealPlayer()).toBe(players[1]);
            });
            it('should fire and synchronize the start/done callbacks on sub triggers even if they are not allowed to animate within the animation', (0, testing_2.fakeAsync)(() => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent-cmp',
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ height: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '100px' })),
                                    ]),
                                ]),
                            ],
                            template: `
            <div *ngIf="!remove"
                 [@parent]="exp"
                 (@parent.start)="track($event)"
                 (@parent.done)="track($event)">
                 <child-cmp #child></child-cmp>
            </div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _childCmp_decorators;
                    let _childCmp_initializers = [];
                    let _childCmp_extraInitializers = [];
                    var ParentCmp = _classThis = class {
                        constructor() {
                            this.childCmp = __runInitializers(this, _childCmp_initializers, void 0);
                            this.exp = __runInitializers(this, _childCmp_extraInitializers);
                            this.log = [];
                            this.remove = false;
                        }
                        track(event) {
                            this.log.push(`${event.triggerName}-${event.phaseName}`);
                        }
                    };
                    __setFunctionName(_classThis, "ParentCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _childCmp_decorators = [(0, core_1.ViewChild)('child')];
                        __esDecorate(null, null, _childCmp_decorators, { kind: "field", name: "childCmp", static: false, private: false, access: { has: obj => "childCmp" in obj, get: obj => obj.childCmp, set: (obj, value) => { obj.childCmp = value; } }, metadata: _metadata }, _childCmp_initializers, _childCmp_extraInitializers);
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
                            animations: [
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ width: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '100px' })),
                                    ]),
                                ]),
                            ],
                            template: `
            <div [@child]="exp"
                 (@child.start)="track($event)"
                 (@child.done)="track($event)"></div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildCmp = _classThis = class {
                        constructor() {
                            this.log = [];
                        }
                        track(event) {
                            this.log.push(`${event.triggerName}-${event.phaseName}`);
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
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(ParentCmp);
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                const cmp = fixture.componentInstance;
                const child = cmp.childCmp;
                expect(cmp.log).toEqual(['parent-start', 'parent-done']);
                expect(child.log).toEqual(['child-start', 'child-done']);
                cmp.log = [];
                child.log = [];
                cmp.exp = 'go';
                cmp.childCmp.exp = 'go';
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['parent-start']);
                expect(child.log).toEqual(['child-start']);
                const players = engine.players;
                expect(players.length).toEqual(1);
                players[0].finish();
                expect(cmp.log).toEqual(['parent-start', 'parent-done']);
                expect(child.log).toEqual(['child-start', 'child-done']);
                cmp.log = [];
                child.log = [];
                cmp.remove = true;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['parent-start', 'parent-done']);
                expect(child.log).toEqual(['child-start', 'child-done']);
            }));
            it('should fire and synchronize the start/done callbacks on multiple blocked sub triggers', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            animations: [
                                (0, animations_1.trigger)('parent1', [
                                    (0, animations_1.transition)('* => go, * => go-again', [
                                        (0, animations_1.style)({ opacity: 0 }),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 1 })),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('parent2', [
                                    (0, animations_1.transition)('* => go, * => go-again', [
                                        (0, animations_1.style)({ lineHeight: '0px' }),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ lineHeight: '10px' })),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('child1', [
                                    (0, animations_1.transition)('* => go, * => go-again', [
                                        (0, animations_1.style)({ width: '0px' }),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ width: '100px' })),
                                    ]),
                                ]),
                                (0, animations_1.trigger)('child2', [
                                    (0, animations_1.transition)('* => go, * => go-again', [
                                        (0, animations_1.style)({ height: '0px' }),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ height: '100px' })),
                                    ]),
                                ]),
                            ],
                            template: `
               <div [@parent1]="parent1Exp" (@parent1.start)="track($event)"
                    [@parent2]="parent2Exp" (@parent2.start)="track($event)">
                 <div [@child1]="child1Exp" (@child1.start)="track($event)"
                      [@child2]="child2Exp" (@child2.start)="track($event)"></div>
               </div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.parent1Exp = '';
                            this.parent2Exp = '';
                            this.child1Exp = '';
                            this.child2Exp = '';
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
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                const cmp = fixture.componentInstance;
                cmp.log = [];
                cmp.parent1Exp = 'go';
                cmp.parent2Exp = 'go';
                cmp.child1Exp = 'go';
                cmp.child2Exp = 'go';
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                expect(cmp.log).toEqual(['parent1-start', 'parent2-start', 'child1-start', 'child2-start']);
                cmp.parent1Exp = 'go-again';
                cmp.parent2Exp = 'go-again';
                cmp.child1Exp = 'go-again';
                cmp.child2Exp = 'go-again';
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
            }));
            it('should stretch the starting keyframe of a child animation queries are issued by the parent', () => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent-cmp',
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)('* => *', [
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'red' })),
                                        (0, animations_1.query)('@child', (0, animations_1.animateChild)()),
                                    ]),
                                ]),
                            ],
                            template: '<div [@parent]="exp"><child-cmp #child></child-cmp></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _childCmp_decorators;
                    let _childCmp_initializers = [];
                    let _childCmp_extraInitializers = [];
                    var ParentCmp = _classThis = class {
                        constructor() {
                            this.childCmp = __runInitializers(this, _childCmp_initializers, void 0);
                            __runInitializers(this, _childCmp_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ParentCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _childCmp_decorators = [(0, core_1.ViewChild)('child')];
                        __esDecorate(null, null, _childCmp_decorators, { kind: "field", name: "childCmp", static: false, private: false, access: { has: obj => "childCmp" in obj, get: obj => obj.childCmp, set: (obj, value) => { obj.childCmp = value; } }, metadata: _metadata }, _childCmp_initializers, _childCmp_extraInitializers);
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
                            animations: [
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)('* => *', [(0, animations_1.style)({ color: 'blue' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ color: 'red' }))]),
                                ]),
                            ],
                            template: '<div [@child]="exp" class="child"></div>',
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
                resetLog();
                const cmp = fixture.componentInstance;
                const childCmp = cmp.childCmp;
                cmp.exp = 1;
                childCmp.exp = 1;
                fixture.detectChanges();
                engine.flush();
                expect(engine.players.length).toEqual(1); // child player, parent cover, parent player
                const groupPlayer = engine.players[0].getRealPlayer();
                const childPlayer = groupPlayer.players.find((player) => {
                    if (player instanceof testing_1.MockAnimationPlayer) {
                        return player.element.classList.contains('child');
                    }
                    return false;
                });
                const keyframes = (0, browser_1.ɵnormalizeKeyframes)(childPlayer.keyframes).map((kf) => {
                    kf.delete('offset');
                    return kf;
                });
                expect(keyframes.length).toEqual(3);
                const [k1, k2, k3] = keyframes;
                expect(k1).toEqual(k2);
            });
            it('should allow a parent trigger to control child triggers across multiple template boundaries even if there are no animations in between', () => {
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent-cmp',
                            animations: [
                                (0, animations_1.trigger)('parentAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.query)(':self, @grandChildAnimation', (0, animations_1.style)({ opacity: 0 })),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })),
                                        (0, animations_1.query)('@grandChildAnimation', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 })), (0, animations_1.animateChild)()]),
                                    ]),
                                ]),
                            ],
                            template: '<div [@parentAnimation]="exp"><child-cmp #child></child-cmp></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _innerCmp_decorators;
                    let _innerCmp_initializers = [];
                    let _innerCmp_extraInitializers = [];
                    var ParentCmp = _classThis = class {
                        constructor() {
                            this.innerCmp = __runInitializers(this, _innerCmp_initializers, void 0);
                            __runInitializers(this, _innerCmp_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ParentCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _innerCmp_decorators = [(0, core_1.ViewChild)('child')];
                        __esDecorate(null, null, _innerCmp_decorators, { kind: "field", name: "innerCmp", static: false, private: false, access: { has: obj => "innerCmp" in obj, get: obj => obj.innerCmp, set: (obj, value) => { obj.innerCmp = value; } }, metadata: _metadata }, _innerCmp_initializers, _innerCmp_extraInitializers);
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
                            template: '<grandchild-cmp #grandchild></grandchild-cmp>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _innerCmp_decorators;
                    let _innerCmp_initializers = [];
                    let _innerCmp_extraInitializers = [];
                    var ChildCmp = _classThis = class {
                        constructor() {
                            this.innerCmp = __runInitializers(this, _innerCmp_initializers, void 0);
                            __runInitializers(this, _innerCmp_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ChildCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _innerCmp_decorators = [(0, core_1.ViewChild)('grandchild')];
                        __esDecorate(null, null, _innerCmp_decorators, { kind: "field", name: "innerCmp", static: false, private: false, access: { has: obj => "innerCmp" in obj, get: obj => obj.innerCmp, set: (obj, value) => { obj.innerCmp = value; } }, metadata: _metadata }, _innerCmp_initializers, _innerCmp_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChildCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChildCmp = _classThis;
                })();
                let GrandChildCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'grandchild-cmp',
                            animations: [
                                (0, animations_1.trigger)('grandChildAnimation', [
                                    (0, animations_1.transition)('* => go', [
                                        (0, animations_1.style)({ width: '0px' }),
                                        (0, animations_1.animate)(1000, (0, animations_1.style)({ width: '200px' })),
                                    ]),
                                ]),
                            ],
                            template: '<div [@grandChildAnimation]="exp"></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var GrandChildCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "GrandChildCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        GrandChildCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return GrandChildCmp = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [ParentCmp, ChildCmp, GrandChildCmp] });
                const engine = testing_2.TestBed.inject(browser_1.ɵAnimationEngine);
                const fixture = testing_2.TestBed.createComponent(ParentCmp);
                fixture.detectChanges();
                engine.flush();
                resetLog();
                const cmp = fixture.componentInstance;
                const grandChildCmp = cmp.innerCmp.innerCmp;
                cmp.exp = 'go';
                grandChildCmp.exp = 'go';
                fixture.detectChanges();
                engine.flush();
                const players = getLog();
                expect(players.length).toEqual(6);
                // players:
                //  - _sgcp (skipped grand child player): player for the grand child animation
                //  - _psp (parent self player): player for parent self animation (opacity 0)
                //  - _pgcp1 (parent grand child player 1):
                //     player for child animation executed by parent via query (opacity 0)
                //  - _pp1 (parent player 1): player for parent animation (from opacity 0 to opacity 1)
                //  - _pgcp2 (parent grand child player 2):
                //     player for child animation executed by parent via query and animate
                //     (from opacity 0 to opacity 1)
                //  - pgcp3 (parent grand child player 3):
                //     player for child animation executed by parent via query and animateChild
                //     (from 0px to 200px)
                const [_sgcp, _psp, _pgcp1, _pp1, _pgcp2, pgcp3] = players;
                expect(pgcp3.keyframes).toEqual([
                    new Map([
                        ['offset', 0],
                        ['width', '0px'],
                    ]),
                    new Map([
                        ['offset', 0.67],
                        ['width', '0px'],
                    ]),
                    new Map([
                        ['offset', 1],
                        ['width', '200px'],
                    ]),
                ]);
            });
            it('should scope :enter queries between sub animations', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)(':enter', (0, animations_1.group)([
                                        (0, animations_1.sequence)([(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                        (0, animations_1.query)(':enter @child', (0, animations_1.animateChild)()),
                                    ])),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)(':enter', [
                                        (0, animations_1.query)(':enter .item', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                    ]),
                                ]),
                            ],
                            template: `
               <div @parent *ngIf="exp1" class="container">
                 <div *ngIf="exp2">
                   <div @child>
                     <div *ngIf="exp3">
                       <div class="item"></div>
                     </div>
                   </div>
                 </div>
               </div>
             `,
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
                resetLog();
                const cmp = fixture.componentInstance;
                cmp.exp1 = true;
                cmp.exp2 = true;
                cmp.exp3 = true;
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(3);
                // players:
                //  - _scp (skipped child player): player for the child animation
                //  - pp (parent player): player for parent animation (from opacity 0 to opacity 1)
                //  - pcp (parent child player):
                //      player for child animation executed by parent via query and animateChild
                const [_scp, pp, pcp] = players;
                expect(pp.element.classList.contains('container')).toBeTruthy();
                expect(pcp.element.classList.contains('item')).toBeTruthy();
            });
            it('should scope :leave queries between sub animations', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.transition)(':leave', (0, animations_1.group)([
                                        (0, animations_1.sequence)([(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                        (0, animations_1.query)(':leave @child', (0, animations_1.animateChild)()),
                                    ])),
                                ]),
                                (0, animations_1.trigger)('child', [
                                    (0, animations_1.transition)(':leave', [
                                        (0, animations_1.query)(':leave .item', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 1 }))]),
                                    ]),
                                ]),
                            ],
                            template: `
               <div @parent *ngIf="exp1" class="container">
                 <div *ngIf="exp2">
                   <div @child>
                     <div *ngIf="exp3">
                       <div class="item"></div>
                     </div>
                   </div>
                 </div>
               </div>
             `,
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
                const cmp = fixture.componentInstance;
                cmp.exp1 = true;
                cmp.exp2 = true;
                cmp.exp3 = true;
                fixture.detectChanges();
                resetLog();
                cmp.exp1 = false;
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(3);
                // players:
                //  - _scp (skipped child player): player for the child animation
                //  - pp (parent player): player for parent animation (from opacity 0 to opacity 1)
                //  - pcp (parent child player):
                //      player for child animation executed by parent via query and animateChild
                const [_scp, pp, pcp] = players;
                expect(pp.element.classList.contains('container')).toBeTruthy();
                expect(pcp.element.classList.contains('item')).toBeTruthy();
            });
            it('should correctly remove a leaving element queried/animated by a parent queried via animateChild', (0, testing_2.fakeAsync)(() => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
            <div class="grand-parent" [@grandParentAnimation]="childPresent">
              <div class="parent" [@parentAnimation]="childPresent">
              <div *ngIf="childPresent" class="child"></div>
              </div>
            </div>
          `,
                            animations: [
                                (0, animations_1.trigger)('grandParentAnimation', [
                                    (0, animations_1.transition)('true <=> false', (0, animations_1.query)('@parentAnimation', (0, animations_1.animateChild)())),
                                ]),
                                (0, animations_1.trigger)('parentAnimation', [
                                    (0, animations_1.transition)('true => false', (0, animations_1.query)(':leave.child', (0, animations_1.animate)('.2s', (0, animations_1.style)({ opacity: 0 })))),
                                ]),
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            this.childPresent = true;
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
                let children = fixture.debugElement.nativeElement.querySelectorAll('.child');
                expect(children.length).toEqual(1);
                cmp.childPresent = false;
                fixture.detectChanges();
                (0, testing_2.flushMicrotasks)();
                engine.players.forEach((player) => player.finish());
                children = fixture.debugElement.nativeElement.querySelectorAll('.child');
                expect(children.length).toEqual(0);
            }));
            it('should correctly animate state styles of the root element applied via animate inside a group (independently of the order)', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
          <div class="parent" [@parent]="exp">
            <div class="child" *ngIf="exp"></div>
          </div>
        `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.state)('true', (0, animations_1.style)({ backgroundColor: 'red' })),
                                    (0, animations_1.state)('false', (0, animations_1.style)({ backgroundColor: 'blue' })),
                                    (0, animations_1.transition)('true <=> false', [
                                        (0, animations_1.group)([
                                            (0, animations_1.animate)(500),
                                            (0, animations_1.query)(':leave', [(0, animations_1.animate)(500, (0, animations_1.style)({ opacity: 0 }))], { optional: true }),
                                            (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(500, (0, animations_1.style)({ opacity: '*' }))], {
                                                optional: true,
                                            }),
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
                            this.exp = true;
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
                cmp.exp = false;
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(3);
                // players:
                //  - _pp1 (parent player 1): player for parent animation (from background red to red)
                //  - pp2 (parent player 2): player for parent animation (from background red to blue)
                //  - _cp (child player): player for child animation (from current opacity to 0)
                const [_pp1, pp2, _cp] = players;
                expect(pp2.element.classList.contains('parent')).toBeTruthy();
                const expectedKeyframes = [
                    new Map([
                        ['backgroundColor', 'red'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['backgroundColor', 'blue'],
                        ['offset', 1],
                    ]),
                ];
                expect(pp2.keyframes).toEqual(expectedKeyframes);
            });
            it('should correctly animate state styles of the root element applied via animate inside a sequence (independently of the order)', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'cmp',
                            template: `
          <div class="parent" [@parent]="exp">
            <div class="child" *ngIf="exp"></div>
          </div>
        `,
                            animations: [
                                (0, animations_1.trigger)('parent', [
                                    (0, animations_1.state)('true', (0, animations_1.style)({ backgroundColor: 'red' })),
                                    (0, animations_1.state)('false', (0, animations_1.style)({ backgroundColor: 'blue' })),
                                    (0, animations_1.transition)('true <=> false', [
                                        (0, animations_1.sequence)([
                                            (0, animations_1.query)(':enter', [(0, animations_1.style)({ opacity: 0 }), (0, animations_1.animate)(500, (0, animations_1.style)({ opacity: '*' }))], {
                                                optional: true,
                                            }),
                                            (0, animations_1.animate)(500),
                                            (0, animations_1.query)(':leave', [(0, animations_1.animate)(500, (0, animations_1.style)({ opacity: 0 }))], { optional: true }),
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
                const fixture = testing_2.TestBed.createComponent(Cmp);
                const cmp = fixture.componentInstance;
                fixture.detectChanges();
                cmp.exp = true;
                fixture.detectChanges();
                const players = getLog();
                expect(players.length).toEqual(3);
                // players:
                //  - _pp1 (parent player 1): player for parent animation (from background blue to blue)
                //  - _cp (child player): player for child animation (from opacity 0 to *)
                //  - pp2 (parent player 2): player for parent animation (from background blue to red)
                const [_pp1, _cp, pp2] = players;
                expect(pp2.element.classList.contains('parent')).toBeTruthy();
                const expectedKeyframes = [
                    new Map([
                        ['backgroundColor', 'blue'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['backgroundColor', 'red'],
                        ['offset', 1],
                    ]),
                ];
                expect(pp2.keyframes).toEqual(expectedKeyframes);
            });
        });
        describe('animation control flags', () => {
            describe('[@.disabled]', () => {
                it('should allow a parent animation to query and animate inner nodes that are in a disabled region', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'some-cmp',
                                template: `
              <div [@myAnimation]="exp">
                <div [@.disabled]="disabledExp">
                  <div class="header"></div>
                  <div class="footer"></div>
                </div>
              </div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('myAnimation', [
                                        (0, animations_1.transition)('* => go', [
                                            (0, animations_1.query)('.header', (0, animations_1.animate)(750, (0, animations_1.style)({ opacity: 0 }))),
                                            (0, animations_1.query)('.footer', (0, animations_1.animate)(250, (0, animations_1.style)({ opacity: 0 }))),
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
                                this.exp = '';
                                this.disabledExp = false;
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
                    cmp.disabledExp = true;
                    fixture.detectChanges();
                    resetLog();
                    cmp.exp = 'go';
                    fixture.detectChanges();
                    const players = getLog();
                    expect(players.length).toEqual(2);
                    const [p1, p2] = players;
                    expect(p1.duration).toEqual(750);
                    expect(p1.element.classList.contains('header')).toBeTrue();
                    expect(p2.duration).toEqual(250);
                    expect(p2.element.classList.contains('footer')).toBeTrue();
                });
                it('should allow a parent animation to query and animate sub animations that are in a disabled region', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'some-cmp',
                                template: `
              <div class="parent" [@parentAnimation]="exp">
                <div [@.disabled]="disabledExp">
                  <div class="child" [@childAnimation]="exp"></div>
                </div>
              </div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('parentAnimation', [
                                        (0, animations_1.transition)('* => go', [
                                            (0, animations_1.query)('@childAnimation', (0, animations_1.animateChild)()),
                                            (0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 })),
                                        ]),
                                    ]),
                                    (0, animations_1.trigger)('childAnimation', [
                                        (0, animations_1.transition)('* => go', [(0, animations_1.animate)(500, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = '';
                                this.disabledExp = false;
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
                    cmp.disabledExp = true;
                    fixture.detectChanges();
                    resetLog();
                    cmp.exp = 'go';
                    fixture.detectChanges();
                    const players = getLog();
                    expect(players.length).toEqual(2);
                    const [p1, p2] = players;
                    expect(p1.duration).toEqual(500);
                    expect(p1.element.classList.contains('child')).toBeTrue();
                    expect(p2.duration).toEqual(1000);
                    expect(p2.element.classList.contains('parent')).toBeTrue();
                });
                it('should disable the animation for the given element regardless of existing parent element animation queries or child element animation queries', () => {
                    let Cmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'some-cmp',
                                template: `
              <div class="parent" [@parentAnimation]="exp">
                <div class="child" [@.disabled]="disabledExp" [@childAnimation]="exp">
                  <div class="grand-child" [@grandChildAnimation]="exp"></div>
                </div>
              </div>
            `,
                                animations: [
                                    (0, animations_1.trigger)('parentAnimation', [
                                        (0, animations_1.transition)('* => go', [
                                            (0, animations_1.query)('@*', (0, animations_1.animateChild)()),
                                            (0, animations_1.animate)(1500, (0, animations_1.style)({ opacity: 0 })),
                                        ]),
                                    ]),
                                    (0, animations_1.trigger)('childAnimation', [
                                        (0, animations_1.transition)('* => go', [(0, animations_1.animate)(1000, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                    (0, animations_1.trigger)('grandChildAnimation', [
                                        (0, animations_1.transition)('* => go', [(0, animations_1.animate)(500, (0, animations_1.style)({ opacity: 0 }))]),
                                    ]),
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Cmp = _classThis = class {
                            constructor() {
                                this.exp = '';
                                this.disabledExp = false;
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
                    cmp.disabledExp = true;
                    fixture.detectChanges();
                    resetLog();
                    cmp.exp = 'go';
                    fixture.detectChanges();
                    const players = getLog();
                    expect(players.length).toEqual(2);
                    const [p1, p2] = players;
                    expect(p1.duration).toEqual(500);
                    expect(p1.element.classList.contains('grand-child')).toBeTrue();
                    expect(p2.duration).toEqual(1500);
                    expect(p2.element.classList.contains('parent')).toBeTrue();
                });
            });
        });
    });
})();
function cancelAllPlayers(players) {
    players.forEach((p) => p.destroy());
}
