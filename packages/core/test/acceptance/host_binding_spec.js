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
const animations_1 = require("@angular/animations");
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const bypass_1 = require("../../src/sanitization/bypass");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const animations_2 = require("@angular/platform-browser/animations");
describe('host bindings', () => {
    it('should render host bindings on the root component', () => {
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _myStylesExp_decorators;
            let _myStylesExp_initializers = [];
            let _myStylesExp_extraInitializers = [];
            let _myClassesExp_decorators;
            let _myClassesExp_initializers = [];
            let _myClassesExp_extraInitializers = [];
            var MyApp = _classThis = class {
                constructor() {
                    this.myStylesExp = __runInitializers(this, _myStylesExp_initializers, {});
                    this.myClassesExp = (__runInitializers(this, _myStylesExp_extraInitializers), __runInitializers(this, _myClassesExp_initializers, {}));
                    __runInitializers(this, _myClassesExp_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _myStylesExp_decorators = [(0, core_1.HostBinding)('style')];
                _myClassesExp_decorators = [(0, core_1.HostBinding)('class')];
                __esDecorate(null, null, _myStylesExp_decorators, { kind: "field", name: "myStylesExp", static: false, private: false, access: { has: obj => "myStylesExp" in obj, get: obj => obj.myStylesExp, set: (obj, value) => { obj.myStylesExp = value; } }, metadata: _metadata }, _myStylesExp_initializers, _myStylesExp_extraInitializers);
                __esDecorate(null, null, _myClassesExp_decorators, { kind: "field", name: "myClassesExp", static: false, private: false, access: { has: obj => "myClassesExp" in obj, get: obj => obj.myClassesExp, set: (obj, value) => { obj.myClassesExp = value; } }, metadata: _metadata }, _myClassesExp_initializers, _myClassesExp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        const element = fixture.nativeElement;
        fixture.detectChanges();
        const component = fixture.componentInstance;
        component.myStylesExp = { width: '100px' };
        component.myClassesExp = 'foo';
        fixture.detectChanges();
        expect(element.style['width']).toEqual('100px');
        expect(element.classList.contains('foo')).toBeTruthy();
        component.myStylesExp = { width: '200px' };
        component.myClassesExp = 'bar';
        fixture.detectChanges();
        expect(element.style['width']).toEqual('200px');
        expect(element.classList.contains('foo')).toBeFalsy();
        expect(element.classList.contains('bar')).toBeTruthy();
    });
    describe('defined in @Component', () => {
        it('should combine the inherited static classes of a parent and child component', () => {
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '...',
                        host: { 'class': 'foo bar' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentCmp = _classThis = class {
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
                        template: '...',
                        host: { 'class': 'foo baz' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = ParentCmp;
                var ChildCmp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [ChildCmp] });
            const fixture = testing_1.TestBed.createComponent(ChildCmp);
            fixture.detectChanges();
            const element = fixture.nativeElement;
            expect(element.classList.contains('bar')).toBeTruthy();
            expect(element.classList.contains('foo')).toBeTruthy();
            expect(element.classList.contains('baz')).toBeTruthy();
        });
        it('should render host class and style on the root component', () => {
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '...',
                        host: { class: 'foo', style: 'color: red' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            const element = fixture.nativeElement;
            fixture.detectChanges();
            expect(element.style['color']).toEqual('red');
            expect(element.classList.contains('foo')).toBeTruthy();
        });
        it('should not cause problems if detectChanges is called when a property updates', () => {
            /**
             * Angular Material CDK Tree contains a code path whereby:
             *
             * 1. During the execution of a template function in which **more than one** property is
             * updated in a row.
             * 2. A property that **is not the last property** is updated in the **original template**:
             *   - That sets up a new observable and subscribes to it
             *   - The new observable it sets up can emit synchronously.
             *   - When it emits, it calls `detectChanges` on a `ViewRef` that it has a handle to
             *   - That executes a **different template**, that has host bindings
             *     - this executes `setHostBindings`
             *     - Inside of `setHostBindings` we are currently updating the selected index **global
             *       state** via `setSelectedIndex`.
             * 3. We attempt to update the next property in the **original template**.
             *  - But the selected index has been altered, and we get errors.
             */
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `...`,
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
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
        <div>
          <div #template></div>
          <p>{{prop}}</p>
          <p>{{prop2}}</p>
        </div>
      `,
                        host: {
                            '[style.color]': 'color',
                        },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _vcr_decorators;
                let _vcr_initializers = [];
                let _vcr_extraInitializers = [];
                let _set_prop_decorators;
                let _prop2_decorators;
                let _prop2_initializers = [];
                let _prop2_extraInitializers = [];
                var ParentCmp = _classThis = class {
                    set prop(value) {
                        // Material CdkTree has at least one scenario where setting a property causes a data
                        // source
                        // to update, which causes a synchronous call to detectChanges().
                        this._prop = value;
                        if (this.child) {
                            this.child.changeDetectorRef.detectChanges();
                        }
                    }
                    get prop() {
                        return this._prop;
                    }
                    ngAfterViewInit() {
                        this.child = this.vcr.createComponent(ChildCmp);
                    }
                    constructor() {
                        this._prop = (__runInitializers(this, _instanceExtraInitializers), '');
                        this.vcr = __runInitializers(this, _vcr_initializers, null);
                        this.child = (__runInitializers(this, _vcr_extraInitializers), null);
                        this.prop2 = __runInitializers(this, _prop2_initializers, 0);
                        __runInitializers(this, _prop2_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcr_decorators = [(0, core_1.ViewChild)('template', { read: core_1.ViewContainerRef })];
                    _set_prop_decorators = [(0, core_1.Input)()];
                    _prop2_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_prop_decorators, { kind: "setter", name: "prop", static: false, private: false, access: { has: obj => "prop" in obj, set: (obj, value) => { obj.prop = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                    __esDecorate(null, null, _prop2_decorators, { kind: "field", name: "prop2", static: false, private: false, access: { has: obj => "prop2" in obj, get: obj => obj.prop2, set: (obj, value) => { obj.prop2 = value; } }, metadata: _metadata }, _prop2_initializers, _prop2_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<parent [prop]="prop" [prop2]="prop2"></parent>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.prop = 'a';
                        this.prop2 = 1;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, ParentCmp, ChildCmp] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.prop = 'b';
            fixture.componentInstance.prop2 = 2;
            fixture.detectChanges();
        });
    });
    describe('with synthetic (animations) props', () => {
        it('should work when directive contains synthetic props', () => {
            let AnimationPropDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[animationPropDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                var AnimationPropDir = _classThis = class {
                    constructor() {
                        this.myAnimation = __runInitializers(this, _myAnimation_initializers, 'color');
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AnimationPropDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimationPropDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimationPropDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div animationPropDir>Some content</div>',
                        animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'red' }))])],
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
            testing_1.TestBed.configureTestingModule({
                declarations: [Comp, AnimationPropDir],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(AnimationPropDir));
            expect(queryResult.nativeElement.style.color).toBe('red');
        });
        it('should work when directive contains synthetic props and directive is applied to a component', () => {
            let AnimationPropDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[animationPropDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                var AnimationPropDir = _classThis = class {
                    constructor() {
                        this.myAnimation = __runInitializers(this, _myAnimation_initializers, 'color');
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AnimationPropDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimationPropDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimationPropDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: 'Some content',
                        animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'red' }))])],
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
                        selector: 'app',
                        template: '<my-comp animationPropDir></my-comp>',
                        animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'green' }))])],
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, Comp, AnimationPropDir],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(AnimationPropDir));
            expect(queryResult.nativeElement.style.color).toBe('green');
        });
        it('should work when component contains synthetic props', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div>Some content/div>',
                        animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'red' }))])],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.myAnimation = __runInitializers(this, _myAnimation_initializers, 'color');
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Comp],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            expect(fixture.nativeElement.style.color).toBe('red');
        });
        it('should work when child component contains synthetic props', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div>Some content/div>',
                        animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'red' }))])],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.myAnimation = __runInitializers(this, _myAnimation_initializers, 'color');
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp></my-comp>',
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, Comp],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(Comp));
            expect(queryResult.nativeElement.style.color).toBe('red');
        });
        it('should work when component extends a directive that contains synthetic props', () => {
            let AnimationDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'animation-dir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                var AnimationDir = _classThis = class {
                    constructor() {
                        this.myAnimation = __runInitializers(this, _myAnimation_initializers, 'color');
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AnimationDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimationDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimationDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div>Some content</div>',
                        animations: [(0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('color', (0, animations_1.style)({ color: 'red' }))])],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = AnimationDir;
                var Comp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Comp, AnimationDir],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            expect(fixture.nativeElement.style.color).toBe('red');
        });
        it('should work when directive contains synthetic listeners', () => __awaiter(void 0, void 0, void 0, function* () {
            const events = [];
            let AnimationPropDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[animationPropDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                let _onAnimationStart_decorators;
                let _onAnimationDone_decorators;
                var AnimationPropDir = _classThis = class {
                    onAnimationStart() {
                        events.push('@myAnimation.start');
                    }
                    onAnimationDone() {
                        events.push('@myAnimation.done');
                    }
                    constructor() {
                        this.myAnimation = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _myAnimation_initializers, 'a'));
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AnimationPropDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    _onAnimationStart_decorators = [(0, core_1.HostListener)('@myAnimation.start')];
                    _onAnimationDone_decorators = [(0, core_1.HostListener)('@myAnimation.done')];
                    __esDecorate(_classThis, null, _onAnimationStart_decorators, { kind: "method", name: "onAnimationStart", static: false, private: false, access: { has: obj => "onAnimationStart" in obj, get: obj => obj.onAnimationStart }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _onAnimationDone_decorators, { kind: "method", name: "onAnimationDone", static: false, private: false, access: { has: obj => "onAnimationDone" in obj, get: obj => obj.onAnimationDone }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimationPropDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimationPropDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div animationPropDir>Some content</div>',
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('a', (0, animations_1.style)({ color: 'yellow' })), (0, animations_1.transition)('* => a', [])]),
                        ],
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
            testing_1.TestBed.configureTestingModule({
                declarations: [Comp, AnimationPropDir],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            yield fixture.whenStable(); // wait for animations to complete
            const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(AnimationPropDir));
            expect(queryResult.nativeElement.style.color).toBe('yellow');
            expect(events).toEqual(['@myAnimation.start', '@myAnimation.done']);
        }));
        it('should work when component contains synthetic listeners', () => __awaiter(void 0, void 0, void 0, function* () {
            const events = [];
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div>Some content</div>',
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('a', (0, animations_1.style)({ color: 'yellow' })), (0, animations_1.transition)('* => a', [])]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                let _onAnimationStart_decorators;
                let _onAnimationDone_decorators;
                var Comp = _classThis = class {
                    onAnimationStart() {
                        events.push('@myAnimation.start');
                    }
                    onAnimationDone() {
                        events.push('@myAnimation.done');
                    }
                    constructor() {
                        this.myAnimation = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _myAnimation_initializers, 'a'));
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    _onAnimationStart_decorators = [(0, core_1.HostListener)('@myAnimation.start')];
                    _onAnimationDone_decorators = [(0, core_1.HostListener)('@myAnimation.done')];
                    __esDecorate(_classThis, null, _onAnimationStart_decorators, { kind: "method", name: "onAnimationStart", static: false, private: false, access: { has: obj => "onAnimationStart" in obj, get: obj => obj.onAnimationStart }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _onAnimationDone_decorators, { kind: "method", name: "onAnimationDone", static: false, private: false, access: { has: obj => "onAnimationDone" in obj, get: obj => obj.onAnimationDone }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Comp],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            yield fixture.whenStable(); // wait for animations to complete
            expect(fixture.nativeElement.style.color).toBe('yellow');
            expect(events).toEqual(['@myAnimation.start', '@myAnimation.done']);
        }));
        it('should work when child component contains synthetic listeners', () => __awaiter(void 0, void 0, void 0, function* () {
            const events = [];
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div>Some content</div>',
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('a', (0, animations_1.style)({ color: 'yellow' })), (0, animations_1.transition)('* => a', [])]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                let _onAnimationStart_decorators;
                let _onAnimationDone_decorators;
                var Comp = _classThis = class {
                    onAnimationStart() {
                        events.push('@myAnimation.start');
                    }
                    onAnimationDone() {
                        events.push('@myAnimation.done');
                    }
                    constructor() {
                        this.myAnimation = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _myAnimation_initializers, 'a'));
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    _onAnimationStart_decorators = [(0, core_1.HostListener)('@myAnimation.start')];
                    _onAnimationDone_decorators = [(0, core_1.HostListener)('@myAnimation.done')];
                    __esDecorate(_classThis, null, _onAnimationStart_decorators, { kind: "method", name: "onAnimationStart", static: false, private: false, access: { has: obj => "onAnimationStart" in obj, get: obj => obj.onAnimationStart }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _onAnimationDone_decorators, { kind: "method", name: "onAnimationDone", static: false, private: false, access: { has: obj => "onAnimationDone" in obj, get: obj => obj.onAnimationDone }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp></my-comp>',
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, Comp],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            yield fixture.whenStable(); // wait for animations to complete
            const queryResult = fixture.debugElement.query(platform_browser_1.By.directive(Comp));
            expect(queryResult.nativeElement.style.color).toBe('yellow');
            expect(events).toEqual(['@myAnimation.start', '@myAnimation.done']);
        }));
        it('should work when component extends a directive that contains synthetic listeners', () => __awaiter(void 0, void 0, void 0, function* () {
            const events = [];
            let AnimationDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'animation-dir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _myAnimation_decorators;
                let _myAnimation_initializers = [];
                let _myAnimation_extraInitializers = [];
                let _onAnimationStart_decorators;
                let _onAnimationDone_decorators;
                var AnimationDir = _classThis = class {
                    onAnimationStart() {
                        events.push('@myAnimation.start');
                    }
                    onAnimationDone() {
                        events.push('@myAnimation.done');
                    }
                    constructor() {
                        this.myAnimation = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _myAnimation_initializers, 'a'));
                        __runInitializers(this, _myAnimation_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AnimationDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myAnimation_decorators = [(0, core_1.HostBinding)('@myAnimation')];
                    _onAnimationStart_decorators = [(0, core_1.HostListener)('@myAnimation.start')];
                    _onAnimationDone_decorators = [(0, core_1.HostListener)('@myAnimation.done')];
                    __esDecorate(_classThis, null, _onAnimationStart_decorators, { kind: "method", name: "onAnimationStart", static: false, private: false, access: { has: obj => "onAnimationStart" in obj, get: obj => obj.onAnimationStart }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _onAnimationDone_decorators, { kind: "method", name: "onAnimationDone", static: false, private: false, access: { has: obj => "onAnimationDone" in obj, get: obj => obj.onAnimationDone }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _myAnimation_decorators, { kind: "field", name: "myAnimation", static: false, private: false, access: { has: obj => "myAnimation" in obj, get: obj => obj.myAnimation, set: (obj, value) => { obj.myAnimation = value; } }, metadata: _metadata }, _myAnimation_initializers, _myAnimation_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimationDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimationDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div>Some content</div>',
                        animations: [
                            (0, animations_1.trigger)('myAnimation', [(0, animations_1.state)('a', (0, animations_1.style)({ color: 'yellow' })), (0, animations_1.transition)('* => a', [])]),
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = AnimationDir;
                var Comp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Comp],
                imports: [animations_2.NoopAnimationsModule],
            });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            yield fixture.whenStable(); // wait for animations to complete
            expect(fixture.nativeElement.style.color).toBe('yellow');
            expect(events).toEqual(['@myAnimation.start', '@myAnimation.done']);
        }));
    });
    describe('via @HostBinding', () => {
        it('should render styling for parent and sub-classed components in order', () => {
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <child-and-parent-cmp></child-and-parent-cmp>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _width1_decorators;
                let _width1_initializers = [];
                let _width1_extraInitializers = [];
                let _height1_decorators;
                let _height1_initializers = [];
                let _height1_extraInitializers = [];
                let _opacity1_decorators;
                let _opacity1_initializers = [];
                let _opacity1_extraInitializers = [];
                var ParentCmp = _classThis = class {
                    constructor() {
                        this.width1 = __runInitializers(this, _width1_initializers, '100px');
                        this.height1 = (__runInitializers(this, _width1_extraInitializers), __runInitializers(this, _height1_initializers, '100px'));
                        this.opacity1 = (__runInitializers(this, _height1_extraInitializers), __runInitializers(this, _opacity1_initializers, '0.5'));
                        __runInitializers(this, _opacity1_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _width1_decorators = [(0, core_1.HostBinding)('style.width')];
                    _height1_decorators = [(0, core_1.HostBinding)('style.height')];
                    _opacity1_decorators = [(0, core_1.HostBinding)('style.opacity')];
                    __esDecorate(null, null, _width1_decorators, { kind: "field", name: "width1", static: false, private: false, access: { has: obj => "width1" in obj, get: obj => obj.width1, set: (obj, value) => { obj.width1 = value; } }, metadata: _metadata }, _width1_initializers, _width1_extraInitializers);
                    __esDecorate(null, null, _height1_decorators, { kind: "field", name: "height1", static: false, private: false, access: { has: obj => "height1" in obj, get: obj => obj.height1, set: (obj, value) => { obj.height1 = value; } }, metadata: _metadata }, _height1_initializers, _height1_extraInitializers);
                    __esDecorate(null, null, _opacity1_decorators, { kind: "field", name: "opacity1", static: false, private: false, access: { has: obj => "opacity1" in obj, get: obj => obj.opacity1, set: (obj, value) => { obj.opacity1 = value; } }, metadata: _metadata }, _opacity1_initializers, _opacity1_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-and-parent-cmp',
                        template: '...',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = ParentCmp;
                let _width2_decorators;
                let _width2_initializers = [];
                let _width2_extraInitializers = [];
                let _height2_decorators;
                let _height2_initializers = [];
                let _height2_extraInitializers = [];
                var ChildCmp = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.width2 = __runInitializers(this, _width2_initializers, '200px');
                        this.height2 = (__runInitializers(this, _width2_extraInitializers), __runInitializers(this, _height2_initializers, '200px'));
                        __runInitializers(this, _height2_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _width2_decorators = [(0, core_1.HostBinding)('style.width')];
                    _height2_decorators = [(0, core_1.HostBinding)('style.height')];
                    __esDecorate(null, null, _width2_decorators, { kind: "field", name: "width2", static: false, private: false, access: { has: obj => "width2" in obj, get: obj => obj.width2, set: (obj, value) => { obj.width2 = value; } }, metadata: _metadata }, _width2_initializers, _width2_extraInitializers);
                    __esDecorate(null, null, _height2_decorators, { kind: "field", name: "height2", static: false, private: false, access: { has: obj => "height2" in obj, get: obj => obj.height2, set: (obj, value) => { obj.height2 = value; } }, metadata: _metadata }, _height2_initializers, _height2_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, ParentCmp, ChildCmp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            const element = fixture.nativeElement;
            fixture.detectChanges();
            const childElement = element.querySelector('child-and-parent-cmp');
            expect(childElement.style.width).toEqual('200px');
            expect(childElement.style.height).toEqual('200px');
            expect(childElement.style.opacity).toEqual('0.5');
        });
        it('should prioritize styling present in the order of directive hostBinding evaluation, but consider sub-classed directive styling to be the most important', () => {
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div child-dir sibling-dir></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            let ParentDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[parent-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _get_width1_decorators;
                let _get_height1_decorators;
                let _get_color1_decorators;
                var ParentDir = _classThis = class {
                    get width1() {
                        return '100px';
                    }
                    get height1() {
                        return '100px';
                    }
                    get color1() {
                        return 'red';
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ParentDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _get_width1_decorators = [(0, core_1.HostBinding)('style.width')];
                    _get_height1_decorators = [(0, core_1.HostBinding)('style.height')];
                    _get_color1_decorators = [(0, core_1.HostBinding)('style.color')];
                    __esDecorate(_classThis, null, _get_width1_decorators, { kind: "getter", name: "width1", static: false, private: false, access: { has: obj => "width1" in obj, get: obj => obj.width1 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _get_height1_decorators, { kind: "getter", name: "height1", static: false, private: false, access: { has: obj => "height1" in obj, get: obj => obj.height1 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _get_color1_decorators, { kind: "getter", name: "color1", static: false, private: false, access: { has: obj => "color1" in obj, get: obj => obj.color1 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentDir = _classThis;
            })();
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = ParentDir;
                let _instanceExtraInitializers = [];
                let _get_width2_decorators;
                let _get_height2_decorators;
                var ChildDir = _classThis = class extends _classSuper {
                    get width2() {
                        return '200px';
                    }
                    get height2() {
                        return '200px';
                    }
                    constructor() {
                        super(...arguments);
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _get_width2_decorators = [(0, core_1.HostBinding)('style.width')];
                    _get_height2_decorators = [(0, core_1.HostBinding)('style.height')];
                    __esDecorate(_classThis, null, _get_width2_decorators, { kind: "getter", name: "width2", static: false, private: false, access: { has: obj => "width2" in obj, get: obj => obj.width2 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _get_height2_decorators, { kind: "getter", name: "height2", static: false, private: false, access: { has: obj => "height2" in obj, get: obj => obj.height2 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let SiblingDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[sibling-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _get_width3_decorators;
                let _get_height3_decorators;
                let _get_opacity3_decorators;
                let _get_color1_decorators;
                var SiblingDir = _classThis = class {
                    get width3() {
                        return '300px';
                    }
                    get height3() {
                        return '300px';
                    }
                    get opacity3() {
                        return '0.5';
                    }
                    get color1() {
                        return 'blue';
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SiblingDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _get_width3_decorators = [(0, core_1.HostBinding)('style.width')];
                    _get_height3_decorators = [(0, core_1.HostBinding)('style.height')];
                    _get_opacity3_decorators = [(0, core_1.HostBinding)('style.opacity')];
                    _get_color1_decorators = [(0, core_1.HostBinding)('style.color')];
                    __esDecorate(_classThis, null, _get_width3_decorators, { kind: "getter", name: "width3", static: false, private: false, access: { has: obj => "width3" in obj, get: obj => obj.width3 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _get_height3_decorators, { kind: "getter", name: "height3", static: false, private: false, access: { has: obj => "height3" in obj, get: obj => obj.height3 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _get_opacity3_decorators, { kind: "getter", name: "opacity3", static: false, private: false, access: { has: obj => "opacity3" in obj, get: obj => obj.opacity3 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _get_color1_decorators, { kind: "getter", name: "color1", static: false, private: false, access: { has: obj => "color1" in obj, get: obj => obj.color1 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SiblingDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SiblingDir = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, ParentDir, SiblingDir, ChildDir] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            const element = fixture.nativeElement;
            fixture.detectChanges();
            const childElement = element.querySelector('div');
            // width/height values were set in all directives, but the sub-class directive
            // (ChildDir) had priority over the parent directive (ParentDir) which is why its
            // value won. It also won over Dir because the SiblingDir directive was declared
            // later in `declarations`.
            expect(childElement.style.width).toEqual('200px');
            expect(childElement.style.height).toEqual('200px');
            // ParentDir styled the color first before Dir
            expect(childElement.style.color).toEqual('red');
            // Dir was the only directive to style opacity
            expect(childElement.style.opacity).toEqual('0.5');
        });
        it('should allow class-bindings to be placed on ng-container elements', () => {
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <ng-container [class.foo]="true" dir-that-adds-other-classes>...</ng-container>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            let DirThatAddsOtherClasses = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir-that-adds-other-classes]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _bool_decorators;
                let _bool_initializers = [];
                let _bool_extraInitializers = [];
                var DirThatAddsOtherClasses = _classThis = class {
                    constructor() {
                        this.bool = __runInitializers(this, _bool_initializers, true);
                        __runInitializers(this, _bool_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DirThatAddsOtherClasses");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _bool_decorators = [(0, core_1.HostBinding)('class.other-class')];
                    __esDecorate(null, null, _bool_decorators, { kind: "field", name: "bool", static: false, private: false, access: { has: obj => "bool" in obj, get: obj => obj.bool, set: (obj, value) => { obj.bool = value; } }, metadata: _metadata }, _bool_initializers, _bool_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirThatAddsOtherClasses = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirThatAddsOtherClasses = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, DirThatAddsOtherClasses] });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
            }).not.toThrow();
        });
    });
    let HostBindingDir = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: '[hostBindingDir]',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _id_decorators;
        let _id_initializers = [];
        let _id_extraInitializers = [];
        var HostBindingDir = _classThis = class {
            constructor() {
                this.id = __runInitializers(this, _id_initializers, 'foo');
                __runInitializers(this, _id_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "HostBindingDir");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, core_1.HostBinding)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HostBindingDir = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return HostBindingDir = _classThis;
    })();
    it('should support host bindings in directives', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _klass_decorators;
            let _klass_initializers = [];
            let _klass_extraInitializers = [];
            var Dir = _classThis = class {
                constructor() {
                    this.klass = __runInitializers(this, _klass_initializers, 'foo');
                    __runInitializers(this, _klass_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _klass_decorators = [(0, core_1.HostBinding)('className')];
                __esDecorate(null, null, _klass_decorators, { kind: "field", name: "klass", static: false, private: false, access: { has: obj => "klass" in obj, get: obj => obj.klass, set: (obj, value) => { obj.klass = value; } }, metadata: _metadata }, _klass_initializers, _klass_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<span dir></span>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _directiveInstance_decorators;
            let _directiveInstance_initializers = [];
            let _directiveInstance_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.directiveInstance = __runInitializers(this, _directiveInstance_initializers, void 0);
                    __runInitializers(this, _directiveInstance_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _directiveInstance_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _directiveInstance_decorators, { kind: "field", name: "directiveInstance", static: false, private: false, access: { has: obj => "directiveInstance" in obj, get: obj => obj.directiveInstance, set: (obj, value) => { obj.directiveInstance = value; } }, metadata: _metadata }, _directiveInstance_initializers, _directiveInstance_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
        const fixture = testing_1.TestBed.createComponent(App);
        const element = fixture.nativeElement;
        fixture.detectChanges();
        expect(element.innerHTML).toContain('class="foo"');
        fixture.componentInstance.directiveInstance.klass = 'bar';
        fixture.detectChanges();
        expect(element.innerHTML).toContain('class="bar"');
    });
    it('should support host bindings on root component', () => {
        let HostBindingComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _title_decorators;
            let _title_initializers = [];
            let _title_extraInitializers = [];
            var HostBindingComp = _classThis = class {
                constructor() {
                    this.title = __runInitializers(this, _title_initializers, 'my-title');
                    __runInitializers(this, _title_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "HostBindingComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _title_decorators = [(0, core_1.HostBinding)()];
                __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [HostBindingComp] });
        const fixture = testing_1.TestBed.createComponent(HostBindingComp);
        const element = fixture.nativeElement;
        fixture.detectChanges();
        expect(element.title).toBe('my-title');
        fixture.componentInstance.title = 'other-title';
        fixture.detectChanges();
        expect(element.title).toBe('other-title');
    });
    it('should support host bindings on nodes with providers', () => {
        let ServiceOne = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ServiceOne = _classThis = class {
                constructor() {
                    this.value = 'one';
                }
            };
            __setFunctionName(_classThis, "ServiceOne");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ServiceOne = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ServiceOne = _classThis;
        })();
        let ServiceTwo = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ServiceTwo = _classThis = class {
                constructor() {
                    this.value = 'two';
                }
            };
            __setFunctionName(_classThis, "ServiceTwo");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ServiceTwo = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ServiceTwo = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    providers: [ServiceOne, ServiceTwo],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _title_decorators;
            let _title_initializers = [];
            let _title_extraInitializers = [];
            var App = _classThis = class {
                constructor(serviceOne, serviceTwo) {
                    this.serviceOne = serviceOne;
                    this.serviceTwo = serviceTwo;
                    this.title = __runInitializers(this, _title_initializers, 'my-title');
                    __runInitializers(this, _title_extraInitializers);
                    this.serviceOne = serviceOne;
                    this.serviceTwo = serviceTwo;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _title_decorators = [(0, core_1.HostBinding)()];
                __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_1.TestBed.createComponent(App);
        const element = fixture.nativeElement;
        fixture.detectChanges();
        expect(element.title).toBe('my-title');
        expect(fixture.componentInstance.serviceOne.value).toEqual('one');
        expect(fixture.componentInstance.serviceTwo.value).toEqual('two');
        fixture.componentInstance.title = 'other-title';
        fixture.detectChanges();
        expect(element.title).toBe('other-title');
    });
    it('should support host bindings on multiple nodes', () => {
        let SomeDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[someDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeDir = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeDir = _classThis;
        })();
        let HostTitleComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-title-comp',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _title_decorators;
            let _title_initializers = [];
            let _title_extraInitializers = [];
            var HostTitleComp = _classThis = class {
                constructor() {
                    this.title = __runInitializers(this, _title_initializers, 'my-title');
                    __runInitializers(this, _title_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "HostTitleComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _title_decorators = [(0, core_1.HostBinding)()];
                __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostTitleComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostTitleComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <div hostBindingDir></div>
          <div someDir></div>
          <host-title-comp></host-title-comp>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _hostBindingDir_decorators;
            let _hostBindingDir_initializers = [];
            let _hostBindingDir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.hostBindingDir = __runInitializers(this, _hostBindingDir_initializers, void 0);
                    __runInitializers(this, _hostBindingDir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _hostBindingDir_decorators = [(0, core_1.ViewChild)(HostBindingDir)];
                __esDecorate(null, null, _hostBindingDir_decorators, { kind: "field", name: "hostBindingDir", static: false, private: false, access: { has: obj => "hostBindingDir" in obj, get: obj => obj.hostBindingDir, set: (obj, value) => { obj.hostBindingDir = value; } }, metadata: _metadata }, _hostBindingDir_initializers, _hostBindingDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, SomeDir, HostTitleComp, HostBindingDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        const element = fixture.nativeElement;
        fixture.detectChanges();
        const hostBindingDiv = element.querySelector('div');
        const hostTitleComp = element.querySelector('host-title-comp');
        expect(hostBindingDiv.id).toEqual('foo');
        expect(hostTitleComp.title).toEqual('my-title');
        fixture.componentInstance.hostBindingDir.id = 'bar';
        fixture.detectChanges();
        expect(hostBindingDiv.id).toEqual('bar');
    });
    it('should support consecutive components with host bindings', () => {
        let HostBindingComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-binding-comp',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _id_decorators;
            let _id_initializers = [];
            let _id_extraInitializers = [];
            var HostBindingComp = _classThis = class {
                constructor() {
                    this.id = __runInitializers(this, _id_initializers, 'blue');
                    __runInitializers(this, _id_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "HostBindingComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _id_decorators = [(0, core_1.HostBinding)()];
                __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <host-binding-comp></host-binding-comp>
          <host-binding-comp></host-binding-comp>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _hostBindingComp_decorators;
            let _hostBindingComp_initializers = [];
            let _hostBindingComp_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.hostBindingComp = __runInitializers(this, _hostBindingComp_initializers, void 0);
                    __runInitializers(this, _hostBindingComp_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _hostBindingComp_decorators = [(0, core_1.ViewChildren)(HostBindingComp)];
                __esDecorate(null, null, _hostBindingComp_decorators, { kind: "field", name: "hostBindingComp", static: false, private: false, access: { has: obj => "hostBindingComp" in obj, get: obj => obj.hostBindingComp, set: (obj, value) => { obj.hostBindingComp = value; } }, metadata: _metadata }, _hostBindingComp_initializers, _hostBindingComp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingComp] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const comps = fixture.componentInstance.hostBindingComp.toArray();
        const hostBindingEls = fixture.nativeElement.querySelectorAll('host-binding-comp');
        expect(hostBindingEls.length).toBe(2);
        comps[0].id = 'red';
        fixture.detectChanges();
        expect(hostBindingEls[0].id).toBe('red');
        // second element should not be affected
        expect(hostBindingEls[1].id).toBe('blue');
        comps[1].id = 'red';
        fixture.detectChanges();
        // now second element should take updated value
        expect(hostBindingEls[1].id).toBe('red');
    });
    it('should support dirs with host bindings on the same node as dirs without host bindings', () => {
        let SomeDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[someDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeDir = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div someDir hostBindingDir></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _hostBindingDir_decorators;
            let _hostBindingDir_initializers = [];
            let _hostBindingDir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.hostBindingDir = __runInitializers(this, _hostBindingDir_initializers, void 0);
                    __runInitializers(this, _hostBindingDir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _hostBindingDir_decorators = [(0, core_1.ViewChild)(HostBindingDir)];
                __esDecorate(null, null, _hostBindingDir_decorators, { kind: "field", name: "hostBindingDir", static: false, private: false, access: { has: obj => "hostBindingDir" in obj, get: obj => obj.hostBindingDir, set: (obj, value) => { obj.hostBindingDir = value; } }, metadata: _metadata }, _hostBindingDir_initializers, _hostBindingDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, SomeDir, HostBindingDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const hostBindingDiv = fixture.nativeElement.querySelector('div');
        expect(hostBindingDiv.id).toEqual('foo');
        fixture.componentInstance.hostBindingDir.id = 'bar';
        fixture.detectChanges();
        expect(hostBindingDiv.id).toEqual('bar');
    });
    it('should support host bindings that rely on values from init hooks', () => {
        let InitHookComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    selector: 'init-hook-comp',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _inputValue_decorators;
            let _inputValue_initializers = [];
            let _inputValue_extraInitializers = [];
            let _get_value_decorators;
            var InitHookComp = _classThis = class {
                constructor() {
                    this.inputValue = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _inputValue_initializers, ''));
                    this.changesValue = (__runInitializers(this, _inputValue_extraInitializers), '');
                    this.initValue = '';
                    this.checkValue = '';
                }
                ngOnChanges() {
                    this.changesValue = 'changes';
                }
                ngOnInit() {
                    this.initValue = 'init';
                }
                ngDoCheck() {
                    this.checkValue = 'check';
                }
                get value() {
                    return `${this.inputValue}-${this.changesValue}-${this.initValue}-${this.checkValue}`;
                }
            };
            __setFunctionName(_classThis, "InitHookComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _inputValue_decorators = [(0, core_1.Input)()];
                _get_value_decorators = [(0, core_1.HostBinding)('title')];
                __esDecorate(_classThis, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, null, _inputValue_decorators, { kind: "field", name: "inputValue", static: false, private: false, access: { has: obj => "inputValue" in obj, get: obj => obj.inputValue, set: (obj, value) => { obj.inputValue = value; } }, metadata: _metadata }, _inputValue_initializers, _inputValue_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InitHookComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InitHookComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<init-hook-comp [inputValue]="value"></init-hook-comp>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 'input';
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, InitHookComp] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const initHookComp = fixture.nativeElement.querySelector('init-hook-comp');
        expect(initHookComp.title).toEqual('input-changes-init-check');
        fixture.componentInstance.value = 'input2';
        fixture.detectChanges();
        expect(initHookComp.title).toEqual('input2-changes-init-check');
    });
    it('should support host bindings with the same name as inputs', () => {
        let HostBindingInputDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[hostBindingDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _disabled_decorators;
            let _disabled_initializers = [];
            let _disabled_extraInitializers = [];
            let _hostDisabled_decorators;
            let _hostDisabled_initializers = [];
            let _hostDisabled_extraInitializers = [];
            var HostBindingInputDir = _classThis = class {
                constructor() {
                    this.disabled = __runInitializers(this, _disabled_initializers, false);
                    this.hostDisabled = (__runInitializers(this, _disabled_extraInitializers), __runInitializers(this, _hostDisabled_initializers, false));
                    __runInitializers(this, _hostDisabled_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "HostBindingInputDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _disabled_decorators = [(0, core_1.Input)()];
                _hostDisabled_decorators = [(0, core_1.HostBinding)('disabled')];
                __esDecorate(null, null, _disabled_decorators, { kind: "field", name: "disabled", static: false, private: false, access: { has: obj => "disabled" in obj, get: obj => obj.disabled, set: (obj, value) => { obj.disabled = value; } }, metadata: _metadata }, _disabled_initializers, _disabled_extraInitializers);
                __esDecorate(null, null, _hostDisabled_decorators, { kind: "field", name: "hostDisabled", static: false, private: false, access: { has: obj => "hostDisabled" in obj, get: obj => obj.hostDisabled, set: (obj, value) => { obj.hostDisabled = value; } }, metadata: _metadata }, _hostDisabled_initializers, _hostDisabled_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingInputDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingInputDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<input hostBindingDir [disabled]="isDisabled">',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _hostBindingInputDir_decorators;
            let _hostBindingInputDir_initializers = [];
            let _hostBindingInputDir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.hostBindingInputDir = __runInitializers(this, _hostBindingInputDir_initializers, void 0);
                    this.isDisabled = (__runInitializers(this, _hostBindingInputDir_extraInitializers), true);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _hostBindingInputDir_decorators = [(0, core_1.ViewChild)(HostBindingInputDir)];
                __esDecorate(null, null, _hostBindingInputDir_decorators, { kind: "field", name: "hostBindingInputDir", static: false, private: false, access: { has: obj => "hostBindingInputDir" in obj, get: obj => obj.hostBindingInputDir, set: (obj, value) => { obj.hostBindingInputDir = value; } }, metadata: _metadata }, _hostBindingInputDir_initializers, _hostBindingInputDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingInputDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const hostBindingInputDir = fixture.componentInstance.hostBindingInputDir;
        const hostBindingEl = fixture.nativeElement.querySelector('input');
        expect(hostBindingInputDir.disabled).toBe(true);
        expect(hostBindingEl.disabled).toBe(false);
        fixture.componentInstance.isDisabled = false;
        fixture.detectChanges();
        expect(hostBindingInputDir.disabled).toBe(false);
        expect(hostBindingEl.disabled).toBe(false);
        hostBindingInputDir.hostDisabled = true;
        fixture.detectChanges();
        expect(hostBindingInputDir.disabled).toBe(false);
        expect(hostBindingEl.disabled).toBe(true);
    });
    it('should support host bindings on second template pass', () => {
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    template: '<div hostBindingDir></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <parent></parent>
          <parent></parent>
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Parent, HostBindingDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const divs = fixture.nativeElement.querySelectorAll('div');
        expect(divs[0].id).toEqual('foo');
        expect(divs[1].id).toEqual('foo');
    });
    it('should support host bindings in for loop', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <div *ngFor="let row of rows">
            <p hostBindingDir></p>
          </div>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.rows = [];
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
        testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [App, HostBindingDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.componentInstance.rows = [1, 2, 3];
        fixture.detectChanges();
        const paragraphs = fixture.nativeElement.querySelectorAll('p');
        expect(paragraphs[0].id).toEqual('foo');
        expect(paragraphs[1].id).toEqual('foo');
        expect(paragraphs[2].id).toEqual('foo');
    });
    it('should support component with host bindings and array literals', () => {
        let HostBindingComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-binding-comp',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _id_decorators;
            let _id_initializers = [];
            let _id_extraInitializers = [];
            var HostBindingComp = _classThis = class {
                constructor() {
                    this.id = __runInitializers(this, _id_initializers, 'my-id');
                    __runInitializers(this, _id_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "HostBindingComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _id_decorators = [(0, core_1.HostBinding)()];
                __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingComp = _classThis;
        })();
        let NameComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'name-comp',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _names_decorators;
            let _names_initializers = [];
            let _names_extraInitializers = [];
            var NameComp = _classThis = class {
                constructor() {
                    this.names = __runInitializers(this, _names_initializers, void 0);
                    __runInitializers(this, _names_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "NameComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _names_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _names_decorators, { kind: "field", name: "names", static: false, private: false, access: { has: obj => "names" in obj, get: obj => obj.names, set: (obj, value) => { obj.names = value; } }, metadata: _metadata }, _names_initializers, _names_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NameComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NameComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <name-comp [names]="['Nancy', name, 'Ned']"></name-comp>
          <host-binding-comp></host-binding-comp>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _nameComp_decorators;
            let _nameComp_initializers = [];
            let _nameComp_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.nameComp = __runInitializers(this, _nameComp_initializers, void 0);
                    this.name = (__runInitializers(this, _nameComp_extraInitializers), '');
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _nameComp_decorators = [(0, core_1.ViewChild)(NameComp)];
                __esDecorate(null, null, _nameComp_decorators, { kind: "field", name: "nameComp", static: false, private: false, access: { has: obj => "nameComp" in obj, get: obj => obj.nameComp, set: (obj, value) => { obj.nameComp = value; } }, metadata: _metadata }, _nameComp_initializers, _nameComp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingComp, NameComp] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const nameComp = fixture.componentInstance.nameComp;
        const hostBindingEl = fixture.nativeElement.querySelector('host-binding-comp');
        fixture.componentInstance.name = 'Betty';
        fixture.detectChanges();
        expect(hostBindingEl.id).toBe('my-id');
        expect(nameComp.names).toEqual(['Nancy', 'Betty', 'Ned']);
        const firstArray = nameComp.names;
        fixture.detectChanges();
        expect(firstArray).toBe(nameComp.names);
        fixture.componentInstance.name = 'my-id';
        fixture.detectChanges();
        expect(hostBindingEl.id).toBe('my-id');
        expect(nameComp.names).toEqual(['Nancy', 'my-id', 'Ned']);
    });
    // Note: This is a contrived example. For feature parity with render2, we should make sure it
    // works in this way (see https://stackblitz.com/edit/angular-cbqpbe), but a more realistic
    // example would be an animation host binding with a literal defining the animation config.
    // When animation support is added, we should add another test for that case.
    it('should support host bindings that contain array literals', () => {
        let NameComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'name-comp',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _names_decorators;
            let _names_initializers = [];
            let _names_extraInitializers = [];
            var NameComp = _classThis = class {
                constructor() {
                    this.names = __runInitializers(this, _names_initializers, void 0);
                    __runInitializers(this, _names_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "NameComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _names_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _names_decorators, { kind: "field", name: "names", static: false, private: false, access: { has: obj => "names" in obj, get: obj => obj.names, set: (obj, value) => { obj.names = value; } }, metadata: _metadata }, _names_initializers, _names_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NameComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NameComp = _classThis;
        })();
        let HostBindingComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-binding-comp',
                    host: { '[id]': `['red', id]`, '[dir]': `dir`, '[title]': `[title, otherTitle]` },
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostBindingComp = _classThis = class {
                constructor() {
                    this.id = 'blue';
                    this.dir = 'ltr';
                    this.title = 'my title';
                    this.otherTitle = 'other title';
                }
            };
            __setFunctionName(_classThis, "HostBindingComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <name-comp [names]="[name, 'Nancy', otherName]"></name-comp>
          <host-binding-comp></host-binding-comp>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _hostBindingComp_decorators;
            let _hostBindingComp_initializers = [];
            let _hostBindingComp_extraInitializers = [];
            let _nameComp_decorators;
            let _nameComp_initializers = [];
            let _nameComp_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.hostBindingComp = __runInitializers(this, _hostBindingComp_initializers, void 0);
                    this.nameComp = (__runInitializers(this, _hostBindingComp_extraInitializers), __runInitializers(this, _nameComp_initializers, void 0));
                    this.name = (__runInitializers(this, _nameComp_extraInitializers), '');
                    this.otherName = '';
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _hostBindingComp_decorators = [(0, core_1.ViewChild)(HostBindingComp)];
                _nameComp_decorators = [(0, core_1.ViewChild)(NameComp)];
                __esDecorate(null, null, _hostBindingComp_decorators, { kind: "field", name: "hostBindingComp", static: false, private: false, access: { has: obj => "hostBindingComp" in obj, get: obj => obj.hostBindingComp, set: (obj, value) => { obj.hostBindingComp = value; } }, metadata: _metadata }, _hostBindingComp_initializers, _hostBindingComp_extraInitializers);
                __esDecorate(null, null, _nameComp_decorators, { kind: "field", name: "nameComp", static: false, private: false, access: { has: obj => "nameComp" in obj, get: obj => obj.nameComp, set: (obj, value) => { obj.nameComp = value; } }, metadata: _metadata }, _nameComp_initializers, _nameComp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingComp, NameComp] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const { nameComp, hostBindingComp } = fixture.componentInstance;
        fixture.componentInstance.name = 'Frank';
        fixture.componentInstance.otherName = 'Joe';
        fixture.detectChanges();
        const hostBindingEl = fixture.nativeElement.querySelector('host-binding-comp');
        expect(hostBindingEl.id).toBe('red,blue');
        expect(hostBindingEl.dir).toBe('ltr');
        expect(hostBindingEl.title).toBe('my title,other title');
        expect(nameComp.names).toEqual(['Frank', 'Nancy', 'Joe']);
        const firstArray = nameComp.names;
        fixture.detectChanges();
        expect(firstArray).toBe(nameComp.names);
        hostBindingComp.id = 'green';
        hostBindingComp.dir = 'rtl';
        hostBindingComp.title = 'TITLE';
        fixture.detectChanges();
        expect(hostBindingEl.id).toBe('red,green');
        expect(hostBindingEl.dir).toBe('rtl');
        expect(hostBindingEl.title).toBe('TITLE,other title');
    });
    it('should support directives with and without allocHostVars on the same component', () => {
        let events = [];
        let HostBindingDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[hostDir]',
                    host: { '[title]': `[title, 'other title']` },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostBindingDir = _classThis = class {
                constructor() {
                    this.title = 'my title';
                }
            };
            __setFunctionName(_classThis, "HostBindingDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingDir = _classThis;
        })();
        let HostListenerDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[hostListenerDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _onClick_decorators;
            var HostListenerDir = _classThis = class {
                onClick() {
                    events.push('click!');
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "HostListenerDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _onClick_decorators = [(0, core_1.HostListener)('click')];
                __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostListenerDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostListenerDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button hostListenerDir hostDir>Click</button>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingDir, HostListenerDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        expect(events).toEqual(['click!']);
        expect(button.title).toEqual('my title,other title');
    });
    it('should support host bindings with literals from multiple directives', () => {
        let HostBindingComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-binding-comp',
                    host: { '[id]': `['red', id]` },
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostBindingComp = _classThis = class {
                constructor() {
                    this.id = 'blue';
                }
            };
            __setFunctionName(_classThis, "HostBindingComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingComp = _classThis;
        })();
        let HostBindingDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[hostDir]',
                    host: { '[title]': `[title, 'other title']` },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostBindingDir = _classThis = class {
                constructor() {
                    this.title = 'my title';
                }
            };
            __setFunctionName(_classThis, "HostBindingDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<host-binding-comp hostDir></host-binding-comp>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _hostBindingComp_decorators;
            let _hostBindingComp_initializers = [];
            let _hostBindingComp_extraInitializers = [];
            let _hostBindingDir_decorators;
            let _hostBindingDir_initializers = [];
            let _hostBindingDir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.hostBindingComp = __runInitializers(this, _hostBindingComp_initializers, void 0);
                    this.hostBindingDir = (__runInitializers(this, _hostBindingComp_extraInitializers), __runInitializers(this, _hostBindingDir_initializers, void 0));
                    __runInitializers(this, _hostBindingDir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _hostBindingComp_decorators = [(0, core_1.ViewChild)(HostBindingComp)];
                _hostBindingDir_decorators = [(0, core_1.ViewChild)(HostBindingDir)];
                __esDecorate(null, null, _hostBindingComp_decorators, { kind: "field", name: "hostBindingComp", static: false, private: false, access: { has: obj => "hostBindingComp" in obj, get: obj => obj.hostBindingComp, set: (obj, value) => { obj.hostBindingComp = value; } }, metadata: _metadata }, _hostBindingComp_initializers, _hostBindingComp_extraInitializers);
                __esDecorate(null, null, _hostBindingDir_decorators, { kind: "field", name: "hostBindingDir", static: false, private: false, access: { has: obj => "hostBindingDir" in obj, get: obj => obj.hostBindingDir, set: (obj, value) => { obj.hostBindingDir = value; } }, metadata: _metadata }, _hostBindingDir_initializers, _hostBindingDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingComp, HostBindingDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.querySelector('host-binding-comp');
        expect(hostElement.id).toBe('red,blue');
        expect(hostElement.title).toBe('my title,other title');
        fixture.componentInstance.hostBindingDir.title = 'blue';
        fixture.detectChanges();
        expect(hostElement.title).toBe('blue,other title');
        fixture.componentInstance.hostBindingComp.id = 'green';
        fixture.detectChanges();
        expect(hostElement.id).toBe('red,green');
    });
    it('should support ternary expressions in host bindings', () => {
        let HostBindingComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-binding-comp',
                    template: '',
                    host: {
                        // Use `attr` since IE doesn't support the `title` property on all elements.
                        '[attr.id]': `condition ? ['red', id] : 'green'`,
                        '[attr.title]': `otherCondition ? [title] : 'other title'`,
                    },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostBindingComp = _classThis = class {
                constructor() {
                    this.condition = true;
                    this.otherCondition = true;
                    this.id = 'blue';
                    this.title = 'blue';
                }
            };
            __setFunctionName(_classThis, "HostBindingComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<host-binding-comp></host-binding-comp>{{ name }}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _hostBindingComp_decorators;
            let _hostBindingComp_initializers = [];
            let _hostBindingComp_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.hostBindingComp = __runInitializers(this, _hostBindingComp_initializers, void 0);
                    this.name = (__runInitializers(this, _hostBindingComp_extraInitializers), '');
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _hostBindingComp_decorators = [(0, core_1.ViewChild)(HostBindingComp)];
                __esDecorate(null, null, _hostBindingComp_decorators, { kind: "field", name: "hostBindingComp", static: false, private: false, access: { has: obj => "hostBindingComp" in obj, get: obj => obj.hostBindingComp, set: (obj, value) => { obj.hostBindingComp = value; } }, metadata: _metadata }, _hostBindingComp_initializers, _hostBindingComp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingComp] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.querySelector('host-binding-comp');
        fixture.componentInstance.name = 'Ned';
        fixture.detectChanges();
        expect(hostElement.id).toBe('red,blue');
        expect(hostElement.title).toBe('blue');
        expect(fixture.nativeElement.innerHTML.endsWith('Ned')).toBe(true);
        fixture.componentInstance.hostBindingComp.condition = false;
        fixture.componentInstance.hostBindingComp.title = 'TITLE';
        fixture.detectChanges();
        expect(hostElement.id).toBe('green');
        expect(hostElement.title).toBe('TITLE');
        fixture.componentInstance.hostBindingComp.otherCondition = false;
        fixture.detectChanges();
        expect(hostElement.id).toBe('green');
        expect(hostElement.title).toBe('other title');
    });
    it('should merge attributes on host and template', () => {
        let MyDir1 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir1]',
                    host: { id: 'dir1' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir1 = _classThis = class {
            };
            __setFunctionName(_classThis, "MyDir1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir1 = _classThis;
        })();
        let MyDir2 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir2]',
                    host: { id: 'dir2' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir2 = _classThis = class {
            };
            __setFunctionName(_classThis, "MyDir2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir2 = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div dir1 dir2 id="tmpl"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir1, MyDir2] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const div = fixture.debugElement.nativeElement.firstChild;
        expect(div.id).toEqual('tmpl');
    });
    it('should work correctly with inherited directives with hostBindings', () => {
        let SuperDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[superDir]',
                    host: { '[id]': 'id' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SuperDirective = _classThis = class {
                constructor() {
                    this.id = 'my-id';
                }
            };
            __setFunctionName(_classThis, "SuperDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SuperDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SuperDirective = _classThis;
        })();
        let SubDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[subDir]',
                    host: { '[title]': 'title' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = SuperDirective;
            var SubDirective = _classThis = class extends _classSuper {
                constructor() {
                    super(...arguments);
                    this.title = 'my-title';
                }
            };
            __setFunctionName(_classThis, "SubDirective");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubDirective = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div subDir></div>
        <div superDir></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _subDir_decorators;
            let _subDir_initializers = [];
            let _subDir_extraInitializers = [];
            let _superDir_decorators;
            let _superDir_initializers = [];
            let _superDir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.subDir = __runInitializers(this, _subDir_initializers, void 0);
                    this.superDir = (__runInitializers(this, _subDir_extraInitializers), __runInitializers(this, _superDir_initializers, void 0));
                    __runInitializers(this, _superDir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _subDir_decorators = [(0, core_1.ViewChild)(SubDirective)];
                _superDir_decorators = [(0, core_1.ViewChild)(SuperDirective)];
                __esDecorate(null, null, _subDir_decorators, { kind: "field", name: "subDir", static: false, private: false, access: { has: obj => "subDir" in obj, get: obj => obj.subDir, set: (obj, value) => { obj.subDir = value; } }, metadata: _metadata }, _subDir_initializers, _subDir_extraInitializers);
                __esDecorate(null, null, _superDir_decorators, { kind: "field", name: "superDir", static: false, private: false, access: { has: obj => "superDir" in obj, get: obj => obj.superDir, set: (obj, value) => { obj.superDir = value; } }, metadata: _metadata }, _superDir_initializers, _superDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, SuperDirective, SubDirective] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const els = fixture.nativeElement.querySelectorAll('div');
        const firstDivEl = els[0];
        const secondDivEl = els[1];
        // checking first div element with inherited directive
        expect(firstDivEl.id).toEqual('my-id');
        expect(firstDivEl.title).toEqual('my-title');
        fixture.componentInstance.subDir.title = 'new-title';
        fixture.detectChanges();
        expect(firstDivEl.id).toEqual('my-id');
        expect(firstDivEl.title).toEqual('new-title');
        fixture.componentInstance.subDir.id = 'new-id';
        fixture.detectChanges();
        expect(firstDivEl.id).toEqual('new-id');
        expect(firstDivEl.title).toEqual('new-title');
        // checking second div element with simple directive
        expect(secondDivEl.id).toEqual('my-id');
        fixture.componentInstance.superDir.id = 'new-id';
        fixture.detectChanges();
        expect(secondDivEl.id).toEqual('new-id');
    });
    it('should support host attributes', () => {
        let HostAttributeDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[hostAttributeDir]',
                    host: { 'role': 'listbox' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostAttributeDir = _classThis = class {
            };
            __setFunctionName(_classThis, "HostAttributeDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostAttributeDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostAttributeDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div hostAttributeDir></div>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostAttributeDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        expect(fixture.nativeElement.innerHTML).toContain(`role="listbox"`);
    });
    it('should support content children in host bindings', () => {
        let HostBindingWithContentChildren = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-binding-comp',
                    template: '<ng-content></ng-content>',
                    host: { '[id]': 'foos.length' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _foos_decorators;
            let _foos_initializers = [];
            let _foos_extraInitializers = [];
            var HostBindingWithContentChildren = _classThis = class {
                constructor() {
                    this.foos = __runInitializers(this, _foos_initializers, void 0);
                    __runInitializers(this, _foos_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "HostBindingWithContentChildren");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _foos_decorators = [(0, core_1.ContentChildren)('foo')];
                __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingWithContentChildren = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingWithContentChildren = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <host-binding-comp>
            <div #foo></div>
            <div #foo></div>
          </host-binding-comp>
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingWithContentChildren] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const hostBindingEl = fixture.nativeElement.querySelector('host-binding-comp');
        expect(hostBindingEl.id).toEqual('2');
    });
    it('should support host bindings dependent on content hooks', () => {
        let HostBindingWithContentHooks = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-binding-comp',
                    template: '',
                    host: { '[id]': 'myValue' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostBindingWithContentHooks = _classThis = class {
                constructor() {
                    this.myValue = 'initial';
                }
                ngAfterContentInit() {
                    this.myValue = 'after-content';
                }
            };
            __setFunctionName(_classThis, "HostBindingWithContentHooks");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostBindingWithContentHooks = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostBindingWithContentHooks = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<host-binding-comp></host-binding-comp>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingWithContentHooks] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const hostBindingEl = fixture.nativeElement.querySelector('host-binding-comp');
        expect(hostBindingEl.id).toEqual('after-content');
    });
    describe('styles', () => {
        it('should bind to host styles', () => {
            let HostBindingToStyles = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'host-binding-to-styles',
                        host: { '[style.width.px]': 'width' },
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostBindingToStyles = _classThis = class {
                    constructor() {
                        this.width = 2;
                    }
                };
                __setFunctionName(_classThis, "HostBindingToStyles");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostBindingToStyles = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostBindingToStyles = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<host-binding-to-styles></host-binding-to-styles>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostBindingDir_decorators;
                let _hostBindingDir_initializers = [];
                let _hostBindingDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostBindingDir = __runInitializers(this, _hostBindingDir_initializers, void 0);
                        __runInitializers(this, _hostBindingDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostBindingDir_decorators = [(0, core_1.ViewChild)(HostBindingToStyles)];
                    __esDecorate(null, null, _hostBindingDir_decorators, { kind: "field", name: "hostBindingDir", static: false, private: false, access: { has: obj => "hostBindingDir" in obj, get: obj => obj.hostBindingDir, set: (obj, value) => { obj.hostBindingDir = value; } }, metadata: _metadata }, _hostBindingDir_initializers, _hostBindingDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingToStyles] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const hostBindingEl = fixture.nativeElement.querySelector('host-binding-to-styles');
            expect(hostBindingEl.style.width).toEqual('2px');
            fixture.componentInstance.hostBindingDir.width = 5;
            fixture.detectChanges();
            expect(hostBindingEl.style.width).toEqual('5px');
        });
        it('should bind to host styles on containers', () => {
            let HostBindingToStyles = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[hostStyles]',
                        host: { '[style.width.px]': 'width' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostBindingToStyles = _classThis = class {
                    constructor() {
                        this.width = 2;
                    }
                };
                __setFunctionName(_classThis, "HostBindingToStyles");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostBindingToStyles = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostBindingToStyles = _classThis;
            })();
            let ContainerDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[containerDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ContainerDir = _classThis = class {
                    constructor(vcr) {
                        this.vcr = vcr;
                    }
                };
                __setFunctionName(_classThis, "ContainerDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContainerDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContainerDir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div hostStyles containerDir></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostBindingDir_decorators;
                let _hostBindingDir_initializers = [];
                let _hostBindingDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostBindingDir = __runInitializers(this, _hostBindingDir_initializers, void 0);
                        __runInitializers(this, _hostBindingDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostBindingDir_decorators = [(0, core_1.ViewChild)(HostBindingToStyles)];
                    __esDecorate(null, null, _hostBindingDir_decorators, { kind: "field", name: "hostBindingDir", static: false, private: false, access: { has: obj => "hostBindingDir" in obj, get: obj => obj.hostBindingDir, set: (obj, value) => { obj.hostBindingDir = value; } }, metadata: _metadata }, _hostBindingDir_initializers, _hostBindingDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, HostBindingToStyles, ContainerDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const hostBindingEl = fixture.nativeElement.querySelector('div');
            expect(hostBindingEl.style.width).toEqual('2px');
            fixture.componentInstance.hostBindingDir.width = 5;
            fixture.detectChanges();
            expect(hostBindingEl.style.width).toEqual('5px');
        });
        it('should apply static host classes', () => {
            let StaticHostClass = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'static-host-class',
                        host: { 'class': 'mat-toolbar' },
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StaticHostClass = _classThis = class {
                };
                __setFunctionName(_classThis, "StaticHostClass");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StaticHostClass = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StaticHostClass = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<static-host-class></static-host-class>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, StaticHostClass] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const hostBindingEl = fixture.nativeElement.querySelector('static-host-class');
            expect(hostBindingEl.className).toEqual('mat-toolbar');
        });
    });
    describe('sanitization', () => {
        function identity(value) {
            return value;
        }
        function verify(tag, prop, value, expectedSanitizedValue, bypassFn, isAttribute = true, throws = false) {
            it(`should sanitize <${tag} ${prop}> ${isAttribute ? 'properties' : 'attributes'}`, () => {
                let UnsafeDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[unsafeUrlHostBindingDir]',
                            host: {
                                [`[${isAttribute ? 'attr.' : ''}${prop}]`]: 'value',
                            },
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var UnsafeDir = _classThis = class {
                        constructor() {
                            this.value = value;
                        }
                    };
                    __setFunctionName(_classThis, "UnsafeDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        UnsafeDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return UnsafeDir = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<${tag} unsafeUrlHostBindingDir></${tag}>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _unsafeDir_decorators;
                    let _unsafeDir_initializers = [];
                    let _unsafeDir_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.unsafeDir = __runInitializers(this, _unsafeDir_initializers, void 0);
                            __runInitializers(this, _unsafeDir_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _unsafeDir_decorators = [(0, core_1.ViewChild)(UnsafeDir)];
                        __esDecorate(null, null, _unsafeDir_decorators, { kind: "field", name: "unsafeDir", static: false, private: false, access: { has: obj => "unsafeDir" in obj, get: obj => obj.unsafeDir, set: (obj, value) => { obj.unsafeDir = value; } }, metadata: _metadata }, _unsafeDir_initializers, _unsafeDir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [App, UnsafeDir] });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const el = fixture.nativeElement.querySelector(tag);
                const current = () => (isAttribute ? el.getAttribute(prop) : el[prop]);
                fixture.componentInstance.unsafeDir.value = value;
                fixture.detectChanges();
                expect(current()).toEqual(expectedSanitizedValue);
                fixture.componentInstance.unsafeDir.value = bypassFn(value);
                if (throws) {
                    expect(() => fixture.detectChanges()).toThrowError(/Required a safe URL, got a \w+/);
                }
                else {
                    fixture.detectChanges();
                    expect(current()).toEqual(bypassFn == identity ? expectedSanitizedValue : value);
                }
            });
        }
        verify('a', 'href', 'javascript:alert(1)', 'unsafe:javascript:alert(1)', bypass_1.bypassSanitizationTrustUrl);
        verify('a', 'href', 'javascript:alert(1.1)', 'unsafe:javascript:alert(1.1)', identity);
        verify('a', 'href', 'javascript:alert(1.2)', 'unsafe:javascript:alert(1.2)', bypass_1.bypassSanitizationTrustStyle, true, true);
        verify('blockquote', 'cite', 'javascript:alert(2)', 'unsafe:javascript:alert(2)', bypass_1.bypassSanitizationTrustUrl);
        verify('blockquote', 'cite', 'javascript:alert(2.1)', 'unsafe:javascript:alert(2.1)', identity);
        verify('blockquote', 'cite', 'javascript:alert(2.2)', 'unsafe:javascript:alert(2.2)', bypass_1.bypassSanitizationTrustHtml, true, true);
        verify('b', 'innerHTML', '<img src="javascript:alert(3)">', '<img src="unsafe:javascript:alert(3)">', bypass_1.bypassSanitizationTrustHtml, 
        /* isAttribute */ false);
    });
    describe('host binding on containers', () => {
        let StaticHostAttr = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[staticHostAtt]',
                    host: { 'static': 'attr' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StaticHostAttr = _classThis = class {
                constructor() { }
            };
            __setFunctionName(_classThis, "StaticHostAttr");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StaticHostAttr = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StaticHostAttr = _classThis;
        })();
        let DynamicHostAttr = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dynamicHostAtt]',
                    host: { '[attr.dynamic]': '"dynamic"' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicHostAttr = _classThis = class {
                constructor() { }
            };
            __setFunctionName(_classThis, "DynamicHostAttr");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicHostAttr = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicHostAttr = _classThis;
        })();
        it('should fail with expected error with ng-container', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: `
          <ng-template #ref></ng-template>
          <ng-container [ngTemplateOutlet]="ref" staticHostAtt dynamicHostAtt></ng-container>
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
            const comp = testing_1.TestBed.configureTestingModule({
                declarations: [App, StaticHostAttr, DynamicHostAttr],
            }).createComponent(App);
            // TODO(FW-2202): binding static attrs won't throw an error. We should be more consistent.
            expect(() => comp.detectChanges()).toThrowError(/Attempted to set attribute `dynamic` on a container node. Host bindings are not valid on ng-container or ng-template./);
        });
        it('should fail with expected error with ng-template', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: ` <ng-template staticHostAtt dynamicHostAtt></ng-template> `,
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
            const comp = testing_1.TestBed.configureTestingModule({
                declarations: [App, StaticHostAttr, DynamicHostAttr],
            }).createComponent(App);
            // TODO(FW-2202): binding static attrs won't throw an error. We should be more consistent.
            expect(() => comp.detectChanges()).toThrowError(/Attempted to set attribute `dynamic` on a container node. Host bindings are not valid on ng-container or ng-template./);
        });
    });
    describe('host bindings on edge case properties', () => {
        it('should handle host bindings with the same name as a primitive value', () => {
            let MyDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        host: {
                            '[class.a]': 'true',
                            '[class.b]': 'false',
                        },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _true_decorators;
                let _true_initializers = [];
                let _true_extraInitializers = [];
                let _false_decorators;
                let _false_initializers = [];
                let _false_extraInitializers = [];
                var MyDirective = _classThis = class {
                    constructor() {
                        this.true = __runInitializers(this, _true_initializers, void 0);
                        this.false = (__runInitializers(this, _true_extraInitializers), __runInitializers(this, _false_initializers, void 0));
                        __runInitializers(this, _false_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _true_decorators = [(0, core_1.HostBinding)('class.c')];
                    _false_decorators = [(0, core_1.HostBinding)('class.d')];
                    __esDecorate(null, null, _true_decorators, { kind: "field", name: "true", static: false, private: false, access: { has: obj => "true" in obj, get: obj => obj.true, set: (obj, value) => { obj.true = value; } }, metadata: _metadata }, _true_initializers, _true_extraInitializers);
                    __esDecorate(null, null, _false_decorators, { kind: "field", name: "false", static: false, private: false, access: { has: obj => "false" in obj, get: obj => obj.false, set: (obj, value) => { obj.false = value; } }, metadata: _metadata }, _false_initializers, _false_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDirective = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<span dir></span>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var MyApp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(MyDirective)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyDirective] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            const span = fixture.nativeElement.querySelector('span');
            expect(span.className).toBe('a');
            fixture.componentInstance.dir.true = 1;
            fixture.componentInstance.dir.false = 2;
            fixture.detectChanges();
            expect(span.className).toBe('a c d');
        });
        it('should handle host bindings with quoted names', () => {
            let MyDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _member_decorators;
                let _member_initializers = [];
                let _member_extraInitializers = [];
                let _member_decorators_1;
                let _member_initializers_1 = [];
                let _member_extraInitializers_1 = [];
                let _member_decorators_2;
                let _member_initializers_2 = [];
                let _member_extraInitializers_2 = [];
                var MyDirective = _classThis = class {
                    constructor() {
                        this['is-a'] = __runInitializers(this, _member_initializers, void 0);
                        this['is-"b"'] = (__runInitializers(this, _member_extraInitializers), __runInitializers(this, _member_initializers_1, true));
                        this['"is-c"'] = (__runInitializers(this, _member_extraInitializers_1), __runInitializers(this, _member_initializers_2, void 0));
                        __runInitializers(this, _member_extraInitializers_2);
                    }
                };
                __setFunctionName(_classThis, "MyDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _member_decorators = [(0, core_1.HostBinding)('class.a')];
                    _member_decorators_1 = [(0, core_1.HostBinding)('class.b')];
                    _member_decorators_2 = [(0, core_1.HostBinding)('class.c')];
                    __esDecorate(null, null, _member_decorators, { kind: "field", name: 'is-a', static: false, private: false, access: { has: obj => 'is-a' in obj, get: obj => obj['is-a'], set: (obj, value) => { obj['is-a'] = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
                    __esDecorate(null, null, _member_decorators_1, { kind: "field", name: 'is-"b"', static: false, private: false, access: { has: obj => 'is-"b"' in obj, get: obj => obj['is-"b"'], set: (obj, value) => { obj['is-"b"'] = value; } }, metadata: _metadata }, _member_initializers_1, _member_extraInitializers_1);
                    __esDecorate(null, null, _member_decorators_2, { kind: "field", name: '"is-c"', static: false, private: false, access: { has: obj => '"is-c"' in obj, get: obj => obj['"is-c"'], set: (obj, value) => { obj['"is-c"'] = value; } }, metadata: _metadata }, _member_initializers_2, _member_extraInitializers_2);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDirective = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<span dir></span>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var MyApp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(MyDirective)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyDirective] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            const span = fixture.nativeElement.querySelector('span');
            expect(span.className).toBe('b');
            fixture.componentInstance.dir['is-a'] = 1;
            fixture.componentInstance.dir['"is-c"'] = 2;
            fixture.detectChanges();
            expect(span.className).toBe('b a c');
        });
    });
});
