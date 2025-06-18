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
const core_1 = require("../src/core");
const testing_1 = require("../testing");
describe('effects in TestBed', () => {
    let prev;
    it('created in the constructor should run with detectChanges()', () => {
        const log = [];
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    log.push('Ctor');
                    (0, core_1.effect)(() => {
                        log.push('Effect');
                    });
                }
                ngDoCheck() {
                    log.push('DoCheck');
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.createComponent(Cmp).detectChanges();
        expect(log).toEqual([
            // The component gets constructed, which creates the effect. Since the effect is created in a
            // component, it doesn't get scheduled until the component is first change detected.
            'Ctor',
            // Next, the first change detection (update pass) happens.
            'DoCheck',
            // Then the effect runs.
            'Effect',
        ]);
    });
    it('created in ngOnInit should run with detectChanges()', () => {
        const log = [];
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                    log.push('Ctor');
                }
                ngOnInit() {
                    (0, core_1.effect)(() => {
                        log.push('Effect');
                    }, { injector: this.injector });
                }
                ngDoCheck() {
                    log.push('DoCheck');
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        testing_1.TestBed.createComponent(Cmp).detectChanges();
        expect(log).toEqual([
            // The component gets constructed.
            'Ctor',
            // Next, the first change detection (update pass) happens, which creates the effect and
            // schedules it for execution.
            'DoCheck',
            // Then the effect runs.
            'Effect',
        ]);
    });
    it('will flush effects automatically when using autoDetectChanges', () => __awaiter(void 0, void 0, void 0, function* () {
        const val = (0, core_1.signal)('initial');
        let observed = '';
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                constructor() {
                    (0, core_1.effect)(() => {
                        observed = val();
                    });
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(Cmp);
        fixture.autoDetectChanges();
        expect(observed).toBe('initial');
        val.set('new');
        expect(observed).toBe('initial');
        yield fixture.whenStable();
        expect(observed).toBe('new');
    }));
    it('will run an effect with an input signal on the first CD', () => {
        let observed = null;
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _input_decorators;
            let _input_initializers = [];
            let _input_extraInitializers = [];
            var Cmp = _classThis = class {
                constructor() {
                    this.input = __runInitializers(this, _input_initializers, void 0);
                    __runInitializers(this, _input_extraInitializers);
                    (0, core_1.effect)(() => {
                        observed = this.input;
                    });
                }
            };
            __setFunctionName(_classThis, "Cmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _input_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Cmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Cmp = _classThis;
        })();
        const fix = testing_1.TestBed.createComponent(Cmp);
        fix.componentRef.setInput('input', 'hello');
        fix.detectChanges();
        expect(observed).toBe('hello');
    });
    it('should run root effects before detectChanges() when in zone mode', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [(0, core_1.provideZoneChangeDetection)()],
        });
        const log = [];
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{ sentinel }}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                get sentinel() {
                    log.push('CD');
                    return '';
                }
            };
            __setFunctionName(_classThis, "TestCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmp = _classThis;
        })();
        // Instantiate the component and CD it once.
        const fix = testing_1.TestBed.createComponent(TestCmp);
        fix.detectChanges();
        // Instantiate a root effect and run it once.
        const counter = (0, core_1.signal)(0);
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        (0, core_1.effect)(() => log.push(`effect: ${counter()}`), { injector: appRef.injector });
        yield appRef.whenStable();
        log.length = 0;
        // Trigger the effect and call `detectChanges()` on the fixture.
        counter.set(1);
        fix.detectChanges(false);
        // The effect should run before the component CD.
        expect(log).toEqual(['effect: 1', 'CD']);
    }));
});
