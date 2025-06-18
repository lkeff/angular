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
const dom_sanitization_service_1 = require("@angular/platform-browser/src/security/dom_sanitization_service");
let SecuredComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-comp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SecuredComponent = _classThis = class {
        constructor() {
            this.ctxProp = 'some value';
        }
    };
    __setFunctionName(_classThis, "SecuredComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SecuredComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SecuredComponent = _classThis;
})();
let OnPrefixDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[onPrefixedProp]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _onPrefixedProp_decorators;
    let _onPrefixedProp_initializers = [];
    let _onPrefixedProp_extraInitializers = [];
    let _onclick_decorators;
    let _onclick_initializers = [];
    let _onclick_extraInitializers = [];
    var OnPrefixDir = _classThis = class {
        constructor() {
            this.onPrefixedProp = __runInitializers(this, _onPrefixedProp_initializers, void 0);
            this.onclick = (__runInitializers(this, _onPrefixedProp_extraInitializers), __runInitializers(this, _onclick_initializers, void 0));
            __runInitializers(this, _onclick_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "OnPrefixDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _onPrefixedProp_decorators = [(0, core_1.Input)()];
        _onclick_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _onPrefixedProp_decorators, { kind: "field", name: "onPrefixedProp", static: false, private: false, access: { has: obj => "onPrefixedProp" in obj, get: obj => obj.onPrefixedProp, set: (obj, value) => { obj.onPrefixedProp = value; } }, metadata: _metadata }, _onPrefixedProp_initializers, _onPrefixedProp_extraInitializers);
        __esDecorate(null, null, _onclick_decorators, { kind: "field", name: "onclick", static: false, private: false, access: { has: obj => "onclick" in obj, get: obj => obj.onclick, set: (obj, value) => { obj.onclick = value; } }, metadata: _metadata }, _onclick_initializers, _onclick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OnPrefixDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OnPrefixDir = _classThis;
})();
describe('security integration tests', function () {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [SecuredComponent, OnPrefixDir],
        });
    });
    beforeEach(() => {
        // Disable logging for these tests.
        spyOn(console, 'log').and.callFake(() => { });
    });
    describe('events', () => {
        // this test is similar to the previous one, but since on-prefixed attributes validation now
        // happens at runtime, we need to invoke change detection to trigger elementProperty call
        it('should disallow binding to attr.on*', () => {
            const template = `<div [attr.onclick]="ctxProp"></div>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            expect(() => {
                const cmp = testing_1.TestBed.createComponent(SecuredComponent);
                cmp.detectChanges();
            }).toThrowError(/Binding to event attribute 'onclick' is disallowed for security reasons, please use \(click\)=.../);
        });
        // this test is similar to the previous one, but since on-prefixed attributes validation now
        // happens at runtime, we need to invoke change detection to trigger elementProperty call
        it('should disallow binding to on* with NO_ERRORS_SCHEMA', () => {
            const template = `<div [onclick]="ctxProp"></div>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } }).configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            expect(() => {
                const cmp = testing_1.TestBed.createComponent(SecuredComponent);
                cmp.detectChanges();
            }).toThrowError(/Binding to event property 'onclick' is disallowed for security reasons, please use \(click\)=.../);
        });
        it('should disallow binding to on* unless it is consumed by a directive', () => {
            const template = `<div [onPrefixedProp]="ctxProp" [onclick]="ctxProp"></div>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } }).configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            // should not throw for inputs starting with "on"
            let cmp = undefined;
            expect(() => (cmp = testing_1.TestBed.createComponent(SecuredComponent))).not.toThrow();
            // must bind to the directive not to the property of the div
            const value = (cmp.componentInstance.ctxProp = {});
            cmp.detectChanges();
            const div = cmp.debugElement.children[0];
            expect(div.injector.get(OnPrefixDir).onclick).toBe(value);
            expect(div.nativeElement.onclick).not.toBe(value);
            expect(div.nativeElement.hasAttribute('onclick')).toEqual(false);
        });
    });
    describe('safe HTML values', function () {
        it('should not escape values marked as trusted', () => {
            const template = `<a [href]="ctxProp">Link Title</a>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            const sanitizer = (0, testing_1.getTestBed)().inject(dom_sanitization_service_1.DomSanitizer);
            const e = fixture.debugElement.children[0].nativeElement;
            const ci = fixture.componentInstance;
            const trusted = sanitizer.bypassSecurityTrustUrl('javascript:alert(1)');
            ci.ctxProp = trusted;
            fixture.detectChanges();
            expect(e.getAttribute('href')).toEqual('javascript:alert(1)');
        });
        it('should error when using the wrong trusted value', () => {
            const template = `<a [href]="ctxProp">Link Title</a>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            const sanitizer = (0, testing_1.getTestBed)().inject(dom_sanitization_service_1.DomSanitizer);
            const trusted = sanitizer.bypassSecurityTrustScript('javascript:alert(1)');
            const ci = fixture.componentInstance;
            ci.ctxProp = trusted;
            expect(() => fixture.detectChanges()).toThrowError(/Required a safe URL, got a Script/);
        });
        it('should warn when using in string interpolation', () => {
            const template = `<a href="/foo/{{ctxProp}}">Link Title</a>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            const sanitizer = (0, testing_1.getTestBed)().inject(dom_sanitization_service_1.DomSanitizer);
            const e = fixture.debugElement.children[0].nativeElement;
            const trusted = sanitizer.bypassSecurityTrustUrl('bar/baz');
            const ci = fixture.componentInstance;
            ci.ctxProp = trusted;
            fixture.detectChanges();
            expect(e.href).toMatch(/SafeValue(%20| )must(%20| )use/);
        });
    });
    describe('sanitizing', () => {
        function checkEscapeOfHrefProperty(fixture) {
            const e = fixture.debugElement.children[0].nativeElement;
            const ci = fixture.componentInstance;
            ci.ctxProp = 'hello';
            fixture.detectChanges();
            expect(e.getAttribute('href')).toMatch(/.*\/?hello$/);
            ci.ctxProp = 'javascript:alert(1)';
            fixture.detectChanges();
            expect(e.getAttribute('href')).toEqual('unsafe:javascript:alert(1)');
        }
        it('should escape unsafe properties', () => {
            const template = `<a [href]="ctxProp">Link Title</a>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            checkEscapeOfHrefProperty(fixture);
        });
        it('should escape unsafe attributes', () => {
            const template = `<a [attr.href]="ctxProp">Link Title</a>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            checkEscapeOfHrefProperty(fixture);
        });
        it('should escape unsafe properties if they are used in host bindings', () => {
            let HrefDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirHref]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dirHref_decorators;
                let _dirHref_initializers = [];
                let _dirHref_extraInitializers = [];
                var HrefDirective = _classThis = class {
                    constructor() {
                        this.dirHref = __runInitializers(this, _dirHref_initializers, void 0);
                        __runInitializers(this, _dirHref_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HrefDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dirHref_decorators = [(0, core_1.HostBinding)('href'), (0, core_1.Input)()];
                    __esDecorate(null, null, _dirHref_decorators, { kind: "field", name: "dirHref", static: false, private: false, access: { has: obj => "dirHref" in obj, get: obj => obj.dirHref, set: (obj, value) => { obj.dirHref = value; } }, metadata: _metadata }, _dirHref_initializers, _dirHref_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HrefDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HrefDirective = _classThis;
            })();
            const template = `<a [dirHref]="ctxProp">Link Title</a>`;
            testing_1.TestBed.configureTestingModule({ declarations: [HrefDirective] });
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            checkEscapeOfHrefProperty(fixture);
        });
        it('should escape unsafe attributes if they are used in host bindings', () => {
            let HrefDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirHref]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dirHref_decorators;
                let _dirHref_initializers = [];
                let _dirHref_extraInitializers = [];
                var HrefDirective = _classThis = class {
                    constructor() {
                        this.dirHref = __runInitializers(this, _dirHref_initializers, void 0);
                        __runInitializers(this, _dirHref_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HrefDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dirHref_decorators = [(0, core_1.HostBinding)('attr.href'), (0, core_1.Input)()];
                    __esDecorate(null, null, _dirHref_decorators, { kind: "field", name: "dirHref", static: false, private: false, access: { has: obj => "dirHref" in obj, get: obj => obj.dirHref, set: (obj, value) => { obj.dirHref = value; } }, metadata: _metadata }, _dirHref_initializers, _dirHref_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HrefDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HrefDirective = _classThis;
            })();
            const template = `<a [dirHref]="ctxProp">Link Title</a>`;
            testing_1.TestBed.configureTestingModule({ declarations: [HrefDirective] });
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            checkEscapeOfHrefProperty(fixture);
        });
        it('should escape unsafe SVG attributes', () => {
            const template = `<svg:circle [xlink:href]="ctxProp">Text</svg:circle>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'xlink:href'/);
        });
        it('should escape unsafe HTML values', () => {
            const template = `<div [innerHTML]="ctxProp">Text</div>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            const fixture = testing_1.TestBed.createComponent(SecuredComponent);
            const e = fixture.debugElement.children[0].nativeElement;
            const ci = fixture.componentInstance;
            // Make sure binding harmless values works.
            ci.ctxProp = 'some <p>text</p>';
            fixture.detectChanges();
            expect(e.innerHTML).toEqual('some <p>text</p>');
            ci.ctxProp = 'ha <script>evil()</script>';
            fixture.detectChanges();
            expect(e.innerHTML).toEqual('ha ');
            ci.ctxProp = 'also <img src="x" onerror="evil()"> evil';
            fixture.detectChanges();
            expect(e.innerHTML).toEqual('also <img src="x"> evil');
            ci.ctxProp = 'also <iframe srcdoc="evil"></iframe> evil';
            fixture.detectChanges();
            expect(e.innerHTML).toEqual('also  evil');
        });
    });
    describe('translation', () => {
        it('should throw error on security-sensitive attributes with constant values', () => {
            const template = `<iframe srcdoc="foo" i18n-srcdoc></iframe>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            expect(() => testing_1.TestBed.createComponent(SecuredComponent)).toThrowError(/Translating attribute 'srcdoc' is disallowed for security reasons./);
        });
        it('should throw error on security-sensitive attributes with interpolated values', () => {
            const template = `<object i18n-data data="foo{{bar}}baz"></object>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            expect(() => testing_1.TestBed.createComponent(SecuredComponent)).toThrowError(/Translating attribute 'data' is disallowed for security reasons./);
        });
        it('should throw error on security-sensitive attributes with bound values', () => {
            const template = `<div [innerHTML]="foo" i18n-innerHTML></div>`;
            testing_1.TestBed.overrideComponent(SecuredComponent, { set: { template } });
            expect(() => testing_1.TestBed.createComponent(SecuredComponent)).toThrowError(/Translating attribute 'innerHTML' is disallowed for security reasons./);
        });
    });
});
