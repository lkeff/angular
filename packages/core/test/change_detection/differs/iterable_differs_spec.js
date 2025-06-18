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
const core_1 = require("../../../src/core");
const testing_1 = require("../../../testing");
describe('IterableDiffers', function () {
    let factory1;
    let factory2;
    let factory3;
    beforeEach(() => {
        const getFactory = () => jasmine.createSpyObj('IterableDifferFactory', ['supports']);
        factory1 = getFactory();
        factory2 = getFactory();
        factory3 = getFactory();
    });
    it('should throw when no suitable implementation found', () => {
        const differs = new core_1.IterableDiffers([]);
        expect(() => differs.find('some object')).toThrowError(/Cannot find a differ supporting object 'some object'/);
    });
    it('should return the first suitable implementation', () => {
        factory1.supports.and.returnValue(false);
        factory2.supports.and.returnValue(true);
        factory3.supports.and.returnValue(true);
        const differs = core_1.IterableDiffers.create([factory1, factory2, factory3]);
        expect(differs.find('some object')).toBe(factory2);
    });
    it('should copy over differs from the parent repo', () => {
        factory1.supports.and.returnValue(true);
        factory2.supports.and.returnValue(false);
        const parent = core_1.IterableDiffers.create([factory1]);
        const child = core_1.IterableDiffers.create([factory2], parent);
        // @ts-expect-error private member
        expect(child.factories).toEqual([factory2, factory1]);
    });
    describe('.extend()', () => {
        it('should extend di-inherited differs', () => {
            const differ = new core_1.IterableDiffers([factory1]);
            const injector = core_1.Injector.create({ providers: [{ provide: core_1.IterableDiffers, useValue: differ }] });
            const childInjector = core_1.Injector.create({
                providers: [core_1.IterableDiffers.extend([factory2])],
                parent: injector,
            });
            // @ts-expect-error factories is a private member
            expect(injector.get(core_1.IterableDiffers).factories).toEqual([factory1]);
            // @ts-expect-error factories is a private member
            expect(childInjector.get(core_1.IterableDiffers).factories).toEqual([
                factory2,
                factory1,
            ]);
        });
        it('should support .extend in root NgModule', () => {
            const DIFFER = {};
            const log = [];
            class MyIterableDifferFactory {
                supports(objects) {
                    log.push('supports', objects);
                    return true;
                }
                create(trackByFn) {
                    log.push('create');
                    return DIFFER;
                }
            }
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ providers: [core_1.IterableDiffers.extend([new MyIterableDifferFactory()])] })];
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const differs = testing_1.TestBed.inject(core_1.IterableDiffers);
            const differ = differs.find('VALUE').create(null);
            expect(differ).toEqual(DIFFER);
            expect(log).toEqual(['supports', 'VALUE', 'create']);
        });
    });
});
