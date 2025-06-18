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
const platform_browser_1 = require("@angular/platform-browser");
const rxjs_1 = require("rxjs");
describe('property interpolation', () => {
    it('should handle all flavors of interpolated properties', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i{{nine}}j"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e"></div>
        <div title="a{{one}}b{{two}}c{{three}}d"></div>
        <div title="a{{one}}b{{two}}c"></div>
        <div title="a{{one}}b"></div>
        <div title="{{one}}"></div>
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
        const titles = Array.from(fixture.nativeElement.querySelectorAll('div[title]')).map((div) => div.title);
        expect(titles).toEqual([
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
    it('should handle pipes in interpolated properties', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <img title="{{(details | async)?.title}}" src="{{(details | async)?.url}}" />
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.details = (0, rxjs_1.of)({
                        title: 'cool image',
                        url: 'http://somecooldomain:1234/cool_image.png',
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
        const img = fixture.nativeElement.querySelector('img');
        expect(img.src).toBe('http://somecooldomain:1234/cool_image.png');
        expect(img.title).toBe('cool image');
    });
    // From https://angular-team.atlassian.net/browse/FW-1287
    it('should handle multiple elvis operators', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <img src="{{leadSurgeon?.getCommonInfo()?.getPhotoUrl() }}">
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    /** Clearly this is a doctor of heavy metals. */
                    this.leadSurgeon = {
                        getCommonInfo() {
                            return {
                                getPhotoUrl() {
                                    return 'http://somecooldomain:1234/cool_image.png';
                                },
                            };
                        },
                    };
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
        const img = fixture.nativeElement.querySelector('img');
        expect(img.src).toBe('http://somecooldomain:1234/cool_image.png');
    });
    it('should not allow unsanitary urls in interpolated properties', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <img src="{{naughty}}">
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.naughty = 'javascript:alert("haha, I am taking over your computer!!!");';
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
        const img = fixture.nativeElement.querySelector('img');
        expect(img.src.indexOf('unsafe:')).toBe(0);
    });
    it('should not allow unsanitary urls in interpolated properties, even if you are tricky', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <img src="{{ja}}{{va}}script:{{naughty}}">
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.ja = 'ja';
                    this.va = 'va';
                    this.naughty = 'alert("I am a h4xx0rz1!!");';
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
        const img = fixture.nativeElement.querySelector('img');
        expect(img.src.indexOf('unsafe:')).toBe(0);
    });
    it('should handle interpolations with 10+ values', () => {
        let AppComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-comp',
                    template: `
        <a href="http://g.com/?one={{'1'}}&two={{'2'}}&three={{'3'}}&four={{'4'}}&five={{'5'}}&six={{'6'}}&seven={{'7'}}&eight={{'8'}}&nine={{'9'}}&ten={{'10'}}">link2</a>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComp = _classThis = class {
            };
            __setFunctionName(_classThis, "AppComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [AppComp] });
        const fixture = testing_1.TestBed.createComponent(AppComp);
        fixture.detectChanges();
        const anchor = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
        expect(anchor.getAttribute('href')).toEqual(`http://g.com/?one=1&two=2&three=3&four=4&five=5&six=6&seven=7&eight=8&nine=9&ten=10`);
    });
    it('should support the chained use cases of propertyInterpolate instructions', () => {
        // The below *just happens* to have two attributes in a row that have the same interpolation
        // count.
        let AppComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <img title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i{{nine}}j" alt="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i{{nine}}j"/>
      <img title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i" alt="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i"/>
      <img title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h" alt="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h"/>
      <img title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g" alt="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g"/>
      <img title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f" alt="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f"/>
      <img title="a{{one}}b{{two}}c{{three}}d{{four}}e" alt="a{{one}}b{{two}}c{{three}}d{{four}}e"/>
      <img title="a{{one}}b{{two}}c{{three}}d" alt="a{{one}}b{{two}}c{{three}}d"/>
      <img title="a{{one}}b{{two}}c" alt="a{{one}}b{{two}}c"/>
      <img title="a{{one}}b" alt="a{{one}}b"/>
      <img title="{{one}}" alt="{{one}}"/>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComp = _classThis = class {
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
            __setFunctionName(_classThis, "AppComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [AppComp] });
        const fixture = testing_1.TestBed.createComponent(AppComp);
        fixture.detectChanges();
        const titles = Array.from(fixture.nativeElement.querySelectorAll('img[title]')).map((img) => img.title);
        expect(titles).toEqual([
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
        const others = Array.from(fixture.nativeElement.querySelectorAll('img[alt]')).map((img) => img.alt);
        expect(others).toEqual([
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
