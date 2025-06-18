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
const en_1 = __importDefault(require("../../locales/en"));
const en_2 = __importDefault(require("../../locales/extra/en"));
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
describe('DatePipe', () => {
    const isoStringWithoutTime = '2015-01-01';
    let pipe;
    let date;
    beforeAll(() => (0, core_1.ɵregisterLocaleData)(en_1.default, en_2.default));
    afterAll(() => (0, core_1.ɵunregisterLocaleData)());
    beforeEach(() => {
        date = new Date(2015, 5, 15, 9, 3, 1, 550);
        pipe = new index_1.DatePipe('en-US', null);
    });
    describe('supports', () => {
        it('should support date', () => {
            expect(() => pipe.transform(date)).not.toThrow();
        });
        it('should support int', () => {
            expect(() => pipe.transform(123456789)).not.toThrow();
        });
        it('should support numeric strings', () => {
            expect(() => pipe.transform('123456789')).not.toThrow();
        });
        it('should support decimal strings', () => {
            expect(() => pipe.transform('123456789.11')).not.toThrow();
        });
        it('should support ISO string', () => expect(() => pipe.transform('2015-06-15T21:43:11Z')).not.toThrow());
        it('should return null for empty string', () => {
            expect(pipe.transform('')).toEqual(null);
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
        it('should support ISO string without time', () => {
            expect(() => pipe.transform(isoStringWithoutTime)).not.toThrow();
        });
        it('should not support other objects', () => {
            expect(() => pipe.transform({})).toThrowError(/InvalidPipeArgument/);
        });
    });
    describe('transform', () => {
        it('should use "mediumDate" as the default format if no format is provided', () => expect(pipe.transform('2017-01-11T10:14:39+0000')).toEqual('Jan 11, 2017'));
        it('should give precedence to the passed in format', () => expect(pipe.transform('2017-01-11T10:14:39+0000', 'shortDate')).toEqual('1/11/17'));
        it('should use format provided in component as default format when no format is passed in', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.DatePipe],
                        template: '{{ value | date }}',
                        providers: [{ provide: index_1.DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'shortDate' } }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.value = '2017-01-11T10:14:39+0000';
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
            expect(content).toBe('1/11/17');
        });
        it('should use format provided in module as default format when no format is passed in', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.DatePipe],
                        template: '{{ value | date }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.value = '2017-01-11T10:14:39+0000';
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
            testing_1.TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: index_1.DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'shortDate' } }],
            });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const content = fixture.nativeElement.textContent;
            expect(content).toBe('1/11/17');
        });
        it('should return first week if some dates fall in previous year but belong to next year according to ISO 8601 format', () => {
            expect(pipe.transform('2019-12-28T00:00:00', 'w')).toEqual('52');
            // December 29th is a Sunday, week number is from previous thursday
            expect(pipe.transform('2019-12-29T00:00:00', 'w')).toEqual('52');
            // December 30th is a monday, week number is from next thursday
            expect(pipe.transform('2019-12-30T00:00:00', 'w')).toEqual('1');
        });
        it('should return first week if some dates fall in previous leap year but belong to next year according to ISO 8601 format', () => {
            expect(pipe.transform('2012-12-29T00:00:00', 'w')).toEqual('52');
            // December 30th is a Sunday, week number is from previous thursday
            expect(pipe.transform('2012-12-30T00:00:00', 'w')).toEqual('52');
            // December 31th is a monday, week number is from next thursday
            expect(pipe.transform('2012-12-31T00:00:00', 'w')).toEqual('1');
        });
        it('should round milliseconds down to the nearest millisecond', () => {
            expect(pipe.transform('2020-08-01T23:59:59.999', 'yyyy-MM-dd')).toEqual('2020-08-01');
            expect(pipe.transform('2020-08-01T23:59:59.9999', 'yyyy-MM-dd, h:mm:ss SSS')).toEqual('2020-08-01, 11:59:59 999');
        });
        it('should take timezone into account with timezone offset', () => {
            expect(pipe.transform('2017-01-11T00:00:00', 'mediumDate', '-1200')).toEqual('Jan 10, 2017');
        });
        it('should support an empty string for the timezone', () => {
            expect(pipe.transform('2017-01-11T00:00:00', 'mediumDate', '')).toEqual('Jan 11, 2017');
        });
        it('should take timezone into account', () => {
            expect(pipe.transform('2017-01-11T00:00:00', 'mediumDate', '-1200')).toEqual('Jan 10, 2017');
        });
        it('should take timezone into account with timezone offset', () => {
            expect(pipe.transform('2017-01-11T00:00:00', 'mediumDate', '-1200')).toEqual('Jan 10, 2017');
        });
        it('should take the default timezone into account when no timezone is passed in', () => {
            pipe = new index_1.DatePipe('en-US', '-1200');
            expect(pipe.transform('2017-01-11T00:00:00', 'mediumDate')).toEqual('Jan 10, 2017');
        });
        it('should give precedence to the passed in timezone over the default one', () => {
            pipe = new index_1.DatePipe('en-US', '-1200');
            expect(pipe.transform('2017-01-11T00:00:00', 'mediumDate', '+0100')).toEqual('Jan 11, 2017');
        });
        it('should use timezone provided in component as default timezone when no format is passed in', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.DatePipe],
                        template: '{{ value | date }}',
                        providers: [{ provide: index_1.DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '-1200' } }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.value = '2017-01-11T00:00:00';
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
            expect(content).toBe('Jan 10, 2017');
        });
        it('should use timezone provided in module as default timezone when no format is passed in', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.DatePipe],
                        template: '{{ value | date }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.value = '2017-01-11T00:00:00';
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
            testing_1.TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: index_1.DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '-1200' } }],
            });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const content = fixture.nativeElement.textContent;
            expect(content).toBe('Jan 10, 2017');
        });
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.DatePipe],
                    template: '{{ value | date }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = '2017-01-11T10:14:39+0000';
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
        expect(content).toBe('Jan 11, 2017');
    });
});
