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
const testing_1 = require("@angular/core/testing");
(function () {
    describe('lifecycle hooks examples', () => {
        it('should work with ngOnInit', () => {
            // #docregion OnInit
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    ngOnInit() {
                        // ...
                    }
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
            // #enddocregion
            expect(createAndLogComponent(MyComponent)).toEqual([['ngOnInit', []]]);
        });
        it('should work with ngDoCheck', () => {
            // #docregion DoCheck
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    ngDoCheck() {
                        // ...
                    }
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
            // #enddocregion
            expect(createAndLogComponent(MyComponent)).toEqual([['ngDoCheck', []]]);
        });
        it('should work with ngAfterContentChecked', () => {
            // #docregion AfterContentChecked
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    ngAfterContentChecked() {
                        // ...
                    }
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
            // #enddocregion
            expect(createAndLogComponent(MyComponent)).toEqual([['ngAfterContentChecked', []]]);
        });
        it('should work with ngAfterContentInit', () => {
            // #docregion AfterContentInit
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    ngAfterContentInit() {
                        // ...
                    }
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
            // #enddocregion
            expect(createAndLogComponent(MyComponent)).toEqual([['ngAfterContentInit', []]]);
        });
        it('should work with ngAfterViewChecked', () => {
            // #docregion AfterViewChecked
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    ngAfterViewChecked() {
                        // ...
                    }
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
            // #enddocregion
            expect(createAndLogComponent(MyComponent)).toEqual([['ngAfterViewChecked', []]]);
        });
        it('should work with ngAfterViewInit', () => {
            // #docregion AfterViewInit
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    ngAfterViewInit() {
                        // ...
                    }
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
            // #enddocregion
            expect(createAndLogComponent(MyComponent)).toEqual([['ngAfterViewInit', []]]);
        });
        it('should work with ngOnDestroy', () => {
            // #docregion OnDestroy
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    ngOnDestroy() {
                        // ...
                    }
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
            // #enddocregion
            expect(createAndLogComponent(MyComponent)).toEqual([['ngOnDestroy', []]]);
        });
        it('should work with ngOnChanges', () => {
            // #docregion OnChanges
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _prop_decorators;
                let _prop_initializers = [];
                let _prop_extraInitializers = [];
                var MyComponent = _classThis = class {
                    ngOnChanges(changes) {
                        // changes.prop contains the old and the new value...
                    }
                    constructor() {
                        this.prop = __runInitializers(this, _prop_initializers, 0);
                        __runInitializers(this, _prop_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _prop_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _prop_decorators, { kind: "field", name: "prop", static: false, private: false, access: { has: obj => "prop" in obj, get: obj => obj.prop, set: (obj, value) => { obj.prop = value; } }, metadata: _metadata }, _prop_initializers, _prop_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComponent = _classThis;
            })();
            // #enddocregion
            const log = createAndLogComponent(MyComponent, ['prop']);
            expect(log.length).toBe(1);
            expect(log[0][0]).toBe('ngOnChanges');
            const changes = log[0][1][0];
            expect(changes['prop'].currentValue).toBe(true);
        });
    });
    function createAndLogComponent(clazz, inputs = []) {
        const log = [];
        createLoggingSpiesFromProto(clazz, log);
        const inputBindings = inputs.map((input) => `[${input}] = true`).join(' ');
        let ParentComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<my-cmp ${inputBindings}></my-cmp>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "ParentComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.configureTestingModule({
            declarations: [ParentComponent, clazz],
        }).createComponent(ParentComponent);
        fixture.detectChanges();
        fixture.destroy();
        return log;
    }
    function createLoggingSpiesFromProto(clazz, log) {
        const proto = clazz.prototype;
        // For ES2015+ classes, members are not enumerable in the prototype.
        Object.getOwnPropertyNames(proto).forEach((method) => {
            if (method === 'constructor') {
                return;
            }
            proto[method] = (...args) => {
                log.push([method, args]);
            };
        });
    }
})();
