"use strict";
/*!
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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const discovery_utils_1 = require("../../src/render3/util/discovery_utils");
describe('host directives', () => {
    it('should apply a basic host directive', () => {
        const logs = [];
        let HostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    host: { 'host-dir-attr': '', 'class': 'host-dir', 'style': 'height: 50px' },
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostDir = _classThis = class {
                constructor() {
                    logs.push('HostDir');
                }
            };
            __setFunctionName(_classThis, "HostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostDir = _classThis;
        })();
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    host: { 'host-attr': '', 'class': 'dir', 'style': 'width: 50px' },
                    hostDirectives: [HostDir],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    logs.push('Dir');
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div dir></div>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(logs).toEqual(['HostDir', 'Dir']);
        expect(fixture.nativeElement.innerHTML).toBe('<div host-dir-attr="" host-attr="" dir="" ' +
            'class="host-dir dir" style="height: 50px; width: 50px;"></div>');
    });
    it('should apply a host directive referenced through a forwardRef', () => {
        const logs = [];
        // This directive was "compiled" manually, because our tests are JIT-compiled and the JIT
        // compiler doesn't produce the callback-based variant of the `ɵɵHostDirectivesFeature`.
        // This represents the following metadata:
        // @Directive({
        //   selector: '[dir]',
        //   hostDirectives: [forwardRef(() => HostDir), {directive: forwardRef(() => OtherHostDir)}],
        //   standalone: false,
        // })
        class Dir {
            constructor() {
                logs.push('Dir');
            }
        }
        Dir.ɵfac = () => new Dir();
        Dir.ɵdir = (0, core_1.ɵɵdefineDirective)({
            type: Dir,
            selectors: [['', 'dir', '']],
            standalone: false,
            features: [(0, core_1.ɵɵHostDirectivesFeature)(() => [HostDir, { directive: OtherHostDir }])],
        });
        let OtherHostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OtherHostDir = _classThis = class {
                constructor() {
                    logs.push('OtherHostDir');
                }
            };
            __setFunctionName(_classThis, "OtherHostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherHostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherHostDir = _classThis;
        })();
        let HostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostDir = _classThis = class {
                constructor() {
                    logs.push('HostDir');
                }
            };
            __setFunctionName(_classThis, "HostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div dir></div>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(logs).toEqual(['HostDir', 'OtherHostDir', 'Dir']);
    });
    it('should apply a directive that references host directives through a forwardRef and is injected by its host directives', () => {
        // This directive was "compiled" manually, because our tests are JIT-compiled and the JIT
        // compiler doesn't produce the callback-based variant of the `ɵɵHostDirectivesFeature`.
        // This represents the following metadata:
        // @Directive({
        //   selector: '[dir]',
        //   hostDirectives: [forwardRef(() => HostDir), {directive: forwardRef(() => OtherHostDir)}],
        //   standalone: false,
        //   host: {'one': 'override', 'two': 'override'}
        // })
        class Dir {
        }
        Dir.ɵfac = () => new Dir();
        Dir.ɵdir = (0, core_1.ɵɵdefineDirective)({
            type: Dir,
            selectors: [['', 'dir', '']],
            standalone: false,
            hostAttrs: ['one', 'override', 'two', 'override'],
            features: [(0, core_1.ɵɵHostDirectivesFeature)(() => [HostDir, { directive: OtherHostDir }])],
        });
        let OtherHostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ host: { 'one': 'base' } })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OtherHostDir = _classThis = class {
                constructor() {
                    (0, core_1.inject)(Dir);
                }
            };
            __setFunctionName(_classThis, "OtherHostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherHostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherHostDir = _classThis;
        })();
        let HostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ host: { 'two': 'base' } })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostDir = _classThis = class {
                constructor() {
                    (0, core_1.inject)(Dir);
                }
            };
            __setFunctionName(_classThis, "HostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div dir></div>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        // Note: we can't use the constructor call order here to determine the initialization order,
        // because the act of injecting `Dir` will cause it to be created earlier than its host bindings
        // will be invoked. Instead we check that the host bindings apply in the right order.
        const host = fixture.nativeElement.querySelector('[dir]');
        expect(host.getAttribute('one')).toBe('override');
        expect(host.getAttribute('two')).toBe('override');
    });
    it('should apply a chain of host directives', () => {
        const logs = [];
        const token = new core_1.InjectionToken('message');
        let diTokenValue;
        let Chain1_3 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    host: {
                        'class': 'leaf',
                        'id': 'leaf-id',
                    },
                    providers: [{ provide: token, useValue: 'leaf value' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Chain1_3 = _classThis = class {
                constructor(tokenValue) {
                    diTokenValue = tokenValue;
                    logs.push('Chain1 - level 3');
                }
            };
            __setFunctionName(_classThis, "Chain1_3");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Chain1_3 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Chain1_3 = _classThis;
        })();
        let Chain1_2 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    hostDirectives: [Chain1_3],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Chain1_2 = _classThis = class {
                constructor() {
                    logs.push('Chain1 - level 2');
                }
            };
            __setFunctionName(_classThis, "Chain1_2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Chain1_2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Chain1_2 = _classThis;
        })();
        let Chain1 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    hostDirectives: [Chain1_2],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Chain1 = _classThis = class {
                constructor() {
                    logs.push('Chain1 - level 1');
                }
            };
            __setFunctionName(_classThis, "Chain1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Chain1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Chain1 = _classThis;
        })();
        let Chain2_2 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    host: {
                        'class': 'middle',
                        'id': 'middle-id',
                    },
                    providers: [{ provide: token, useValue: 'middle value' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Chain2_2 = _classThis = class {
                constructor() {
                    logs.push('Chain2 - level 2');
                }
            };
            __setFunctionName(_classThis, "Chain2_2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Chain2_2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Chain2_2 = _classThis;
        })();
        let Chain2 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    hostDirectives: [Chain2_2],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Chain2 = _classThis = class {
                constructor() {
                    logs.push('Chain2 - level 1');
                }
            };
            __setFunctionName(_classThis, "Chain2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Chain2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Chain2 = _classThis;
        })();
        let Chain3_2 = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Chain3_2 = _classThis = class {
                constructor() {
                    logs.push('Chain3 - level 2');
                }
            };
            __setFunctionName(_classThis, "Chain3_2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Chain3_2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Chain3_2 = _classThis;
        })();
        let Chain3 = (() => {
            let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [Chain3_2] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Chain3 = _classThis = class {
                constructor() {
                    logs.push('Chain3 - level 1');
                }
            };
            __setFunctionName(_classThis, "Chain3");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Chain3 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Chain3 = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    host: {
                        'class': 'host',
                        'id': 'host-id',
                    },
                    template: '',
                    hostDirectives: [Chain1, Chain2, Chain3],
                    providers: [{ provide: token, useValue: 'host value' }],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    logs.push('MyComp');
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        let SelectorMatchedHostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SelectorMatchedHostDir = _classThis = class {
                constructor() {
                    logs.push('SelectorMatchedHostDir');
                }
            };
            __setFunctionName(_classThis, "SelectorMatchedHostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SelectorMatchedHostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SelectorMatchedHostDir = _classThis;
        })();
        let SelectorMatchedDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[selector-matched-dir]',
                    hostDirectives: [SelectorMatchedHostDir],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SelectorMatchedDir = _classThis = class {
                constructor() {
                    logs.push('SelectorMatchedDir');
                }
            };
            __setFunctionName(_classThis, "SelectorMatchedDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SelectorMatchedDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SelectorMatchedDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<my-comp selector-matched-dir></my-comp>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, MyComp, SelectorMatchedDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(diTokenValue).toBe('host value');
        expect(fixture.nativeElement.innerHTML).toBe('<my-comp id="host-id" selector-matched-dir="" class="leaf middle host"></my-comp>');
        expect(logs).toEqual([
            'Chain1 - level 3',
            'Chain1 - level 2',
            'Chain1 - level 1',
            'Chain2 - level 2',
            'Chain2 - level 1',
            'Chain3 - level 2',
            'Chain3 - level 1',
            'MyComp',
            'SelectorMatchedHostDir',
            'SelectorMatchedDir',
        ]);
    });
    it('should be able to query for the host directives', () => {
        let hostInstance;
        let firstHostDirInstance;
        let secondHostDirInstance;
        let SecondHostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SecondHostDir = _classThis = class {
                constructor() {
                    secondHostDirInstance = this;
                }
            };
            __setFunctionName(_classThis, "SecondHostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SecondHostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SecondHostDir = _classThis;
        })();
        let FirstHostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [SecondHostDir] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var FirstHostDir = _classThis = class {
                constructor() {
                    firstHostDirInstance = this;
                }
            };
            __setFunctionName(_classThis, "FirstHostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                FirstHostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return FirstHostDir = _classThis;
        })();
        let Host = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    hostDirectives: [FirstHostDir],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Host = _classThis = class {
                constructor() {
                    hostInstance = this;
                }
            };
            __setFunctionName(_classThis, "Host");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Host = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Host = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div dir></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _firstHost_decorators;
            let _firstHost_initializers = [];
            let _firstHost_extraInitializers = [];
            let _secondHost_decorators;
            let _secondHost_initializers = [];
            let _secondHost_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.firstHost = __runInitializers(this, _firstHost_initializers, void 0);
                    this.secondHost = (__runInitializers(this, _firstHost_extraInitializers), __runInitializers(this, _secondHost_initializers, void 0));
                    __runInitializers(this, _secondHost_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _firstHost_decorators = [(0, core_1.ViewChild)(FirstHostDir)];
                _secondHost_decorators = [(0, core_1.ViewChild)(SecondHostDir)];
                __esDecorate(null, null, _firstHost_decorators, { kind: "field", name: "firstHost", static: false, private: false, access: { has: obj => "firstHost" in obj, get: obj => obj.firstHost, set: (obj, value) => { obj.firstHost = value; } }, metadata: _metadata }, _firstHost_initializers, _firstHost_extraInitializers);
                __esDecorate(null, null, _secondHost_decorators, { kind: "field", name: "secondHost", static: false, private: false, access: { has: obj => "secondHost" in obj, get: obj => obj.secondHost, set: (obj, value) => { obj.secondHost = value; } }, metadata: _metadata }, _secondHost_initializers, _secondHost_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, Host] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(hostInstance instanceof Host).toBe(true);
        expect(firstHostDirInstance instanceof FirstHostDir).toBe(true);
        expect(secondHostDirInstance instanceof SecondHostDir).toBe(true);
        expect(fixture.componentInstance.firstHost).toBe(firstHostDirInstance);
        expect(fixture.componentInstance.secondHost).toBe(secondHostDirInstance);
    });
    it('should be able to reference exported host directives', () => {
        let SecondHostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ exportAs: 'secondHost' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SecondHostDir = _classThis = class {
                constructor() {
                    this.name = 'SecondHost';
                }
            };
            __setFunctionName(_classThis, "SecondHostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SecondHostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SecondHostDir = _classThis;
        })();
        let FirstHostDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [SecondHostDir], exportAs: 'firstHost' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var FirstHostDir = _classThis = class {
                constructor() {
                    this.name = 'FirstHost';
                }
            };
            __setFunctionName(_classThis, "FirstHostDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                FirstHostDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return FirstHostDir = _classThis;
        })();
        let Host = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    hostDirectives: [FirstHostDir],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Host = _classThis = class {
            };
            __setFunctionName(_classThis, "Host");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Host = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Host = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div
          dir
          #firstHost="firstHost"
          #secondHost="secondHost">{{firstHost.name}} | {{secondHost.name}}</div>
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Host] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('FirstHost | SecondHost');
    });
    it('should execute inherited host directives in the correct order', () => {
        const logs = [];
        let HostGrandparent_1 = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostGrandparent_1 = _classThis = class {
                constructor() {
                    logs.push('HostGrandparent_1');
                }
            };
            __setFunctionName(_classThis, "HostGrandparent_1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostGrandparent_1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostGrandparent_1 = _classThis;
        })();
        let HostGrandparent_2 = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostGrandparent_2 = _classThis = class {
                constructor() {
                    logs.push('HostGrandparent_2');
                }
            };
            __setFunctionName(_classThis, "HostGrandparent_2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostGrandparent_2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostGrandparent_2 = _classThis;
        })();
        let Grandparent = (() => {
            let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [HostGrandparent_1, HostGrandparent_2] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Grandparent = _classThis = class {
                constructor() {
                    logs.push('Grandparent');
                }
            };
            __setFunctionName(_classThis, "Grandparent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Grandparent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Grandparent = _classThis;
        })();
        let HostParent_1 = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostParent_1 = _classThis = class {
                constructor() {
                    logs.push('HostParent_1');
                }
            };
            __setFunctionName(_classThis, "HostParent_1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostParent_1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostParent_1 = _classThis;
        })();
        let HostParent_2 = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostParent_2 = _classThis = class {
                constructor() {
                    logs.push('HostParent_2');
                }
            };
            __setFunctionName(_classThis, "HostParent_2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostParent_2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostParent_2 = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [HostParent_1, HostParent_2] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = Grandparent;
            var Parent = _classThis = class extends _classSuper {
                constructor() {
                    super();
                    logs.push('Parent');
                }
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let HostDir_1 = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostDir_1 = _classThis = class {
                constructor() {
                    logs.push('HostDir_1');
                }
            };
            __setFunctionName(_classThis, "HostDir_1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostDir_1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostDir_1 = _classThis;
        })();
        let HostDir_2 = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HostDir_2 = _classThis = class {
                constructor() {
                    logs.push('HostDir_2');
                }
            };
            __setFunctionName(_classThis, "HostDir_2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HostDir_2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HostDir_2 = _classThis;
        })();
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    hostDirectives: [HostDir_1, HostDir_2],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = Parent;
            var Dir = _classThis = class extends _classSuper {
                constructor() {
                    super();
                    logs.push('Dir');
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div dir></div>',
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(logs).toEqual([
            'HostGrandparent_1',
            'HostGrandparent_2',
            'HostParent_1',
            'HostParent_2',
            'HostDir_1',
            'HostDir_2',
            'Grandparent',
            'Parent',
            'Dir',
        ]);
    });
    describe('lifecycle hooks', () => {
        it('should invoke lifecycle hooks from the host directives', () => {
            const logs = [];
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    ngOnInit() {
                        logs.push('HostDir - ngOnInit');
                    }
                    ngAfterViewInit() {
                        logs.push('HostDir - ngAfterViewInit');
                    }
                    ngAfterViewChecked() {
                        logs.push('HostDir - ngAfterViewChecked');
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let OtherHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OtherHostDir = _classThis = class {
                    ngOnInit() {
                        logs.push('OtherHostDir - ngOnInit');
                    }
                    ngAfterViewInit() {
                        logs.push('OtherHostDir - ngAfterViewInit');
                    }
                    ngAfterViewChecked() {
                        logs.push('OtherHostDir - ngAfterViewChecked');
                    }
                };
                __setFunctionName(_classThis, "OtherHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir, OtherHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    ngOnInit() {
                        logs.push('Dir - ngOnInit');
                    }
                    ngAfterViewInit() {
                        logs.push('Dir - ngAfterViewInit');
                    }
                    ngAfterViewChecked() {
                        logs.push('Dir - ngAfterViewChecked');
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(logs).toEqual([
                'HostDir - ngOnInit',
                'OtherHostDir - ngOnInit',
                'Dir - ngOnInit',
                'HostDir - ngAfterViewInit',
                'HostDir - ngAfterViewChecked',
                'OtherHostDir - ngAfterViewInit',
                'OtherHostDir - ngAfterViewChecked',
                'Dir - ngAfterViewInit',
                'Dir - ngAfterViewChecked',
            ]);
        });
        // Note: lifecycle hook order is different when components and directives are mixed so this
        // test aims to cover it. Usually lifecycle hooks are invoked based on the order in which
        // directives were matched, but components bypass this logic and always execute first.
        it('should invoke host directive lifecycle hooks before the host component hooks', () => {
            const logs = [];
            // Utility so we don't have to repeat the logging code.
            let LogsLifecycles = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LogsLifecycles = _classThis = class {
                    ngOnInit() {
                        logs.push(`${this.name} - ngOnInit`);
                    }
                    ngAfterViewInit() {
                        logs.push(`${this.name} - ngAfterViewInit`);
                    }
                };
                __setFunctionName(_classThis, "LogsLifecycles");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LogsLifecycles = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LogsLifecycles = _classThis;
            })();
            let ChildHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var ChildHostDir = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'ChildHostDir';
                    }
                };
                __setFunctionName(_classThis, "ChildHostDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildHostDir = _classThis;
            })();
            let OtherChildHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var OtherChildHostDir = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'OtherChildHostDir';
                    }
                };
                __setFunctionName(_classThis, "OtherChildHostDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherChildHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherChildHostDir = _classThis;
            })();
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        hostDirectives: [ChildHostDir, OtherChildHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var Child = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'Child';
                    }
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let ParentHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var ParentHostDir = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'ParentHostDir';
                    }
                };
                __setFunctionName(_classThis, "ParentHostDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentHostDir = _classThis;
            })();
            let OtherParentHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var OtherParentHostDir = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'OtherParentHostDir';
                    }
                };
                __setFunctionName(_classThis, "OtherParentHostDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherParentHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherParentHostDir = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        hostDirectives: [ParentHostDir, OtherParentHostDir],
                        template: '<child plain-dir="PlainDir on child"></child>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var Parent = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            let PlainDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[plain-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                let _name_decorators;
                let _name_initializers = [];
                let _name_extraInitializers = [];
                var PlainDir = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = __runInitializers(this, _name_initializers, '');
                        __runInitializers(this, _name_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "PlainDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _name_decorators = [(0, core_1.Input)('plain-dir')];
                    __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    PlainDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return PlainDir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<parent plain-dir="PlainDir on parent"></parent>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Parent, Child, PlainDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(logs).toEqual([
                'ParentHostDir - ngOnInit',
                'OtherParentHostDir - ngOnInit',
                'Parent - ngOnInit',
                'PlainDir on parent - ngOnInit',
                'ChildHostDir - ngOnInit',
                'OtherChildHostDir - ngOnInit',
                'Child - ngOnInit',
                'PlainDir on child - ngOnInit',
                'ChildHostDir - ngAfterViewInit',
                'OtherChildHostDir - ngAfterViewInit',
                'Child - ngAfterViewInit',
                'PlainDir on child - ngAfterViewInit',
                'ParentHostDir - ngAfterViewInit',
                'OtherParentHostDir - ngAfterViewInit',
                'Parent - ngAfterViewInit',
                'PlainDir on parent - ngAfterViewInit',
            ]);
        });
        it('should invoke host directive ngOnChanges hooks before the host component', () => {
            let logs = [];
            // Utility so we don't have to repeat the logging code.
            let LogsLifecycles = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var LogsLifecycles = _classThis = class {
                    ngOnChanges(changes) {
                        logs.push(`${this.name} - ${changes['someInput'].currentValue}`);
                    }
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, void 0);
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "LogsLifecycles");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LogsLifecycles = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LogsLifecycles = _classThis;
            })();
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var HostDir = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'HostDir';
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let OtherHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var OtherHostDir = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'OtherHostDir';
                    }
                };
                __setFunctionName(_classThis, "OtherHostDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherHostDir = _classThis;
            })();
            let HostComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'host-comp',
                        hostDirectives: [
                            { directive: HostDir, inputs: ['someInput'] },
                            { directive: OtherHostDir, inputs: ['someInput'] },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var HostComp = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'HostComp';
                    }
                };
                __setFunctionName(_classThis, "HostComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostComp = _classThis;
            })();
            let PlainDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[plain-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = LogsLifecycles;
                var PlainDir = _classThis = class extends _classSuper {
                    constructor() {
                        super(...arguments);
                        this.name = 'PlainDir';
                    }
                };
                __setFunctionName(_classThis, "PlainDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    PlainDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return PlainDir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<host-comp plain-dir="PlainDir" [someInput]="inputValue"></host-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.inputValue = 'hello';
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, HostComp, PlainDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(logs).toEqual([
                'HostDir - hello',
                'OtherHostDir - hello',
                'HostComp - hello',
                'PlainDir - hello',
            ]);
            logs = [];
            fixture.componentInstance.inputValue = 'changed';
            fixture.detectChanges();
            expect(logs).toEqual([
                'HostDir - changed',
                'OtherHostDir - changed',
                'HostComp - changed',
                'PlainDir - changed',
            ]);
        });
    });
    describe('host bindings', () => {
        it('should apply the host bindings from all host directives', () => {
            const clicks = [];
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { 'host-dir-attr': 'true', '(click)': 'handleClick()' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    handleClick() {
                        clicks.push('HostDir');
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let OtherHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        host: { 'other-host-dir-attr': 'true', '(click)': 'handleClick()' },
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OtherHostDir = _classThis = class {
                    handleClick() {
                        clicks.push('OtherHostDir');
                    }
                };
                __setFunctionName(_classThis, "OtherHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        host: { 'host-attr': 'true', '(click)': 'handleClick()' },
                        hostDirectives: [HostDir, OtherHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    handleClick() {
                        clicks.push('Dir');
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir></button>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const host = fixture.nativeElement.querySelector('[dir]');
            expect(host.outerHTML).toBe('<button host-dir-attr="true" other-host-dir-attr="true" host-attr="true" dir=""></button>');
            host.click();
            fixture.detectChanges();
            expect(clicks).toEqual(['HostDir', 'OtherHostDir', 'Dir']);
        });
        it('should have the host bindings take precedence over the ones from the host directives', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { 'id': 'host-dir' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let OtherHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { 'id': 'other-host-dir' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OtherHostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "OtherHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        host: { 'id': 'host' },
                        hostDirectives: [HostDir, OtherHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('[dir]').getAttribute('id')).toBe('host');
        });
    });
    describe('dependency injection', () => {
        it('should allow the host to inject its host directives', () => {
            let hostInstance;
            let firstHostDirInstance;
            let secondHostDirInstance;
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SecondHostDir = _classThis = class {
                    constructor() {
                        secondHostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [SecondHostDir] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FirstHostDir = _classThis = class {
                    constructor() {
                        firstHostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [FirstHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                    constructor() {
                        this.firstHostDir = (0, core_1.inject)(FirstHostDir);
                        this.secondHostDir = (0, core_1.inject)(SecondHostDir);
                        hostInstance = this;
                    }
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Host] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(hostInstance instanceof Host).toBe(true);
            expect(firstHostDirInstance instanceof FirstHostDir).toBe(true);
            expect(secondHostDirInstance instanceof SecondHostDir).toBe(true);
            expect(hostInstance.firstHostDir).toBe(firstHostDirInstance);
            expect(hostInstance.secondHostDir).toBe(secondHostDirInstance);
        });
        it('should be able to inject a host directive into a child component', () => {
            let hostDirectiveInstance;
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                    constructor() {
                        this.hostDir = (0, core_1.inject)(HostDir);
                    }
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    constructor() {
                        hostDirectiveInstance = this;
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'host',
                        template: '<child></child>',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _child_decorators;
                let _child_initializers = [];
                let _child_extraInitializers = [];
                var Host = _classThis = class {
                    constructor() {
                        this.child = __runInitializers(this, _child_initializers, void 0);
                        __runInitializers(this, _child_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _child_decorators = [(0, core_1.ViewChild)(Child)];
                    __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<host></host>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _host_decorators;
                let _host_initializers = [];
                let _host_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.host = __runInitializers(this, _host_initializers, void 0);
                        __runInitializers(this, _host_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _host_decorators = [(0, core_1.ViewChild)(Host)];
                    __esDecorate(null, null, _host_decorators, { kind: "field", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Host, Child] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const injectedInstance = fixture.componentInstance.host.child.hostDir;
            expect(injectedInstance instanceof HostDir).toBe(true);
            expect(injectedInstance).toBe(hostDirectiveInstance);
        });
        it('should allow the host directives to inject their host', () => {
            let hostInstance;
            let firstHostDirInstance;
            let secondHostDirInstance;
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SecondHostDir = _classThis = class {
                    constructor() {
                        this.host = (0, core_1.inject)(Host);
                        secondHostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [SecondHostDir] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FirstHostDir = _classThis = class {
                    constructor() {
                        this.host = (0, core_1.inject)(Host);
                        firstHostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [FirstHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                    constructor() {
                        hostInstance = this;
                    }
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Host] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(hostInstance instanceof Host).toBe(true);
            expect(firstHostDirInstance instanceof FirstHostDir).toBe(true);
            expect(secondHostDirInstance instanceof SecondHostDir).toBe(true);
            expect(firstHostDirInstance.host).toBe(hostInstance);
            expect(secondHostDirInstance.host).toBe(hostInstance);
        });
        it('should give precedence to the DI tokens from the host over the host directive tokens', () => {
            const token = new core_1.InjectionToken('token');
            let hostInstance;
            let firstHostDirInstance;
            let secondHostDirInstance;
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ providers: [{ provide: token, useValue: 'SecondDir' }] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SecondHostDir = _classThis = class {
                    constructor() {
                        this.tokenValue = (0, core_1.inject)(token);
                        secondHostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        hostDirectives: [SecondHostDir],
                        providers: [{ provide: token, useValue: 'FirstDir' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FirstHostDir = _classThis = class {
                    constructor() {
                        this.tokenValue = (0, core_1.inject)(token);
                        firstHostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [FirstHostDir],
                        providers: [{ provide: token, useValue: 'HostDir' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                    constructor() {
                        this.tokenValue = (0, core_1.inject)(token);
                        hostInstance = this;
                    }
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Host] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(hostInstance instanceof Host).toBe(true);
            expect(firstHostDirInstance instanceof FirstHostDir).toBe(true);
            expect(secondHostDirInstance instanceof SecondHostDir).toBe(true);
            expect(hostInstance.tokenValue).toBe('HostDir');
            expect(firstHostDirInstance.tokenValue).toBe('HostDir');
            expect(secondHostDirInstance.tokenValue).toBe('HostDir');
        });
        it('should allow the host to inject tokens from the host directives', () => {
            const firstToken = new core_1.InjectionToken('firstToken');
            const secondToken = new core_1.InjectionToken('secondToken');
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ providers: [{ provide: secondToken, useValue: 'SecondDir' }] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SecondHostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        hostDirectives: [SecondHostDir],
                        providers: [{ provide: firstToken, useValue: 'FirstDir' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FirstHostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [FirstHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                    constructor() {
                        this.firstTokenValue = (0, core_1.inject)(firstToken);
                        this.secondTokenValue = (0, core_1.inject)(secondToken);
                    }
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _host_decorators;
                let _host_initializers = [];
                let _host_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.host = __runInitializers(this, _host_initializers, void 0);
                        __runInitializers(this, _host_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _host_decorators = [(0, core_1.ViewChild)(Host)];
                    __esDecorate(null, null, _host_decorators, { kind: "field", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Host] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.host.firstTokenValue).toBe('FirstDir');
            expect(fixture.componentInstance.host.secondTokenValue).toBe('SecondDir');
        });
        it('should not give precedence to tokens from host directives over ones in viewProviders', () => {
            const token = new core_1.InjectionToken('token');
            let tokenValue;
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ providers: [{ provide: token, useValue: 'host-dir' }] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'host',
                        hostDirectives: [HostDir],
                        providers: [{ provide: token, useValue: 'host' }],
                        template: '<span child></span>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let Child = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                    constructor() {
                        tokenValue = (0, core_1.inject)(token);
                    }
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<host></host>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Host, Child] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(tokenValue).toBe('host');
        });
        it('should not be able to access viewProviders from the host in the host directives', () => {
            const token = new core_1.InjectionToken('token');
            let tokenValue = null;
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    constructor() {
                        tokenValue = (0, core_1.inject)(token, { optional: true });
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'host',
                        hostDirectives: [HostDir],
                        viewProviders: [{ provide: token, useValue: 'host' }],
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<host></host>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Host] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(tokenValue).toBe(null);
        });
        it('should throw a circular dependency error if a host and a host directive inject each other', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    constructor() {
                        this.host = (0, core_1.inject)(Host);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                    constructor() {
                        this.hostDir = (0, core_1.inject)(HostDir);
                    }
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Host] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError(/NG0200: Circular dependency in DI detected for HostDir/);
        });
        it('should inject a valid ChangeDetectorRef when attached to a component', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    constructor() {
                        this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        hostDirectives: [HostDir],
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor() {
                        this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp></my-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                let _comp_decorators;
                let _comp_initializers = [];
                let _comp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        this.comp = (__runInitializers(this, _hostDir_extraInitializers), __runInitializers(this, _comp_initializers, void 0));
                        __runInitializers(this, _comp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    _comp_decorators = [(0, core_1.ViewChild)(Comp)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Comp] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const hostDirectiveCdr = fixture.componentInstance.hostDir.changeDetectorRef;
            const componentCdr = fixture.componentInstance.comp.changeDetectorRef;
            // We can't assert that the change detectors are the same by comparing
            // them directly, because a new one is created each time. Instead of we
            // compare that they're associated with the same LView.
            expect(hostDirectiveCdr._lView).toBeTruthy();
            expect(componentCdr._lView).toBeTruthy();
            expect(hostDirectiveCdr._lView).toBe(componentCdr._lView);
            expect(() => {
                hostDirectiveCdr.markForCheck();
                hostDirectiveCdr.detectChanges();
            }).not.toThrow();
        });
    });
    describe('outputs', () => {
        it('should not emit to an output of a host directive that has not been exposed', () => {
            let hostDirectiveInstance;
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit()' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                        hostDirectiveInstance = this;
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (hasBeenClicked)="spy()"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(hostDirectiveInstance instanceof HostDir).toBe(true);
            expect(fixture.componentInstance.spy).not.toHaveBeenCalled();
        });
        it('should emit to an output of a host directive that has been exposed', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("hello")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            {
                                directive: HostDir,
                                outputs: ['hasBeenClicked'],
                            },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (hasBeenClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledOnceWith('hello');
        });
        it('should emit to an output of a host directive that has been exposed under an alias', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("hello")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, outputs: ['hasBeenClicked: wasClicked'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <button dir (wasClicked)="validSpy($event)" (hasBeenClicked)="invalidSpy($event)"></button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.validSpy = jasmine.createSpy('valid spy');
                        this.invalidSpy = jasmine.createSpy('invalid spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.validSpy).toHaveBeenCalledOnceWith('hello');
            expect(fixture.componentInstance.invalidSpy).not.toHaveBeenCalled();
        });
        it('should alias to the public name of the host directive output, not the private one', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("hello")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)('wasClicked')];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, outputs: ['wasClicked: clickOccurred'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <button
            dir
            (clickOccurred)="validSpy($event)"
            (hasBeenClicked)="invalidSpy($event)"></button>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.validSpy = jasmine.createSpy('valid spy');
                        this.invalidSpy = jasmine.createSpy('invalid spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.validSpy).toHaveBeenCalledOnceWith('hello');
            expect(fixture.componentInstance.invalidSpy).not.toHaveBeenCalled();
        });
        it('should emit to an output of a host that has the same name as a non-exposed output of a host directive', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("HostDir")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        host: { '(click)': 'hasBeenClicked.emit("Dir")' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (hasBeenClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledOnceWith('Dir');
        });
        it('should emit to an output of a host that has the same name as an exposed output of a host directive', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("HostDir")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, outputs: ['hasBeenClicked'] }],
                        host: { '(click)': 'hasBeenClicked.emit("Dir")' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (hasBeenClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledTimes(2);
            expect(fixture.componentInstance.spy).toHaveBeenCalledWith('HostDir');
            expect(fixture.componentInstance.spy).toHaveBeenCalledWith('Dir');
        });
        it('should emit to an output of a host that has the same name as the alias of a host directive output', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("HostDir")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, outputs: ['hasBeenClicked: wasClicked'] }],
                        host: { '(click)': 'wasClicked.emit("Dir")' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _wasClicked_decorators;
                let _wasClicked_initializers = [];
                let _wasClicked_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.wasClicked = __runInitializers(this, _wasClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _wasClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _wasClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _wasClicked_decorators, { kind: "field", name: "wasClicked", static: false, private: false, access: { has: obj => "wasClicked" in obj, get: obj => obj.wasClicked, set: (obj, value) => { obj.wasClicked = value; } }, metadata: _metadata }, _wasClicked_initializers, _wasClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (wasClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledTimes(2);
            expect(fixture.componentInstance.spy).toHaveBeenCalledWith('HostDir');
            expect(fixture.componentInstance.spy).toHaveBeenCalledWith('Dir');
        });
        it('should not expose the same output more than once', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit()' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, outputs: ['hasBeenClicked', 'hasBeenClicked'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (hasBeenClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledTimes(1);
        });
        it('should emit to an inherited output of a host directive', () => {
            let ParentDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        host: { '(click)': 'hasBeenClicked.emit("hello")' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var ParentDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ParentDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentDir = _classThis;
            })();
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = ParentDir;
                var HostDir = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, outputs: ['hasBeenClicked'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (hasBeenClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledOnceWith('hello');
        });
        it('should emit to an output that was exposed from one host directive, but not another', () => {
            let ExposedHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("ExposedHostDir")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var ExposedHostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ExposedHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ExposedHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ExposedHostDir = _classThis;
            })();
            let UnExposedHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("UnExposedHostDir")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var UnExposedHostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "UnExposedHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    UnExposedHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return UnExposedHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            { directive: ExposedHostDir, outputs: ['hasBeenClicked'] },
                            UnExposedHostDir,
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (hasBeenClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledOnceWith('ExposedHostDir');
            expect(fixture.componentInstance.spy).not.toHaveBeenCalledWith('UnExposedHostDir');
        });
        it('should emit to outputs from different host directives that have been aliased to the same name', () => {
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        host: { '(click)': 'firstHasBeenClicked.emit("FirstHostDir")' },
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _firstHasBeenClicked_decorators;
                let _firstHasBeenClicked_initializers = [];
                let _firstHasBeenClicked_extraInitializers = [];
                var FirstHostDir = _classThis = class {
                    constructor() {
                        this.firstHasBeenClicked = __runInitializers(this, _firstHasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _firstHasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _firstHasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _firstHasBeenClicked_decorators, { kind: "field", name: "firstHasBeenClicked", static: false, private: false, access: { has: obj => "firstHasBeenClicked" in obj, get: obj => obj.firstHasBeenClicked, set: (obj, value) => { obj.firstHasBeenClicked = value; } }, metadata: _metadata }, _firstHasBeenClicked_initializers, _firstHasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        host: { '(click)': 'secondHasBeenClicked.emit("SecondHostDir")' },
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _secondHasBeenClicked_decorators;
                let _secondHasBeenClicked_initializers = [];
                let _secondHasBeenClicked_extraInitializers = [];
                var SecondHostDir = _classThis = class {
                    constructor() {
                        this.secondHasBeenClicked = __runInitializers(this, _secondHasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _secondHasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _secondHasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _secondHasBeenClicked_decorators, { kind: "field", name: "secondHasBeenClicked", static: false, private: false, access: { has: obj => "secondHasBeenClicked" in obj, get: obj => obj.secondHasBeenClicked, set: (obj, value) => { obj.secondHasBeenClicked = value; } }, metadata: _metadata }, _secondHasBeenClicked_initializers, _secondHasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            { directive: FirstHostDir, outputs: ['firstHasBeenClicked: wasClicked'] },
                            { directive: SecondHostDir, outputs: ['secondHasBeenClicked: wasClicked'] },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (wasClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledTimes(2);
            expect(fixture.componentInstance.spy).toHaveBeenCalledWith('FirstHostDir');
            expect(fixture.componentInstance.spy).toHaveBeenCalledWith('SecondHostDir');
        });
        it('should emit to an output of an inherited host directive that has been exposed', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'hasBeenClicked.emit("hello")' } })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hasBeenClicked_decorators;
                let _hasBeenClicked_initializers = [];
                let _hasBeenClicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.hasBeenClicked = __runInitializers(this, _hasBeenClicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _hasBeenClicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hasBeenClicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _hasBeenClicked_decorators, { kind: "field", name: "hasBeenClicked", static: false, private: false, access: { has: obj => "hasBeenClicked" in obj, get: obj => obj.hasBeenClicked, set: (obj, value) => { obj.hasBeenClicked = value; } }, metadata: _metadata }, _hasBeenClicked_initializers, _hasBeenClicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        hostDirectives: [
                            {
                                directive: HostDir,
                                outputs: ['hasBeenClicked'],
                            },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Parent;
                var Dir = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir (hasBeenClicked)="spy($event)"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spy = jasmine.createSpy('click spy');
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(fixture.componentInstance.spy).toHaveBeenCalledOnceWith('hello');
        });
    });
    describe('inputs', () => {
        it('should not set an input of a host directive that has not been exposed', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.color = 'red';
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir], errorOnUnknownProperties: true });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).toThrowError(/Can't bind to 'color' since it isn't a known property/);
        });
        it('should set the input of a host directive that has been exposed', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['color'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        this.color = (__runInitializers(this, _hostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('red');
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('green');
        });
        it('should set an input of a host directive that has been exposed under an alias', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['color: buttonColor'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [buttonColor]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        this.color = (__runInitializers(this, _hostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('red');
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('green');
        });
        it('should alias to the public name of the host directive input, not the private one', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('colorAlias')];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['colorAlias: buttonColor'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [buttonColor]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        this.color = (__runInitializers(this, _hostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('red');
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('green');
        });
        it('should set an input of a host that has the same name as a non-exposed input of a host directive', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.hostDir = (__runInitializers(this, _dir_extraInitializers), __runInitializers(this, _hostDir_initializers, void 0));
                        this.color = (__runInitializers(this, _hostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const { dir, hostDir } = fixture.componentInstance;
            expect(dir.color).toBe('red');
            expect(hostDir.color).toBe(undefined);
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(dir.color).toBe('green');
            expect(hostDir.color).toBe(undefined);
        });
        it('should set an input of a host that has the same name as an exposed input of a host directive', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['color'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.hostDir = (__runInitializers(this, _dir_extraInitializers), __runInitializers(this, _hostDir_initializers, void 0));
                        this.color = (__runInitializers(this, _hostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const { dir, hostDir } = fixture.componentInstance;
            expect(dir.color).toBe('red');
            expect(hostDir.color).toBe('red');
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(dir.color).toBe('green');
            expect(hostDir.color).toBe('green');
        });
        it('should set an input of a host that has the same name as the alias of a host directive input', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['color: buttonColor'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _buttonColor_decorators;
                let _buttonColor_initializers = [];
                let _buttonColor_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.buttonColor = __runInitializers(this, _buttonColor_initializers, void 0);
                        __runInitializers(this, _buttonColor_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _buttonColor_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _buttonColor_decorators, { kind: "field", name: "buttonColor", static: false, private: false, access: { has: obj => "buttonColor" in obj, get: obj => obj.buttonColor, set: (obj, value) => { obj.buttonColor = value; } }, metadata: _metadata }, _buttonColor_initializers, _buttonColor_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [buttonColor]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.hostDir = (__runInitializers(this, _dir_extraInitializers), __runInitializers(this, _hostDir_initializers, void 0));
                        this.color = (__runInitializers(this, _hostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const { dir, hostDir } = fixture.componentInstance;
            expect(dir.buttonColor).toBe('red');
            expect(hostDir.color).toBe('red');
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(dir.buttonColor).toBe('green');
            expect(hostDir.color).toBe('green');
        });
        it('should set an inherited input of a host directive', () => {
            let ParentDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var ParentDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ParentDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentDir = _classThis;
            })();
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = ParentDir;
                var HostDir = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['color'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        this.color = (__runInitializers(this, _hostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('red');
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('green');
        });
        it('should set an input that was exposed from one host directive, but not another', () => {
            let ExposedHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var ExposedHostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ExposedHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ExposedHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ExposedHostDir = _classThis;
            })();
            let UnExposedHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var UnExposedHostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "UnExposedHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    UnExposedHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return UnExposedHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: ExposedHostDir, inputs: ['color'] }, UnExposedHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _exposedHostDir_decorators;
                let _exposedHostDir_initializers = [];
                let _exposedHostDir_extraInitializers = [];
                let _unExposedHostDir_decorators;
                let _unExposedHostDir_initializers = [];
                let _unExposedHostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.exposedHostDir = __runInitializers(this, _exposedHostDir_initializers, void 0);
                        this.unExposedHostDir = (__runInitializers(this, _exposedHostDir_extraInitializers), __runInitializers(this, _unExposedHostDir_initializers, void 0));
                        this.color = (__runInitializers(this, _unExposedHostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _exposedHostDir_decorators = [(0, core_1.ViewChild)(ExposedHostDir)];
                    _unExposedHostDir_decorators = [(0, core_1.ViewChild)(UnExposedHostDir)];
                    __esDecorate(null, null, _exposedHostDir_decorators, { kind: "field", name: "exposedHostDir", static: false, private: false, access: { has: obj => "exposedHostDir" in obj, get: obj => obj.exposedHostDir, set: (obj, value) => { obj.exposedHostDir = value; } }, metadata: _metadata }, _exposedHostDir_initializers, _exposedHostDir_extraInitializers);
                    __esDecorate(null, null, _unExposedHostDir_decorators, { kind: "field", name: "unExposedHostDir", static: false, private: false, access: { has: obj => "unExposedHostDir" in obj, get: obj => obj.unExposedHostDir, set: (obj, value) => { obj.unExposedHostDir = value; } }, metadata: _metadata }, _unExposedHostDir_initializers, _unExposedHostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const { exposedHostDir, unExposedHostDir } = fixture.componentInstance;
            expect(exposedHostDir.color).toBe('red');
            expect(unExposedHostDir.color).toBe(undefined);
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(exposedHostDir.color).toBe('green');
            expect(unExposedHostDir.color).toBe(undefined);
        });
        it('should set inputs from different host directives that have been aliased to the same name', () => {
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _firstColor_decorators;
                let _firstColor_initializers = [];
                let _firstColor_extraInitializers = [];
                var FirstHostDir = _classThis = class {
                    constructor() {
                        this.firstColor = __runInitializers(this, _firstColor_initializers, void 0);
                        __runInitializers(this, _firstColor_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _firstColor_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _firstColor_decorators, { kind: "field", name: "firstColor", static: false, private: false, access: { has: obj => "firstColor" in obj, get: obj => obj.firstColor, set: (obj, value) => { obj.firstColor = value; } }, metadata: _metadata }, _firstColor_initializers, _firstColor_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _secondColor_decorators;
                let _secondColor_initializers = [];
                let _secondColor_extraInitializers = [];
                var SecondHostDir = _classThis = class {
                    constructor() {
                        this.secondColor = __runInitializers(this, _secondColor_initializers, void 0);
                        __runInitializers(this, _secondColor_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _secondColor_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _secondColor_decorators, { kind: "field", name: "secondColor", static: false, private: false, access: { has: obj => "secondColor" in obj, get: obj => obj.secondColor, set: (obj, value) => { obj.secondColor = value; } }, metadata: _metadata }, _secondColor_initializers, _secondColor_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            { directive: FirstHostDir, inputs: ['firstColor: buttonColor'] },
                            { directive: SecondHostDir, inputs: ['secondColor: buttonColor'] },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [buttonColor]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _firstHostDir_decorators;
                let _firstHostDir_initializers = [];
                let _firstHostDir_extraInitializers = [];
                let _secondHostDir_decorators;
                let _secondHostDir_initializers = [];
                let _secondHostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.firstHostDir = __runInitializers(this, _firstHostDir_initializers, void 0);
                        this.secondHostDir = (__runInitializers(this, _firstHostDir_extraInitializers), __runInitializers(this, _secondHostDir_initializers, void 0));
                        this.color = (__runInitializers(this, _secondHostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _firstHostDir_decorators = [(0, core_1.ViewChild)(FirstHostDir)];
                    _secondHostDir_decorators = [(0, core_1.ViewChild)(SecondHostDir)];
                    __esDecorate(null, null, _firstHostDir_decorators, { kind: "field", name: "firstHostDir", static: false, private: false, access: { has: obj => "firstHostDir" in obj, get: obj => obj.firstHostDir, set: (obj, value) => { obj.firstHostDir = value; } }, metadata: _metadata }, _firstHostDir_initializers, _firstHostDir_extraInitializers);
                    __esDecorate(null, null, _secondHostDir_decorators, { kind: "field", name: "secondHostDir", static: false, private: false, access: { has: obj => "secondHostDir" in obj, get: obj => obj.secondHostDir, set: (obj, value) => { obj.secondHostDir = value; } }, metadata: _metadata }, _secondHostDir_initializers, _secondHostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const { firstHostDir, secondHostDir } = fixture.componentInstance;
            expect(firstHostDir.firstColor).toBe('red');
            expect(secondHostDir.secondColor).toBe('red');
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(firstHostDir.firstColor).toBe('green');
            expect(secondHostDir.secondColor).toBe('green');
        });
        it('should not set a static input of a host directive that has not been exposed', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir color="red"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        __runInitializers(this, _hostDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe(undefined);
        });
        it('should set a static input of a host directive that has been exposed', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['color'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir color="red"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        __runInitializers(this, _hostDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('red');
        });
        it('should set a static input of a host directive that has been exposed under an alias', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['color: buttonColor'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir buttonColor="red"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        __runInitializers(this, _hostDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('red');
        });
        it('should alias to the public name of a static host directive input, not the private one', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('colorAlias')];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['colorAlias: buttonColor'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir buttonColor="red"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        __runInitializers(this, _hostDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('red');
        });
        it('should set a static input that was exposed from one host directive, but not another', () => {
            let ExposedHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var ExposedHostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ExposedHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ExposedHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ExposedHostDir = _classThis;
            })();
            let UnExposedHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var UnExposedHostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "UnExposedHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    UnExposedHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return UnExposedHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: ExposedHostDir, inputs: ['color'] }, UnExposedHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir color="red"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _exposedHostDir_decorators;
                let _exposedHostDir_initializers = [];
                let _exposedHostDir_extraInitializers = [];
                let _unExposedHostDir_decorators;
                let _unExposedHostDir_initializers = [];
                let _unExposedHostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.exposedHostDir = __runInitializers(this, _exposedHostDir_initializers, void 0);
                        this.unExposedHostDir = (__runInitializers(this, _exposedHostDir_extraInitializers), __runInitializers(this, _unExposedHostDir_initializers, void 0));
                        __runInitializers(this, _unExposedHostDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _exposedHostDir_decorators = [(0, core_1.ViewChild)(ExposedHostDir)];
                    _unExposedHostDir_decorators = [(0, core_1.ViewChild)(UnExposedHostDir)];
                    __esDecorate(null, null, _exposedHostDir_decorators, { kind: "field", name: "exposedHostDir", static: false, private: false, access: { has: obj => "exposedHostDir" in obj, get: obj => obj.exposedHostDir, set: (obj, value) => { obj.exposedHostDir = value; } }, metadata: _metadata }, _exposedHostDir_initializers, _exposedHostDir_extraInitializers);
                    __esDecorate(null, null, _unExposedHostDir_decorators, { kind: "field", name: "unExposedHostDir", static: false, private: false, access: { has: obj => "unExposedHostDir" in obj, get: obj => obj.unExposedHostDir, set: (obj, value) => { obj.unExposedHostDir = value; } }, metadata: _metadata }, _unExposedHostDir_initializers, _unExposedHostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.exposedHostDir.color).toBe('red');
            expect(fixture.componentInstance.unExposedHostDir.color).toBe(undefined);
        });
        it('should set static inputs from different host directives that have been aliased to the same name', () => {
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _firstColor_decorators;
                let _firstColor_initializers = [];
                let _firstColor_extraInitializers = [];
                var FirstHostDir = _classThis = class {
                    constructor() {
                        this.firstColor = __runInitializers(this, _firstColor_initializers, void 0);
                        __runInitializers(this, _firstColor_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _firstColor_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _firstColor_decorators, { kind: "field", name: "firstColor", static: false, private: false, access: { has: obj => "firstColor" in obj, get: obj => obj.firstColor, set: (obj, value) => { obj.firstColor = value; } }, metadata: _metadata }, _firstColor_initializers, _firstColor_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _secondColor_decorators;
                let _secondColor_initializers = [];
                let _secondColor_extraInitializers = [];
                var SecondHostDir = _classThis = class {
                    constructor() {
                        this.secondColor = __runInitializers(this, _secondColor_initializers, void 0);
                        __runInitializers(this, _secondColor_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _secondColor_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _secondColor_decorators, { kind: "field", name: "secondColor", static: false, private: false, access: { has: obj => "secondColor" in obj, get: obj => obj.secondColor, set: (obj, value) => { obj.secondColor = value; } }, metadata: _metadata }, _secondColor_initializers, _secondColor_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            { directive: FirstHostDir, inputs: ['firstColor: buttonColor'] },
                            { directive: SecondHostDir, inputs: ['secondColor: buttonColor'] },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir buttonColor="red"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _firstHostDir_decorators;
                let _firstHostDir_initializers = [];
                let _firstHostDir_extraInitializers = [];
                let _secondHostDir_decorators;
                let _secondHostDir_initializers = [];
                let _secondHostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.firstHostDir = __runInitializers(this, _firstHostDir_initializers, void 0);
                        this.secondHostDir = (__runInitializers(this, _firstHostDir_extraInitializers), __runInitializers(this, _secondHostDir_initializers, void 0));
                        this.color = (__runInitializers(this, _secondHostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _firstHostDir_decorators = [(0, core_1.ViewChild)(FirstHostDir)];
                    _secondHostDir_decorators = [(0, core_1.ViewChild)(SecondHostDir)];
                    __esDecorate(null, null, _firstHostDir_decorators, { kind: "field", name: "firstHostDir", static: false, private: false, access: { has: obj => "firstHostDir" in obj, get: obj => obj.firstHostDir, set: (obj, value) => { obj.firstHostDir = value; } }, metadata: _metadata }, _firstHostDir_initializers, _firstHostDir_extraInitializers);
                    __esDecorate(null, null, _secondHostDir_decorators, { kind: "field", name: "secondHostDir", static: false, private: false, access: { has: obj => "secondHostDir" in obj, get: obj => obj.secondHostDir, set: (obj, value) => { obj.secondHostDir = value; } }, metadata: _metadata }, _secondHostDir_initializers, _secondHostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.firstHostDir.firstColor).toBe('red');
            expect(fixture.componentInstance.secondHostDir.secondColor).toBe('red');
        });
        it('should not expose an input under its host directive alias if a host directive is not applied', () => {
            const logs = [];
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[host-dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    ngOnChanges(changes) {
                        logs.push(changes['color'].currentValue);
                    }
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('colorAlias')];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['colorAlias: buttonColor'] }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Dir, HostDir],
                        // Note that `[dir]` doesn't match on the `button` on purpose.
                        // The wrong behavior would be if the `buttonColor` binding worked on `host-dir`.
                        template: `
              <span dir [buttonColor]="spanValue"></span>
              <button host-dir [buttonColor]="buttonValue"></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.spanValue = 'spanValue';
                        this.buttonValue = 'buttonValue';
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
            testing_1.TestBed.configureTestingModule({ errorOnUnknownProperties: true });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).toThrowError(/Can't bind to 'buttonColor' since it isn't a known property of 'button'/);
            // The input on the button instance should not have been written to.
            expect(logs).toEqual(['spanValue']);
        });
        it('should set the input of an inherited host directive that has been exposed', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        hostDirectives: [{ directive: HostDir, inputs: ['color'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Parent;
                var Dir = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        this.color = (__runInitializers(this, _hostDir_extraInitializers), 'red');
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('red');
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.color).toBe('green');
        });
    });
    describe('ngOnChanges', () => {
        it('should invoke ngOnChanges when an input is set on a host directive', () => {
            let firstDirChangeEvent;
            let secondDirChangeEvent;
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var FirstHostDir = _classThis = class {
                    ngOnChanges(changes) {
                        firstDirChangeEvent = changes;
                    }
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var SecondHostDir = _classThis = class {
                    ngOnChanges(changes) {
                        secondDirChangeEvent = changes;
                    }
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            { directive: FirstHostDir, inputs: ['color'] },
                            { directive: SecondHostDir, inputs: ['color'] },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.color = 'red';
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(firstDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: true,
                    previousValue: undefined,
                    currentValue: 'red',
                }),
            }));
            expect(secondDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: true,
                    previousValue: undefined,
                    currentValue: 'red',
                }),
            }));
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(firstDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: false,
                    previousValue: 'red',
                    currentValue: 'green',
                }),
            }));
            expect(secondDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: false,
                    previousValue: 'red',
                    currentValue: 'green',
                }),
            }));
        });
        it('should invoke ngOnChanges when an aliased property is set on a host directive', () => {
            let firstDirChangeEvent;
            let secondDirChangeEvent;
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var FirstHostDir = _classThis = class {
                    ngOnChanges(changes) {
                        firstDirChangeEvent = changes;
                    }
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('firstAlias')];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var SecondHostDir = _classThis = class {
                    ngOnChanges(changes) {
                        secondDirChangeEvent = changes;
                    }
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('secondAlias')];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            { directive: FirstHostDir, inputs: ['firstAlias: buttonColor'] },
                            { directive: SecondHostDir, inputs: ['secondAlias: buttonColor'] },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [buttonColor]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.color = 'red';
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(firstDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: true,
                    previousValue: undefined,
                    currentValue: 'red',
                }),
            }));
            expect(secondDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: true,
                    previousValue: undefined,
                    currentValue: 'red',
                }),
            }));
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(firstDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: false,
                    previousValue: 'red',
                    currentValue: 'green',
                }),
            }));
            expect(secondDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: false,
                    previousValue: 'red',
                    currentValue: 'green',
                }),
            }));
        });
        it('should only invoke ngOnChanges on the directives that have exposed an input', () => {
            let firstDirChangeEvent;
            let secondDirChangeEvent;
            let FirstHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var FirstHostDir = _classThis = class {
                    ngOnChanges(changes) {
                        firstDirChangeEvent = changes;
                    }
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "FirstHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FirstHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FirstHostDir = _classThis;
            })();
            let SecondHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var SecondHostDir = _classThis = class {
                    ngOnChanges(changes) {
                        secondDirChangeEvent = changes;
                    }
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "SecondHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SecondHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SecondHostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [FirstHostDir, { directive: SecondHostDir, inputs: ['color'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir [color]="color"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.color = 'red';
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(firstDirChangeEvent).toBe(undefined);
            expect(secondDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: true,
                    previousValue: undefined,
                    currentValue: 'red',
                }),
            }));
            fixture.componentInstance.color = 'green';
            fixture.detectChanges();
            expect(firstDirChangeEvent).toBe(undefined);
            expect(secondDirChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: false,
                    previousValue: 'red',
                    currentValue: 'green',
                }),
            }));
        });
        it('should invoke ngOnChanges when a static aliased host directive input is set', () => {
            let latestChangeEvent;
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    ngOnChanges(changes) {
                        latestChangeEvent = changes;
                    }
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('colorAlias')];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['colorAlias: buttonColor'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<button dir buttonColor="red"></button>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(latestChangeEvent).toEqual(jasmine.objectContaining({
                color: jasmine.objectContaining({
                    firstChange: true,
                    previousValue: undefined,
                    currentValue: 'red',
                }),
            }));
        });
    });
    describe('debugging and testing utilities', () => {
        it('should be able to retrieve host directives using ng.getDirectives', () => {
            let hostDirInstance;
            let otherHostDirInstance;
            let plainDirInstance;
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    constructor() {
                        hostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let OtherHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OtherHostDir = _classThis = class {
                    constructor() {
                        otherHostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "OtherHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherHostDir = _classThis;
            })();
            let PlainDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[plain-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var PlainDir = _classThis = class {
                    constructor() {
                        plainDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "PlainDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    PlainDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return PlainDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        hostDirectives: [HostDir, OtherHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp plain-dir></comp>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Comp, PlainDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const componentHost = fixture.nativeElement.querySelector('comp');
            expect(hostDirInstance instanceof HostDir).toBe(true);
            expect(otherHostDirInstance instanceof OtherHostDir).toBe(true);
            expect(plainDirInstance instanceof PlainDir).toBe(true);
            expect((0, discovery_utils_1.getDirectives)(componentHost)).toEqual([
                hostDirInstance,
                otherHostDirInstance,
                plainDirInstance,
            ]);
        });
        it('should be able to retrieve components that have host directives using ng.getComponent', () => {
            let compInstance;
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor() {
                        compInstance = this;
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp></comp>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Comp] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const componentHost = fixture.nativeElement.querySelector('comp');
            expect(compInstance instanceof Comp).toBe(true);
            expect((0, discovery_utils_1.getComponent)(componentHost)).toBe(compInstance);
        });
        it('should be able to retrieve components that have host directives using DebugNode.componentInstance', () => {
            let compInstance;
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor() {
                        compInstance = this;
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp></comp>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Comp] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const node = fixture.debugElement.query(platform_browser_1.By.css('comp'));
            expect(compInstance instanceof Comp).toBe(true);
            expect(node.componentInstance).toBe(compInstance);
        });
        it('should be able to query by a host directive', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor(elementRef) {
                        this.elementRef = elementRef;
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp></comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _compInstance_decorators;
                let _compInstance_initializers = [];
                let _compInstance_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.compInstance = __runInitializers(this, _compInstance_initializers, void 0);
                        __runInitializers(this, _compInstance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _compInstance_decorators = [(0, core_1.ViewChild)(Comp)];
                    __esDecorate(null, null, _compInstance_decorators, { kind: "field", name: "compInstance", static: false, private: false, access: { has: obj => "compInstance" in obj, get: obj => obj.compInstance, set: (obj, value) => { obj.compInstance = value; } }, metadata: _metadata }, _compInstance_initializers, _compInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Comp] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const expected = fixture.componentInstance.compInstance.elementRef.nativeElement;
            const result = fixture.debugElement.query(platform_browser_1.By.directive(HostDir)).nativeElement;
            expect(result).toBe(expected);
        });
    });
    describe('root component with host directives', () => {
        function createRootComponent(componentType) {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container #insertionPoint></ng-container>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _insertionPoint_decorators;
                let _insertionPoint_initializers = [];
                let _insertionPoint_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.insertionPoint = __runInitializers(this, _insertionPoint_initializers, void 0);
                        __runInitializers(this, _insertionPoint_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _insertionPoint_decorators = [(0, core_1.ViewChild)('insertionPoint', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _insertionPoint_decorators, { kind: "field", name: "insertionPoint", static: false, private: false, access: { has: obj => "insertionPoint" in obj, get: obj => obj.insertionPoint, set: (obj, value) => { obj.insertionPoint = value; } }, metadata: _metadata }, _insertionPoint_initializers, _insertionPoint_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, componentType],
                errorOnUnknownProperties: true,
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const ref = fixture.componentInstance.insertionPoint.createComponent(componentType);
            return { ref, fixture };
        }
        it('should apply a basic host directive to the root component', () => {
            const logs = [];
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        host: { 'host-dir-attr': '', 'class': 'host-dir', 'style': 'height: 50px' },
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    constructor() {
                        logs.push('HostDir');
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let HostComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'host',
                        host: { 'host-attr': '', 'class': 'dir', 'style': 'width: 50px' },
                        hostDirectives: [HostDir],
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComp = _classThis = class {
                    constructor() {
                        logs.push('HostComp');
                    }
                };
                __setFunctionName(_classThis, "HostComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostComp = _classThis;
            })();
            const { fixture } = createRootComponent(HostComp);
            expect(logs).toEqual(['HostDir', 'HostComp']);
            expect(fixture.nativeElement.innerHTML).toContain('<host host-dir-attr="" host-attr="" class="host-dir dir" ' +
                'style="height: 50px; width: 50px;"></host>');
        });
        it('should invoke lifecycle hooks on host directives applied to a root component', () => {
            const logs = [];
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                    ngOnInit() {
                        logs.push('HostDir - ngOnInit');
                    }
                    ngAfterViewInit() {
                        logs.push('HostDir - ngAfterViewInit');
                    }
                    ngAfterViewChecked() {
                        logs.push('HostDir - ngAfterViewChecked');
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let OtherHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OtherHostDir = _classThis = class {
                    ngOnInit() {
                        logs.push('OtherHostDir - ngOnInit');
                    }
                    ngAfterViewInit() {
                        logs.push('OtherHostDir - ngAfterViewInit');
                    }
                    ngAfterViewChecked() {
                        logs.push('OtherHostDir - ngAfterViewChecked');
                    }
                };
                __setFunctionName(_classThis, "OtherHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherHostDir = _classThis;
            })();
            let HostComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        hostDirectives: [HostDir, OtherHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComp = _classThis = class {
                    ngOnInit() {
                        logs.push('HostComp - ngOnInit');
                    }
                    ngAfterViewInit() {
                        logs.push('HostComp - ngAfterViewInit');
                    }
                    ngAfterViewChecked() {
                        logs.push('HostComp - ngAfterViewChecked');
                    }
                };
                __setFunctionName(_classThis, "HostComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostComp = _classThis;
            })();
            const { fixture } = createRootComponent(HostComp);
            fixture.detectChanges();
            expect(logs).toEqual([
                'HostDir - ngOnInit',
                'OtherHostDir - ngOnInit',
                'HostComp - ngOnInit',
                'HostDir - ngAfterViewInit',
                'HostDir - ngAfterViewChecked',
                'OtherHostDir - ngAfterViewInit',
                'OtherHostDir - ngAfterViewChecked',
                'HostComp - ngAfterViewInit',
                'HostComp - ngAfterViewChecked',
            ]);
        });
        describe('host bindings', () => {
            it('should support host attribute bindings coming from the host directives', () => {
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            host: {
                                '[attr.host-dir-only]': 'value',
                                '[attr.shadowed-attr]': 'value',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostDir = _classThis = class {
                        constructor() {
                            this.value = 'host-dir';
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let OtherHostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            host: {
                                '[attr.other-host-dir-only]': 'value',
                                '[attr.shadowed-attr]': 'value',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var OtherHostDir = _classThis = class {
                        constructor() {
                            this.value = 'other-host-dir';
                        }
                    };
                    __setFunctionName(_classThis, "OtherHostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OtherHostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OtherHostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'host-comp',
                            host: {
                                '[attr.shadowed-attr]': 'value',
                            },
                            hostDirectives: [HostDir, OtherHostDir],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                        constructor() {
                            this.value = 'host';
                            this.hostDir = (0, core_1.inject)(HostDir);
                            this.otherHostDir = (0, core_1.inject)(OtherHostDir);
                        }
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { fixture, ref } = createRootComponent(HostComp);
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toContain('<host-comp host-dir-only="host-dir" shadowed-attr="host" ' +
                    'other-host-dir-only="other-host-dir"></host-comp>');
                ref.instance.hostDir.value = 'host-dir-changed';
                ref.instance.otherHostDir.value = 'other-host-dir-changed';
                ref.instance.value = 'host-changed';
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toContain('<host-comp host-dir-only="host-dir-changed" shadowed-attr="host-changed" ' +
                    'other-host-dir-only="other-host-dir-changed"></host-comp>');
            });
            it('should support host event bindings coming from the host directives', () => {
                const logs = [];
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'handleClick()' } })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostDir = _classThis = class {
                        handleClick() {
                            logs.push('HostDir');
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let OtherHostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ host: { '(click)': 'handleClick()' } })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var OtherHostDir = _classThis = class {
                        handleClick() {
                            logs.push('OtherHostDir');
                        }
                    };
                    __setFunctionName(_classThis, "OtherHostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OtherHostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OtherHostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'host-comp',
                            host: { '(click)': 'handleClick()' },
                            hostDirectives: [HostDir, OtherHostDir],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                        handleClick() {
                            logs.push('HostComp');
                        }
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { fixture, ref } = createRootComponent(HostComp);
                ref.location.nativeElement.click();
                fixture.detectChanges();
                expect(logs).toEqual(['HostDir', 'OtherHostDir', 'HostComp']);
            });
            it('should have the host bindings of the root component take precedence over the ones from the host directives', () => {
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ host: { 'id': 'host-dir' } })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let OtherHostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ host: { 'id': 'other-host-dir' } })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var OtherHostDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "OtherHostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OtherHostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OtherHostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            host: { 'id': 'host' },
                            hostDirectives: [HostDir, OtherHostDir],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { ref, fixture } = createRootComponent(HostComp);
                fixture.detectChanges();
                expect(ref.location.nativeElement.getAttribute('id')).toBe('host');
            });
        });
        describe('dependency injection', () => {
            it('should allow the host directive to inject the root component', () => {
                let hostDirInstance;
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostDir = _classThis = class {
                        constructor() {
                            this.host = (0, core_1.inject)(HostComp);
                            hostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            hostDirectives: [HostDir],
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { ref } = createRootComponent(HostComp);
                expect(hostDirInstance instanceof HostDir).toBe(true);
                expect(hostDirInstance.host).toBe(ref.instance);
            });
            it('should allow the root component to inject the host directive', () => {
                let hostDirInstance;
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostDir = _classThis = class {
                        constructor() {
                            hostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            hostDirectives: [HostDir],
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                        constructor() {
                            this.hostDir = (0, core_1.inject)(HostDir);
                        }
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { ref } = createRootComponent(HostComp);
                expect(hostDirInstance instanceof HostDir).toBe(true);
                expect(ref.instance.hostDir).toBe(hostDirInstance);
            });
            it('should give precedence to the DI tokens from the root component over the host directive tokens', () => {
                const token = new core_1.InjectionToken('token');
                let hostInstance;
                let firstHostDirInstance;
                let secondHostDirInstance;
                let SecondHostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ providers: [{ provide: token, useValue: 'SecondDir' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SecondHostDir = _classThis = class {
                        constructor() {
                            this.tokenValue = (0, core_1.inject)(token);
                            secondHostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "SecondHostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SecondHostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SecondHostDir = _classThis;
                })();
                let FirstHostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            hostDirectives: [SecondHostDir],
                            providers: [{ provide: token, useValue: 'FirstDir' }],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var FirstHostDir = _classThis = class {
                        constructor() {
                            this.tokenValue = (0, core_1.inject)(token);
                            firstHostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "FirstHostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        FirstHostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return FirstHostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            hostDirectives: [FirstHostDir],
                            providers: [{ provide: token, useValue: 'HostDir' }],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                        constructor() {
                            this.tokenValue = (0, core_1.inject)(token);
                            hostInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                createRootComponent(HostComp);
                expect(hostInstance instanceof HostComp).toBe(true);
                expect(firstHostDirInstance instanceof FirstHostDir).toBe(true);
                expect(secondHostDirInstance instanceof SecondHostDir).toBe(true);
                expect(hostInstance.tokenValue).toBe('HostDir');
                expect(firstHostDirInstance.tokenValue).toBe('HostDir');
                expect(secondHostDirInstance.tokenValue).toBe('HostDir');
            });
            it('should allow the root component to inject tokens from the host directives', () => {
                const firstToken = new core_1.InjectionToken('firstToken');
                const secondToken = new core_1.InjectionToken('secondToken');
                let SecondHostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ providers: [{ provide: secondToken, useValue: 'SecondDir' }] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var SecondHostDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "SecondHostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        SecondHostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return SecondHostDir = _classThis;
                })();
                let FirstHostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            hostDirectives: [SecondHostDir],
                            providers: [{ provide: firstToken, useValue: 'FirstDir' }],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var FirstHostDir = _classThis = class {
                    };
                    __setFunctionName(_classThis, "FirstHostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        FirstHostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return FirstHostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            hostDirectives: [FirstHostDir],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                        constructor() {
                            this.firstTokenValue = (0, core_1.inject)(firstToken);
                            this.secondTokenValue = (0, core_1.inject)(secondToken);
                        }
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { ref } = createRootComponent(HostComp);
                expect(ref.instance.firstTokenValue).toBe('FirstDir');
                expect(ref.instance.secondTokenValue).toBe('SecondDir');
            });
        });
        describe('inputs', () => {
            it('should set inputs on root component and all host directive instances using `setInput`', () => {
                let hostDirInstance;
                let otherHostDirInstance;
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var HostDir = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, void 0);
                            __runInitializers(this, _color_extraInitializers);
                            hostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let OtherHostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var OtherHostDir = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, void 0);
                            __runInitializers(this, _color_extraInitializers);
                            otherHostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "OtherHostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OtherHostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OtherHostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'host-comp',
                            hostDirectives: [
                                {
                                    directive: HostDir,
                                    inputs: ['color'],
                                },
                                {
                                    directive: OtherHostDir,
                                    inputs: ['color'],
                                },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var HostComp = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, void 0);
                            __runInitializers(this, _color_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { fixture, ref } = createRootComponent(HostComp);
                fixture.detectChanges();
                expect(hostDirInstance.color).toBe(undefined);
                expect(otherHostDirInstance.color).toBe(undefined);
                expect(ref.instance.color).toBe(undefined);
                ref.setInput('color', 'green');
                expect(hostDirInstance.color).toBe('green');
                expect(otherHostDirInstance.color).toBe('green');
                expect(ref.instance.color).toBe('green');
            });
            it('should set inputs that only exist on a host directive when using `setInput`', () => {
                let hostDirInstance;
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var HostDir = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, void 0);
                            __runInitializers(this, _color_extraInitializers);
                            hostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'host-comp',
                            hostDirectives: [
                                {
                                    directive: HostDir,
                                    inputs: ['color'],
                                },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { ref } = createRootComponent(HostComp);
                expect(hostDirInstance.color).toBe(undefined);
                expect(ref.instance.color).toBe(undefined);
                ref.setInput('color', 'color');
                expect(hostDirInstance.color).toBe('color');
                expect(ref.instance.color).toBe(undefined);
            });
            it('should set inputs that only exist on the root component when using `setInput`', () => {
                let hostDirInstance;
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var HostDir = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, void 0);
                            __runInitializers(this, _color_extraInitializers);
                            hostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'host-comp',
                            hostDirectives: [HostDir],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var HostComp = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, void 0);
                            __runInitializers(this, _color_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { ref, fixture } = createRootComponent(HostComp);
                fixture.detectChanges();
                expect(hostDirInstance.color).toBe(undefined);
                expect(ref.instance.color).toBe(undefined);
                ref.setInput('color', 'green');
                expect(hostDirInstance.color).toBe(undefined);
                expect(ref.instance.color).toBe('green');
            });
            it('should use the input name alias in `setInput`', () => {
                let hostDirInstance;
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var HostDir = _classThis = class {
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, void 0);
                            __runInitializers(this, _color_extraInitializers);
                            hostDirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.Input)('alias')];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'host-comp',
                            hostDirectives: [
                                {
                                    directive: HostDir,
                                    inputs: ['alias: customAlias'],
                                },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { ref, fixture } = createRootComponent(HostComp);
                fixture.detectChanges();
                expect(hostDirInstance.color).toBe(undefined);
                // Check that the old alias or the original name aren't available first.
                expect(() => ref.setInput('color', 'hello')).toThrowError(/NG0303: Can't set value of the 'color' input/);
                expect(() => ref.setInput('alias', 'hello')).toThrowError(/NG0303: Can't set value of the 'alias' input/);
                expect(hostDirInstance.color).toBe(undefined);
                // Check the alias.
                ref.setInput('customAlias', 'hello');
                expect(hostDirInstance.color).toBe('hello');
            });
            it('should invoke ngOnChanges when setting host directive inputs using setInput', () => {
                let latestChanges;
                let HostDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _color_decorators;
                    let _color_initializers = [];
                    let _color_extraInitializers = [];
                    var HostDir = _classThis = class {
                        ngOnChanges(changes) {
                            latestChanges = changes;
                        }
                        constructor() {
                            this.color = __runInitializers(this, _color_initializers, void 0);
                            __runInitializers(this, _color_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "HostDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _color_decorators = [(0, core_1.Input)('alias')];
                        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostDir = _classThis;
                })();
                let HostComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'host-comp',
                            hostDirectives: [{ directive: HostDir, inputs: ['alias: customAlias'] }],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "HostComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComp = _classThis;
                })();
                const { ref, fixture } = createRootComponent(HostComp);
                expect(latestChanges).toBe(undefined);
                ref.setInput('customAlias', 'red');
                fixture.detectChanges();
                expect(latestChanges).toEqual(jasmine.objectContaining({
                    color: jasmine.objectContaining({
                        previousValue: undefined,
                        currentValue: 'red',
                        firstChange: true,
                    }),
                }));
                ref.setInput('customAlias', 'green');
                fixture.detectChanges();
                expect(latestChanges).toEqual(jasmine.objectContaining({
                    color: jasmine.objectContaining({
                        previousValue: 'red',
                        currentValue: 'green',
                        firstChange: false,
                    }),
                }));
            });
        });
        it('should throw an error if a host directive is applied multiple times to a root component', () => {
            let DuplicateHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DuplicateHostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "DuplicateHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DuplicateHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DuplicateHostDir = _classThis;
            })();
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [DuplicateHostDir] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [HostDir, DuplicateHostDir] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let HostComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        hostDirectives: [Dir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComp = _classThis = class {
                };
                __setFunctionName(_classThis, "HostComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostComp = _classThis;
            })();
            expect(() => createRootComponent(HostComp)).toThrowError('NG0309: Directive DuplicateHostDir matches multiple times on the same element. Directives can only match an element once.');
        });
    });
    describe('invalid usage validations', () => {
        it('should throw an error if the metadata of a host directive cannot be resolved', () => {
            class HostDir {
            }
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0307: Could not resolve metadata for host directive HostDir. ' +
                'Make sure that the HostDir class is annotated with an @Directive decorator.');
        });
        it('should throw an error if a host directive is not standalone', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0308: Host directive HostDir must be standalone.');
        });
        it('should throw an error if a host directive matches multiple times in a template', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '<div dir></div>', imports: [HostDir, Dir] })];
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
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0309: Directive HostDir matches multiple times on the same element. Directives can only match an element once.');
        });
        it('should throw an error if a host directive matches multiple times on a component', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        hostDirectives: [HostDir],
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            const baseAppMetadata = {
                template: '<comp dir></comp>',
            };
            const expectedError = 'NG0309: Directive HostDir matches multiple times on the same element. Directives can only match an element once.';
            // Note: the definition order in `imports` seems to affect the
            // directive matching order so we test both scenarios.
            expect(() => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign(Object.assign({}, baseAppMetadata), { imports: [Comp, HostDir] }))];
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
                testing_1.TestBed.createComponent(App);
            }).toThrowError(expectedError);
            expect(() => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)(Object.assign(Object.assign({}, baseAppMetadata), { imports: [HostDir, Comp] }))];
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
                testing_1.TestBed.createComponent(App);
            }).toThrowError(expectedError);
        });
        it('should throw an error if a host directive appears multiple times in a chain', () => {
            let DuplicateHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DuplicateHostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "DuplicateHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DuplicateHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DuplicateHostDir = _classThis;
            })();
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [DuplicateHostDir] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir, DuplicateHostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0309: Directive DuplicateHostDir matches multiple times on the same element. Directives can only match an element once.');
        });
        it('should throw an error if a host directive is a component', () => {
            let HostComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '', selector: 'host-comp' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComp = _classThis = class {
                };
                __setFunctionName(_classThis, "HostComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostComp = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostComp],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0310: Host directive HostComp cannot be a component.');
        });
        it('should throw an error if a host directive output does not exist', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _foo_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foo_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            {
                                directive: HostDir,
                                outputs: ['doesNotExist'],
                            },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0311: Directive HostDir does not have an output with a public name of doesNotExist.');
        });
        it('should throw an error if a host directive output alias does not exist', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.foo = __runInitializers(this, _foo_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _foo_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foo_decorators = [(0, core_1.Output)('alias')];
                    __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            {
                                directive: HostDir,
                                outputs: ['foo'],
                            },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0311: Directive HostDir does not have an output with a public name of foo.');
        });
        it('should throw an error if a host directive input does not exist', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.foo = __runInitializers(this, _foo_initializers, void 0);
                        __runInitializers(this, _foo_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foo_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [
                            {
                                directive: HostDir,
                                inputs: ['doesNotExist'],
                            },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0311: Directive HostDir does not have an input with a public name of doesNotExist.');
        });
        it('should throw an error if a host directive input alias does not exist', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.foo = __runInitializers(this, _foo_initializers, void 0);
                        __runInitializers(this, _foo_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foo_decorators = [(0, core_1.Input)('alias')];
                    __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['foo'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0311: Directive HostDir does not have an input with a public name of foo.');
        });
        it('should throw an error if a host directive tries to alias to an existing input', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[host-dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                let _buttonColor_decorators;
                let _buttonColor_initializers = [];
                let _buttonColor_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        this.buttonColor = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _buttonColor_initializers, void 0));
                        __runInitializers(this, _buttonColor_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('colorAlias')];
                    _buttonColor_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, null, _buttonColor_decorators, { kind: "field", name: "buttonColor", static: false, private: false, access: { has: obj => "buttonColor" in obj, get: obj => obj.buttonColor, set: (obj, value) => { obj.buttonColor = value; } }, metadata: _metadata }, _buttonColor_initializers, _buttonColor_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['colorAlias: buttonColor'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Dir, HostDir],
                        template: '<button dir buttonColor="red"></button>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).toThrowError('NG0312: Cannot alias input colorAlias of host directive HostDir ' +
                'to buttonColor, because it already has a different input with the same public name.');
        });
        it('should throw an error if a host directive tries to alias to an existing input alias', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[host-dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                let _buttonColor_decorators;
                let _buttonColor_initializers = [];
                let _buttonColor_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        this.buttonColor = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _buttonColor_initializers, void 0));
                        __runInitializers(this, _buttonColor_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('colorAlias')];
                    _buttonColor_decorators = [(0, core_1.Input)('buttonColorAlias')];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, null, _buttonColor_decorators, { kind: "field", name: "buttonColor", static: false, private: false, access: { has: obj => "buttonColor" in obj, get: obj => obj.buttonColor, set: (obj, value) => { obj.buttonColor = value; } }, metadata: _metadata }, _buttonColor_initializers, _buttonColor_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['colorAlias: buttonColorAlias'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Dir, HostDir],
                        template: '<button dir buttonColorAlias="red"></button>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).toThrowError('NG0312: Cannot alias input colorAlias of host directive HostDir ' +
                'to buttonColorAlias, because it already has a different input with the same public name.');
        });
        it('should not throw if a host directive input aliases to the same name', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[host-dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _color_decorators;
                let _color_initializers = [];
                let _color_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.color = __runInitializers(this, _color_initializers, void 0);
                        __runInitializers(this, _color_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _color_decorators = [(0, core_1.Input)('color')];
                    __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['color: buttonColor'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Dir, HostDir],
                        template: '<button dir buttonColor="red"></button>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should throw an error if a host directive tries to alias to an existing output alias', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[host-dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _clicked_decorators;
                let _clicked_initializers = [];
                let _clicked_extraInitializers = [];
                let _tapped_decorators;
                let _tapped_initializers = [];
                let _tapped_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.clicked = __runInitializers(this, _clicked_initializers, new core_1.EventEmitter());
                        this.tapped = (__runInitializers(this, _clicked_extraInitializers), __runInitializers(this, _tapped_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _tapped_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _clicked_decorators = [(0, core_1.Output)('clickedAlias')];
                    _tapped_decorators = [(0, core_1.Output)('tappedAlias')];
                    __esDecorate(null, null, _clicked_decorators, { kind: "field", name: "clicked", static: false, private: false, access: { has: obj => "clicked" in obj, get: obj => obj.clicked, set: (obj, value) => { obj.clicked = value; } }, metadata: _metadata }, _clicked_initializers, _clicked_extraInitializers);
                    __esDecorate(null, null, _tapped_decorators, { kind: "field", name: "tapped", static: false, private: false, access: { has: obj => "tapped" in obj, get: obj => obj.tapped, set: (obj, value) => { obj.tapped = value; } }, metadata: _metadata }, _tapped_initializers, _tapped_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, outputs: ['clickedAlias: tappedAlias'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Dir, HostDir],
                        template: '<button dir (tappedAlias)="handleTap()"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    handleTap() { }
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).toThrowError('NG0312: Cannot alias output clickedAlias of host directive HostDir ' +
                'to tappedAlias, because it already has a different output with the same public name.');
        });
        it('should not throw if a host directive output aliases to the same name', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[host-dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _clicked_decorators;
                let _clicked_initializers = [];
                let _clicked_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.clicked = __runInitializers(this, _clicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _clicked_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _clicked_decorators = [(0, core_1.Output)('clicked')];
                    __esDecorate(null, null, _clicked_decorators, { kind: "field", name: "clicked", static: false, private: false, access: { has: obj => "clicked" in obj, get: obj => obj.clicked, set: (obj, value) => { obj.clicked = value; } }, metadata: _metadata }, _clicked_initializers, _clicked_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, outputs: ['clicked: wasClicked'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Dir, HostDir],
                        template: '<button dir (wasClicked)="handleClick()"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    handleClick() { }
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should not throw when exposing an aliased binding', () => {
            let Trigger = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        outputs: ['opened: triggerOpened'],
                        selector: '[trigger]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Trigger = _classThis = class {
                    constructor() {
                        this.opened = new core_1.EventEmitter();
                    }
                };
                __setFunctionName(_classThis, "Trigger");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Trigger = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Trigger = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[host]',
                        hostDirectives: [{ directive: Trigger, outputs: ['triggerOpened'] }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '<div host></div>', imports: [Host] })];
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
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should not throw when exposing an inherited aliased binding', () => {
            let Base = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Base = _classThis = class {
                    constructor() {
                        this.opened = new core_1.EventEmitter();
                    }
                };
                __setFunctionName(_classThis, "Base");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Base = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Base = _classThis;
            })();
            let Trigger = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        outputs: ['opened: triggerOpened'],
                        selector: '[trigger]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Base;
                var Trigger = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Trigger");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Trigger = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Trigger = _classThis;
            })();
            let Host = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[host]',
                        hostDirectives: [{ directive: Trigger, outputs: ['triggerOpened: hostOpened'] }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Host = _classThis = class {
                };
                __setFunctionName(_classThis, "Host");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Host = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Host = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '<div host></div>', imports: [Host] })];
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
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should throw an error if a duplicate directive is inherited', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostDir = _classThis = class {
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Grandparent = (() => {
                let _classDecorators = [(0, core_1.Directive)({ hostDirectives: [HostDir] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Grandparent = _classThis = class {
                };
                __setFunctionName(_classThis, "Grandparent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Grandparent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Grandparent = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Grandparent;
                var Parent = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [HostDir],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Parent;
                var Dir = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0309: Directive HostDir matches multiple times on the same element. Directives can only match an element once.');
        });
    });
});
