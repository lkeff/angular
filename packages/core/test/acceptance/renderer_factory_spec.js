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
exports.MockRendererFactory = void 0;
const browser_1 = require("@angular/animations/browser");
const testing_1 = require("@angular/animations/browser/testing");
const common_1 = require("@angular/common");
const platform_id_1 = require("@angular/common/src/platform_id");
const core_1 = require("../../src/core");
const ng_zone_1 = require("../../src/zone/ng_zone");
const testing_2 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const dom_renderer_1 = require("@angular/platform-browser/src/dom/dom_renderer");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('renderer factory lifecycle', () => {
    let logs = [];
    let lastCapturedType = null;
    let SomeComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'some-component',
                template: `foo`,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SomeComponent = _classThis = class {
            ngOnInit() {
                logs.push('some_component create');
            }
            ngDoCheck() {
                logs.push('some_component update');
            }
        };
        __setFunctionName(_classThis, "SomeComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SomeComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SomeComponent = _classThis;
    })();
    let SomeComponentWhichThrows = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'some-component-with-error',
                template: `With error`,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SomeComponentWhichThrows = _classThis = class {
            ngOnInit() {
                throw new Error('SomeComponentWhichThrows threw');
            }
        };
        __setFunctionName(_classThis, "SomeComponentWhichThrows");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SomeComponentWhichThrows = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SomeComponentWhichThrows = _classThis;
    })();
    let TestComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'lol',
                template: `<some-component></some-component>`,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var TestComponent = _classThis = class {
            ngOnInit() {
                logs.push('test_component create');
            }
            ngDoCheck() {
                logs.push('test_component update');
            }
        };
        __setFunctionName(_classThis, "TestComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TestComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return TestComponent = _classThis;
    })();
    /** Creates a patched renderer factory that pushes entries to the test log */
    function createPatchedRendererFactory(document) {
        let rendererFactory = getRendererFactory2(document);
        const createRender = rendererFactory.createRenderer;
        rendererFactory.createRenderer = (hostElement, type) => {
            logs.push('create');
            lastCapturedType = type;
            return createRender.apply(rendererFactory, [hostElement, type]);
        };
        rendererFactory.begin = () => logs.push('begin');
        rendererFactory.end = () => logs.push('end');
        return rendererFactory;
    }
    beforeEach(() => {
        logs = [];
        testing_2.TestBed.configureTestingModule({
            declarations: [SomeComponent, SomeComponentWhichThrows, TestComponent],
            providers: [
                {
                    provide: core_1.RendererFactory2,
                    useFactory: (document) => createPatchedRendererFactory(document),
                    deps: [common_1.DOCUMENT],
                },
            ],
        });
    });
    it('should work with a component', () => {
        const fixture = testing_2.TestBed.createComponent(SomeComponent);
        fixture.componentRef.changeDetectorRef.detectChanges();
        (0, matchers_1.expect)(logs).toEqual([
            'create',
            'create',
            'begin',
            'end',
            'begin',
            'some_component create',
            'some_component update',
            'end',
        ]);
        logs = [];
        fixture.componentRef.changeDetectorRef.detectChanges();
        (0, matchers_1.expect)(logs).toEqual(['begin', 'some_component update', 'end']);
    });
    it('should work with a component which throws', () => {
        (0, matchers_1.expect)(() => {
            const fixture = testing_2.TestBed.createComponent(SomeComponentWhichThrows);
            fixture.componentRef.changeDetectorRef.detectChanges();
        }).toThrow();
        (0, matchers_1.expect)(logs).toEqual(['create', 'create', 'begin', 'end', 'begin', 'end']);
    });
    it('should pass in the component styles directly into the underlying renderer', () => {
        let StyledComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    styles: ['.some-css-class { color: red; }'],
                    template: '...',
                    encapsulation: core_1.ViewEncapsulation.ShadowDom,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StyledComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StyledComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StyledComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StyledComp = _classThis;
        })();
        testing_2.TestBed.createComponent(StyledComp);
        (0, matchers_1.expect)(lastCapturedType.styles).toEqual(['.some-css-class { color: red; }']);
        (0, matchers_1.expect)(lastCapturedType.encapsulation).toEqual(core_1.ViewEncapsulation.ShadowDom);
    });
    describe('component animations', () => {
        it('should pass in the component styles directly into the underlying renderer', () => {
            const animA = { name: 'a' };
            const animB = { name: 'b' };
            let AnimComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        animations: [animA, animB],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnimComp = _classThis = class {
                };
                __setFunctionName(_classThis, "AnimComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimComp = _classThis;
            })();
            testing_2.TestBed.createComponent(AnimComp);
            const capturedAnimations = lastCapturedType.data['animation'];
            (0, matchers_1.expect)(Array.isArray(capturedAnimations)).toBeTruthy();
            (0, matchers_1.expect)(capturedAnimations.length).toEqual(2);
            (0, matchers_1.expect)(capturedAnimations).toContain(animA);
            (0, matchers_1.expect)(capturedAnimations).toContain(animB);
        });
        it('should include animations in the renderType data array even if the array is empty', () => {
            let AnimComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '...',
                        animations: [],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnimComp = _classThis = class {
                };
                __setFunctionName(_classThis, "AnimComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimComp = _classThis;
            })();
            testing_2.TestBed.createComponent(AnimComp);
            const data = lastCapturedType.data;
            (0, matchers_1.expect)(data['animation']).toEqual([]);
        });
        it('should allow [@trigger] bindings to be picked up by the underlying renderer', () => {
            let AnimComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div @fooAnimation></div>',
                        animations: [],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnimComp = _classThis = class {
                };
                __setFunctionName(_classThis, "AnimComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimComp = _classThis;
            })();
            const rendererFactory = new MockRendererFactory(['setProperty']);
            testing_2.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.RendererFactory2,
                        useValue: rendererFactory,
                        deps: [common_1.DOCUMENT],
                    },
                ],
            });
            const fixture = testing_2.TestBed.createComponent(AnimComp);
            fixture.detectChanges();
            const renderer = rendererFactory.lastRenderer;
            const spy = renderer.spies['setProperty'];
            const [_, prop, __] = spy.calls.mostRecent().args;
            (0, matchers_1.expect)(prop).toEqual('@fooAnimation');
        });
    });
    it('should not invoke renderer destroy method for embedded views', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    imports: [common_1.CommonModule],
                    template: `
        <div>Root view</div>
        <div *ngIf="visible">Child view</div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.visible = true;
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        const rendererFactory = new MockRendererFactory(['destroy', 'createElement']);
        testing_2.TestBed.configureTestingModule({
            providers: [
                {
                    provide: core_1.RendererFactory2,
                    useValue: rendererFactory,
                    deps: [common_1.DOCUMENT],
                },
            ],
        });
        const fixture = testing_2.TestBed.createComponent(Comp);
        fixture.detectChanges();
        const comp = fixture.componentInstance;
        comp.visible = false;
        fixture.detectChanges();
        comp.visible = true;
        fixture.detectChanges();
        const renderer = rendererFactory.lastRenderer;
        const destroySpy = renderer.spies['destroy'];
        const createElementSpy = renderer.spies['createElement'];
        // we should never see `destroy` method being called
        // in case child views are created/removed.
        (0, matchers_1.expect)(destroySpy.calls.count()).toBe(0);
        // Make sure other methods on the renderer were invoked.
        (0, matchers_1.expect)(createElementSpy.calls.count() > 0).toBe(true);
    });
});
describe('animation renderer factory', () => {
    let eventLogs = [];
    let rendererFactory = null;
    function getAnimationLog() {
        return testing_1.MockAnimationDriver.log;
    }
    beforeEach(() => {
        eventLogs = [];
        rendererFactory = null;
        testing_1.MockAnimationDriver.log = [];
        testing_2.TestBed.configureTestingModule({
            declarations: [SomeComponentWithAnimation, SomeComponent],
            providers: [
                {
                    provide: core_1.RendererFactory2,
                    useFactory: (d) => (rendererFactory = getAnimationRendererFactory2(d)),
                    deps: [common_1.DOCUMENT],
                },
            ],
        });
    });
    let SomeComponentWithAnimation = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'some-component',
                template: `
      <div [@myAnimation]="exp"
           (@myAnimation.start)="callback($event)"
           (@myAnimation.done)="callback($event)">
        foo
      </div>
    `,
                animations: [
                    {
                        type: 7,
                        name: 'myAnimation',
                        definitions: [
                            {
                                type: 1,
                                expr: '* => on',
                                animation: [
                                    { type: 4, styles: { type: 6, styles: { opacity: 1 }, offset: null }, timings: 10 },
                                ],
                                options: null,
                            },
                        ],
                        options: {},
                    },
                ],
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SomeComponentWithAnimation = _classThis = class {
            callback(event) {
                eventLogs.push(`${event.fromState ? event.fromState : event.toState} - ${event.phaseName}`);
            }
        };
        __setFunctionName(_classThis, "SomeComponentWithAnimation");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SomeComponentWithAnimation = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SomeComponentWithAnimation = _classThis;
    })();
    let SomeComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'some-component',
                template: 'foo',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SomeComponent = _classThis = class {
        };
        __setFunctionName(_classThis, "SomeComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SomeComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SomeComponent = _classThis;
    })();
    it('should work with components without animations', () => {
        const fixture = testing_2.TestBed.createComponent(SomeComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('foo');
    });
    isBrowser &&
        it('should work with animated components', (done) => {
            const fixture = testing_2.TestBed.createComponent(SomeComponentWithAnimation);
            fixture.detectChanges();
            (0, matchers_1.expect)(rendererFactory).toBeTruthy();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toMatch(/<div class="ng-tns-c\d+-0 ng-trigger ng-trigger-myAnimation">\s+foo\s+<\/div>/);
            fixture.componentInstance.exp = 'on';
            fixture.detectChanges();
            const [player] = getAnimationLog();
            (0, matchers_1.expect)(player.keyframes).toEqual([
                new Map([
                    ['opacity', '*'],
                    ['offset', 0],
                ]),
                new Map([
                    ['opacity', 1],
                    ['offset', 1],
                ]),
            ]);
            player.finish();
            rendererFactory.whenRenderingDone().then(() => {
                (0, matchers_1.expect)(eventLogs).toEqual(['void - start', 'void - done', 'on - start', 'on - done']);
                done();
            });
        });
});
function getRendererFactory2(document) {
    const fakeNgZone = new ng_zone_1.NoopNgZone();
    const eventManager = new platform_browser_1.EventManager([], fakeNgZone);
    const appId = 'app-id';
    const rendererFactory = new dom_renderer_1.DomRendererFactory2(eventManager, new platform_browser_1.ɵSharedStylesHost(document, appId), appId, true, document, isNode ? platform_id_1.PLATFORM_SERVER_ID : platform_id_1.PLATFORM_BROWSER_ID, fakeNgZone);
    const origCreateRenderer = rendererFactory.createRenderer;
    rendererFactory.createRenderer = function (element, type) {
        const renderer = origCreateRenderer.call(this, element, type);
        renderer.destroyNode = () => { };
        return renderer;
    };
    return rendererFactory;
}
function getAnimationRendererFactory2(document) {
    const fakeNgZone = new ng_zone_1.NoopNgZone();
    return new browser_1.ɵAnimationRendererFactory(getRendererFactory2(document), new browser_1.ɵAnimationEngine(document, new testing_1.MockAnimationDriver(), new browser_1.ɵNoopAnimationStyleNormalizer()), fakeNgZone);
}
describe('custom renderer', () => {
    let SomeComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'some-component',
                template: `<div><span></span></div>`,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SomeComponent = _classThis = class {
        };
        __setFunctionName(_classThis, "SomeComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SomeComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SomeComponent = _classThis;
    })();
    /**
     * Creates a patched renderer factory that creates elements with a shape different than DOM node
     */
    function createPatchedRendererFactory(document) {
        let rendererFactory = getRendererFactory2(document);
        const origCreateRenderer = rendererFactory.createRenderer;
        rendererFactory.createRenderer = function (element, type) {
            const renderer = origCreateRenderer.call(this, element, type);
            renderer.appendChild = () => { };
            renderer.createElement = (name) => ({
                name,
                el: document.createElement(name),
            });
            return renderer;
        };
        return rendererFactory;
    }
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            declarations: [SomeComponent],
            providers: [
                {
                    provide: core_1.RendererFactory2,
                    useFactory: (document) => createPatchedRendererFactory(document),
                    deps: [common_1.DOCUMENT],
                },
            ],
        });
    });
    it('should not trigger errors', () => {
        (0, matchers_1.expect)(() => {
            const fixture = testing_2.TestBed.createComponent(SomeComponent);
            fixture.detectChanges();
        }).not.toThrow();
    });
});
describe('Renderer2 destruction hooks', () => {
    let SimpleApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'some-component',
                template: `
      <span *ngIf="isContentVisible">A</span>
      <span *ngIf="isContentVisible">B</span>
      <span *ngIf="isContentVisible">C</span>
    `,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SimpleApp = _classThis = class {
            constructor() {
                this.isContentVisible = true;
            }
        };
        __setFunctionName(_classThis, "SimpleApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SimpleApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SimpleApp = _classThis;
    })();
    let BasicComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'basic-comp',
                template: 'comp(<ng-content></ng-content>)',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var BasicComponent = _classThis = class {
        };
        __setFunctionName(_classThis, "BasicComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BasicComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return BasicComponent = _classThis;
    })();
    let AppWithComponents = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'some-component',
                template: `
      <basic-comp *ngIf="isContentVisible">A</basic-comp>
      <basic-comp *ngIf="isContentVisible">B</basic-comp>
      <basic-comp *ngIf="isContentVisible">C</basic-comp>
    `,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var AppWithComponents = _classThis = class {
            constructor() {
                this.isContentVisible = true;
            }
        };
        __setFunctionName(_classThis, "AppWithComponents");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AppWithComponents = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return AppWithComponents = _classThis;
    })();
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            declarations: [SimpleApp, AppWithComponents, BasicComponent],
            providers: [
                {
                    provide: core_1.RendererFactory2,
                    useFactory: (document) => getRendererFactory2(document),
                    deps: [common_1.DOCUMENT],
                },
            ],
        });
    });
    it('should call renderer.destroyNode for each node destroyed', () => {
        const fixture = testing_2.TestBed.createComponent(SimpleApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('ABC');
        fixture.componentInstance.isContentVisible = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
    });
    it('should call renderer.destroy for each component destroyed', () => {
        const fixture = testing_2.TestBed.createComponent(AppWithComponents);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('comp(A)comp(B)comp(C)');
        fixture.componentInstance.isContentVisible = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
    });
});
class MockRendererFactory {
    constructor(spyOnMethods) {
        this._spyOnMethods = spyOnMethods || [];
    }
    createRenderer(hostElement, rendererType) {
        const renderer = (this.lastRenderer = new MockRenderer(this._spyOnMethods));
        return renderer;
    }
}
exports.MockRendererFactory = MockRendererFactory;
class MockRenderer {
    constructor(spyOnMethods) {
        this.spies = {};
        this.data = {};
        this.destroyNode = null;
        spyOnMethods.forEach((methodName) => {
            this.spies[methodName] = spyOn(this, methodName).and.callThrough();
        });
    }
    destroy() { }
    createComment(value) {
        return document.createComment(value);
    }
    createElement(name, namespace) {
        return namespace ? document.createElementNS(namespace, name) : document.createElement(name);
    }
    createText(value) {
        return document.createTextNode(value);
    }
    appendChild(parent, newChild) {
        parent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        parent.insertBefore(newChild, refChild);
    }
    removeChild(parent, oldChild) {
        oldChild.remove();
    }
    selectRootElement(selectorOrNode) {
        return typeof selectorOrNode === 'string'
            ? document.querySelector(selectorOrNode)
            : selectorOrNode;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        // set all synthetic attributes as properties
        if (name[0] === '@') {
            this.setProperty(el, name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) { }
    addClass(el, name) { }
    removeClass(el, name) { }
    setStyle(el, style, value, flags) { }
    removeStyle(el, style, flags) { }
    setProperty(el, name, value) {
        el[name] = value;
    }
    setValue(node, value) {
        node.textContent = value;
    }
    // TODO: Deprecate in favor of addEventListener/removeEventListener
    listen(target, eventName, callback) {
        return () => { };
    }
}
