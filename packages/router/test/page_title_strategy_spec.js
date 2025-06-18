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
exports.TitleResolver = exports.TestModule = exports.RootCmp = exports.BlankCmp = void 0;
const common_1 = require("@angular/common");
const testing_1 = require("@angular/common/testing");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const testing_2 = require("@angular/core/testing");
const index_1 = require("../index");
const testing_3 = require("../testing");
describe('title strategy', () => {
    describe('DefaultTitleStrategy', () => {
        let router;
        let document;
        beforeEach(() => {
            testing_2.TestBed.configureTestingModule({
                imports: [TestModule],
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, index_1.provideRouter)([], (0, index_1.withRouterConfig)({ paramsInheritanceStrategy: 'always' })),
                ],
            });
            router = testing_2.TestBed.inject(index_1.Router);
            document = testing_2.TestBed.inject(common_1.DOCUMENT);
        });
        it('sets page title from data', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([{ path: 'home', title: 'My Application', component: BlankCmp }]);
            yield router.navigateByUrl('home');
            expect(document.title).toBe('My Application');
        }));
        it('sets page title from resolved data', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([{ path: 'home', title: TitleResolver, component: BlankCmp }]);
            yield router.navigateByUrl('home');
            expect(document.title).toBe('resolved title');
        }));
        it('sets page title from resolved data function', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([{ path: 'home', title: () => 'resolved title', component: BlankCmp }]);
            yield router.navigateByUrl('home');
            expect(document.title).toBe('resolved title');
        }));
        it('sets title with child routes', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([
                {
                    path: 'home',
                    title: 'My Application',
                    children: [{ path: '', title: 'child title', component: BlankCmp }],
                },
            ]);
            yield router.navigateByUrl('home');
            expect(document.title).toBe('child title');
        }));
        it('sets title with child routes and named outlets', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([
                {
                    path: 'home',
                    title: 'My Application',
                    children: [
                        { path: '', title: 'child title', component: BlankCmp },
                        { path: '', outlet: 'childaux', title: 'child aux title', component: BlankCmp },
                    ],
                },
                { path: 'compose', component: BlankCmp, outlet: 'aux', title: 'compose' },
            ]);
            yield router.navigateByUrl('home(aux:compose)');
            expect(document.title).toBe('child title');
        }));
        it('sets page title with inherited params', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([
                {
                    path: 'home',
                    title: 'My Application',
                    children: [
                        {
                            path: '',
                            title: TitleResolver,
                            component: BlankCmp,
                        },
                    ],
                },
            ]);
            yield router.navigateByUrl('home');
            expect(document.title).toBe('resolved title');
        }));
        it('can get the title from the ActivatedRouteSnapshot', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([
                {
                    path: 'home',
                    title: 'My Application',
                    component: BlankCmp,
                },
            ]);
            yield router.navigateByUrl('home');
            expect(router.routerState.snapshot.root.firstChild.title).toEqual('My Application');
        }));
        it('pushes updates through the title observable', () => __awaiter(void 0, void 0, void 0, function* () {
            let HomeCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HomeCmp = _classThis = class {
                    constructor() {
                        this.title$ = (0, core_1.inject)(index_1.ActivatedRoute).title.pipe((0, rxjs_interop_1.takeUntilDestroyed)());
                        this.title$.subscribe((v) => (this.title = v));
                    }
                };
                __setFunctionName(_classThis, "HomeCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HomeCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HomeCmp = _classThis;
            })();
            const titleResolver = (route) => route.queryParams['id'];
            router.resetConfig([
                {
                    path: 'home',
                    title: titleResolver,
                    component: HomeCmp,
                    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                },
            ]);
            const harness = yield testing_3.RouterTestingHarness.create();
            const homeCmp = yield harness.navigateByUrl('/home?id=1', HomeCmp);
            expect(homeCmp.title).toEqual('1');
            yield harness.navigateByUrl('home?id=2');
            expect(homeCmp.title).toEqual('2');
        }));
    });
    describe('custom strategies', () => {
        it('overriding the setTitle method', () => __awaiter(void 0, void 0, void 0, function* () {
            let TemplatePageTitleStrategy = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = index_1.TitleStrategy;
                var TemplatePageTitleStrategy = _classThis = class extends _classSuper {
                    constructor(document) {
                        super();
                        this.document = document;
                    }
                    // Example of how setTitle could implement a template for the title
                    updateTitle(state) {
                        const title = this.buildTitle(state);
                        this.document.title = `My Application | ${title}`;
                    }
                };
                __setFunctionName(_classThis, "TemplatePageTitleStrategy");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TemplatePageTitleStrategy = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TemplatePageTitleStrategy = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                imports: [TestModule],
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, index_1.provideRouter)([]),
                    { provide: index_1.TitleStrategy, useClass: TemplatePageTitleStrategy },
                ],
            });
            const router = testing_2.TestBed.inject(index_1.Router);
            const document = testing_2.TestBed.inject(common_1.DOCUMENT);
            router.resetConfig([
                {
                    path: 'home',
                    title: 'Home',
                    children: [{ path: '', title: 'Child', component: BlankCmp }],
                },
            ]);
            yield router.navigateByUrl('home');
            expect(document.title).toEqual('My Application | Child');
        }));
    });
});
let BlankCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BlankCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "BlankCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BlankCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BlankCmp = _classThis;
})();
exports.BlankCmp = BlankCmp;
let RootCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
<router-outlet></router-outlet>
<router-outlet name="aux"></router-outlet>
`,
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
exports.RootCmp = RootCmp;
let TestModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [BlankCmp],
            imports: [index_1.RouterModule.forRoot([])],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestModule = _classThis = class {
    };
    __setFunctionName(_classThis, "TestModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestModule = _classThis;
})();
exports.TestModule = TestModule;
let TitleResolver = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TitleResolver = _classThis = class {
        resolve() {
            return 'resolved title';
        }
    };
    __setFunctionName(_classThis, "TitleResolver");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TitleResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TitleResolver = _classThis;
})();
exports.TitleResolver = TitleResolver;
