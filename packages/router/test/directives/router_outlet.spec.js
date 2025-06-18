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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
const testing_2 = require("../../testing");
const di_1 = require("../../../core/src/di");
const helpers_1 = require("../helpers");
describe('router outlet name', () => {
    it('should support name binding', () => __awaiter(void 0, void 0, void 0, function* () {
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<router-outlet [name]="name"></router-outlet>',
                    imports: [index_1.RouterOutlet],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
                constructor() {
                    this.name = 'popup';
                }
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
        let PopupCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'popup component',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var PopupCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "PopupCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                PopupCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return PopupCmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.RouterModule.forRoot([{ path: '', outlet: 'popup', component: PopupCmp }])],
        });
        const router = testing_1.TestBed.inject(index_1.Router);
        const fixture = yield createRoot(router, RootCmp);
        expect(fixture.nativeElement.innerHTML).toContain('popup component');
    }));
    it('should be able to change the name of the outlet', () => __awaiter(void 0, void 0, void 0, function* () {
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<router-outlet [name]="name()"></router-outlet>',
                    imports: [index_1.RouterOutlet],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
                constructor() {
                    this.name = (0, core_1.signal)('');
                }
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
        let GreetingCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'hello world',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var GreetingCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "GreetingCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                GreetingCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return GreetingCmp = _classThis;
        })();
        let FarewellCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'goodbye cruel world',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var FarewellCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "FarewellCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                FarewellCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return FarewellCmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [
                index_1.RouterModule.forRoot([
                    { path: '', outlet: 'greeting', component: GreetingCmp },
                    { path: '', outlet: 'farewell', component: FarewellCmp },
                ]),
            ],
        });
        const router = testing_1.TestBed.inject(index_1.Router);
        const fixture = yield createRoot(router, RootCmp);
        expect(fixture.nativeElement.innerHTML).not.toContain('goodbye');
        expect(fixture.nativeElement.innerHTML).not.toContain('hello');
        fixture.componentInstance.name.set('greeting');
        yield advance(fixture);
        expect(fixture.nativeElement.innerHTML).toContain('hello');
        expect(fixture.nativeElement.innerHTML).not.toContain('goodbye');
        fixture.componentInstance.name.set('farewell');
        yield advance(fixture);
        expect(fixture.nativeElement.innerHTML).toContain('goodbye');
        expect(fixture.nativeElement.innerHTML).not.toContain('hello');
    }));
    it('should support outlets in ngFor', () => __awaiter(void 0, void 0, void 0, function* () {
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <div *ngFor="let outlet of outlets()">
                <router-outlet [name]="outlet"></router-outlet>
            </div>
            `,
                    imports: [index_1.RouterOutlet, common_1.NgForOf],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
                constructor() {
                    this.outlets = (0, core_1.signal)(['outlet1', 'outlet2', 'outlet3']);
                }
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
        let Cmp1 = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'component 1',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp1 = _classThis = class {
            };
            __setFunctionName(_classThis, "Cmp1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp1 = _classThis;
        })();
        let Cmp2 = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'component 2',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp2 = _classThis = class {
            };
            __setFunctionName(_classThis, "Cmp2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp2 = _classThis;
        })();
        let Cmp3 = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'component 3',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp3 = _classThis = class {
            };
            __setFunctionName(_classThis, "Cmp3");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp3 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp3 = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [
                index_1.RouterModule.forRoot([
                    { path: '1', outlet: 'outlet1', component: Cmp1 },
                    { path: '2', outlet: 'outlet2', component: Cmp2 },
                    { path: '3', outlet: 'outlet3', component: Cmp3 },
                ]),
            ],
        });
        const router = testing_1.TestBed.inject(index_1.Router);
        const fixture = yield createRoot(router, RootCmp);
        router.navigate([{ outlets: { 'outlet1': '1' } }]);
        yield advance(fixture);
        expect(fixture.nativeElement.innerHTML).toContain('component 1');
        expect(fixture.nativeElement.innerHTML).not.toContain('component 2');
        expect(fixture.nativeElement.innerHTML).not.toContain('component 3');
        yield router.navigate([{ outlets: { 'outlet1': null, 'outlet2': '2', 'outlet3': '3' } }]);
        yield advance(fixture);
        expect(fixture.nativeElement.innerHTML).not.toContain('component 1');
        expect(fixture.nativeElement.innerHTML).toMatch('.*component 2.*component 3');
        // reverse the outlets
        fixture.componentInstance.outlets.set(['outlet3', 'outlet2', 'outlet1']);
        yield router.navigate([{ outlets: { 'outlet1': '1', 'outlet2': '2', 'outlet3': '3' } }]);
        yield advance(fixture);
        expect(fixture.nativeElement.innerHTML).toMatch('.*component 3.*component 2.*component 1');
    }));
    it('should not activate if route is changed', () => __awaiter(void 0, void 0, void 0, function* () {
        let ParentCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div *ngIf="initDone()"><router-outlet></router-outlet></div>',
                    imports: [index_1.RouterOutlet, common_1.CommonModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentCmp = _classThis = class {
                constructor() {
                    this.initDone = (0, core_1.signal)(false);
                    setTimeout(() => this.initDone.set(true), 100);
                }
            };
            __setFunctionName(_classThis, "ParentCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentCmp = _classThis;
        })();
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'child component',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "ChildCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildCmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [
                index_1.RouterModule.forRoot([
                    { path: 'parent', component: ParentCmp, children: [{ path: 'child', component: ChildCmp }] },
                ]),
            ],
        });
        const router = testing_1.TestBed.inject(index_1.Router);
        const fixture = yield createRoot(router, ParentCmp);
        yield advance(fixture, 25);
        router.navigate(['parent/child']);
        yield advance(fixture, 25);
        // Not contain because initDone is still false
        expect(fixture.nativeElement.innerHTML).not.toContain('child component');
        yield advance(fixture, 150);
        router.navigate(['parent']);
        yield advance(fixture, 150);
        // Not contain because route was changed back to parent
        expect(fixture.nativeElement.innerHTML).not.toContain('child component');
    }));
});
describe('component input binding', () => {
    it('sets component inputs from matching query params', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _language_decorators;
            let _language_initializers = [];
            let _language_extraInitializers = [];
            var MyComponent = _classThis = class {
                constructor() {
                    this.language = __runInitializers(this, _language_initializers, void 0);
                    __runInitializers(this, _language_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _language_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _language_decorators, { kind: "field", name: "language", static: false, private: false, access: { has: obj => "language" in obj, get: obj => obj.language, set: (obj, value) => { obj.language = value; } }, metadata: _metadata }, _language_initializers, _language_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([{ path: '**', component: MyComponent }], (0, index_1.withComponentInputBinding)()),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        const instance = yield harness.navigateByUrl('/?language=english', MyComponent);
        expect(instance.language).toEqual('english');
        yield harness.navigateByUrl('/?language=french');
        expect(instance.language).toEqual('french');
        // Should set the input to undefined when the matching router data is removed
        yield harness.navigateByUrl('/');
        expect(instance.language).toEqual(undefined);
        yield harness.navigateByUrl('/?notlanguage=doubletalk');
        expect(instance.language).toEqual(undefined);
    }));
    it('sets component inputs from resolved and static data', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _resolveA_decorators;
            let _resolveA_initializers = [];
            let _resolveA_extraInitializers = [];
            let _dataA_decorators;
            let _dataA_initializers = [];
            let _dataA_extraInitializers = [];
            var MyComponent = _classThis = class {
                constructor() {
                    this.resolveA = __runInitializers(this, _resolveA_initializers, void 0);
                    this.dataA = (__runInitializers(this, _resolveA_extraInitializers), __runInitializers(this, _dataA_initializers, void 0));
                    __runInitializers(this, _dataA_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _resolveA_decorators = [(0, core_1.Input)()];
                _dataA_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _resolveA_decorators, { kind: "field", name: "resolveA", static: false, private: false, access: { has: obj => "resolveA" in obj, get: obj => obj.resolveA, set: (obj, value) => { obj.resolveA = value; } }, metadata: _metadata }, _resolveA_initializers, _resolveA_extraInitializers);
                __esDecorate(null, null, _dataA_decorators, { kind: "field", name: "dataA", static: false, private: false, access: { has: obj => "dataA" in obj, get: obj => obj.dataA, set: (obj, value) => { obj.dataA = value; } }, metadata: _metadata }, _dataA_initializers, _dataA_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: '**',
                        component: MyComponent,
                        data: { 'dataA': 'My static data' },
                        resolve: { 'resolveA': () => 'My resolved data' },
                    },
                ], (0, index_1.withComponentInputBinding)()),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        const instance = yield harness.navigateByUrl('/', MyComponent);
        expect(instance.resolveA).toEqual('My resolved data');
        expect(instance.dataA).toEqual('My static data');
    }));
    it('sets component inputs from path params', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _language_decorators;
            let _language_initializers = [];
            let _language_extraInitializers = [];
            var MyComponent = _classThis = class {
                constructor() {
                    this.language = __runInitializers(this, _language_initializers, void 0);
                    __runInitializers(this, _language_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _language_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _language_decorators, { kind: "field", name: "language", static: false, private: false, access: { has: obj => "language" in obj, get: obj => obj.language, set: (obj, value) => { obj.language = value; } }, metadata: _metadata }, _language_initializers, _language_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([{ path: '**', component: MyComponent }], (0, index_1.withComponentInputBinding)()),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        const instance = yield harness.navigateByUrl('/x;language=english', MyComponent);
        expect(instance.language).toEqual('english');
    }));
    it('when keys conflict, sets inputs based on priority: data > path params > query params', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _result_decorators;
            let _result_initializers = [];
            let _result_extraInitializers = [];
            var MyComponent = _classThis = class {
                constructor() {
                    this.result = __runInitializers(this, _result_initializers, void 0);
                    __runInitializers(this, _result_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _result_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _result_decorators, { kind: "field", name: "result", static: false, private: false, access: { has: obj => "result" in obj, get: obj => obj.result, set: (obj, value) => { obj.result = value; } }, metadata: _metadata }, _result_initializers, _result_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'withData',
                        component: MyComponent,
                        data: { 'result': 'from data' },
                    },
                    {
                        path: 'withoutData',
                        component: MyComponent,
                    },
                ], (0, index_1.withComponentInputBinding)()),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        let instance = yield harness.navigateByUrl('/withData;result=from path param?result=from query params', MyComponent);
        expect(instance.result).toEqual('from data');
        // Same component, different instance because it's a different route
        instance = yield harness.navigateByUrl('/withoutData;result=from path param?result=from query params', MyComponent);
        expect(instance.result).toEqual('from path param');
        instance = yield harness.navigateByUrl('/withoutData?result=from query params', MyComponent);
        expect(instance.result).toEqual('from query params');
    }));
    it('does not write multiple times if two sources of conflicting keys both update', () => __awaiter(void 0, void 0, void 0, function* () {
        let resultLog = [];
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_result_decorators;
            var MyComponent = _classThis = class {
                set result(v) {
                    resultLog.push(v);
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_result_decorators = [(0, core_1.Input)()];
                __esDecorate(_classThis, null, _set_result_decorators, { kind: "setter", name: "result", static: false, private: false, access: { has: obj => "result" in obj, set: (obj, value) => { obj.result = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([{ path: '**', component: MyComponent }], (0, index_1.withComponentInputBinding)()),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        yield harness.navigateByUrl('/x', MyComponent);
        expect(resultLog).toEqual([undefined]);
        yield harness.navigateByUrl('/x;result=from path param?result=from query params', MyComponent);
        expect(resultLog).toEqual([undefined, 'from path param']);
    }));
    it('Should have inputs available to all outlets after navigation', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{myInput}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _myInput_decorators;
            let _myInput_initializers = [];
            let _myInput_extraInitializers = [];
            var MyComponent = _classThis = class {
                constructor() {
                    this.myInput = __runInitializers(this, _myInput_initializers, void 0);
                    __runInitializers(this, _myInput_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _myInput_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _myInput_decorators, { kind: "field", name: "myInput", static: false, private: false, access: { has: obj => "myInput" in obj, get: obj => obj.myInput, set: (obj, value) => { obj.myInput = value; } }, metadata: _metadata }, _myInput_initializers, _myInput_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        let OutletWrapper = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<router-outlet/>',
                    imports: [index_1.RouterOutlet],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OutletWrapper = _classThis = class {
            };
            __setFunctionName(_classThis, "OutletWrapper");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OutletWrapper = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OutletWrapper = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'root',
                        component: OutletWrapper,
                        children: [{ path: '**', component: MyComponent }],
                    },
                ], (0, index_1.withComponentInputBinding)()),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create('/root/child?myInput=1');
        expect(harness.routeNativeElement.innerText).toBe('1');
        yield harness.navigateByUrl('/root/child?myInput=2');
        expect(harness.routeNativeElement.innerText).toBe('2');
    }));
});
describe('injectors', () => {
    it('should always use environment injector from route hierarchy and not inherit from outlet', () => __awaiter(void 0, void 0, void 0, function* () {
        let childTokenValue = null;
        const TOKEN = new di_1.InjectionToken('');
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor() {
                    childTokenValue = (0, core_1.inject)(TOKEN, { optional: true });
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let ModWithProviders = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: TOKEN, useValue: 'some value' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModWithProviders = _classThis = class {
            };
            __setFunctionName(_classThis, "ModWithProviders");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModWithProviders = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModWithProviders = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<router-outlet/>',
                    imports: [index_1.RouterOutlet, ModWithProviders],
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
        testing_1.TestBed.configureTestingModule({
            providers: [(0, index_1.provideRouter)([{ path: 'a', component: Child }])],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        yield testing_1.TestBed.inject(index_1.Router).navigateByUrl('/a');
        fixture.detectChanges();
        expect(childTokenValue).toEqual(null);
    }));
    it('should not get sibling providers', () => __awaiter(void 0, void 0, void 0, function* () {
        let childTokenValue = null;
        const TOKEN = new di_1.InjectionToken('');
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor() {
                    childTokenValue = (0, core_1.inject)(TOKEN, { optional: true });
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<router-outlet/>',
                    imports: [index_1.RouterOutlet],
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
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    { path: 'a', providers: [{ provide: TOKEN, useValue: 'a value' }], component: Child },
                    { path: 'b', component: Child },
                ]),
            ],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        yield testing_1.TestBed.inject(index_1.Router).navigateByUrl('/a');
        fixture.detectChanges();
        expect(childTokenValue).toEqual('a value');
        yield testing_1.TestBed.inject(index_1.Router).navigateByUrl('/b');
        fixture.detectChanges();
        expect(childTokenValue).toEqual(null);
    }));
});
describe('router outlet data', () => {
    it('is injectable even when not set', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.data = (0, core_1.inject)(index_1.ROUTER_OUTLET_DATA);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '<router-outlet />', imports: [index_1.RouterOutlet] })];
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
        testing_1.TestBed.configureTestingModule({
            providers: [(0, index_1.provideRouter)([{ path: '**', component: MyComponent }])],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        yield testing_1.TestBed.inject(index_1.Router).navigateByUrl('/');
        fixture.detectChanges();
        const routedComponent = fixture.debugElement.query((v) => v.componentInstance instanceof MyComponent).componentInstance;
        expect(routedComponent.data()).toEqual(undefined);
    }));
    it('can set and update value', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.data = (0, core_1.inject)(index_1.ROUTER_OUTLET_DATA);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([{ path: '**', component: MyComponent }]),
                (0, core_1.provideZonelessChangeDetection)(),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        harness.fixture.componentInstance.routerOutletData.set('initial');
        const routedComponent = yield harness.navigateByUrl('/', MyComponent);
        expect(routedComponent.data()).toEqual('initial');
        harness.fixture.componentInstance.routerOutletData.set('new');
        yield harness.fixture.whenStable();
        expect(routedComponent.data()).toEqual('new');
    }));
    it('overrides parent provided data with nested', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [index_1.RouterOutlet],
                    template: `{{outletData()}}|<router-outlet [routerOutletData]="'child'" />`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor() {
                    this.outletData = (0, core_1.inject)(index_1.ROUTER_OUTLET_DATA);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let GrandChild = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{outletData()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var GrandChild = _classThis = class {
                constructor() {
                    this.outletData = (0, core_1.inject)(index_1.ROUTER_OUTLET_DATA);
                }
            };
            __setFunctionName(_classThis, "GrandChild");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                GrandChild = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return GrandChild = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'child',
                        component: Child,
                        children: [{ path: 'grandchild', component: GrandChild }],
                    },
                ]),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        harness.fixture.componentInstance.routerOutletData.set('parent');
        yield harness.navigateByUrl('/child/grandchild');
        expect((_a = harness.routeNativeElement) === null || _a === void 0 ? void 0 : _a.innerText).toContain('parent|child');
    }));
    it('does not inherit ancestor data when not provided in nested', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [index_1.RouterOutlet],
                    template: `{{outletData()}}|<router-outlet />`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor() {
                    this.outletData = (0, core_1.inject)(index_1.ROUTER_OUTLET_DATA);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let GrandChild = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{outletData() ?? "not provided"}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var GrandChild = _classThis = class {
                constructor() {
                    this.outletData = (0, core_1.inject)(index_1.ROUTER_OUTLET_DATA);
                }
            };
            __setFunctionName(_classThis, "GrandChild");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                GrandChild = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return GrandChild = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'child',
                        component: Child,
                        children: [{ path: 'grandchild', component: GrandChild }],
                    },
                ]),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        harness.fixture.componentInstance.routerOutletData.set('parent');
        yield harness.navigateByUrl('/child/grandchild');
        expect((_a = harness.routeNativeElement) === null || _a === void 0 ? void 0 : _a.innerText).toContain('parent|not provided');
    }));
});
function advance(fixture, millis) {
    return __awaiter(this, void 0, void 0, function* () {
        if (millis) {
            yield (0, helpers_1.timeout)(millis);
        }
        fixture.detectChanges();
    });
}
function createRoot(router, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const f = testing_1.TestBed.createComponent(type);
        yield advance(f);
        router.initialNavigation();
        yield advance(f);
        return f;
    });
}
