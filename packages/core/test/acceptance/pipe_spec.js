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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('pipe', () => {
    let CountingPipe = (() => {
        let _classDecorators = [(0, core_1.Pipe)({
                name: 'countingPipe',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var CountingPipe = _classThis = class {
            constructor() {
                this.state = 0;
            }
            transform(value) {
                return `${value} state:${this.state++}`;
            }
        };
        __setFunctionName(_classThis, "CountingPipe");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CountingPipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return CountingPipe = _classThis;
    })();
    let MultiArgPipe = (() => {
        let _classDecorators = [(0, core_1.Pipe)({
                name: 'multiArgPipe',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MultiArgPipe = _classThis = class {
            transform(value, arg1, arg2, arg3 = 'default') {
                return `${value} ${arg1} ${arg2} ${arg3}`;
            }
        };
        __setFunctionName(_classThis, "MultiArgPipe");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MultiArgPipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MultiArgPipe = _classThis;
    })();
    it('should support interpolation', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{person.name | countingPipe}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.person = { name: 'bob' };
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, CountingPipe] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('bob state:0');
    });
    it('should support bindings', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-dir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dirProp_decorators;
            let _dirProp_initializers = [];
            let _dirProp_extraInitializers = [];
            var Dir = _classThis = class {
                constructor() {
                    this.dirProp = __runInitializers(this, _dirProp_initializers, '');
                    __runInitializers(this, _dirProp_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dirProp_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _dirProp_decorators, { kind: "field", name: "dirProp", static: false, private: false, access: { has: obj => "dirProp" in obj, get: obj => obj.dirProp, set: (obj, value) => { obj.dirProp = value; } }, metadata: _metadata }, _dirProp_initializers, _dirProp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let DoublePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'double',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DoublePipe = _classThis = class {
                transform(value) {
                    return `${value}${value}`;
                }
            };
            __setFunctionName(_classThis, "DoublePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DoublePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DoublePipe = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div my-dir [dirProp]="'a'|double"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _directive_decorators;
            let _directive_initializers = [];
            let _directive_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.directive = __runInitializers(this, _directive_initializers, void 0);
                    __runInitializers(this, _directive_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _directive_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, DoublePipe, Dir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.componentInstance.directive.dirProp).toBe('aa');
    });
    it('should support arguments in pipes', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{person.name | multiArgPipe:'one':person.address.city}}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.person = { name: 'value', address: { city: 'two' } };
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, MultiArgPipe] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('value one two default');
    });
    it('should support calling pipes with different number of arguments', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{person.name | multiArgPipe:'a':'b'}} {{0 | multiArgPipe:1:2:3}}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.person = { name: 'value' };
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, MultiArgPipe] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('value a b default 0 1 2 3');
    });
    it('should pick a Pipe defined in `declarations` over imported Pipes', () => {
        let PipeA = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'number',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var PipeA = _classThis = class {
                transform(value) {
                    return `PipeA: ${value}`;
                }
            };
            __setFunctionName(_classThis, "PipeA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                PipeA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return PipeA = _classThis;
        })();
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [PipeA],
                    exports: [PipeA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let PipeB = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'number',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var PipeB = _classThis = class {
                transform(value) {
                    return `PipeB: ${value}`;
                }
            };
            __setFunctionName(_classThis, "PipeB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                PipeB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return PipeB = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: '{{ count | number }}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.count = 10;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [ModuleA],
            declarations: [PipeB, App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('PipeB: 10');
    });
    it('should respect imported module order when selecting Pipe (last imported Pipe is used)', () => {
        let PipeA = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'number',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var PipeA = _classThis = class {
                transform(value) {
                    return `PipeA: ${value}`;
                }
            };
            __setFunctionName(_classThis, "PipeA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                PipeA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return PipeA = _classThis;
        })();
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [PipeA],
                    exports: [PipeA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let PipeB = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'number',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var PipeB = _classThis = class {
                transform(value) {
                    return `PipeB: ${value}`;
                }
            };
            __setFunctionName(_classThis, "PipeB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                PipeB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return PipeB = _classThis;
        })();
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [PipeB],
                    exports: [PipeB],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: '{{ count | number }}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.count = 10;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [ModuleA, ModuleB],
            declarations: [App],
        });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('PipeB: 10');
    });
    it('should do nothing when no change', () => {
        let calls = [];
        let IdentityPipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'identityPipe',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var IdentityPipe = _classThis = class {
                transform(value) {
                    calls.push(value);
                    return value;
                }
            };
            __setFunctionName(_classThis, "IdentityPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                IdentityPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return IdentityPipe = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{person.name | identityPipe}}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.person = { name: 'Megatron' };
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, IdentityPipe] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(calls).toEqual(['Megatron']);
        fixture.detectChanges();
        (0, matchers_1.expect)(calls).toEqual(['Megatron']);
    });
    it('should support duplicates by using the later entry', () => {
        let DuplicatePipe1 = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'duplicatePipe',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DuplicatePipe1 = _classThis = class {
                transform(value) {
                    return `${value} from duplicate 1`;
                }
            };
            __setFunctionName(_classThis, "DuplicatePipe1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DuplicatePipe1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DuplicatePipe1 = _classThis;
        })();
        let DuplicatePipe2 = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'duplicatePipe',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DuplicatePipe2 = _classThis = class {
                transform(value) {
                    return `${value} from duplicate 2`;
                }
            };
            __setFunctionName(_classThis, "DuplicatePipe2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DuplicatePipe2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DuplicatePipe2 = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{person.name | duplicatePipe}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.person = { name: 'bob' };
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, DuplicatePipe1, DuplicatePipe2] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('bob from duplicate 2');
    });
    it('should support pipe in context of ternary operator', () => {
        let MyPipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'pipe',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyPipe = _classThis = class {
                transform(value) {
                    return value;
                }
            };
            __setFunctionName(_classThis, "MyPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyPipe = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{ condition ? 'a' : 'b' | pipe }}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.condition = false;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, MyPipe] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('b');
        fixture.componentInstance.condition = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('a');
    });
    // This test uses AOT-generated code, because we can't capture the same behavior that we want
    // when going through `TestBed`. Here we're testing the behavior of AOT-compiled code which
    // differs from the JIT code in `TestBed`, because it includes a `ɵɵgetInheritedFactory` call
    // when the pipe is using inheritance.
    it('should be able to use DI in a Pipe that extends an Injectable', () => {
        let SayHelloService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SayHelloService = _classThis = class {
                getHello() {
                    return 'Hello there';
                }
            };
            __setFunctionName(_classThis, "SayHelloService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SayHelloService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SayHelloService = _classThis;
        })();
        // The generated code corresponds to the following decorator:
        // @Injectable()
        class ParentPipe {
            constructor(sayHelloService) {
                this.sayHelloService = sayHelloService;
            }
        }
        ParentPipe.ɵfac = (t) => new (t || ParentPipe)((0, core_1.ɵɵinject)(SayHelloService));
        ParentPipe.ɵprov = (0, core_1.ɵɵdefineInjectable)({ token: ParentPipe, factory: ParentPipe.ɵfac });
        // The generated code corresponds to the following decorator:
        // @Pipe({name: 'sayHello', pure: true})
        class SayHelloPipe extends ParentPipe {
            transform() {
                return this.sayHelloService.getHello();
            }
        }
        SayHelloPipe.ɵfac = (t) => (0, core_1.ɵɵgetInheritedFactory)(t || SayHelloPipe)(SayHelloPipe);
        SayHelloPipe.ɵpipe = (0, core_1.ɵɵdefinePipe)({
            name: 'sayHello',
            type: SayHelloPipe,
            pure: true,
        });
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app',
                    template: '{{ value | sayHello }}',
                    imports: [SayHelloPipe],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComponent = _classThis = class {
                constructor() {
                    this.value = 'test';
                }
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
        const fixture = testing_1.TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Hello there');
    });
    describe('pure', () => {
        it('should call pure pipes only if the arguments change', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{person.name | countingPipe}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.person = { name: null };
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, CountingPipe] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            // change from undefined -> null
            fixture.componentInstance.person.name = null;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('null state:0');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('null state:0');
            // change from null -> some value
            fixture.componentInstance.person.name = 'bob';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('bob state:1');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('bob state:1');
            // change from some value -> some other value
            fixture.componentInstance.person.name = 'bart';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('bart state:2');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('bart state:2');
        });
    });
    describe('impure', () => {
        let impurePipeInstances = [];
        let CountingImpurePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'countingImpurePipe',
                    pure: false,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CountingImpurePipe = _classThis = class {
                transform(value) {
                    return `${value} state:${this.state++}`;
                }
                constructor() {
                    this.state = 0;
                    impurePipeInstances.push(this);
                }
            };
            __setFunctionName(_classThis, "CountingImpurePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CountingImpurePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CountingImpurePipe = _classThis;
        })();
        beforeEach(() => (impurePipeInstances = []));
        afterEach(() => (impurePipeInstances = []));
        it('should call impure pipes on each change detection run', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{person.name | countingImpurePipe}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.person = { name: 'bob' };
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, CountingImpurePipe] });
            const fixture = testing_1.TestBed.createComponent(App);
            const pipe = impurePipeInstances[0];
            spyOn(pipe, 'transform').and.returnValue('');
            (0, matchers_1.expect)(pipe.transform).not.toHaveBeenCalled();
            fixture.detectChanges();
            (0, matchers_1.expect)(pipe.transform).toHaveBeenCalledTimes(2);
            fixture.detectChanges();
            (0, matchers_1.expect)(pipe.transform).toHaveBeenCalledTimes(4);
        });
        it('should not cache impure pipes', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div [id]="0 | countingImpurePipe">{{1 | countingImpurePipe}}</div>
          <div [id]="2 | countingImpurePipe">{{3 | countingImpurePipe}}</div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, CountingImpurePipe] });
            testing_1.TestBed.createComponent(App);
            (0, matchers_1.expect)(impurePipeInstances.length).toEqual(4);
            (0, matchers_1.expect)(impurePipeInstances[0]).toBeInstanceOf(CountingImpurePipe);
            (0, matchers_1.expect)(impurePipeInstances[1]).toBeInstanceOf(CountingImpurePipe);
            (0, matchers_1.expect)(impurePipeInstances[1]).not.toBe(impurePipeInstances[0]);
            (0, matchers_1.expect)(impurePipeInstances[2]).toBeInstanceOf(CountingImpurePipe);
            (0, matchers_1.expect)(impurePipeInstances[2]).not.toBe(impurePipeInstances[0]);
            (0, matchers_1.expect)(impurePipeInstances[3]).toBeInstanceOf(CountingImpurePipe);
            (0, matchers_1.expect)(impurePipeInstances[3]).not.toBe(impurePipeInstances[0]);
        });
    });
    describe('lifecycles', () => {
        it('should call ngOnDestroy on pipes', () => {
            let destroyCalls = 0;
            let PipeWithOnDestroy = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'pipeWithOnDestroy',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var PipeWithOnDestroy = _classThis = class {
                    ngOnDestroy() {
                        destroyCalls++;
                    }
                    transform(value) {
                        return null;
                    }
                };
                __setFunctionName(_classThis, "PipeWithOnDestroy");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    PipeWithOnDestroy = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return PipeWithOnDestroy = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{1 | pipeWithOnDestroy}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, PipeWithOnDestroy] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.destroy();
            (0, matchers_1.expect)(destroyCalls).toBe(1);
        });
    });
    describe('injection mechanism', () => {
        it('should be able to handle Service injection', () => {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.title = 'Service Title';
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            let ConcatPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'myConcatPipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ConcatPipe = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
                    transform(value) {
                        return `${value} - ${this.service.title}`;
                    }
                };
                __setFunctionName(_classThis, "ConcatPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ConcatPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ConcatPipe = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{title | myConcatPipe}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.title = 'MyComponent Title';
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, ConcatPipe], providers: [Service] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('MyComponent Title - Service Title');
        });
        it('should be able to handle Token injections', () => {
            class Service {
                constructor() {
                    this.title = 'Service Title';
                }
            }
            const token = new core_1.InjectionToken('service token');
            let ConcatPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'myConcatPipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ConcatPipe = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
                    transform(value) {
                        return `${value} - ${this.service.title}`;
                    }
                };
                __setFunctionName(_classThis, "ConcatPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ConcatPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ConcatPipe = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{title | myConcatPipe}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.title = 'MyComponent Title';
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, ConcatPipe],
                providers: [{ provide: token, useValue: new Service() }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('MyComponent Title - Service Title');
        });
        it('should be able to handle Module injection', () => {
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.title = 'Service Title';
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            let ConcatPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'myConcatPipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ConcatPipe = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
                    transform(value) {
                        return `${value} - ${this.service.title}`;
                    }
                };
                __setFunctionName(_classThis, "ConcatPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ConcatPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ConcatPipe = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{title | myConcatPipe}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.title = 'MyComponent Title';
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, ConcatPipe], imports: [SomeModule] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('MyComponent Title - Service Title');
        });
        it('should inject the ChangeDetectorRef of the containing view when using pipe inside a component input', () => {
            let pipeChangeDetectorRef;
            let SomeComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        selector: 'some-comp',
                        template: 'Inner value: "{{displayValue}}"',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var SomeComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, void 0);
                        this.displayValue = (__runInitializers(this, _value_extraInitializers), 0);
                    }
                };
                __setFunctionName(_classThis, "SomeComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: `
              <some-comp [value]="pipeValue | testPipe"></some-comp>
              Outer value: "{{displayValue}}"
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _something_decorators;
                let _something_initializers = [];
                let _something_extraInitializers = [];
                let _comp_decorators;
                let _comp_initializers = [];
                let _comp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.something = __runInitializers(this, _something_initializers, void 0);
                        this.comp = (__runInitializers(this, _something_extraInitializers), __runInitializers(this, _comp_initializers, void 0));
                        this.pipeValue = (__runInitializers(this, _comp_extraInitializers), 10);
                        this.displayValue = 0;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _something_decorators = [(0, core_1.Input)()];
                    _comp_decorators = [(0, core_1.ViewChild)(SomeComp)];
                    __esDecorate(null, null, _something_decorators, { kind: "field", name: "something", static: false, private: false, access: { has: obj => "something" in obj, get: obj => obj.something, set: (obj, value) => { obj.something = value; } }, metadata: _metadata }, _something_initializers, _something_extraInitializers);
                    __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let TestPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'testPipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestPipe = _classThis = class {
                    constructor(changeDetectorRef) {
                        pipeChangeDetectorRef = changeDetectorRef;
                    }
                    transform() {
                        return '';
                    }
                };
                __setFunctionName(_classThis, "TestPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestPipe = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, SomeComp, TestPipe] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.displayValue = 1;
            fixture.componentInstance.comp.displayValue = 1;
            pipeChangeDetectorRef.markForCheck();
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('Outer value: "1"');
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('Inner value: "0"');
        });
        it('should inject the ChangeDetectorRef of the containing view when using pipe inside a component input which has child nodes', () => {
            let pipeChangeDetectorRef;
            let SomeComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        selector: 'some-comp',
                        template: 'Inner value: "{{displayValue}}" <ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var SomeComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, void 0);
                        this.displayValue = (__runInitializers(this, _value_extraInitializers), 0);
                    }
                };
                __setFunctionName(_classThis, "SomeComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: `
              <some-comp [value]="pipeValue | testPipe">
                <div>Hello</div>
              </some-comp>
              Outer value: "{{displayValue}}"
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _something_decorators;
                let _something_initializers = [];
                let _something_extraInitializers = [];
                let _comp_decorators;
                let _comp_initializers = [];
                let _comp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.something = __runInitializers(this, _something_initializers, void 0);
                        this.comp = (__runInitializers(this, _something_extraInitializers), __runInitializers(this, _comp_initializers, void 0));
                        this.pipeValue = (__runInitializers(this, _comp_extraInitializers), 10);
                        this.displayValue = 0;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _something_decorators = [(0, core_1.Input)()];
                    _comp_decorators = [(0, core_1.ViewChild)(SomeComp)];
                    __esDecorate(null, null, _something_decorators, { kind: "field", name: "something", static: false, private: false, access: { has: obj => "something" in obj, get: obj => obj.something, set: (obj, value) => { obj.something = value; } }, metadata: _metadata }, _something_initializers, _something_extraInitializers);
                    __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let TestPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'testPipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestPipe = _classThis = class {
                    constructor(changeDetectorRef) {
                        pipeChangeDetectorRef = changeDetectorRef;
                    }
                    transform() {
                        return '';
                    }
                };
                __setFunctionName(_classThis, "TestPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestPipe = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, SomeComp, TestPipe] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.displayValue = 1;
            fixture.componentInstance.comp.displayValue = 1;
            pipeChangeDetectorRef.markForCheck();
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('Outer value: "1"');
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('Inner value: "0"');
        });
    });
    describe('pure pipe error handling', () => {
        it('should not re-invoke pure pipes if it fails initially', () => {
            let ThrowPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'throwPipe',
                        pure: true,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ThrowPipe = _classThis = class {
                    transform() {
                        throw new Error('ThrowPipeError');
                    }
                };
                __setFunctionName(_classThis, "ThrowPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ThrowPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ThrowPipe = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `{{val | throwPipe}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.val = 'anything';
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [App, ThrowPipe],
            }).createComponent(App);
            // first invocation
            (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(/ThrowPipeError/);
            // second invocation - should not throw
            fixture.detectChanges();
        });
        it('should display the last known result from a pure pipe when it throws', () => {
            let ThrowPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'throwPipe',
                        pure: true,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ThrowPipe = _classThis = class {
                    transform(value) {
                        if (value === 'KO') {
                            throw new Error('ThrowPipeError');
                        }
                        else {
                            return value;
                        }
                    }
                };
                __setFunctionName(_classThis, "ThrowPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ThrowPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ThrowPipe = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `{{val | throwPipe}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.val = 'anything';
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [App, ThrowPipe],
            }).createComponent(App);
            // first invocation - no error thrown
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('anything');
            // second invocation when the error is thrown
            fixture.componentInstance.val = 'KO';
            (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(/ThrowPipeError/);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('anything');
            // third invocation with no changes to input - should not thrown and preserve the last known
            // results
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('anything');
        });
        describe('pure pipe error handling with multiple arguments', () => {
            const args = new Array(10).fill(':0');
            for (let numberOfPipeArgs = 0; numberOfPipeArgs < args.length; numberOfPipeArgs++) {
                it(`should not invoke ${numberOfPipeArgs} argument pure pipe second time if it throws unless input changes`, () => {
                    // https://stackblitz.com/edit/angular-mbx2pg
                    const log = [];
                    let ThrowPipe = (() => {
                        let _classDecorators = [(0, core_1.Pipe)({
                                name: 'throw',
                                pure: true,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ThrowPipe = _classThis = class {
                            transform() {
                                log.push('throw');
                                throw new Error('ThrowPipeError');
                            }
                        };
                        __setFunctionName(_classThis, "ThrowPipe");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ThrowPipe = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ThrowPipe = _classThis;
                    })();
                    let App = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `{{val | throw${args.slice(0, numberOfPipeArgs).join('')}}}`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var App = _classThis = class {
                            constructor() {
                                this.val = 'anything';
                            }
                        };
                        __setFunctionName(_classThis, "App");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            App = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return App = _classThis;
                    })();
                    const fixture = testing_1.TestBed.configureTestingModule({
                        declarations: [App, ThrowPipe],
                    }).createComponent(App);
                    // First invocation of detect changes should throw.
                    (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(/ThrowPipeError/);
                    (0, matchers_1.expect)(log).toEqual(['throw']);
                    // Second invocation should not throw as input to the `throw` pipe has not changed and
                    // the pipe is pure.
                    log.length = 0;
                    (0, matchers_1.expect)(() => fixture.detectChanges()).not.toThrow();
                    (0, matchers_1.expect)(log).toEqual([]);
                    fixture.componentInstance.val = 'change';
                    // First invocation of detect changes should throw because the input changed.
                    (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(/ThrowPipeError/);
                    (0, matchers_1.expect)(log).toEqual(['throw']);
                    // Second invocation should not throw as input to the `throw` pipe has not changed and
                    // the pipe is pure.
                    log.length = 0;
                    (0, matchers_1.expect)(() => fixture.detectChanges()).not.toThrow();
                    (0, matchers_1.expect)(log).toEqual([]);
                });
            }
        });
    });
    [false, true].forEach((componentIsStandalone) => {
        const expectedThrowRegex = new RegExp("The pipe 'testMissingPipe' could not be found in the 'TestComponent' component." +
            (componentIsStandalone
                ? " Verify that it is included in the '@Component.imports' of this component"
                : ' Verify that it is declared or imported in this module'));
        describe(`missing pipe detection logic (inside ${componentIsStandalone ? '' : 'non-'}standalone component)`, () => {
            it(`should throw an error if a pipe is not found in a component`, () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '{{ 1 | testMissingPipe }}',
                            standalone: componentIsStandalone,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
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
                if (!componentIsStandalone) {
                    testing_1.TestBed.configureTestingModule({ declarations: [TestComponent] });
                }
                (0, matchers_1.expect)(() => {
                    const fixture = testing_1.TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                }).toThrowError(expectedThrowRegex);
            });
            it('should throw an error if a pipe is not found inside an inline template', () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign({ template: `
            <ng-container *ngIf="true">
              {{ value | testMissingPipe }}
            </ng-container>`, standalone: componentIsStandalone }, (componentIsStandalone ? { imports: [common_1.CommonModule] } : {})))];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.value = 'test';
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
                if (!componentIsStandalone) {
                    testing_1.TestBed.configureTestingModule({ declarations: [TestComponent] });
                }
                (0, matchers_1.expect)(() => {
                    const fixture = testing_1.TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                }).toThrowError(expectedThrowRegex);
            });
            it('should throw an error if a pipe is not found inside a projected content', () => {
                let TestChildComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app-test-child',
                            template: '<ng-content></ng-content>',
                            standalone: componentIsStandalone,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestChildComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "TestChildComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestChildComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestChildComponent = _classThis;
                })();
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign({ template: `
            <app-test-child>
              {{ value | testMissingPipe }}
            </app-test-child>`, standalone: componentIsStandalone }, (componentIsStandalone ? { imports: [TestChildComponent] } : {})))];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.value = 'test';
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
                if (!componentIsStandalone) {
                    testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TestChildComponent] });
                }
                (0, matchers_1.expect)(() => {
                    const fixture = testing_1.TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                }).toThrowError(expectedThrowRegex);
            });
            it('should throw an error if a pipe is not found inside a projected content in an inline template', () => {
                let TestChildComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app-test-child',
                            template: '<ng-content></ng-content>',
                            standalone: componentIsStandalone,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestChildComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "TestChildComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestChildComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestChildComponent = _classThis;
                })();
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign({ template: `
              <app-test-child>
                <ng-container *ngIf="true">
                  {{ value | testMissingPipe }}
                </ng-container>
              </app-test-child>`, standalone: componentIsStandalone }, (componentIsStandalone ? { imports: [TestChildComponent, common_1.CommonModule] } : {})))];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.value = 'test';
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
                if (!componentIsStandalone) {
                    testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TestChildComponent] });
                }
                (0, matchers_1.expect)(() => {
                    const fixture = testing_1.TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                }).toThrowError(expectedThrowRegex);
            });
            it('should throw an error if a pipe is not found in a property binding', () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div [title]="value | testMissingPipe"></div>',
                            standalone: componentIsStandalone,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.value = 'test';
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
                if (!componentIsStandalone) {
                    testing_1.TestBed.configureTestingModule({ declarations: [TestComponent] });
                }
                (0, matchers_1.expect)(() => {
                    const fixture = testing_1.TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                }).toThrowError(expectedThrowRegex);
            });
            it('should throw an error if a pipe is not found inside a structural directive input', () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign({ template: '<div *ngIf="isVisible | testMissingPipe"></div>', standalone: componentIsStandalone }, (componentIsStandalone ? { imports: [common_1.CommonModule] } : {})))];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.isVisible = true;
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
                if (!componentIsStandalone) {
                    testing_1.TestBed.configureTestingModule({ declarations: [TestComponent] });
                }
                (0, matchers_1.expect)(() => {
                    const fixture = testing_1.TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                }).toThrowError(expectedThrowRegex);
            });
        });
    });
});
