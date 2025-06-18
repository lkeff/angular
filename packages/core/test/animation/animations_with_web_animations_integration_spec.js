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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const animations_2 = require("@angular/platform-browser/animations");
(function () {
    // these tests are only meant to be run within the DOM (for now)
    // Buggy in Chromium 39, see https://github.com/angular/angular/issues/15793
    if (isNode)
        return;
    describe('animation integration tests using web animations', function () {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: browser_1.AnimationDriver, useClass: browser_1.ɵWebAnimationsDriver }],
                imports: [animations_2.BrowserAnimationsModule],
            });
        });
        it('should compute (*) animation styles for a container that is being removed', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: `
          <div @auto *ngIf="exp">
            <div style="line-height:20px;">1</div>
            <div style="line-height:20px;">2</div>
            <div style="line-height:20px;">3</div>
            <div style="line-height:20px;">4</div>
            <div style="line-height:20px;">5</div>
          </div>
        `,
                        animations: [
                            (0, animations_1.trigger)('auto', [
                                (0, animations_1.state)('void', (0, animations_1.style)({ height: '0px' })),
                                (0, animations_1.state)('*', (0, animations_1.style)({ height: '*' })),
                                (0, animations_1.transition)('* => *', (0, animations_1.animate)(1000)),
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            cmp.exp = true;
            fixture.detectChanges();
            expect(engine.players.length).toEqual(1);
            let webPlayer = engine.players[0].getRealPlayer();
            expect(webPlayer.keyframes).toEqual([
                new Map([
                    ['height', '0px'],
                    ['offset', 0],
                ]),
                new Map([
                    ['height', '100px'],
                    ['offset', 1],
                ]),
            ]);
            webPlayer.finish();
            cmp.exp = false;
            fixture.detectChanges();
            engine.flush();
            expect(engine.players.length).toEqual(1);
            webPlayer = engine.players[0].getRealPlayer();
            expect(webPlayer.keyframes).toEqual([
                new Map([
                    ['height', '100px'],
                    ['offset', 0],
                ]),
                new Map([
                    ['height', '0px'],
                    ['offset', 1],
                ]),
            ]);
        });
        it('should compute (!) animation styles for a container that is being inserted', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: `
          <div @auto *ngIf="exp">
            <div style="line-height:20px;">1</div>
            <div style="line-height:20px;">2</div>
            <div style="line-height:20px;">3</div>
            <div style="line-height:20px;">4</div>
            <div style="line-height:20px;">5</div>
          </div>
        `,
                        animations: [
                            (0, animations_1.trigger)('auto', [
                                (0, animations_1.transition)(':enter', [(0, animations_1.style)({ height: '!' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '120px' }))]),
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            cmp.exp = true;
            fixture.detectChanges();
            engine.flush();
            expect(engine.players.length).toEqual(1);
            let webPlayer = engine.players[0].getRealPlayer();
            expect(webPlayer.keyframes).toEqual([
                new Map([
                    ['height', '100px'],
                    ['offset', 0],
                ]),
                new Map([
                    ['height', '120px'],
                    ['offset', 1],
                ]),
            ]);
        });
        it('should compute pre (!) and post (*) animation styles with different dom states', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: `
            <div [@myAnimation]="exp" #parent>
              <div *ngFor="let item of items" class="child" style="line-height:20px">
                - {{ item }}
              </div>
            </div>
          `,
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [
                                (0, animations_1.transition)('* => *', [(0, animations_1.style)({ height: '!' }), (0, animations_1.animate)(1000, (0, animations_1.style)({ height: '*' }))]),
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            cmp.exp = 1;
            fixture.detectChanges();
            engine.flush();
            expect(engine.players.length).toEqual(1);
            let player = engine.players[0];
            let webPlayer = player.getRealPlayer();
            expect(webPlayer.keyframes).toEqual([
                new Map([
                    ['height', '0px'],
                    ['offset', 0],
                ]),
                new Map([
                    ['height', '100px'],
                    ['offset', 1],
                ]),
            ]);
            // we destroy the player because since it has started and is
            // at 0ms duration a height value of `0px` will be extracted
            // from the element and passed into the follow-up animation.
            player.destroy();
            cmp.exp = 2;
            cmp.items = [0, 1, 2, 6];
            fixture.detectChanges();
            engine.flush();
            expect(engine.players.length).toEqual(1);
            player = engine.players[0];
            webPlayer = player.getRealPlayer();
            expect(webPlayer.keyframes).toEqual([
                new Map([
                    ['height', '100px'],
                    ['offset', 0],
                ]),
                new Map([
                    ['height', '80px'],
                    ['offset', 1],
                ]),
            ]);
        });
        it('should treat * styles as ! when a removal animation is being rendered', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        styles: [
                            `
            .box {
              width: 500px;
              overflow:hidden;
              background:orange;
              line-height:300px;
              font-size:100px;
              text-align:center;
            }
          `,
                        ],
                        template: `
            <button (click)="toggle()">Open / Close</button>
            <hr />
            <div *ngIf="exp" @slide class="box">
            ...
            </div>
          `,
                        animations: [
                            (0, animations_1.trigger)('slide', [
                                (0, animations_1.state)('void', (0, animations_1.style)({ height: '0px' })),
                                (0, animations_1.state)('*', (0, animations_1.style)({ height: '*' })),
                                (0, animations_1.transition)('* => *', (0, animations_1.animate)('500ms')),
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
                    toggle() {
                        this.exp = !this.exp;
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
            let player = engine.players[0];
            let webPlayer = player.getRealPlayer();
            expect(webPlayer.keyframes).toEqual([
                new Map([
                    ['height', '0px'],
                    ['offset', 0],
                ]),
                new Map([
                    ['height', '300px'],
                    ['offset', 1],
                ]),
            ]);
            player.finish();
            cmp.exp = false;
            fixture.detectChanges();
            player = engine.players[0];
            webPlayer = player.getRealPlayer();
            expect(webPlayer.keyframes).toEqual([
                new Map([
                    ['height', '300px'],
                    ['offset', 0],
                ]),
                new Map([
                    ['height', '0px'],
                    ['offset', 1],
                ]),
            ]);
        });
        it('should treat * styles as ! for queried items that are collected in a container that is being removed', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        styles: [
                            `
              .list .outer {
                overflow:hidden;
              }
              .list .inner {
                box-sizing: border-box;
                height: 50px;
              }
            `,
                        ],
                        template: `
              <button (click)="empty()">Empty</button>
              <button (click)="middle()">Middle</button>
              <button (click)="full()">Full</button>
              <hr />
              <div [@list]="exp" class="list">
                <div *ngFor="let item of items" class="outer">
                  <div class="inner">
                    {{ item }}
                  </div>
                </div>
              </div>
            `,
                        animations: [
                            (0, animations_1.trigger)('list', [
                                (0, animations_1.transition)(':enter', []),
                                (0, animations_1.transition)('* => empty', [(0, animations_1.query)(':leave', [(0, animations_1.animate)(500, (0, animations_1.style)({ height: '0px' }))])]),
                                (0, animations_1.transition)('* => full', [
                                    (0, animations_1.query)(':enter', [(0, animations_1.style)({ height: '0px' }), (0, animations_1.animate)(500, (0, animations_1.style)({ height: '*' }))]),
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
                    get exp() {
                        return this.items.length ? 'full' : 'empty';
                    }
                    empty() {
                        this.items = [];
                    }
                    full() {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            cmp.empty();
            fixture.detectChanges();
            let player = engine.players[0];
            player.finish();
            cmp.full();
            fixture.detectChanges();
            player = engine.players[0];
            let queriedPlayers = player.getRealPlayer().players;
            expect(queriedPlayers.length).toEqual(5);
            let i = 0;
            for (i = 0; i < queriedPlayers.length; i++) {
                let player = queriedPlayers[i];
                expect(player.keyframes).toEqual([
                    new Map([
                        ['height', '0px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['height', '50px'],
                        ['offset', 1],
                    ]),
                ]);
                player.finish();
            }
            cmp.empty();
            fixture.detectChanges();
            player = engine.players[0];
            queriedPlayers = player.getRealPlayer().players;
            expect(queriedPlayers.length).toEqual(5);
            for (i = 0; i < queriedPlayers.length; i++) {
                let player = queriedPlayers[i];
                expect(player.keyframes).toEqual([
                    new Map([
                        ['height', '50px'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['height', '0px'],
                        ['offset', 1],
                    ]),
                ]);
            }
        });
        it('should compute intermediate styles properly when an animation is cancelled', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: `
          <div [@myAnimation]="exp" style="background-color: blue;">...</div>
        `,
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [
                                (0, animations_1.transition)('* => a', [
                                    (0, animations_1.style)({ width: 0, height: 0 }),
                                    (0, animations_1.animate)('1s', (0, animations_1.style)({ width: '300px', height: '600px' })),
                                ]),
                                (0, animations_1.transition)('* => b', [(0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 0 }))]),
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            cmp.exp = 'a';
            fixture.detectChanges();
            const player1 = engine.players[0];
            const webPlayer1 = player1.getRealPlayer();
            webPlayer1.setPosition(0.5);
            cmp.exp = 'b';
            fixture.detectChanges();
            const player2 = engine.players[0];
            const webPlayer2 = player2.getRealPlayer();
            expect(approximate(parseFloat(webPlayer2.keyframes[0].get('width')), 150)).toBeLessThan(0.05);
            expect(approximate(parseFloat(webPlayer2.keyframes[0].get('height')), 300)).toBeLessThan(0.05);
        });
        it('should compute intermediate styles properly for multiple queried elements when an animation is cancelled', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: `
          <div [@myAnimation]="exp">
            <div *ngFor="let item of items" class="target"></div>
          </div>
        `,
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [
                                (0, animations_1.transition)('* => full', [
                                    (0, animations_1.query)('.target', [
                                        (0, animations_1.style)({ width: 0, height: 0 }),
                                        (0, animations_1.animate)('1s', (0, animations_1.style)({ width: '500px', height: '1000px' })),
                                    ]),
                                ]),
                                (0, animations_1.transition)('* => empty', [(0, animations_1.query)('.target', [(0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 0 }))])]),
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            cmp.exp = 'full';
            cmp.items = [0, 1, 2, 3, 4];
            fixture.detectChanges();
            let player = engine.players[0];
            let groupPlayer = player.getRealPlayer();
            let players = groupPlayer.players;
            expect(players.length).toEqual(5);
            for (let i = 0; i < players.length; i++) {
                const p = players[i];
                p.setPosition(0.5);
            }
            cmp.exp = 'empty';
            cmp.items = [];
            fixture.detectChanges();
            player = engine.players[0];
            groupPlayer = player.getRealPlayer();
            players = groupPlayer.players;
            expect(players.length).toEqual(5);
            for (let i = 0; i < players.length; i++) {
                const p = players[i];
                expect(approximate(parseFloat(p.keyframes[0].get('width')), 250)).toBeLessThan(0.05);
                expect(approximate(parseFloat(p.keyframes[0].get('height')), 500)).toBeLessThan(0.05);
            }
        });
        it('should apply the `display` and `position` styles as regular inline styles for the duration of the animation', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: `
          <div #elm [@myAnimation]="myAnimationExp" style="display:table; position:fixed"></div>
        `,
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [
                                (0, animations_1.state)('go', (0, animations_1.style)({ display: 'inline-block' })),
                                (0, animations_1.transition)('* => go', [
                                    (0, animations_1.style)({ display: 'inline', position: 'absolute', opacity: 0 }),
                                    (0, animations_1.animate)('1s', (0, animations_1.style)({ display: 'inline', opacity: 1, position: 'static' })),
                                    (0, animations_1.animate)('1s', (0, animations_1.style)({ display: 'flexbox', opacity: 0 })),
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
                        this.myAnimationExp = (__runInitializers(this, _element_extraInitializers), '');
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            const elm = cmp.element.nativeElement;
            expect(elm.style.getPropertyValue('display')).toEqual('table');
            expect(elm.style.getPropertyValue('position')).toEqual('fixed');
            cmp.myAnimationExp = 'go';
            fixture.detectChanges();
            expect(elm.style.getPropertyValue('display')).toEqual('inline');
            expect(elm.style.getPropertyValue('position')).toEqual('absolute');
            const player = engine.players.pop();
            player.finish();
            player.destroy();
            expect(elm.style.getPropertyValue('display')).toEqual('inline-block');
            expect(elm.style.getPropertyValue('position')).toEqual('fixed');
        });
        it('should set normalized style property values on animation end', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: `
          <div #elm [@myAnimation]="myAnimationExp" style="width: 100%; font-size: 2rem"></div>
        `,
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [
                                (0, animations_1.state)('go', (0, animations_1.style)({ width: 300, 'font-size': 14 })),
                                (0, animations_1.transition)('* => go', [(0, animations_1.animate)('1s')]),
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
                        this.myAnimationExp = (__runInitializers(this, _element_extraInitializers), '');
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const engine = testing_1.TestBed.inject(browser_1.ɵAnimationEngine);
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            const elm = cmp.element.nativeElement;
            expect(elm.style.getPropertyValue('width')).toEqual('100%');
            expect(elm.style.getPropertyValue('font-size')).toEqual('2rem');
            cmp.myAnimationExp = 'go';
            fixture.detectChanges();
            const player = engine.players.pop();
            player.finish();
            player.destroy();
            expect(elm.style.getPropertyValue('width')).toEqual('300px');
            expect(elm.style.getPropertyValue('font-size')).toEqual('14px');
        });
        it('should apply correct state transitions for both CamelCase and kebab-case CSS properties', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ani-cmp',
                        template: `
          <div id="camelCaseDiv" [@camelCaseTrigger]="status"></div>
          <div id="kebab-case-div" [@kebab-case-trigger]="status"></div>
        `,
                        animations: [
                            (0, animations_1.trigger)('camelCaseTrigger', [
                                (0, animations_1.state)('active', (0, animations_1.style)({
                                    'backgroundColor': 'green',
                                })),
                                (0, animations_1.transition)('inactive => active', [
                                    (0, animations_1.style)({
                                        'backgroundColor': 'red',
                                    }),
                                    (0, animations_1.animate)(500),
                                ]),
                            ]),
                            (0, animations_1.trigger)('kebab-case-trigger', [
                                (0, animations_1.state)('active', (0, animations_1.style)({
                                    'background-color': 'green',
                                })),
                                (0, animations_1.transition)('inactive => active', [
                                    (0, animations_1.style)({
                                        'background-color': 'red',
                                    }),
                                    (0, animations_1.animate)(500),
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
                        this.status = 'inactive';
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
            fixture.detectChanges();
            cmp.status = 'active';
            fixture.detectChanges();
            engine.flush();
            expect(engine.players.length).toEqual(2);
            const [camelCaseWebPlayer, kebabCaseWebPlayer] = engine.players.map((player) => player.getRealPlayer());
            [camelCaseWebPlayer, kebabCaseWebPlayer].forEach((webPlayer) => {
                expect(webPlayer.keyframes).toEqual([
                    new Map([
                        ['backgroundColor', 'red'],
                        ['offset', 0],
                    ]),
                    new Map([
                        ['backgroundColor', 'green'],
                        ['offset', 1],
                    ]),
                ]);
            });
        });
    });
})();
function approximate(value, target) {
    return Math.abs(target - value) / value;
}
