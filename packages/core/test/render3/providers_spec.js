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
const testing_1 = require("../../testing");
const core_1 = require("../../src/core");
const forward_ref_1 = require("../../src/di/forward_ref");
const index_1 = require("../../src/render3/index");
const discovery_utils_1 = require("../../src/render3/util/discovery_utils");
const providers_helper_1 = require("./providers_helper");
describe('providers', () => {
    describe('should support all types of Provider:', () => {
        class Greeter {
        }
        const GREETER = new core_1.InjectionToken('greeter');
        class GreeterClass {
            constructor() {
                this.greet = 'Class';
                this.hasBeenCleanedUp = false;
            }
            ngOnDestroy() {
                this.hasBeenCleanedUp = true;
            }
        }
        class GreeterDeps {
            constructor(greet) {
                this.greet = greet;
            }
        }
        class GreeterBuiltInDeps {
            constructor(message, elementRef) {
                this.message = message;
                this.elementRef = elementRef;
                this.greet = this.message + ' from ' + this.elementRef.nativeElement.tagName;
            }
        }
        class GreeterProvider {
            provide() {
                return 'Provided';
            }
        }
        let GreeterInj = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var GreeterInj = _classThis = class {
                constructor(provider) {
                    this.provider = provider;
                    this.greet = this.provider.provide();
                }
            };
            __setFunctionName(_classThis, "GreeterInj");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                GreeterInj = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            })();
            _classThis.ɵprov = (0, core_1.ɵɵdefineInjectable)({
                token: GreeterInj,
                factory: () => new GreeterInj((0, core_1.ɵɵinject)(GreeterProvider)),
            });
            (() => {
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return GreeterInj = _classThis;
        })();
        it('TypeProvider', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [GreeterClass],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GreeterClass).greet).toEqual('Class');
                    },
                },
            });
        });
        it('ValueProvider', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [{ provide: GREETER, useValue: { greet: 'Value' } }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Value');
                    },
                },
            });
        });
        it('ClassProvider', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [{ provide: GREETER, useClass: GreeterClass }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Class');
                    },
                },
            });
        });
        it('ExistingProvider', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [GreeterClass, { provide: GREETER, useExisting: GreeterClass }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Class');
                    },
                },
            });
        });
        it('FactoryProvider', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [GreeterClass, { provide: GREETER, useFactory: () => new GreeterClass() }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Class');
                    },
                },
            });
        });
        const MESSAGE = new core_1.InjectionToken('message');
        it('ClassProvider with deps', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [
                        { provide: MESSAGE, useValue: 'Message' },
                        { provide: GREETER, useClass: GreeterDeps, deps: [MESSAGE] },
                    ],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Message');
                    },
                },
            });
        });
        it('ClassProvider with built-in deps', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [
                        { provide: MESSAGE, useValue: 'Message' },
                        { provide: GREETER, useClass: GreeterBuiltInDeps, deps: [MESSAGE, core_1.ElementRef] },
                    ],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Message from PARENT');
                    },
                },
            });
        });
        it('FactoryProvider with deps', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [
                        { provide: MESSAGE, useValue: 'Message' },
                        { provide: GREETER, useFactory: (msg) => new GreeterDeps(msg), deps: [MESSAGE] },
                    ],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Message');
                    },
                },
            });
        });
        it('FactoryProvider with built-in deps', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [
                        { provide: MESSAGE, useValue: 'Message' },
                        {
                            provide: GREETER,
                            useFactory: (msg, elementRef) => new GreeterBuiltInDeps(msg, elementRef),
                            deps: [MESSAGE, core_1.ElementRef],
                        },
                    ],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Message from PARENT');
                    },
                },
            });
        });
        it('ClassProvider with injectable', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [GreeterProvider, { provide: GREETER, useClass: GreeterInj }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(GREETER).greet).toEqual('Provided');
                    },
                },
            });
        });
        describe('forwardRef', () => {
            it('forwardRef resolves later', (done) => {
                setTimeout(() => {
                    (0, providers_helper_1.expectProvidersScenario)({
                        parent: {
                            providers: [(0, forward_ref_1.forwardRef)(() => ForLater)],
                            componentAssertion: () => {
                                expect((0, core_1.inject)(ForLater) instanceof ForLater).toBeTruthy();
                            },
                        },
                    });
                    done();
                }, 0);
            });
            class ForLater {
            }
            // The following test that forwardRefs are called, so we don't search for an anon fn
            it('ValueProvider wrapped in forwardRef', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [
                            {
                                provide: GREETER,
                                useValue: (0, forward_ref_1.forwardRef)(() => {
                                    return { greet: 'Value' };
                                }),
                            },
                        ],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(GREETER).greet).toEqual('Value');
                        },
                    },
                });
            });
            it('ClassProvider wrapped in forwardRef', () => {
                let greeterInstance = null;
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: GREETER, useClass: (0, forward_ref_1.forwardRef)(() => GreeterClass) }],
                        componentAssertion: () => {
                            greeterInstance = (0, core_1.inject)(GREETER);
                            expect(greeterInstance.greet).toEqual('Class');
                        },
                    },
                });
                expect(greeterInstance).not.toBeNull();
                expect(greeterInstance.hasBeenCleanedUp).toBe(true);
            });
            it('ExistingProvider wrapped in forwardRef', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [
                            GreeterClass,
                            { provide: GREETER, useExisting: (0, forward_ref_1.forwardRef)(() => GreeterClass) },
                        ],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(GREETER).greet).toEqual('Class');
                        },
                    },
                });
            });
            it('@Inject annotation wrapped in forwardRef', () => {
                // @Inject(forwardRef(() => GREETER))
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: GREETER, useValue: { greet: 'Value' } }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)((0, forward_ref_1.forwardRef)(() => GREETER)).greet).toEqual('Value');
                        },
                    },
                });
            });
        });
    });
    /*
     * All tests below assume this structure:
     * ```
     * <parent>
     *   <#VIEW#>
     *     <view-child>
     *     </view-child>
     *   </#VIEW#>
     *   <content-child>
     *   </content-child>
     * </parent>
     * ```
     */
    describe('override rules:', () => {
        it('directiveProviders should override providers', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [{ provide: String, useValue: 'Message 1' }],
                    directiveProviders: [{ provide: String, useValue: 'Message 2' }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('Message 2');
                    },
                },
            });
        });
        it('viewProviders should override providers', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [{ provide: String, useValue: 'Message 1' }],
                    viewProviders: [{ provide: String, useValue: 'Message 2' }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('Message 2');
                    },
                },
            });
        });
        it('viewProviders should override directiveProviders', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    directiveProviders: [{ provide: String, useValue: 'Message 1' }],
                    viewProviders: [{ provide: String, useValue: 'Message 2' }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('Message 2');
                    },
                },
            });
        });
        it('last declared directive should override other directives', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    directive2Providers: [{ provide: String, useValue: 'Message 1' }],
                    directiveProviders: [{ provide: String, useValue: 'Message 2' }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('Message 2');
                    },
                },
            });
        });
        it('last provider should override previous one in component providers', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [
                        { provide: String, useValue: 'Message 1' },
                        { provide: String, useValue: 'Message 2' },
                    ],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('Message 2');
                    },
                },
            });
        });
        it('last provider should override previous one in component view providers', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    viewProviders: [
                        { provide: String, useValue: 'Message 1' },
                        { provide: String, useValue: 'Message 2' },
                    ],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('Message 2');
                    },
                },
            });
        });
        it('last provider should override previous one in directive providers', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    directiveProviders: [
                        { provide: String, useValue: 'Message 1' },
                        { provide: String, useValue: 'Message 2' },
                    ],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('Message 2');
                    },
                },
            });
        });
    });
    describe('single', () => {
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: String, useValue: 'From module' }],
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
        describe('without directives', () => {
            it('should work without providers nor viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with only providers in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: String, useValue: 'From providers' }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with only viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        viewProviders: [{ provide: String, useValue: 'From viewProviders' }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From module');
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with both providers and viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: String, useValue: 'From providers' }],
                        viewProviders: [{ provide: String, useValue: 'From viewProviders' }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From providers');
                        },
                    },
                    ngModule: MyModule,
                });
            });
        });
        describe('with directives (order in ɵcmp.directives matters)', () => {
            it('should work without providers nor viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        directiveProviders: [{ provide: String, useValue: 'From directive' }],
                        directive2Providers: [{ provide: String, useValue: 'Never' }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with only providers in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: String, useValue: 'From providers' }],
                        directiveProviders: [{ provide: String, useValue: 'From directive' }],
                        directive2Providers: [{ provide: String, useValue: 'Never' }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with only viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        viewProviders: [{ provide: String, useValue: 'From viewProviders' }],
                        directiveProviders: [{ provide: String, useValue: 'From directive' }],
                        directive2Providers: [{ provide: String, useValue: 'Never' }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with both providers and viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: String, useValue: 'From providers' }],
                        viewProviders: [{ provide: String, useValue: 'From viewProviders' }],
                        directiveProviders: [{ provide: String, useValue: 'From directive' }],
                        directive2Providers: [{ provide: String, useValue: 'Never' }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From viewProviders');
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual('From directive');
                        },
                    },
                    ngModule: MyModule,
                });
            });
        });
    });
    describe('multi', () => {
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: String, useValue: 'From module', multi: true }],
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
        describe('without directives', () => {
            it('should work without providers nor viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with only providers in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: String, useValue: 'From providers', multi: true }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with only viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        viewProviders: [{ provide: String, useValue: 'From viewProviders', multi: true }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From viewProviders']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From viewProviders']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From viewProviders']);
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From module']);
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with both providers and viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: String, useValue: 'From providers', multi: true }],
                        viewProviders: [{ provide: String, useValue: 'From viewProviders', multi: true }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers', 'From viewProviders']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers', 'From viewProviders']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers', 'From viewProviders']);
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From providers']);
                        },
                    },
                    ngModule: MyModule,
                });
            });
        });
        describe('with directives (order in ɵcmp.directives matters)', () => {
            it('should work without providers nor viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        directiveProviders: [{ provide: String, useValue: 'From directive 1', multi: true }],
                        directive2Providers: [{ provide: String, useValue: 'From directive 2', multi: true }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with only providers in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: String, useValue: 'From providers', multi: true }],
                        directiveProviders: [{ provide: String, useValue: 'From directive 1', multi: true }],
                        directive2Providers: [{ provide: String, useValue: 'From directive 2', multi: true }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with only viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        viewProviders: [{ provide: String, useValue: 'From viewProviders', multi: true }],
                        directiveProviders: [{ provide: String, useValue: 'From directive 1', multi: true }],
                        directive2Providers: [{ provide: String, useValue: 'From directive 2', multi: true }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From viewProviders',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From viewProviders',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From viewProviders',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual(['From directive 2', 'From directive 1']);
                        },
                    },
                    ngModule: MyModule,
                });
            });
            it('should work with both providers and viewProviders in component', () => {
                (0, providers_helper_1.expectProvidersScenario)({
                    parent: {
                        providers: [{ provide: String, useValue: 'From providers', multi: true }],
                        viewProviders: [{ provide: String, useValue: 'From viewProviders', multi: true }],
                        directiveProviders: [{ provide: String, useValue: 'From directive 1', multi: true }],
                        directive2Providers: [{ provide: String, useValue: 'From directive 2', multi: true }],
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From viewProviders',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                    },
                    viewChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From viewProviders',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From viewProviders',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                    },
                    contentChild: {
                        componentAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                        directiveAssertion: () => {
                            expect((0, core_1.inject)(String)).toEqual([
                                'From providers',
                                'From directive 2',
                                'From directive 1',
                            ]);
                        },
                    },
                    ngModule: MyModule,
                });
            });
        });
    });
    describe('tree-shakable injectables', () => {
        it('should work with root', () => {
            let FooForRoot = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FooForRoot = _classThis = class {
                };
                __setFunctionName(_classThis, "FooForRoot");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FooForRoot = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵprov = (0, core_1.ɵɵdefineInjectable)({
                    token: FooForRoot,
                    factory: () => new FooForRoot(),
                    providedIn: 'root',
                });
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FooForRoot = _classThis;
            })();
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    componentAssertion: () => {
                        expect((0, core_1.inject)(FooForRoot) instanceof FooForRoot).toBeTruthy();
                    },
                },
            });
        });
        it('should work with a module', () => {
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [{ provide: String, useValue: 'From module' }],
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
            let FooForModule = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: MyModule })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FooForModule = _classThis = class {
                };
                __setFunctionName(_classThis, "FooForModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FooForModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵprov = (0, core_1.ɵɵdefineInjectable)({
                    token: FooForModule,
                    factory: () => new FooForModule(),
                    providedIn: MyModule,
                });
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FooForModule = _classThis;
            })();
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    componentAssertion: () => {
                        expect((0, core_1.inject)(FooForModule) instanceof FooForModule).toBeTruthy();
                    },
                },
                ngModule: MyModule,
            });
        });
    });
    describe('- dynamic components dependency resolution', () => {
        let hostComponent = null;
        let EmbeddedComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{s}}`,
                    selector: 'embedded-cmp',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var EmbeddedComponent = _classThis = class {
                constructor(s) {
                    this.s = s;
                }
            };
            __setFunctionName(_classThis, "EmbeddedComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                EmbeddedComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return EmbeddedComponent = _classThis;
        })();
        let HostComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'host-cmp',
                    template: `foo`,
                    providers: [{ provide: String, useValue: 'From host component' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostComponent = _classThis = class {
                constructor(vcref) {
                    this.vcref = vcref;
                    hostComponent = this;
                }
            };
            __setFunctionName(_classThis, "HostComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostComponent = _classThis;
        })();
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [HostComponent],
                    template: `<host-cmp></host-cmp>`,
                    providers: [{ provide: String, useValue: 'From app component' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor() { }
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
        afterEach(() => (hostComponent = null));
        it('should not cross the root view boundary, and use the root view injector', () => {
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<host-cmp>foo</host-cmp><!--container-->');
            hostComponent.vcref.createComponent(EmbeddedComponent, {
                injector: {
                    get: (token, notFoundValue) => {
                        return token === String ? 'From custom root view injector' : notFoundValue;
                    },
                },
            });
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<host-cmp>foo</host-cmp><embedded-cmp>From custom root view injector</embedded-cmp><!--container-->');
        });
        it('should not cross the root view boundary, and use the module injector if no root view injector', () => {
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<host-cmp>foo</host-cmp><!--container-->');
            const environmentInjector = (0, core_1.createEnvironmentInjector)([{ provide: String, useValue: 'From module injector' }], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            hostComponent.vcref.createComponent(EmbeddedComponent, {
                injector: { get: (token, notFoundValue) => notFoundValue },
                environmentInjector: environmentInjector,
            });
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<host-cmp>foo</host-cmp><embedded-cmp>From module injector</embedded-cmp><!--container-->');
        });
        it('should cross the root view boundary to the parent of the host, thanks to the default root view injector', () => {
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<host-cmp>foo</host-cmp><!--container-->');
            hostComponent.vcref.createComponent(EmbeddedComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<host-cmp>foo</host-cmp><embedded-cmp>From app component</embedded-cmp><!--container-->');
        });
    });
    describe('deps boundary:', () => {
        it('the deps of a token declared in providers should not be resolved with tokens from viewProviders', () => {
            let MyService = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyService = _classThis = class {
                    constructor(value) {
                        this.value = value;
                    }
                };
                __setFunctionName(_classThis, "MyService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyService = _classThis;
            })();
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [MyService, { provide: String, useValue: 'providers' }],
                    viewProviders: [{ provide: String, useValue: 'viewProviders' }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('viewProviders');
                        expect((0, core_1.inject)(MyService).value).toEqual('providers');
                    },
                },
            });
        });
        it('should make sure that parent service does not see overrides in child directives', () => {
            let Greeter = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Greeter = _classThis = class {
                    constructor(greeting) {
                        this.greeting = greeting;
                    }
                };
                __setFunctionName(_classThis, "Greeter");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Greeter = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Greeter = _classThis;
            })();
            (0, providers_helper_1.expectProvidersScenario)({
                parent: {
                    providers: [Greeter, { provide: String, useValue: 'parent' }],
                },
                viewChild: {
                    providers: [{ provide: String, useValue: 'view' }],
                    componentAssertion: () => {
                        expect((0, core_1.inject)(Greeter).greeting).toEqual('parent');
                    },
                },
            });
        });
    });
    describe('injection flags', () => {
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: String, useValue: 'Module' }],
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
        it('should not fall through to ModuleInjector if flags limit the scope', () => {
            (0, providers_helper_1.expectProvidersScenario)({
                ngModule: MyModule,
                parent: {
                    componentAssertion: () => {
                        expect((0, core_1.inject)(String)).toEqual('Module');
                        expect((0, core_1.inject)(String, { optional: true, self: true })).toBeNull();
                        expect((0, core_1.inject)(String, { optional: true, host: true })).toBeNull();
                    },
                },
            });
        });
    });
    describe('from a node without injector', () => {
        class Some {
        }
        let SomeInj = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeInj = _classThis = class {
                constructor(location) {
                    this.location = location;
                }
            };
            __setFunctionName(_classThis, "SomeInj");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeInj = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeInj = _classThis;
        })();
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-cmp',
                    template: `<p></p>`,
                    providers: [{ provide: String, useValue: 'From my component' }],
                    viewProviders: [{ provide: Number, useValue: 123 }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
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
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [MyComponent],
                    template: `<my-cmp></my-cmp>`,
                    providers: [
                        { provide: String, useValue: 'From app component' },
                        { provide: Some, useClass: SomeInj },
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
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
        it('should work from within the template', () => {
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<my-cmp><p></p></my-cmp>');
            const p = fixture.nativeElement.querySelector('p');
            const injector = (0, discovery_utils_1.getInjector)(p);
            expect(injector.get(Number)).toEqual(123);
            expect(injector.get(String)).toEqual('From my component');
            expect(injector.get(Some).location).toEqual('From app component');
        });
        it('should work from the host of the component', () => {
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<my-cmp><p></p></my-cmp>');
            const myCmp = fixture.nativeElement.querySelector('my-cmp');
            const injector = (0, discovery_utils_1.getInjector)(myCmp);
            expect(injector.get(Number)).toEqual(123);
            expect(injector.get(String)).toEqual('From my component');
            expect(injector.get(Some).location).toEqual('From app component');
        });
    });
    // Note: these tests check the behavior of `getInheritedFactory` specifically.
    // Since `getInheritedFactory` is only generated in AOT, the tests can't be
    // ported directly to TestBed while running in JIT mode.
    describe('getInheritedFactory on class with custom decorator', () => {
        function addFoo() {
            return (constructor) => {
                const decoratedClass = class Extender extends constructor {
                    constructor() {
                        super(...arguments);
                        this.foo = 'bar';
                    }
                };
                return decoratedClass;
            };
        }
        it('should find the correct factories if a parent class has a custom decorator', () => {
            class GrandParent {
            }
            GrandParent.ɵfac = function GrandParent_Factory() { };
            let Parent = (() => {
                let _classDecorators = [addFoo()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = GrandParent;
                var Parent = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵfac = function Parent_Factory() { };
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            class Child extends Parent {
            }
            Child.ɵfac = function Child_Factory() { };
            expect((0, index_1.ɵɵgetInheritedFactory)(Child).name).toBe('Parent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(Parent).name).toBe('GrandParent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(GrandParent).name).toBeFalsy();
        });
        it('should find the correct factories if a child class has a custom decorator', () => {
            class GrandParent {
            }
            GrandParent.ɵfac = function GrandParent_Factory() { };
            class Parent extends GrandParent {
            }
            Parent.ɵfac = function Parent_Factory() { };
            let Child = (() => {
                let _classDecorators = [addFoo()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Parent;
                var Child = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵfac = function Child_Factory() { };
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            expect((0, index_1.ɵɵgetInheritedFactory)(Child).name).toBe('Parent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(Parent).name).toBe('GrandParent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(GrandParent).name).toBeFalsy();
        });
        it('should find the correct factories if a grandparent class has a custom decorator', () => {
            let GrandParent = (() => {
                let _classDecorators = [addFoo()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GrandParent = _classThis = class {
                };
                __setFunctionName(_classThis, "GrandParent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandParent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵfac = function GrandParent_Factory() { };
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandParent = _classThis;
            })();
            class Parent extends GrandParent {
            }
            Parent.ɵfac = function Parent_Factory() { };
            class Child extends Parent {
            }
            Child.ɵfac = function Child_Factory() { };
            expect((0, index_1.ɵɵgetInheritedFactory)(Child).name).toBe('Parent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(Parent).name).toBe('GrandParent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(GrandParent).name).toBeFalsy();
        });
        it('should find the correct factories if all classes have a custom decorator', () => {
            let GrandParent = (() => {
                let _classDecorators = [addFoo()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GrandParent = _classThis = class {
                };
                __setFunctionName(_classThis, "GrandParent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandParent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵfac = function GrandParent_Factory() { };
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandParent = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [addFoo()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = GrandParent;
                var Parent = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵfac = function Parent_Factory() { };
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            let Child = (() => {
                let _classDecorators = [addFoo()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Parent;
                var Child = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵfac = function Child_Factory() { };
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            expect((0, index_1.ɵɵgetInheritedFactory)(Child).name).toBe('Parent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(Parent).name).toBe('GrandParent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(GrandParent).name).toBeFalsy();
        });
        it('should find the correct factories if parent and grandparent classes have a custom decorator', () => {
            let GrandParent = (() => {
                let _classDecorators = [addFoo()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GrandParent = _classThis = class {
                };
                __setFunctionName(_classThis, "GrandParent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandParent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵfac = function GrandParent_Factory() { };
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandParent = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [addFoo()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = GrandParent;
                var Parent = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.ɵfac = function Parent_Factory() { };
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            class Child extends Parent {
            }
            Child.ɵfac = function Child_Factory() { };
            expect((0, index_1.ɵɵgetInheritedFactory)(Child).name).toBe('Parent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(Parent).name).toBe('GrandParent_Factory');
            expect((0, index_1.ɵɵgetInheritedFactory)(GrandParent).name).toBeFalsy();
        });
    });
});
