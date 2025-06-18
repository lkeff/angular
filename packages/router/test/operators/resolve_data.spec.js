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
const index_1 = require("../../index");
const testing_2 = require("../../testing");
const rxjs_1 = require("rxjs");
describe('resolveData operator', () => {
    it('should take only the first emitted value of every resolver', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        testing_1.TestBed.configureTestingModule({
            providers: [(0, index_1.provideRouter)([{ path: '**', children: [], resolve: { e1: () => (0, rxjs_1.interval)() } }])],
        });
        yield testing_2.RouterTestingHarness.create('/');
        expect((_a = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild) === null || _a === void 0 ? void 0 : _a.snapshot.data).toEqual({ e1: 0 });
    }));
    it('should cancel navigation if a resolver does not complete', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [(0, index_1.provideRouter)([{ path: '**', children: [], resolve: { e1: () => rxjs_1.EMPTY } }])],
        });
        yield testing_2.RouterTestingHarness.create('/a');
        expect(testing_1.TestBed.inject(index_1.Router).url).toEqual('/');
    }));
    it('should cancel navigation if 1 of 2 resolvers does not emit', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([{ path: '**', children: [], resolve: { e0: () => (0, rxjs_1.of)(0), e1: () => rxjs_1.EMPTY } }]),
            ],
        });
        yield testing_2.RouterTestingHarness.create('/a');
        expect(testing_1.TestBed.inject(index_1.Router).url).toEqual('/');
    }));
    it("should complete instantly if at least one resolver doesn't emit", () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([{ path: '**', children: [], resolve: { e0: () => rxjs_1.EMPTY, e1: () => rxjs_1.NEVER } }]),
            ],
        });
        yield testing_2.RouterTestingHarness.create('/a');
        expect(testing_1.TestBed.inject(index_1.Router).url).toEqual('/');
    }));
    it('should run resolvers in different parts of the tree', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let value = 0;
        let bValue = 0;
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'a',
                        runGuardsAndResolvers: () => false,
                        children: [
                            {
                                path: '',
                                resolve: { d0: () => ++value },
                                runGuardsAndResolvers: 'always',
                                children: [],
                            },
                        ],
                    },
                    {
                        path: 'b',
                        outlet: 'aux',
                        runGuardsAndResolvers: () => false,
                        children: [
                            {
                                path: '',
                                resolve: { d1: () => ++bValue },
                                runGuardsAndResolvers: 'always',
                                children: [],
                            },
                        ],
                    },
                ]),
            ],
        });
        const router = testing_1.TestBed.inject(index_1.Router);
        const harness = yield testing_2.RouterTestingHarness.create('/a(aux:b)');
        expect((_b = (_a = router.routerState.root.children[0]) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.snapshot.data).toEqual({ d0: 1 });
        expect((_d = (_c = router.routerState.root.children[1]) === null || _c === void 0 ? void 0 : _c.firstChild) === null || _d === void 0 ? void 0 : _d.snapshot.data).toEqual({ d1: 1 });
        yield harness.navigateByUrl('/a(aux:b)#new');
        expect((_f = (_e = router.routerState.root.children[0]) === null || _e === void 0 ? void 0 : _e.firstChild) === null || _f === void 0 ? void 0 : _f.snapshot.data).toEqual({ d0: 2 });
        expect((_h = (_g = router.routerState.root.children[1]) === null || _g === void 0 ? void 0 : _g.firstChild) === null || _h === void 0 ? void 0 : _h.snapshot.data).toEqual({ d1: 2 });
    }));
    it('should update children inherited data when resolvers run', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        let value = 0;
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'a',
                        children: [{ path: 'b', children: [] }],
                        resolve: { d0: () => ++value },
                        runGuardsAndResolvers: 'always',
                    },
                ]),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create('/a/b');
        expect((_a = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild) === null || _a === void 0 ? void 0 : _a.snapshot.data).toEqual({ d0: 1 });
        expect((_c = (_b = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild) === null || _b === void 0 ? void 0 : _b.firstChild) === null || _c === void 0 ? void 0 : _c.snapshot.data).toEqual({
            d0: 1,
        });
        yield harness.navigateByUrl('/a/b#new');
        expect((_d = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild) === null || _d === void 0 ? void 0 : _d.snapshot.data).toEqual({ d0: 2 });
        expect((_f = (_e = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild) === null || _e === void 0 ? void 0 : _e.firstChild) === null || _f === void 0 ? void 0 : _f.snapshot.data).toEqual({
            d0: 2,
        });
    }));
    it('should have correct data when parent resolver runs but data is not inherited', () => __awaiter(void 0, void 0, void 0, function* () {
        let Empty = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Empty = _classThis = class {
            };
            __setFunctionName(_classThis, "Empty");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Empty = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Empty = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'a',
                        component: Empty,
                        data: { parent: 'parent' },
                        resolve: { other: () => 'other' },
                        children: [
                            {
                                path: 'b',
                                data: { child: 'child' },
                                component: Empty,
                            },
                        ],
                    },
                ]),
            ],
        });
        yield testing_2.RouterTestingHarness.create('/a/b');
        const rootSnapshot = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild.snapshot;
        expect(rootSnapshot.data).toEqual({ parent: 'parent', other: 'other' });
        expect(rootSnapshot.firstChild.data).toEqual({ child: 'child' });
    }));
    it('should have static title when there is a resolver', () => __awaiter(void 0, void 0, void 0, function* () {
        let Empty = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Empty = _classThis = class {
            };
            __setFunctionName(_classThis, "Empty");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Empty = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Empty = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'a',
                        title: 'a title',
                        component: Empty,
                        resolve: { other: () => 'other' },
                        children: [
                            {
                                path: 'b',
                                title: 'b title',
                                component: Empty,
                                resolve: { otherb: () => 'other b' },
                            },
                        ],
                    },
                ]),
            ],
        });
        yield testing_2.RouterTestingHarness.create('/a/b');
        const rootSnapshot = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild.snapshot;
        expect(rootSnapshot.title).toBe('a title');
        expect(rootSnapshot.firstChild.title).toBe('b title');
    }));
    it('can used parent data in child resolver', () => __awaiter(void 0, void 0, void 0, function* () {
        let Empty = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Empty = _classThis = class {
            };
            __setFunctionName(_classThis, "Empty");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Empty = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Empty = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'a',
                        resolve: {
                            aResolve: () => new Promise((resolve) => setTimeout(() => resolve('a'), 5)),
                        },
                        children: [
                            {
                                path: 'b',
                                resolve: {
                                    bResolve: (route) => route.data['aResolve'] + 'b',
                                },
                                children: [{ path: 'c', component: Empty }],
                            },
                        ],
                    },
                ]),
            ],
        });
        yield testing_2.RouterTestingHarness.create('/a/b/c');
        const rootSnapshot = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild.snapshot;
        expect(rootSnapshot.firstChild.firstChild.data).toEqual({ bResolve: 'ab', aResolve: 'a' });
    }));
    it('should inherit resolved data from parent of parent route', () => __awaiter(void 0, void 0, void 0, function* () {
        let Empty = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Empty = _classThis = class {
            };
            __setFunctionName(_classThis, "Empty");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Empty = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Empty = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'a',
                        resolve: { aResolve: () => 'a' },
                        children: [
                            {
                                path: 'b',
                                resolve: { bResolve: () => 'b' },
                                children: [{ path: 'c', component: Empty }],
                            },
                        ],
                    },
                ]),
            ],
        });
        yield testing_2.RouterTestingHarness.create('/a/b/c');
        const rootSnapshot = testing_1.TestBed.inject(index_1.Router).routerState.root.firstChild.snapshot;
        expect(rootSnapshot.firstChild.firstChild.data).toEqual({ bResolve: 'b', aResolve: 'a' });
    }));
});
