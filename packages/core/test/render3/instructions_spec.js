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
const styling_1 = require("../../testing/src/styling");
const index_1 = require("../../src/render3/index");
const bypass_1 = require("../../src/sanitization/bypass");
const sanitization_1 = require("../../src/sanitization/sanitization");
const view_fixture_1 = require("./view_fixture");
describe('instructions', () => {
    function createAnchor() {
        (0, index_1.ɵɵelement)(0, 'a');
    }
    function createDiv() {
        (0, index_1.ɵɵelement)(0, 'div');
    }
    function createScript() {
        (0, index_1.ɵɵelement)(0, 'script');
    }
    afterEach(view_fixture_1.ViewFixture.cleanUp);
    describe('ɵɵadvance', () => {
        it('should error in DevMode if index is out of range', () => {
            // Only one constant added, meaning only index `0` is valid.
            const t = new view_fixture_1.ViewFixture({ create: createDiv, decls: 1 });
            expect(() => {
                t.update(() => {
                    (0, index_1.ɵɵadvance)(-1);
                });
            }).toThrow();
            expect(() => {
                t.update(() => {
                    (0, index_1.ɵɵadvance)();
                });
            }).toThrow();
        });
    });
    describe('bind', () => {
        it('should update bindings when value changes', () => {
            const t = new view_fixture_1.ViewFixture({ create: createAnchor, decls: 1, vars: 1 });
            t.update(() => {
                (0, index_1.ɵɵproperty)('title', 'Hello');
            });
            expect(t.html).toEqual('<a title="Hello"></a>');
            t.update(() => {
                (0, index_1.ɵɵproperty)('title', 'World');
            });
            expect(t.html).toEqual('<a title="World"></a>');
        });
        it('should not update bindings when value does not change, with the correct perf counters', () => {
            const idempotentUpdate = () => {
                (0, index_1.ɵɵproperty)('title', 'Hello');
            };
            const t = new view_fixture_1.ViewFixture({
                create: createAnchor,
                update: idempotentUpdate,
                decls: 1,
                vars: 1,
            });
            t.update();
            expect(t.html).toEqual('<a title="Hello"></a>');
            t.update();
            expect(t.html).toEqual('<a title="Hello"></a>');
        });
    });
    describe('element', () => {
        it('should create an element', () => {
            const t = new view_fixture_1.ViewFixture({
                create: () => {
                    (0, index_1.ɵɵelement)(0, 'div', 0);
                },
                decls: 1,
                vars: 0,
                consts: [['id', 'test', 'title', 'Hello']],
            });
            const div = t.host.querySelector('div');
            expect(div.id).toEqual('test');
            expect(div.title).toEqual('Hello');
        });
        it('should instantiate nodes at high indices', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '{{ name }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _name_decorators;
                let _name_initializers = [];
                let _name_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.name = __runInitializers(this, _name_initializers, '');
                        __runInitializers(this, _name_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _name_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            const ctx = { name: 'initial name' };
            const createText = () => {
                // Artificially inflating the slot IDs of this app component
                // to mimic an app with a very large view.
                (0, index_1.ɵɵelement)(4097, 'comp');
            };
            const updateText = () => {
                (0, index_1.ɵɵadvance)(4097);
                (0, index_1.ɵɵproperty)('name', ctx.name);
            };
            const fixture = new view_fixture_1.ViewFixture({
                create: createText,
                update: updateText,
                decls: 4098,
                vars: 1,
                directives: [Comp],
            });
            fixture.update();
            expect(fixture.html).toEqual('<comp>initial name</comp>');
            ctx.name = 'some name';
            fixture.update();
            expect(fixture.html).toEqual('<comp>some name</comp>');
        });
    });
    describe('attribute', () => {
        it('should use sanitizer function', () => {
            const t = new view_fixture_1.ViewFixture({ create: createDiv, decls: 1, vars: 1 });
            t.update(() => {
                (0, index_1.ɵɵattribute)('title', 'javascript:true', sanitization_1.ɵɵsanitizeUrl);
            });
            expect(t.html).toEqual('<div title="unsafe:javascript:true"></div>');
            t.update(() => {
                (0, index_1.ɵɵattribute)('title', (0, bypass_1.bypassSanitizationTrustUrl)('javascript:true'), sanitization_1.ɵɵsanitizeUrl);
            });
            expect(t.html).toEqual('<div title="javascript:true"></div>');
        });
    });
    describe('property', () => {
        /**
         * TODO: We need to replace this with an acceptance test, but for right now,
         * this is the only test that ensures chaining works, since code generation
         * is not producing chained instructions yet.
         */
        it('should chain', () => {
            // <div [title]="title" [accesskey]="key"></div>
            const t = new view_fixture_1.ViewFixture({ create: createDiv, update: () => { }, decls: 1, vars: 2 });
            t.update(() => {
                (0, index_1.ɵɵproperty)('title', 'one')('accessKey', 'A');
            });
            expect(t.html).toEqual('<div accesskey="A" title="one"></div>');
            t.update(() => {
                (0, index_1.ɵɵproperty)('title', 'two')('accessKey', 'B');
            });
            expect(t.html).toEqual('<div accesskey="B" title="two"></div>');
        });
    });
    describe('styleProp', () => {
        it('should allow values even if a bypass operation is applied', () => {
            let backgroundImage = 'url("http://server")';
            const t = new view_fixture_1.ViewFixture({
                create: () => {
                    return createDiv();
                },
                update: () => {
                    (0, index_1.ɵɵstyleProp)('background-image', backgroundImage);
                },
                decls: 2,
                vars: 2,
            });
            t.update();
            // nothing is set because sanitizer suppresses it.
            expect(t.host.firstChild.style.getPropertyValue('background-image')).toEqual('url("http://server")');
            backgroundImage = (0, bypass_1.bypassSanitizationTrustStyle)('url("http://server2")');
            t.update();
            expect(t.host.firstChild.style.getPropertyValue('background-image')).toEqual('url("http://server2")');
        });
    });
    describe('styleMap', () => {
        const attrs = [[2 /* AttributeMarker.Styles */, 'height', '10px']];
        function createDivWithStyle() {
            (0, index_1.ɵɵelement)(0, 'div', 0);
        }
        it('should add style', () => {
            const fixture = new view_fixture_1.ViewFixture({
                create: createDivWithStyle,
                update: () => {
                    (0, index_1.ɵɵstyleMap)({ 'background-color': 'red' });
                },
                decls: 1,
                vars: 2,
                consts: attrs,
            });
            fixture.update();
            expect(fixture.html).toEqual('<div style="background-color: red; height: 10px;"></div>');
        });
    });
    describe('elementClass', () => {
        function createDivWithStyling() {
            (0, index_1.ɵɵelement)(0, 'div');
        }
        it('should add class', () => {
            const fixture = new view_fixture_1.ViewFixture({
                create: createDivWithStyling,
                update: () => {
                    (0, index_1.ɵɵclassMap)('multiple classes');
                },
                decls: 1,
                vars: 2,
            });
            fixture.update();
            const div = fixture.host.querySelector('div.multiple');
            expect((0, styling_1.getSortedClassName)(div)).toEqual('classes multiple');
        });
    });
    describe('sanitization injection compatibility', () => {
        it('should work for url sanitization', () => {
            const s = new LocalMockSanitizer((value) => `${value}-sanitized`);
            const t = new view_fixture_1.ViewFixture({ create: createAnchor, decls: 1, vars: 1, sanitizer: s });
            const inputValue = 'http://foo';
            const outputValue = 'http://foo-sanitized';
            t.update(() => {
                (0, index_1.ɵɵattribute)('href', inputValue, sanitization_1.ɵɵsanitizeUrl);
            });
            expect(t.html).toEqual(`<a href="${outputValue}"></a>`);
            expect(s.lastSanitizedValue).toEqual(outputValue);
        });
        it('should bypass url sanitization if marked by the service', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createAnchor, decls: 1, vars: 1, sanitizer: s });
            const inputValue = s.bypassSecurityTrustUrl('http://foo');
            const outputValue = 'http://foo';
            t.update(() => {
                (0, index_1.ɵɵattribute)('href', inputValue, sanitization_1.ɵɵsanitizeUrl);
            });
            expect(t.html).toEqual(`<a href="${outputValue}"></a>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should bypass ivy-level url sanitization if a custom sanitizer is used', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createAnchor, decls: 1, vars: 1, sanitizer: s });
            const inputValue = (0, bypass_1.bypassSanitizationTrustUrl)('http://foo');
            const outputValue = 'http://foo-ivy';
            t.update(() => {
                (0, index_1.ɵɵattribute)('href', inputValue, sanitization_1.ɵɵsanitizeUrl);
            });
            expect(t.html).toEqual(`<a href="${outputValue}"></a>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should work for style sanitization', () => {
            const s = new LocalMockSanitizer((value) => `color:blue`);
            const t = new view_fixture_1.ViewFixture({ create: createDiv, decls: 1, vars: 1, sanitizer: s });
            const inputValue = 'color:red';
            const outputValue = 'color:blue';
            t.update(() => {
                (0, index_1.ɵɵattribute)('style', inputValue, sanitization_1.ɵɵsanitizeStyle);
            });
            expect(stripStyleWsCharacters(t.html)).toEqual(`<div style="${outputValue}"></div>`);
            expect(s.lastSanitizedValue).toEqual(outputValue);
        });
        it('should bypass style sanitization if marked by the service', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createDiv, decls: 1, vars: 1, sanitizer: s });
            const inputValue = s.bypassSecurityTrustStyle('color:maroon');
            const outputValue = 'color:maroon';
            t.update(() => {
                (0, index_1.ɵɵattribute)('style', inputValue, sanitization_1.ɵɵsanitizeStyle);
            });
            expect(stripStyleWsCharacters(t.html)).toEqual(`<div style="${outputValue}"></div>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should bypass ivy-level style sanitization if a custom sanitizer is used', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createDiv, decls: 1, vars: 1, sanitizer: s });
            const inputValue = (0, bypass_1.bypassSanitizationTrustStyle)('font-family:foo');
            const outputValue = 'font-family:foo-ivy';
            t.update(() => {
                (0, index_1.ɵɵattribute)('style', inputValue, sanitization_1.ɵɵsanitizeStyle);
            });
            expect(stripStyleWsCharacters(t.html)).toEqual(`<div style="${outputValue}"></div>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should work for resourceUrl sanitization', () => {
            const s = new LocalMockSanitizer((value) => `${value}-sanitized`);
            const t = new view_fixture_1.ViewFixture({ create: createScript, decls: 1, vars: 1, sanitizer: s });
            const inputValue = 'http://resource';
            const outputValue = 'http://resource-sanitized';
            t.update(() => {
                (0, index_1.ɵɵattribute)('src', inputValue, sanitization_1.ɵɵsanitizeResourceUrl);
            });
            expect(t.html).toEqual(`<script src="${outputValue}"></script>`);
            expect(s.lastSanitizedValue).toEqual(outputValue);
        });
        it('should bypass resourceUrl sanitization if marked by the service', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createScript, decls: 1, vars: 1, sanitizer: s });
            const inputValue = s.bypassSecurityTrustResourceUrl('file://all-my-secrets.pdf');
            const outputValue = 'file://all-my-secrets.pdf';
            t.update(() => {
                (0, index_1.ɵɵattribute)('src', inputValue, sanitization_1.ɵɵsanitizeResourceUrl);
            });
            expect(t.html).toEqual(`<script src="${outputValue}"></script>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should bypass ivy-level resourceUrl sanitization if a custom sanitizer is used', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createScript, decls: 1, vars: 1, sanitizer: s });
            const inputValue = (0, bypass_1.bypassSanitizationTrustResourceUrl)('file://all-my-secrets.pdf');
            const outputValue = 'file://all-my-secrets.pdf-ivy';
            t.update(() => {
                (0, index_1.ɵɵattribute)('src', inputValue, sanitization_1.ɵɵsanitizeResourceUrl);
            });
            expect(t.html).toEqual(`<script src="${outputValue}"></script>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should work for script sanitization', () => {
            const s = new LocalMockSanitizer((value) => `${value} //sanitized`);
            const t = new view_fixture_1.ViewFixture({ create: createScript, decls: 1, vars: 1, sanitizer: s });
            const inputValue = 'fn();';
            const outputValue = 'fn(); //sanitized';
            t.update(() => {
                (0, index_1.ɵɵproperty)('innerHTML', inputValue, sanitization_1.ɵɵsanitizeScript);
            });
            expect(t.html).toEqual(`<script>${outputValue}</script>`);
            expect(s.lastSanitizedValue).toEqual(outputValue);
        });
        it('should bypass script sanitization if marked by the service', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createScript, decls: 1, vars: 1, sanitizer: s });
            const inputValue = s.bypassSecurityTrustScript('alert("bar")');
            const outputValue = 'alert("bar")';
            t.update(() => {
                (0, index_1.ɵɵproperty)('innerHTML', inputValue, sanitization_1.ɵɵsanitizeScript);
            });
            expect(t.html).toEqual(`<script>${outputValue}</script>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should bypass ivy-level script sanitization if a custom sanitizer is used', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createScript, decls: 1, vars: 1, sanitizer: s });
            const inputValue = (0, bypass_1.bypassSanitizationTrustScript)('alert("bar")');
            const outputValue = 'alert("bar")-ivy';
            t.update(() => {
                (0, index_1.ɵɵproperty)('innerHTML', inputValue, sanitization_1.ɵɵsanitizeScript);
            });
            expect(t.html).toEqual(`<script>${outputValue}</script>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should work for html sanitization', () => {
            const s = new LocalMockSanitizer((value) => `${value} <!--sanitized-->`);
            const t = new view_fixture_1.ViewFixture({ create: createDiv, decls: 1, vars: 1, sanitizer: s });
            const inputValue = '<header></header>';
            const outputValue = '<header></header> <!--sanitized-->';
            t.update(() => {
                (0, index_1.ɵɵproperty)('innerHTML', inputValue, sanitization_1.ɵɵsanitizeHtml);
            });
            expect(t.html).toEqual(`<div>${outputValue}</div>`);
            expect(s.lastSanitizedValue).toEqual(outputValue);
        });
        it('should bypass html sanitization if marked by the service', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createDiv, decls: 1, vars: 1, sanitizer: s });
            const inputValue = s.bypassSecurityTrustHtml('<div onclick="alert(123)"></div>');
            const outputValue = '<div onclick="alert(123)"></div>';
            t.update(() => {
                (0, index_1.ɵɵproperty)('innerHTML', inputValue, sanitization_1.ɵɵsanitizeHtml);
            });
            expect(t.html).toEqual(`<div>${outputValue}</div>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
        it('should bypass ivy-level script sanitization if a custom sanitizer is used', () => {
            const s = new LocalMockSanitizer((value) => '');
            const t = new view_fixture_1.ViewFixture({ create: createDiv, decls: 1, vars: 1, sanitizer: s });
            const inputValue = (0, bypass_1.bypassSanitizationTrustHtml)('<div onclick="alert(123)"></div>');
            const outputValue = '<div onclick="alert(123)"></div>-ivy';
            t.update(() => {
                (0, index_1.ɵɵproperty)('innerHTML', inputValue, sanitization_1.ɵɵsanitizeHtml);
            });
            expect(t.html).toEqual(`<div>${outputValue}</div>`);
            expect(s.lastSanitizedValue).toBeFalsy();
        });
    });
});
class LocalSanitizedValue {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value;
    }
}
class LocalMockSanitizer {
    constructor(_interceptor) {
        this._interceptor = _interceptor;
    }
    sanitize(context, value) {
        if ((0, bypass_1.getSanitizationBypassType)(value) != null) {
            return (0, bypass_1.unwrapSafeValue)(value) + '-ivy';
        }
        if (value instanceof LocalSanitizedValue) {
            return value.toString();
        }
        return (this.lastSanitizedValue = this._interceptor(value));
    }
    bypassSecurityTrustHtml(value) {
        return new LocalSanitizedValue(value);
    }
    bypassSecurityTrustStyle(value) {
        return new LocalSanitizedValue(value);
    }
    bypassSecurityTrustScript(value) {
        return new LocalSanitizedValue(value);
    }
    bypassSecurityTrustUrl(value) {
        return new LocalSanitizedValue(value);
    }
    bypassSecurityTrustResourceUrl(value) {
        return new LocalSanitizedValue(value);
    }
}
class MockSanitizerInterceptor {
    constructor(_interceptorFn) {
        this._interceptorFn = _interceptorFn;
        this.lastValue = null;
    }
    sanitize(context, value) {
        if (this._interceptorFn) {
            this._interceptorFn(value);
        }
        return (this.lastValue = value);
    }
}
function stripStyleWsCharacters(value) {
    // color: blue; => color:blue
    return value.replace(/;/g, '').replace(/:\s+/g, ':');
}
