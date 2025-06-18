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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
describe('attribute creation', () => {
    it('should create an element', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div id="test" title="Hello"></div>`,
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
        const div = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(div.id).toEqual('test');
        expect(div.title).toEqual('Hello');
    });
    it('should allow for setting xlink namespaced attributes', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div id="test" xlink:href="bar" title="Hello"></div>`,
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
        const div = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        const attrs = div.attributes;
        expect(attrs['id'].name).toEqual('id');
        expect(attrs['id'].namespaceURI).toEqual(null);
        expect(attrs['id'].value).toEqual('test');
        expect(attrs['xlink:href'].name).toEqual('xlink:href');
        expect(attrs['xlink:href'].namespaceURI).toEqual('http://www.w3.org/1999/xlink');
        expect(attrs['xlink:href'].value).toEqual('bar');
        expect(attrs['title'].name).toEqual('title');
        expect(attrs['title'].namespaceURI).toEqual(null);
        expect(attrs['title'].value).toEqual('Hello');
    });
});
describe('attribute binding', () => {
    it('should set attribute values', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<a [attr.href]="url"></a>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.url = 'https://angular.io/robots.txt';
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
        const a = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
        // NOTE: different browsers will add `//` into the URI.
        expect(a.href).toEqual('https://angular.io/robots.txt');
    });
    it('should be able to bind multiple attribute values per element', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<a [attr.id]="id" [attr.href]="url" [attr.tabindex]="'-1'"></a>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.url = 'https://angular.io/robots.txt';
                    this.id = 'my-link';
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
        const a = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
        // NOTE: different browsers will add `//` into the URI.
        expect(a.getAttribute('href')).toBe('https://angular.io/robots.txt');
        expect(a.getAttribute('id')).toBe('my-link');
        expect(a.getAttribute('tabindex')).toBe('-1');
    });
    it('should be able to bind multiple attributes in the presence of other bindings', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<a [id]="id" [attr.href]="url" [title]="'hello'"></a>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.url = 'https://angular.io/robots.txt';
                    this.id = 'my-link';
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
        const a = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
        // NOTE: different browsers will add `//` into the URI.
        expect(a.getAttribute('href')).toBe('https://angular.io/robots.txt');
        expect(a.id).toBe('my-link');
        expect(a.getAttribute('title')).toBe('hello');
    });
    it('should be able to bind attributes with interpolations', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <button
          attr.id="my-{{id}}-button"
          [attr.title]="title"
          attr.tabindex="{{1 + 3 + 7}}"></button>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.title = 'hello';
                    this.id = 'custom';
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
        const button = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        expect(button.getAttribute('id')).toBe('my-custom-button');
        expect(button.getAttribute('tabindex')).toBe('11');
        expect(button.getAttribute('title')).toBe('hello');
    });
    it('should be able to bind attributes both to parent and child nodes', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <button
          attr.id="my-{{id}}-button"
          [attr.title]="title"
          attr.tabindex="{{1 + 3 + 7}}">

          <span attr.title="span-{{title}}" id="custom-span" [attr.tabindex]="-1"></span>
        </button>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.title = 'hello';
                    this.id = 'custom';
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
        const button = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        const span = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        expect(button.getAttribute('id')).toBe('my-custom-button');
        expect(button.getAttribute('tabindex')).toBe('11');
        expect(button.getAttribute('title')).toBe('hello');
        expect(span.getAttribute('id')).toBe('custom-span');
        expect(span.getAttribute('tabindex')).toBe('-1');
        expect(span.getAttribute('title')).toBe('span-hello');
    });
    it('should sanitize attribute values', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<a [attr.href]="badUrl"></a>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.badUrl = 'javascript:true';
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
        const a = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
        // NOTE: different browsers will add `//` into the URI.
        expect(a.href.indexOf('unsafe:')).toBe(0);
        const domSanitizer = testing_1.TestBed.inject(platform_browser_1.DomSanitizer);
        fixture.componentInstance.badUrl = domSanitizer.bypassSecurityTrustUrl('javascript:alert("this is fine")');
        fixture.detectChanges();
        // should not start with `unsafe:`.
        expect(a.href.indexOf('unsafe:')).toBe(-1);
    });
});
describe('attribute interpolation', () => {
    it('should handle all varieties of interpolation', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div attr.title="a{{a}}b{{b}}c{{c}}d{{d}}e{{e}}f{{f}}g{{g}}h{{h}}i{{i}}j"></div>
        <div attr.title="a{{a}}b{{b}}c{{c}}d{{d}}e{{e}}f{{f}}g{{g}}h{{h}}i"></div>
        <div attr.title="a{{a}}b{{b}}c{{c}}d{{d}}e{{e}}f{{f}}g{{g}}h"></div>
        <div attr.title="a{{a}}b{{b}}c{{c}}d{{d}}e{{e}}f{{f}}g"></div>
        <div attr.title="a{{a}}b{{b}}c{{c}}d{{d}}e{{e}}f"></div>
        <div attr.title="a{{a}}b{{b}}c{{c}}d{{d}}e"></div>
        <div attr.title="a{{a}}b{{b}}c{{c}}d"></div>
        <div attr.title="a{{a}}b{{b}}c"></div>
        <div attr.title="a{{a}}b"></div>
        <div attr.title="{{a}}"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.a = 1;
                    this.b = 2;
                    this.c = 3;
                    this.d = 4;
                    this.e = 5;
                    this.f = 6;
                    this.g = 7;
                    this.h = 8;
                    this.i = 9;
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
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const divs = fixture.debugElement.queryAll(platform_browser_1.By.css('div[title]'));
        expect(divs.map((el) => el.nativeElement.getAttribute('title'))).toEqual([
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
});
