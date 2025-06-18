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
require("jasmine-ajax");
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const hero_1 = require("./fixtures/hero");
const hero_in_mem_data_override_service_1 = require("./fixtures/hero-in-mem-data-override-service");
const hero_in_mem_data_service_1 = require("./fixtures/hero-in-mem-data-service");
const hero_service_1 = require("./fixtures/hero-service");
const http_client_hero_service_1 = require("./fixtures/http-client-hero-service");
describe('HttpClient Backend Service', () => {
    const delay = 1; // some minimal simulated latency delay
    describe('raw Angular HttpClient', () => {
        let http;
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    http_1.HttpClientModule,
                    angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(hero_in_mem_data_service_1.HeroInMemDataService, { delay }),
                ],
            });
            http = testing_1.TestBed.inject(http_1.HttpClient);
        });
        it('can get heroes', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/heroes')
                .subscribe((heroes) => expect(heroes.length).toBeGreaterThan(0, 'should have heroes'), failRequest);
        }));
        it('GET should be a "cold" observable', (0, testing_1.waitForAsync)(() => {
            const httpBackend = testing_1.TestBed.inject(http_1.HttpBackend);
            const spy = spyOn(httpBackend, 'collectionHandler').and.callThrough();
            const get$ = http.get('api/heroes');
            // spy on `collectionHandler` should not be called before subscribe
            expect(spy).not.toHaveBeenCalled();
            get$.subscribe((heroes) => {
                expect(spy).toHaveBeenCalled();
                expect(heroes.length).toBeGreaterThan(0, 'should have heroes');
            }, failRequest);
        }));
        it('GET should wait until after delay to respond', (0, testing_1.waitForAsync)(() => {
            // to make test fail, set `delay=0` above
            let gotResponse = false;
            http.get('api/heroes').subscribe((heroes) => {
                gotResponse = true;
                expect(heroes.length).toBeGreaterThan(0, 'should have heroes');
            }, failRequest);
            expect(gotResponse).toBe(false, 'should delay before response');
        }));
        it('Should only initialize the db once', (0, testing_1.waitForAsync)(() => {
            const httpBackend = testing_1.TestBed.inject(http_1.HttpBackend);
            const spy = spyOn(httpBackend, 'resetDb').and.callThrough();
            // Simultaneous backend.handler calls
            // Only the first should initialize by calling `resetDb`
            // All should wait until the db is "ready"
            // then they share the same db instance.
            http.get('api/heroes').subscribe();
            http.get('api/heroes').subscribe();
            http.get('api/heroes').subscribe();
            http.get('api/heroes').subscribe();
            expect(spy.calls.count()).toBe(1);
        }));
        it('can get heroes (w/ a different base path)', (0, testing_1.waitForAsync)(() => {
            http.get('some-base-path/heroes').subscribe((heroes) => {
                expect(heroes.length).toBeGreaterThan(0, 'should have heroes');
            }, failRequest);
        }));
        it('should 404 when GET unknown collection (after delay)', (0, testing_1.waitForAsync)(() => {
            let gotError = false;
            const url = 'api/unknown-collection';
            http.get(url).subscribe(() => fail(`should not have found data for '${url}'`), (err) => {
                gotError = true;
                expect(err.status).toBe(404, 'should have 404 status');
            });
            expect(gotError).toBe(false, 'should not get error until after delay');
        }));
        it('should return the hero w/id=1 for GET app/heroes/1', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/heroes/1')
                .subscribe((hero) => expect(hero).toBeDefined('should find hero with id=1'), failRequest);
        }));
        // test where id is string that looks like a number
        it('should return the stringer w/id="10" for GET app/stringers/10', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/stringers/10')
                .subscribe((hero) => expect(hero).toBeDefined('should find string with id="10"'), failRequest);
        }));
        it('should return 1-item array for GET app/heroes/?id=1', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/heroes/?id=1')
                .subscribe((heroes) => expect(heroes.length).toBe(1, 'should find one hero w/id=1'), failRequest);
        }));
        it('should return 1-item array for GET app/heroes?id=1', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/heroes?id=1')
                .subscribe((heroes) => expect(heroes.length).toBe(1, 'should find one hero w/id=1'), failRequest);
        }));
        it('should return undefined for GET app/heroes?id=not-found-id', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/heroes?id=123456')
                .subscribe((heroes) => expect(heroes.length).toBe(0), failRequest);
        }));
        it('should return 404 for GET app/heroes/not-found-id', (0, testing_1.waitForAsync)(() => {
            const url = 'api/heroes/123456';
            http.get(url).subscribe(() => fail(`should not have found data for '${url}'`), (err) => expect(err.status).toBe(404, 'should have 404 status'));
        }));
        it('can generate the id when add a hero with no id', (0, testing_1.waitForAsync)(() => {
            const hero = new hero_1.Hero(undefined, 'SuperDooper');
            http.post('api/heroes', hero).subscribe((replyHero) => {
                expect(replyHero.id).toBeDefined('added hero should have an id');
                expect(replyHero).not.toBe(hero, 'reply hero should not be the request hero');
            }, failRequest);
        }));
        it('can get nobodies (empty collection)', (0, testing_1.waitForAsync)(() => {
            http.get('api/nobodies').subscribe((nobodies) => {
                expect(nobodies.length).toBe(0, 'should have no nobodies');
            }, failRequest);
        }));
        it('can add a nobody with an id to empty nobodies collection', (0, testing_1.waitForAsync)(() => {
            const id = 'g-u-i-d';
            http
                .post('api/nobodies', { id, name: 'Noman' })
                .pipe((0, operators_1.concatMap)(() => http.get('api/nobodies')))
                .subscribe((nobodies) => {
                expect(nobodies.length).toBe(1, 'should a nobody');
                expect(nobodies[0].name).toBe('Noman', 'should be "Noman"');
                expect(nobodies[0].id).toBe(id, 'should preserve the submitted, ' + id);
            }, failRequest);
        }));
        it('should fail when add a nobody without an id to empty nobodies collection', (0, testing_1.waitForAsync)(() => {
            http.post('api/nobodies', { name: 'Noman' }).subscribe(() => fail(`should not have been able to add 'Norman' to 'nobodies'`), (err) => {
                expect(err.status).toBe(422, 'should have 422 status');
                expect(err.body.error).toContain('id type is non-numeric');
            });
        }));
        describe('can reset the database', () => {
            it('to empty (object db)', (0, testing_1.waitForAsync)(() => resetDatabaseTest('object')));
            it('to empty (observable db)', (0, testing_1.waitForAsync)(() => resetDatabaseTest('observable')));
            it('to empty (promise db)', (0, testing_1.waitForAsync)(() => resetDatabaseTest('promise')));
            function resetDatabaseTest(returnType) {
                // Observable of the number of heroes and nobodies
                const sizes$ = (0, rxjs_1.zip)(http.get('api/heroes'), http.get('api/nobodies'), http.get('api/stringers')).pipe((0, operators_1.map)(([h, n, s]) => ({ heroes: h.length, nobodies: n.length, stringers: s.length })));
                // Add a nobody so that we have one
                http
                    .post('api/nobodies', { id: 42, name: 'Noman' })
                    .pipe(
                // Reset database with "clear" option
                (0, operators_1.concatMap)(() => http.post('commands/resetDb', { clear: true, returnType })), 
                // get the number of heroes and nobodies
                (0, operators_1.concatMap)(() => sizes$))
                    .subscribe((sizes) => {
                    expect(sizes.heroes).toBe(0, 'reset should have cleared the heroes');
                    expect(sizes.nobodies).toBe(0, 'reset should have cleared the nobodies');
                    expect(sizes.stringers).toBe(0, 'reset should have cleared the stringers');
                }, failRequest);
            }
        });
    });
    describe('raw Angular HttpClient w/ override service', () => {
        let http;
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    http_1.HttpClientModule,
                    angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(hero_in_mem_data_override_service_1.HeroInMemDataOverrideService, { delay }),
                ],
            });
            http = testing_1.TestBed.inject(http_1.HttpClient);
        });
        it('can get heroes', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/heroes')
                .subscribe((heroes) => expect(heroes.length).toBeGreaterThan(0, 'should have heroes'), failRequest);
        }));
        it('can translate `foo/heroes` to `heroes` via `parsedRequestUrl` override', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/foo/heroes')
                .subscribe((heroes) => expect(heroes.length).toBeGreaterThan(0, 'should have heroes'), failRequest);
        }));
        it('can get villains', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/villains')
                .subscribe((villains) => expect(villains.length).toBeGreaterThan(0, 'should have villains'), failRequest);
        }));
        it('should 404 when POST to villains', (0, testing_1.waitForAsync)(() => {
            const url = 'api/villains';
            http.post(url, { id: 42, name: 'Dr. Evil' }).subscribe(() => fail(`should not have POSTed data for '${url}'`), (err) => expect(err.status).toBe(404, 'should have 404 status'));
        }));
        it('should 404 when GET unknown collection', (0, testing_1.waitForAsync)(() => {
            const url = 'api/unknown-collection';
            http.get(url).subscribe(() => fail(`should not have found data for '${url}'`), (err) => expect(err.status).toBe(404, 'should have 404 status'));
        }));
        it('should use genId override to add new hero, "Maxinius"', (0, testing_1.waitForAsync)(() => {
            http
                .post('api/heroes', { name: 'Maxinius' })
                .pipe((0, operators_1.concatMap)(() => http.get('api/heroes?name=Maxi')))
                .subscribe((heroes) => {
                expect(heroes.length).toBe(1, 'should have found "Maxinius"');
                expect(heroes[0].name).toBe('Maxinius');
                expect(heroes[0].id).toBeGreaterThan(1000);
            }, failRequest);
        }));
        it('should use genId override guid generator for a new nobody without an id', (0, testing_1.waitForAsync)(() => {
            http
                .post('api/nobodies', { name: 'Noman' })
                .pipe((0, operators_1.concatMap)(() => http.get('api/nobodies')))
                .subscribe((nobodies) => {
                expect(nobodies.length).toBe(1, 'should a nobody');
                expect(nobodies[0].name).toBe('Noman', 'should be "Noman"');
                expect(typeof nobodies[0].id).toBe('string', 'should create a string (guid) id');
            }, failRequest);
        }));
        describe('can reset the database', () => {
            it('to empty (object db)', (0, testing_1.waitForAsync)(() => resetDatabaseTest('object')));
            it('to empty (observable db)', (0, testing_1.waitForAsync)(() => resetDatabaseTest('observable')));
            it('to empty (promise db)', (0, testing_1.waitForAsync)(() => resetDatabaseTest('promise')));
            function resetDatabaseTest(returnType) {
                // Observable of the number of heroes, nobodies and villains
                const sizes$ = (0, rxjs_1.zip)(http.get('api/heroes'), http.get('api/nobodies'), http.get('api/stringers'), http.get('api/villains')).pipe((0, operators_1.map)(([h, n, s, v]) => ({
                    heroes: h.length,
                    nobodies: n.length,
                    stringers: s.length,
                    villains: v.length,
                })));
                // Add a nobody so that we have one
                http
                    .post('api/nobodies', { id: 42, name: 'Noman' })
                    .pipe(
                // Reset database with "clear" option
                (0, operators_1.concatMap)(() => http.post('commands/resetDb', { clear: true, returnType })), 
                // count all the collections
                (0, operators_1.concatMap)(() => sizes$))
                    .subscribe((sizes) => {
                    expect(sizes.heroes).toBe(0, 'reset should have cleared the heroes');
                    expect(sizes.nobodies).toBe(0, 'reset should have cleared the nobodies');
                    expect(sizes.stringers).toBe(0, 'reset should have cleared the stringers');
                    expect(sizes.villains).toBeGreaterThan(0, 'reset should NOT clear villains');
                }, failRequest);
            }
        });
    });
    describe('HttpClient HeroService', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    http_1.HttpClientModule,
                    angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(hero_in_mem_data_service_1.HeroInMemDataService, { delay }),
                ],
                providers: [{ provide: hero_service_1.HeroService, useClass: http_client_hero_service_1.HttpClientHeroService }],
            });
        });
        describe('HeroService core', () => {
            let heroService;
            beforeEach(() => {
                heroService = testing_1.TestBed.inject(hero_service_1.HeroService);
            });
            it('can get heroes', (0, testing_1.waitForAsync)(() => {
                heroService.getHeroes().subscribe((heroes) => {
                    expect(heroes.length).toBeGreaterThan(0, 'should have heroes');
                }, failRequest);
            }));
            it('can get hero w/ id=1', (0, testing_1.waitForAsync)(() => {
                heroService.getHero(1).subscribe((hero) => {
                    expect(hero.name).toBe('Windstorm');
                }, () => fail('getHero failed'));
            }));
            it('should 404 when hero id not found', (0, testing_1.waitForAsync)(() => {
                const id = 123456;
                heroService.getHero(id).subscribe(() => fail(`should not have found hero for id='${id}'`), (err) => {
                    expect(err.status).toBe(404, 'should have 404 status');
                });
            }));
            it('can add a hero', (0, testing_1.waitForAsync)(() => {
                heroService
                    .addHero('FunkyBob')
                    .pipe((0, operators_1.tap)((hero) => expect(hero.name).toBe('FunkyBob')), 
                // Get the new hero by its generated id
                (0, operators_1.concatMap)((hero) => heroService.getHero(hero.id)))
                    .subscribe((hero) => {
                    expect(hero.name).toBe('FunkyBob');
                }, () => failRequest('re-fetch of new hero failed'));
            }), 10000);
            it('can delete a hero', (0, testing_1.waitForAsync)(() => {
                const id = 1;
                heroService.deleteHero(id).subscribe((_) => expect(_).toBeDefined(), failRequest);
            }));
            it('should allow delete of non-existent hero', (0, testing_1.waitForAsync)(() => {
                const id = 123456;
                heroService.deleteHero(id).subscribe((_) => expect(_).toBeDefined(), failRequest);
            }));
            it('can search for heroes by name containing "a"', (0, testing_1.waitForAsync)(() => {
                heroService.searchHeroes('a').subscribe((heroes) => {
                    expect(heroes.length).toBe(3, 'should find 3 heroes with letter "a"');
                }, failRequest);
            }));
            it('can update existing hero', (0, testing_1.waitForAsync)(() => {
                const id = 1;
                heroService
                    .getHero(id)
                    .pipe((0, operators_1.concatMap)((hero) => {
                    hero.name = 'Thunderstorm';
                    return heroService.updateHero(hero);
                }), (0, operators_1.concatMap)(() => heroService.getHero(id)))
                    .subscribe((hero) => expect(hero.name).toBe('Thunderstorm'), () => fail('re-fetch of updated hero failed'));
            }), 10000);
            it('should create new hero when try to update non-existent hero', (0, testing_1.waitForAsync)(() => {
                const falseHero = new hero_1.Hero(12321, 'DryMan');
                heroService
                    .updateHero(falseHero)
                    .subscribe((hero) => expect(hero.name).toBe(falseHero.name), failRequest);
            }));
        });
    });
    describe('HttpClient interceptor', () => {
        let http;
        let interceptors;
        let httpBackend;
        /**
         * Test interceptor adds a request header and a response header
         */
        let TestHeaderInterceptor = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestHeaderInterceptor = _classThis = class {
                intercept(req, next) {
                    const reqClone = req.clone({ setHeaders: { 'x-test-req': 'req-test-header' } });
                    return next.handle(reqClone).pipe((0, operators_1.map)((event) => {
                        if (event instanceof http_1.HttpResponse) {
                            event = event.clone({ headers: event.headers.set('x-test-res', 'res-test-header') });
                        }
                        return event;
                    }));
                }
            };
            __setFunctionName(_classThis, "TestHeaderInterceptor");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestHeaderInterceptor = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestHeaderInterceptor = _classThis;
        })();
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    http_1.HttpClientModule,
                    angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(hero_in_mem_data_service_1.HeroInMemDataService, { delay }),
                ],
                providers: [
                    // Add test interceptor just for this test suite
                    { provide: http_1.HTTP_INTERCEPTORS, useClass: TestHeaderInterceptor, multi: true },
                ],
            });
            http = testing_1.TestBed.inject(http_1.HttpClient);
            httpBackend = testing_1.TestBed.inject(http_1.HttpBackend);
            interceptors = testing_1.TestBed.inject(http_1.HTTP_INTERCEPTORS);
        });
        // sanity test
        it('TestingModule should provide the test interceptor', () => {
            const ti = interceptors.find((i) => i instanceof TestHeaderInterceptor);
            expect(ti).toBeDefined();
        });
        it('should have GET request header from test interceptor', (0, testing_1.waitForAsync)(() => {
            const handle = spyOn(httpBackend, 'handle').and.callThrough();
            http.get('api/heroes').subscribe((heroes) => {
                // HttpRequest is first arg of the first call to in-mem backend `handle`
                const req = handle.calls.argsFor(0)[0];
                const reqHeader = req.headers.get('x-test-req');
                expect(reqHeader).toBe('req-test-header');
                expect(heroes.length).toBeGreaterThan(0, 'should have heroes');
            }, failRequest);
        }));
        it('should have GET response header from test interceptor', (0, testing_1.waitForAsync)(() => {
            let gotResponse = false;
            const req = new http_1.HttpRequest('GET', 'api/heroes');
            http.request(req).subscribe((event) => {
                if (event.type === http_1.HttpEventType.Response) {
                    gotResponse = true;
                    const resHeader = event.headers.get('x-test-res');
                    expect(resHeader).toBe('res-test-header');
                    const heroes = event.body;
                    expect(heroes.length).toBeGreaterThan(0, 'should have heroes');
                }
            }, failRequest, () => expect(gotResponse).toBe(true, 'should have seen Response event'));
        }));
    });
    describe('HttpClient passThru', () => {
        let http;
        let httpBackend;
        let createPassThruBackend;
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    http_1.HttpClientModule,
                    angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(hero_in_mem_data_service_1.HeroInMemDataService, {
                        delay,
                        passThruUnknownUrl: true,
                    }),
                ],
            });
            http = testing_1.TestBed.inject(http_1.HttpClient);
            httpBackend = testing_1.TestBed.inject(http_1.HttpBackend);
            createPassThruBackend = spyOn(httpBackend, 'createPassThruBackend').and.callThrough();
        });
        beforeEach(() => {
            jasmine.Ajax.install();
        });
        afterEach(() => {
            jasmine.Ajax.uninstall();
        });
        it('can get heroes (no passthru)', (0, testing_1.waitForAsync)(() => {
            http.get('api/heroes').subscribe((heroes) => {
                expect(createPassThruBackend).not.toHaveBeenCalled();
                expect(heroes.length).toBeGreaterThan(0, 'should have heroes');
            }, failRequest);
        }));
        // `passthru` is NOT a collection in the data store
        // so requests for it should pass thru to the "real" server
        it('can GET passthru', (0, testing_1.waitForAsync)(() => {
            jasmine.Ajax.stubRequest('api/passthru').andReturn({
                'status': 200,
                'contentType': 'application/json',
                'response': JSON.stringify([{ id: 42, name: 'Dude' }]),
            });
            http.get('api/passthru').subscribe((passthru) => {
                expect(passthru.length).toBeGreaterThan(0, 'should have passthru data');
            }, failRequest);
        }));
        it('can ADD to passthru', (0, testing_1.waitForAsync)(() => {
            jasmine.Ajax.stubRequest('api/passthru').andReturn({
                'status': 200,
                'contentType': 'application/json',
                'response': JSON.stringify({ id: 42, name: 'Dude' }),
            });
            http.post('api/passthru', { name: 'Dude' }).subscribe((passthru) => {
                expect(passthru).toBeDefined('should have passthru data');
                expect(passthru.id).toBe(42, 'passthru object should have id 42');
            }, failRequest);
        }));
    });
    describe('Http dataEncapsulation = true', () => {
        let http;
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    http_1.HttpClientModule,
                    angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(hero_in_mem_data_service_1.HeroInMemDataService, {
                        delay,
                        dataEncapsulation: true,
                    }),
                ],
            });
            http = testing_1.TestBed.inject(http_1.HttpClient);
        });
        it('can get heroes (encapsulated)', (0, testing_1.waitForAsync)(() => {
            http
                .get('api/heroes')
                .pipe((0, operators_1.map)((data) => data.data))
                .subscribe((heroes) => expect(heroes.length).toBeGreaterThan(0, 'should have data.heroes'), failRequest);
        }));
    });
    describe('when using the FetchBackend', () => {
        it('should be the an InMemory Service', () => {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, http_1.provideHttpClient)((0, http_1.withFetch)()),
                    (0, core_1.importProvidersFrom)(angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(hero_in_mem_data_service_1.HeroInMemDataService, { delay })),
                    { provide: hero_service_1.HeroService, useClass: http_client_hero_service_1.HttpClientHeroService },
                ],
            });
            expect(testing_1.TestBed.inject(http_1.HttpBackend)).toBeInstanceOf(angular_in_memory_web_api_1.HttpClientBackendService);
        });
        it('should be a FetchBackend', () => {
            // In this test, providers order matters
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, core_1.importProvidersFrom)(angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(hero_in_mem_data_service_1.HeroInMemDataService, { delay })),
                    (0, http_1.provideHttpClient)((0, http_1.withFetch)()),
                    { provide: hero_service_1.HeroService, useClass: http_client_hero_service_1.HttpClientHeroService },
                ],
            });
            expect(testing_1.TestBed.inject(http_1.HttpBackend)).toBeInstanceOf(http_1.FetchBackend);
        });
    });
});
/**
 * Fail a Jasmine test such that it displays the error object,
 * typically passed in the error path of an Observable.subscribe()
 */
function failRequest(err) {
    fail(JSON.stringify(err));
}
