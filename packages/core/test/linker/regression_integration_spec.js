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
exports.FakeRecursiveComp = void 0;
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('regressions', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp1, PlatformPipe] });
    });
    describe('platform pipes', () => {
        it('should overwrite them by custom pipes', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [CustomPipe] });
            const template = '{{true | somePipe}}';
            testing_1.TestBed.overrideComponent(MyComp1, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp1);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('someCustomPipe');
        });
    });
    describe('expressions', () => {
        it('should evaluate conditional and boolean operators with right precedence - #8244', () => {
            const template = `{{'red' + (true ? ' border' : '')}}`;
            testing_1.TestBed.overrideComponent(MyComp1, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp1);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('red border');
        });
        it('should evaluate conditional and unary operators with right precedence - #8235', () => {
            const template = `{{!null?.length}}`;
            testing_1.TestBed.overrideComponent(MyComp1, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp1);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('true');
        });
        it('should only evaluate stateful pipes once - #10639', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [CountingPipe] });
            const template = '{{(null|countingPipe)?.value}}';
            testing_1.TestBed.overrideComponent(MyComp1, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyComp1);
            CountingPipe.reset();
            fixture.detectChanges(/* checkNoChanges */ false);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('counting pipe value');
            (0, matchers_1.expect)(CountingPipe.calls).toBe(1);
        });
        it('should only update the bound property when using asyncPipe - #15205', (0, testing_1.fakeAsync)(() => {
            var _a;
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div myDir [a]="p | async" [b]="2"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.p = Promise.resolve(1);
                    }
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
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[myDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_a_decorators;
                let _set_b_decorators;
                var MyDir = _classThis = class {
                    constructor() {
                        this.setterCalls = (__runInitializers(this, _instanceExtraInitializers), {});
                    }
                    set a(v) {
                        this.setterCalls['a'] = v;
                    }
                    set b(v) {
                        this.setterCalls['b'] = v;
                    }
                    ngOnChanges(changes) {
                        this.changes = changes;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_a_decorators = [(0, core_1.Input)()];
                    _set_b_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_a_decorators, { kind: "setter", name: "a", static: false, private: false, access: { has: obj => "a" in obj, set: (obj, value) => { obj.a = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(_classThis, null, _set_b_decorators, { kind: "setter", name: "b", static: false, private: false, access: { has: obj => "b" in obj, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            const dir = fixture.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
            fixture.detectChanges();
            (0, matchers_1.expect)(dir.setterCalls).toEqual({ 'a': null, 'b': 2 });
            (0, matchers_1.expect)(Object.keys((_a = dir.changes) !== null && _a !== void 0 ? _a : {})).toEqual(['a', 'b']);
            dir.setterCalls = {};
            dir.changes = {};
            (0, testing_1.tick)();
            fixture.detectChanges();
            (0, matchers_1.expect)(dir.setterCalls).toEqual({ 'a': 1 });
            (0, matchers_1.expect)(Object.keys(dir.changes)).toEqual(['a']);
        }));
        it('should only evaluate methods once - #10639', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyCountingComp] });
            const template = '{{method()?.value}}';
            testing_1.TestBed.overrideComponent(MyCountingComp, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(MyCountingComp);
            MyCountingComp.reset();
            fixture.detectChanges(/* checkNoChanges */ false);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('counting method value');
            (0, matchers_1.expect)(MyCountingComp.calls).toBe(1);
        });
        it('should evaluate a conditional in a statement binding', () => {
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'some-comp',
                        template: '<p (click)="nullValue?.click()"></p>',
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
            class SomeReferencedClass {
                click() { }
            }
            (0, matchers_1.expect)(() => {
                const fixture = testing_1.TestBed.configureTestingModule({
                    declarations: [SomeComponent],
                }).createComponent(SomeComponent);
                fixture.detectChanges(/* checkNoChanges */ false);
            }).not.toThrow();
        });
    });
    describe('providers', () => {
        function createInjector(providers) {
            testing_1.TestBed.overrideComponent(MyComp1, { add: { providers } });
            return testing_1.TestBed.createComponent(MyComp1).componentInstance.injector;
        }
        it('should support providers with an InjectionToken that contains a `.` in the name', () => {
            const token = new core_1.InjectionToken('a.b');
            const tokenValue = 1;
            const injector = createInjector([{ provide: token, useValue: tokenValue }]);
            (0, matchers_1.expect)(injector.get(token)).toEqual(tokenValue);
        });
        it('should support providers with string token with a `.` in it', () => {
            const token = 'a.b';
            const tokenValue = 1;
            const injector = createInjector([{ provide: token, useValue: tokenValue }]);
            (0, matchers_1.expect)(injector.get(token)).toEqual(tokenValue);
        });
        it('should support providers with an anonymous function as token', () => {
            const token = () => true;
            const tokenValue = 1;
            const injector = createInjector([{ provide: token, useValue: tokenValue }]);
            (0, matchers_1.expect)(injector.get(token)).toEqual(tokenValue);
        });
        it('should support providers with an InjectionToken that has a StringMap as value', () => {
            const token1 = new core_1.InjectionToken('someToken');
            const token2 = new core_1.InjectionToken('someToken');
            const tokenValue1 = { 'a': 1 };
            const tokenValue2 = { 'a': 1 };
            const injector = createInjector([
                { provide: token1, useValue: tokenValue1 },
                { provide: token2, useValue: tokenValue2 },
            ]);
            (0, matchers_1.expect)(injector.get(token1)).toEqual(tokenValue1);
            (0, matchers_1.expect)(injector.get(token2)).toEqual(tokenValue2);
        });
        it('should support providers that have a `name` property with a number value', () => {
            class TestClass {
                constructor(name) {
                    this.name = name;
                }
            }
            const data = [new TestClass(1), new TestClass(2)];
            const injector = createInjector([{ provide: 'someToken', useValue: data }]);
            (0, matchers_1.expect)(injector.get('someToken')).toEqual(data);
        });
    });
    it('should allow logging a previous elements class binding via interpolation', () => {
        const template = `<div [class.a]="true" #el>Class: {{el.className}}</div>`;
        testing_1.TestBed.overrideComponent(MyComp1, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(MyComp1);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Class: a');
    });
    it('should support ngClass before a component and content projection inside of an ngIf', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [CmpWithNgContent] });
        const template = `A<cmp-content *ngIf="true" [ngClass]="'red'">B</cmp-content>C`;
        testing_1.TestBed.overrideComponent(MyComp1, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(MyComp1);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('ABC');
    });
    it('should handle mutual recursion entered from multiple sides - #7084', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [FakeRecursiveComp, LeftComp, RightComp] });
        const fixture = testing_1.TestBed.createComponent(FakeRecursiveComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('[]');
    });
    it('should generate the correct output when constructors have the same name', () => {
        function ComponentFactory(selector, template) {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector,
                        template,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComponent = _classThis;
            })();
            return MyComponent;
        }
        const HeroComponent = ComponentFactory('my-hero', 'my hero');
        const VillainComponent = ComponentFactory('a-villain', 'a villain');
        const MainComponent = ComponentFactory('my-app', 'I was saved by <my-hero></my-hero> from <a-villain></a-villain>.');
        testing_1.TestBed.configureTestingModule({
            declarations: [HeroComponent, VillainComponent, MainComponent],
        });
        const fixture = testing_1.TestBed.createComponent(MainComponent);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('I was saved by my hero from a villain.');
    });
    it('should allow to use the renderer outside of views', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(renderer) {
                    this.renderer = renderer;
                }
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
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
        const ctx = testing_1.TestBed.createComponent(MyComp);
        const txtNode = ctx.componentInstance.renderer.createText('test');
        (0, matchers_1.expect)(txtNode).toHaveText('test');
    });
    it('should not recreate TemplateRef references during dirty checking', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [someDir]="someRef"></div><ng-template #someRef></ng-template>',
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
        let MyDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[someDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var MyDir = _classThis = class {
                constructor() {
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    __runInitializers(this, _template_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.Input)('someDir')];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir] }).createComponent(MyComp);
        const dir = ctx.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
        (0, matchers_1.expect)(dir.template).toBeUndefined();
        ctx.detectChanges();
        const template = dir.template;
        (0, matchers_1.expect)(template).toBeDefined();
        ctx.detectChanges();
        (0, matchers_1.expect)(dir.template).toBe(template);
    });
    it('should not recreate ViewContainerRefs in queries', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div #vc></div><div *ngIf="show" #vc></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _viewContainers_decorators;
            let _viewContainers_initializers = [];
            let _viewContainers_extraInitializers = [];
            var MyComp = _classThis = class {
                constructor() {
                    this.viewContainers = __runInitializers(this, _viewContainers_initializers, void 0);
                    this.show = (__runInitializers(this, _viewContainers_extraInitializers), true);
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _viewContainers_decorators = [(0, core_1.ViewChildren)('vc', { read: core_1.ViewContainerRef })];
                __esDecorate(null, null, _viewContainers_decorators, { kind: "field", name: "viewContainers", static: false, private: false, access: { has: obj => "viewContainers" in obj, get: obj => obj.viewContainers, set: (obj, value) => { obj.viewContainers = value; } }, metadata: _metadata }, _viewContainers_initializers, _viewContainers_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
        ctx.componentInstance.show = true;
        ctx.detectChanges();
        (0, matchers_1.expect)(ctx.componentInstance.viewContainers.length).toBe(2);
        const vc = ctx.componentInstance.viewContainers.first;
        (0, matchers_1.expect)(vc).toBeDefined();
        ctx.componentInstance.show = false;
        ctx.detectChanges();
        (0, matchers_1.expect)(ctx.componentInstance.viewContainers.first).toBe(vc);
    });
    it('should not throw when encountering an empty class attribute', () => {
        const template = '<div class=""></div>';
        testing_1.TestBed.overrideComponent(MyComp1, { set: { template } });
        (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(MyComp1)).not.toThrow();
    });
    describe('empty templates - #15143', () => {
        it('should allow empty components', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
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
            const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.childNodes.length).toBe(0);
        });
    });
    it('should throw if @ContentChild and @Input are on the same property', () => {
        let Test = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'test',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _tpl_decorators;
            let _tpl_initializers = [];
            let _tpl_extraInitializers = [];
            var Test = _classThis = class {
                constructor() {
                    this.tpl = __runInitializers(this, _tpl_initializers, void 0);
                    __runInitializers(this, _tpl_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Test");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _tpl_decorators = [(0, core_1.Input)(), (0, core_1.ContentChild)(core_1.TemplateRef, { static: true })];
                __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Test = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Test = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-app',
                    template: `<test></test>`,
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
        (0, matchers_1.expect)(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [App, Test] }).createComponent(App);
        }).toThrowError(/Cannot combine @Input decorators with query decorators/);
    });
    it('should not add ng-version for dynamically created components', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
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
        const compRef = (0, core_1.createComponent)(App, {
            environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
        });
        (0, matchers_1.expect)(compRef.location.nativeElement.hasAttribute('ng-version')).toBe(false);
        compRef.destroy();
    });
});
describe('regressions using bootstrap', () => {
    const COMP_SELECTOR = 'root-comp';
    class MockConsole {
        constructor() {
            this.errors = [];
        }
        error(...s) {
            this.errors.push(s);
        }
    }
    let logger;
    let errorHandler;
    beforeEach((0, testing_1.inject)([common_1.DOCUMENT], (doc) => {
        (0, core_1.destroyPlatform)();
        const el = (0, common_1.ɵgetDOM)().createElement(COMP_SELECTOR, doc);
        doc.body.appendChild(el);
        logger = new MockConsole();
        errorHandler = new core_1.ErrorHandler();
        errorHandler._console = logger;
    }));
    afterEach(() => {
        (0, core_1.destroyPlatform)();
    });
    if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
        // This test needs a real DOM....
        it('should keep change detecting if there was an error', (done) => {
            let ErrorComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: COMP_SELECTOR,
                        template: '<button (click)="next()"></button><button (click)="nextAndThrow()"></button><button (dirClick)="nextAndThrow()"></button><span>Value:{{value}}</span><span>{{throwIfNeeded()}}</span>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ErrorComp = _classThis = class {
                    constructor() {
                        this.value = 0;
                        this.thrownValue = 0;
                    }
                    next() {
                        this.value++;
                    }
                    nextAndThrow() {
                        this.value++;
                        this.throwIfNeeded();
                    }
                    throwIfNeeded() {
                        core_1.NgZone.assertInAngularZone();
                        if (this.thrownValue !== this.value) {
                            this.thrownValue = this.value;
                            throw new Error(`Error: ${this.value}`);
                        }
                    }
                };
                __setFunctionName(_classThis, "ErrorComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ErrorComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ErrorComp = _classThis;
            })();
            let EventDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirClick]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _dirClick_decorators;
                let _dirClick_initializers = [];
                let _dirClick_extraInitializers = [];
                let _onClick_decorators;
                var EventDir = _classThis = class {
                    onClick(event) {
                        this.dirClick.next(event);
                    }
                    constructor() {
                        this.dirClick = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _dirClick_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _dirClick_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "EventDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dirClick_decorators = [(0, core_1.Output)()];
                    _onClick_decorators = [(0, core_1.HostListener)('click', ['$event'])];
                    __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _dirClick_decorators, { kind: "field", name: "dirClick", static: false, private: false, access: { has: obj => "dirClick" in obj, get: obj => obj.dirClick, set: (obj, value) => { obj.dirClick = value; } }, metadata: _metadata }, _dirClick_initializers, _dirClick_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    EventDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return EventDir = _classThis;
            })();
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule],
                        declarations: [ErrorComp, EventDir],
                        bootstrap: [ErrorComp],
                        providers: [{ provide: core_1.ErrorHandler, useValue: errorHandler }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestModule = _classThis = class {
                };
                __setFunctionName(_classThis, "TestModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestModule = _classThis;
            })();
            (0, platform_browser_1.platformBrowser)()
                .bootstrapModule(TestModule)
                .then((ref) => {
                core_1.NgZone.assertNotInAngularZone();
                const appRef = ref.injector.get(core_1.ApplicationRef);
                const compRef = appRef.components[0];
                const compEl = compRef.location.nativeElement;
                const nextBtn = compEl.children[0];
                const nextAndThrowBtn = compEl.children[1];
                const nextAndThrowDirBtn = compEl.children[2];
                const errorDelta = 1;
                let currentErrorIndex = 0;
                nextBtn.click();
                assertValueAndErrors(compEl, 1, currentErrorIndex);
                currentErrorIndex += errorDelta;
                nextBtn.click();
                assertValueAndErrors(compEl, 2, currentErrorIndex);
                currentErrorIndex += errorDelta;
                nextAndThrowBtn.click();
                assertValueAndErrors(compEl, 3, currentErrorIndex);
                currentErrorIndex += errorDelta;
                nextAndThrowBtn.click();
                assertValueAndErrors(compEl, 4, currentErrorIndex);
                currentErrorIndex += errorDelta;
                nextAndThrowDirBtn.click();
                assertValueAndErrors(compEl, 5, currentErrorIndex);
                currentErrorIndex += errorDelta;
                nextAndThrowDirBtn.click();
                assertValueAndErrors(compEl, 6, currentErrorIndex);
                currentErrorIndex += errorDelta;
                // Assert that there were no more errors
                (0, matchers_1.expect)(logger.errors.length).toBe(currentErrorIndex);
                done();
            });
            function assertValueAndErrors(compEl, value, errorIndex) {
                (0, matchers_1.expect)(compEl).toHaveText(`Value:${value}`);
                (0, matchers_1.expect)(logger.errors[errorIndex][0]).toBe('ERROR');
                (0, matchers_1.expect)(logger.errors[errorIndex][1].message).toBe(`Error: ${value}`);
            }
        });
    }
    else {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
    }
});
let MyComp1 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-comp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyComp1 = _classThis = class {
        constructor(injector) {
            this.injector = injector;
        }
    };
    __setFunctionName(_classThis, "MyComp1");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyComp1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyComp1 = _classThis;
})();
let PlatformPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'somePipe',
            pure: true,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PlatformPipe = _classThis = class {
        transform(value) {
            return 'somePlatformPipe';
        }
    };
    __setFunctionName(_classThis, "PlatformPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlatformPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlatformPipe = _classThis;
})();
let CustomPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'somePipe',
            pure: true,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CustomPipe = _classThis = class {
        transform(value) {
            return 'someCustomPipe';
        }
    };
    __setFunctionName(_classThis, "CustomPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomPipe = _classThis;
})();
let CmpWithNgContent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-content',
            template: `<ng-content></ng-content>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmpWithNgContent = _classThis = class {
    };
    __setFunctionName(_classThis, "CmpWithNgContent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CmpWithNgContent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CmpWithNgContent = _classThis;
})();
let MyCountingComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'counting-cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyCountingComp = _classThis = class {
        method() {
            MyCountingComp.calls++;
            return { value: 'counting method value' };
        }
        static reset() {
            MyCountingComp.calls = 0;
        }
    };
    __setFunctionName(_classThis, "MyCountingComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyCountingComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.calls = 0;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyCountingComp = _classThis;
})();
let CountingPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'countingPipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CountingPipe = _classThis = class {
        transform(value) {
            CountingPipe.calls++;
            return { value: 'counting pipe value' };
        }
        static reset() {
            CountingPipe.calls = 0;
        }
    };
    __setFunctionName(_classThis, "CountingPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CountingPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.calls = 0;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CountingPipe = _classThis;
})();
let LeftComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'left',
            template: `L<right *ngIf="false"></right>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LeftComp = _classThis = class {
    };
    __setFunctionName(_classThis, "LeftComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LeftComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LeftComp = _classThis;
})();
let RightComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'right',
            template: `R<left *ngIf="false"></left>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RightComp = _classThis = class {
    };
    __setFunctionName(_classThis, "RightComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RightComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RightComp = _classThis;
})();
let FakeRecursiveComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'fakeRecursiveComp',
            template: `[<left *ngIf="false"></left><right *ngIf="false"></right>]`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FakeRecursiveComp = _classThis = class {
    };
    __setFunctionName(_classThis, "FakeRecursiveComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FakeRecursiveComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FakeRecursiveComp = _classThis;
})();
exports.FakeRecursiveComp = FakeRecursiveComp;
