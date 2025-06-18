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
const common_1 = require("@angular/common");
const testing_1 = require("@angular/common/testing");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/core/testing");
const index_1 = require("../index");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const provide_router_1 = require("../src/provide_router");
const navigations_1 = require("../src/utils/navigations");
const helpers_1 = require("./helpers");
describe('Integration', () => {
    describe('routerLinkActive', () => {
        it('should update when the associated routerLinks change - #18469', () => __awaiter(void 0, void 0, void 0, function* () {
            let LinkComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <a id="first-link" [routerLink]="[firstLink]" routerLinkActive="active">{{firstLink}}</a>
          <div id="second-link" routerLinkActive="active">
            <a [routerLink]="[secondLink]">{{secondLink}}</a>
          </div>
           `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LinkComponent = _classThis = class {
                    constructor() {
                        this.firstLink = 'link-a';
                        this.secondLink = 'link-b';
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                    }
                    changeLinks() {
                        const temp = this.secondLink;
                        this.secondLink = this.firstLink;
                        this.firstLink = temp;
                        this.cdr.markForCheck();
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
            let SimpleCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'simple',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "SimpleCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleCmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        { path: 'link-a', component: SimpleCmp },
                        { path: 'link-b', component: SimpleCmp },
                    ]),
                ],
                declarations: [LinkComponent, SimpleCmp],
            });
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield createRoot(router, LinkComponent);
            const firstLink = fixture.debugElement.query((p) => p.nativeElement.id === 'first-link');
            const secondLink = fixture.debugElement.query((p) => p.nativeElement.id === 'second-link');
            router.navigateByUrl('/link-a');
            yield advance(fixture);
            expect(firstLink.nativeElement.classList).toContain('active');
            expect(secondLink.nativeElement.classList).not.toContain('active');
            fixture.componentInstance.changeLinks();
            fixture.detectChanges();
            yield advance(fixture);
            expect(firstLink.nativeElement.classList).not.toContain('active');
            expect(secondLink.nativeElement.classList).toContain('active');
        }));
        it('should not cause infinite loops in the change detection - #15825', () => __awaiter(void 0, void 0, void 0, function* () {
            let SimpleCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple',
                        template: 'simple',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "SimpleCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'some-root',
                        template: `
        <div *ngIf="show">
          <ng-container *ngTemplateOutlet="tpl"></ng-container>
        </div>
        <router-outlet></router-outlet>
        <ng-template #tpl>
          <a routerLink="/simple" routerLinkActive="active"></a>
        </ng-template>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.show = false;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [common_1.CommonModule, index_1.RouterModule.forRoot([])],
                        declarations: [MyCmp, SimpleCmp],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "MyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyModule = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ imports: [MyModule] });
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield createRoot(router, MyCmp);
            router.resetConfig([{ path: 'simple', component: SimpleCmp }]);
            router.navigateByUrl('/simple');
            yield advance(fixture);
            const instance = fixture.componentInstance;
            instance.show = true;
            expect(() => advance(fixture)).not.toThrow();
        }));
        it('should set isActive right after looking at its children -- #18983', () => __awaiter(void 0, void 0, void 0, function* () {
            let ComponentWithRouterLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div #rla="routerLinkActive" routerLinkActive>
            isActive: {{rla.isActive}}

            <ng-template let-data>
              <a [routerLink]="data">link</a>
            </ng-template>

            <ng-container #container></ng-container>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _templateRef_decorators;
                let _templateRef_initializers = [];
                let _templateRef_extraInitializers = [];
                let _container_decorators;
                let _container_initializers = [];
                let _container_extraInitializers = [];
                var ComponentWithRouterLink = _classThis = class {
                    addLink() {
                        var _a;
                        if (this.templateRef) {
                            (_a = this.container) === null || _a === void 0 ? void 0 : _a.createEmbeddedView(this.templateRef, { $implicit: '/simple' });
                        }
                    }
                    removeLink() {
                        var _a;
                        (_a = this.container) === null || _a === void 0 ? void 0 : _a.clear();
                    }
                    constructor() {
                        this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                        this.container = (__runInitializers(this, _templateRef_extraInitializers), __runInitializers(this, _container_initializers, void 0));
                        __runInitializers(this, _container_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ComponentWithRouterLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _templateRef_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef, { static: true })];
                    _container_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef, static: true })];
                    __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                    __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentWithRouterLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentWithRouterLink = _classThis;
            })();
            let SimpleCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'simple',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "SimpleCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleCmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.RouterModule.forRoot([{ path: 'simple', component: SimpleCmp }])],
                declarations: [ComponentWithRouterLink, SimpleCmp],
            });
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield createRoot(router, ComponentWithRouterLink);
            router.navigateByUrl('/simple');
            yield advance(fixture);
            fixture.componentInstance.addLink();
            fixture.detectChanges();
            fixture.componentInstance.removeLink();
            yield advance(fixture);
            yield advance(fixture);
            expect(fixture.nativeElement.innerHTML).toContain('isActive: false');
        }));
        it('should set isActive with OnPush change detection - #19934', () => __awaiter(void 0, void 0, void 0, function* () {
            let OnPushComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             <div routerLink="/simple" #rla="routerLinkActive" routerLinkActive>
               isActive: {{rla.isActive}}
             </div>
           `,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OnPushComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "OnPushComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OnPushComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OnPushComponent = _classThis;
            })();
            let SimpleCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'simple',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "SimpleCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleCmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.RouterModule.forRoot([{ path: 'simple', component: SimpleCmp }])],
                declarations: [OnPushComponent, SimpleCmp],
            });
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield createRoot(router, OnPushComponent);
            router.navigateByUrl('/simple');
            yield advance(fixture);
            expect(fixture.nativeElement.innerHTML).toContain('isActive: true');
        }));
    });
    it('should not reactivate a deactivated outlet when destroyed and recreated - #41379', () => __awaiter(void 0, void 0, void 0, function* () {
        let SimpleComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'simple',
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
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: ` <router-outlet *ngIf="outletVisible" name="aux"></router-outlet> `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor() {
                    this.outletVisible = true;
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
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.RouterModule.forRoot([{ path: ':id', component: SimpleComponent, outlet: 'aux' }])],
            declarations: [SimpleComponent, AppComponent],
        });
        const router = testing_2.TestBed.inject(index_1.Router);
        const fixture = yield createRoot(router, AppComponent);
        const componentCdr = fixture.componentRef.injector.get(core_1.ChangeDetectorRef);
        router.navigate([{ outlets: { aux: ['1234'] } }]);
        yield advance(fixture);
        expect(fixture.nativeElement.innerHTML).toContain('simple');
        router.navigate([{ outlets: { aux: null } }]);
        yield advance(fixture);
        expect(fixture.nativeElement.innerHTML).not.toContain('simple');
        fixture.componentInstance.outletVisible = false;
        componentCdr.detectChanges();
        expect(fixture.nativeElement.innerHTML).not.toContain('simple');
        expect(fixture.nativeElement.innerHTML).not.toContain('router-outlet');
        fixture.componentInstance.outletVisible = true;
        componentCdr.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('router-outlet');
        expect(fixture.nativeElement.innerHTML).not.toContain('simple');
    }));
    describe('useHash', () => {
        it('should restore hash to match current route - #28561', () => __awaiter(void 0, void 0, void 0, function* () {
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-cmp',
                        template: `<router-outlet></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let SimpleCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'simple',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "SimpleCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleCmp = _classThis;
            })();
            let OneCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'one',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OneCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "OneCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OneCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OneCmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                imports: [
                    index_1.RouterModule.forRoot([
                        { path: '', component: SimpleCmp },
                        { path: 'one', component: OneCmp, canActivate: [() => (0, core_1.inject)(index_1.Router).parseUrl('/')] },
                    ]),
                ],
                declarations: [SimpleCmp, RootCmp, OneCmp],
                providers: [(0, testing_1.provideLocationMocks)()],
            });
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            router.navigateByUrl('/');
            // Will setup location change listeners
            const fixture = yield createRoot(router, RootCmp);
            location.simulateHashChange('/one');
            yield advance(fixture);
            expect(location.path()).toEqual('/');
            expect(fixture.nativeElement.innerHTML).toContain('one');
        }));
    });
    describe('duplicate navigation handling (#43447, #43446)', () => {
        let location;
        let router;
        let fixture;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            let DelayedResolve = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DelayedResolve = _classThis = class {
                    resolve() {
                        return (0, rxjs_1.of)('').pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 10)).then(() => v)), (0, operators_1.mapTo)(true));
                    }
                };
                __setFunctionName(_classThis, "DelayedResolve");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DelayedResolve = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DelayedResolve = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-cmp',
                        template: `<router-outlet></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let SimpleCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'simple',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SimpleCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "SimpleCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SimpleCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SimpleCmp = _classThis;
            })();
            let OneCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'one',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OneCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "OneCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OneCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OneCmp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                declarations: [SimpleCmp, RootCmp, OneCmp],
                imports: [index_1.RouterOutlet],
                providers: [
                    DelayedResolve,
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([
                        { path: '', component: SimpleCmp },
                        { path: 'one', component: OneCmp, resolve: { x: DelayedResolve } },
                    ]),
                    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                ],
            });
            router = testing_2.TestBed.inject(index_1.Router);
            location = testing_2.TestBed.inject(common_1.Location);
            router.navigateByUrl('/');
            // Will setup location change listeners
            fixture = yield createRoot(router, RootCmp);
        }));
        it('duplicate navigation to same url', () => __awaiter(void 0, void 0, void 0, function* () {
            location.go('/one');
            yield (0, helpers_1.timeout)(1);
            location.go('/one');
            yield (0, helpers_1.timeout)(10);
            yield advance(fixture);
            expect(location.path()).toEqual('/one');
            expect(fixture.nativeElement.innerHTML).toContain('one');
        }));
        it('works with a duplicate popstate/hashchange navigation (as seen in firefox)', () => __awaiter(void 0, void 0, void 0, function* () {
            location._subject.next({ 'url': 'one', 'pop': true, 'type': 'popstate' });
            yield (0, helpers_1.timeout)(1);
            location._subject.next({ 'url': 'one', 'pop': true, 'type': 'hashchange' });
            yield (0, helpers_1.timeout)(10);
            yield advance(fixture);
            expect(router.routerState.toString()).toContain(`url:'one'`);
            expect(fixture.nativeElement.innerHTML).toContain('one');
        }));
    });
    it('should not unregister outlet if a different one already exists #36711, 32453', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <router-outlet *ngIf="outlet1()"></router-outlet>
      <router-outlet *ngIf="outlet2()"></router-outlet>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.outlet1 = (0, core_1.signal)(true);
                    this.outlet2 = (0, core_1.signal)(false);
                }
            };
            __setFunctionName(_classThis, "TestCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmp = _classThis;
        })();
        let EmptyCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var EmptyCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "EmptyCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                EmptyCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return EmptyCmp = _classThis;
        })();
        testing_2.TestBed.configureTestingModule({
            imports: [common_1.CommonModule, index_1.RouterModule.forRoot([{ path: '**', component: EmptyCmp }])],
            declarations: [TestCmp, EmptyCmp],
        });
        const fixture = testing_2.TestBed.createComponent(TestCmp);
        const contexts = testing_2.TestBed.inject(index_1.ChildrenOutletContexts);
        yield testing_2.TestBed.inject(index_1.Router).navigateByUrl('/');
        fixture.detectChanges();
        expect(contexts.getContext('primary')).toBeDefined();
        expect((_a = contexts.getContext('primary')) === null || _a === void 0 ? void 0 : _a.outlet).not.toBeNull();
        // Show the second outlet. Applications shouldn't really have more than one outlet but there can
        // be timing issues between destroying and recreating a second one in some cases:
        // https://github.com/angular/angular/issues/36711,
        // https://github.com/angular/angular/issues/32453
        fixture.componentInstance.outlet2.set(true);
        fixture.detectChanges();
        expect((_b = contexts.getContext('primary')) === null || _b === void 0 ? void 0 : _b.outlet).not.toBeNull();
        fixture.componentInstance.outlet1.set(false);
        fixture.detectChanges();
        // Destroying the first one show not clear the outlet context because the second one takes over
        // as the registered outlet.
        expect((_c = contexts.getContext('primary')) === null || _c === void 0 ? void 0 : _c.outlet).not.toBeNull();
    }));
    it('should respect custom serializer all the way to the final url on state', () => __awaiter(void 0, void 0, void 0, function* () {
        const QUERY_VALUE = { user: 'atscott' };
        const SPECIAL_SERIALIZATION = 'special';
        class CustomSerializer extends index_1.DefaultUrlSerializer {
            serialize(tree) {
                var _a;
                const mutableCopy = new index_1.UrlTree(tree.root, Object.assign({}, tree.queryParams), tree.fragment);
                (_a = mutableCopy.queryParams)['q'] && (_a['q'] = SPECIAL_SERIALIZATION);
                return new index_1.DefaultUrlSerializer().serialize(mutableCopy);
            }
        }
        testing_2.TestBed.configureTestingModule({
            providers: [(0, provide_router_1.provideRouter)([]), { provide: index_1.UrlSerializer, useValue: new CustomSerializer() }],
        });
        const router = testing_2.TestBed.inject(index_1.Router);
        const tree = router.createUrlTree([]);
        tree.queryParams = { q: QUERY_VALUE };
        yield router.navigateByUrl(tree);
        expect(router.url).toEqual(`/?q=${SPECIAL_SERIALIZATION}`);
    }));
    it('navigation works when a redirecting NavigationCancel event causes another synchronous navigation', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_2.TestBed.configureTestingModule({
            providers: [
                (0, provide_router_1.provideRouter)([
                    { path: 'a', children: [] },
                    { path: 'b', children: [] },
                    { path: 'c', children: [] },
                ], (0, provide_router_1.withRouterConfig)({ resolveNavigationPromiseOnError: true })),
            ],
        });
        let errors = [];
        let cancellations = [];
        const router = testing_2.TestBed.inject(index_1.Router);
        router.events
            .pipe((0, operators_1.filter)((e) => e instanceof index_1.NavigationError))
            .subscribe((e) => errors.push(e));
        router.events
            .pipe((0, operators_1.filter)((e) => e instanceof index_1.NavigationCancel))
            .subscribe((e) => cancellations.push(e));
        router.events
            .pipe((0, operators_1.filter)((e) => e instanceof index_1.NavigationCancel), (0, operators_1.take)(1))
            .subscribe(() => {
            router.navigateByUrl('/c');
        });
        router.navigateByUrl('/a');
        router.navigateByUrl('/b');
        yield new Promise((resolve) => (0, navigations_1.afterNextNavigation)(router, resolve));
        expect(router.url).toEqual('/c');
        expect(errors).toEqual([]);
        // navigations to a and b were both cancelled.
        expect(cancellations.length).toEqual(2);
    }));
});
function advance(fixture) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helpers_1.timeout)();
        fixture.detectChanges();
    });
}
function createRoot(router, type) {
    const f = testing_2.TestBed.createComponent(type);
    advance(f);
    router.initialNavigation();
    advance(f);
    return f;
}
