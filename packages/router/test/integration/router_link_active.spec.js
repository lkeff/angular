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
exports.routerLinkActiveIntegrationSuite = routerLinkActiveIntegrationSuite;
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
const src_1 = require("../../src");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const integration_helpers_1 = require("./integration_helpers");
function routerLinkActiveIntegrationSuite() {
    describe('routerLinkActive', () => {
        it('should set the class when the link is active (a tag)', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        {
                            path: 'link',
                            component: integration_helpers_1.DummyLinkCmp,
                            children: [
                                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                                { path: '', component: integration_helpers_1.BlankCmp },
                            ],
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link;exact=true');
            yield (0, integration_helpers_1.advance)(fixture);
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link;exact=true');
            const nativeLink = fixture.nativeElement.querySelector('a');
            const nativeButton = fixture.nativeElement.querySelector('button');
            expect(nativeLink.className).toEqual('active');
            expect(nativeButton.className).toEqual('active');
            router.navigateByUrl('/team/22/link/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link/simple');
            expect(nativeLink.className).toEqual('');
            expect(nativeButton.className).toEqual('');
        }));
        it('should not set the class until the first navigation succeeds', () => __awaiter(this, void 0, void 0, function* () {
            let RootCmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<router-outlet></router-outlet><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" ></a>',
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
            const f = testing_1.TestBed.createComponent(RootCmpWithLink);
            yield (0, integration_helpers_1.advance)(f);
            const link = f.nativeElement.querySelector('a');
            expect(link.className).toEqual('');
            router.initialNavigation();
            yield (0, integration_helpers_1.advance)(f);
            expect(link.className).toEqual('active');
        }));
        it('should set the class on a parent element when the link is active', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        {
                            path: 'link',
                            component: integration_helpers_1.DummyLinkWithParentCmp,
                            children: [
                                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                                { path: '', component: integration_helpers_1.BlankCmp },
                            ],
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link;exact=true');
            yield (0, integration_helpers_1.advance)(fixture);
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link;exact=true');
            const native = fixture.nativeElement.querySelector('#link-parent');
            expect(native.className).toEqual('active');
            router.navigateByUrl('/team/22/link/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link/simple');
            expect(native.className).toEqual('');
        }));
        it('should set the class when the link is active', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        {
                            path: 'link',
                            component: integration_helpers_1.DummyLinkCmp,
                            children: [
                                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                                { path: '', component: integration_helpers_1.BlankCmp },
                            ],
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link');
            yield (0, integration_helpers_1.advance)(fixture);
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link');
            const native = fixture.nativeElement.querySelector('a');
            expect(native.className).toEqual('active');
            router.navigateByUrl('/team/22/link/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link/simple');
            expect(native.className).toEqual('active');
        }));
        it('should expose an isActive property', () => __awaiter(this, void 0, void 0, function* () {
            let ComponentWithRouterLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<a routerLink="/team" routerLinkActive #rla="routerLinkActive"></a>
               <p>{{rla.isActive}}</p>
               <span *ngIf="rla.isActive"></span>
               <span [ngClass]="{'highlight': rla.isActive}"></span>
               <router-outlet></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentWithRouterLink = _classThis = class {
                };
                __setFunctionName(_classThis, "ComponentWithRouterLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentWithRouterLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentWithRouterLink = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [ComponentWithRouterLink] });
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                {
                    path: 'team',
                    component: integration_helpers_1.TeamCmp,
                },
                {
                    path: 'otherteam',
                    component: integration_helpers_1.TeamCmp,
                },
            ]);
            const fixture = testing_1.TestBed.createComponent(ComponentWithRouterLink);
            yield expectAsync(router.navigateByUrl('/team')).toBeResolved();
            yield (0, integration_helpers_1.advance)(fixture);
            const paragraph = fixture.nativeElement.querySelector('p');
            expect(paragraph.textContent).toEqual('true');
            router.navigateByUrl('/otherteam');
            yield (0, integration_helpers_1.advance)(fixture);
            yield (0, integration_helpers_1.advance)(fixture);
            expect(paragraph.textContent).toEqual('false');
        }));
        it('should not trigger change detection when active state has not changed', () => __awaiter(this, void 0, void 0, function* () {
            let LinkComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div id="link" routerLinkActive="active" [routerLink]="link"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LinkComponent = _classThis = class {
                    constructor() {
                        this.link = 'notactive';
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
            let SimpleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SimpleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [...integration_helpers_1.ROUTER_DIRECTIVES],
                providers: [(0, src_1.provideRouter)([{ path: '', component: SimpleComponent }])],
                declarations: [LinkComponent, SimpleComponent],
            });
            const fixture = yield (0, integration_helpers_1.createRoot)(testing_1.TestBed.inject(src_1.Router), LinkComponent);
            fixture.componentInstance.link = 'stillnotactive';
            fixture.detectChanges(false /** checkNoChanges */);
            expect(testing_1.TestBed.inject(core_1.NgZone).hasPendingMicrotasks).toBe(false);
        }));
        it('should emit on isActiveChange output when link is activated or inactivated', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        {
                            path: 'link',
                            component: integration_helpers_1.DummyLinkCmp,
                            children: [
                                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                                { path: '', component: integration_helpers_1.BlankCmp },
                            ],
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link;exact=true');
            yield (0, integration_helpers_1.advance)(fixture);
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link;exact=true');
            const linkComponent = fixture.debugElement.query(by_1.By.directive(integration_helpers_1.DummyLinkCmp))
                .componentInstance;
            expect(linkComponent.isLinkActivated).toEqual(true);
            const nativeLink = fixture.nativeElement.querySelector('a');
            const nativeButton = fixture.nativeElement.querySelector('button');
            expect(nativeLink.className).toEqual('active');
            expect(nativeButton.className).toEqual('active');
            router.navigateByUrl('/team/22/link/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link/simple');
            expect(linkComponent.isLinkActivated).toEqual(false);
            expect(nativeLink.className).toEqual('');
            expect(nativeButton.className).toEqual('');
        }));
        it('should set a provided aria-current attribute when the link is active (a tag)', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        {
                            path: 'link',
                            component: integration_helpers_1.DummyLinkCmp,
                            children: [
                                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                                { path: '', component: integration_helpers_1.BlankCmp },
                            ],
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/link;exact=true');
            yield (0, integration_helpers_1.advance)(fixture);
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link;exact=true');
            const nativeLink = fixture.nativeElement.querySelector('a');
            const nativeButton = fixture.nativeElement.querySelector('button');
            expect(nativeLink.getAttribute('aria-current')).toEqual('page');
            expect(nativeButton.hasAttribute('aria-current')).toEqual(false);
            router.navigateByUrl('/team/22/link/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(location.path()).toEqual('/team/22/link/simple');
            expect(nativeLink.hasAttribute('aria-current')).toEqual(false);
            expect(nativeButton.hasAttribute('aria-current')).toEqual(false);
        }));
    });
}
