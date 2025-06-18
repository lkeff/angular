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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const bypass_1 = require("../../src/sanitization/bypass");
const testing_1 = require("../../testing");
const styling_1 = require("../../testing/src/styling");
const platform_browser_1 = require("@angular/platform-browser");
describe('styling', () => {
    describe('apply in prioritization order', () => {
        it('should perform static bindings', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div class="STATIC" style="color: blue"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            const staticDiv = fixture.nativeElement.querySelectorAll('div')[0];
            expect((0, styling_1.getSortedClassName)(staticDiv)).toEqual('STATIC');
            expect((0, styling_1.getSortedStyle)(staticDiv)).toEqual('color: blue;');
        });
        it('should perform prop bindings', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class.dynamic]="true"
                        [style.color]="'blue'"
                        [style.width.px]="100"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect((0, styling_1.getSortedClassName)(div)).toEqual('dynamic');
            expect((0, styling_1.getSortedStyle)(div)).toEqual('color: blue; width: 100px;');
        });
        it('should perform map bindings', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="{dynamic: true}"
                        [style]="{color: 'blue', width: '100px'}"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect((0, styling_1.getSortedClassName)(div)).toEqual('dynamic');
            expect((0, styling_1.getSortedStyle)(div)).toEqual('color: blue; width: 100px;');
        });
        it('should perform interpolation bindings', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div class="static {{'dynamic'}}"
                        style.color="blu{{'e'}}"
                        style="width: {{'100'}}px"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect((0, styling_1.getSortedClassName)(div)).toEqual('dynamic static');
            expect((0, styling_1.getSortedStyle)(div)).toEqual('color: blue; width: 100px;');
        });
        it('should support hostBindings', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div my-host-bindings-2 my-host-bindings-1 class="STATIC" style="color: blue"></div>`,
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
            let Dir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[my-host-bindings-1]',
                        host: { 'class': 'HOST_STATIC_1', 'style': 'font-family: "c1"' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir1 = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir1 = _classThis;
            })();
            let Dir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[my-host-bindings-2]',
                        host: { 'class': 'HOST_STATIC_2', 'style': 'font-family: "c2"' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir2 = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir2 = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    // Order of directives in the template does not matter.
                    // Order of declarations matters as it determines the relative priority for overrides.
                    Dir1,
                    Dir2,
                    // Even thought component is at the end, it will still have lowest priority because
                    // components are special that way.
                    Cmp,
                ],
            });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect((0, styling_1.getSortedClassName)(div)).toEqual('HOST_STATIC_1 HOST_STATIC_2 STATIC');
            // Chrome will remove quotes but Firefox and Domino do not.
            expect((0, styling_1.getSortedStyle)(div)).toMatch(/color: blue; font-family: "?c2"?;/);
        });
        it('should support hostBindings inheritance', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div my-host-bindings class="STATIC" style="color: blue;"></div>`,
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
            let SuperDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        host: { 'class': 'SUPER_STATIC', 'style': 'font-family: "super";' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperDir = _classThis = class {
                };
                __setFunctionName(_classThis, "SuperDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[my-host-bindings]',
                        host: { 'class': 'HOST_STATIC', 'style': 'font-family: "host font"' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = SuperDir;
                var Dir = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp, Dir] });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect((0, styling_1.getSortedClassName)(div)).toEqual('HOST_STATIC STATIC SUPER_STATIC');
            // Browsers keep the '"' around the font name, but Domino removes it some we do search and
            // replace. Yes we could do `replace(/"/g, '')` but that fails on android.
            expect((0, styling_1.getSortedStyle)(div).replace('"', '').replace('"', '')).toEqual('color: blue; font-family: host font;');
        });
        it('should apply style properties that require quote wrapping', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-style-quoting',
                        template: `
          <div style="content: &quot;foo&quot;"></div>
          <div style='content: "foo"'></div>
          <div style="content: 'foo'"></div>
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const divElements = fixture.nativeElement.querySelectorAll('div');
            expect((0, styling_1.getSortedStyle)(divElements[0])).toBe('content: "foo";');
            expect((0, styling_1.getSortedStyle)(divElements[1])).toBe('content: "foo";');
            expect((0, styling_1.getSortedStyle)(divElements[2])).toMatch(/content: ["']foo["'];/);
        });
        it('should apply template classes in correct order', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <div class="STATIC DELETE_MAP_A DELETE_PROP_B"
             [class]="{foo: true, DELETE_MAP_A: false}"
             [class.bar]="true"
             [class.DELETE_PROP_B]="false"></div>
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const classDiv = fixture.nativeElement.querySelector('div');
            expect((0, styling_1.getSortedClassName)(classDiv)).toEqual('STATIC bar foo');
        });
        it('should apply template styles in correct order', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <div style="width: 100px; height: 200px: color: red; background-color: yellow"
             [style]="{width: '110px', height: null}"
             [style.color]=" 'blue' "
             [style.height.px]="undefined"></div>
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const styleDiv = fixture.nativeElement.querySelector('div');
            expect((0, styling_1.getSortedStyle)(styleDiv)).toEqual('background-color: yellow; color: blue; width: 110px;');
        });
        it('should work with ngClass/ngStyle', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [ngClass]="['dynamic']" [ngStyle]="{'font-family': 'dynamic'}"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect((0, styling_1.getSortedClassName)(div)).toEqual('dynamic');
            expect((0, styling_1.getSortedStyle)(div)).toEqual('font-family: dynamic;');
        });
    });
    describe('css variables', () => {
        const supportsCssVariables = typeof getComputedStyle !== 'undefined' &&
            typeof CSS !== 'undefined' &&
            typeof CSS.supports !== 'undefined' &&
            CSS.supports('color', 'var(--fake-var)');
        it('should support css variables', () => {
            // This test only works in browsers which support CSS variables.
            if (!supportsCssVariables) {
                return;
            }
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div [style.--my-var]="'100px'">
            <span style="width: var(--my-var)">CONTENT</span>
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const span = fixture.nativeElement.querySelector('span');
            expect(getComputedStyle(span).getPropertyValue('width')).toEqual('100px');
        });
        it('should support css variables with numbers in their name inside a host binding', () => {
            // This test only works in browsers which support CSS variables.
            if (!supportsCssVariables) {
                return;
            }
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<h1 style="width: var(--my-1337-var)">Hello</h1>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _style_decorators;
                let _style_initializers = [];
                let _style_extraInitializers = [];
                var Cmp = _classThis = class {
                    constructor() {
                        this.style = __runInitializers(this, _style_initializers, '--my-1337-var: 100px;');
                        __runInitializers(this, _style_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _style_decorators = [(0, core_1.HostBinding)('style')];
                    __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const header = fixture.nativeElement.querySelector('h1');
            expect(getComputedStyle(header).getPropertyValue('width')).toEqual('100px');
        });
        it('should support case-sensitive css variables', () => {
            // This test only works in browsers which support CSS variables.
            if (!supportsCssVariables) {
                return;
            }
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div [style.--MyVar]="'100px'">
            <span style="width: var(--MyVar)">CONTENT</span>
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
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const span = fixture.nativeElement.querySelector('span');
            expect(getComputedStyle(span).getPropertyValue('width')).toEqual('100px');
        });
    });
    describe('non-string class keys', () => {
        it('should allow null in a class array binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="['a', null, 'c']" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('a c null extra');
        });
        it('should allow undefined in a class array binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="['a', undefined, 'c']" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('a c undefined extra');
        });
        it('should allow zero in a class array binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="['a', 0, 'c']" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('0 a c extra');
        });
        it('should allow false in a class array binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="['a', false, 'c']" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('a c false extra');
        });
        it('should ignore an empty string in a class array binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="['a', '', 'c']" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('a c extra');
        });
        it('should ignore a string containing spaces in a class array binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="['a', 'hello there', 'c']" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('a c extra');
        });
        it('should ignore a string containing spaces in a class object literal binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="{a: true, 'hello there': true, c: true}" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('a c extra');
        });
        it('should ignore an object literal in a class array binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="['a', {foo: true}, 'c']" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('a c extra');
        });
        it('should handle a string array in a class array binding', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [class]="['a', ['foo', 'bar'], 'c']" [class.extra]="true"></div>`,
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
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expect(div.getAttribute('class')).toBe('a c foo,bar extra');
        });
    });
    it('should bind [class] as input to directive', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <div class="s1" [class]=" 'd1' " dir-shadows-class-input></div>
      <div class="s2 {{'d2'}}" dir-shadows-class-input></div>
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
        let DirectiveShadowsClassInput = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-shadows-class-input]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_klass_decorators;
            var DirectiveShadowsClassInput = _classThis = class {
                constructor(elementRef) {
                    this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
                }
                set klass(value) {
                    this.elementRef.nativeElement.setAttribute('shadow-class', value);
                }
            };
            __setFunctionName(_classThis, "DirectiveShadowsClassInput");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_klass_decorators = [(0, core_1.Input)('class')];
                __esDecorate(_classThis, null, _set_klass_decorators, { kind: "setter", name: "klass", static: false, private: false, access: { has: obj => "klass" in obj, set: (obj, value) => { obj.klass = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveShadowsClassInput = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveShadowsClassInput = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveShadowsClassInput] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const divs = fixture.nativeElement.querySelectorAll('div');
        // TODO: Use destructuring once Domino supports native ES2015, or when jsdom is used.
        const div1 = divs[0];
        const div2 = divs[1];
        // Static value `class="s1"` is always written to the DOM.
        expect(div1.className).toEqual('s1');
        expect(div1.getAttribute('shadow-class')).toEqual('s1 d1');
        expect(div2.className).toEqual('');
        expect(div2.getAttribute('shadow-class')).toEqual('s2 d2');
    });
    it('should not feed host classes back into shadow input', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <div class="s1" dir-shadows-class-input></div>
          <div class="s1" [class]=" 'd1' " dir-shadows-class-input></div>
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
        let DirectiveShadowsClassInput = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-shadows-class-input]',
                    host: { 'class': 'DIRECTIVE' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_klass_decorators;
            var DirectiveShadowsClassInput = _classThis = class {
                constructor(elementRef) {
                    this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
                }
                set klass(value) {
                    this.elementRef.nativeElement.setAttribute('shadow-class', value);
                }
            };
            __setFunctionName(_classThis, "DirectiveShadowsClassInput");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_klass_decorators = [(0, core_1.Input)('class')];
                __esDecorate(_classThis, null, _set_klass_decorators, { kind: "setter", name: "klass", static: false, private: false, access: { has: obj => "klass" in obj, set: (obj, value) => { obj.klass = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveShadowsClassInput = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveShadowsClassInput = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveShadowsClassInput] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const divs = fixture.nativeElement.querySelectorAll('div');
        // TODO: Use destructuring once Domino supports native ES2015, or when jsdom is used.
        const divStatic = divs[0];
        const divBinding = divs[1];
        expectClass(divStatic).toEqual({ 'DIRECTIVE': true, 's1': true });
        expect(divStatic.getAttribute('shadow-class')).toEqual('s1');
        expectClass(divBinding).toEqual({ 'DIRECTIVE': true, 's1': true });
        expect(divBinding.getAttribute('shadow-class')).toEqual('s1 d1');
    });
    it('should not feed host style back into shadow input', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <div style="width: 1px;" dir-shadows-class-input></div>
          <div style="width: 1px;" [style]=" 'height:1px;' " dir-shadows-class-input></div>
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
        let DirectiveShadowsStyleInput = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-shadows-class-input]',
                    host: { 'style': 'color: red;' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_style_decorators;
            var DirectiveShadowsStyleInput = _classThis = class {
                constructor(elementRef) {
                    this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
                }
                set style(value) {
                    this.elementRef.nativeElement.setAttribute('shadow-style', value);
                }
            };
            __setFunctionName(_classThis, "DirectiveShadowsStyleInput");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_style_decorators = [(0, core_1.Input)('style')];
                __esDecorate(_classThis, null, _set_style_decorators, { kind: "setter", name: "style", static: false, private: false, access: { has: obj => "style" in obj, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveShadowsStyleInput = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveShadowsStyleInput = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveShadowsStyleInput] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const divs = fixture.nativeElement.querySelectorAll('div');
        // TODO: Use destructuring once Domino supports native ES2015, or when jsdom is used.
        const divStatic = divs[0];
        const divBinding = divs[1];
        expectStyle(divStatic).toEqual({ 'color': 'red', 'width': '1px' });
        expect(divStatic.getAttribute('shadow-style')).toEqual('width: 1px;');
        expectStyle(divBinding).toEqual({ 'color': 'red', 'width': '1px' });
        expect(divBinding.getAttribute('shadow-style')).toEqual('width: 1px; height:1px;');
    });
    it('should bind [class] as input to directive when both static and falsy dynamic values are present', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
                <div class="s1" [class]="classBinding" dir-shadows-class-input></div>
              `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.classBinding = undefined;
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
        let DirectiveShadowsClassInput = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-shadows-class-input]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_klass_decorators;
            var DirectiveShadowsClassInput = _classThis = class {
                constructor(elementRef) {
                    this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
                }
                set klass(value) {
                    this.elementRef.nativeElement.setAttribute('shadow-class', value);
                }
            };
            __setFunctionName(_classThis, "DirectiveShadowsClassInput");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_klass_decorators = [(0, core_1.Input)('class')];
                __esDecorate(_classThis, null, _set_klass_decorators, { kind: "setter", name: "klass", static: false, private: false, access: { has: obj => "klass" in obj, set: (obj, value) => { obj.klass = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveShadowsClassInput = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveShadowsClassInput = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveShadowsClassInput] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.className).toEqual('s1');
        expect(div.getAttribute('shadow-class')).toEqual('s1');
        fixture.componentInstance.classBinding = null;
        fixture.detectChanges();
        expect(div.className).toEqual('s1');
        expect(div.getAttribute('shadow-class')).toEqual('s1');
        fixture.componentInstance.classBinding = false;
        fixture.detectChanges();
        expect(div.className).toEqual('s1');
        expect(div.getAttribute('shadow-class')).toEqual('s1');
        fixture.componentInstance.classBinding = { toString: () => 'd1' };
        fixture.detectChanges();
        expect(div.className).toEqual('s1');
        expect(div.getAttribute('shadow-class')).toEqual('s1 d1');
    });
    it('should bind [style] as input to directive', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <div style="color: red;" [style]=" 'width: 100px;' " dir-shadows-style-input></div>
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
        let DirectiveShadowsStyleInput = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-shadows-style-input]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_style_decorators;
            var DirectiveShadowsStyleInput = _classThis = class {
                constructor(elementRef) {
                    this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
                }
                set style(value) {
                    this.elementRef.nativeElement.setAttribute('shadow-style', value);
                }
            };
            __setFunctionName(_classThis, "DirectiveShadowsStyleInput");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_style_decorators = [(0, core_1.Input)('style')];
                __esDecorate(_classThis, null, _set_style_decorators, { kind: "setter", name: "style", static: false, private: false, access: { has: obj => "style" in obj, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveShadowsStyleInput = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveShadowsStyleInput = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveShadowsStyleInput] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.cssText).toEqual('color: red;');
        expect(div.getAttribute('shadow-style')).toEqual('color: red; width: 100px;');
    });
    it('should prevent circular ExpressionChangedAfterItHasBeenCheckedError on shadow inputs', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div class="s1" dir-shadows-class-input></div>`,
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
        let DirectiveShadowsClassInput = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-shadows-class-input]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _klass_decorators;
            let _klass_initializers = [];
            let _klass_extraInitializers = [];
            let _get_hostClasses_decorators;
            var DirectiveShadowsClassInput = _classThis = class {
                get hostClasses() {
                    return `${this.klass} SUFFIX`;
                }
                constructor() {
                    this.klass = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _klass_initializers, void 0));
                    __runInitializers(this, _klass_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirectiveShadowsClassInput");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _klass_decorators = [(0, core_1.Input)('class')];
                _get_hostClasses_decorators = [(0, core_1.HostBinding)('class')];
                __esDecorate(_classThis, null, _get_hostClasses_decorators, { kind: "getter", name: "hostClasses", static: false, private: false, access: { has: obj => "hostClasses" in obj, get: obj => obj.hostClasses }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, null, _klass_decorators, { kind: "field", name: "klass", static: false, private: false, access: { has: obj => "klass" in obj, get: obj => obj.klass, set: (obj, value) => { obj.klass = value; } }, metadata: _metadata }, _klass_initializers, _klass_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveShadowsClassInput = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveShadowsClassInput = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveShadowsClassInput] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        expect(() => fixture.detectChanges()).not.toThrow();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.className).toEqual('s1 SUFFIX');
    });
    it('should recover from exceptions', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <div [id]="maybeThrow(id)">
        <span my-dir [class]="maybeThrow(klass)" [class.foo]="maybeThrow(foo)"></span>
      </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.id = 'throw_id';
                    this.klass = 'throw_klass';
                    this.foo = `throw_foo`;
                }
                maybeThrow(value) {
                    if (typeof value === 'string' && value.indexOf('throw') === 0) {
                        throw new Error(value);
                    }
                    return value;
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
        let myDirHostBinding = false;
        let MyDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _get_myDir_decorators;
            var MyDirective = _classThis = class {
                get myDir() {
                    if (myDirHostBinding === false) {
                        throw new Error('class.myDir');
                    }
                    return myDirHostBinding;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _get_myDir_decorators = [(0, core_1.HostBinding)('class.myDir')];
                __esDecorate(_classThis, null, _get_myDir_decorators, { kind: "getter", name: "myDir", static: false, private: false, access: { has: obj => "myDir" in obj, get: obj => obj.myDir }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDirective = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, MyDirective] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        const div = fixture.nativeElement.querySelector('div');
        const span = fixture.nativeElement.querySelector('span');
        expect(() => fixture.detectChanges()).toThrowError(/throw_id/);
        expect(div.id).toBeFalsy();
        expectClass(span).toEqual({});
        cmp.id = 'myId';
        expect(() => fixture.detectChanges()).toThrowError(/throw_klass/);
        expect(div.id).toEqual('myId');
        expectClass(span).toEqual({});
        cmp.klass = ['BAR'];
        expect(() => fixture.detectChanges()).toThrowError(/throw_foo/);
        expect(div.id).toEqual('myId');
        expectClass(span).toEqual({ BAR: true });
        cmp.foo = 'foo';
        expect(() => fixture.detectChanges()).toThrowError(/class.myDir/);
        expect(div.id).toEqual('myId');
        expectClass(span).toEqual({ BAR: true, foo: true });
        myDirHostBinding = true;
        fixture.detectChanges();
        expect(div.id).toEqual('myId');
        expectClass(span).toEqual({ BAR: true, foo: true, myDir: true });
    });
    it('should render inline style and class attribute values on the element before a directive is instantiated', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div directive-expecting-styling style="width:200px" class="abc xyz"></div>
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
        let DirectiveExpectingStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[directive-expecting-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirectiveExpectingStyling = _classThis = class {
                constructor(elm) {
                    const native = elm.nativeElement;
                    native.setAttribute('data-captured-width', native.style.width);
                    native.setAttribute('data-captured-classes', native.className);
                }
            };
            __setFunctionName(_classThis, "DirectiveExpectingStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveExpectingStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveExpectingStyling = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveExpectingStyling] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expect(element.style.width).toEqual('200px');
        expect(element.getAttribute('data-captured-width')).toEqual('200px');
        expect(element.className.trim()).toEqual('abc xyz');
        expect(element.getAttribute('data-captured-classes')).toEqual('abc xyz');
    });
    it('should only render the same initial styling values once before a directive runs', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div directive-expecting-styling style="width:200px" class="abc"></div>
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
        let DirectiveExpectingStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[directive-expecting-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirectiveExpectingStyling = _classThis = class {
                constructor(elm) {
                    const native = elm.nativeElement;
                    native.style.width = '300px';
                    native.classList.remove('abc');
                }
            };
            __setFunctionName(_classThis, "DirectiveExpectingStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveExpectingStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveExpectingStyling = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveExpectingStyling] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expect(element.style.width).toEqual('300px');
        expect(element.classList.contains('abc')).toBeFalsy();
    });
    it('should ensure that static classes are assigned to ng-container elements and picked up for content projection', () => {
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <project>
              outer
              <ng-container class="inner">
                inner
              </ng-container>
            </project>
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
        let ProjectCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'project',
                    template: `
            <div class="outer-area">
              <ng-content></ng-content>
            </div>
            <div class="inner-area">
              <ng-content select=".inner"></ng-content>
            </div>
          `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ProjectCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "ProjectCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProjectCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProjectCmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp, ProjectCmp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        const element = fixture.nativeElement;
        fixture.detectChanges();
        const inner = element.querySelector('.inner-area');
        expect(inner.textContent.trim()).toEqual('inner');
        const outer = element.querySelector('.outer-area');
        expect(outer.textContent.trim()).toEqual('outer');
    });
    it('should render initial styling for repeated nodes that a component host', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[comp]',
                    template: '',
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
        <ng-template ngFor [ngForOf]="items" let-item>
          <p comp class="a">A</p>
        </ng-template>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
            declarations: [App, Comp],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(platform_browser_1.By.css('.a')).length).toBe(3);
    });
    it('should do nothing for empty style bindings', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style.color]></div>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toBe('<div></div>');
    });
    it('should do nothing for empty class bindings', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [class.is-open]></div>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toBe('<div></div>');
    });
    it('should be able to bind zero', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div #div [style.opacity]="opacity"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _div_decorators;
            let _div_initializers = [];
            let _div_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.div = __runInitializers(this, _div_initializers, void 0);
                    this.opacity = (__runInitializers(this, _div_extraInitializers), 0);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _div_decorators = [(0, core_1.ViewChild)('div')];
                __esDecorate(null, null, _div_decorators, { kind: "field", name: "div", static: false, private: false, access: { has: obj => "div" in obj, get: obj => obj.div, set: (obj, value) => { obj.div = value; } }, metadata: _metadata }, _div_initializers, _div_extraInitializers);
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
        expect(fixture.componentInstance.div.nativeElement.style.opacity).toBe('0');
    });
    it('should be able to bind a SafeValue to backgroundImage', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style.backgroundImage]="image"></div>',
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const sanitizer = testing_1.TestBed.inject(platform_browser_1.DomSanitizer);
        fixture.componentInstance.image = sanitizer.bypassSecurityTrustStyle('url("#test")');
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.backgroundImage).toBe('url("#test")');
    });
    it('should set !important on a single property', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style.width]="width"></div>',
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.componentInstance.width = '50px !important';
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        // We have to check the `style` attribute, because `element.style.prop` doesn't include
        // `!important`. Use a regex, because the different renderers produce different whitespace.
        expect(html).toMatch(/style=["|']width:\s*50px\s*!important/);
    });
    it('should set !important that is not preceded by a space', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style.width]="width"></div>',
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.componentInstance.width = '50px!important';
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        // We have to check the `style` attribute, because `element.style.prop` doesn't include
        // `!important`. Use a regex, because the different renderers produce different whitespace.
        expect(html).toMatch(/style=["|']width:\s*50px\s*!important/);
    });
    it('should set !important on a dash-case property', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style.margin-right]="marginRight"></div>',
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.componentInstance.marginRight = '5px !important';
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        // We have to check the `style` attribute, because `element.style.prop` doesn't include
        // `!important`. Use a regex, because the different renderers produce different whitespace.
        expect(html).toMatch(/style=["|']margin-right:\s*5px\s*!important/);
    });
    it('should set !important on multiple properties', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style]="styles"></div>',
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.componentInstance.styles = 'height: 25px !important; width: 50px !important;';
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        // We have to check the `style` attribute, because `element.style.prop` doesn't include
        // `!important`. Use a regex, because the different renderers produce different whitespace.
        expect(html).toMatch(/style=["|']height:\s*25px\s*!important;\s*width:\s*50px\s*!important/);
    });
    it('should set !important if some properties are !important and other are not', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style]="styles"></div>',
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.componentInstance.styles = 'height: 25px; width: 50px !important;';
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        // We have to check the `style` attribute, because `element.style.prop` doesn't include
        // `!important`. Use a regex, because the different renderers produce different whitespace.
        expect(html).toMatch(/style=["|']height:\s*25px;\s*width:\s*50px\s*!important/);
    });
    it('should not write to the native element if a directive shadows the class input', () => {
        // This ex is a bit contrived. In real apps, you might have a shared class that is extended
        // both by components with host elements and by directives on template nodes. In that case, the
        // host styles for the template directives should just be ignored.
        let StyleDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'ng-template[styleDir]',
                    host: { '[style.display]': 'display' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StyleDir = _classThis = class {
                constructor() {
                    this.display = 'block';
                }
            };
            __setFunctionName(_classThis, "StyleDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StyleDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StyleDir = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-comp',
                    template: `<ng-template styleDir></ng-template>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp, StyleDir] });
        testing_1.TestBed.createComponent(MyApp).detectChanges();
    });
    it('should be able to bind a SafeValue to clip-path', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style.clip-path]="path"></div>',
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const sanitizer = testing_1.TestBed.inject(platform_browser_1.DomSanitizer);
        fixture.componentInstance.path = sanitizer.bypassSecurityTrustStyle('url("#test")');
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        // Note that check the raw HTML, because (at the time of writing) the Node-based renderer
        // that we use to run tests doesn't support `clip-path` in `CSSStyleDeclaration`.
        expect(html).toMatch(/style=["|']clip-path:\s*url\(.*#test.*\)/);
    });
    it('should support interpolations inside a class binding', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div class="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i{{nine}}j"></div>
        <div class="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i"></div>
        <div class="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h"></div>
        <div class="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g"></div>
        <div class="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f"></div>
        <div class="a{{one}}b{{two}}c{{three}}d{{four}}e"></div>
        <div class="a{{one}}b{{two}}c{{three}}d"></div>
        <div class="a{{one}}b{{two}}c"></div>
        <div class="a{{one}}b"></div>
        <div class="{{one}}"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.one = '1';
                    this.two = '2';
                    this.three = '3';
                    this.four = '4';
                    this.five = '5';
                    this.six = '6';
                    this.seven = '7';
                    this.eight = '8';
                    this.nine = '9';
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        const divs = fixture.nativeElement.querySelectorAll('div');
        expect(divs[0].getAttribute('class')).toBe('a1b2c3d4e5f6g7h8i9j');
        expect(divs[1].getAttribute('class')).toBe('a1b2c3d4e5f6g7h8i');
        expect(divs[2].getAttribute('class')).toBe('a1b2c3d4e5f6g7h');
        expect(divs[3].getAttribute('class')).toBe('a1b2c3d4e5f6g');
        expect(divs[4].getAttribute('class')).toBe('a1b2c3d4e5f');
        expect(divs[5].getAttribute('class')).toBe('a1b2c3d4e');
        expect(divs[6].getAttribute('class')).toBe('a1b2c3d');
        expect(divs[7].getAttribute('class')).toBe('a1b2c');
        expect(divs[8].getAttribute('class')).toBe('a1b');
        expect(divs[9].getAttribute('class')).toBe('1');
        instance.one =
            instance.two =
                instance.three =
                    instance.four =
                        instance.five =
                            instance.six =
                                instance.seven =
                                    instance.eight =
                                        instance.nine =
                                            '';
        fixture.detectChanges();
        expect(divs[0].getAttribute('class')).toBe('abcdefghij');
        expect(divs[1].getAttribute('class')).toBe('abcdefghi');
        expect(divs[2].getAttribute('class')).toBe('abcdefgh');
        expect(divs[3].getAttribute('class')).toBe('abcdefg');
        expect(divs[4].getAttribute('class')).toBe('abcdef');
        expect(divs[5].getAttribute('class')).toBe('abcde');
        expect(divs[6].getAttribute('class')).toBe('abcd');
        expect(divs[7].getAttribute('class')).toBe('abc');
        expect(divs[8].getAttribute('class')).toBe('ab');
        expect(divs[9].getAttribute('class')).toBeFalsy();
    });
    it('should support interpolations inside a style binding', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div style="content: &quot;a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i{{nine}}j&quot;"></div>
        <div style="content: &quot;a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i&quot;"></div>
        <div style="content: &quot;a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h&quot;"></div>
        <div style="content: &quot;a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g&quot;"></div>
        <div style="content: &quot;a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f&quot;"></div>
        <div style="content: &quot;a{{one}}b{{two}}c{{three}}d{{four}}e&quot;"></div>
        <div style="content: &quot;a{{one}}b{{two}}c{{three}}d&quot;"></div>
        <div style="content: &quot;a{{one}}b{{two}}c&quot;"></div>
        <div style="content: &quot;a{{one}}b&quot;"></div>
        <div style="{{self}}"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.self = 'content: "self"';
                    this.one = '1';
                    this.two = '2';
                    this.three = '3';
                    this.four = '4';
                    this.five = '5';
                    this.six = '6';
                    this.seven = '7';
                    this.eight = '8';
                    this.nine = '9';
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        const divs = fixture.nativeElement.querySelectorAll('div');
        expect(divs[0].style.getPropertyValue('content')).toBe('"a1b2c3d4e5f6g7h8i9j"');
        expect(divs[1].style.getPropertyValue('content')).toBe('"a1b2c3d4e5f6g7h8i"');
        expect(divs[2].style.getPropertyValue('content')).toBe('"a1b2c3d4e5f6g7h"');
        expect(divs[3].style.getPropertyValue('content')).toBe('"a1b2c3d4e5f6g"');
        expect(divs[4].style.getPropertyValue('content')).toBe('"a1b2c3d4e5f"');
        expect(divs[5].style.getPropertyValue('content')).toBe('"a1b2c3d4e"');
        expect(divs[6].style.getPropertyValue('content')).toBe('"a1b2c3d"');
        expect(divs[7].style.getPropertyValue('content')).toBe('"a1b2c"');
        expect(divs[8].style.getPropertyValue('content')).toBe('"a1b"');
        expect(divs[9].style.getPropertyValue('content')).toBe('"self"');
        instance.one =
            instance.two =
                instance.three =
                    instance.four =
                        instance.five =
                            instance.six =
                                instance.seven =
                                    instance.eight =
                                        instance.nine =
                                            instance.self =
                                                '';
        fixture.detectChanges();
        expect(divs[0].style.getPropertyValue('content')).toBe('"abcdefghij"');
        expect(divs[1].style.getPropertyValue('content')).toBe('"abcdefghi"');
        expect(divs[2].style.getPropertyValue('content')).toBe('"abcdefgh"');
        expect(divs[3].style.getPropertyValue('content')).toBe('"abcdefg"');
        expect(divs[4].style.getPropertyValue('content')).toBe('"abcdef"');
        expect(divs[5].style.getPropertyValue('content')).toBe('"abcde"');
        expect(divs[6].style.getPropertyValue('content')).toBe('"abcd"');
        expect(divs[7].style.getPropertyValue('content')).toBe('"abc"');
        expect(divs[8].style.getPropertyValue('content')).toBe('"ab"');
        expect(divs[9].style.getPropertyValue('content')).toBeFalsy();
    });
    it('should support interpolations inside a class binding when other classes are present', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div class="zero i-{{one}} {{two}} three"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.one = 'one';
                    this.two = 'two';
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const classList = fixture.nativeElement.querySelector('div').classList;
        expect(classList).toContain('zero');
        expect(classList).toContain('i-one');
        expect(classList).toContain('two');
        expect(classList).toContain('three');
        fixture.componentInstance.one = fixture.componentInstance.two = '';
        fixture.detectChanges();
        expect(classList).toContain('zero');
        expect(classList).toContain('i-');
        expect(classList).toContain('three');
        expect(classList).not.toContain('i-one');
        expect(classList).not.toContain('two');
    });
    it('should support interpolations inside a style property binding', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div style.font-family="f{{one}}{{two}}{{three}}{{four}}{{five}}{{six}}{{seven}}{{eight}}{{nine}}"></div>
        <div style.font-family="f{{one}}{{two}}{{three}}{{four}}{{five}}{{six}}{{seven}}{{eight}}"></div>
        <div style.font-family="f{{one}}{{two}}{{three}}{{four}}{{five}}{{six}}{{seven}}"></div>
        <div style.font-family="f{{one}}{{two}}{{three}}{{four}}{{five}}{{six}}"></div>
        <div style.font-family="f{{one}}{{two}}{{three}}{{four}}{{five}}"></div>
        <div style.font-family="f{{one}}{{two}}{{three}}{{four}}"></div>
        <div style.font-family="f{{one}}{{two}}{{three}}"></div>
        <div style.font-family="f{{one}}{{two}}"></div>
        <div style.font-family="f{{one}}"></div>
        <div style.width="{{singleBinding}}"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.singleBinding = '1337px';
                    this.one = 1;
                    this.two = 2;
                    this.three = 3;
                    this.four = 4;
                    this.five = 5;
                    this.six = 6;
                    this.seven = 7;
                    this.eight = 8;
                    this.nine = 9;
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        const divs = fixture.nativeElement.querySelectorAll('div');
        expect(divs[0].style.fontFamily).toBe('f123456789');
        expect(divs[1].style.fontFamily).toBe('f12345678');
        expect(divs[2].style.fontFamily).toBe('f1234567');
        expect(divs[3].style.fontFamily).toBe('f123456');
        expect(divs[4].style.fontFamily).toBe('f12345');
        expect(divs[5].style.fontFamily).toBe('f1234');
        expect(divs[6].style.fontFamily).toBe('f123');
        expect(divs[7].style.fontFamily).toBe('f12');
        expect(divs[8].style.fontFamily).toBe('f1');
        expect(divs[9].style.width).toBe('1337px');
        instance.singleBinding = null;
        instance.one =
            instance.two =
                instance.three =
                    instance.four =
                        instance.five =
                            instance.six =
                                instance.seven =
                                    instance.eight =
                                        instance.nine =
                                            1;
        fixture.detectChanges();
        expect(divs[0].style.fontFamily).toBe('f111111111');
        expect(divs[1].style.fontFamily).toBe('f11111111');
        expect(divs[2].style.fontFamily).toBe('f1111111');
        expect(divs[3].style.fontFamily).toBe('f111111');
        expect(divs[4].style.fontFamily).toBe('f11111');
        expect(divs[5].style.fontFamily).toBe('f1111');
        expect(divs[6].style.fontFamily).toBe('f111');
        expect(divs[7].style.fontFamily).toBe('f11');
        expect(divs[8].style.fontFamily).toBe('f1');
        expect(divs[9].style.width).toBeFalsy();
    });
    it('should support interpolations when a style property has a unit suffix', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div style.width.px="{{one}}{{three}}{{three}}7"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.one = 1;
                    this.three = 3;
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.width).toBe('1337px');
        fixture.componentInstance.one = 2;
        fixture.componentInstance.three = 6;
        fixture.detectChanges();
        expect(div.style.width).toBe('2667px');
    });
    it('should not write to a `class` input binding in the event that there is no static class value', () => {
        let capturedClassBindingCount = 0;
        let capturedClassBindingValue = undefined;
        let capturedMyClassBindingCount = 0;
        let capturedMyClassBindingValue = undefined;
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [class]="c" [my-class-dir]="x"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.c = null;
                    this.x = 'foo';
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
        let MyClassDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-class-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_classVal_decorators;
            let _set_myClassVal_decorators;
            var MyClassDir = _classThis = class {
                set classVal(v) {
                    capturedClassBindingCount++;
                    capturedClassBindingValue = v;
                }
                set myClassVal(v) {
                    capturedMyClassBindingCount++;
                    capturedMyClassBindingValue = v;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyClassDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_classVal_decorators = [(0, core_1.Input)('class')];
                _set_myClassVal_decorators = [(0, core_1.Input)('my-class-dir')];
                __esDecorate(_classThis, null, _set_classVal_decorators, { kind: "setter", name: "classVal", static: false, private: false, access: { has: obj => "classVal" in obj, set: (obj, value) => { obj.classVal = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(_classThis, null, _set_myClassVal_decorators, { kind: "setter", name: "myClassVal", static: false, private: false, access: { has: obj => "myClassVal" in obj, set: (obj, value) => { obj.myClassVal = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyClassDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyClassDir = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, MyClassDir] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        expect(capturedClassBindingCount).toEqual(1);
        expect(capturedClassBindingValue).toEqual(null);
        expect(capturedMyClassBindingCount).toEqual(1);
        expect(capturedMyClassBindingValue).toEqual('foo');
        fixture.componentInstance.c = 'dynamic-value';
        fixture.detectChanges();
        expect(capturedClassBindingCount).toEqual(2);
        expect(capturedClassBindingValue).toEqual('dynamic-value');
        expect(capturedMyClassBindingCount).toEqual(1);
        expect(capturedMyClassBindingValue).toEqual('foo');
        fixture.componentInstance.c = null;
        fixture.detectChanges();
        expect(capturedClassBindingCount).toEqual(3);
        expect(capturedClassBindingValue).toEqual(null);
        expect(capturedMyClassBindingCount).toEqual(1);
        expect(capturedMyClassBindingValue).toEqual('foo');
        fixture.componentInstance.c = '';
        fixture.detectChanges();
        expect(capturedClassBindingCount).toEqual(4);
        expect(capturedClassBindingValue).toEqual('');
        expect(capturedMyClassBindingCount).toEqual(1);
        expect(capturedMyClassBindingValue).toEqual('foo');
    });
    it('should write to [class] binding during `update` mode if there is an instantiation-level value', () => {
        let capturedClassBindingCount = 0;
        let capturedClassBindingValue = undefined;
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [class]="c" my-class-dir></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.c = 'bar';
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
        let MyClassDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-class-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_classVal_decorators;
            var MyClassDir = _classThis = class {
                set classVal(v) {
                    capturedClassBindingCount++;
                    capturedClassBindingValue = v;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyClassDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_classVal_decorators = [(0, core_1.Input)('class')];
                __esDecorate(_classThis, null, _set_classVal_decorators, { kind: "setter", name: "classVal", static: false, private: false, access: { has: obj => "classVal" in obj, set: (obj, value) => { obj.classVal = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyClassDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyClassDir = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, MyClassDir] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        expect(capturedClassBindingCount).toEqual(0);
        fixture.detectChanges();
        expect(capturedClassBindingCount).toEqual(1);
        expect(capturedClassBindingValue).toEqual('bar');
        fixture.componentInstance.c = 'dynamic-bar';
        fixture.detectChanges();
        expect(capturedClassBindingCount).toEqual(2);
        expect(capturedClassBindingValue).toEqual('dynamic-bar');
    });
    it('should write to a `class` input binding if there is a static class value', () => {
        let capturedClassBindingCount = 0;
        let capturedClassBindingValue = null;
        let capturedMyClassBindingCount = 0;
        let capturedMyClassBindingValue = null;
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div class="static-val" [my-class-dir]="x"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.x = 'foo';
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
        let MyClassDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-class-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_classVal_decorators;
            let _set_myClassVal_decorators;
            var MyClassDir = _classThis = class {
                set classVal(v) {
                    capturedClassBindingCount++;
                    capturedClassBindingValue = v;
                }
                set myClassVal(v) {
                    capturedMyClassBindingCount++;
                    capturedMyClassBindingValue = v;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyClassDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_classVal_decorators = [(0, core_1.Input)('class')];
                _set_myClassVal_decorators = [(0, core_1.Input)('my-class-dir')];
                __esDecorate(_classThis, null, _set_classVal_decorators, { kind: "setter", name: "classVal", static: false, private: false, access: { has: obj => "classVal" in obj, set: (obj, value) => { obj.classVal = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(_classThis, null, _set_myClassVal_decorators, { kind: "setter", name: "myClassVal", static: false, private: false, access: { has: obj => "myClassVal" in obj, set: (obj, value) => { obj.myClassVal = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyClassDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyClassDir = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, MyClassDir] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        expect(capturedClassBindingValue).toEqual('static-val');
        expect(capturedClassBindingCount).toEqual(1);
        expect(capturedMyClassBindingValue).toEqual('foo');
        expect(capturedMyClassBindingCount).toEqual(1);
    });
    it('should write to a `className` input binding', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `{{className}}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _className_decorators;
            let _className_initializers = [];
            let _className_extraInitializers = [];
            var Comp = _classThis = class {
                constructor() {
                    this.className = __runInitializers(this, _className_initializers, '');
                    __runInitializers(this, _className_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _className_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp [className]="'my-className'"></comp>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp, App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.firstChild.innerHTML).toBe('my-className');
    });
    it('should write combined class attribute and class binding to the class input', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: `{{className}}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _className_decorators;
            let _className_initializers = [];
            let _className_extraInitializers = [];
            var Comp = _classThis = class {
                constructor() {
                    this.className = __runInitializers(this, _className_initializers, '');
                    __runInitializers(this, _className_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _className_decorators = [(0, core_1.Input)('class')];
                __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp class="static" [class]="'my-className'"></comp>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp, App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.firstChild.innerHTML).toBe('static my-className');
    });
    it('should write to a `class` input binding if there is a static class value and there is a binding value', () => {
        let capturedClassBindingCount = 0;
        let capturedClassBindingValue = null;
        let capturedMyClassBindingCount = 0;
        let capturedMyClassBindingValue = null;
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div class="static-val" [class]="c" [my-class-dir]="x"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.c = null;
                    this.x = 'foo';
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
        let MyClassDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-class-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_classVal_decorators;
            let _set_myClassVal_decorators;
            var MyClassDir = _classThis = class {
                set classVal(v) {
                    capturedClassBindingCount++;
                    capturedClassBindingValue = v;
                }
                set myClassVal(v) {
                    capturedMyClassBindingCount++;
                    capturedMyClassBindingValue = v;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyClassDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_classVal_decorators = [(0, core_1.Input)('class')];
                _set_myClassVal_decorators = [(0, core_1.Input)('my-class-dir')];
                __esDecorate(_classThis, null, _set_classVal_decorators, { kind: "setter", name: "classVal", static: false, private: false, access: { has: obj => "classVal" in obj, set: (obj, value) => { obj.classVal = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(_classThis, null, _set_myClassVal_decorators, { kind: "setter", name: "myClassVal", static: false, private: false, access: { has: obj => "myClassVal" in obj, set: (obj, value) => { obj.myClassVal = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyClassDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyClassDir = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, MyClassDir] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        expect(capturedClassBindingCount).toEqual(2);
        expect(capturedClassBindingValue).toEqual('static-val');
        expect(capturedMyClassBindingCount).toEqual(1);
        expect(capturedMyClassBindingValue).toEqual('foo');
        capturedClassBindingCount = 0;
        fixture.componentInstance.c = 'dynamic-val';
        fixture.detectChanges();
        expect(capturedClassBindingCount).toEqual(1);
        expect(capturedClassBindingValue).toEqual('static-val dynamic-val');
        expect(capturedMyClassBindingCount).toEqual(1);
        expect(capturedMyClassBindingValue).toEqual('foo');
    });
    it('should allow multiple directives to set dynamic and static classes independent of one another', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div dir-one dir-two></div>
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
        let DirOne = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-one]',
                    host: { '[class.dir-one]': 'dirOneExp' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirOne = _classThis = class {
                constructor() {
                    this.dirOneExp = true;
                }
            };
            __setFunctionName(_classThis, "DirOne");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirOne = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirOne = _classThis;
        })();
        let DirTwo = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-two]',
                    host: { 'class': 'dir-two' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirTwo = _classThis = class {
            };
            __setFunctionName(_classThis, "DirTwo");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirTwo = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirTwo = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirOne, DirTwo] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expect(element.classList.contains('dir-one')).toBeTruthy();
        expect(element.classList.contains('dir-two')).toBeTruthy();
    });
    it('should not write empty style values to the DOM', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <div
            [style.color]="null"
            [style.--bg-color]="undefined"
            [style.margin]="''"
            [style.font-size]="'   '"></div>
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
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toBe('<div></div>');
    });
    describe('NgClass', () => {
        // We had a bug where NgClass would not allocate sufficient slots for host bindings,
        // so it would overwrite information about other directives nearby. This test checks
        // that TestDir's injector is not overwritten by NgClass, so TestDir should still
        // be found by DI when ChildDir is instantiated.
        it('should not overwrite other directive info when using NgClass', () => {
            let TestDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[test-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDir = _classThis = class {
                };
                __setFunctionName(_classThis, "TestDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestDir = _classThis;
            })();
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                    constructor(parent) {
                        this.parent = parent;
                    }
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <div class="my-class" [ngClass]="classMap" test-dir>
            <div *ngIf="showing" child-dir>Hello</div>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.classMap = { 'with-button': true };
                        this.showing = false;
                    }
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
            testing_1.TestBed.configureTestingModule({ declarations: [AppComponent, TestDir, ChildDir] });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const testDirDiv = fixture.debugElement.nativeElement.querySelector('div');
            expect(testDirDiv.classList).toContain('with-button');
            expect(fixture.debugElement.nativeElement.textContent).not.toContain('Hello');
            fixture.componentInstance.classMap = { 'with-button': false };
            fixture.componentInstance.showing = true;
            fixture.detectChanges();
            const childDir = fixture.debugElement.query(platform_browser_1.By.directive(ChildDir)).injector.get(ChildDir);
            expect(childDir.parent).toBeInstanceOf(TestDir);
            expect(testDirDiv.classList).not.toContain('with-button');
            expect(fixture.debugElement.nativeElement.textContent).toContain('Hello');
        });
    });
    it('should be able to name inputs starting with `class` or `style`', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classes_decorators;
            let _classes_initializers = [];
            let _classes_extraInitializers = [];
            let _style_decorators;
            let _style_initializers = [];
            let _style_extraInitializers = [];
            var Dir = _classThis = class {
                constructor() {
                    this.classes = __runInitializers(this, _classes_initializers, '');
                    this.style = (__runInitializers(this, _classes_extraInitializers), __runInitializers(this, _style_initializers, ''));
                    __runInitializers(this, _style_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _classes_decorators = [(0, core_1.Input)('classesInSchool')];
                _style_decorators = [(0, core_1.Input)('styleOfClothing')];
                __esDecorate(null, null, _classes_decorators, { kind: "field", name: "classes", static: false, private: false, access: { has: obj => "classes" in obj, get: obj => obj.classes, set: (obj, value) => { obj.classes = value; } }, metadata: _metadata }, _classes_initializers, _classes_extraInitializers);
                __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<span dir [classesInSchool]="classes" [styleOfClothing]="style"></span>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.classes = (__runInitializers(this, _dir_extraInitializers), 'math');
                    this.style = '80s';
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const directive = fixture.componentInstance.dir;
        expect(directive.classes).toBe('math');
        expect(directive.style).toBe('80s');
    });
    it('should be able to bind to `className`', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _klass_decorators;
            let _klass_initializers = [];
            let _klass_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.klass = __runInitializers(this, _klass_initializers, 'one two');
                    __runInitializers(this, _klass_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _klass_decorators = [(0, core_1.HostBinding)('className')];
                __esDecorate(null, null, _klass_decorators, { kind: "field", name: "klass", static: false, private: false, access: { has: obj => "klass" in obj, get: obj => obj.klass, set: (obj, value) => { obj.klass = value; } }, metadata: _metadata }, _klass_initializers, _klass_extraInitializers);
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
        const classList = fixture.nativeElement.classList;
        expect(classList.contains('one')).toBe(true);
        expect(classList.contains('two')).toBe(true);
    });
    it('should apply single property styles/classes to the element and default to any static styling values', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div [style.width]="w"
             [style.height]="h"
             [style.opacity]="o"
             style="width:200px; height:200px;"
             [class.abc]="abc"
             [class.xyz]="xyz"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.w = '100px';
                    this.h = '100px';
                    this.o = '0.5';
                    this.abc = true;
                    this.xyz = false;
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expect(element.style.width).toEqual('100px');
        expect(element.style.height).toEqual('100px');
        expect(element.style.opacity).toEqual('0.5');
        expect(element.classList.contains('abc')).toBeTruthy();
        expect(element.classList.contains('xyz')).toBeFalsy();
        fixture.componentInstance.w = undefined;
        fixture.componentInstance.h = undefined;
        fixture.componentInstance.o = undefined;
        fixture.componentInstance.abc = false;
        fixture.componentInstance.xyz = true;
        fixture.detectChanges();
        expect(element.style.width).toEqual('200px');
        expect(element.style.height).toEqual('200px');
        expect(element.style.opacity).toBeFalsy();
        expect(element.classList.contains('abc')).toBeFalsy();
        expect(element.classList.contains('xyz')).toBeTruthy();
        fixture.componentInstance.w = null;
        fixture.componentInstance.h = null;
        fixture.componentInstance.o = null;
        fixture.detectChanges();
        expect(element.style.width).toBeFalsy();
        expect(element.style.height).toBeFalsy();
        expect(element.style.opacity).toBeFalsy();
    });
    it('should apply single style/class across the template and directive host bindings', () => {
        let DirThatSetsWidthDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-that-sets-width]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _width_decorators;
            let _width_initializers = [];
            let _width_extraInitializers = [];
            var DirThatSetsWidthDirective = _classThis = class {
                constructor() {
                    this.width = __runInitializers(this, _width_initializers, '');
                    __runInitializers(this, _width_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirThatSetsWidthDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _width_decorators = [(0, core_1.Input)('dir-that-sets-width'), (0, core_1.HostBinding)('style.width')];
                __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirThatSetsWidthDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirThatSetsWidthDirective = _classThis;
        })();
        let AnotherDirThatSetsWidthDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[another-dir-that-sets-width]',
                    host: { '[style.width]': 'width' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _width_decorators;
            let _width_initializers = [];
            let _width_extraInitializers = [];
            var AnotherDirThatSetsWidthDirective = _classThis = class {
                constructor() {
                    this.width = __runInitializers(this, _width_initializers, '');
                    __runInitializers(this, _width_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "AnotherDirThatSetsWidthDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _width_decorators = [(0, core_1.Input)('another-dir-that-sets-width')];
                __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AnotherDirThatSetsWidthDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AnotherDirThatSetsWidthDirective = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div [style.width]="w0"
             [dir-that-sets-width]="w1"
             [another-dir-that-sets-width]="w2">
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.w0 = null;
                    this.w1 = null;
                    this.w2 = null;
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
            declarations: [Cmp, DirThatSetsWidthDirective, AnotherDirThatSetsWidthDirective],
        });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.componentInstance.w0 = '100px';
        fixture.componentInstance.w1 = '200px';
        fixture.componentInstance.w2 = '300px';
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expect(element.style.width).toEqual('100px');
        fixture.componentInstance.w0 = undefined;
        fixture.detectChanges();
        expect(element.style.width).toEqual('300px');
        fixture.componentInstance.w2 = undefined;
        fixture.detectChanges();
        expect(element.style.width).toEqual('200px');
        fixture.componentInstance.w1 = undefined;
        fixture.detectChanges();
        expect(element.style.width).toBeFalsy();
        fixture.componentInstance.w2 = '400px';
        fixture.detectChanges();
        expect(element.style.width).toEqual('400px');
        fixture.componentInstance.w1 = '500px';
        fixture.componentInstance.w0 = '600px';
        fixture.detectChanges();
        expect(element.style.width).toEqual('600px');
    });
    it('should only run stylingFlush once when there are no collisions between styling properties', () => {
        let DirWithStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-with-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _fontSize_decorators;
            let _fontSize_initializers = [];
            let _fontSize_extraInitializers = [];
            var DirWithStyling = _classThis = class {
                constructor() {
                    this.fontSize = __runInitializers(this, _fontSize_initializers, '100px');
                    __runInitializers(this, _fontSize_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _fontSize_decorators = [(0, core_1.HostBinding)('style.font-size')];
                __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirWithStyling = _classThis;
        })();
        let CompWithStyling = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-with-styling',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _width_decorators;
            let _width_initializers = [];
            let _width_extraInitializers = [];
            let _height_decorators;
            let _height_initializers = [];
            let _height_extraInitializers = [];
            var CompWithStyling = _classThis = class {
                constructor() {
                    this.width = __runInitializers(this, _width_initializers, '900px');
                    this.height = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _height_initializers, '900px'));
                    __runInitializers(this, _height_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CompWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _width_decorators = [(0, core_1.HostBinding)('style.width')];
                _height_decorators = [(0, core_1.HostBinding)('style.height')];
                __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
                __esDecorate(null, null, _height_decorators, { kind: "field", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompWithStyling = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp-with-styling
          [style.opacity]="opacity"
          dir-with-styling>...</comp-with-styling>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _compWithStyling_decorators;
            let _compWithStyling_initializers = [];
            let _compWithStyling_extraInitializers = [];
            let _dirWithStyling_decorators;
            let _dirWithStyling_initializers = [];
            let _dirWithStyling_extraInitializers = [];
            var Cmp = _classThis = class {
                constructor() {
                    this.opacity = '0.5';
                    this.compWithStyling = __runInitializers(this, _compWithStyling_initializers, null);
                    this.dirWithStyling = (__runInitializers(this, _compWithStyling_extraInitializers), __runInitializers(this, _dirWithStyling_initializers, null));
                    __runInitializers(this, _dirWithStyling_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _compWithStyling_decorators = [(0, core_1.ViewChild)(CompWithStyling, { static: true })];
                _dirWithStyling_decorators = [(0, core_1.ViewChild)(DirWithStyling, { static: true })];
                __esDecorate(null, null, _compWithStyling_decorators, { kind: "field", name: "compWithStyling", static: false, private: false, access: { has: obj => "compWithStyling" in obj, get: obj => obj.compWithStyling, set: (obj, value) => { obj.compWithStyling = value; } }, metadata: _metadata }, _compWithStyling_initializers, _compWithStyling_extraInitializers);
                __esDecorate(null, null, _dirWithStyling_decorators, { kind: "field", name: "dirWithStyling", static: false, private: false, access: { has: obj => "dirWithStyling" in obj, get: obj => obj.dirWithStyling, set: (obj, value) => { obj.dirWithStyling = value; } }, metadata: _metadata }, _dirWithStyling_initializers, _dirWithStyling_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirWithStyling, CompWithStyling] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const component = fixture.componentInstance;
        const element = fixture.nativeElement.querySelector('comp-with-styling');
        expect(element.style.opacity).toEqual('0.5');
        expect(element.style.width).toEqual('900px');
        expect(element.style.height).toEqual('900px');
        expect(element.style.fontSize).toEqual('100px');
        component.opacity = '0.6';
        component.compWithStyling.height = '100px';
        component.compWithStyling.width = '100px';
        component.dirWithStyling.fontSize = '50px';
        fixture.detectChanges();
        expect(element.style.opacity).toEqual('0.6');
        expect(element.style.width).toEqual('100px');
        expect(element.style.height).toEqual('100px');
        expect(element.style.fontSize).toEqual('50px');
    });
    it('should combine all styling across the template, directive and component host bindings', () => {
        let DirWithStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-with-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _color_decorators;
            let _color_initializers = [];
            let _color_extraInitializers = [];
            let _fontSize_decorators;
            let _fontSize_initializers = [];
            let _fontSize_extraInitializers = [];
            let _dirClass_decorators;
            let _dirClass_initializers = [];
            let _dirClass_extraInitializers = [];
            var DirWithStyling = _classThis = class {
                constructor() {
                    this.color = __runInitializers(this, _color_initializers, 'red');
                    this.fontSize = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _fontSize_initializers, '100px'));
                    this.dirClass = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _dirClass_initializers, true));
                    __runInitializers(this, _dirClass_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _color_decorators = [(0, core_1.HostBinding)('style.color')];
                _fontSize_decorators = [(0, core_1.HostBinding)('style.font-size')];
                _dirClass_decorators = [(0, core_1.HostBinding)('class.dir')];
                __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
                __esDecorate(null, null, _dirClass_decorators, { kind: "field", name: "dirClass", static: false, private: false, access: { has: obj => "dirClass" in obj, get: obj => obj.dirClass, set: (obj, value) => { obj.dirClass = value; } }, metadata: _metadata }, _dirClass_initializers, _dirClass_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirWithStyling = _classThis;
        })();
        let CompWithStyling = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-with-styling',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _width_decorators;
            let _width_initializers = [];
            let _width_extraInitializers = [];
            let _height_decorators;
            let _height_initializers = [];
            let _height_extraInitializers = [];
            let _compClass_decorators;
            let _compClass_initializers = [];
            let _compClass_extraInitializers = [];
            var CompWithStyling = _classThis = class {
                constructor() {
                    this.width = __runInitializers(this, _width_initializers, '900px');
                    this.height = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _height_initializers, '900px'));
                    this.compClass = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _compClass_initializers, true));
                    __runInitializers(this, _compClass_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CompWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _width_decorators = [(0, core_1.HostBinding)('style.width')];
                _height_decorators = [(0, core_1.HostBinding)('style.height')];
                _compClass_decorators = [(0, core_1.HostBinding)('class.comp')];
                __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
                __esDecorate(null, null, _height_decorators, { kind: "field", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
                __esDecorate(null, null, _compClass_decorators, { kind: "field", name: "compClass", static: false, private: false, access: { has: obj => "compClass" in obj, get: obj => obj.compClass, set: (obj, value) => { obj.compClass = value; } }, metadata: _metadata }, _compClass_initializers, _compClass_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompWithStyling = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <comp-with-styling
          [style.opacity]="opacity"
          [style.width]="width"
          [class.tpl]="tplClass"
          dir-with-styling>...</comp-with-styling>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.opacity = '0.5';
                    this.width = 'auto';
                    this.tplClass = true;
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
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirWithStyling, CompWithStyling] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('comp-with-styling');
        expectStyle(element).toEqual({
            'color': 'red',
            'font-size': '100px',
            'height': '900px',
            'opacity': '0.5',
            'width': 'auto',
        });
        expectClass(element).toEqual({
            'dir': true,
            'comp': true,
            'tpl': true,
        });
        fixture.componentInstance.width = undefined;
        fixture.componentInstance.opacity = undefined;
        fixture.componentInstance.tplClass = false;
        fixture.detectChanges();
        expectStyle(element).toEqual({
            'color': 'red',
            'width': '900px',
            'height': '900px',
            'font-size': '100px',
        });
        expectClass(element).toEqual({
            'dir': true,
            'comp': true,
        });
        fixture.componentInstance.width = null;
        fixture.componentInstance.opacity = null;
        fixture.detectChanges();
        expectStyle(element).toEqual({ 'color': 'red', 'height': '900px', 'font-size': '100px' });
    });
    it('should properly apply styling across sub and super class directive host bindings', () => {
        let SuperClassDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[super-class-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _w1_decorators;
            let _w1_initializers = [];
            let _w1_extraInitializers = [];
            var SuperClassDirective = _classThis = class {
                constructor() {
                    this.w1 = __runInitializers(this, _w1_initializers, '100px');
                    __runInitializers(this, _w1_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "SuperClassDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _w1_decorators = [(0, core_1.HostBinding)('style.width')];
                __esDecorate(null, null, _w1_decorators, { kind: "field", name: "w1", static: false, private: false, access: { has: obj => "w1" in obj, get: obj => obj.w1, set: (obj, value) => { obj.w1 = value; } }, metadata: _metadata }, _w1_initializers, _w1_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SuperClassDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SuperClassDirective = _classThis;
        })();
        let SubClassDirective = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[sub-class-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = SuperClassDirective;
            let _w2_decorators;
            let _w2_initializers = [];
            let _w2_extraInitializers = [];
            var SubClassDirective = _classThis = class extends _classSuper {
                constructor() {
                    super(...arguments);
                    this.w2 = __runInitializers(this, _w2_initializers, '200px');
                    __runInitializers(this, _w2_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "SubClassDirective");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                _w2_decorators = [(0, core_1.HostBinding)('style.width')];
                __esDecorate(null, null, _w2_decorators, { kind: "field", name: "w2", static: false, private: false, access: { has: obj => "w2" in obj, get: obj => obj.w2, set: (obj, value) => { obj.w2 = value; } }, metadata: _metadata }, _w2_initializers, _w2_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubClassDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubClassDirective = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <div sub-class-dir [style.width]="w3"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.w3 = '300px';
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
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, SuperClassDirective, SubClassDirective] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expectStyle(element).toEqual({
            'width': '300px',
        });
        fixture.componentInstance.w3 = null;
        fixture.detectChanges();
        expectStyle(element).toEqual({});
        fixture.componentInstance.w3 = undefined;
        fixture.detectChanges();
        expectStyle(element).toEqual({
            'width': '200px',
        });
    });
    it('should apply map-based style and class entries', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style]="s" [class]="c"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.c = null;
                    this.s = null;
                }
                updateClasses(classes) {
                    const c = this.c || (this.c = {});
                    Object.keys(this.c).forEach((className) => {
                        c[className] = false;
                    });
                    classes.split(/\s+/).forEach((className) => {
                        c[className] = true;
                    });
                }
                updateStyles(prop, value) {
                    const s = this.s || (this.s = {});
                    Object.assign(s, { [prop]: value });
                }
                reset() {
                    this.s = null;
                    this.c = null;
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        comp.updateStyles('width', '100px');
        comp.updateStyles('height', '200px');
        comp.updateClasses('abc');
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expectStyle(element).toEqual({ width: '100px', height: '200px' });
        expectClass(element).toEqual({ abc: true });
        comp.reset();
        comp.updateStyles('width', '500px');
        comp.updateStyles('height', null);
        comp.updateClasses('def');
        fixture.detectChanges();
        expectStyle(element).toEqual({ width: '500px' });
        expectClass(element).toEqual({ def: true });
    });
    it('should resolve styling collisions across templates, directives and components for prop and map-based entries', () => {
        let DirThatSetsStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-that-sets-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _map_decorators;
            let _map_initializers = [];
            let _map_extraInitializers = [];
            var DirThatSetsStyling = _classThis = class {
                constructor() {
                    this.map = __runInitializers(this, _map_initializers, { color: 'red', width: '777px' });
                    __runInitializers(this, _map_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirThatSetsStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _map_decorators = [(0, core_1.HostBinding)('style')];
                __esDecorate(null, null, _map_decorators, { kind: "field", name: "map", static: false, private: false, access: { has: obj => "map" in obj, get: obj => obj.map, set: (obj, value) => { obj.map = value; } }, metadata: _metadata }, _map_initializers, _map_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirThatSetsStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirThatSetsStyling = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div [style.width]="width"
             [style]="map"
             style="width:200px; font-size:99px"
             dir-that-sets-styling
             #dir
             [class.xyz]="xyz"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var Cmp = _classThis = class {
                constructor() {
                    this.map = { width: '111px', opacity: '0.5' };
                    this.width = '555px';
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)('dir', { read: DirThatSetsStyling, static: true })];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirThatSetsStyling] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expectStyle(element).toEqual({
            'width': '555px',
            'color': 'red',
            'font-size': '99px',
            'opacity': '0.5',
        });
        comp.width = undefined;
        fixture.detectChanges();
        expectStyle(element).toEqual({
            'width': '111px',
            'color': 'red',
            'font-size': '99px',
            'opacity': '0.5',
        });
        comp.map = null;
        fixture.detectChanges();
        expectStyle(element).toEqual({
            'width': '200px',
            'color': 'red',
            'font-size': '99px',
        });
        comp.dir.map = null;
        fixture.detectChanges();
        expectStyle(element).toEqual({
            'width': '200px',
            'font-size': '99px',
        });
    });
    it('should only apply each styling property once per CD across templates, components, directives', () => {
        let DirThatSetsStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-that-sets-styling]',
                    host: { 'style': 'width:0px; height:0px' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _map_decorators;
            let _map_initializers = [];
            let _map_extraInitializers = [];
            var DirThatSetsStyling = _classThis = class {
                constructor() {
                    this.map = __runInitializers(this, _map_initializers, { width: '999px', height: '999px' });
                    __runInitializers(this, _map_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirThatSetsStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _map_decorators = [(0, core_1.HostBinding)('style')];
                __esDecorate(null, null, _map_decorators, { kind: "field", name: "map", static: false, private: false, access: { has: obj => "map" in obj, get: obj => obj.map, set: (obj, value) => { obj.map = value; } }, metadata: _metadata }, _map_initializers, _map_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirThatSetsStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirThatSetsStyling = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
                <div #dir
                  [style.width]="width"
                  [style.height]="height"
                  [style]="map"
                  dir-that-sets-styling></div>
              `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var Cmp = _classThis = class {
                constructor() {
                    this.width = '111px';
                    this.height = '111px';
                    this.map = { width: '555px', height: '555px' };
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)('dir', { read: DirThatSetsStyling, static: true })];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirThatSetsStyling] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        assertStyle(element, 'width', '111px');
        assertStyle(element, 'height', '111px');
        comp.width = '222px';
        fixture.detectChanges();
        assertStyle(element, 'width', '222px');
        assertStyle(element, 'height', '111px');
        comp.height = '222px';
        fixture.detectChanges();
        assertStyle(element, 'width', '222px');
        assertStyle(element, 'height', '222px');
        comp.width = undefined;
        fixture.detectChanges();
        assertStyle(element, 'width', '555px');
        assertStyle(element, 'height', '222px');
        comp.width = '123px';
        comp.height = '123px';
        fixture.detectChanges();
        assertStyle(element, 'width', '123px');
        assertStyle(element, 'height', '123px');
        comp.map = {};
        fixture.detectChanges();
        // No change, hence no write
        assertStyle(element, 'width', '123px');
        assertStyle(element, 'height', '123px');
        comp.width = undefined;
        fixture.detectChanges();
        assertStyle(element, 'width', '999px');
        assertStyle(element, 'height', '123px');
        comp.dir.map = null;
        fixture.detectChanges();
        // the width is only applied once
        assertStyle(element, 'width', '0px');
        assertStyle(element, 'height', '123px');
        comp.dir.map = { width: '1000px', height: '1100px', color: 'red' };
        fixture.detectChanges();
        assertStyle(element, 'width', '1000px');
        assertStyle(element, 'height', '123px');
        assertStyle(element, 'color', 'red');
        comp.height = undefined;
        fixture.detectChanges();
        // height gets applied twice and all other
        // values get applied
        assertStyle(element, 'width', '1000px');
        assertStyle(element, 'height', '1100px');
        assertStyle(element, 'color', 'red');
        comp.map = { color: 'blue', width: '2000px', opacity: '0.5' };
        fixture.detectChanges();
        assertStyle(element, 'width', '2000px');
        assertStyle(element, 'height', '1100px');
        assertStyle(element, 'color', 'blue');
        assertStyle(element, 'opacity', '0.5');
        comp.map = { color: 'blue', width: '2000px' };
        fixture.detectChanges();
        // all four are applied because the map was altered
        assertStyle(element, 'width', '2000px');
        assertStyle(element, 'height', '1100px');
        assertStyle(element, 'color', 'blue');
        assertStyle(element, 'opacity', '');
    });
    it('should not sanitize style values before writing them', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
                        <div [style.width]="widthExp"
                             [style.background-image]="bgImageExp"></div>
                      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.widthExp = '';
                    this.bgImageExp = '';
                    this.styleMapExp = {};
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        comp.bgImageExp = 'url("javascript:img")';
        fixture.detectChanges();
        expect((0, styling_1.getSortedStyle)(div)).toContain('javascript:img');
        // Prove that bindings work.
        comp.widthExp = '789px';
        comp.bgImageExp = (0, bypass_1.bypassSanitizationTrustStyle)(comp.bgImageExp);
        fixture.detectChanges();
        expect(div.style.getPropertyValue('background-image')).toEqual('url("javascript:img")');
        expect(div.style.getPropertyValue('width')).toEqual('789px');
    });
    it('should not sanitize style values before writing them', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
                    <div [style.width]="widthExp"
                         [style]="styleMapExp"></div>
                  `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.widthExp = '';
                    this.styleMapExp = {};
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        comp.styleMapExp['background-image'] = 'url("javascript:img")';
        fixture.detectChanges();
        expect((0, styling_1.getSortedStyle)(div)).not.toContain('javascript');
        // Prove that bindings work.
        comp.widthExp = '789px';
        comp.styleMapExp = {
            'background-image': (0, bypass_1.bypassSanitizationTrustStyle)(comp.styleMapExp['background-image']),
        };
        fixture.detectChanges();
        expect(div.style.getPropertyValue('background-image')).toEqual('url("javascript:img")');
        expect(div.style.getPropertyValue('width')).toEqual('789px');
    });
    it('should apply a unit to a style before writing it', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <div [style.width.px]="widthExp"
                 [style.height.em]="heightExp"></div>
          `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.widthExp = '';
                    this.heightExp = '';
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        comp.widthExp = '200';
        comp.heightExp = 10;
        fixture.detectChanges();
        expect((0, styling_1.getSortedStyle)(div)).toEqual('height: 10em; width: 200px;');
        comp.widthExp = 0;
        comp.heightExp = null;
        fixture.detectChanges();
        expect((0, styling_1.getSortedStyle)(div)).toEqual('width: 0px;');
    });
    it('should be able to bind a SafeValue to clip-path', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style.clip-path]="path"></div>',
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const sanitizer = testing_1.TestBed.inject(platform_browser_1.DomSanitizer);
        fixture.componentInstance.path = sanitizer.bypassSecurityTrustStyle('url("#test")');
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        // Note that check the raw HTML, because (at the time of writing) the Node-based renderer
        // that we use to run tests doesn't support `clip-path` in `CSSStyleDeclaration`.
        expect(html).toMatch(/style=["|']clip-path:\s*url\(.*#test.*\)/);
    });
    it('should handle values wrapped into SafeValue', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <!-- Verify sanitizable style prop values wrapped in SafeValue -->
        <div [style.background]="getBackgroundSafe()"></div>

        <!-- Verify regular style prop values wrapped in SafeValue -->
        <p [style.width]="getWidthSafe()" [style.height]="getHeightSafe()"></p>

        <!-- Verify regular style prop values not wrapped in SafeValue -->
        <span [style.color]="getColorUnsafe()"></span>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(sanitizer) {
                    this.sanitizer = sanitizer;
                    this.width = 'calc(20%)';
                    this.height = '10px';
                    this.background = '1.png';
                    this.color = 'red';
                }
                getSafeStyle(value) {
                    return this.sanitizer.bypassSecurityTrustStyle(value);
                }
                getBackgroundSafe() {
                    return this.getSafeStyle(`url("/${this.background}")`);
                }
                getWidthSafe() {
                    return this.getSafeStyle(this.width);
                }
                getHeightSafe() {
                    return this.getSafeStyle(this.height);
                }
                getColorUnsafe() {
                    return this.color;
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
        testing_1.TestBed.configureTestingModule({
            imports: [common_1.CommonModule],
            declarations: [MyComp],
        });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const comp = fixture.componentInstance;
        const div = fixture.nativeElement.querySelector('div');
        const p = fixture.nativeElement.querySelector('p');
        const span = fixture.nativeElement.querySelector('span');
        expect(div.style.background).toContain('url("/1.png")');
        expect(p.style.width).toBe('calc(20%)');
        expect(p.style.height).toBe('10px');
        expect(span.style.color).toBe('red');
        comp.background = '2.png';
        comp.width = '5px';
        comp.height = '100%';
        comp.color = 'green';
        fixture.detectChanges();
        expect(div.style.background).toContain('url("/2.png")');
        expect(p.style.width).toBe('5px');
        expect(p.style.height).toBe('100%');
        expect(span.style.color).toBe('green');
    });
    it('should evaluate follow-up [style] maps even if a former map is null', () => {
        let DirWithStyleMap = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-with-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _styleMap_decorators;
            let _styleMap_initializers = [];
            let _styleMap_extraInitializers = [];
            var DirWithStyleMap = _classThis = class {
                constructor() {
                    this.styleMap = __runInitializers(this, _styleMap_initializers, { color: 'red' });
                    __runInitializers(this, _styleMap_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirWithStyleMap");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _styleMap_decorators = [(0, core_1.HostBinding)('style')];
                __esDecorate(null, null, _styleMap_decorators, { kind: "field", name: "styleMap", static: false, private: false, access: { has: obj => "styleMap" in obj, get: obj => obj.styleMap, set: (obj, value) => { obj.styleMap = value; } }, metadata: _metadata }, _styleMap_initializers, _styleMap_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirWithStyleMap = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirWithStyleMap = _classThis;
        })();
        let DirWithStyleMapPart2 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-with-styling-part2]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _styleMap_decorators;
            let _styleMap_initializers = [];
            let _styleMap_extraInitializers = [];
            var DirWithStyleMapPart2 = _classThis = class {
                constructor() {
                    this.styleMap = __runInitializers(this, _styleMap_initializers, { width: '200px' });
                    __runInitializers(this, _styleMap_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirWithStyleMapPart2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _styleMap_decorators = [(0, core_1.HostBinding)('style')];
                __esDecorate(null, null, _styleMap_decorators, { kind: "field", name: "styleMap", static: false, private: false, access: { has: obj => "styleMap" in obj, get: obj => obj.styleMap, set: (obj, value) => { obj.styleMap = value; } }, metadata: _metadata }, _styleMap_initializers, _styleMap_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirWithStyleMapPart2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirWithStyleMapPart2 = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div #div
              [style]="map"
              dir-with-styling
              dir-with-styling-part2></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir1_decorators;
            let _dir1_initializers = [];
            let _dir1_extraInitializers = [];
            let _dir2_decorators;
            let _dir2_initializers = [];
            let _dir2_extraInitializers = [];
            var Cmp = _classThis = class {
                constructor() {
                    this.map = null;
                    this.dir1 = __runInitializers(this, _dir1_initializers, void 0);
                    this.dir2 = (__runInitializers(this, _dir1_extraInitializers), __runInitializers(this, _dir2_initializers, void 0));
                    __runInitializers(this, _dir2_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir1_decorators = [(0, core_1.ViewChild)('div', { read: DirWithStyleMap, static: true })];
                _dir2_decorators = [(0, core_1.ViewChild)('div', { read: DirWithStyleMapPart2, static: true })];
                __esDecorate(null, null, _dir1_decorators, { kind: "field", name: "dir1", static: false, private: false, access: { has: obj => "dir1" in obj, get: obj => obj.dir1, set: (obj, value) => { obj.dir1 = value; } }, metadata: _metadata }, _dir1_initializers, _dir1_extraInitializers);
                __esDecorate(null, null, _dir2_decorators, { kind: "field", name: "dir2", static: false, private: false, access: { has: obj => "dir2" in obj, get: obj => obj.dir2, set: (obj, value) => { obj.dir2 = value; } }, metadata: _metadata }, _dir2_initializers, _dir2_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirWithStyleMap, DirWithStyleMapPart2] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expectStyle(element).toEqual({
            color: 'red',
            width: '200px',
        });
    });
    it('should evaluate initial style/class values on a list of elements that changes', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <div *ngFor="let item of items"
                  class="initial-class item-{{ item }}">
              {{ item }}
            </div>
          `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        function getItemElements() {
            return [].slice.call(fixture.nativeElement.querySelectorAll('div'));
        }
        function getItemClasses() {
            return getItemElements()
                .map((e) => e.className)
                .sort()
                .join(' ')
                .split(' ');
        }
        expect(getItemElements().length).toEqual(3);
        expect(getItemClasses()).toEqual([
            'initial-class',
            'item-1',
            'initial-class',
            'item-2',
            'initial-class',
            'item-3',
        ]);
        comp.items = [2, 4, 6, 8];
        fixture.detectChanges();
        expect(getItemElements().length).toEqual(4);
        expect(getItemClasses()).toEqual([
            'initial-class',
            'item-2',
            'initial-class',
            'item-4',
            'initial-class',
            'item-6',
            'initial-class',
            'item-8',
        ]);
    });
    it('should create and update multiple class bindings across multiple elements in a template', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <header class="header">header</header>
            <div *ngFor="let item of items" class="item item-{{ item }}">
              {{ item }}
            </div>
            <footer class="footer">footer</footer>
          `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        function getItemElements() {
            return [].slice.call(fixture.nativeElement.querySelectorAll('div'));
        }
        function getItemClasses() {
            return getItemElements()
                .map((e) => e.className)
                .sort()
                .join(' ')
                .split(' ');
        }
        const header = fixture.nativeElement.querySelector('header');
        expect(header.classList.contains('header')).toBeTrue();
        const footer = fixture.nativeElement.querySelector('footer');
        expect(footer.classList.contains('footer')).toBeTrue();
        expect(getItemElements().length).toEqual(3);
        expect(getItemClasses()).toEqual(['item', 'item-1', 'item', 'item-2', 'item', 'item-3']);
    });
    it('should understand multiple directives which contain initial classes', () => {
        let DirOne = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'dir-one',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _className_decorators;
            let _className_initializers = [];
            let _className_extraInitializers = [];
            var DirOne = _classThis = class {
                constructor() {
                    this.className = __runInitializers(this, _className_initializers, 'dir-one');
                    __runInitializers(this, _className_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirOne");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _className_decorators = [(0, core_1.HostBinding)('class')];
                __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirOne = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirOne = _classThis;
        })();
        let DirTwo = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'dir-two',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _className_decorators;
            let _className_initializers = [];
            let _className_extraInitializers = [];
            var DirTwo = _classThis = class {
                constructor() {
                    this.className = __runInitializers(this, _className_initializers, 'dir-two');
                    __runInitializers(this, _className_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirTwo");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _className_decorators = [(0, core_1.HostBinding)('class')];
                __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirTwo = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirTwo = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <dir-one></dir-one>
            <div class="initial"></div>
            <dir-two></dir-two>
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
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirOne, DirTwo] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const dirOne = fixture.nativeElement.querySelector('dir-one');
        const div = fixture.nativeElement.querySelector('div');
        const dirTwo = fixture.nativeElement.querySelector('dir-two');
        expect(dirOne.classList.contains('dir-one')).toBeTruthy();
        expect(dirTwo.classList.contains('dir-two')).toBeTruthy();
        expect(div.classList.contains('initial')).toBeTruthy();
    });
    it('should evaluate styling across the template directives when there are multiple elements/sources of styling', () => {
        let DirOne = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[one]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _className_decorators;
            let _className_initializers = [];
            let _className_extraInitializers = [];
            var DirOne = _classThis = class {
                constructor() {
                    this.className = __runInitializers(this, _className_initializers, 'dir-one');
                    __runInitializers(this, _className_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirOne");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _className_decorators = [(0, core_1.HostBinding)('class')];
                __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirOne = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirOne = _classThis;
        })();
        let DirTwo = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[two]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _className_decorators;
            let _className_initializers = [];
            let _className_extraInitializers = [];
            var DirTwo = _classThis = class {
                constructor() {
                    this.className = __runInitializers(this, _className_initializers, 'dir-two');
                    __runInitializers(this, _className_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirTwo");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _className_decorators = [(0, core_1.HostBinding)('class')];
                __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirTwo = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirTwo = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
                <div class="a" [style.width.px]="w" one></div>
                <div class="b" [style.height.px]="h" one two></div>
                <div class="c" [style.color]="c" two></div>
              `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.w = 100;
                    this.h = 200;
                    this.c = 'red';
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
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirOne, DirTwo] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const divA = fixture.nativeElement.querySelector('.a');
        const divB = fixture.nativeElement.querySelector('.b');
        const divC = fixture.nativeElement.querySelector('.c');
        expect(divA.style.width).toEqual('100px');
        expect(divB.style.height).toEqual('200px');
        expect(divC.style.color).toEqual('red');
    });
    it('should evaluate styling across the template and directives within embedded views', () => {
        let SomeDirWithStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[some-dir-with-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _styles_decorators;
            let _styles_initializers = [];
            let _styles_extraInitializers = [];
            var SomeDirWithStyling = _classThis = class {
                constructor() {
                    this.styles = __runInitializers(this, _styles_initializers, {
                        width: '200px',
                        height: '500px',
                    });
                    __runInitializers(this, _styles_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "SomeDirWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _styles_decorators = [(0, core_1.HostBinding)('style')];
                __esDecorate(null, null, _styles_decorators, { kind: "field", name: "styles", static: false, private: false, access: { has: obj => "styles" in obj, get: obj => obj.styles, set: (obj, value) => { obj.styles = value; } }, metadata: _metadata }, _styles_initializers, _styles_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeDirWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeDirWithStyling = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
                <div
                  class="item"
                  *ngFor="let item of items; let i = index"
                  [style.color]="c"
                  [style.height.px]="h * i"
                  some-dir-with-styling>
                  {{ item }}
                </div>
                <section [style.width.px]="w"></section>
                <p [style.height.px]="h"></p>
              `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.items = [];
                    this.c = 'red';
                    this.w = 100;
                    this.h = 100;
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
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, SomeDirWithStyling] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        comp.items = [1, 2, 3, 4];
        fixture.detectChanges();
        const items = fixture.nativeElement.querySelectorAll('.item');
        expect(items.length).toEqual(4);
        expect(items[0].style.height).toEqual('0px');
        expect(items[1].style.height).toEqual('100px');
        expect(items[2].style.height).toEqual('200px');
        expect(items[3].style.height).toEqual('300px');
        const section = fixture.nativeElement.querySelector('section');
        const p = fixture.nativeElement.querySelector('p');
        expect(section.style['width']).toEqual('100px');
        expect(p.style['height']).toEqual('100px');
    });
    it("should flush bindings even if any styling hasn't changed in a previous directive", () => {
        let DirOne = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[one]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _w_decorators;
            let _w_initializers = [];
            let _w_extraInitializers = [];
            let _o_decorators;
            let _o_initializers = [];
            let _o_extraInitializers = [];
            var DirOne = _classThis = class {
                constructor() {
                    this.w = __runInitializers(this, _w_initializers, '100px');
                    this.o = (__runInitializers(this, _w_extraInitializers), __runInitializers(this, _o_initializers, '0.5'));
                    __runInitializers(this, _o_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirOne");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _w_decorators = [(0, core_1.HostBinding)('style.width')];
                _o_decorators = [(0, core_1.HostBinding)('style.opacity')];
                __esDecorate(null, null, _w_decorators, { kind: "field", name: "w", static: false, private: false, access: { has: obj => "w" in obj, get: obj => obj.w, set: (obj, value) => { obj.w = value; } }, metadata: _metadata }, _w_initializers, _w_extraInitializers);
                __esDecorate(null, null, _o_decorators, { kind: "field", name: "o", static: false, private: false, access: { has: obj => "o" in obj, get: obj => obj.o, set: (obj, value) => { obj.o = value; } }, metadata: _metadata }, _o_initializers, _o_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirOne = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirOne = _classThis;
        })();
        let DirTwo = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[two]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _h_decorators;
            let _h_initializers = [];
            let _h_extraInitializers = [];
            let _c_decorators;
            let _c_initializers = [];
            let _c_extraInitializers = [];
            var DirTwo = _classThis = class {
                constructor() {
                    this.h = __runInitializers(this, _h_initializers, '200px');
                    this.c = (__runInitializers(this, _h_extraInitializers), __runInitializers(this, _c_initializers, 'red'));
                    __runInitializers(this, _c_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirTwo");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _h_decorators = [(0, core_1.HostBinding)('style.height')];
                _c_decorators = [(0, core_1.HostBinding)('style.color')];
                __esDecorate(null, null, _h_decorators, { kind: "field", name: "h", static: false, private: false, access: { has: obj => "h" in obj, get: obj => obj.h, set: (obj, value) => { obj.h = value; } }, metadata: _metadata }, _h_initializers, _h_extraInitializers);
                __esDecorate(null, null, _c_decorators, { kind: "field", name: "c", static: false, private: false, access: { has: obj => "c" in obj, get: obj => obj.c, set: (obj, value) => { obj.c = value; } }, metadata: _metadata }, _c_initializers, _c_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirTwo = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirTwo = _classThis;
        })();
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div #target one two></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _one_decorators;
            let _one_initializers = [];
            let _one_extraInitializers = [];
            let _two_decorators;
            let _two_initializers = [];
            let _two_extraInitializers = [];
            var Cmp = _classThis = class {
                constructor() {
                    this.one = __runInitializers(this, _one_initializers, void 0);
                    this.two = (__runInitializers(this, _one_extraInitializers), __runInitializers(this, _two_initializers, void 0));
                    __runInitializers(this, _two_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _one_decorators = [(0, core_1.ViewChild)('target', { read: DirOne, static: true })];
                _two_decorators = [(0, core_1.ViewChild)('target', { read: DirTwo, static: true })];
                __esDecorate(null, null, _one_decorators, { kind: "field", name: "one", static: false, private: false, access: { has: obj => "one" in obj, get: obj => obj.one, set: (obj, value) => { obj.one = value; } }, metadata: _metadata }, _one_initializers, _one_extraInitializers);
                __esDecorate(null, null, _two_decorators, { kind: "field", name: "two", static: false, private: false, access: { has: obj => "two" in obj, get: obj => obj.two, set: (obj, value) => { obj.two = value; } }, metadata: _metadata }, _two_initializers, _two_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirOne, DirTwo] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.opacity).toEqual('0.5');
        expect(div.style.color).toEqual('red');
        expect(div.style.width).toEqual('100px');
        expect(div.style.height).toEqual('200px');
        comp.two.h = '300px';
        fixture.detectChanges();
        expect(div.style.opacity).toEqual('0.5');
        expect(div.style.color).toEqual('red');
        expect(div.style.width).toEqual('100px');
        expect(div.style.height).toEqual('300px');
    });
    it('should work with NO_CHANGE values if they are applied to bindings ', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <div
              [style.width]="w"
              style.height="{{ h }}"
              [style.opacity]="o"></div>
          `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.w = null;
                    this.h = null;
                    this.o = null;
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        comp.w = '100px';
        comp.h = '200px';
        comp.o = '0.5';
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.width).toEqual('100px');
        expect(div.style.height).toEqual('200px');
        expect(div.style.opacity).toEqual('0.5');
        comp.w = '500px';
        comp.o = '1';
        fixture.detectChanges();
        expect(div.style.width).toEqual('500px');
        expect(div.style.height).toEqual('200px');
        expect(div.style.opacity).toEqual('1');
    });
    it('should allow [ngStyle] and [ngClass] to be used together', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <div [ngClass]="c" [ngStyle]="s"></div>
          `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.c = 'foo bar';
                    this.s = { width: '200px' };
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.width).toEqual('200px');
        expect(div.classList.contains('foo')).toBeTruthy();
        expect(div.classList.contains('bar')).toBeTruthy();
    });
    it('should allow to reset style property value defined using ngStyle', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div [ngStyle]="s"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.s = { opacity: '1' };
                }
                clearStyle() {
                    this.s = null;
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        const comp = fixture.componentInstance;
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.opacity).toEqual('1');
        comp.clearStyle();
        fixture.detectChanges();
        expect(div.style.opacity).toEqual('');
    });
    it('should allow detectChanges to be run in a property change that causes additional styling to be rendered', () => {
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `
          <div [class.ready-child]="readyTpl"></div>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _readyHost_decorators;
            let _readyHost_initializers = [];
            let _readyHost_extraInitializers = [];
            var ChildCmp = _classThis = class {
                constructor() {
                    this.readyTpl = false;
                    this.readyHost = __runInitializers(this, _readyHost_initializers, false);
                    __runInitializers(this, _readyHost_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _readyHost_decorators = [(0, core_1.HostBinding)('class.ready-host')];
                __esDecorate(null, null, _readyHost_decorators, { kind: "field", name: "readyHost", static: false, private: false, access: { has: obj => "readyHost" in obj, get: obj => obj.readyHost, set: (obj, value) => { obj.readyHost = value; } }, metadata: _metadata }, _readyHost_initializers, _readyHost_extraInitializers);
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
            var ParentCmp = _classThis = class {
                constructor() {
                    this._prop = (__runInitializers(this, _instanceExtraInitializers), '');
                    this.vcr = __runInitializers(this, _vcr_initializers, null);
                    this.child = (__runInitializers(this, _vcr_extraInitializers), null);
                }
                set prop(value) {
                    this._prop = value;
                    if (this.child && value === 'go') {
                        this.child.instance.readyHost = true;
                        this.child.instance.readyTpl = true;
                        this.child.changeDetectorRef.detectChanges();
                    }
                }
                get prop() {
                    return this._prop;
                }
                ngAfterViewInit() {
                    this.child = this.vcr.createComponent(ChildCmp);
                }
            };
            __setFunctionName(_classThis, "ParentCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _vcr_decorators = [(0, core_1.ViewChild)('template', { read: core_1.ViewContainerRef })];
                _set_prop_decorators = [(0, core_1.Input)()];
                __esDecorate(_classThis, null, _set_prop_decorators, { kind: "setter", name: "prop", static: false, private: false, access: { has: obj => "prop" in obj, set: (obj, value) => { obj.prop = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentCmp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<parent [prop]="prop"></parent>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.prop = 'a';
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
        fixture.detectChanges(false);
        let readyHost = fixture.nativeElement.querySelector('.ready-host');
        let readyChild = fixture.nativeElement.querySelector('.ready-child');
        expect(readyHost).toBeFalsy();
        expect(readyChild).toBeFalsy();
        fixture.componentInstance.prop = 'go';
        fixture.detectChanges(false);
        readyHost = fixture.nativeElement.querySelector('.ready-host');
        readyChild = fixture.nativeElement.querySelector('.ready-child');
        expect(readyHost).toBeTruthy();
        expect(readyChild).toBeTruthy();
    });
    it('should allow detectChanges to be run in a hook that causes additional styling to be rendered', () => {
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `
          <div [class.ready-child]="readyTpl"></div>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _readyHost_decorators;
            let _readyHost_initializers = [];
            let _readyHost_extraInitializers = [];
            var ChildCmp = _classThis = class {
                constructor() {
                    this.readyTpl = false;
                    this.readyHost = __runInitializers(this, _readyHost_initializers, false);
                    __runInitializers(this, _readyHost_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _readyHost_decorators = [(0, core_1.HostBinding)('class.ready-host')];
                __esDecorate(null, null, _readyHost_decorators, { kind: "field", name: "readyHost", static: false, private: false, access: { has: obj => "readyHost" in obj, get: obj => obj.readyHost, set: (obj, value) => { obj.readyHost = value; } }, metadata: _metadata }, _readyHost_initializers, _readyHost_extraInitializers);
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
          </div>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _vcr_decorators;
            let _vcr_initializers = [];
            let _vcr_extraInitializers = [];
            var ParentCmp = _classThis = class {
                constructor() {
                    this.updateChild = false;
                    this.vcr = __runInitializers(this, _vcr_initializers, null);
                    this.child = (__runInitializers(this, _vcr_extraInitializers), null);
                }
                ngDoCheck() {
                    if (this.updateChild) {
                        this.child.instance.readyHost = true;
                        this.child.instance.readyTpl = true;
                        this.child.changeDetectorRef.detectChanges();
                    }
                }
                ngAfterViewInit() {
                    this.child = this.vcr.createComponent(ChildCmp);
                }
            };
            __setFunctionName(_classThis, "ParentCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _vcr_decorators = [(0, core_1.ViewChild)('template', { read: core_1.ViewContainerRef })];
                __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentCmp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<parent #parent></parent>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _parent_decorators;
            let _parent_initializers = [];
            let _parent_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.parent = __runInitializers(this, _parent_initializers, null);
                    __runInitializers(this, _parent_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _parent_decorators = [(0, core_1.ViewChild)('parent', { static: true })];
                __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, ParentCmp, ChildCmp] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges(false);
        let readyHost = fixture.nativeElement.querySelector('.ready-host');
        let readyChild = fixture.nativeElement.querySelector('.ready-child');
        expect(readyHost).toBeFalsy();
        expect(readyChild).toBeFalsy();
        const parent = fixture.componentInstance.parent;
        parent.updateChild = true;
        fixture.detectChanges(false);
        readyHost = fixture.nativeElement.querySelector('.ready-host');
        readyChild = fixture.nativeElement.querySelector('.ready-child');
        expect(readyHost).toBeTruthy();
        expect(readyChild).toBeTruthy();
    });
    it('should allow various duplicate properties to be defined in various styling maps within the template and directive styling bindings', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
           <div [style.width]="w"
                [style.height]="h"
                [style]="s1"
                [dir-with-styling]="s2">
         `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.h = '100px';
                    this.w = '100px';
                    this.s1 = { border: '10px solid black', width: '200px' };
                    this.s2 = { border: '10px solid red', width: '300px' };
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
        let DirectiveExpectingStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-with-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _styles_decorators;
            let _styles_initializers = [];
            let _styles_extraInitializers = [];
            var DirectiveExpectingStyling = _classThis = class {
                constructor() {
                    this.styles = __runInitializers(this, _styles_initializers, null);
                    __runInitializers(this, _styles_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirectiveExpectingStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _styles_decorators = [(0, core_1.Input)('dir-with-styling'), (0, core_1.HostBinding)('style')];
                __esDecorate(null, null, _styles_decorators, { kind: "field", name: "styles", static: false, private: false, access: { has: obj => "styles" in obj, get: obj => obj.styles, set: (obj, value) => { obj.styles = value; } }, metadata: _metadata }, _styles_initializers, _styles_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveExpectingStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveExpectingStyling = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, DirectiveExpectingStyling] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expect(element.style.border).toEqual('10px solid black');
        expect(element.style.width).toEqual('100px');
        expect(element.style.height).toEqual('100px');
        fixture.componentInstance.s1 = null;
        fixture.detectChanges();
        expect(element.style.border).toEqual('10px solid red');
        expect(element.style.width).toEqual('100px');
        expect(element.style.height).toEqual('100px');
    });
    it('should retrieve styles set via Renderer2', () => {
        let dirInstance;
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor(elementRef, renderer) {
                    this.elementRef = elementRef;
                    this.renderer = renderer;
                    dirInstance = this;
                }
                setStyles() {
                    const nativeEl = this.elementRef.nativeElement;
                    this.renderer.setStyle(nativeEl, 'transform', 'translate3d(0px, 0px, 0px)');
                    this.renderer.addClass(nativeEl, 'my-class');
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div dir></div>`,
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
            declarations: [App, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        dirInstance.setStyles();
        const div = fixture.debugElement.children[0];
        expect(div.styles['transform']).toMatch(/translate3d\(0px\s*,\s*0px\s*,\s*0px\)/);
        expect(div.classes['my-class']).toBe(true);
    });
    it('should remove styles via Renderer2', () => {
        let dirInstance;
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor(elementRef, renderer) {
                    this.elementRef = elementRef;
                    this.renderer = renderer;
                    dirInstance = this;
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div dir></div>`,
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
            declarations: [App, Dir],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const div = fixture.debugElement.children[0];
        const nativeEl = dirInstance.elementRef.nativeElement;
        // camel case
        dirInstance.renderer.setStyle(nativeEl, 'backgroundColor', 'red');
        expect(div.styles['backgroundColor']).toBe('red');
        dirInstance.renderer.removeStyle(nativeEl, 'backgroundColor');
        expect(div.styles['backgroundColor']).toBe('');
        // kebab case
        dirInstance.renderer.setStyle(nativeEl, 'background-color', 'red');
        expect(div.styles['backgroundColor']).toBe('red');
        dirInstance.renderer.removeStyle(nativeEl, 'background-color');
        expect(div.styles['backgroundColor']).toBe('');
    });
    it('should not set classes when falsy value is passed while a sanitizer is present', () => {
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    // Note that we use `background` here because it needs to be sanitized.
                    template: `
        <span class="container" [ngClass]="{disabled: isDisabled}"></span>
        <div [style.background]="background"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor() {
                    this.isDisabled = false;
                    this.background = 'orange';
                }
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
        testing_1.TestBed.configureTestingModule({ declarations: [AppComponent] });
        const fixture = testing_1.TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const span = fixture.nativeElement.querySelector('span');
        expect(span.classList).not.toContain('disabled');
        // The issue we're testing for happens after the second change detection.
        fixture.detectChanges();
        expect(span.classList).not.toContain('disabled');
    });
    it('should not set classes when falsy value is passed while a sanitizer from host bindings is present', () => {
        let StylesDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[blockStyles]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _border_decorators;
            let _border_initializers = [];
            let _border_extraInitializers = [];
            let _background_decorators;
            let _background_initializers = [];
            let _background_extraInitializers = [];
            var StylesDirective = _classThis = class {
                constructor() {
                    this.border = __runInitializers(this, _border_initializers, '1px solid red');
                    this.background = (__runInitializers(this, _border_extraInitializers), __runInitializers(this, _background_initializers, 'white'));
                    __runInitializers(this, _background_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "StylesDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _border_decorators = [(0, core_1.HostBinding)('style.border')];
                _background_decorators = [(0, core_1.HostBinding)('style.background')];
                __esDecorate(null, null, _border_decorators, { kind: "field", name: "border", static: false, private: false, access: { has: obj => "border" in obj, get: obj => obj.border, set: (obj, value) => { obj.border = value; } }, metadata: _metadata }, _border_initializers, _border_extraInitializers);
                __esDecorate(null, null, _background_decorators, { kind: "field", name: "background", static: false, private: false, access: { has: obj => "background" in obj, get: obj => obj.background, set: (obj, value) => { obj.background = value; } }, metadata: _metadata }, _background_initializers, _background_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StylesDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StylesDirective = _classThis;
        })();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div class="container" [ngClass]="{disabled: isDisabled}" blockStyles></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor() {
                    this.isDisabled = false;
                }
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
        testing_1.TestBed.configureTestingModule({ declarations: [AppComponent, StylesDirective] });
        const fixture = testing_1.TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.classList.contains('disabled')).toBe(false);
        // The issue we're testing for happens after the second change detection.
        fixture.detectChanges();
        expect(div.classList.contains('disabled')).toBe(false);
    });
    it('should throw an error if a prop-based style/class binding value is changed during checkNoChanges', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div [style.color]="color" [class.foo]="fooClass"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.color = 'red';
                    this.fooClass = true;
                }
                ngAfterViewInit() {
                    this.color = 'blue';
                    this.fooClass = false;
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        expect(() => {
            fixture.detectChanges();
        }).toThrowError(/ExpressionChangedAfterItHasBeenCheckedError/);
    });
    it('should throw an error if a map-based style/class binding value is changed during checkNoChanges', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
                <div [style]="style" [class]="klass"></div>
              `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.style = 'width: 100px';
                    this.klass = 'foo';
                }
                ngAfterViewInit() {
                    this.style = 'height: 200px';
                    this.klass = 'bar';
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        expect(() => {
            fixture.detectChanges();
        }).toThrowError(/ExpressionChangedAfterItHasBeenCheckedError/);
    });
    it('should properly merge class interpolation with class-based directives', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div class="zero {{one}}" [class.two]="true" [ngClass]="'three'"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.one = 'one';
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
        const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('zero');
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('one');
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('two');
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('three');
    });
    it('should allow static and bound `class` attribute, but use last occurrence', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div id="first" class="zero {{one}}" [class]="'two'"></div>
        <div id="second" [class]="'two'" class="zero {{one}}"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.one = 'one';
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
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const first = fixture.nativeElement.querySelector('#first').outerHTML;
        expect(first).not.toContain('zero');
        expect(first).not.toContain('one');
        expect(first).toContain('two');
        const second = fixture.nativeElement.querySelector('#second').outerHTML;
        expect(second).toContain('zero');
        expect(second).toContain('one');
        expect(second).not.toContain('two');
    });
    it('should allow static and bound `style` attribute, but use last occurrence', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div id="first" style="margin: {{margin}}" [style]="'padding: 20px;'"></div>
        <div id="second" [style]="'padding: 20px;'" style="margin: {{margin}}"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.margin = '10px';
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
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const first = fixture.nativeElement.querySelector('#first').outerHTML;
        expect(first).not.toContain('margin');
        expect(first).toContain('padding');
        const second = fixture.nativeElement.querySelector('#second').outerHTML;
        expect(second).toContain('margin');
        expect(second).not.toContain('padding');
    });
    it('should allow to reset style property value defined using [style.prop.px] binding', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [style.left.px]="left"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.left = '';
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
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const checks = [
            ['15', '15px'],
            [undefined, ''],
            [null, ''],
            ['', ''],
            ['0', '0px'],
        ];
        const div = fixture.nativeElement.querySelector('div');
        checks.forEach((check) => {
            const [fieldValue, expectedValue] = check;
            fixture.componentInstance.left = fieldValue;
            fixture.detectChanges();
            expect(div.style.left).toBe(expectedValue);
        });
    });
    it('should retain classes added externally', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [class]="exp"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.exp = '';
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
        const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        div.className += ' abc';
        expect(splitSortJoin(div.className)).toEqual('abc');
        fixture.componentInstance.exp = '1 2 3';
        fixture.detectChanges();
        expect(splitSortJoin(div.className)).toEqual('1 2 3 abc');
        fixture.componentInstance.exp = '4 5 6 7';
        fixture.detectChanges();
        expect(splitSortJoin(div.className)).toEqual('4 5 6 7 abc');
        function splitSortJoin(s) {
            return s.split(/\s+/).sort().join(' ').trim();
        }
    });
    describe('ExpressionChangedAfterItHasBeenCheckedError', () => {
        it('should not throw when bound to SafeValue', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [style.background-image]="iconSafe"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    get iconSafe() {
                        return this.sanitizer.bypassSecurityTrustStyle(`url("${this.icon}")`);
                    }
                    constructor(sanitizer) {
                        this.sanitizer = sanitizer;
                        this.icon = 'https://i.imgur.com/4AiXzf8.jpg';
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
            const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
            fixture.detectChanges(true /* Verify that check no changes does not cause an exception */);
            const div = fixture.nativeElement.querySelector('div');
            expect(div.style.getPropertyValue('background-image')).toEqual('url("https://i.imgur.com/4AiXzf8.jpg")');
        });
    });
    isBrowser &&
        it('should process <style> tag contents extracted from template', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <style>
          div { width: 10px; }
        </style>
        <div></div>
      `,
                        styles: ['div { width: 100px; }'],
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
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            // `styles` array values are applied first, styles from <style> tags second.
            const div = fixture.nativeElement.querySelector('div');
            expect(getComputedStyle(div).width).toBe('10px');
        });
    it('should allow multiple styling bindings to work alongside property/attribute bindings', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div
            dir-that-sets-styles
            [style]="{'font-size': '300px'}"
            [attr.title]="'my-title'"
            [attr.data-foo]="'my-foo'">
        </div>`,
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
        let DirThatSetsStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-that-sets-styles]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _w_decorators;
            let _w_initializers = [];
            let _w_extraInitializers = [];
            let _h_decorators;
            let _h_initializers = [];
            let _h_extraInitializers = [];
            var DirThatSetsStyling = _classThis = class {
                constructor() {
                    this.w = __runInitializers(this, _w_initializers, '100px');
                    this.h = (__runInitializers(this, _w_extraInitializers), __runInitializers(this, _h_initializers, '200px'));
                    __runInitializers(this, _h_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirThatSetsStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _w_decorators = [(0, core_1.HostBinding)('style.width')];
                _h_decorators = [(0, core_1.HostBinding)('style.height')];
                __esDecorate(null, null, _w_decorators, { kind: "field", name: "w", static: false, private: false, access: { has: obj => "w" in obj, get: obj => obj.w, set: (obj, value) => { obj.w = value; } }, metadata: _metadata }, _w_initializers, _w_extraInitializers);
                __esDecorate(null, null, _h_decorators, { kind: "field", name: "h", static: false, private: false, access: { has: obj => "h" in obj, get: obj => obj.h, set: (obj, value) => { obj.h = value; } }, metadata: _metadata }, _h_initializers, _h_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirThatSetsStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirThatSetsStyling = _classThis;
        })();
        const fixture = testing_1.TestBed.configureTestingModule({
            declarations: [MyComp, DirThatSetsStyling],
        }).createComponent(MyComp);
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.getPropertyValue('width')).toEqual('100px');
        expect(div.style.getPropertyValue('height')).toEqual('200px');
        expect(div.style.getPropertyValue('font-size')).toEqual('300px');
        expect(div.getAttribute('title')).toEqual('my-title');
        expect(div.getAttribute('data-foo')).toEqual('my-foo');
    });
    it('should allow host styling on the root element with external styling', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classes_decorators;
            let _classes_initializers = [];
            let _classes_extraInitializers = [];
            var MyComp = _classThis = class {
                constructor() {
                    this.classes = __runInitializers(this, _classes_initializers, '');
                    __runInitializers(this, _classes_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _classes_decorators = [(0, core_1.HostBinding)('class')];
                __esDecorate(null, null, _classes_decorators, { kind: "field", name: "classes", static: false, private: false, access: { has: obj => "classes" in obj, get: obj => obj.classes, set: (obj, value) => { obj.classes = value; } }, metadata: _metadata }, _classes_initializers, _classes_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
        fixture.detectChanges();
        const root = fixture.nativeElement;
        expect(root.className).toEqual('');
        fixture.componentInstance.classes = '1 2 3';
        fixture.detectChanges();
        expect(root.className.split(/\s+/).sort().join(' ')).toEqual('1 2 3');
        root.classList.add('0');
        expect(root.className.split(/\s+/).sort().join(' ')).toEqual('0 1 2 3');
        fixture.componentInstance.classes = '1 2 3 4';
        fixture.detectChanges();
        expect(root.className.split(/\s+/).sort().join(' ')).toEqual('0 1 2 3 4');
    });
    it('should apply camelCased class names', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [class]="'fooBar'" [class.barFoo]="true"></div>`,
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
        testing_1.TestBed.configureTestingModule({
            declarations: [MyComp],
        });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const classList = fixture.nativeElement.querySelector('div').classList;
        expect(classList.contains('fooBar')).toBeTruthy();
        expect(classList.contains('barFoo')).toBeTruthy();
    });
    it('should convert camelCased style property names to snake-case', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [style]="myStyles"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.myStyles = {};
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
        testing_1.TestBed.configureTestingModule({
            declarations: [MyComp],
        });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        fixture.componentInstance.myStyles = { fontSize: '200px' };
        fixture.detectChanges();
        expect(div.style.getPropertyValue('font-size')).toEqual('200px');
    });
    it('should recover from an error thrown in styling bindings', () => {
        let raiseWidthError = false;
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [style.width]="myWidth" [style.height]="'200px'"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                get myWidth() {
                    if (raiseWidthError) {
                        throw new Error('...');
                    }
                    return '100px';
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
        const fixture = testing_1.TestBed.createComponent(MyComp);
        raiseWidthError = true;
        expect(() => fixture.detectChanges()).toThrow();
        raiseWidthError = false;
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.style.getPropertyValue('width')).toEqual('100px');
        expect(div.style.getPropertyValue('height')).toEqual('200px');
    });
    it('should prioritize host bindings for templates first, then directives and finally components', () => {
        let MyCompWithStyling = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp-with-styling',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _myStyles_decorators;
            let _myStyles_initializers = [];
            let _myStyles_extraInitializers = [];
            let _myHeight_decorators;
            let _myHeight_initializers = [];
            let _myHeight_extraInitializers = [];
            var MyCompWithStyling = _classThis = class {
                constructor() {
                    this.myStyles = __runInitializers(this, _myStyles_initializers, { width: '300px' });
                    this.myHeight = (__runInitializers(this, _myStyles_extraInitializers), __runInitializers(this, _myHeight_initializers, '305px'));
                    __runInitializers(this, _myHeight_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyCompWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _myStyles_decorators = [(0, core_1.HostBinding)('style')];
                _myHeight_decorators = [(0, core_1.HostBinding)('style.height')];
                __esDecorate(null, null, _myStyles_decorators, { kind: "field", name: "myStyles", static: false, private: false, access: { has: obj => "myStyles" in obj, get: obj => obj.myStyles, set: (obj, value) => { obj.myStyles = value; } }, metadata: _metadata }, _myStyles_initializers, _myStyles_extraInitializers);
                __esDecorate(null, null, _myHeight_decorators, { kind: "field", name: "myHeight", static: false, private: false, access: { has: obj => "myHeight" in obj, get: obj => obj.myHeight, set: (obj, value) => { obj.myHeight = value; } }, metadata: _metadata }, _myHeight_initializers, _myHeight_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCompWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCompWithStyling = _classThis;
        })();
        let MyDirWithStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-dir-with-styling]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _myStyles_decorators;
            let _myStyles_initializers = [];
            let _myStyles_extraInitializers = [];
            let _myHeight_decorators;
            let _myHeight_initializers = [];
            let _myHeight_extraInitializers = [];
            var MyDirWithStyling = _classThis = class {
                constructor() {
                    this.myStyles = __runInitializers(this, _myStyles_initializers, { width: '200px' });
                    this.myHeight = (__runInitializers(this, _myStyles_extraInitializers), __runInitializers(this, _myHeight_initializers, '205px'));
                    __runInitializers(this, _myHeight_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyDirWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _myStyles_decorators = [(0, core_1.HostBinding)('style')];
                _myHeight_decorators = [(0, core_1.HostBinding)('style.height')];
                __esDecorate(null, null, _myStyles_decorators, { kind: "field", name: "myStyles", static: false, private: false, access: { has: obj => "myStyles" in obj, get: obj => obj.myStyles, set: (obj, value) => { obj.myStyles = value; } }, metadata: _metadata }, _myStyles_initializers, _myStyles_extraInitializers);
                __esDecorate(null, null, _myHeight_decorators, { kind: "field", name: "myHeight", static: false, private: false, access: { has: obj => "myHeight" in obj, get: obj => obj.myHeight, set: (obj, value) => { obj.myHeight = value; } }, metadata: _metadata }, _myHeight_initializers, _myHeight_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDirWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDirWithStyling = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <my-comp-with-styling
            style="height:1px; width:2px"
            my-dir-with-styling
            [style.height]="myHeight"
            [style]="myStyles">
          </my-comp-with-styling>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            let _comp_decorators;
            let _comp_initializers = [];
            let _comp_extraInitializers = [];
            var MyComp = _classThis = class {
                constructor() {
                    this.myStyles = { width: '100px' };
                    this.myHeight = '100px';
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.comp = (__runInitializers(this, _dir_extraInitializers), __runInitializers(this, _comp_initializers, void 0));
                    __runInitializers(this, _comp_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(MyDirWithStyling)];
                _comp_decorators = [(0, core_1.ViewChild)(MyCompWithStyling)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyCompWithStyling, MyDirWithStyling] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        const comp = fixture.componentInstance;
        const elm = fixture.nativeElement.querySelector('my-comp-with-styling');
        fixture.detectChanges();
        expect(elm.style.width).toEqual('100px');
        expect(elm.style.height).toEqual('100px');
        comp.myStyles = {};
        comp.myHeight = undefined;
        fixture.detectChanges();
        expect(elm.style.width).toEqual('2px');
        expect(elm.style.height).toEqual('1px');
        comp.comp.myStyles = {};
        comp.comp.myHeight = undefined;
        fixture.detectChanges();
        expect(elm.style.width).toEqual('2px');
        expect(elm.style.height).toEqual('1px');
        comp.dir.myStyles = {};
        comp.dir.myHeight = undefined;
        fixture.detectChanges();
        expect(elm.style.width).toEqual('2px');
        expect(elm.style.height).toEqual('1px');
    });
    it('should prioritize directive static bindings over components', () => {
        let MyCompWithStyling = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp-with-styling',
                    host: { style: 'color: blue' },
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyCompWithStyling = _classThis = class {
            };
            __setFunctionName(_classThis, "MyCompWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCompWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCompWithStyling = _classThis;
        })();
        let MyDirWithStyling = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-dir-with-styling]',
                    host: { style: 'color: red' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDirWithStyling = _classThis = class {
            };
            __setFunctionName(_classThis, "MyDirWithStyling");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDirWithStyling = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDirWithStyling = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<my-comp-with-styling my-dir-with-styling></my-comp-with-styling>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyCompWithStyling, MyDirWithStyling] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        const elm = fixture.nativeElement.querySelector('my-comp-with-styling');
        fixture.detectChanges();
        expect(elm.style.color).toEqual('red');
    });
    it('should combine host class.foo bindings from multiple directives', () => {
        let DirThatSetsOneTwo = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-that-sets-one-two]',
                    exportAs: 'one',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _one_decorators;
            let _one_initializers = [];
            let _one_extraInitializers = [];
            let _two_decorators;
            let _two_initializers = [];
            let _two_extraInitializers = [];
            var DirThatSetsOneTwo = _classThis = class {
                constructor() {
                    this.one = __runInitializers(this, _one_initializers, false);
                    this.two = (__runInitializers(this, _one_extraInitializers), __runInitializers(this, _two_initializers, false));
                    __runInitializers(this, _two_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirThatSetsOneTwo");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _one_decorators = [(0, core_1.HostBinding)('class.one')];
                _two_decorators = [(0, core_1.HostBinding)('class.two')];
                __esDecorate(null, null, _one_decorators, { kind: "field", name: "one", static: false, private: false, access: { has: obj => "one" in obj, get: obj => obj.one, set: (obj, value) => { obj.one = value; } }, metadata: _metadata }, _one_initializers, _one_extraInitializers);
                __esDecorate(null, null, _two_decorators, { kind: "field", name: "two", static: false, private: false, access: { has: obj => "two" in obj, get: obj => obj.two, set: (obj, value) => { obj.two = value; } }, metadata: _metadata }, _two_initializers, _two_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirThatSetsOneTwo = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirThatSetsOneTwo = _classThis;
        })();
        let DirThatSetsThreeFour = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-that-sets-three-four]',
                    exportAs: 'two',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _three_decorators;
            let _three_initializers = [];
            let _three_extraInitializers = [];
            let _four_decorators;
            let _four_initializers = [];
            let _four_extraInitializers = [];
            var DirThatSetsThreeFour = _classThis = class {
                constructor() {
                    this.three = __runInitializers(this, _three_initializers, false);
                    this.four = (__runInitializers(this, _three_extraInitializers), __runInitializers(this, _four_initializers, false));
                    __runInitializers(this, _four_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirThatSetsThreeFour");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _three_decorators = [(0, core_1.HostBinding)('class.three')];
                _four_decorators = [(0, core_1.HostBinding)('class.four')];
                __esDecorate(null, null, _three_decorators, { kind: "field", name: "three", static: false, private: false, access: { has: obj => "three" in obj, get: obj => obj.three, set: (obj, value) => { obj.three = value; } }, metadata: _metadata }, _three_initializers, _three_extraInitializers);
                __esDecorate(null, null, _four_decorators, { kind: "field", name: "four", static: false, private: false, access: { has: obj => "four" in obj, get: obj => obj.four, set: (obj, value) => { obj.four = value; } }, metadata: _metadata }, _four_initializers, _four_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirThatSetsThreeFour = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirThatSetsThreeFour = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
           <div #div1
             dir-that-sets-one-two
             dir-that-sets-three-four></div>
           <div #div2
             [class.zero]="zero"
             dir-that-sets-one-two
             dir-that-sets-three-four></div>
         `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dirOneA_decorators;
            let _dirOneA_initializers = [];
            let _dirOneA_extraInitializers = [];
            let _dirTwoA_decorators;
            let _dirTwoA_initializers = [];
            let _dirTwoA_extraInitializers = [];
            let _dirOneB_decorators;
            let _dirOneB_initializers = [];
            let _dirOneB_extraInitializers = [];
            let _dirTwoB_decorators;
            let _dirTwoB_initializers = [];
            let _dirTwoB_extraInitializers = [];
            var MyComp = _classThis = class {
                constructor() {
                    this.dirOneA = __runInitializers(this, _dirOneA_initializers, null);
                    this.dirTwoA = (__runInitializers(this, _dirOneA_extraInitializers), __runInitializers(this, _dirTwoA_initializers, null));
                    this.dirOneB = (__runInitializers(this, _dirTwoA_extraInitializers), __runInitializers(this, _dirOneB_initializers, null));
                    this.dirTwoB = (__runInitializers(this, _dirOneB_extraInitializers), __runInitializers(this, _dirTwoB_initializers, null));
                    this.zero = (__runInitializers(this, _dirTwoB_extraInitializers), false);
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dirOneA_decorators = [(0, core_1.ViewChild)('div1', { static: true, read: DirThatSetsOneTwo })];
                _dirTwoA_decorators = [(0, core_1.ViewChild)('div1', { static: true, read: DirThatSetsThreeFour })];
                _dirOneB_decorators = [(0, core_1.ViewChild)('div2', { static: true, read: DirThatSetsOneTwo })];
                _dirTwoB_decorators = [(0, core_1.ViewChild)('div2', { static: true, read: DirThatSetsThreeFour })];
                __esDecorate(null, null, _dirOneA_decorators, { kind: "field", name: "dirOneA", static: false, private: false, access: { has: obj => "dirOneA" in obj, get: obj => obj.dirOneA, set: (obj, value) => { obj.dirOneA = value; } }, metadata: _metadata }, _dirOneA_initializers, _dirOneA_extraInitializers);
                __esDecorate(null, null, _dirTwoA_decorators, { kind: "field", name: "dirTwoA", static: false, private: false, access: { has: obj => "dirTwoA" in obj, get: obj => obj.dirTwoA, set: (obj, value) => { obj.dirTwoA = value; } }, metadata: _metadata }, _dirTwoA_initializers, _dirTwoA_extraInitializers);
                __esDecorate(null, null, _dirOneB_decorators, { kind: "field", name: "dirOneB", static: false, private: false, access: { has: obj => "dirOneB" in obj, get: obj => obj.dirOneB, set: (obj, value) => { obj.dirOneB = value; } }, metadata: _metadata }, _dirOneB_initializers, _dirOneB_extraInitializers);
                __esDecorate(null, null, _dirTwoB_decorators, { kind: "field", name: "dirTwoB", static: false, private: false, access: { has: obj => "dirTwoB" in obj, get: obj => obj.dirTwoB, set: (obj, value) => { obj.dirTwoB = value; } }, metadata: _metadata }, _dirTwoB_initializers, _dirTwoB_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [MyComp, DirThatSetsThreeFour, DirThatSetsOneTwo],
        });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const divs = fixture.nativeElement.querySelectorAll('div');
        // TODO: Use destructuring once Domino supports native ES2015, or when jsdom is used.
        const div1 = divs[0];
        const div2 = divs[1];
        expect(div1.className).toBe('');
        expect(div2.className).toBe('');
        const comp = fixture.componentInstance;
        comp.dirOneA.one = comp.dirOneB.one = true;
        comp.dirOneA.two = comp.dirOneB.two = true;
        fixture.detectChanges();
        expect(div1.classList.contains('one')).toBeTruthy();
        expect(div1.classList.contains('two')).toBeTruthy();
        expect(div1.classList.contains('three')).toBeFalsy();
        expect(div1.classList.contains('four')).toBeFalsy();
        expect(div2.classList.contains('one')).toBeTruthy();
        expect(div2.classList.contains('two')).toBeTruthy();
        expect(div2.classList.contains('three')).toBeFalsy();
        expect(div2.classList.contains('four')).toBeFalsy();
        expect(div2.classList.contains('zero')).toBeFalsy();
        comp.dirTwoA.three = comp.dirTwoB.three = true;
        comp.dirTwoA.four = comp.dirTwoB.four = true;
        fixture.detectChanges();
        expect(div1.classList.contains('one')).toBeTruthy();
        expect(div1.classList.contains('two')).toBeTruthy();
        expect(div1.classList.contains('three')).toBeTruthy();
        expect(div1.classList.contains('four')).toBeTruthy();
        expect(div2.classList.contains('one')).toBeTruthy();
        expect(div2.classList.contains('two')).toBeTruthy();
        expect(div2.classList.contains('three')).toBeTruthy();
        expect(div2.classList.contains('four')).toBeTruthy();
        expect(div2.classList.contains('zero')).toBeFalsy();
        comp.zero = true;
        fixture.detectChanges();
        expect(div1.classList.contains('one')).toBeTruthy();
        expect(div1.classList.contains('two')).toBeTruthy();
        expect(div1.classList.contains('three')).toBeTruthy();
        expect(div1.classList.contains('four')).toBeTruthy();
        expect(div2.classList.contains('one')).toBeTruthy();
        expect(div2.classList.contains('two')).toBeTruthy();
        expect(div2.classList.contains('three')).toBeTruthy();
        expect(div2.classList.contains('four')).toBeTruthy();
        expect(div2.classList.contains('zero')).toBeTruthy();
    });
    it('should combine static host classes with component "class" host attribute', () => {
        let CompWithClasses = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp-with-classes',
                    template: '',
                    host: { 'class': 'host' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CompWithClasses = _classThis = class {
                constructor(ref) {
                    ref.nativeElement.classList.add('custom');
                }
            };
            __setFunctionName(_classThis, "CompWithClasses");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CompWithClasses = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CompWithClasses = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<comp-with-classes class="inline" *ngFor="let item of items"></comp-with-classes>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        const fixture = testing_1.TestBed.configureTestingModule({
            declarations: [MyComp, CompWithClasses],
        }).createComponent(MyComp);
        fixture.detectChanges();
        const [one, two, three] = fixture.nativeElement.querySelectorAll('comp-with-classes');
        expect(one.classList.contains('custom')).toBeTruthy();
        expect(one.classList.contains('inline')).toBeTruthy();
        expect(one.classList.contains('host')).toBeTruthy();
        expect(two.classList.contains('custom')).toBeTruthy();
        expect(two.classList.contains('inline')).toBeTruthy();
        expect(two.classList.contains('host')).toBeTruthy();
        expect(three.classList.contains('custom')).toBeTruthy();
        expect(three.classList.contains('inline')).toBeTruthy();
        expect(three.classList.contains('host')).toBeTruthy();
    });
    it('should allow a single style host binding on an element', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div single-host-style-dir></div>`,
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
        let SingleHostStyleDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[single-host-style-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _width_decorators;
            let _width_initializers = [];
            let _width_extraInitializers = [];
            var SingleHostStyleDir = _classThis = class {
                constructor() {
                    this.width = __runInitializers(this, _width_initializers, '100px');
                    __runInitializers(this, _width_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "SingleHostStyleDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _width_decorators = [(0, core_1.HostBinding)('style.width')];
                __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SingleHostStyleDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SingleHostStyleDir = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, SingleHostStyleDir] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('div');
        expect(element.style.width).toEqual('100px');
    });
    it('should override class bindings when a directive extends another directive', () => {
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<child-comp class="template"></child-comp>`,
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
        let ParentComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent-comp',
                    host: { 'class': 'parent-comp', '[class.parent-comp-active]': 'true' },
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ParentComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComp = _classThis;
        })();
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-comp',
                    host: {
                        'class': 'child-comp',
                        '[class.child-comp-active]': 'true',
                        '[class.parent-comp]': 'false',
                        '[class.parent-comp-active]': 'false',
                    },
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = ParentComp;
            var ChildComp = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "ChildComp");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Cmp, ChildComp, ParentComp] });
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('child-comp');
        expect(element.classList.contains('template')).toBeTruthy();
        expect(element.classList.contains('child-comp')).toBeTruthy();
        expect(element.classList.contains('child-comp-active')).toBeTruthy();
        expect(element.classList.contains('parent-comp')).toBeFalsy();
        expect(element.classList.contains('parent-comp-active')).toBeFalsy();
    });
    it('should not set inputs called class if they are not being used in the template', () => {
        const logs = [];
        let MyDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[test]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_className_decorators;
            var MyDir = _classThis = class {
                set className(value) {
                    logs.push(value);
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_className_decorators = [(0, core_1.Input)('class')];
                __esDecorate(_classThis, null, _set_className_decorators, { kind: "setter", name: "className", static: false, private: false, access: { has: obj => "className" in obj, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    // Note that we shouldn't have a `class` attribute here.
                    template: `<div test></div>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        expect(logs).toEqual([]);
    });
    it('should support `styles` as a string', () => {
        if (!isBrowser) {
            return;
        }
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<span>Hello</span>`,
                    styles: `span {font-size: 10px}`,
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
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.detectChanges();
        const span = fixture.nativeElement.querySelector('span');
        expect(getComputedStyle(span).getPropertyValue('font-size')).toBe('10px');
    });
    describe('regression', () => {
        it('should support sanitizer value in the [style] bindings', () => {
            let HostBindingTestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div [style]="style"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostBindingTestComponent = _classThis = class {
                    constructor(sanitizer) {
                        this.sanitizer = sanitizer;
                        this.style = this.sanitizer.bypassSecurityTrustStyle('color: white; display: block;');
                    }
                };
                __setFunctionName(_classThis, "HostBindingTestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostBindingTestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostBindingTestComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [HostBindingTestComponent] });
            const fixture = testing_1.TestBed.createComponent(HostBindingTestComponent);
            fixture.detectChanges();
            const div = fixture.nativeElement.querySelector('div');
            expectStyle(div).toEqual({ color: 'white', display: 'block' });
        });
        it('should allow lookahead binding on second pass #35118', () => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: ``,
                        host: {
                            '[class.foo]': 'hostClass',
                        },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.hostClass = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let HostStylingsDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[host-styling]',
                        host: {
                            '[class]': 'hostClass',
                        },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostStylingsDir = _classThis = class {
                    constructor() {
                        this.hostClass = { 'bar': true };
                    }
                };
                __setFunctionName(_classThis, "HostStylingsDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostStylingsDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostStylingsDir = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<my-cmp *ngFor="let i of [1,2]" host-styling></my-cmp>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyCmp, HostStylingsDir] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            expect(() => fixture.detectChanges()).not.toThrow();
            const [cmp1, cmp2] = fixture.nativeElement.querySelectorAll('my-cmp');
            expectClass(cmp1).toEqual({ foo: true, bar: true });
            expectClass(cmp2).toEqual({ foo: true, bar: true });
        });
        it('should not bind [class] to @Input("className")', () => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `className = {{className}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _className_decorators;
                let _className_initializers = [];
                let _className_extraInitializers = [];
                var MyCmp = _classThis = class {
                    constructor() {
                        this.className = __runInitializers(this, _className_initializers, 'unbound');
                        __runInitializers(this, _className_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _className_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<my-cmp [class]="'bound'"></my-cmp>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyCmp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toEqual('className = unbound');
        });
        it('should not bind class to @Input("className")', () => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `className = {{className}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _className_decorators;
                let _className_initializers = [];
                let _className_extraInitializers = [];
                var MyCmp = _classThis = class {
                    constructor() {
                        this.className = __runInitializers(this, _className_initializers, 'unbound');
                        __runInitializers(this, _className_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _className_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<my-cmp class="bound"></my-cmp>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyCmp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toEqual('className = unbound');
        });
    });
});
function assertStyle(element, prop, value) {
    expect(element.style[prop]).toEqual(value);
}
function expectStyle(element) {
    return expect((0, styling_1.getElementStyles)(element));
}
function expectClass(element) {
    return expect((0, styling_1.getElementClasses)(element));
}
