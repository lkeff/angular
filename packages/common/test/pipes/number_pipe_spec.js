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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const ar_1 = __importDefault(require("../../locales/ar"));
const da_1 = __importDefault(require("../../locales/da"));
const de_AT_1 = __importDefault(require("../../locales/de-AT"));
const en_1 = __importDefault(require("../../locales/en"));
const es_US_1 = __importDefault(require("../../locales/es-US"));
const fr_1 = __importDefault(require("../../locales/fr"));
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
describe('Number pipes', () => {
    beforeAll(() => {
        (0, core_1.ɵregisterLocaleData)(en_1.default);
        (0, core_1.ɵregisterLocaleData)(es_US_1.default);
        (0, core_1.ɵregisterLocaleData)(fr_1.default);
        (0, core_1.ɵregisterLocaleData)(ar_1.default);
        (0, core_1.ɵregisterLocaleData)(de_AT_1.default);
        (0, core_1.ɵregisterLocaleData)(da_1.default);
    });
    afterAll(() => (0, core_1.ɵunregisterLocaleData)());
    describe('DecimalPipe', () => {
        describe('transform', () => {
            let pipe;
            beforeEach(() => {
                pipe = new index_1.DecimalPipe('en-US');
            });
            it('should return correct value for numbers', () => {
                expect(pipe.transform(12345)).toEqual('12,345');
                expect(pipe.transform(1.123456, '3.4-5')).toEqual('001.12346');
            });
            it('should support strings', () => {
                expect(pipe.transform('12345')).toEqual('12,345');
                expect(pipe.transform('123', '.2')).toEqual('123.00');
                expect(pipe.transform('1', '3.')).toEqual('001');
                expect(pipe.transform('1.1', '3.4-5')).toEqual('001.1000');
                expect(pipe.transform('1.123456', '3.4-5')).toEqual('001.12346');
                expect(pipe.transform('1.1234')).toEqual('1.123');
            });
            it('should return null for NaN', () => {
                expect(pipe.transform(Number.NaN)).toEqual(null);
            });
            it('should return null for null', () => {
                expect(pipe.transform(null)).toEqual(null);
            });
            it('should return null for undefined', () => {
                expect(pipe.transform(undefined)).toEqual(null);
            });
            it('should not support other objects', () => {
                expect(() => pipe.transform({})).toThrowError(`NG02100: InvalidPipeArgument: 'NG02309: [object Object] is not a number' for pipe 'DecimalPipe'`);
                expect(() => pipe.transform('123abc')).toThrowError(`NG02100: InvalidPipeArgument: 'NG02309: 123abc is not a number' for pipe 'DecimalPipe'`);
            });
        });
        describe('transform with custom locales', () => {
            it('should return the correct format for es-US', () => {
                const pipe = new index_1.DecimalPipe('es-US');
                expect(pipe.transform('9999999.99', '1.2-2')).toEqual('9,999,999.99');
            });
        });
        it('should be available as a standalone pipe', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.DecimalPipe],
                        template: '{{ value | number }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.value = 12345;
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const content = fixture.nativeElement.textContent;
            expect(content).toBe('12,345');
        });
    });
    describe('PercentPipe', () => {
        let pipe;
        beforeEach(() => {
            pipe = new index_1.PercentPipe('en-US');
        });
        describe('transform', () => {
            it('should return correct value for numbers', () => {
                expect(pipe.transform(1.23)).toEqual('123%');
                expect(pipe.transform(1.234)).toEqual('123%');
                expect(pipe.transform(1.236)).toEqual('124%');
                expect(pipe.transform(12.3456, '0.0-10')).toEqual('1,234.56%');
            });
            it('should return null for NaN', () => {
                expect(pipe.transform(Number.NaN)).toEqual(null);
            });
            it('should return null for null', () => {
                expect(pipe.transform(null)).toEqual(null);
            });
            it('should return null for undefined', () => {
                expect(pipe.transform(undefined)).toEqual(null);
            });
            it('should not support other objects', () => {
                expect(() => pipe.transform({})).toThrowError(`NG02100: InvalidPipeArgument: 'NG02309: [object Object] is not a number' for pipe 'PercentPipe'`);
            });
        });
        it('should be available as a standalone pipe', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.PercentPipe],
                        template: '{{ value | percent }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.value = 15;
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const content = fixture.nativeElement.textContent;
            expect(content).toBe('1,500%');
        });
    });
    describe('CurrencyPipe', () => {
        let pipe;
        beforeEach(() => {
            pipe = new index_1.CurrencyPipe('en-US', 'USD');
        });
        describe('transform', () => {
            it('should return correct value for numbers', () => {
                expect(pipe.transform(123)).toEqual('$123.00');
                expect(pipe.transform(12, 'EUR', 'code', '.1')).toEqual('EUR12.0');
                expect(pipe.transform(5.1234, 'USD', 'code', '.0-3')).toEqual('USD5.123');
                expect(pipe.transform(5.1234, 'USD', 'code')).toEqual('USD5.12');
                expect(pipe.transform(5.1234, 'USD', '')).toEqual('5.12');
                expect(pipe.transform(5.1234, 'USD', 'symbol')).toEqual('$5.12');
                expect(pipe.transform(5.1234, 'CAD', 'symbol')).toEqual('CA$5.12');
                expect(pipe.transform(5.1234, 'CAD', 'symbol-narrow')).toEqual('$5.12');
                expect(pipe.transform(5.1234, 'CAD', 'symbol-narrow', '5.2-2')).toEqual('$00,005.12');
                expect(pipe.transform(5.1234, 'CAD', 'symbol-narrow', '5.2-2', 'fr')).toEqual('00\u202f005,12 $');
                expect(pipe.transform(5, 'USD', 'symbol', '', 'fr')).toEqual('5,00 $US');
                expect(pipe.transform(123456789, 'EUR', 'symbol', '', 'de-at')).toEqual('€ 123.456.789,00');
                expect(pipe.transform(5.1234, 'EUR', '', '', 'de-at')).toEqual('5,12');
                expect(pipe.transform(5.1234, 'DKK', '', '', 'da')).toEqual('5,12');
                // CLP doesn't have a subdivision, so it should not display decimals unless explicitly
                // told so
                expect(pipe.transform(5.1234, 'CLP', '')).toEqual('5');
                expect(pipe.transform(5.1234, 'CLP', '', '2.0-3')).toEqual('05.123');
            });
            it('should use the injected default currency code if none is provided', () => {
                const clpPipe = new index_1.CurrencyPipe('en-US', 'CLP');
                expect(clpPipe.transform(1234)).toEqual('CLP1,234');
            });
            it('should support any currency code name', () => {
                // currency code is unknown, default formatting options will be used
                expect(pipe.transform(5.1234, 'unexisting_ISO_code', 'symbol')).toEqual('unexisting_ISO_code5.12');
                // currency code is USD, the pipe will format based on USD but will display "Custom name"
                expect(pipe.transform(5.1234, 'USD', 'Custom name')).toEqual('Custom name5.12');
                // currency code is unknown, default formatting options will be used and will display
                // "Custom name"
                expect(pipe.transform(5.1234, 'unexisting_ISO_code', 'Custom name')).toEqual('Custom name5.12');
            });
            it('should return null for NaN', () => {
                expect(pipe.transform(Number.NaN)).toEqual(null);
            });
            it('should return null for null', () => {
                expect(pipe.transform(null)).toEqual(null);
            });
            it('should return null for undefined', () => {
                expect(pipe.transform(undefined)).toEqual(null);
            });
            it('should not support other objects', () => {
                expect(() => pipe.transform({})).toThrowError(`NG02100: InvalidPipeArgument: 'NG02309: [object Object] is not a number' for pipe 'CurrencyPipe'`);
            });
            it('should warn if you are using the v4 signature', () => {
                const warnSpy = spyOn(console, 'warn');
                pipe.transform(123, 'USD', true);
                expect(warnSpy).toHaveBeenCalledWith(`Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".`);
            });
        });
        it('should be available as a standalone pipe', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.CurrencyPipe],
                        template: '{{ value | currency }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.value = 15;
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const content = fixture.nativeElement.textContent;
            expect(content).toBe('$15.00');
        });
    });
});
