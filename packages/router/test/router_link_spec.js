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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const index_1 = require("../index");
describe('RouterLink', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ providers: [(0, core_1.provideZonelessChangeDetection)()] });
    });
    it('does not modify tabindex if already set on non-anchor element', () => __awaiter(void 0, void 0, void 0, function* () {
        let LinkComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [routerLink]="link" tabindex="1"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LinkComponent = _classThis = class {
                constructor() {
                    this.link = '/';
                }
            };
            __setFunctionName(_classThis, "LinkComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LinkComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LinkComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.RouterModule.forRoot([])],
            declarations: [LinkComponent],
        });
        const fixture = testing_1.TestBed.createComponent(LinkComponent);
        yield fixture.whenStable();
        const link = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(link.tabIndex).toEqual(1);
        fixture.nativeElement.link = null;
        yield fixture.whenStable();
        expect(link.tabIndex).toEqual(1);
    }));
    describe('on a non-anchor', () => {
        let LinkComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div
          [routerLink]="link()"
          [preserveFragment]="preserveFragment()"
          [skipLocationChange]="skipLocationChange()"
          [replaceUrl]="replaceUrl()"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LinkComponent = _classThis = class {
                constructor() {
                    this.link = (0, core_1.signal)('/');
                    this.preserveFragment = (0, core_1.signal)(undefined);
                    this.skipLocationChange = (0, core_1.signal)(undefined);
                    this.replaceUrl = (0, core_1.signal)(undefined);
                }
            };
            __setFunctionName(_classThis, "LinkComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LinkComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LinkComponent = _classThis;
        })();
        let fixture;
        let link;
        let router;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                imports: [index_1.RouterModule.forRoot([])],
                declarations: [LinkComponent],
            });
            fixture = testing_1.TestBed.createComponent(LinkComponent);
            yield fixture.whenStable();
            link = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
            router = testing_1.TestBed.inject(index_1.Router);
            spyOn(router, 'navigateByUrl');
            link.click();
            expect(router.navigateByUrl).toHaveBeenCalled();
            router.navigateByUrl.calls.reset();
        }));
        it('null, removes tabIndex and does not navigate', () => __awaiter(void 0, void 0, void 0, function* () {
            fixture.componentInstance.link.set(null);
            yield fixture.whenStable();
            expect(link.tabIndex).toEqual(-1);
            link.click();
            expect(router.navigateByUrl).not.toHaveBeenCalled();
        }));
        it('undefined, removes tabIndex and does not navigate', () => __awaiter(void 0, void 0, void 0, function* () {
            fixture.componentInstance.link.set(undefined);
            yield fixture.whenStable();
            expect(link.tabIndex).toEqual(-1);
            link.click();
            expect(router.navigateByUrl).not.toHaveBeenCalled();
        }));
        it('should coerce boolean input values', () => __awaiter(void 0, void 0, void 0, function* () {
            const dir = fixture.debugElement.query(platform_browser_1.By.directive(index_1.RouterLink)).injector.get(index_1.RouterLink);
            for (const truthy of [true, '', 'true', 'anything']) {
                fixture.componentInstance.preserveFragment.set(truthy);
                fixture.componentInstance.skipLocationChange.set(truthy);
                fixture.componentInstance.replaceUrl.set(truthy);
                yield fixture.whenStable();
                expect(dir.preserveFragment).toBeTrue();
                expect(dir.skipLocationChange).toBeTrue();
                expect(dir.replaceUrl).toBeTrue();
            }
            for (const falsy of [false, null, undefined, 'false']) {
                fixture.componentInstance.preserveFragment.set(falsy);
                fixture.componentInstance.skipLocationChange.set(falsy);
                fixture.componentInstance.replaceUrl.set(falsy);
                yield fixture.whenStable();
                expect(dir.preserveFragment).toBeFalse();
                expect(dir.skipLocationChange).toBeFalse();
                expect(dir.replaceUrl).toBeFalse();
            }
        }));
    });
    describe('on an anchor', () => {
        describe('RouterLink for elements with `href` attributes', () => {
            let LinkComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <a
            [routerLink]="link()"
            [preserveFragment]="preserveFragment()"
            [skipLocationChange]="skipLocationChange()"
            [replaceUrl]="replaceUrl()"></a>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LinkComponent = _classThis = class {
                    constructor() {
                        this.link = (0, core_1.signal)('/');
                        this.preserveFragment = (0, core_1.signal)(undefined);
                        this.skipLocationChange = (0, core_1.signal)(undefined);
                        this.replaceUrl = (0, core_1.signal)(undefined);
                    }
                };
                __setFunctionName(_classThis, "LinkComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LinkComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LinkComponent = _classThis;
            })();
            let fixture;
            let link;
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({
                    imports: [index_1.RouterModule.forRoot([])],
                    declarations: [LinkComponent],
                });
                fixture = testing_1.TestBed.createComponent(LinkComponent);
                yield fixture.whenStable();
                link = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
            }));
            it('null, removes href', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(link.outerHTML).toContain('href');
                fixture.componentInstance.link.set(null);
                yield fixture.whenStable();
                expect(link.outerHTML).not.toContain('href');
            }));
            it('undefined, removes href', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(link.outerHTML).toContain('href');
                fixture.componentInstance.link.set(undefined);
                yield fixture.whenStable();
                expect(link.outerHTML).not.toContain('href');
            }));
            it('should coerce boolean input values', () => __awaiter(void 0, void 0, void 0, function* () {
                const dir = fixture.debugElement.query(platform_browser_1.By.directive(index_1.RouterLink)).injector.get(index_1.RouterLink);
                for (const truthy of [true, '', 'true', 'anything']) {
                    fixture.componentInstance.preserveFragment.set(truthy);
                    fixture.componentInstance.skipLocationChange.set(truthy);
                    fixture.componentInstance.replaceUrl.set(truthy);
                    yield fixture.whenStable();
                    expect(dir.preserveFragment).toBeTrue();
                    expect(dir.skipLocationChange).toBeTrue();
                    expect(dir.replaceUrl).toBeTrue();
                }
                for (const falsy of [false, null, undefined, 'false']) {
                    fixture.componentInstance.preserveFragment.set(falsy);
                    fixture.componentInstance.skipLocationChange.set(falsy);
                    fixture.componentInstance.replaceUrl.set(falsy);
                    yield fixture.whenStable();
                    expect(dir.preserveFragment).toBeFalse();
                    expect(dir.skipLocationChange).toBeFalse();
                    expect(dir.replaceUrl).toBeFalse();
                }
            }));
        });
        it('should handle routerLink in svg templates', () => __awaiter(void 0, void 0, void 0, function* () {
            let LinkComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<svg><a routerLink="test"></a></svg>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LinkComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LinkComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LinkComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LinkComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [index_1.RouterModule.forRoot([])],
                declarations: [LinkComponent],
            });
            const fixture = testing_1.TestBed.createComponent(LinkComponent);
            yield fixture.whenStable();
            const link = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
            expect(link.outerHTML).toContain('href');
        }));
    });
    // Avoid executing in node environment because customElements is not defined.
    if (typeof customElements === 'object') {
        describe('on a custom element anchor', () => {
            /** Simple anchor element imitation. */
            class CustomAnchor extends HTMLElement {
                static get observedAttributes() {
                    return ['href'];
                }
                get href() {
                    var _a;
                    return (_a = this.getAttribute('href')) !== null && _a !== void 0 ? _a : '';
                }
                set href(value) {
                    this.setAttribute('href', value);
                }
                constructor() {
                    super();
                    const shadow = this.attachShadow({ mode: 'open' });
                    shadow.innerHTML = '<a><slot></slot></a>';
                }
                attributedChangedCallback(name, _oldValue, newValue) {
                    if (name === 'href') {
                        const anchor = this.shadowRoot.querySelector('a');
                        if (newValue === null) {
                            anchor.removeAttribute('href');
                        }
                        else {
                            anchor.setAttribute('href', newValue);
                        }
                    }
                }
            }
            if (!customElements.get('custom-anchor')) {
                customElements.define('custom-anchor', CustomAnchor);
            }
            let LinkComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <custom-anchor [routerLink]="link()"></custom-anchor>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LinkComponent = _classThis = class {
                    constructor() {
                        this.link = (0, core_1.signal)('/');
                    }
                };
                __setFunctionName(_classThis, "LinkComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LinkComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LinkComponent = _classThis;
            })();
            let fixture;
            let link;
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({
                    imports: [index_1.RouterModule.forRoot([])],
                    declarations: [LinkComponent],
                });
                fixture = testing_1.TestBed.createComponent(LinkComponent);
                yield fixture.whenStable();
                link = fixture.debugElement.query(platform_browser_1.By.css('custom-anchor')).nativeElement;
            }));
            it('does not touch tabindex', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(link.outerHTML).not.toContain('tabindex');
            }));
            it('null, removes href', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(link.outerHTML).toContain('href');
                fixture.componentInstance.link.set(null);
                yield fixture.whenStable();
                expect(link.outerHTML).not.toContain('href');
            }));
            it('undefined, removes href', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(link.outerHTML).toContain('href');
                fixture.componentInstance.link.set(undefined);
                yield fixture.whenStable();
                expect(link.outerHTML).not.toContain('href');
            }));
        });
    }
    it('can use a UrlTree as the input', () => __awaiter(void 0, void 0, void 0, function* () {
        let WithUrlTree = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<a [routerLink]="urlTree">link</a>',
                    imports: [index_1.RouterLink],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithUrlTree = _classThis = class {
                constructor() {
                    this.urlTree = (0, core_1.inject)(index_1.Router).createUrlTree(['/a/b/c']);
                }
            };
            __setFunctionName(_classThis, "WithUrlTree");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithUrlTree = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithUrlTree = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ providers: [(0, index_1.provideRouter)([])] });
        const fixture = testing_1.TestBed.createComponent(WithUrlTree);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerHTML).toContain('href="/a/b/c"');
    }));
    it('cannot use a UrlTree with queryParams', () => {
        let WithUrlTree = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<a [routerLink]="urlTree" [queryParams]="{}">link</a>',
                    imports: [index_1.RouterLink],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithUrlTree = _classThis = class {
                constructor() {
                    this.urlTree = (0, core_1.inject)(index_1.Router).createUrlTree(['/a/b/c']);
                }
            };
            __setFunctionName(_classThis, "WithUrlTree");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithUrlTree = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithUrlTree = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ providers: [(0, index_1.provideRouter)([])] });
        const fixture = testing_1.TestBed.createComponent(WithUrlTree);
        expect(() => fixture.changeDetectorRef.detectChanges()).toThrow();
    });
});
