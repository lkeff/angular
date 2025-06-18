"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.sonpCallbackContext
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const index_2 = require("../index");
const testing_1 = require("../testing");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
const interceptor_1 = require("../src/interceptor");
const provider_1 = require("../src/provider");
describe('without provideHttpClientTesting', () => {
    it('should contribute to stability', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_2.TestBed.configureTestingModule({
            providers: [
                (0, provider_1.provideHttpClient)((0, provider_1.withInterceptors)([() => (0, rxjs_1.from)(Promise.resolve(new index_2.HttpResponse()))])),
            ],
        });
        let stable = false;
        const appRef = testing_2.TestBed.inject(core_1.ApplicationRef);
        testing_2.TestBed.inject(core_1.ApplicationRef).isStable.subscribe((v) => {
            stable = v;
        });
        expect(stable).toBe(true);
        testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
        expect(stable).toBe(false);
        yield expectAsync(appRef.whenStable()).toBeResolved();
    }));
    it('can use an ErrorHandler that injects HttpClient', () => {
        // This test ensures there is no circular dependency:
        // possible loops are:
        // INTERNAL_APPLICATION_ERROR_HANDLER -> ErrorHandler -> HttpClient -> PendingTasks -> ChangeDetectionScheduler -> INTERNAL_APPLICATION_ERROR_HANDLER
        testing_2.TestBed.configureTestingModule({
            providers: [
                (0, provider_1.provideHttpClient)((0, provider_1.withInterceptors)([() => (0, rxjs_1.from)(Promise.resolve(new index_2.HttpResponse()))])),
                {
                    provide: core_1.ErrorHandler,
                    useClass: class extends core_1.ErrorHandler {
                        constructor() {
                            super(...arguments);
                            this.client = (0, core_1.inject)(index_2.HttpClient);
                        }
                        handleError(error) { }
                    },
                },
            ],
        });
        expect(() => testing_2.TestBed.inject(core_1.ApplicationRef)).not.toThrow();
    });
});
describe('provideHttpClient', () => {
    beforeEach(() => {
        setCookie('');
        testing_2.TestBed.resetTestingModule();
    });
    afterEach(() => {
        let controller;
        try {
            controller = testing_2.TestBed.inject(testing_1.HttpTestingController);
        }
        catch (err) {
            // A failure here means that TestBed wasn't successfully configured. Some tests intentionally
            // test configuration errors and therefore exit without setting up TestBed for HTTP, so just
            // exit here without performing verification on the `HttpTestingController` in that case.
            return;
        }
        controller.verify();
    });
    it('should configure HttpClient', () => {
        testing_2.TestBed.configureTestingModule({
            providers: [(0, provider_1.provideHttpClient)(), (0, testing_1.provideHttpClientTesting)()],
        });
        testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
        testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test').flush('');
    });
    it('should not contribute to stability', () => {
        testing_2.TestBed.configureTestingModule({
            providers: [(0, provider_1.provideHttpClient)(), (0, testing_1.provideHttpClientTesting)()],
        });
        let stable = false;
        testing_2.TestBed.inject(core_1.ApplicationRef).isStable.subscribe((v) => {
            stable = v;
        });
        expect(stable).toBe(true);
        testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
        expect(stable).toBe(true);
        testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test').flush('');
        expect(stable).toBe(true);
    });
    it('should not use legacy interceptors by default', () => {
        testing_2.TestBed.configureTestingModule({
            providers: [
                (0, provider_1.provideHttpClient)(),
                provideLegacyInterceptor('legacy'),
                (0, testing_1.provideHttpClientTesting)(),
            ],
        });
        testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
        const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
        expect(req.request.headers.has('X-Tag')).toBeFalse();
        req.flush('');
    });
    it('withInterceptorsFromDi() should enable legacy interceptors', () => {
        testing_2.TestBed.configureTestingModule({
            providers: [
                (0, provider_1.provideHttpClient)((0, provider_1.withInterceptorsFromDi)()),
                provideLegacyInterceptor('alpha'),
                provideLegacyInterceptor('beta'),
                (0, testing_1.provideHttpClientTesting)(),
            ],
        });
        testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
        const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
        expect(req.request.headers.get('X-Tag')).toEqual('alpha,beta');
        req.flush('');
    });
    describe('interceptor functions', () => {
        it('should allow configuring interceptors', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withInterceptors)([
                        makeLiteralTagInterceptorFn('alpha'),
                        makeLiteralTagInterceptorFn('beta'),
                    ])),
                    (0, testing_1.provideHttpClientTesting)(),
                ],
            });
            testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.get('X-Tag')).toEqual('alpha,beta');
            req.flush('');
        });
        it('should accept multiple separate interceptor configs', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withInterceptors)([makeLiteralTagInterceptorFn('alpha')]), (0, provider_1.withInterceptors)([makeLiteralTagInterceptorFn('beta')])),
                    (0, testing_1.provideHttpClientTesting)(),
                ],
            });
            testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.get('X-Tag')).toEqual('alpha,beta');
            req.flush('');
        });
        it('should allow injection from an interceptor context', () => {
            const ALPHA = new core_1.InjectionToken('alpha', {
                providedIn: 'root',
                factory: () => 'alpha',
            });
            const BETA = new core_1.InjectionToken('beta', { providedIn: 'root', factory: () => 'beta' });
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withInterceptors)([makeTokenTagInterceptorFn(ALPHA), makeTokenTagInterceptorFn(BETA)])),
                    (0, testing_1.provideHttpClientTesting)(),
                ],
            });
            testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.get('X-Tag')).toEqual('alpha,beta');
            req.flush('');
        });
        it('should allow combination with legacy interceptors, before the legacy stack', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withInterceptors)([makeLiteralTagInterceptorFn('functional')]), (0, provider_1.withInterceptorsFromDi)()),
                    (0, testing_1.provideHttpClientTesting)(),
                    provideLegacyInterceptor('legacy'),
                ],
            });
            testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.get('X-Tag')).toEqual('functional,legacy');
            req.flush('');
        });
        it('should allow combination with legacy interceptors, after the legacy stack', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withInterceptorsFromDi)(), (0, provider_1.withInterceptors)([makeLiteralTagInterceptorFn('functional')])),
                    (0, testing_1.provideHttpClientTesting)(),
                    provideLegacyInterceptor('legacy'),
                ],
            });
            testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.get('X-Tag')).toEqual('legacy,functional');
            req.flush('');
        });
    });
    describe('xsrf protection', () => {
        it('should enable xsrf protection by default', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)(),
                    (0, testing_1.provideHttpClientTesting)(),
                    { provide: core_1.PLATFORM_ID, useValue: 'test' },
                ],
            });
            setXsrfToken('abcdefg');
            testing_2.TestBed.inject(index_2.HttpClient).post('/test', '', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.get('X-XSRF-TOKEN')).toEqual('abcdefg');
            req.flush('');
        });
        it('withXsrfConfiguration() should allow customization of xsrf config', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withXsrfConfiguration)({
                        cookieName: 'XSRF-CUSTOM-COOKIE',
                        headerName: 'X-Custom-Xsrf-Header',
                    })),
                    (0, testing_1.provideHttpClientTesting)(),
                    { provide: core_1.PLATFORM_ID, useValue: 'test' },
                ],
            });
            setCookie('XSRF-CUSTOM-COOKIE=abcdefg');
            testing_2.TestBed.inject(index_2.HttpClient).post('/test', '', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.get('X-Custom-Xsrf-Header')).toEqual('abcdefg');
            req.flush('');
        });
        it('withNoXsrfProtection() should disable xsrf protection', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withNoXsrfProtection)()),
                    (0, testing_1.provideHttpClientTesting)(),
                    { provide: core_1.PLATFORM_ID, useValue: 'test' },
                ],
            });
            setXsrfToken('abcdefg');
            testing_2.TestBed.inject(index_2.HttpClient).post('/test', '', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.has('X-Custom-Xsrf-Header')).toBeFalse();
            req.flush('');
        });
        it('should error if withXsrfConfiguration() and withNoXsrfProtection() are combined', () => {
            expect(() => {
                testing_2.TestBed.configureTestingModule({
                    providers: [
                        (0, provider_1.provideHttpClient)((0, provider_1.withNoXsrfProtection)(), (0, provider_1.withXsrfConfiguration)({})),
                        (0, testing_1.provideHttpClientTesting)(),
                        { provide: core_1.PLATFORM_ID, useValue: 'test' },
                    ],
                });
            }).toThrow();
        });
    });
    describe('JSONP support', () => {
        it('should not be enabled by default', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [(0, provider_1.provideHttpClient)(), (0, testing_1.provideHttpClientTesting)()],
            });
            testing_2.TestBed.inject(index_2.HttpClient).jsonp('/test', 'callback').subscribe();
            // Because no JSONP interceptor should be registered, this request should go to the testing
            // backend.
            testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test?callback=JSONP_CALLBACK').flush('');
        });
        it('should be enabled when using withJsonpSupport()', () => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withJsonpSupport)()),
                    (0, testing_1.provideHttpClientTesting)(),
                    FAKE_JSONP_BACKEND_PROVIDER,
                ],
            });
            testing_2.TestBed.inject(index_2.HttpClient).jsonp('/test', 'callback').subscribe();
            testing_2.TestBed.inject(testing_1.HttpTestingController).expectNone('/test?callback=JSONP_CALLBACK');
        });
    });
    describe('withRequestsMadeViaParent()', () => {
        for (const backend of ['fetch', 'xhr']) {
            describe(`given '${backend}' backend`, () => {
                const commonHttpFeatures = [];
                if (backend === 'fetch') {
                    commonHttpFeatures.push((0, provider_1.withFetch)());
                }
                it('should have independent HTTP setups if not explicitly specified', () => __awaiter(void 0, void 0, void 0, function* () {
                    testing_2.TestBed.configureTestingModule({
                        providers: [(0, provider_1.provideHttpClient)(...commonHttpFeatures), (0, testing_1.provideHttpClientTesting)()],
                    });
                    const child = (0, core_1.createEnvironmentInjector)([
                        (0, provider_1.provideHttpClient)(),
                        {
                            provide: index_1.XhrFactory,
                            useValue: {
                                build: () => {
                                    throw new Error('Request reached the "backend".');
                                },
                            },
                        },
                    ], testing_2.TestBed.inject(core_1.EnvironmentInjector));
                    // Because `child` is an entirely independent HTTP context, it is not connected to the
                    // HTTP testing backend from the parent injector, and requests attempted via the child's
                    // `HttpClient` will fail.
                    yield expectAsync(child.get(index_2.HttpClient).get('/test').toPromise()).toBeRejected();
                }));
                it('should connect child to parent configuration if specified', () => {
                    testing_2.TestBed.configureTestingModule({
                        providers: [(0, provider_1.provideHttpClient)(...commonHttpFeatures), (0, testing_1.provideHttpClientTesting)()],
                    });
                    const child = (0, core_1.createEnvironmentInjector)([(0, provider_1.provideHttpClient)((0, provider_1.withRequestsMadeViaParent)())], testing_2.TestBed.inject(core_1.EnvironmentInjector));
                    // `child` is now to the parent HTTP context and therefore the testing backend, and so a
                    // request made via its `HttpClient` can be made.
                    child.get(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
                    const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
                    req.flush('');
                });
                it('should include interceptors from both parent and child contexts', () => {
                    testing_2.TestBed.configureTestingModule({
                        providers: [
                            (0, provider_1.provideHttpClient)(...commonHttpFeatures, (0, provider_1.withInterceptors)([makeLiteralTagInterceptorFn('parent')])),
                            (0, testing_1.provideHttpClientTesting)(),
                        ],
                    });
                    const child = (0, core_1.createEnvironmentInjector)([
                        (0, provider_1.provideHttpClient)((0, provider_1.withRequestsMadeViaParent)(), (0, provider_1.withInterceptors)([makeLiteralTagInterceptorFn('child')])),
                    ], testing_2.TestBed.inject(core_1.EnvironmentInjector));
                    child.get(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
                    const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
                    expect(req.request.headers.get('X-Tag')).toEqual('child,parent');
                    req.flush('');
                });
                it('should be able to connect to a legacy-provided HttpClient context', () => {
                    testing_2.TestBed.configureTestingModule({
                        imports: [testing_1.HttpClientTestingModule],
                        providers: [provideLegacyInterceptor('parent')],
                    });
                    const child = (0, core_1.createEnvironmentInjector)([
                        (0, provider_1.provideHttpClient)(...commonHttpFeatures, (0, provider_1.withRequestsMadeViaParent)(), (0, provider_1.withInterceptors)([makeLiteralTagInterceptorFn('child')])),
                    ], testing_2.TestBed.inject(core_1.EnvironmentInjector));
                    child.get(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
                    const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
                    expect(req.request.headers.get('X-Tag')).toEqual('child,parent');
                    req.flush('');
                });
            });
        }
    });
    describe('compatibility with Http NgModules', () => {
        it('should function when configuring HTTP both ways in the same injector', () => {
            testing_2.TestBed.configureTestingModule({
                imports: [index_2.HttpClientModule],
                providers: [
                    (0, provider_1.provideHttpClient)(),
                    // Interceptor support from HttpClientModule should be functional
                    provideLegacyInterceptor('alpha'),
                    provideLegacyInterceptor('beta'),
                    (0, testing_1.provideHttpClientTesting)(),
                ],
            });
            testing_2.TestBed.inject(index_2.HttpClient).get('/test', { responseType: 'text' }).subscribe();
            const req = testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne('/test');
            expect(req.request.headers.get('X-Tag')).toEqual('alpha,beta');
            req.flush('');
        });
    });
    describe('fetch support', () => {
        it('withFetch', () => {
            (0, interceptor_1.resetFetchBackendWarningFlag)();
            const consoleWarnSpy = spyOn(console, 'warn');
            testing_2.TestBed.resetTestingModule();
            testing_2.TestBed.configureTestingModule({
                providers: [
                    // Setting this flag to verify that there are no
                    // `console.warn` produced for cases when `fetch`
                    // is enabled and we are running in a browser.
                    { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                    (0, provider_1.provideHttpClient)((0, provider_1.withFetch)()),
                ],
            });
            const fetchBackend = testing_2.TestBed.inject(index_2.HttpBackend);
            expect(fetchBackend).toBeInstanceOf(index_2.FetchBackend);
            // Make sure there are no warnings produced.
            expect(consoleWarnSpy.calls.count()).toBe(0);
        });
        it(`'withFetch' should not override provided backend`, () => {
            class CustomBackendExtends extends index_2.HttpXhrBackend {
            }
            testing_2.TestBed.resetTestingModule();
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, provider_1.provideHttpClient)((0, provider_1.withFetch)()),
                    { provide: index_2.HttpBackend, useClass: CustomBackendExtends },
                ],
            });
            const backend = testing_2.TestBed.inject(index_2.HttpBackend);
            expect(backend).toBeInstanceOf(CustomBackendExtends);
        });
        it(`fetch API should be used in child when 'withFetch' was used in parent injector`, () => {
            testing_2.TestBed.configureTestingModule({
                providers: [(0, provider_1.provideHttpClient)((0, provider_1.withFetch)()), (0, testing_1.provideHttpClientTesting)()],
            });
            const child = (0, core_1.createEnvironmentInjector)([(0, provider_1.provideHttpClient)()], testing_2.TestBed.inject(core_1.EnvironmentInjector));
            const backend = child.get(index_2.HttpBackend);
            expect(backend).toBeInstanceOf(index_2.FetchBackend);
        });
        it('should not warn if fetch is not configured when running in a browser', () => {
            (0, interceptor_1.resetFetchBackendWarningFlag)();
            const consoleWarnSpy = spyOn(console, 'warn');
            testing_2.TestBed.resetTestingModule();
            testing_2.TestBed.configureTestingModule({
                providers: [
                    // Setting this flag to verify that there are no
                    // `console.warn` produced for cases when `fetch`
                    // is enabled and we are running in a browser.
                    { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                    (0, provider_1.provideHttpClient)(),
                ],
            });
            testing_2.TestBed.inject(index_2.HttpHandler);
            // Make sure there are no warnings produced.
            expect(consoleWarnSpy.calls.count()).toBe(0);
        });
        it('should warn during SSR if fetch is not configured', () => {
            (0, interceptor_1.resetFetchBackendWarningFlag)();
            const consoleWarnSpy = spyOn(console, 'warn');
            testing_2.TestBed.resetTestingModule();
            testing_2.TestBed.configureTestingModule({
                providers: [
                    // Setting this flag to verify that there is a
                    // `console.warn` produced in case `fetch` is not
                    // enabled while running code on the server.
                    { provide: core_1.PLATFORM_ID, useValue: 'server' },
                    (0, provider_1.provideHttpClient)(),
                ],
            });
            testing_2.TestBed.inject(index_2.HttpHandler);
            expect(consoleWarnSpy.calls.count()).toBe(1);
            expect(consoleWarnSpy.calls.argsFor(0)[0]).toContain('NG02801: Angular detected that `HttpClient` is not configured to use `fetch` APIs.');
        });
    });
});
function setXsrfToken(token) {
    setCookie(`XSRF-TOKEN=${token}`);
}
function setCookie(cookie) {
    Object.defineProperty(testing_2.TestBed.inject(index_1.DOCUMENT), 'cookie', {
        get: () => cookie,
        configurable: true,
    });
}
function provideLegacyInterceptor(tag) {
    class LegacyTagInterceptor {
        intercept(req, next) {
            return next.handle(addTagToRequest(req, tag));
        }
    }
    const token = new core_1.InjectionToken(`LegacyTagInterceptor[${tag}]`, {
        providedIn: 'root',
        factory: () => new LegacyTagInterceptor(),
    });
    return {
        provide: index_2.HTTP_INTERCEPTORS,
        useExisting: token,
        multi: true,
    };
}
function makeLiteralTagInterceptorFn(tag) {
    return (req, next) => next(addTagToRequest(req, tag));
}
function makeTokenTagInterceptorFn(tag) {
    return (req, next) => next(addTagToRequest(req, (0, core_1.inject)(tag)));
}
function addTagToRequest(req, tag) {
    var _a;
    const prevTagHeader = (_a = req.headers.get('X-Tag')) !== null && _a !== void 0 ? _a : '';
    const tagHeader = prevTagHeader.length > 0 ? prevTagHeader + ',' + tag : tag;
    return req.clone({
        setHeaders: {
            'X-Tag': tagHeader,
        },
    });
}
const FAKE_JSONP_BACKEND_PROVIDER = {
    provide: index_2.JsonpClientBackend,
    useValue: {
        handle: (req) => rxjs_1.EMPTY,
    },
};
