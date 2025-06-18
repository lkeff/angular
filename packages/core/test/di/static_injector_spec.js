"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
const stringify_1 = require("../../src/util/stringify");
class Engine {
}
Engine.PROVIDER = { provide: Engine, useClass: Engine, deps: [] };
class BrokenEngine {
    constructor() {
        throw new Error('Broken Engine');
    }
}
BrokenEngine.PROVIDER = { provide: Engine, useClass: BrokenEngine, deps: [] };
class TurboEngine extends Engine {
}
TurboEngine.PROVIDER = { provide: Engine, useClass: TurboEngine, deps: [] };
class Car {
    constructor(engine) {
        this.engine = engine;
    }
}
Car.PROVIDER = { provide: Car, useClass: Car, deps: [Engine] };
class SportsCar extends Car {
}
SportsCar.PROVIDER = { provide: Car, useClass: SportsCar, deps: [Engine] };
describe('child', () => {
    it('should load instances from parent injector', () => {
        const parent = core_1.Injector.create({ providers: [Engine.PROVIDER] });
        const child = core_1.Injector.create({ providers: [], parent });
        const engineFromParent = parent.get(Engine);
        const engineFromChild = child.get(Engine);
        expect(engineFromChild).toBe(engineFromParent);
    });
    it('should not use the child providers when resolving the dependencies of a parent provider', () => {
        const parent = core_1.Injector.create({ providers: [Car.PROVIDER, Engine.PROVIDER] });
        const child = core_1.Injector.create({ providers: [TurboEngine.PROVIDER], parent });
        const carFromChild = child.get(Car);
        expect(carFromChild.engine).toBeInstanceOf(Engine);
    });
    it('should create new instance in a child injector', () => {
        const parent = core_1.Injector.create({ providers: [Engine.PROVIDER] });
        const child = core_1.Injector.create({ providers: [TurboEngine.PROVIDER], parent });
        const engineFromParent = parent.get(Engine);
        const engineFromChild = child.get(Engine);
        expect(engineFromParent).not.toBe(engineFromChild);
        expect(engineFromChild).toBeInstanceOf(TurboEngine);
    });
    it('should give access to parent', () => {
        const parent = core_1.Injector.create({ providers: [] });
        const child = core_1.Injector.create({ providers: [], parent });
        expect(child.parent).toBe(parent);
    });
});
describe('instantiate', () => {
    it('should instantiate an object in the context of the injector', () => {
        const inj = core_1.Injector.create({ providers: [Engine.PROVIDER] });
        const childInj = core_1.Injector.create({ providers: [Car.PROVIDER], parent: inj });
        const car = childInj.get(Car);
        expect(car).toBeInstanceOf(Car);
        expect(car.engine).toBe(inj.get(Engine));
    });
});
describe('dependency resolution', () => {
    describe('@Self()', () => {
        it('should return a dependency from self', () => {
            const inj = core_1.Injector.create({
                providers: [
                    Engine.PROVIDER,
                    { provide: Car, useFactory: (e) => new Car(e), deps: [[Engine, new core_1.Self()]] },
                ],
            });
            expect(inj.get(Car)).toBeInstanceOf(Car);
        });
        it('should throw when not requested provider on self', () => {
            const parent = core_1.Injector.create({ providers: [Engine.PROVIDER] });
            const child = core_1.Injector.create({
                providers: [
                    { provide: Car, useFactory: (e) => new Car(e), deps: [[Engine, new core_1.Self()]] },
                ],
                parent,
            });
            expect(() => child.get(Car)).toThrowError(`R3InjectorError[${(0, stringify_1.stringify)(Car)} -> ${(0, stringify_1.stringify)(Engine)}]: \n` +
                '  NullInjectorError: No provider for Engine!');
        });
        it('should return a default value when not requested provider on self', () => {
            const car = new SportsCar(new Engine());
            const injector = core_1.Injector.create({ providers: [] });
            expect(injector.get(Car, null, { self: true })).toBeNull();
            expect(injector.get(Car, car, { self: true })).toBe(car);
        });
        it('should return a default value when not requested provider on self and optional', () => {
            const injector = core_1.Injector.create({ providers: [] });
            expect(injector.get(Car, null, { self: true })).toBeNull();
            expect(injector.get(Car, 0, { self: true, optional: true })).toBe(0);
        });
        it(`should return null when not requested provider on self and optional`, () => {
            const injector = core_1.Injector.create({ providers: [] });
            expect(injector.get(Car, undefined, { self: true, optional: true })).toBeNull();
        });
        it('should throw error when not requested provider on self', () => {
            const injector = core_1.Injector.create({ providers: [] });
            expect(() => injector.get(Car, undefined, { self: true })).toThrowError(`R3InjectorError[${(0, stringify_1.stringify)(Car)}]: \n` +
                `  NullInjectorError: No provider for ${(0, stringify_1.stringify)(Car)}!`);
        });
    });
    describe('default', () => {
        it('should skip self', () => {
            const parent = core_1.Injector.create({ providers: [Engine.PROVIDER] });
            const child = core_1.Injector.create({
                providers: [
                    TurboEngine.PROVIDER,
                    { provide: Car, useFactory: (e) => new Car(e), deps: [[core_1.SkipSelf, Engine]] },
                ],
                parent,
            });
            expect(child.get(Car).engine).toBeInstanceOf(Engine);
        });
    });
});
describe('resolve', () => {
    it('should throw when mixing multi providers with regular providers', () => {
        expect(() => {
            core_1.Injector.create([
                { provide: Engine, useClass: BrokenEngine, deps: [], multi: true },
                Engine.PROVIDER,
            ]);
        }).toThrowError(/Cannot mix multi providers and regular providers/);
        expect(() => {
            core_1.Injector.create([
                Engine.PROVIDER,
                { provide: Engine, useClass: BrokenEngine, deps: [], multi: true },
            ]);
        }).toThrowError(/Cannot mix multi providers and regular providers/);
    });
    it('should resolve forward references', () => {
        const injector = core_1.Injector.create({
            providers: [
                [{ provide: (0, core_1.forwardRef)(() => BrokenEngine), useClass: (0, core_1.forwardRef)(() => Engine), deps: [] }],
                {
                    provide: (0, core_1.forwardRef)(() => String),
                    useFactory: (e) => e,
                    deps: [(0, core_1.forwardRef)(() => BrokenEngine)],
                },
            ],
        });
        expect(injector.get(String)).toBeInstanceOf(Engine);
        expect(injector.get(BrokenEngine)).toBeInstanceOf(Engine);
    });
    it('should support overriding factory dependencies with dependency annotations', () => {
        const injector = core_1.Injector.create({
            providers: [
                Engine.PROVIDER,
                { provide: 'token', useFactory: (e) => e, deps: [[new core_1.Inject(Engine)]] },
            ],
        });
        expect(injector.get('token')).toBeInstanceOf(Engine);
    });
});
describe('displayName', () => {
    it('should work', () => {
        expect(core_1.Injector.create({
            providers: [Engine.PROVIDER, { provide: BrokenEngine, useValue: null }],
        }).toString()).toEqual('R3Injector[Engine, BrokenEngine, InjectionToken INJECTOR, InjectionToken INJECTOR_DEF_TYPES, InjectionToken ENVIRONMENT_INITIALIZER]');
    });
});
