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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const recognize_1 = require("../src/recognize");
const router_1 = require("../src/router");
const router_config_loader_1 = require("../src/router_config_loader");
const url_tree_1 = require("../src/url_tree");
const config_1 = require("../src/utils/config");
const helpers_1 = require("./helpers");
describe('redirects', () => {
    const serializer = new url_tree_1.DefaultUrlSerializer();
    it('should return the same url tree when no redirects', () => {
        checkRedirect([
            {
                path: 'a',
                component: ComponentA,
                children: [{ path: 'b', component: ComponentB }],
            },
        ], '/a/b', (t) => {
            expectTreeToBe(t, '/a/b');
        });
    });
    it('should add new segments when needed', () => {
        checkRedirect([
            { path: 'a/b', redirectTo: 'a/b/c' },
            { path: '**', component: ComponentC },
        ], '/a/b', (t) => {
            expectTreeToBe(t, '/a/b/c');
        });
    });
    it('should support redirecting with to an URL with query parameters', () => {
        const config = [
            { path: 'single_value', redirectTo: '/dst?k=v1' },
            { path: 'multiple_values', redirectTo: '/dst?k=v1&k=v2' },
            { path: '**', component: ComponentA },
        ];
        checkRedirect(config, 'single_value', (t, state) => {
            expectTreeToBe(t, '/dst?k=v1');
            expect(state.root.queryParams).toEqual({ k: 'v1' });
        });
        checkRedirect(config, 'multiple_values', (t) => expectTreeToBe(t, '/dst?k=v1&k=v2'));
    });
    it('should handle positional parameters', () => {
        checkRedirect([
            { path: 'a/:aid/b/:bid', redirectTo: 'newa/:aid/newb/:bid' },
            { path: '**', component: ComponentC },
        ], '/a/1/b/2', (t) => {
            expectTreeToBe(t, '/newa/1/newb/2');
        });
    });
    it('should throw when cannot handle a positional parameter', () => {
        (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, [{ path: 'a/:id', redirectTo: 'a/:other' }], tree('/a/1'), serializer).subscribe(() => { }, (e) => {
            expect(e.message).toContain("Cannot redirect to 'a/:other'. Cannot find ':other'.");
        });
    });
    it('should pass matrix parameters', () => {
        checkRedirect([
            { path: 'a/:id', redirectTo: 'd/a/:id/e' },
            { path: '**', component: ComponentC },
        ], '/a;p1=1/1;p2=2', (t) => {
            expectTreeToBe(t, '/d/a;p1=1/1;p2=2/e');
        });
    });
    it('should handle preserve secondary routes', () => {
        checkRedirect([
            { path: 'a/:id', redirectTo: 'd/a/:id/e' },
            { path: 'c/d', component: ComponentA, outlet: 'aux' },
            { path: '**', component: ComponentC },
        ], '/a/1(aux:c/d)', (t) => {
            expectTreeToBe(t, '/d/a/1/e(aux:c/d)');
        });
    });
    it('should redirect secondary routes', () => {
        checkRedirect([
            { path: 'a/:id', component: ComponentA },
            { path: 'c/d', redirectTo: 'f/c/d/e', outlet: 'aux' },
            { path: '**', component: ComponentC, outlet: 'aux' },
        ], '/a/1(aux:c/d)', (t) => {
            expectTreeToBe(t, '/a/1(aux:f/c/d/e)');
        });
    });
    it('should use the configuration of the route redirected to', () => {
        checkRedirect([
            {
                path: 'a',
                component: ComponentA,
                children: [{ path: 'b', component: ComponentB }],
            },
            { path: 'c', redirectTo: 'a' },
        ], 'c/b', (t) => {
            expectTreeToBe(t, 'a/b');
        });
    });
    it('should support redirects with both main and aux', () => {
        checkRedirect([
            {
                path: 'a',
                children: [
                    { path: 'bb', component: ComponentB },
                    { path: 'b', redirectTo: 'bb' },
                    { path: 'cc', component: ComponentC, outlet: 'aux' },
                    { path: 'b', redirectTo: 'cc', outlet: 'aux' },
                ],
            },
        ], 'a/(b//aux:b)', (t) => {
            expectTreeToBe(t, 'a/(bb//aux:cc)');
        });
    });
    it('should support redirects with both main and aux (with a nested redirect)', () => {
        checkRedirect([
            {
                path: 'a',
                children: [
                    { path: 'bb', component: ComponentB },
                    { path: 'b', redirectTo: 'bb' },
                    {
                        path: 'cc',
                        component: ComponentC,
                        outlet: 'aux',
                        children: [
                            { path: 'dd', component: ComponentC },
                            { path: 'd', redirectTo: 'dd' },
                        ],
                    },
                    { path: 'b', redirectTo: 'cc/d', outlet: 'aux' },
                ],
            },
        ], 'a/(b//aux:b)', (t) => {
            expectTreeToBe(t, 'a/(bb//aux:cc/dd)');
        });
    });
    it('should redirect wild cards', () => {
        checkRedirect([
            { path: '404', component: ComponentA },
            { path: '**', redirectTo: '/404' },
        ], '/a/1(aux:c/d)', (t) => {
            expectTreeToBe(t, '/404');
        });
    });
    it('should throw an error on infinite absolute redirect', () => {
        (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), testing_1.TestBed.inject(router_config_loader_1.RouterConfigLoader), null, [{ path: '**', redirectTo: '/404' }], tree('/'), new url_tree_1.DefaultUrlSerializer()).subscribe({
            next: () => fail('expected infinite redirect error'),
            error: (e) => {
                expect(e.message).toMatch(/infinite redirect/);
            },
        });
    });
    it('should support absolute redirects', () => {
        checkRedirect([
            {
                path: 'a',
                component: ComponentA,
                children: [{ path: 'b/:id', redirectTo: '/absolute/:id?a=1&b=:b#f1' }],
            },
            { path: '**', component: ComponentC },
        ], '/a/b/1?b=2', (t) => {
            expectTreeToBe(t, '/absolute/1?a=1&b=2#f1');
        });
    });
    it('should not create injector for Route if the route does not match', () => {
        const routes = [
            { path: '', pathMatch: 'full', providers: [] },
            {
                path: 'a',
                component: ComponentA,
                children: [{ path: 'b', component: ComponentB }],
            },
        ];
        checkRedirect(routes, '/a/b', (t) => {
            expectTreeToBe(t, '/a/b');
            expect((0, config_1.getProvidersInjector)(routes[0])).not.toBeDefined();
        });
    });
    it('should create injectors for partial Route route matches', () => {
        const routes = [
            {
                path: 'a',
                component: ComponentA,
                providers: [],
            },
            { path: 'doesNotMatch', providers: [] },
        ];
        (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, routes, tree('a/b/c'), serializer).subscribe({
            next: () => {
                throw 'Should not be reached';
            },
            error: () => {
                // The 'a' segment matched, so we needed to create the injector for the `Route`
                expect((0, config_1.getProvidersInjector)(routes[0])).toBeDefined();
                // The second `Route` did not match at all so we should not create an injector for it
                expect((0, config_1.getProvidersInjector)(routes[1])).not.toBeDefined();
            },
        });
    });
    it('should support CanMatch providers on the route', () => {
        let CanMatchGuard = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CanMatchGuard = _classThis = class {
                canMatch() {
                    return true;
                }
            };
            __setFunctionName(_classThis, "CanMatchGuard");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CanMatchGuard = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CanMatchGuard = _classThis;
        })();
        const routes = [
            {
                path: 'a',
                component: ComponentA,
                canMatch: [CanMatchGuard],
                providers: [CanMatchGuard],
            },
            {
                path: 'a',
                component: ComponentA,
                providers: [],
            },
        ];
        (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, routes, tree('a'), serializer).subscribe({
            next: () => {
                // The 'a' segment matched, so we needed to create the injector for the `Route`
                expect((0, config_1.getProvidersInjector)(routes[0])).toBeDefined();
                // The second `Route` did not match because the first did so we should not create an
                // injector for it
                expect((0, config_1.getProvidersInjector)(routes[1])).not.toBeDefined();
            },
            error: () => {
                throw 'Should not be reached';
            },
        });
    });
    describe('lazy loading', () => {
        it('should load config on demand', () => {
            const loadedConfig = {
                routes: [{ path: 'b', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => {
                    if (injector !== testing_1.TestBed.inject(core_1.EnvironmentInjector))
                        throw 'Invalid Injector';
                    return (0, rxjs_1.of)(loadedConfig);
                },
            };
            const config = [
                { path: 'a', component: ComponentA, loadChildren: jasmine.createSpy('children') },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a/b'), serializer).forEach(({ tree }) => {
                expectTreeToBe(tree, '/a/b');
                expect((0, config_1.getLoadedRoutes)(config[0])).toBe(loadedConfig.routes);
            });
        });
        it('should handle the case when the loader errors', () => {
            const loader = {
                loadChildren: (p) => new rxjs_1.Observable((obs) => obs.error(new Error('Loading Error'))),
            };
            const config = [
                { path: 'a', component: ComponentA, loadChildren: jasmine.createSpy('children') },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a/b'), serializer).subscribe(() => { }, (e) => {
                expect(e.message).toEqual('Loading Error');
            });
        });
        it('should load when all canLoad guards return true', () => {
            const loadedConfig = {
                routes: [{ path: 'b', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            const config = [
                {
                    path: 'a',
                    component: ComponentA,
                    canLoad: [() => true, () => true],
                    loadChildren: jasmine.createSpy('children'),
                },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a/b'), serializer).forEach(({ tree: r }) => {
                expectTreeToBe(r, '/a/b');
            });
        });
        it('should not load when any canLoad guards return false', () => {
            const loadedConfig = {
                routes: [{ path: 'b', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            const config = [
                {
                    path: 'a',
                    component: ComponentA,
                    canLoad: [() => true, () => false],
                    loadChildren: jasmine.createSpy('children'),
                },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a/b'), serializer).subscribe(() => {
                throw 'Should not reach';
            }, (e) => {
                expect(e.message).toEqual(`NavigationCancelingError: Cannot load children because the guard of the route "path: 'a'" returned false`);
            });
        });
        it('should not load when any canLoad guards is rejected (promises)', () => {
            const loadedConfig = {
                routes: [{ path: 'b', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            const config = [
                {
                    path: 'a',
                    component: ComponentA,
                    canLoad: [() => Promise.resolve(true), () => Promise.reject('someError')],
                    loadChildren: jasmine.createSpy('children'),
                },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a/b'), serializer).subscribe(() => {
                throw 'Should not reach';
            }, (e) => {
                expect(e).toEqual('someError');
            });
        });
        it('should work with objects implementing the CanLoad interface', () => {
            const loadedConfig = {
                routes: [{ path: 'b', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            const config = [
                {
                    path: 'a',
                    component: ComponentA,
                    canLoad: [() => Promise.resolve(true)],
                    loadChildren: jasmine.createSpy('children'),
                },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a/b'), serializer).subscribe(({ tree: r }) => {
                expectTreeToBe(r, '/a/b');
            }, (e) => {
                throw 'Should not reach';
            });
        });
        it('should pass UrlSegments to functions implementing the canLoad guard interface', () => {
            const loadedConfig = {
                routes: [{ path: 'b', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            let passedUrlSegments;
            const guard = (route, urlSegments) => {
                passedUrlSegments = urlSegments;
                return true;
            };
            const config = [
                {
                    path: 'a',
                    component: ComponentA,
                    canLoad: [guard],
                    loadChildren: jasmine.createSpy('children'),
                },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a/b'), serializer).subscribe(({ tree: r }) => {
                expectTreeToBe(r, '/a/b');
                expect(passedUrlSegments.length).toBe(2);
                expect(passedUrlSegments[0].path).toBe('a');
                expect(passedUrlSegments[1].path).toBe('b');
            }, (e) => {
                throw 'Should not reach';
            });
        });
        it('should pass UrlSegments to objects implementing the canLoad guard interface', () => {
            const loadedConfig = {
                routes: [{ path: 'b', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            let passedUrlSegments;
            const config = [
                {
                    path: 'a',
                    component: ComponentA,
                    canLoad: [
                        (route, urlSegments) => {
                            passedUrlSegments = urlSegments;
                            return true;
                        },
                    ],
                    loadChildren: jasmine.createSpy('children'),
                },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a/b'), serializer).subscribe(({ tree: r }) => {
                expectTreeToBe(r, '/a/b');
                expect(passedUrlSegments.length).toBe(2);
                expect(passedUrlSegments[0].path).toBe('a');
                expect(passedUrlSegments[1].path).toBe('b');
            }, (e) => {
                throw 'Should not reach';
            });
        });
        it('should work with absolute redirects', () => {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            const config = [
                { path: '', pathMatch: 'full', redirectTo: '/a' },
                { path: 'a', loadChildren: jasmine.createSpy('children') },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree(''), serializer).forEach(({ tree: r }) => {
                expectTreeToBe(r, 'a');
                expect((0, config_1.getLoadedRoutes)(config[1])).toBe(loadedConfig.routes);
            });
        });
        it('should load the configuration only once', () => {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            let called = false;
            const loader = {
                loadChildren: (injector, p) => {
                    if (called)
                        throw new Error('Should not be called twice');
                    called = true;
                    return (0, rxjs_1.of)(loadedConfig);
                },
            };
            const config = [{ path: 'a', loadChildren: jasmine.createSpy('children') }];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a?k1'), serializer).subscribe((r) => { });
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a?k2'), serializer).subscribe(({ tree: r }) => {
                expectTreeToBe(r, 'a?k2');
                expect((0, config_1.getLoadedRoutes)(config[0])).toBe(loadedConfig.routes);
            }, (e) => {
                throw 'Should not reach';
            });
        });
        it('should load the configuration of a wildcard route', () => {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            const config = [{ path: '**', loadChildren: jasmine.createSpy('children') }];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('xyz'), serializer).forEach(({ tree: r }) => {
                expect((0, config_1.getLoadedRoutes)(config[0])).toBe(loadedConfig.routes);
            });
        });
        it('should not load the configuration of a wildcard route if there is a match', () => __awaiter(void 0, void 0, void 0, function* () {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = jasmine.createSpyObj('loader', ['loadChildren']);
            loader.loadChildren.and.returnValue((0, rxjs_1.of)(loadedConfig).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 0)).then(() => v))));
            const config = [
                { path: '', loadChildren: jasmine.createSpy('matchChildren') },
                { path: '**', loadChildren: jasmine.createSpy('children') },
            ];
            yield new Promise((resolve) => {
                (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree(''), serializer).forEach(({ tree: r }) => {
                    expect(loader.loadChildren.calls.count()).toEqual(1);
                    expect(loader.loadChildren.calls.first().args).not.toContain(jasmine.objectContaining({
                        loadChildren: jasmine.createSpy('children'),
                    }));
                    resolve();
                });
            });
        }));
        it('should load the configuration after a local redirect from a wildcard route', () => {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            const config = [
                { path: 'not-found', loadChildren: jasmine.createSpy('children') },
                { path: '**', redirectTo: 'not-found' },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('xyz'), serializer).forEach(({ tree: r }) => {
                expect((0, config_1.getLoadedRoutes)(config[0])).toBe(loadedConfig.routes);
            });
        });
        it('should load the configuration after an absolute redirect from a wildcard route', () => {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentB }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            const loader = {
                loadChildren: (injector, p) => (0, rxjs_1.of)(loadedConfig),
            };
            const config = [
                { path: 'not-found', loadChildren: jasmine.createSpy('children') },
                { path: '**', redirectTo: '/not-found' },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('xyz'), serializer).forEach(({ tree: r }) => {
                expect((0, config_1.getLoadedRoutes)(config[0])).toBe(loadedConfig.routes);
            });
        });
        it('should load all matching configurations of empty path, including an auxiliary outlets', () => __awaiter(void 0, void 0, void 0, function* () {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentA }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            let loadCalls = 0;
            let loaded = [];
            const loader = {
                loadChildren: (injector, p) => {
                    loadCalls++;
                    return (0, rxjs_1.of)(loadedConfig).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 10 * loadCalls)).then(() => v)), (0, operators_1.tap)(() => loaded.push(p.loadChildren.and.identity)));
                },
            };
            const config = [
                { path: '', loadChildren: jasmine.createSpy('root') },
                { path: '', loadChildren: jasmine.createSpy('aux'), outlet: 'popup' },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree(''), serializer).subscribe();
            expect(loadCalls).toBe(1);
            yield (0, helpers_1.timeout)(10);
            expect(loaded).toEqual(['root']);
            expect(loadCalls).toBe(2);
            yield (0, helpers_1.timeout)(20);
            expect(loaded).toEqual(['root', 'aux']);
        }));
        it('should not try to load any matching configuration if previous load completed', () => __awaiter(void 0, void 0, void 0, function* () {
            const loadedConfig = {
                routes: [{ path: 'a', component: ComponentA }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            let loadCalls = 0;
            let loaded = [];
            const loader = {
                loadChildren: (injector, p) => {
                    loadCalls++;
                    return (0, rxjs_1.of)(loadedConfig).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 10 * loadCalls)).then(() => v)), (0, operators_1.tap)(() => loaded.push(p.loadChildren.and.identity)));
                },
            };
            const config = [{ path: '**', loadChildren: jasmine.createSpy('children') }];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('xyz/a'), serializer).subscribe();
            expect(loadCalls).toBe(1);
            yield (0, helpers_1.timeout)(5);
            expect(loaded).toEqual([]);
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('xyz/b'), serializer).subscribe();
            yield (0, helpers_1.timeout)(5);
            expect(loaded).toEqual(['children']);
            expect(loadCalls).toBe(2);
            yield (0, helpers_1.timeout)(20);
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('xyz/c'), serializer).subscribe();
            yield (0, helpers_1.timeout)(5);
            expect(loadCalls).toBe(2);
            yield (0, helpers_1.timeout)(30);
        }));
        it('loads only the first match when two Routes with the same outlet have the same path', () => {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentA }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            let loadCalls = 0;
            let loaded = [];
            const loader = {
                loadChildren: (injector, p) => {
                    loadCalls++;
                    return (0, rxjs_1.of)(loadedConfig).pipe((0, operators_1.tap)(() => loaded.push(p.loadChildren.and.identity)));
                },
            };
            const config = [
                { path: 'a', loadChildren: jasmine.createSpy('first') },
                { path: 'a', loadChildren: jasmine.createSpy('second') },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('a'), serializer).subscribe();
            expect(loadCalls).toBe(1);
            expect(loaded).toEqual(['first']);
        });
        it('should load the configuration of empty root path if the entry is an aux outlet', () => __awaiter(void 0, void 0, void 0, function* () {
            const loadedConfig = {
                routes: [{ path: '', component: ComponentA }],
                injector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            };
            let loaded = [];
            const rootDelay = 10;
            const auxDelay = 1;
            const loader = {
                loadChildren: (injector, p) => {
                    const delayMs = p.loadChildren.and.identity === 'aux' ? auxDelay : rootDelay;
                    return (0, rxjs_1.of)(loadedConfig).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, delayMs)).then(() => v)), (0, operators_1.tap)(() => loaded.push(p.loadChildren.and.identity)));
                },
            };
            const config = [
                // Define aux route first so it matches before the primary outlet
                { path: 'modal', loadChildren: jasmine.createSpy('aux'), outlet: 'popup' },
                { path: '', loadChildren: jasmine.createSpy('root') },
            ];
            yield (0, rxjs_1.firstValueFrom)((0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), loader, null, config, tree('(popup:modal)'), serializer));
            expect(loaded.sort()).toEqual(['aux', 'root'].sort());
        }));
    });
    describe('empty paths', () => {
        it('redirect from an empty path should work (local redirect)', () => {
            checkRedirect([
                {
                    path: 'a',
                    component: ComponentA,
                    children: [{ path: 'b', component: ComponentB }],
                },
                { path: '', redirectTo: 'a' },
            ], 'b', (t) => {
                expectTreeToBe(t, 'a/b');
            });
        });
        it('redirect from an empty path should work (absolute redirect)', () => {
            checkRedirect([
                {
                    path: 'a',
                    component: ComponentA,
                    children: [{ path: 'b', component: ComponentB }],
                },
                { path: '', redirectTo: '/a/b' },
            ], '', (t) => {
                expectTreeToBe(t, 'a/b');
            });
        });
        it('should redirect empty path route only when terminal', () => {
            const config = [
                {
                    path: 'a',
                    component: ComponentA,
                    children: [{ path: 'b', component: ComponentB }],
                },
                { path: '', redirectTo: 'a', pathMatch: 'full' },
            ];
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, config, tree('b'), serializer).subscribe((_) => {
                throw 'Should not be reached';
            }, (e) => {
                expect(e.message).toContain("Cannot match any routes. URL Segment: 'b'");
            });
        });
        it('redirect from an empty path should work (nested case)', () => {
            checkRedirect([
                {
                    path: 'a',
                    component: ComponentA,
                    children: [
                        { path: 'b', component: ComponentB },
                        { path: '', redirectTo: 'b' },
                    ],
                },
                { path: '', redirectTo: 'a' },
            ], '', (t) => {
                expectTreeToBe(t, 'a/b');
            });
        });
        it('redirect to an empty path should work', () => {
            checkRedirect([
                { path: '', component: ComponentA, children: [{ path: 'b', component: ComponentB }] },
                { path: 'a', redirectTo: '' },
            ], 'a/b', (t) => {
                expectTreeToBe(t, 'b');
            });
        });
        describe('aux split is in the middle', () => {
            it('should create a new url segment (non-terminal)', () => {
                checkRedirect([
                    {
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ], 'a/b', (t) => {
                    expectTreeToBe(t, 'a/(b//aux:c)');
                });
            });
            it('should create a new url segment (terminal)', () => {
                checkRedirect([
                    {
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', pathMatch: 'full', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ], 'a/b', (t) => {
                    expectTreeToBe(t, 'a/b');
                });
            });
        });
        describe('aux split after empty path parent', () => {
            it('should work with non-empty auxiliary path', () => {
                checkRedirect([
                    {
                        path: '',
                        children: [
                            { path: 'a', component: ComponentA },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: 'b', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ], '(aux:b)', (t) => {
                    expectTreeToBe(t, '(aux:c)');
                });
            });
            it('should work with empty auxiliary path', () => {
                checkRedirect([
                    {
                        path: '',
                        children: [
                            { path: 'a', component: ComponentA },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ], '', (t) => {
                    expectTreeToBe(t, '(aux:c)');
                });
            });
            it('should work with empty auxiliary path and matching primary', () => {
                checkRedirect([
                    {
                        path: '',
                        children: [
                            { path: 'a', component: ComponentA },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ], 'a', (t) => {
                    expect(t.toString()).toEqual('/a(aux:c)');
                });
            });
            it('should work with aux outlets adjacent to and children of empty path at once', () => {
                checkRedirect([
                    {
                        path: '',
                        component: ComponentA,
                        children: [{ path: 'b', outlet: 'b', component: ComponentB }],
                    },
                    { path: 'c', outlet: 'c', component: ComponentC },
                ], '(b:b//c:c)', (t) => {
                    expect(t.toString()).toEqual('/(b:b//c:c)');
                });
            });
            it('should work with children outlets within two levels of empty parents', () => {
                checkRedirect([
                    {
                        path: '',
                        component: ComponentA,
                        children: [
                            {
                                path: '',
                                component: ComponentB,
                                children: [
                                    { path: 'd', outlet: 'aux', redirectTo: 'c' },
                                    { path: 'c', outlet: 'aux', component: ComponentC },
                                ],
                            },
                        ],
                    },
                ], '(aux:d)', (t) => {
                    expect(t.toString()).toEqual('/(aux:c)');
                });
            });
            it('does not persist a primary segment beyond the boundary of a named outlet match', () => {
                const config = [
                    {
                        path: '',
                        component: ComponentA,
                        outlet: 'aux',
                        children: [{ path: 'b', component: ComponentB, redirectTo: '/c' }],
                    },
                    { path: 'c', component: ComponentC },
                ];
                (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, config, tree('/b'), serializer).subscribe((_) => {
                    throw 'Should not be reached';
                }, (e) => {
                    expect(e.message).toContain(`Cannot match any routes. URL Segment: 'b'`);
                });
            });
        });
        describe('split at the end (no right child)', () => {
            it('should create a new child (non-terminal)', () => {
                checkRedirect([
                    {
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: '', redirectTo: 'b' },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ], 'a', (t) => {
                    expectTreeToBe(t, 'a/(b//aux:c)');
                });
            });
            it('should create a new child (terminal)', () => {
                checkRedirect([
                    {
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: '', redirectTo: 'b' },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', pathMatch: 'full', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ], 'a', (t) => {
                    expectTreeToBe(t, 'a/(b//aux:c)');
                });
            });
            it('should work only only primary outlet', () => {
                checkRedirect([
                    {
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: '', redirectTo: 'b' },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                        ],
                    },
                ], 'a/(aux:c)', (t) => {
                    expectTreeToBe(t, 'a/(b//aux:c)');
                });
            });
        });
        describe('split at the end (right child)', () => {
            it('should create a new child (non-terminal)', () => {
                checkRedirect([
                    {
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB, children: [{ path: 'd', component: ComponentB }] },
                            { path: '', redirectTo: 'b' },
                            {
                                path: 'c',
                                component: ComponentC,
                                outlet: 'aux',
                                children: [{ path: 'e', component: ComponentC }],
                            },
                            { path: '', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ], 'a/(d//aux:e)', (t) => {
                    expectTreeToBe(t, 'a/(b/d//aux:c/e)');
                });
            });
            it('should not create a new child (terminal)', () => {
                const config = [
                    {
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB, children: [{ path: 'd', component: ComponentB }] },
                            { path: '', redirectTo: 'b' },
                            {
                                path: 'c',
                                component: ComponentC,
                                outlet: 'aux',
                                children: [{ path: 'e', component: ComponentC }],
                            },
                            { path: '', pathMatch: 'full', redirectTo: 'c', outlet: 'aux' },
                        ],
                    },
                ];
                (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, config, tree('a/(d//aux:e)'), serializer).subscribe((_) => {
                    throw 'Should not be reached';
                }, (e) => {
                    expect(e.message).toContain("Cannot match any routes. URL Segment: 'a'");
                });
            });
        });
    });
    describe('empty URL leftovers', () => {
        it('should not error when no children matching and no url is left', () => {
            checkRedirect([{ path: 'a', component: ComponentA, children: [{ path: 'b', component: ComponentB }] }], '/a', (t) => {
                expectTreeToBe(t, 'a');
            });
        });
        it('should not error when no children matching and no url is left (aux routes)', () => {
            checkRedirect([
                {
                    path: 'a',
                    component: ComponentA,
                    children: [
                        { path: 'b', component: ComponentB },
                        { path: '', redirectTo: 'c', outlet: 'aux' },
                        { path: 'c', component: ComponentC, outlet: 'aux' },
                    ],
                },
            ], '/a', (t) => {
                expectTreeToBe(t, 'a/(aux:c)');
            });
        });
        it('should error when no children matching and some url is left', () => {
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, [{ path: 'a', component: ComponentA, children: [{ path: 'b', component: ComponentB }] }], tree('/a/c'), serializer).subscribe((_) => {
                throw 'Should not be reached';
            }, (e) => {
                expect(e.message).toContain("Cannot match any routes. URL Segment: 'a/c'");
            });
        });
    });
    describe('custom path matchers', () => {
        it('should use custom path matcher', () => {
            const matcher = (s, g, r) => {
                if (s[0].path === 'a') {
                    return { consumed: s.slice(0, 2), posParams: { id: s[1] } };
                }
                else {
                    return null;
                }
            };
            checkRedirect([
                {
                    matcher: matcher,
                    component: ComponentA,
                    children: [{ path: 'b', component: ComponentB }],
                },
            ], '/a/1/b', (t) => {
                expectTreeToBe(t, 'a/1/b');
            });
        });
    });
    describe('multiple matches with empty path named outlets', () => {
        it('should work with redirects when other outlet comes before the one being activated', () => {
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, [
                {
                    path: '',
                    children: [
                        { path: '', outlet: 'aux', redirectTo: 'b' },
                        { path: 'b', component: ComponentA, outlet: 'aux' },
                        { path: '', redirectTo: 'b', pathMatch: 'full' },
                        { path: 'b', component: ComponentB },
                    ],
                },
            ], tree(''), serializer).subscribe(({ tree }) => {
                expect(tree.toString()).toEqual('/b(aux:b)');
                expect(tree.root.children['primary'].toString()).toEqual('b');
                expect(tree.root.children['aux']).toBeDefined();
                expect(tree.root.children['aux'].toString()).toEqual('b');
            }, () => {
                fail('should not be reached');
            });
        });
        it('should prevent empty named outlets from appearing in leaves, resulting in odd tree url', () => {
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, [
                {
                    path: '',
                    children: [
                        { path: '', component: ComponentA, outlet: 'aux' },
                        { path: '', redirectTo: 'b', pathMatch: 'full' },
                        { path: 'b', component: ComponentB },
                    ],
                },
            ], tree(''), serializer).subscribe(({ tree }) => {
                expect(tree.toString()).toEqual('/b');
            }, () => {
                fail('should not be reached');
            });
        });
        it('should work when entry point is named outlet', () => {
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, [
                { path: '', component: ComponentA },
                { path: 'modal', component: ComponentB, outlet: 'popup' },
            ], tree('(popup:modal)'), serializer).subscribe(({ tree }) => {
                expect(tree.toString()).toEqual('/(popup:modal)');
            }, (e) => {
                fail('should not be reached' + e.message);
            });
        });
    });
    describe('redirecting to named outlets', () => {
        it('should work when using absolute redirects', () => {
            checkRedirect([
                { path: 'a/:id', redirectTo: '/b/:id(aux:c/:id)' },
                { path: 'b/:id', component: ComponentB },
                { path: 'c/:id', component: ComponentC, outlet: 'aux' },
            ], 'a/1;p=99', (t) => {
                expectTreeToBe(t, '/b/1;p=99(aux:c/1;p=99)');
            });
        });
        it('should work when using absolute redirects (wildcard)', () => {
            checkRedirect([
                { path: 'b', component: ComponentB },
                { path: 'c', component: ComponentC, outlet: 'aux' },
                { path: '**', redirectTo: '/b(aux:c)' },
            ], 'a/1', (t) => {
                expectTreeToBe(t, '/b(aux:c)');
            });
        });
        it('should throw when using non-absolute redirects', () => {
            (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, [{ path: 'a', redirectTo: 'b(aux:c)' }], tree('a'), serializer).subscribe(() => {
                throw new Error('should not be reached');
            }, (e) => {
                expect(e.message).toContain("Only absolute redirects can have named outlets. redirectTo: 'b(aux:c)'");
            });
        });
    });
    describe('can use redirectTo as a function', () => {
        it('with a simple function returning a string', () => {
            checkRedirect([
                { path: 'a/b', redirectTo: () => 'other' },
                { path: '**', component: ComponentC },
            ], '/a/b', (t) => {
                expectTreeToBe(t, '/other');
            });
        });
        it('would cause an infinite loop if redirect route is sub route of the path containing the redirectTo', () => {
            let redirects = 0;
            checkRedirect([
                {
                    path: 'a/b',
                    redirectTo: () => {
                        redirects++;
                        if (redirects < 10) {
                            throw new Error('infinite');
                        }
                        return new url_tree_1.UrlTree(new url_tree_1.UrlSegmentGroup([], {
                            'primary': new url_tree_1.UrlSegmentGroup([new url_tree_1.UrlSegment('a', {}), new url_tree_1.UrlSegment('b', {}), new url_tree_1.UrlSegment('d', {})], {}),
                        }));
                    },
                },
                { path: '**', component: ComponentC },
            ], '/a/b', (t) => {
                throw 'Should not reach';
            }, undefined, (e) => {
                expect(e).toBeDefined();
            });
        });
        it('with a simple function returning a UrlTree', () => {
            checkRedirect([
                {
                    path: 'a/b',
                    redirectTo: () => new url_tree_1.UrlTree(new url_tree_1.UrlSegmentGroup([], {
                        'primary': new url_tree_1.UrlSegmentGroup([new url_tree_1.UrlSegment('c', {}), new url_tree_1.UrlSegment('d', {}), new url_tree_1.UrlSegment('e', {})], {}),
                    })),
                },
                { path: '**', component: ComponentC },
            ], '/a/b', (t) => {
                expectTreeToBe(t, '/c/d/e');
            });
        });
        it('with a function using inject and returning a UrlTree', () => {
            checkRedirect([
                { path: 'a/b', redirectTo: () => (0, rxjs_1.of)((0, core_1.inject)(router_1.Router).parseUrl('/c/d/e')) },
                { path: '**', component: ComponentC },
            ], '/a/b', (t) => {
                expectTreeToBe(t, '/c/d/e');
            });
        });
        it('can access query params and redirect using them', () => {
            checkRedirect([
                {
                    path: 'a/b',
                    redirectTo: ({ queryParams }) => {
                        const tree = (0, core_1.inject)(router_1.Router).parseUrl('other');
                        tree.queryParams = queryParams;
                        return Promise.resolve(tree);
                    },
                },
                { path: '**', component: ComponentC },
            ], '/a/b?hl=en&q=hello', (t) => {
                expectTreeToBe(t, 'other?hl=en&q=hello');
            });
        });
        it('with a function using inject and returning a UrlTree with params', () => {
            checkRedirect([
                { path: 'a/b', redirectTo: () => (0, core_1.inject)(router_1.Router).parseUrl('/c;a1=1,a2=2/d/e?qp=123') },
                { path: '**', component: ComponentC },
            ], '/a/b', (t) => {
                expectTreeToBe(t, '/c;a1=1,a2=2/d/e?qp=123');
            });
        });
        it('receives positional params from the current route', () => {
            checkRedirect([
                {
                    path: ':id1/:id2',
                    redirectTo: ({ params }) => (0, core_1.inject)(router_1.Router).parseUrl(`/redirect?id1=${params['id1']}&id2=${params['id2']}`),
                },
                { path: '**', component: ComponentC },
            ], '/a/b', (t) => {
                expectTreeToBe(t, 'redirect?id1=a&id2=b');
            });
        });
        it('receives params from the parent route', () => {
            checkRedirect([
                {
                    path: ':id1/:id2',
                    children: [
                        {
                            path: 'c',
                            redirectTo: ({ params }) => (0, core_1.inject)(router_1.Router).parseUrl(`/redirect?id1=${params['id1']}&id2=${params['id2']}`),
                        },
                    ],
                },
                { path: '**', component: ComponentC },
            ], '/a/b/c', (t) => {
                expectTreeToBe(t, 'redirect?id1=a&id2=b');
            });
        });
        it('receives data from the parent componentless route', () => {
            checkRedirect([
                {
                    path: 'a/b',
                    data: { data1: 'hello', data2: 'world' },
                    children: [
                        {
                            path: 'c',
                            redirectTo: ({ data }) => `/redirect?id1=${data['data1']}&id2=${data['data2']}`,
                        },
                    ],
                },
                { path: '**', component: ComponentC },
            ], '/a/b/c', (t) => {
                expectTreeToBe(t, 'redirect?id1=hello&id2=world');
            });
        });
        it('does not receive data from the parent route with component (default paramsInheritanceStrategy is emptyOnly)', () => {
            checkRedirect([
                {
                    path: 'a/b',
                    data: { data1: 'hello', data2: 'world' },
                    component: ComponentA,
                    children: [
                        {
                            path: 'c',
                            redirectTo: ({ data }) => {
                                expect(data['data1']).toBeUndefined();
                                expect(data['data2']).toBeUndefined();
                                return `/redirect`;
                            },
                        },
                    ],
                },
                { path: '**', component: ComponentC },
            ], '/a/b/c', (t) => {
                expectTreeToBe(t, 'redirect');
            });
        });
        it('has access to inherited data from all ancestor routes with paramsInheritanceStrategy always', () => {
            checkRedirect([
                {
                    path: 'a',
                    data: { data1: 'hello' },
                    component: ComponentA,
                    children: [
                        {
                            path: 'b',
                            data: { data2: 'world' },
                            component: ComponentB,
                            children: [
                                {
                                    path: 'c',
                                    redirectTo: ({ data }) => {
                                        expect(data['data1']).toBe('hello');
                                        expect(data['data2']).toBe('world');
                                        return `/redirect`;
                                    },
                                },
                            ],
                        },
                    ],
                },
                { path: '**', component: ComponentC },
            ], '/a/b/c', (t) => {
                expectTreeToBe(t, 'redirect');
            }, 'always');
        });
        it('has access to path params', () => {
            checkRedirect([
                {
                    path: 'a',
                    children: [
                        {
                            path: 'b',
                            redirectTo: ({ params }) => `/redirect?k1=${params['k1']}&k2=${params['k2']}&k3=${params['k3']}&k4=${params['k4']}`,
                        },
                    ],
                },
                { path: '**', component: ComponentC },
            ], '/a;k1=v1;k2=v2/b;k3=v3;k4=v4', (t) => {
                expectTreeToBe(t, 'redirect?k1=v1&k2=v2&k3=v3&k4=v4');
            });
        });
    });
    // internal failure b/165719418
    it('does not fail with large configs', () => {
        const config = [];
        for (let i = 0; i < 400; i++) {
            config.push({ path: 'no_match', component: ComponentB });
        }
        config.push({ path: 'match', component: ComponentA });
        (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), null, null, config, tree('match'), serializer).forEach(({ tree: r }) => {
            expectTreeToBe(r, 'match');
        });
    });
});
function checkRedirect(config, url, callback, paramsInheritanceStrategy, errorCallback) {
    const redirectionTimeout = 10;
    (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), testing_1.TestBed.inject(router_config_loader_1.RouterConfigLoader), null, config, tree(url), new url_tree_1.DefaultUrlSerializer(), paramsInheritanceStrategy)
        .pipe((0, operators_1.timeout)(redirectionTimeout))
        .subscribe({
        next: (v) => callback(v.tree, v.state),
        error: (e) => {
            if (!errorCallback) {
                throw e;
            }
            errorCallback(e);
        },
    });
}
function tree(url) {
    return new url_tree_1.DefaultUrlSerializer().parse(url);
}
function expectTreeToBe(actual, expectedUrl) {
    const expected = tree(expectedUrl);
    const serializer = new url_tree_1.DefaultUrlSerializer();
    const error = `"${serializer.serialize(actual)}" is not equal to "${serializer.serialize(expected)}"`;
    compareSegments(actual.root, expected.root, error);
    expect(actual.queryParams).toEqual(expected.queryParams);
    expect(actual.fragment).toEqual(expected.fragment);
}
function compareSegments(actual, expected, error) {
    expect(actual).toBeDefined(error);
    expect((0, url_tree_1.equalSegments)(actual.segments, expected.segments)).toEqual(true, error);
    expect(Object.keys(actual.children).length).toEqual(Object.keys(expected.children).length, error);
    Object.keys(expected.children).forEach((key) => {
        compareSegments(actual.children[key], expected.children[key], error);
    });
}
class ComponentA {
}
class ComponentB {
}
class ComponentC {
}
