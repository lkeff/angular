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
const core_1 = require("@angular/core");
{
    describe('Provider examples', () => {
        describe('TypeProvider', () => {
            it('works', () => {
                // #docregion TypeProvider
                let Greeting = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Greeting = _classThis = class {
                        constructor() {
                            this.salutation = 'Hello';
                        }
                    };
                    __setFunctionName(_classThis, "Greeting");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Greeting = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Greeting = _classThis;
                })();
                const injector = core_1.Injector.create({ providers: [{ provide: Greeting, useClass: Greeting }] });
                expect(injector.get(Greeting).salutation).toBe('Hello');
                // #enddocregion
            });
        });
        describe('ValueProvider', () => {
            it('works', () => {
                // #docregion ValueProvider
                const injector = core_1.Injector.create({ providers: [{ provide: String, useValue: 'Hello' }] });
                expect(injector.get(String)).toEqual('Hello');
                // #enddocregion
            });
        });
        describe('MultiProviderAspect', () => {
            it('works', () => {
                // #docregion MultiProviderAspect
                const locale = new core_1.InjectionToken('locale');
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: locale, multi: true, useValue: 'en' },
                        { provide: locale, multi: true, useValue: 'sk' },
                    ],
                });
                const locales = injector.get(locale);
                expect(locales).toEqual(['en', 'sk']);
                // #enddocregion
            });
        });
        describe('ClassProvider', () => {
            it('works', () => {
                // #docregion ClassProvider
                class Shape {
                }
                class Square extends Shape {
                    constructor() {
                        super(...arguments);
                        this.name = 'square';
                    }
                }
                const injector = core_1.Injector.create({ providers: [{ provide: Shape, useValue: new Square() }] });
                const shape = injector.get(Shape);
                expect(shape.name).toEqual('square');
                expect(shape instanceof Square).toBe(true);
                // #enddocregion
            });
            it('is different then useExisting', () => {
                // #docregion ClassProviderDifference
                class Greeting {
                    constructor() {
                        this.salutation = 'Hello';
                    }
                }
                class FormalGreeting extends Greeting {
                    constructor() {
                        super(...arguments);
                        this.salutation = 'Greetings';
                    }
                }
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: FormalGreeting, useClass: FormalGreeting },
                        { provide: Greeting, useClass: FormalGreeting },
                    ],
                });
                // The injector returns different instances.
                // See: {provide: ?, useExisting: ?} if you want the same instance.
                expect(injector.get(FormalGreeting)).not.toBe(injector.get(Greeting));
                // #enddocregion
            });
        });
        describe('StaticClassProvider', () => {
            it('works', () => {
                // #docregion StaticClassProvider
                class Shape {
                }
                class Square extends Shape {
                    constructor() {
                        super(...arguments);
                        this.name = 'square';
                    }
                }
                const injector = core_1.Injector.create({
                    providers: [{ provide: Shape, useClass: Square, deps: [] }],
                });
                const shape = injector.get(Shape);
                expect(shape.name).toEqual('square');
                expect(shape instanceof Square).toBe(true);
                // #enddocregion
            });
            it('is different then useExisting', () => {
                // #docregion StaticClassProviderDifference
                class Greeting {
                    constructor() {
                        this.salutation = 'Hello';
                    }
                }
                class FormalGreeting extends Greeting {
                    constructor() {
                        super(...arguments);
                        this.salutation = 'Greetings';
                    }
                }
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: FormalGreeting, useClass: FormalGreeting, deps: [] },
                        { provide: Greeting, useClass: FormalGreeting, deps: [] },
                    ],
                });
                // The injector returns different instances.
                // See: {provide: ?, useExisting: ?} if you want the same instance.
                expect(injector.get(FormalGreeting)).not.toBe(injector.get(Greeting));
                // #enddocregion
            });
        });
        describe('ConstructorProvider', () => {
            it('works', () => {
                // #docregion ConstructorProvider
                class Square {
                    constructor() {
                        this.name = 'square';
                    }
                }
                const injector = core_1.Injector.create({ providers: [{ provide: Square, deps: [] }] });
                const shape = injector.get(Square);
                expect(shape.name).toEqual('square');
                expect(shape instanceof Square).toBe(true);
                // #enddocregion
            });
        });
        describe('ExistingProvider', () => {
            it('works', () => {
                // #docregion ExistingProvider
                class Greeting {
                    constructor() {
                        this.salutation = 'Hello';
                    }
                }
                class FormalGreeting extends Greeting {
                    constructor() {
                        super(...arguments);
                        this.salutation = 'Greetings';
                    }
                }
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: FormalGreeting, deps: [] },
                        { provide: Greeting, useExisting: FormalGreeting },
                    ],
                });
                expect(injector.get(Greeting).salutation).toEqual('Greetings');
                expect(injector.get(FormalGreeting).salutation).toEqual('Greetings');
                expect(injector.get(FormalGreeting)).toBe(injector.get(Greeting));
                // #enddocregion
            });
        });
        describe('FactoryProvider', () => {
            it('works', () => {
                // #docregion FactoryProvider
                const Location = new core_1.InjectionToken('location');
                const Hash = new core_1.InjectionToken('hash');
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: Location, useValue: 'https://angular.io/#someLocation' },
                        {
                            provide: Hash,
                            useFactory: (location) => location.split('#')[1],
                            deps: [Location],
                        },
                    ],
                });
                expect(injector.get(Hash)).toEqual('someLocation');
                // #enddocregion
            });
            it('supports optional dependencies', () => {
                // #docregion FactoryProviderOptionalDeps
                const Location = new core_1.InjectionToken('location');
                const Hash = new core_1.InjectionToken('hash');
                const injector = core_1.Injector.create({
                    providers: [
                        {
                            provide: Hash,
                            useFactory: (location) => `Hash for: ${location}`,
                            // use a nested array to define metadata for dependencies.
                            deps: [[new core_1.Optional(), Location]],
                        },
                    ],
                });
                expect(injector.get(Hash)).toEqual('Hash for: null');
                // #enddocregion
            });
        });
    });
}
