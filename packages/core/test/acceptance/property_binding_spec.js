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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const animations_2 = require("@angular/platform-browser/animations");
describe('property bindings', () => {
    it('should support bindings to properties', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<span [id]="id"></span>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
        const fixture = testing_1.TestBed.createComponent(Comp);
        const spanEl = fixture.nativeElement.querySelector('span');
        expect(spanEl.id).toBeFalsy();
        fixture.componentInstance.id = 'testId';
        fixture.detectChanges();
        expect(spanEl.id).toBe('testId');
    });
    it('should update bindings when value changes', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<a [title]="title"></a>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.title = 'Hello';
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        let a = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
        expect(a.title).toBe('Hello');
        fixture.componentInstance.title = 'World';
        fixture.detectChanges();
        expect(a.title).toBe('World');
    });
    it('should not update bindings when value does not change', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<a [title]="title"></a>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.title = 'Hello';
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        let a = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
        expect(a.title).toBe('Hello');
        fixture.detectChanges();
        expect(a.title).toBe('Hello');
    });
    it('should bind to properties whose names do not correspond to their attribute names', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<label [for]="forValue"></label>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        const labelNode = fixture.debugElement.query(platform_browser_1.By.css('label'));
        fixture.componentInstance.forValue = 'some-input';
        fixture.detectChanges();
        expect(labelNode.nativeElement.getAttribute('for')).toBe('some-input');
        fixture.componentInstance.forValue = 'some-textarea';
        fixture.detectChanges();
        expect(labelNode.nativeElement.getAttribute('for')).toBe('some-textarea');
    });
    it('should not map properties whose names do not correspond to their attribute names, ' +
        'if they correspond to inputs', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    selector: 'my-comp',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _for_decorators;
            let _for_initializers = [];
            let _for_extraInitializers = [];
            var MyComp = _classThis = class {
                constructor() {
                    this.for = __runInitializers(this, _for_initializers, void 0);
                    __runInitializers(this, _for_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _for_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _for_decorators, { kind: "field", name: "for", static: false, private: false, access: { has: obj => "for" in obj, get: obj => obj.for, set: (obj, value) => { obj.for = value; } }, metadata: _metadata }, _for_initializers, _for_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<my-comp [for]="forValue"></my-comp>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, MyComp] });
        const fixture = testing_1.TestBed.createComponent(App);
        const myCompNode = fixture.debugElement.query(platform_browser_1.By.directive(MyComp));
        fixture.componentInstance.forValue = 'hello';
        fixture.detectChanges();
        expect(myCompNode.nativeElement.getAttribute('for')).toBeFalsy();
        expect(myCompNode.componentInstance.for).toBe('hello');
        fixture.componentInstance.forValue = 'hej';
        fixture.detectChanges();
        expect(myCompNode.nativeElement.getAttribute('for')).toBeFalsy();
        expect(myCompNode.componentInstance.for).toBe('hej');
    });
    it('should use the sanitizer in bound properties', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <a [href]="url">
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.url = 'javascript:alert("haha, I am taking over your computer!!!");';
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
        testing_1.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const a = fixture.nativeElement.querySelector('a');
        expect(a.href.indexOf('unsafe:')).toBe(0);
        const domSanitzer = testing_1.TestBed.inject(platform_browser_1.DomSanitizer);
        fixture.componentInstance.url = domSanitzer.bypassSecurityTrustUrl('javascript:alert("the developer wanted this");');
        fixture.detectChanges();
        expect(a.href.indexOf('unsafe:')).toBe(-1);
    });
    it('should not stringify non-string values', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<input [required]="isRequired"/>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.isRequired = false;
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement.required).toBe(false);
    });
    it('should support interpolation for properties', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<span id="{{'_' + id + '_'}}"></span>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
        const fixture = testing_1.TestBed.createComponent(Comp);
        const spanEl = fixture.nativeElement.querySelector('span');
        fixture.componentInstance.id = 'testId';
        fixture.detectChanges();
        expect(spanEl.id).toBe('_testId_');
        fixture.componentInstance.id = 'otherId';
        fixture.detectChanges();
        expect(spanEl.id).toBe('_otherId_');
    });
    describe('input properties', () => {
        let MyButton = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[myButton]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _disabled_decorators;
            let _disabled_initializers = [];
            let _disabled_extraInitializers = [];
            var MyButton = _classThis = class {
                constructor() {
                    this.disabled = __runInitializers(this, _disabled_initializers, void 0);
                    __runInitializers(this, _disabled_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyButton");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _disabled_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _disabled_decorators, { kind: "field", name: "disabled", static: false, private: false, access: { has: obj => "disabled" in obj, get: obj => obj.disabled, set: (obj, value) => { obj.disabled = value; } }, metadata: _metadata }, _disabled_initializers, _disabled_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyButton = _classThis;
        })();
        let OtherDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[otherDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _id_decorators;
            let _id_initializers = [];
            let _id_extraInitializers = [];
            let _clickStream_decorators;
            let _clickStream_initializers = [];
            let _clickStream_extraInitializers = [];
            var OtherDir = _classThis = class {
                constructor() {
                    this.id = __runInitializers(this, _id_initializers, void 0);
                    this.clickStream = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _clickStream_initializers, new core_1.EventEmitter()));
                    __runInitializers(this, _clickStream_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "OtherDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _id_decorators = [(0, core_1.Input)()];
                _clickStream_decorators = [(0, core_1.Output)('click')];
                __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
                __esDecorate(null, null, _clickStream_decorators, { kind: "field", name: "clickStream", static: false, private: false, access: { has: obj => "clickStream" in obj, get: obj => obj.clickStream, set: (obj, value) => { obj.clickStream = value; } }, metadata: _metadata }, _clickStream_initializers, _clickStream_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherDir = _classThis;
        })();
        let OtherDisabledDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[otherDisabledDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _disabled_decorators;
            let _disabled_initializers = [];
            let _disabled_extraInitializers = [];
            var OtherDisabledDir = _classThis = class {
                constructor() {
                    this.disabled = __runInitializers(this, _disabled_initializers, void 0);
                    __runInitializers(this, _disabled_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "OtherDisabledDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _disabled_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _disabled_decorators, { kind: "field", name: "disabled", static: false, private: false, access: { has: obj => "disabled" in obj, get: obj => obj.disabled, set: (obj, value) => { obj.disabled = value; } }, metadata: _metadata }, _disabled_initializers, _disabled_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherDisabledDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherDisabledDir = _classThis;
        })();
        let IdDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[idDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _idNumber_decorators;
            let _idNumber_initializers = [];
            let _idNumber_extraInitializers = [];
            var IdDir = _classThis = class {
                constructor() {
                    this.idNumber = __runInitializers(this, _idNumber_initializers, void 0);
                    __runInitializers(this, _idNumber_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "IdDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _idNumber_decorators = [(0, core_1.Input)('id')];
                __esDecorate(null, null, _idNumber_decorators, { kind: "field", name: "idNumber", static: false, private: false, access: { has: obj => "idNumber" in obj, get: obj => obj.idNumber, set: (obj, value) => { obj.idNumber = value; } }, metadata: _metadata }, _idNumber_initializers, _idNumber_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                IdDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return IdDir = _classThis;
        })();
        it('should check input properties before setting (directives)', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button myButton otherDir [id]="id" [disabled]="isDisabled">Click me</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.id = 0;
                        this.isDisabled = true;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyButton, OtherDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            const button = fixture.debugElement.query(platform_browser_1.By.directive(MyButton)).injector.get(MyButton);
            const otherDir = fixture.debugElement.query(platform_browser_1.By.directive(OtherDir)).injector.get(OtherDir);
            const buttonEl = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(buttonEl.getAttribute('mybutton')).toBe('');
            expect(buttonEl.getAttribute('otherdir')).toBe('');
            expect(buttonEl.hasAttribute('id')).toBe(false);
            expect(buttonEl.hasAttribute('disabled')).toBe(false);
            expect(button.disabled).toEqual(true);
            expect(otherDir.id).toEqual(0);
            fixture.componentInstance.isDisabled = false;
            fixture.componentInstance.id = 1;
            fixture.detectChanges();
            expect(buttonEl.getAttribute('mybutton')).toBe('');
            expect(buttonEl.getAttribute('otherdir')).toBe('');
            expect(buttonEl.hasAttribute('id')).toBe(false);
            expect(buttonEl.hasAttribute('disabled')).toBe(false);
            expect(button.disabled).toEqual(false);
            expect(otherDir.id).toEqual(1);
        });
        it('should support mixed element properties and input properties', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button myButton [id]="id" [disabled]="isDisabled">Click me</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.isDisabled = true;
                        this.id = 0;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyButton] });
            const fixture = testing_1.TestBed.createComponent(App);
            const button = fixture.debugElement.query(platform_browser_1.By.directive(MyButton)).injector.get(MyButton);
            const buttonEl = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(buttonEl.getAttribute('id')).toBe('0');
            expect(buttonEl.hasAttribute('disabled')).toBe(false);
            expect(button.disabled).toEqual(true);
            fixture.componentInstance.isDisabled = false;
            fixture.componentInstance.id = 1;
            fixture.detectChanges();
            expect(buttonEl.getAttribute('id')).toBe('1');
            expect(buttonEl.hasAttribute('disabled')).toBe(false);
            expect(button.disabled).toEqual(false);
        });
        it('should check that property is not an input property before setting (component)', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _id_decorators;
                let _id_initializers = [];
                let _id_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.id = __runInitializers(this, _id_initializers, void 0);
                        __runInitializers(this, _id_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _id_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<comp [id]="id"></comp>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.id = 1;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Comp] });
            const fixture = testing_1.TestBed.createComponent(App);
            const compDebugEl = fixture.debugElement.query(platform_browser_1.By.directive(Comp));
            fixture.detectChanges();
            expect(compDebugEl.nativeElement.hasAttribute('id')).toBe(false);
            expect(compDebugEl.componentInstance.id).toEqual(1);
            fixture.componentInstance.id = 2;
            fixture.detectChanges();
            expect(compDebugEl.nativeElement.hasAttribute('id')).toBe(false);
            expect(compDebugEl.componentInstance.id).toEqual(2);
        });
        it('should support two input properties with the same name', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button myButton otherDisabledDir [disabled]="isDisabled">Click me</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.isDisabled = true;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyButton, OtherDisabledDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            const button = fixture.debugElement.query(platform_browser_1.By.directive(MyButton)).injector.get(MyButton);
            const otherDisabledDir = fixture.debugElement
                .query(platform_browser_1.By.directive(OtherDisabledDir))
                .injector.get(OtherDisabledDir);
            const buttonEl = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(buttonEl.hasAttribute('disabled')).toBe(false);
            expect(button.disabled).toEqual(true);
            expect(otherDisabledDir.disabled).toEqual(true);
            fixture.componentInstance.isDisabled = false;
            fixture.detectChanges();
            expect(buttonEl.hasAttribute('disabled')).toBe(false);
            expect(button.disabled).toEqual(false);
            expect(otherDisabledDir.disabled).toEqual(false);
        });
        it('should set input property if there is an output first', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<button otherDir [id]="id" (click)="onClick()">Click me</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.id = 1;
                        this.counter = 0;
                        this.onClick = () => this.counter++;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, OtherDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            const otherDir = fixture.debugElement.query(platform_browser_1.By.directive(OtherDir)).injector.get(OtherDir);
            const buttonEl = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(buttonEl.hasAttribute('id')).toBe(false);
            expect(otherDir.id).toEqual(1);
            otherDir.clickStream.next();
            expect(fixture.componentInstance.counter).toEqual(1);
            fixture.componentInstance.id = 2;
            fixture.detectChanges();
            expect(otherDir.id).toEqual(2);
        });
        it('should support unrelated element properties at same index in if-else block', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <button idDir [id]="id1">Click me</button>
          <button *ngIf="condition" [id]="id2">Click me too (2)</button>
          <button *ngIf="!condition" otherDir [id]="id3">Click me too (3)</button>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.condition = true;
                        this.id1 = 'one';
                        this.id2 = 'two';
                        this.id3 = 3;
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, IdDir, OtherDir],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            let buttonElements = fixture.nativeElement.querySelectorAll('button');
            const idDir = fixture.debugElement.query(platform_browser_1.By.directive(IdDir)).injector.get(IdDir);
            expect(buttonElements.length).toBe(2);
            expect(buttonElements[0].hasAttribute('id')).toBe(false);
            expect(buttonElements[1].getAttribute('id')).toBe('two');
            expect(buttonElements[1].textContent).toBe('Click me too (2)');
            expect(idDir.idNumber).toBe('one');
            fixture.componentInstance.condition = false;
            fixture.componentInstance.id1 = 'four';
            fixture.detectChanges();
            const otherDir = fixture.debugElement.query(platform_browser_1.By.directive(OtherDir)).injector.get(OtherDir);
            buttonElements = fixture.nativeElement.querySelectorAll('button');
            expect(buttonElements.length).toBe(2);
            expect(buttonElements[0].hasAttribute('id')).toBe(false);
            expect(buttonElements[1].hasAttribute('id')).toBe(false);
            expect(buttonElements[1].textContent).toBe('Click me too (3)');
            expect(idDir.idNumber).toBe('four');
            expect(otherDir.id).toBe(3);
        });
    });
    describe('attributes and input properties', () => {
        let MyDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[myDir]',
                    exportAs: 'myDir',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _role_decorators;
            let _role_initializers = [];
            let _role_extraInitializers = [];
            let _direction_decorators;
            let _direction_initializers = [];
            let _direction_extraInitializers = [];
            let _changeStream_decorators;
            let _changeStream_initializers = [];
            let _changeStream_extraInitializers = [];
            var MyDir = _classThis = class {
                constructor() {
                    this.role = __runInitializers(this, _role_initializers, void 0);
                    this.direction = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _direction_initializers, void 0));
                    this.changeStream = (__runInitializers(this, _direction_extraInitializers), __runInitializers(this, _changeStream_initializers, new core_1.EventEmitter()));
                    __runInitializers(this, _changeStream_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _role_decorators = [(0, core_1.Input)()];
                _direction_decorators = [(0, core_1.Input)('dir')];
                _changeStream_decorators = [(0, core_1.Output)('change')];
                __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
                __esDecorate(null, null, _direction_decorators, { kind: "field", name: "direction", static: false, private: false, access: { has: obj => "direction" in obj, get: obj => obj.direction, set: (obj, value) => { obj.direction = value; } }, metadata: _metadata }, _direction_initializers, _direction_extraInitializers);
                __esDecorate(null, null, _changeStream_decorators, { kind: "field", name: "changeStream", static: false, private: false, access: { has: obj => "changeStream" in obj, get: obj => obj.changeStream, set: (obj, value) => { obj.changeStream = value; } }, metadata: _metadata }, _changeStream_initializers, _changeStream_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        let MyDirB = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[myDirB]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _roleB_decorators;
            let _roleB_initializers = [];
            let _roleB_extraInitializers = [];
            var MyDirB = _classThis = class {
                constructor() {
                    this.roleB = __runInitializers(this, _roleB_initializers, void 0);
                    __runInitializers(this, _roleB_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyDirB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _roleB_decorators = [(0, core_1.Input)('role')];
                __esDecorate(null, null, _roleB_decorators, { kind: "field", name: "roleB", static: false, private: false, access: { has: obj => "roleB" in obj, get: obj => obj.roleB, set: (obj, value) => { obj.roleB = value; } }, metadata: _metadata }, _roleB_initializers, _roleB_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDirB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDirB = _classThis;
        })();
        it('should set input property based on attribute if existing', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div role="button" myDir></div>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            const myDir = fixture.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
            const divElement = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(divElement.getAttribute('role')).toBe('button');
            expect(divElement.getAttribute('mydir')).toBe('');
            expect(myDir.role).toEqual('button');
        });
        it('should set input property and attribute if both defined', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div role="button" [role]="role" myDir></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.role = 'listbox';
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            const myDir = fixture.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
            const divElement = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(divElement.getAttribute('role')).toBe('button');
            expect(myDir.role).toEqual('listbox');
            fixture.componentInstance.role = 'button';
            fixture.detectChanges();
            expect(myDir.role).toEqual('button');
        });
        it('should set two directive input properties based on same attribute', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div role="button" myDir myDirB></div>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyDir, MyDirB] });
            const fixture = testing_1.TestBed.createComponent(App);
            const myDir = fixture.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
            const myDirB = fixture.debugElement.query(platform_browser_1.By.directive(MyDirB)).injector.get(MyDirB);
            const divElement = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(divElement.getAttribute('role')).toBe('button');
            expect(myDir.role).toEqual('button');
            expect(myDirB.roleB).toEqual('button');
        });
        it('should process two attributes on same directive', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div role="button" dir="rtl" myDir></div>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            const myDir = fixture.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
            const divElement = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(divElement.getAttribute('role')).toBe('button');
            expect(divElement.getAttribute('dir')).toBe('rtl');
            expect(myDir.role).toEqual('button');
            expect(myDir.direction).toEqual('rtl');
        });
        it('should process attributes and outputs properly together', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div role="button" (change)="onChange()" myDir></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.counter = 0;
                        this.onChange = () => this.counter++;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            const myDir = fixture.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
            const divElement = fixture.nativeElement.children[0];
            fixture.detectChanges();
            expect(divElement.getAttribute('role')).toBe('button');
            expect(myDir.role).toEqual('button');
            myDir.changeStream.next();
            expect(fixture.componentInstance.counter).toEqual(1);
        });
        it('should process attributes properly for directives with later indices', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div role="button" dir="rtl" myDir></div>
          <div role="listbox" myDirB></div>
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyDir, MyDirB] });
            const fixture = testing_1.TestBed.createComponent(App);
            const myDir = fixture.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
            const myDirB = fixture.debugElement.query(platform_browser_1.By.directive(MyDirB)).injector.get(MyDirB);
            const fixtureElements = fixture.nativeElement.children;
            // TODO: Use destructuring once Domino supports native ES2015, or when jsdom is used.
            const buttonEl = fixtureElements[0];
            const listboxEl = fixtureElements[1];
            fixture.detectChanges();
            expect(buttonEl.getAttribute('role')).toBe('button');
            expect(buttonEl.getAttribute('dir')).toBe('rtl');
            expect(listboxEl.getAttribute('role')).toBe('listbox');
            expect(myDir.role).toEqual('button');
            expect(myDir.direction).toEqual('rtl');
            expect(myDirB.roleB).toEqual('listbox');
        });
        it('should support attributes at same index inside an if-else block', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div role="listbox" myDir></div>
          <div role="button" myDirB *ngIf="condition"></div>
          <div role="menu" *ngIf="!condition"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyDir, MyDirB], imports: [common_1.CommonModule] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const myDir = fixture.debugElement.query(platform_browser_1.By.directive(MyDir)).injector.get(MyDir);
            const myDirB = fixture.debugElement.query(platform_browser_1.By.directive(MyDirB)).injector.get(MyDirB);
            let divElements = fixture.nativeElement.querySelectorAll('div');
            expect(divElements.length).toBe(2);
            expect(divElements[0].getAttribute('role')).toBe('listbox');
            expect(divElements[1].getAttribute('role')).toBe('button');
            expect(myDir.role).toEqual('listbox');
            expect(myDirB.roleB).toEqual('button');
            expect(myDirB.role).toBeUndefined();
            fixture.componentInstance.condition = false;
            fixture.detectChanges();
            divElements = fixture.nativeElement.querySelectorAll('div');
            expect(divElements.length).toBe(2);
            expect(divElements[0].getAttribute('role')).toBe('listbox');
            expect(divElements[1].getAttribute('role')).toBe('menu');
            expect(myDir.role).toEqual('listbox');
            expect(myDirB.roleB).toEqual('button');
        });
        it('should process attributes properly inside a for loop', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: `<div role="button" myDir #dir="myDir"></div>role: {{dir.role}}`,
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
                        template: `
          <comp *ngFor="let i of [0, 1]"></comp>
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, MyDir, Comp], imports: [common_1.CommonModule] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.children.length).toBe(2);
            const compElements = fixture.nativeElement.children;
            // TODO: Use destructuring once Domino supports native ES2015, or when jsdom is used.
            const comp1 = compElements[0];
            const comp2 = compElements[1];
            expect(comp1.tagName).toBe('COMP');
            expect(comp2.tagName).toBe('COMP');
            expect(comp1.children[0].tagName).toBe('DIV');
            expect(comp1.children[0].getAttribute('role')).toBe('button');
            expect(comp1.textContent).toBe('role: button');
            expect(comp2.children[0].tagName).toBe('DIV');
            expect(comp2.children[0].getAttribute('role')).toBe('button');
            expect(comp2.textContent).toBe('role: button');
        });
    });
    it('should not throw on synthetic property bindings when a directive on the same element injects ViewContainerRef', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '',
                    animations: [(0, animations_1.trigger)('trigger', [(0, animations_1.state)('void', (0, animations_1.style)({ opacity: 0 }))])],
                    host: { '[@trigger]': '"void"' },
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
                    selector: '[my-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir = _classThis = class {
                constructor(viewContainerRef) {
                    this.viewContainerRef = viewContainerRef;
                }
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<my-comp my-dir></my-comp>',
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
            declarations: [App, MyDir, MyComp],
            imports: [animations_2.NoopAnimationsModule],
        });
        expect(() => {
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
        }).not.toThrow();
    });
    it('should allow quoted binding syntax inside property binding', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<span [id]="'{{ id }}'"></span>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('span').id).toBe('{{ id }}');
    });
    it('should allow quoted binding syntax with escaped quotes inside property binding', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<span [id]="'{{ \\' }}'"></span>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('span').id).toBe("{{ ' }}");
    });
});
