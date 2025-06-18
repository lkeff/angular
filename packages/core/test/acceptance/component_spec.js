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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const global_1 = require("../../src/util/global");
describe('component', () => {
    describe('view destruction', () => {
        it('should invoke onDestroy only once when a component is registered as a provider', () => {
            const testToken = new core_1.InjectionToken('testToken');
            let destroyCalls = 0;
            let ParentWithOnDestroy = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp-with-on-destroy',
                        template: '',
                        providers: [{ provide: testToken, useExisting: ParentWithOnDestroy }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentWithOnDestroy = _classThis = class {
                    ngOnDestroy() {
                        destroyCalls++;
                    }
                };
                __setFunctionName(_classThis, "ParentWithOnDestroy");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentWithOnDestroy = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentWithOnDestroy = _classThis;
            })();
            let ChildComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildComponent = _classThis = class {
                    // We need to inject the parent so the provider is instantiated.
                    constructor(_parent) { }
                };
                __setFunctionName(_classThis, "ChildComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildComponent = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <comp-with-on-destroy>
            <child></child>
          </comp-with-on-destroy>
        `,
                        standalone: false,
                    })];
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, ParentWithOnDestroy, ChildComponent] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(destroyCalls).toBe(1, 'Expected `ngOnDestroy` to only be called once.');
        });
    });
    it('should be able to dynamically insert a component into a view container at the root of a component', () => {
        let HelloComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'hello',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HelloComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "HelloComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HelloComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HelloComponent = _classThis;
        })();
        let Wrapper = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'wrapper',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Wrapper = _classThis = class {
            };
            __setFunctionName(_classThis, "Wrapper");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Wrapper = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Wrapper = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <wrapper>
              <div #insertionPoint></div>
            </wrapper>
          `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _viewContainerRef_decorators;
            let _viewContainerRef_initializers = [];
            let _viewContainerRef_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.viewContainerRef = __runInitializers(this, _viewContainerRef_initializers, void 0);
                    __runInitializers(this, _viewContainerRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _viewContainerRef_decorators = [(0, core_1.ViewChild)('insertionPoint', { read: core_1.ViewContainerRef })];
                __esDecorate(null, null, _viewContainerRef_decorators, { kind: "field", name: "viewContainerRef", static: false, private: false, access: { has: obj => "viewContainerRef" in obj, get: obj => obj.viewContainerRef, set: (obj, value) => { obj.viewContainerRef = value; } }, metadata: _metadata }, _viewContainerRef_initializers, _viewContainerRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, Wrapper, HelloComponent] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const instance = fixture.componentInstance;
        instance.viewContainerRef.createComponent(HelloComponent);
        (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('hello');
    });
    it('should not throw when calling `detectChanges` on the ChangeDetectorRef of a destroyed view', () => {
        let HelloComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'hello',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HelloComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "HelloComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HelloComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HelloComponent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div #insertionPoint></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _viewContainerRef_decorators;
            let _viewContainerRef_initializers = [];
            let _viewContainerRef_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.viewContainerRef = __runInitializers(this, _viewContainerRef_initializers, void 0);
                    __runInitializers(this, _viewContainerRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _viewContainerRef_decorators = [(0, core_1.ViewChild)('insertionPoint', { read: core_1.ViewContainerRef })];
                __esDecorate(null, null, _viewContainerRef_decorators, { kind: "field", name: "viewContainerRef", static: false, private: false, access: { has: obj => "viewContainerRef" in obj, get: obj => obj.viewContainerRef, set: (obj, value) => { obj.viewContainerRef = value; } }, metadata: _metadata }, _viewContainerRef_initializers, _viewContainerRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, HelloComponent] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const componentRef = fixture.componentInstance.viewContainerRef.createComponent(HelloComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(() => {
            componentRef.destroy();
            componentRef.changeDetectorRef.detectChanges();
        }).not.toThrow();
    });
    // TODO: add tests with Native once tests run in real browser (domino doesn't support shadow root)
    describe('encapsulation', () => {
        let WrapperComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'wrapper',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: `<encapsulated></encapsulated>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WrapperComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "WrapperComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WrapperComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WrapperComponent = _classThis;
        })();
        let EncapsulatedComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'encapsulated',
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                    // styles must be non-empty to trigger `ViewEncapsulation.Emulated`
                    styles: `:host {display: block}`,
                    template: `foo<leaf></leaf>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var EncapsulatedComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "EncapsulatedComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                EncapsulatedComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return EncapsulatedComponent = _classThis;
        })();
        let LeafComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'leaf',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: `<span>bar</span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LeafComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "LeafComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LeafComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LeafComponent = _classThis;
        })();
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                declarations: [WrapperComponent, EncapsulatedComponent, LeafComponent],
            });
        });
        it('should encapsulate children, but not host nor grand children', () => {
            const fixture = testing_1.TestBed.createComponent(WrapperComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toMatch(/<encapsulated _nghost-[a-z\-]+(\d+)="">foo<leaf _ngcontent-[a-z\-]+\1=""><span>bar<\/span><\/leaf><\/encapsulated>/);
        });
        it('should encapsulate host', () => {
            const fixture = testing_1.TestBed.createComponent(EncapsulatedComponent);
            fixture.detectChanges();
            const html = fixture.nativeElement.outerHTML;
            const match = html.match(/_nghost-([a-z\-]+\d+)/);
            (0, matchers_1.expect)(match).toBeDefined();
            (0, matchers_1.expect)(html).toMatch(new RegExp(`<leaf _ngcontent-${match[1]}=""><span>bar</span></leaf>`));
        });
        it('should encapsulate host and children with different attributes', () => {
            // styles must be non-empty to trigger `ViewEncapsulation.Emulated`
            testing_1.TestBed.overrideComponent(LeafComponent, {
                set: { encapsulation: core_1.ViewEncapsulation.Emulated, styles: [`span {color:red}`] },
            });
            const fixture = testing_1.TestBed.createComponent(EncapsulatedComponent);
            fixture.detectChanges();
            const html = fixture.nativeElement.outerHTML;
            const match = html.match(/_nghost-([a-z\-]+\d+)/g);
            (0, matchers_1.expect)(match).toBeDefined();
            (0, matchers_1.expect)(match.length).toEqual(2);
            (0, matchers_1.expect)(html).toMatch(`<leaf ${match[0].replace('_nghost', '_ngcontent')}="" ${match[1]}=""><span ${match[1].replace('_nghost', '_ngcontent')}="">bar</span></leaf></div>`);
        });
        it('should be off for a component with no styles', () => {
            testing_1.TestBed.overrideComponent(EncapsulatedComponent, {
                set: { styles: undefined },
            });
            const fixture = testing_1.TestBed.createComponent(EncapsulatedComponent);
            fixture.detectChanges();
            const html = fixture.nativeElement.outerHTML;
            (0, matchers_1.expect)(html).not.toContain('<encapsulated _nghost-');
            (0, matchers_1.expect)(html).not.toContain('<leaf _ngcontent-');
        });
        it('should be off for a component with empty styles', () => {
            testing_1.TestBed.overrideComponent(EncapsulatedComponent, {
                set: { styles: [`  `, '', '/*comment*/'] },
            });
            const fixture = testing_1.TestBed.createComponent(EncapsulatedComponent);
            fixture.detectChanges();
            const html = fixture.nativeElement.outerHTML;
            (0, matchers_1.expect)(html).not.toContain('<encapsulated _nghost-');
            (0, matchers_1.expect)(html).not.toContain('<leaf _ngcontent-');
        });
    });
    describe('view destruction', () => {
        it('should invoke onDestroy when directly destroying a root view', () => {
            let wasOnDestroyCalled = false;
            let ComponentWithOnDestroy = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp-with-destroy',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentWithOnDestroy = _classThis = class {
                    ngOnDestroy() {
                        wasOnDestroyCalled = true;
                    }
                };
                __setFunctionName(_classThis, "ComponentWithOnDestroy");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentWithOnDestroy = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentWithOnDestroy = _classThis;
            })();
            // This test asserts that the view tree is set up correctly based on the knowledge that this
            // tree is used during view destruction. If the child view is not correctly attached as a
            // child of the root view, then the onDestroy hook on the child view will never be called
            // when the view tree is torn down following the destruction of that root view.
            let TestApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: `test-app`,
                        template: `<comp-with-destroy></comp-with-destroy>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestApp = _classThis = class {
                };
                __setFunctionName(_classThis, "TestApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [ComponentWithOnDestroy, TestApp] });
            const fixture = testing_1.TestBed.createComponent(TestApp);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(wasOnDestroyCalled).toBe(true, 'Expected component onDestroy method to be called when its parent view is destroyed');
        });
    });
    it("should clear the contents of dynamically created component when it's attached to ApplicationRef", () => {
        let wasOnDestroyCalled = false;
        let DynamicComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[comp]',
                    template: 'comp content',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicComponent = _classThis = class {
                ngOnDestroy() {
                    wasOnDestroyCalled = true;
                }
            };
            __setFunctionName(_classThis, "DynamicComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicComponent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'button',
                    template: `
           <div class="wrapper"></div>
           <div id="app-root"></div>
           <div class="wrapper"></div>
         `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor(injector, appRef, elementRef) {
                    this.injector = injector;
                    this.appRef = appRef;
                    this.elementRef = elementRef;
                }
                create() {
                    // Component to be bootstrapped into an element with the `app-root` id.
                    this.componentRef = (0, core_1.createComponent)(DynamicComponent, {
                        environmentInjector: this.injector,
                        hostElement: this.elementRef.nativeElement.querySelector('#app-root'),
                    });
                    this.appRef.attachView(this.componentRef.hostView);
                }
                destroy() {
                    this.componentRef.destroy();
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, DynamicComponent] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        let appRootEl = fixture.nativeElement.querySelector('#app-root');
        (0, matchers_1.expect)(appRootEl).toBeDefined();
        (0, matchers_1.expect)(appRootEl.innerHTML).toBe(''); // app container content is empty
        fixture.componentInstance.create();
        appRootEl = fixture.nativeElement.querySelector('#app-root');
        (0, matchers_1.expect)(appRootEl).toBeDefined();
        (0, matchers_1.expect)(appRootEl.innerHTML).toBe('comp content');
        fixture.componentInstance.destroy();
        fixture.detectChanges();
        appRootEl = fixture.nativeElement.querySelector('#app-root');
        (0, matchers_1.expect)(appRootEl).toBeFalsy(); // host element is removed
        const wrapperEls = fixture.nativeElement.querySelectorAll('.wrapper');
        (0, matchers_1.expect)(wrapperEls.length).toBe(2); // other elements are preserved
    });
    describe('with ngDevMode', () => {
        const _global = global_1.global;
        let saveNgDevMode;
        beforeEach(() => (saveNgDevMode = ngDevMode));
        afterEach(() => (_global.ngDevMode = saveNgDevMode));
        // In dev mode we have some additional logic to freeze `TView.cleanup` array
        // (see `storeCleanupWithContext` function).
        // The tests below verify that this action doesn't trigger any change in behaviour
        // for prod mode. See https://github.com/angular/angular/issues/40105.
        ['ngDevMode off', 'ngDevMode on'].forEach((mode) => {
            it('should invoke `onDestroy` callbacks of dynamically created component with ' + mode, () => {
                if (mode === 'ngDevMode off') {
                    _global.ngDevMode = false;
                }
                let wasOnDestroyCalled = false;
                let DynamicComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: '[comp]',
                            template: 'comp content',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DynamicComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DynamicComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComponent = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'button',
                            template: '<div id="app-root" #anchor></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _anchor_decorators;
                    let _anchor_initializers = [];
                    let _anchor_extraInitializers = [];
                    var App = _classThis = class {
                        constructor(vcr, injector) {
                            this.vcr = vcr;
                            this.injector = injector;
                            this.anchor = __runInitializers(this, _anchor_initializers, void 0);
                            __runInitializers(this, _anchor_extraInitializers);
                            this.vcr = vcr;
                            this.injector = injector;
                        }
                        create() {
                            const componentRef = this.vcr.createComponent(DynamicComponent, {
                                injector: this.injector,
                            });
                            componentRef.onDestroy(() => {
                                wasOnDestroyCalled = true;
                            });
                            this.anchor.insert(componentRef.hostView);
                        }
                        clear() {
                            this.anchor.clear();
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _anchor_decorators = [(0, core_1.ViewChild)('anchor', { read: core_1.ViewContainerRef })];
                        __esDecorate(null, null, _anchor_decorators, { kind: "field", name: "anchor", static: false, private: false, access: { has: obj => "anchor" in obj, get: obj => obj.anchor, set: (obj, value) => { obj.anchor = value; } }, metadata: _metadata }, _anchor_initializers, _anchor_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [App, DynamicComponent] });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                // Add ComponentRef to ViewContainerRef instance.
                fixture.componentInstance.create();
                // Clear ViewContainerRef to invoke `onDestroy` callbacks on ComponentRef.
                fixture.componentInstance.clear();
                (0, matchers_1.expect)(wasOnDestroyCalled).toBeTrue();
            });
        });
    });
    describe('invalid host element', () => {
        it('should throw when <ng-container> is used as a host element for a Component', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng-container',
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root',
                        template: '<ng-container></ng-container>',
                        standalone: false,
                    })];
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Comp] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(App)).toThrowError(/"ng-container" tags cannot be used as component hosts. Please use a different tag to activate the Comp component/);
        });
        it('should throw when <ng-template> is used as a host element for a Component', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng-template',
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root',
                        template: '<ng-template></ng-template>',
                        standalone: false,
                    })];
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Comp] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(App)).toThrowError(/"ng-template" tags cannot be used as component hosts. Please use a different tag to activate the Comp component/);
        });
        it('should throw when multiple components match the same element', () => {
            let CompA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CompA = _classThis = class {
                };
                __setFunctionName(_classThis, "CompA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CompA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CompA = _classThis;
            })();
            let CompB = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CompB = _classThis = class {
                };
                __setFunctionName(_classThis, "CompB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CompB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CompB = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp></comp>',
                        standalone: false,
                    })];
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, CompA, CompB] });
            (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(App)).toThrowError(/NG0300: Multiple components match node with tagname comp: CompA and CompB/);
        });
        it('should not throw if a standalone component imports itself', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<comp *ngIf="recurse"/>hello',
                        imports: [Comp, common_1.NgIf],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _recurse_decorators;
                let _recurse_initializers = [];
                let _recurse_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.recurse = __runInitializers(this, _recurse_initializers, false);
                        __runInitializers(this, _recurse_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _recurse_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _recurse_decorators, { kind: "field", name: "recurse", static: false, private: false, access: { has: obj => "recurse" in obj, get: obj => obj.recurse, set: (obj, value) => { obj.recurse = value; } }, metadata: _metadata }, _recurse_initializers, _recurse_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp [recurse]="true"/>',
                        imports: [Comp],
                    })];
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
            let textContent = '';
            (0, matchers_1.expect)(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                textContent = fixture.nativeElement.textContent.trim();
            }).not.toThrow();
            // Ensure that the component actually rendered.
            (0, matchers_1.expect)(textContent).toBe('hellohello');
        });
        it('should not throw if a standalone component imports itself using a forwardRef', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<comp *ngIf="recurse"/>hello',
                        imports: [(0, core_1.forwardRef)(() => Comp), common_1.NgIf],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _recurse_decorators;
                let _recurse_initializers = [];
                let _recurse_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.recurse = __runInitializers(this, _recurse_initializers, false);
                        __runInitializers(this, _recurse_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _recurse_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _recurse_decorators, { kind: "field", name: "recurse", static: false, private: false, access: { has: obj => "recurse" in obj, get: obj => obj.recurse, set: (obj, value) => { obj.recurse = value; } }, metadata: _metadata }, _recurse_initializers, _recurse_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp [recurse]="true"/>',
                        imports: [Comp],
                    })];
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
            let textContent = '';
            (0, matchers_1.expect)(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                textContent = fixture.nativeElement.textContent.trim();
            }).not.toThrow();
            // Ensure that the component actually rendered.
            (0, matchers_1.expect)(textContent).toBe('hellohello');
        });
    });
    it('should use a new ngcontent attribute for child elements created w/ Renderer2', () => {
        let AppRoot = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-root',
                    template: '<parent-comp></parent-comp>',
                    styles: [':host { color: red; }'], // `styles` must exist for encapsulation to apply.
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppRoot = _classThis = class {
            };
            __setFunctionName(_classThis, "AppRoot");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppRoot = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppRoot = _classThis;
        })();
        let ParentComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent-comp',
                    template: '',
                    styles: [':host { color: orange; }'], // `styles` must exist for encapsulation to apply.
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentComponent = _classThis = class {
                constructor(elementRef, renderer) {
                    const elementFromRenderer = renderer.createElement('p');
                    renderer.appendChild(elementRef.nativeElement, elementFromRenderer);
                }
            };
            __setFunctionName(_classThis, "ParentComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [AppRoot, ParentComponent] });
        const fixture = testing_1.TestBed.createComponent(AppRoot);
        fixture.detectChanges();
        const secondParentEl = fixture.nativeElement.querySelector('parent-comp');
        const elementFromRenderer = fixture.nativeElement.querySelector('p');
        const getNgContentAttr = (element) => {
            return Array.from(element.attributes)
                .map((a) => a.name)
                .find((a) => /ngcontent/.test(a));
        };
        const hostNgContentAttr = getNgContentAttr(secondParentEl);
        const viewNgContentAttr = getNgContentAttr(elementFromRenderer);
        (0, matchers_1.expect)(hostNgContentAttr).not.toBe(viewNgContentAttr, 'Expected child manually created via Renderer2 to have a different view encapsulation' +
            'attribute than its host element');
    });
    it('should create a new Renderer2 for each component', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: '',
                    styles: [':host { color: red; }'],
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor(renderer) {
                    this.renderer = renderer;
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<child></child>',
                    styles: [':host { color: orange; }'],
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _childInstance_decorators;
            let _childInstance_initializers = [];
            let _childInstance_extraInitializers = [];
            var Parent = _classThis = class {
                constructor(renderer) {
                    this.renderer = renderer;
                    this.childInstance = __runInitializers(this, _childInstance_initializers, void 0);
                    __runInitializers(this, _childInstance_extraInitializers);
                    this.renderer = renderer;
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _childInstance_decorators = [(0, core_1.ViewChild)(Child)];
                __esDecorate(null, null, _childInstance_decorators, { kind: "field", name: "childInstance", static: false, private: false, access: { has: obj => "childInstance" in obj, get: obj => obj.childInstance, set: (obj, value) => { obj.childInstance = value; } }, metadata: _metadata }, _childInstance_initializers, _childInstance_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
        const fixture = testing_1.TestBed.createComponent(Parent);
        const componentInstance = fixture.componentInstance;
        fixture.detectChanges();
        // Assert like this, rather than `.not.toBe` so we get a better failure message.
        (0, matchers_1.expect)(componentInstance.renderer !== componentInstance.childInstance.renderer).toBe(true, 'Expected renderers to be different.');
    });
    it('components should not share the same context when creating with a root element', () => {
        const log = [];
        let CompA = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-a',
                    template: '<div>{{ a }}</div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _a_decorators;
            let _a_initializers = [];
            let _a_extraInitializers = [];
            var CompA = _classThis = class {
                ngDoCheck() {
                    log.push('CompA:ngDoCheck');
                }
                constructor() {
                    this.a = __runInitializers(this, _a_initializers, '');
                    __runInitializers(this, _a_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CompA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _a_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _a_decorators, { kind: "field", name: "a", static: false, private: false, access: { has: obj => "a" in obj, get: obj => obj.a, set: (obj, value) => { obj.a = value; } }, metadata: _metadata }, _a_initializers, _a_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompA = _classThis;
        })();
        let CompB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-b',
                    template: '<div>{{ b }}</div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _b_decorators;
            let _b_initializers = [];
            let _b_extraInitializers = [];
            var CompB = _classThis = class {
                ngDoCheck() {
                    log.push('CompB:ngDoCheck');
                }
                constructor() {
                    this.b = __runInitializers(this, _b_initializers, '');
                    __runInitializers(this, _b_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CompB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _b_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompB = _classThis;
        })();
        let MyCompA = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<span></span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyCompA = _classThis = class {
                constructor(_injector) {
                    this._injector = _injector;
                }
                createComponent() {
                    return (0, core_1.createComponent)(CompA, {
                        environmentInjector: this._injector,
                        hostElement: document.createElement('div'),
                    });
                }
            };
            __setFunctionName(_classThis, "MyCompA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCompA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCompA = _classThis;
        })();
        let MyCompB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<span></span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyCompB = _classThis = class {
                constructor(envInjector) {
                    this.envInjector = envInjector;
                }
                createComponent() {
                    return (0, core_1.createComponent)(CompB, {
                        environmentInjector: this.envInjector,
                        hostElement: document.createElement('div'),
                    });
                }
            };
            __setFunctionName(_classThis, "MyCompB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCompB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCompB = _classThis;
        })();
        let MyModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ declarations: [CompA] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModuleA = _classThis;
        })();
        let MyModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ declarations: [CompB] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModuleB = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [MyCompA, MyCompB],
            imports: [MyModuleA, MyModuleB],
        });
        const fixtureA = testing_1.TestBed.createComponent(MyCompA);
        fixtureA.detectChanges();
        const compA = fixtureA.componentInstance.createComponent();
        compA.instance.a = 'a';
        compA.changeDetectorRef.detectChanges();
        (0, matchers_1.expect)(log).toEqual(['CompA:ngDoCheck']);
        log.length = 0; // reset the log
        const fixtureB = testing_1.TestBed.createComponent(MyCompB);
        fixtureB.detectChanges();
        const compB = fixtureB.componentInstance.createComponent();
        compB.instance.b = 'b';
        compB.changeDetectorRef.detectChanges();
        (0, matchers_1.expect)(log).toEqual(['CompB:ngDoCheck']);
    });
    it('should preserve simple component selector in a component factory', () => {
        var _a;
        let AttSelectorCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[foo]',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AttSelectorCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "AttSelectorCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AttSelectorCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AttSelectorCmp = _classThis;
        })();
        const selector = (_a = (0, core_1.reflectComponentType)(AttSelectorCmp)) === null || _a === void 0 ? void 0 : _a.selector;
        (0, matchers_1.expect)(selector).toBe('[foo]');
    });
    it('should preserve complex component selector in a component factory', () => {
        var _a;
        let ComplexSelectorCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[foo],div:not(.bar)',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComplexSelectorCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "ComplexSelectorCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComplexSelectorCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComplexSelectorCmp = _classThis;
        })();
        const selector = (_a = (0, core_1.reflectComponentType)(ComplexSelectorCmp)) === null || _a === void 0 ? void 0 : _a.selector;
        (0, matchers_1.expect)(selector).toBe('[foo],div:not(.bar)');
    });
    it('should clear host element if provided in ComponentFactory.create', () => {
        let DynamicComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'dynamic-comp',
                    template: 'DynamicComponent Content',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "DynamicComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicComponent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: `
        <div id="dynamic-comp-root-a">
          Existing content in slot A, which <b><i>includes</i> some HTML elements</b>.
        </div>
        <div id="dynamic-comp-root-b">
          <p>
            Existing content in slot B, which includes some HTML elements.
          </p>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor(injector) {
                    this.injector = injector;
                }
                createDynamicComponent(target) {
                    (0, core_1.createComponent)(DynamicComponent, {
                        hostElement: target,
                        environmentInjector: this.injector,
                    });
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
        function _document() {
            // Tell Ivy about the global document
            (0, core_1.ɵsetDocument)(document);
            return document;
        }
        testing_1.TestBed.configureTestingModule({
            declarations: [App, DynamicComponent],
            providers: [{ provide: common_1.DOCUMENT, useFactory: _document, deps: [] }],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        // Create an instance of DynamicComponent and provide host element *reference*
        let targetEl = document.getElementById('dynamic-comp-root-a');
        fixture.componentInstance.createDynamicComponent(targetEl);
        fixture.detectChanges();
        (0, matchers_1.expect)(targetEl.innerHTML).not.toContain('Existing content in slot A');
        (0, matchers_1.expect)(targetEl.innerHTML).toContain('DynamicComponent Content');
        // Create an instance of DynamicComponent and provide host element *selector*
        targetEl = document.getElementById('dynamic-comp-root-b');
        fixture.componentInstance.createDynamicComponent('#dynamic-comp-root-b');
        fixture.detectChanges();
        (0, matchers_1.expect)(targetEl.innerHTML).not.toContain('Existing content in slot B');
        (0, matchers_1.expect)(targetEl.innerHTML).toContain('DynamicComponent Content');
    });
    describe('reflectComponentType', () => {
        it('should create an ComponentMirror for a standalone component', () => {
            function transformFn() { }
            let StandaloneComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'standalone-component',
                        template: `
          <ng-content></ng-content>
          <ng-content select="content-selector-a"></ng-content>
          <ng-content select="content-selector-b"></ng-content>
          <ng-content></ng-content>
        `,
                        inputs: ['input-a', 'input-b:input-alias-b'],
                        outputs: ['output-a', 'output-b:output-alias-b'],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _inputC_decorators;
                let _inputC_initializers = [];
                let _inputC_extraInitializers = [];
                let _inputD_decorators;
                let _inputD_initializers = [];
                let _inputD_extraInitializers = [];
                var StandaloneComponent = _classThis = class {
                    constructor() {
                        this.inputC = __runInitializers(this, _inputC_initializers, void 0);
                        this.inputD = (__runInitializers(this, _inputC_extraInitializers), __runInitializers(this, _inputD_initializers, (0, core_1.input)(false)));
                        __runInitializers(this, _inputD_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "StandaloneComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _inputC_decorators = [(0, core_1.Input)({ alias: 'input-alias-c', transform: transformFn })];
                    _inputD_decorators = [(0, core_1.Input)({ isSignal: true })];
                    __esDecorate(null, null, _inputC_decorators, { kind: "field", name: "inputC", static: false, private: false, access: { has: obj => "inputC" in obj, get: obj => obj.inputC, set: (obj, value) => { obj.inputC = value; } }, metadata: _metadata }, _inputC_initializers, _inputC_extraInitializers);
                    __esDecorate(null, null, _inputD_decorators, { kind: "field", name: "inputD", static: false, private: false, access: { has: obj => "inputD" in obj, get: obj => obj.inputD, set: (obj, value) => { obj.inputD = value; } }, metadata: _metadata }, _inputD_initializers, _inputD_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StandaloneComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StandaloneComponent = _classThis;
            })();
            const mirror = (0, core_1.reflectComponentType)(StandaloneComponent);
            (0, matchers_1.expect)(mirror.selector).toBe('standalone-component');
            (0, matchers_1.expect)(mirror.type).toBe(StandaloneComponent);
            (0, matchers_1.expect)(mirror.isStandalone).toEqual(true);
            (0, matchers_1.expect)(mirror.inputs).toEqual([
                { propName: 'input-a', templateName: 'input-a', isSignal: false },
                { propName: 'input-b', templateName: 'input-alias-b', isSignal: false },
                {
                    propName: 'inputC',
                    templateName: 'input-alias-c',
                    transform: transformFn,
                    isSignal: false,
                },
                { propName: 'inputD', templateName: 'inputD', isSignal: true },
            ]);
            (0, matchers_1.expect)(mirror.outputs).toEqual([
                { propName: 'output-a', templateName: 'output-a' },
                { propName: 'output-b', templateName: 'output-alias-b' },
            ]);
            (0, matchers_1.expect)(mirror.ngContentSelectors).toEqual([
                '*',
                'content-selector-a',
                'content-selector-b',
                '*',
            ]);
        });
        it('should create an ComponentMirror for a non-standalone component', () => {
            function transformFn() { }
            let NonStandaloneComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'non-standalone-component',
                        template: `
          <ng-content></ng-content>
          <ng-content select="content-selector-a"></ng-content>
          <ng-content select="content-selector-b"></ng-content>
          <ng-content></ng-content>
        `,
                        inputs: ['input-a', 'input-b:input-alias-b'],
                        outputs: ['output-a', 'output-b:output-alias-b'],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _inputC_decorators;
                let _inputC_initializers = [];
                let _inputC_extraInitializers = [];
                var NonStandaloneComponent = _classThis = class {
                    constructor() {
                        this.inputC = __runInitializers(this, _inputC_initializers, void 0);
                        __runInitializers(this, _inputC_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NonStandaloneComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _inputC_decorators = [(0, core_1.Input)({ alias: 'input-alias-c', transform: transformFn })];
                    __esDecorate(null, null, _inputC_decorators, { kind: "field", name: "inputC", static: false, private: false, access: { has: obj => "inputC" in obj, get: obj => obj.inputC, set: (obj, value) => { obj.inputC = value; } }, metadata: _metadata }, _inputC_initializers, _inputC_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NonStandaloneComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NonStandaloneComponent = _classThis;
            })();
            const mirror = (0, core_1.reflectComponentType)(NonStandaloneComponent);
            (0, matchers_1.expect)(mirror.selector).toBe('non-standalone-component');
            (0, matchers_1.expect)(mirror.type).toBe(NonStandaloneComponent);
            (0, matchers_1.expect)(mirror.isStandalone).toEqual(false);
            (0, matchers_1.expect)(mirror.inputs).toEqual([
                { propName: 'input-a', templateName: 'input-a', isSignal: false },
                { propName: 'input-b', templateName: 'input-alias-b', isSignal: false },
                {
                    propName: 'inputC',
                    templateName: 'input-alias-c',
                    transform: transformFn,
                    isSignal: false,
                },
            ]);
            (0, matchers_1.expect)(mirror.outputs).toEqual([
                { propName: 'output-a', templateName: 'output-a' },
                { propName: 'output-b', templateName: 'output-alias-b' },
            ]);
            (0, matchers_1.expect)(mirror.ngContentSelectors).toEqual([
                '*',
                'content-selector-a',
                'content-selector-b',
                '*',
            ]);
        });
        describe('error checking', () => {
            it('should throw when provided class is not a component', () => {
                class NotAnnotated {
                }
                let ADirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ADirective = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ADirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ADirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ADirective = _classThis;
                })();
                let AnInjectiable = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var AnInjectiable = _classThis = class {
                    };
                    __setFunctionName(_classThis, "AnInjectiable");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        AnInjectiable = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return AnInjectiable = _classThis;
                })();
                (0, matchers_1.expect)((0, core_1.reflectComponentType)(NotAnnotated)).toBe(null);
                (0, matchers_1.expect)((0, core_1.reflectComponentType)(ADirective)).toBe(null);
                (0, matchers_1.expect)((0, core_1.reflectComponentType)(AnInjectiable)).toBe(null);
            });
        });
    });
    it('should attach debug info to component using ɵsetClassDebugInfo runtime', () => {
        class Comp {
        }
        Comp.ɵcmp = (0, core_1.ɵɵdefineComponent)({ type: Comp, decls: 0, vars: 0, template: () => '' });
        (0, core_1.ɵsetClassDebugInfo)(Comp, {
            className: 'Comp',
            filePath: 'comp.ts',
            lineNumber: 11,
            forbidOrphanRendering: true,
        });
        (0, matchers_1.expect)(Comp.ɵcmp.debugInfo).toEqual({
            className: 'Comp',
            filePath: 'comp.ts',
            lineNumber: 11,
            forbidOrphanRendering: true,
        });
    });
});
