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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const rxjs_1 = require("rxjs");
describe('text instructions', () => {
    it('should handle all flavors of interpolated text', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div>a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i{{nine}}j</div>
        <div>a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i</div>
        <div>a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h</div>
        <div>a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g</div>
        <div>a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f</div>
        <div>a{{one}}b{{two}}c{{three}}d{{four}}e</div>
        <div>a{{one}}b{{two}}c{{three}}d</div>
        <div>a{{one}}b{{two}}c</div>
        <div>a{{one}}b</div>
        <div>{{one}}</div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
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
        const allTextContent = Array.from(fixture.nativeElement.querySelectorAll('div')).map((div) => div.textContent);
        expect(allTextContent).toEqual([
            'a1b2c3d4e5f6g7h8i9j',
            'a1b2c3d4e5f6g7h8i',
            'a1b2c3d4e5f6g7h',
            'a1b2c3d4e5f6g',
            'a1b2c3d4e5f',
            'a1b2c3d4e',
            'a1b2c3d',
            'a1b2c',
            'a1b',
            '1',
        ]);
    });
    it('should handle piped values in interpolated text', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <p>{{who | async}} sells {{(item | async)?.what}} down by the {{(item | async)?.where}}.</p>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.who = (0, rxjs_1.of)('Sally');
                    this.item = (0, rxjs_1.of)({
                        what: 'seashells',
                        where: 'seashore',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const p = fixture.nativeElement.querySelector('p');
        expect(p.textContent).toBe('Sally sells seashells down by the seashore.');
    });
    it('should not sanitize urls in interpolated text', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<p>{{thisisfine}}</p>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thisisfine = 'javascript:alert("image_of_dog_with_coffee_in_burning_building.gif")';
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
        const p = fixture.nativeElement.querySelector('p');
        expect(p.textContent).toBe('javascript:alert("image_of_dog_with_coffee_in_burning_building.gif")');
    });
    it('should not allow writing HTML in interpolated text', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div>{{test}}</div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.test = '<h1>LOL, big text</h1>';
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
        const div = fixture.nativeElement.querySelector('div');
        expect(div.innerHTML).toBe('&lt;h1&gt;LOL, big text&lt;/h1&gt;');
    });
    it('should stringify functions used in bindings', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div>{{test}}</div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.test = function foo() { };
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
        const div = fixture.nativeElement.querySelector('div');
        expect(div.innerHTML).toBe(fixture.componentInstance.test.toString());
        expect(div.innerHTML).toContain('foo');
    });
    it('should stringify an object using its toString method', () => {
        class TestObject {
            toString() {
                return 'toString';
            }
            valueOf() {
                return 'valueOf';
            }
        }
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{object}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.object = new TestObject();
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
        expect(fixture.nativeElement.textContent).toBe('toString');
    });
    it('should stringify a symbol', () => {
        // This test is only valid on browsers that support Symbol.
        if (typeof Symbol === 'undefined') {
            return;
        }
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{symbol}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.symbol = Symbol('hello');
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
        // Note that this uses `toContain`, because a polyfilled `Symbol` produces something like
        // `Symbol(hello)_p.sc8s398cplk`, whereas the native one is `Symbol(hello)`.
        expect(fixture.nativeElement.textContent).toContain('Symbol(hello)');
    });
    it('should handle binding syntax used inside quoted text', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{'Interpolations look like {{this}}'}}`,
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
        expect(fixture.nativeElement.textContent).toBe('Interpolations look like {{this}}');
    });
});
