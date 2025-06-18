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
exports.routerLinkIntegrationSpec = routerLinkIntegrationSpec;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const testing_1 = require("@angular/core/testing");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const src_1 = require("../../src");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const integration_helpers_1 = require("./integration_helpers");
function routerLinkIntegrationSpec() {
    describe('router links', () => {
        it('should support skipping location update for anchor router links', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([{ path: 'team/:id', component: integration_helpers_1.TeamCmp }]);
            router.navigateByUrl('/team/22');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ , right:  ]');
            const teamCmp = fixture.debugElement.childNodes[1].componentInstance;
            teamCmp.routerLink.set(['/team/0']);
            yield (0, integration_helpers_1.advance)(fixture);
            const anchor = fixture.debugElement.query(by_1.By.css('a')).nativeElement;
            anchor.click();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 0 [ , right:  ]');
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            teamCmp.routerLink.set(['/team/1']);
            yield (0, integration_helpers_1.advance)(fixture);
            const button = fixture.debugElement.query(by_1.By.css('button')).nativeElement;
            button.click();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 1 [ , right:  ]');
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
        }));
        it('should support string router links', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'link', component: integration_helpers_1.StringLinkCmp },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ link, right:  ]');
            const native = fixture.nativeElement.querySelector('a');
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/team/33/simple');
            (0, matchers_1.expect)(native.getAttribute('target')).toEqual('_self');
            native.click();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ simple, right:  ]');
        }));
        it('should not preserve query params and fragment by default', () => __awaiter(this, void 0, void 0, function* () {
            let RootCmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someRoot',
                        template: `<router-outlet></router-outlet><a routerLink="/home">Link</a>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmpWithLink = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmpWithLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmpWithLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmpWithLink = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [RootCmpWithLink] });
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, RootCmpWithLink);
            router.resetConfig([{ path: 'home', component: integration_helpers_1.SimpleCmp }]);
            const native = fixture.nativeElement.querySelector('a');
            router.navigateByUrl('/home?q=123#fragment');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/home');
        }));
        it('should not throw when commands is null or undefined', () => __awaiter(this, void 0, void 0, function* () {
            let CmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someCmp',
                        template: `<router-outlet></router-outlet>
                <a [routerLink]="null">Link</a>
                <button [routerLink]="null">Button</button>
                <a [routerLink]="undefined">Link</a>
                <button [routerLink]="undefined">Button</button>
                `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpWithLink = _classThis = class {
                };
                __setFunctionName(_classThis, "CmpWithLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpWithLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpWithLink = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [CmpWithLink] });
            const router = testing_1.TestBed.inject(src_1.Router);
            let fixture = yield (0, integration_helpers_1.createRoot)(router, CmpWithLink);
            router.resetConfig([{ path: 'home', component: integration_helpers_1.SimpleCmp }]);
            const anchors = fixture.nativeElement.querySelectorAll('a');
            const buttons = fixture.nativeElement.querySelectorAll('button');
            (0, matchers_1.expect)(() => anchors[0].click()).not.toThrow();
            (0, matchers_1.expect)(() => anchors[1].click()).not.toThrow();
            (0, matchers_1.expect)(() => buttons[0].click()).not.toThrow();
            (0, matchers_1.expect)(() => buttons[1].click()).not.toThrow();
        }));
        it('should not throw when some command is null', () => __awaiter(this, void 0, void 0, function* () {
            let CmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someCmp',
                        template: `<router-outlet></router-outlet><a [routerLink]="[null]">Link</a><button [routerLink]="[null]">Button</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpWithLink = _classThis = class {
                };
                __setFunctionName(_classThis, "CmpWithLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpWithLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpWithLink = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [CmpWithLink] });
            const router = testing_1.TestBed.inject(src_1.Router);
            (0, matchers_1.expect)(() => __awaiter(this, void 0, void 0, function* () { return yield (0, integration_helpers_1.createRoot)(router, CmpWithLink); })).not.toThrow();
        }));
        it('should not throw when some command is undefined', () => __awaiter(this, void 0, void 0, function* () {
            let CmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someCmp',
                        template: `<router-outlet></router-outlet><a [routerLink]="[undefined]">Link</a><button [routerLink]="[undefined]">Button</button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpWithLink = _classThis = class {
                };
                __setFunctionName(_classThis, "CmpWithLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpWithLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpWithLink = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [CmpWithLink] });
            const router = testing_1.TestBed.inject(src_1.Router);
            (0, matchers_1.expect)(() => __awaiter(this, void 0, void 0, function* () { return yield (0, integration_helpers_1.createRoot)(router, CmpWithLink); })).not.toThrow();
        }));
        it('should update hrefs when query params or fragment change', () => __awaiter(this, void 0, void 0, function* () {
            let RootCmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someRoot',
                        template: `<router-outlet></router-outlet><a routerLink="/home" queryParamsHandling="preserve" preserveFragment>Link</a>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmpWithLink = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmpWithLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmpWithLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmpWithLink = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [RootCmpWithLink] });
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, RootCmpWithLink);
            router.resetConfig([{ path: 'home', component: integration_helpers_1.SimpleCmp }]);
            const native = fixture.nativeElement.querySelector('a');
            router.navigateByUrl('/home?q=123');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/home?q=123');
            router.navigateByUrl('/home?q=456');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/home?q=456');
            router.navigateByUrl('/home?q=456#1');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/home?q=456#1');
        }));
        it('should correctly use the preserve strategy', () => __awaiter(this, void 0, void 0, function* () {
            let RootCmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someRoot',
                        template: `<router-outlet></router-outlet><a routerLink="/home" [queryParams]="{q: 456}" queryParamsHandling="preserve">Link</a>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmpWithLink = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmpWithLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmpWithLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmpWithLink = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [RootCmpWithLink] });
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, RootCmpWithLink);
            router.resetConfig([{ path: 'home', component: integration_helpers_1.SimpleCmp }]);
            const native = fixture.nativeElement.querySelector('a');
            router.navigateByUrl('/home?a=123');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/home?a=123');
        }));
        it('should correctly use the merge strategy', () => __awaiter(this, void 0, void 0, function* () {
            let RootCmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someRoot',
                        template: `<router-outlet></router-outlet><a routerLink="/home" [queryParams]="{removeMe: null, q: 456}" queryParamsHandling="merge">Link</a>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmpWithLink = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmpWithLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmpWithLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmpWithLink = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [RootCmpWithLink] });
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, RootCmpWithLink);
            router.resetConfig([{ path: 'home', component: integration_helpers_1.SimpleCmp }]);
            const native = fixture.nativeElement.querySelector('a');
            router.navigateByUrl('/home?a=123&removeMe=123');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/home?a=123&q=456');
        }));
        it('should support using links on non-a tags', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'link', component: integration_helpers_1.StringLinkButtonCmp },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ link, right:  ]');
            const button = fixture.nativeElement.querySelector('button');
            (0, matchers_1.expect)(button.getAttribute('tabindex')).toEqual('0');
            button.click();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ simple, right:  ]');
        }));
        it('should support absolute router links', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'link', component: integration_helpers_1.AbsoluteLinkCmp },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ link, right:  ]');
            const native = fixture.nativeElement.querySelector('a');
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/team/33/simple');
            native.click();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ simple, right:  ]');
        }));
        it('should support relative router links', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'link', component: integration_helpers_1.RelativeLinkCmp },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ link, right:  ]');
            const native = fixture.nativeElement.querySelector('a');
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/team/22/simple');
            native.click();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ simple, right:  ]');
        }));
        it('should support top-level link', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RelativeLinkInIfCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                { path: '', component: integration_helpers_1.BlankCmp },
            ]);
            router.navigateByUrl('/');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
            const cmp = fixture.componentInstance;
            cmp.show.set(true);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('link');
            const native = fixture.nativeElement.querySelector('a');
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/simple');
            native.click();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('linksimple');
        }));
        it('should support query params and fragments', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'link', component: integration_helpers_1.LinkWithQueryParamsAndFragment },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link');
            yield (0, integration_helpers_1.advance)(fixture);
            const native = fixture.nativeElement.querySelector('a');
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/team/22/simple?q=1#f');
            native.click();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ simple, right:  ]');
            (0, matchers_1.expect)(location.path(true)).toEqual('/team/22/simple?q=1#f');
        }));
        describe('should support history and state', () => {
            let component;
            it('for anchor elements', () => {
                // Test logic in afterEach to reduce duplication
                component = integration_helpers_1.LinkWithState;
            });
            it('for non-anchor elements', () => {
                // Test logic in afterEach to reduce duplication
                component = integration_helpers_1.DivLinkWithState;
            });
            afterEach(() => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'team/:id',
                        component: integration_helpers_1.TeamCmp,
                        children: [
                            { path: 'link', component },
                            { path: 'simple', component: integration_helpers_1.SimpleCmp },
                        ],
                    },
                ]);
                router.navigateByUrl('/team/22/link');
                yield (0, integration_helpers_1.advance)(fixture);
                const native = fixture.nativeElement.querySelector('#link');
                native.click();
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ simple, right:  ]');
                // Check the history entry
                (0, matchers_1.expect)(location.getState()).toEqual({ foo: 'bar', navigationId: 3 });
            }));
        });
        it('should set href on area elements', () => __awaiter(this, void 0, void 0, function* () {
            let RootCmpWithArea = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someRoot',
                        template: `<router-outlet></router-outlet><map><area routerLink="/home" /></map>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmpWithArea = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmpWithArea");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmpWithArea = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmpWithArea = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [RootCmpWithArea] });
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, RootCmpWithArea);
            router.resetConfig([{ path: 'home', component: integration_helpers_1.SimpleCmp }]);
            const native = fixture.nativeElement.querySelector('area');
            (0, matchers_1.expect)(native.getAttribute('href')).toEqual('/home');
        }));
    });
}
