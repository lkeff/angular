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
const stringify_utils_1 = require("../../src/render3/util/stringify_utils");
const testing_1 = require("../../testing");
describe('createComponent', () => {
    it('should create an instance of a standalone component', () => {
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Hello {{ name }}!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
                constructor() {
                    this.name = 'Angular';
                }
            };
            __setFunctionName(_classThis, "StandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent = _classThis;
        })();
        const hostElement = document.createElement('div');
        const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const componentRef = (0, core_1.createComponent)(StandaloneComponent, { hostElement, environmentInjector });
        componentRef.changeDetectorRef.detectChanges();
        expect(hostElement.textContent).toBe('Hello Angular!');
        // Verify basic change detection works.
        componentRef.instance.name = 'ZoneJS';
        componentRef.changeDetectorRef.detectChanges();
        expect(hostElement.textContent).toBe('Hello ZoneJS!');
        componentRef.destroy();
    });
    it('should create an instance of an NgModule-based component', () => {
        let NgModuleBasedComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Hello {{ name }}!',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NgModuleBasedComponent = _classThis = class {
                constructor() {
                    this.name = 'Angular';
                }
            };
            __setFunctionName(_classThis, "NgModuleBasedComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NgModuleBasedComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NgModuleBasedComponent = _classThis;
        })();
        let AppModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [NgModuleBasedComponent],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppModule = _classThis = class {
            };
            __setFunctionName(_classThis, "AppModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppModule = _classThis;
        })();
        const hostElement = document.createElement('div');
        const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const componentRef = (0, core_1.createComponent)(NgModuleBasedComponent, {
            hostElement,
            environmentInjector,
        });
        componentRef.changeDetectorRef.detectChanges();
        expect(hostElement.textContent).toBe('Hello Angular!');
        // Verify basic change detection works.
        componentRef.instance.name = 'ZoneJS';
        componentRef.changeDetectorRef.detectChanges();
        expect(hostElement.textContent).toBe('Hello ZoneJS!');
    });
    it('should render projected content', () => {
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <ng-content></ng-content>|
        <ng-content></ng-content>|
        <ng-content></ng-content>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent = _classThis;
        })();
        // Helper method to create a `<p>` element
        const p = (content) => {
            const element = document.createElement('p');
            element.innerHTML = content;
            return element;
        };
        const hostElement = document.createElement('div');
        const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const projectableNodes = [[p('1')], [p('2')], [p('3')]];
        const componentRef = (0, core_1.createComponent)(StandaloneComponent, {
            hostElement,
            environmentInjector,
            projectableNodes,
        });
        componentRef.changeDetectorRef.detectChanges();
        expect(hostElement.innerHTML.replace(/\s*/g, '')).toBe('<p>1</p>|<p>2</p>|<p>3</p>');
        componentRef.destroy();
    });
    it('should be able to inject tokens from EnvironmentInjector', () => {
        const A = new core_1.InjectionToken('A');
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Token: {{ a }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
                constructor() {
                    this.a = (0, core_1.inject)(A);
                }
            };
            __setFunctionName(_classThis, "StandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent = _classThis;
        })();
        const hostElement = document.createElement('div');
        const parentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const providers = [{ provide: A, useValue: 'EnvironmentInjector(A)' }];
        const environmentInjector = (0, core_1.createEnvironmentInjector)(providers, parentInjector);
        const componentRef = (0, core_1.createComponent)(StandaloneComponent, { hostElement, environmentInjector });
        componentRef.changeDetectorRef.detectChanges();
        expect(hostElement.textContent).toBe('Token: EnvironmentInjector(A)');
        componentRef.destroy();
    });
    it('should be able to use NodeInjector from the node hierarchy', () => {
        const A = new core_1.InjectionToken('A');
        const B = new core_1.InjectionToken('B');
        let ChildStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{ a }} and {{ b }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildStandaloneComponent = _classThis = class {
                constructor() {
                    this.a = (0, core_1.inject)(A);
                    this.b = (0, core_1.inject)(B);
                }
            };
            __setFunctionName(_classThis, "ChildStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildStandaloneComponent = _classThis;
        })();
        let RootStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Tokens: <div #target></div>',
                    providers: [{ provide: A, useValue: 'ElementInjector(A)' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _target_decorators;
            let _target_initializers = [];
            let _target_extraInitializers = [];
            var RootStandaloneComponent = _classThis = class {
                constructor(injector) {
                    this.injector = injector;
                    this.target = __runInitializers(this, _target_initializers, void 0);
                    __runInitializers(this, _target_extraInitializers);
                    this.injector = injector;
                }
                createChildComponent() {
                    const hostElement = this.target.nativeElement;
                    const parentInjector = this.injector.get(core_1.EnvironmentInjector);
                    const providers = [
                        { provide: A, useValue: 'EnvironmentInjector(A)' },
                        { provide: B, useValue: 'EnvironmentInjector(B)' },
                    ];
                    const environmentInjector = (0, core_1.createEnvironmentInjector)(providers, parentInjector);
                    const childComponentRef = (0, core_1.createComponent)(ChildStandaloneComponent, {
                        hostElement,
                        elementInjector: this.injector,
                        environmentInjector,
                    });
                    childComponentRef.changeDetectorRef.detectChanges();
                }
            };
            __setFunctionName(_classThis, "RootStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _target_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ElementRef })];
                __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootStandaloneComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(RootStandaloneComponent);
        fixture.detectChanges();
        fixture.componentInstance.createChildComponent();
        const rootEl = fixture.nativeElement;
        // Token A is coming from the Element Injector, token B - from the Environment Injector.
        expect(rootEl.textContent).toBe('Tokens: ElementInjector(A) and EnvironmentInjector(B)');
    });
    it('should create a host element if none provided', () => {
        const selector = 'standalone-comp';
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector,
                    template: 'Hello {{ name }}!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
                constructor() {
                    this.name = 'Angular';
                }
            };
            __setFunctionName(_classThis, "StandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent = _classThis;
        })();
        const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const componentRef = (0, core_1.createComponent)(StandaloneComponent, { environmentInjector });
        componentRef.changeDetectorRef.detectChanges();
        const hostElement = componentRef.hostView
            .rootNodes[0];
        // A host element that matches component's selector.
        expect(hostElement.tagName.toLowerCase()).toBe(selector);
        expect(hostElement.textContent).toBe('Hello Angular!');
        componentRef.destroy();
    });
    it('should fall-back to use a `div` as a host element if none provided ' +
        'and element selector does not have a tag name', () => {
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '.some-class',
                    template: 'Hello {{ name }}!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
                constructor() {
                    this.name = 'Angular';
                }
            };
            __setFunctionName(_classThis, "StandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent = _classThis;
        })();
        const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const componentRef = (0, core_1.createComponent)(StandaloneComponent, { environmentInjector });
        componentRef.changeDetectorRef.detectChanges();
        const hostElement = componentRef.hostView
            .rootNodes[0];
        // A host element has the `div` tag name, since component's selector doesn't contain
        // tag name information (only a class name).
        expect(hostElement.tagName.toLowerCase()).toBe('div');
        expect(hostElement.textContent).toBe('Hello Angular!');
        componentRef.destroy();
    });
    describe('attaching directives to root component', () => {
        it('should be able to attach directives when creating a component', () => {
            const logs = [];
            let Dir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        host: {
                            'class': 'class-1',
                            'attr-one': 'one',
                        },
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir1 = _classThis = class {
                    constructor() {
                        logs.push('Dir1');
                    }
                };
                __setFunctionName(_classThis, "Dir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir1 = _classThis;
            })();
            let Dir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        host: {
                            'class': 'class-2',
                            'attr-two': 'two',
                        },
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir2 = _classThis = class {
                    constructor() {
                        logs.push('Dir2');
                    }
                };
                __setFunctionName(_classThis, "Dir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir2 = _classThis;
            })();
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        host: {
                            'class': 'host',
                            'attr-three': 'host',
                        },
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
                    constructor() {
                        logs.push('HostComponent');
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            (0, core_1.createComponent)(HostComponent, {
                hostElement,
                environmentInjector,
                directives: [Dir1, Dir2],
            });
            expect(logs).toEqual(['HostComponent', 'Dir1', 'Dir2']);
            expect(hostElement.className).toBe('host class-1 class-2');
            expect(hostElement.getAttribute('attr-one')).toBe('one');
            expect(hostElement.getAttribute('attr-two')).toBe('two');
            expect(hostElement.getAttribute('attr-three')).toBe('host');
        });
        it('should support setting the value of a directive using setInput', () => {
            let dirInstance;
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, null);
                        __runInitializers(this, _value_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(HostComponent, {
                hostElement,
                environmentInjector,
                directives: [Dir],
            });
            expect(dirInstance.value).toBe(null);
            ref.setInput('value', 1);
            expect(dirInstance.value).toBe(1);
            ref.setInput('value', 2);
            expect(dirInstance.value).toBe(2);
        });
        it('should execute host directives in the correct order', () => {
            const logs = [];
            let Chain1_3 = (() => {
                let _classDecorators = [(0, core_1.Directive)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Chain1_3 = _classThis = class {
                    constructor() {
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
                let _classDecorators = [(0, core_1.Directive)({})];
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
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '',
                        hostDirectives: [Chain1, Chain2, Chain3],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
                    constructor() {
                        logs.push('HostComponent');
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
            let Dir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir1 = _classThis = class {
                    constructor() {
                        logs.push('Dir1');
                    }
                };
                __setFunctionName(_classThis, "Dir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir1 = _classThis;
            })();
            let Dir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir2 = _classThis = class {
                    constructor() {
                        logs.push('Dir2');
                    }
                };
                __setFunctionName(_classThis, "Dir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir2 = _classThis;
            })();
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            (0, core_1.createComponent)(HostComponent, {
                hostElement,
                environmentInjector,
                directives: [Dir1, Dir2],
            });
            expect(logs).toEqual([
                'Chain1 - level 3',
                'Chain1 - level 2',
                'Chain1 - level 1',
                'Chain2 - level 2',
                'Chain2 - level 1',
                'Chain3 - level 2',
                'Chain3 - level 1',
                'HostComponent',
                'Dir1',
                'Dir2',
            ]);
        });
        it('should destroy the attached directives when the component ref is destroyed', () => {
            const logs = [];
            let Dir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir1 = _classThis = class {
                    ngOnDestroy() {
                        logs.push('Dir1');
                    }
                };
                __setFunctionName(_classThis, "Dir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir1 = _classThis;
            })();
            let Dir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir2 = _classThis = class {
                    ngOnDestroy() {
                        logs.push('Dir2');
                    }
                };
                __setFunctionName(_classThis, "Dir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir2 = _classThis;
            })();
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
                    ngOnDestroy() {
                        logs.push('HostComponent');
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(HostComponent, {
                hostElement,
                environmentInjector,
                directives: [Dir1, Dir2],
            });
            ref.destroy();
            expect(logs).toEqual(['HostComponent', 'Dir1', 'Dir2']);
        });
        it('should be able to inject the attached directive', () => {
            let createdInstance;
            let injectedInstance;
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({})];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        createdInstance = this;
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
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
                    constructor() {
                        injectedInstance = (0, core_1.inject)(Dir);
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            (0, core_1.createComponent)(HostComponent, {
                hostElement,
                environmentInjector,
                directives: [Dir],
            });
            expect(createdInstance).toBeTruthy();
            expect(injectedInstance).toBeTruthy();
            expect(createdInstance).toBe(injectedInstance);
        });
        it('should write to the inputs of the attached directives using setInput', () => {
            let dirInstance;
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, 0);
                        __runInitializers(this, _someInput_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var HostComponent = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, 0);
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostComponent = _classThis;
            })();
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(HostComponent, {
                hostElement,
                environmentInjector,
                directives: [Dir],
            });
            expect(dirInstance.someInput).toBe(0);
            expect(ref.instance.someInput).toBe(0);
            ref.setInput('someInput', 1);
            expect(dirInstance.someInput).toBe(1);
            expect(ref.instance.someInput).toBe(1);
            ref.setInput('someInput', 2);
            expect(dirInstance.someInput).toBe(2);
            expect(ref.instance.someInput).toBe(2);
        });
        it('should throw if the same directive is attached multiple times', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({})];
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
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => {
                (0, core_1.createComponent)(HostComponent, {
                    hostElement,
                    environmentInjector,
                    directives: [Dir, Dir],
                });
            }).toThrowError(/Directive Dir matches multiple times on the same element/);
        });
        it('should throw if a non-directive class is attached', () => {
            class NotADir {
            }
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => {
                (0, core_1.createComponent)(HostComponent, {
                    hostElement,
                    environmentInjector,
                    directives: [NotADir],
                });
            }).toThrowError(/Type NotADir does not have 'ɵdir' property/);
        });
        it('should throw if a non-directive class is attached using the DirectiveWithBinding syntax', () => {
            class NotADir {
            }
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => {
                (0, core_1.createComponent)(HostComponent, {
                    hostElement,
                    environmentInjector,
                    directives: [
                        {
                            type: NotADir,
                            bindings: [],
                        },
                    ],
                });
            }).toThrowError(/Type NotADir does not have 'ɵdir' property/);
        });
        it('should throw if a component class is attached', () => {
            let NotADir = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '', standalone: true })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NotADir = _classThis = class {
                };
                __setFunctionName(_classThis, "NotADir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NotADir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NotADir = _classThis;
            })();
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => {
                (0, core_1.createComponent)(HostComponent, {
                    hostElement,
                    environmentInjector,
                    directives: [NotADir],
                });
            }).toThrowError(/Type NotADir does not have 'ɵdir' property/);
        });
        it('should throw if attached directive is not standalone', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ standalone: false })];
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
            let HostComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostComponent = _classThis = class {
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
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => {
                (0, core_1.createComponent)(HostComponent, {
                    hostElement,
                    environmentInjector,
                    directives: [Dir],
                });
            }).toThrowError(/The Dir directive must be standalone in order to be applied to a dynamically-created component/);
        });
    });
    describe('root component inputs', () => {
        it('should be able to bind to inputs of the root component', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '{{one}} - {{two}} - {{other}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _one_decorators;
                let _one_initializers = [];
                let _one_extraInitializers = [];
                let _two_decorators;
                let _two_initializers = [];
                let _two_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.one = __runInitializers(this, _one_initializers, '');
                        this.two = (__runInitializers(this, _one_extraInitializers), __runInitializers(this, _two_initializers, ''));
                        this.other = (__runInitializers(this, _two_extraInitializers), 'other');
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _one_decorators = [(0, core_1.Input)()];
                    _two_decorators = [(0, core_1.Input)({ alias: 'twoAlias' })];
                    __esDecorate(null, null, _one_decorators, { kind: "field", name: "one", static: false, private: false, access: { has: obj => "one" in obj, get: obj => obj.one, set: (obj, value) => { obj.one = value; } }, metadata: _metadata }, _one_initializers, _one_extraInitializers);
                    __esDecorate(null, null, _two_decorators, { kind: "field", name: "two", static: false, private: false, access: { has: obj => "two" in obj, get: obj => obj.two, set: (obj, value) => { obj.two = value; } }, metadata: _metadata }, _two_initializers, _two_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const oneValue = (0, core_1.signal)('initial');
            let twoValue = 'initial';
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.inputBinding)('one', oneValue), (0, core_1.inputBinding)('twoAlias', () => twoValue)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(hostElement.textContent).toBe('initial - initial - other');
            oneValue.set('1');
            ref.changeDetectorRef.detectChanges();
            expect(hostElement.textContent).toBe('1 - initial - other');
            twoValue = '1';
            ref.changeDetectorRef.detectChanges();
            expect(hostElement.textContent).toBe('1 - 1 - other');
            oneValue.set('2');
            twoValue = '2';
            ref.changeDetectorRef.detectChanges();
            expect(hostElement.textContent).toBe('2 - 2 - other');
        });
        it('should not bind root component inputs to directives', () => {
            let dirInstance;
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootDir = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [RootDir],
                bindings: [(0, core_1.inputBinding)('someInput', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe('initial');
            expect(dirInstance.someInput).toBe('');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe('changed');
            expect(dirInstance.someInput).toBe('');
        });
        it('should bind root component inputs to host directives of the root component, in addition to the component itself', () => {
            let hostDirInstance;
            let dirInstance;
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootDir = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            let RootHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootHostDir = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                        hostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootHostDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        hostDirectives: [{ directive: RootHostDir, inputs: ['someInput'] }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [RootDir],
                bindings: [(0, core_1.inputBinding)('someInput', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe('initial');
            expect(hostDirInstance.someInput).toBe('initial');
            expect(dirInstance.someInput).toBe('');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe('changed');
            expect(hostDirInstance.someInput).toBe('changed');
            expect(dirInstance.someInput).toBe('');
        });
        it('should bind to inputs of host directives of directives applied to the root component', () => {
            let hostDirInstance;
            let RootHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootHostDir = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                        hostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootHostDir = _classThis;
            })();
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        hostDirectives: [
                            {
                                directive: RootHostDir,
                                inputs: ['someInput: alias'],
                            },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootDir = _classThis = class {
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootComp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [
                    {
                        type: RootDir,
                        bindings: [(0, core_1.inputBinding)('alias', value)],
                    },
                ],
            });
            ref.changeDetectorRef.detectChanges();
            expect(hostDirInstance.someInput).toBe('initial');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(hostDirInstance.someInput).toBe('changed');
        });
        it('should bind to aliased inputs of host directives of the root component', () => {
            let dirInstance;
            let RootHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootHostDir = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)({ alias: 'someAlias' })];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootHostDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        hostDirectives: [{ directive: RootHostDir, inputs: ['someAlias: alias'] }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootComp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.inputBinding)('alias', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(dirInstance.someInput).toBe('initial');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(dirInstance.someInput).toBe('changed');
        });
        it('should bind input to directives, but not the root component', () => {
            let dir1Instance;
            let dir2Instance;
            let RootDir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootDir1 = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                        dir1Instance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir1 = _classThis;
            })();
            let RootDir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someOtherInput_decorators;
                let _someOtherInput_initializers = [];
                let _someOtherInput_extraInitializers = [];
                var RootDir2 = _classThis = class {
                    constructor() {
                        this.someOtherInput = __runInitializers(this, _someOtherInput_initializers, '');
                        __runInitializers(this, _someOtherInput_extraInitializers);
                        dir2Instance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someOtherInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someOtherInput_decorators, { kind: "field", name: "someOtherInput", static: false, private: false, access: { has: obj => "someOtherInput" in obj, get: obj => obj.someOtherInput, set: (obj, value) => { obj.someOtherInput = value; } }, metadata: _metadata }, _someOtherInput_initializers, _someOtherInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir2 = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                let _someOtherInput_decorators;
                let _someOtherInput_initializers = [];
                let _someOtherInput_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        this.someOtherInput = (__runInitializers(this, _someInput_extraInitializers), __runInitializers(this, _someOtherInput_initializers, ''));
                        __runInitializers(this, _someOtherInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    _someOtherInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, null, _someOtherInput_decorators, { kind: "field", name: "someOtherInput", static: false, private: false, access: { has: obj => "someOtherInput" in obj, get: obj => obj.someOtherInput, set: (obj, value) => { obj.someOtherInput = value; } }, metadata: _metadata }, _someOtherInput_initializers, _someOtherInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const oneValue = (0, core_1.signal)('initial');
            const twoValue = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [
                    {
                        type: RootDir1,
                        bindings: [(0, core_1.inputBinding)('someInput', oneValue)],
                    },
                    {
                        type: RootDir2,
                        bindings: [(0, core_1.inputBinding)('someOtherInput', twoValue)],
                    },
                ],
            });
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe('');
            expect(ref.instance.someOtherInput).toBe('');
            expect(dir1Instance.someInput).toBe('initial');
            expect(dir2Instance.someOtherInput).toBe('initial');
            oneValue.set('one changed');
            twoValue.set('two changed');
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe('');
            expect(ref.instance.someOtherInput).toBe('');
            expect(dir1Instance.someInput).toBe('one changed');
            expect(dir2Instance.someOtherInput).toBe('two changed');
        });
        it('should invoke ngOnChanges when binding to a root component input', () => {
            const changes = [];
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootComp = _classThis = class {
                    ngOnChanges(c) {
                        changes.push(c['someInput']);
                    }
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.inputBinding)('someInput', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(changes).toEqual([
                jasmine.objectContaining({
                    firstChange: true,
                    previousValue: undefined,
                    currentValue: 'initial',
                }),
            ]);
            value.set('1');
            ref.changeDetectorRef.detectChanges();
            expect(changes).toEqual([
                jasmine.objectContaining({
                    firstChange: true,
                    previousValue: undefined,
                    currentValue: 'initial',
                }),
                jasmine.objectContaining({
                    firstChange: false,
                    previousValue: 'initial',
                    currentValue: '1',
                }),
            ]);
        });
        it('should transform input bound to the root component', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, -1);
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)({ transform: (value) => parseInt(value) })];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)(0);
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.inputBinding)('someInput', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe(0);
            value.set(1);
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe(1);
        });
        it('should bind different values to inputs that all have the same name', () => {
            let dir1Instance;
            let dir2Instance;
            let RootDir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootDir1 = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                        dir1Instance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir1 = _classThis;
            })();
            let RootDir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootDir2 = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                        dir2Instance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir2 = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const rootValue = (0, core_1.signal)('initial');
            const oneValue = (0, core_1.signal)('initial');
            const twoValue = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.inputBinding)('someInput', rootValue)],
                directives: [
                    {
                        type: RootDir1,
                        bindings: [(0, core_1.inputBinding)('someInput', oneValue)],
                    },
                    {
                        type: RootDir2,
                        bindings: [(0, core_1.inputBinding)('someInput', twoValue)],
                    },
                ],
            });
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe('initial');
            expect(dir1Instance.someInput).toBe('initial');
            expect(dir2Instance.someInput).toBe('initial');
            rootValue.set('root changed');
            oneValue.set('one changed');
            twoValue.set('two changed');
            ref.changeDetectorRef.detectChanges();
            expect(ref.instance.someInput).toBe('root changed');
            expect(dir1Instance.someInput).toBe('one changed');
            expect(dir2Instance.someInput).toBe('two changed');
        });
        it('should only invoke setters if the value has changed', () => {
            let setterCount = 0;
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_someInput_decorators;
                var RootComp = _classThis = class {
                    set someInput(_) {
                        setterCount++;
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_someInput_decorators, { kind: "setter", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.inputBinding)('someInput', value)],
            });
            expect(setterCount).toBe(0);
            ref.changeDetectorRef.detectChanges();
            expect(setterCount).toBe(1);
            ref.changeDetectorRef.detectChanges();
            expect(setterCount).toBe(1);
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(setterCount).toBe(2);
            ref.changeDetectorRef.detectChanges();
            expect(setterCount).toBe(2);
        });
        it('should throw if target does not have an input with a specific name', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootDir = _classThis = class {
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [
                    {
                        type: RootDir,
                        // `someInput` exists on `RootComp`, but not `RootDir`.
                        bindings: [(0, core_1.inputBinding)('someInput', value)],
                    },
                ],
            });
            expect(() => {
                ref.changeDetectorRef.detectChanges();
            }).toThrowError(/RootDir does not have an input with a public name of "someInput"/);
        });
        it('should throw when using setInput on a component already using inputBindings', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _someInput_decorators;
                let _someInput_initializers = [];
                let _someInput_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.someInput = __runInitializers(this, _someInput_initializers, '');
                        __runInitializers(this, _someInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _someInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.inputBinding)('someInput', () => 'hello')],
            });
            ref.changeDetectorRef.detectChanges();
            expect(() => {
                ref.setInput('someInput', 'changed');
            }).toThrowError(/Cannot call `setInput` on a component that is using the `inputBinding` or `twoWayBinding` functions/);
        });
    });
    describe('root component outputs', () => {
        it('should be able to bind to outputs of the root component', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const events = [];
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.outputBinding)('event', (event) => events.push(event))],
            });
            ref.changeDetectorRef.detectChanges();
            expect(events).toEqual([]);
            ref.instance.event.emit({ value: 0 });
            expect(events).toEqual([jasmine.objectContaining({ value: 0 })]);
            ref.instance.event.emit({ value: 1 });
            expect(events).toEqual([
                jasmine.objectContaining({ value: 0 }),
                jasmine.objectContaining({ value: 1 }),
            ]);
        });
        it('should clean up root component output listeners', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            let count = 0;
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.outputBinding)('event', () => count++)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(count).toBe(0);
            ref.instance.event.emit();
            expect(count).toBe(1);
            ref.destroy();
            ref.instance.event.emit();
            expect(count).toBe(1);
        });
        it('should handle errors in root component listeners through the ErrorHandler', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                rethrowApplicationErrors: false,
                providers: [
                    {
                        provide: core_1.ErrorHandler,
                        useValue: {
                            handleError: (error) => errors.push(error.message),
                        },
                    },
                ],
            });
            const errors = [];
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [
                    (0, core_1.outputBinding)('event', () => {
                        throw new Error('oh no');
                    }),
                ],
            });
            ref.changeDetectorRef.detectChanges();
            expect(errors).toEqual([]);
            ref.instance.event.emit();
            expect(errors).toEqual(['oh no']);
        });
        it('should listen to host directive outputs on the root component', () => {
            let hostDirInstance;
            let dirInstance;
            let RootHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myEvent_decorators;
                let _myEvent_initializers = [];
                let _myEvent_extraInitializers = [];
                var RootHostDir = _classThis = class {
                    constructor() {
                        this.myEvent = __runInitializers(this, _myEvent_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _myEvent_extraInitializers);
                        hostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myEvent_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _myEvent_decorators, { kind: "field", name: "myEvent", static: false, private: false, access: { has: obj => "myEvent" in obj, get: obj => obj.myEvent, set: (obj, value) => { obj.myEvent = value; } }, metadata: _metadata }, _myEvent_initializers, _myEvent_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootHostDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        hostDirectives: [
                            {
                                directive: RootHostDir,
                                outputs: ['myEvent: event'],
                            },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootDir = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            const logs = [];
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.outputBinding)('event', (value) => logs.push(value))],
                directives: [RootDir],
            });
            ref.changeDetectorRef.detectChanges();
            expect(logs).toEqual([]);
            ref.instance.event.emit('component');
            expect(logs).toEqual(['component']);
            hostDirInstance.myEvent.emit('host directive');
            expect(logs).toEqual(['component', 'host directive']);
            dirInstance.event.emit('directive');
            expect(logs).toEqual(['component', 'host directive']);
        });
        it('should not listen to directive outputs with the same name as outputs on the root component', () => {
            let dirInstance;
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootDir = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            const logs = [];
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.outputBinding)('event', (value) => logs.push(value))],
                directives: [RootDir],
            });
            ref.changeDetectorRef.detectChanges();
            expect(logs).toEqual([]);
            ref.instance.event.emit('component');
            expect(logs).toEqual(['component']);
            dirInstance.event.emit('directive');
            expect(logs).toEqual(['component']);
        });
        it('should not listen to root component outputs with the same name as outputs on one of the directives', () => {
            let dirInstance;
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var RootDir = _classThis = class {
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            const logs = [];
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [
                    {
                        type: RootDir,
                        bindings: [(0, core_1.outputBinding)('event', (value) => logs.push(value))],
                    },
                ],
            });
            ref.changeDetectorRef.detectChanges();
            expect(logs).toEqual([]);
            dirInstance.event.emit('directive');
            expect(logs).toEqual(['directive']);
            ref.instance.event.emit('component');
            expect(logs).toEqual(['directive']);
        });
        it('should throw if root component does not have an output with the specified name', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootComp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => {
                (0, core_1.createComponent)(RootComp, {
                    hostElement,
                    environmentInjector,
                    bindings: [(0, core_1.outputBinding)('click', () => { })],
                });
            }).toThrowError(/RootComp does not have an output with a public name of "click"/);
        });
        it('should not listen to native event when creating an output binding', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _click_decorators;
                let _click_initializers = [];
                let _click_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.click = __runInitializers(this, _click_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _click_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _click_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _click_decorators, { kind: "field", name: "click", static: false, private: false, access: { has: obj => "click" in obj, get: obj => obj.click, set: (obj, value) => { obj.click = value; } }, metadata: _metadata }, _click_initializers, _click_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const hostElement = document.createElement('button');
            const spy = spyOn(hostElement, 'addEventListener');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.outputBinding)('click', () => { })],
            });
            ref.changeDetectorRef.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
    });
    describe('root component two-way bindings', () => {
        it('should be able to use a two-way binding on the root component', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: 'Value: {{value}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.twoWayBinding)('value', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('initial');
            expect(hostElement.textContent).toBe('Value: initial');
            value.set('1');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('1');
            expect(hostElement.textContent).toBe('Value: 1');
            ref.instance.value = '2';
            ref.instance.valueChange.emit('2');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('2');
            expect(hostElement.textContent).toBe('Value: 2');
        });
        it('should be able to two-way bind the same signal to multiple directives', () => {
            let dirInstance;
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootDir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [
                    {
                        type: RootDir,
                        bindings: [(0, core_1.twoWayBinding)('value', value)],
                    },
                ],
                bindings: [(0, core_1.twoWayBinding)('value', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('initial');
            expect(ref.instance.value).toBe('initial');
            expect(dirInstance.value).toBe('initial');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('changed');
            expect(ref.instance.value).toBe('changed');
            expect(dirInstance.value).toBe('changed');
            ref.instance.value = 'root changed';
            ref.instance.valueChange.emit('root changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('root changed');
            expect(ref.instance.value).toBe('root changed');
            expect(dirInstance.value).toBe('root changed');
            dirInstance.value = 'dir changed';
            dirInstance.valueChange.emit('dir changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('dir changed');
            expect(ref.instance.value).toBe('dir changed');
            expect(dirInstance.value).toBe('dir changed');
        });
        it('should not bind root component two-way bindings to directives', () => {
            let dirInstance;
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootDir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [RootDir],
                bindings: [(0, core_1.twoWayBinding)('value', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('initial');
            expect(ref.instance.value).toBe('initial');
            expect(dirInstance.value).toBe('');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('changed');
            expect(ref.instance.value).toBe('changed');
            expect(dirInstance.value).toBe('');
            ref.instance.value = 'root changed';
            ref.instance.valueChange.emit('root changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('root changed');
            expect(ref.instance.value).toBe('root changed');
            expect(dirInstance.value).toBe('');
            dirInstance.value = 'dir changed';
            dirInstance.valueChange.emit('dir changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('root changed');
            expect(ref.instance.value).toBe('root changed');
            expect(dirInstance.value).toBe('dir changed');
        });
        it('should bind root component two-way bindings to host directives of the root component, in addition to the component itself', () => {
            let hostDirInstance;
            let dirInstance;
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootDir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            let RootHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootHostDir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        hostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootHostDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        hostDirectives: [{ directive: RootHostDir, inputs: ['value'], outputs: ['valueChange'] }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [RootDir],
                bindings: [(0, core_1.twoWayBinding)('value', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('initial');
            expect(ref.instance.value).toBe('initial');
            expect(hostDirInstance.value).toBe('initial');
            expect(dirInstance.value).toBe('');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('changed');
            expect(ref.instance.value).toBe('changed');
            expect(hostDirInstance.value).toBe('changed');
            expect(dirInstance.value).toBe('');
            hostDirInstance.value = 'host dir changed';
            hostDirInstance.valueChange.emit('host dir changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('host dir changed');
            expect(ref.instance.value).toBe('host dir changed');
            expect(hostDirInstance.value).toBe('host dir changed');
            expect(dirInstance.value).toBe('');
            ref.instance.value = 'root changed';
            ref.instance.valueChange.emit('root changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('root changed');
            expect(ref.instance.value).toBe('root changed');
            expect(hostDirInstance.value).toBe('root changed');
            expect(dirInstance.value).toBe('');
            dirInstance.value = 'dir changed';
            dirInstance.valueChange.emit('dir changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('root changed');
            expect(ref.instance.value).toBe('root changed');
            expect(hostDirInstance.value).toBe('root changed');
            expect(dirInstance.value).toBe('dir changed');
        });
        it('should two-way bind to inputs of host directives of directives applied to the root component', () => {
            let hostDirInstance;
            let RootHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootHostDir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        hostDirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootHostDir = _classThis;
            })();
            let RootDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        hostDirectives: [
                            {
                                directive: RootHostDir,
                                inputs: ['value: valueAlias'],
                                outputs: ['valueChange: valueAliasChange'],
                            },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootDir = _classThis = class {
                };
                __setFunctionName(_classThis, "RootDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootComp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [
                    {
                        type: RootDir,
                        bindings: [(0, core_1.twoWayBinding)('valueAlias', value)],
                    },
                ],
            });
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('initial');
            expect(hostDirInstance.value).toBe('initial');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('changed');
            expect(hostDirInstance.value).toBe('changed');
            hostDirInstance.value = 'host dir changed';
            hostDirInstance.valueChange.emit('host dir changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('host dir changed');
            expect(hostDirInstance.value).toBe('host dir changed');
        });
        it('should two-way bind to aliased inputs of host directives of the root component', () => {
            let dirInstance;
            let RootHostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootHostDir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "RootHostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ alias: 'valueAlias' })];
                    _valueChange_decorators = [(0, core_1.Output)('valueAliasChange')];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootHostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootHostDir = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        hostDirectives: [
                            {
                                directive: RootHostDir,
                                inputs: ['valueAlias: myAlias'],
                                outputs: ['valueAliasChange: myAliasChange'],
                            },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootComp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.twoWayBinding)('myAlias', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('initial');
            expect(dirInstance.value).toBe('initial');
            value.set('changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('changed');
            expect(dirInstance.value).toBe('changed');
            dirInstance.value = 'host dir changed';
            dirInstance.valueChange.emit('host dir changed');
            ref.changeDetectorRef.detectChanges();
            expect(value()).toBe('host dir changed');
            expect(dirInstance.value).toBe('host dir changed');
        });
        it('should two-way bind to directive inputs, but not inputs on the root component', () => {
            let dir1Instance;
            let dir2Instance;
            let RootDir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootDir1 = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        dir1Instance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir1 = _classThis;
            })();
            let RootDir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _otherValue_decorators;
                let _otherValue_initializers = [];
                let _otherValue_extraInitializers = [];
                let _otherValueChange_decorators;
                let _otherValueChange_initializers = [];
                let _otherValueChange_extraInitializers = [];
                var RootDir2 = _classThis = class {
                    constructor() {
                        this.otherValue = __runInitializers(this, _otherValue_initializers, '');
                        this.otherValueChange = (__runInitializers(this, _otherValue_extraInitializers), __runInitializers(this, _otherValueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _otherValueChange_extraInitializers);
                        dir2Instance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _otherValue_decorators = [(0, core_1.Input)()];
                    _otherValueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _otherValue_decorators, { kind: "field", name: "otherValue", static: false, private: false, access: { has: obj => "otherValue" in obj, get: obj => obj.otherValue, set: (obj, value) => { obj.otherValue = value; } }, metadata: _metadata }, _otherValue_initializers, _otherValue_extraInitializers);
                    __esDecorate(null, null, _otherValueChange_decorators, { kind: "field", name: "otherValueChange", static: false, private: false, access: { has: obj => "otherValueChange" in obj, get: obj => obj.otherValueChange, set: (obj, value) => { obj.otherValueChange = value; } }, metadata: _metadata }, _otherValueChange_initializers, _otherValueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir2 = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                let _otherValue_decorators;
                let _otherValue_initializers = [];
                let _otherValue_extraInitializers = [];
                let _otherValueChange_decorators;
                let _otherValueChange_initializers = [];
                let _otherValueChange_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        this.otherValue = (__runInitializers(this, _valueChange_extraInitializers), __runInitializers(this, _otherValue_initializers, ''));
                        this.otherValueChange = (__runInitializers(this, _otherValue_extraInitializers), __runInitializers(this, _otherValueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _otherValueChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    _otherValue_decorators = [(0, core_1.Input)()];
                    _otherValueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, null, _otherValue_decorators, { kind: "field", name: "otherValue", static: false, private: false, access: { has: obj => "otherValue" in obj, get: obj => obj.otherValue, set: (obj, value) => { obj.otherValue = value; } }, metadata: _metadata }, _otherValue_initializers, _otherValue_extraInitializers);
                    __esDecorate(null, null, _otherValueChange_decorators, { kind: "field", name: "otherValueChange", static: false, private: false, access: { has: obj => "otherValueChange" in obj, get: obj => obj.otherValueChange, set: (obj, value) => { obj.otherValueChange = value; } }, metadata: _metadata }, _otherValueChange_initializers, _otherValueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const oneValue = (0, core_1.signal)('initial');
            const twoValue = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                directives: [
                    {
                        type: RootDir1,
                        bindings: [(0, core_1.twoWayBinding)('value', oneValue)],
                    },
                    {
                        type: RootDir2,
                        bindings: [(0, core_1.twoWayBinding)('otherValue', twoValue)],
                    },
                ],
            });
            ref.changeDetectorRef.detectChanges();
            expect(oneValue()).toBe('initial');
            expect(twoValue()).toBe('initial');
            expect(ref.instance.value).toBe('');
            expect(ref.instance.otherValue).toBe('');
            expect(dir1Instance.value).toBe('initial');
            expect(dir2Instance.otherValue).toBe('initial');
            oneValue.set('one changed');
            twoValue.set('two changed');
            ref.changeDetectorRef.detectChanges();
            expect(oneValue()).toBe('one changed');
            expect(twoValue()).toBe('two changed');
            expect(ref.instance.value).toBe('');
            expect(ref.instance.otherValue).toBe('');
            expect(dir1Instance.value).toBe('one changed');
            expect(dir2Instance.otherValue).toBe('two changed');
            ref.instance.value = 'root changed one';
            ref.instance.valueChange.emit('root changed one');
            ref.instance.otherValue = 'root changed two';
            ref.instance.otherValueChange.emit('root changed two');
            ref.changeDetectorRef.detectChanges();
            expect(oneValue()).toBe('one changed');
            expect(twoValue()).toBe('two changed');
            expect(ref.instance.value).toBe('root changed one');
            expect(ref.instance.otherValue).toBe('root changed two');
            expect(dir1Instance.value).toBe('one changed');
            expect(dir2Instance.otherValue).toBe('two changed');
            dir1Instance.value = 'one changed again';
            dir1Instance.valueChange.emit('one changed again');
            ref.changeDetectorRef.detectChanges();
            expect(oneValue()).toBe('one changed again');
            expect(twoValue()).toBe('two changed');
            expect(ref.instance.value).toBe('root changed one');
            expect(ref.instance.otherValue).toBe('root changed two');
            expect(dir1Instance.value).toBe('one changed again');
            expect(dir2Instance.otherValue).toBe('two changed');
            dir2Instance.otherValue = 'two changed again';
            dir2Instance.otherValueChange.emit('two changed again');
            ref.changeDetectorRef.detectChanges();
            expect(oneValue()).toBe('one changed again');
            expect(twoValue()).toBe('two changed again');
            expect(ref.instance.value).toBe('root changed one');
            expect(ref.instance.otherValue).toBe('root changed two');
            expect(dir1Instance.value).toBe('one changed again');
            expect(dir2Instance.otherValue).toBe('two changed again');
        });
        it('should two-way bind different values to inputs that all have the same name', () => {
            let dir1Instance;
            let dir2Instance;
            let RootDir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootDir1 = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        dir1Instance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir1 = _classThis;
            })();
            let RootDir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootDir2 = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                        dir2Instance = this;
                    }
                };
                __setFunctionName(_classThis, "RootDir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootDir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootDir2 = _classThis;
            })();
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const rootValue = (0, core_1.signal)('initial');
            const oneValue = (0, core_1.signal)('initial');
            const twoValue = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.twoWayBinding)('value', rootValue)],
                directives: [
                    {
                        type: RootDir1,
                        bindings: [(0, core_1.twoWayBinding)('value', oneValue)],
                    },
                    {
                        type: RootDir2,
                        bindings: [(0, core_1.twoWayBinding)('value', twoValue)],
                    },
                ],
            });
            ref.changeDetectorRef.detectChanges();
            expect(rootValue()).toBe('initial');
            expect(oneValue()).toBe('initial');
            expect(twoValue()).toBe('initial');
            expect(ref.instance.value).toBe('initial');
            expect(dir1Instance.value).toBe('initial');
            expect(dir2Instance.value).toBe('initial');
            rootValue.set('root changed');
            oneValue.set('one changed');
            twoValue.set('two changed');
            ref.changeDetectorRef.detectChanges();
            expect(rootValue()).toBe('root changed');
            expect(oneValue()).toBe('one changed');
            expect(twoValue()).toBe('two changed');
            expect(ref.instance.value).toBe('root changed');
            expect(dir1Instance.value).toBe('one changed');
            expect(dir2Instance.value).toBe('two changed');
            dir1Instance.value = 'one changed again';
            dir1Instance.valueChange.emit('one changed again');
            ref.changeDetectorRef.detectChanges();
            expect(rootValue()).toBe('root changed');
            expect(oneValue()).toBe('one changed again');
            expect(twoValue()).toBe('two changed');
            expect(ref.instance.value).toBe('root changed');
            expect(dir1Instance.value).toBe('one changed again');
            expect(dir2Instance.value).toBe('two changed');
            dir2Instance.value = 'two changed again';
            dir2Instance.valueChange.emit('two changed again');
            ref.changeDetectorRef.detectChanges();
            expect(rootValue()).toBe('root changed');
            expect(oneValue()).toBe('one changed again');
            expect(twoValue()).toBe('two changed again');
            expect(ref.instance.value).toBe('root changed');
            expect(dir1Instance.value).toBe('one changed again');
            expect(dir2Instance.value).toBe('two changed again');
        });
        it('should throw if two-way binding target does not have an input with the specific name', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.valueChange = __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _valueChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => {
                const ref = (0, core_1.createComponent)(RootComp, {
                    hostElement,
                    environmentInjector,
                    bindings: [(0, core_1.twoWayBinding)('value', value)],
                });
                ref.changeDetectorRef.detectChanges();
            }).toThrowError(/RootComp does not have an input with a public name of "value"/);
        });
        it('should throw if two-way binding target does not have an output with the specific name', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('initial');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => {
                (0, core_1.createComponent)(RootComp, {
                    hostElement,
                    environmentInjector,
                    bindings: [(0, core_1.twoWayBinding)('value', value)],
                });
            }).toThrowError(/RootComp does not have an output with a public name of "valueChange"/);
        });
        it('should throw when using setInput on a component already using twoWayBinding', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                let _valueChange_decorators;
                let _valueChange_initializers = [];
                let _valueChange_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _valueChange_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    _valueChange_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            const value = (0, core_1.signal)('');
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const ref = (0, core_1.createComponent)(RootComp, {
                hostElement,
                environmentInjector,
                bindings: [(0, core_1.twoWayBinding)('value', value)],
            });
            ref.changeDetectorRef.detectChanges();
            expect(() => {
                ref.setInput('value', 'changed');
            }).toThrowError(/Cannot call `setInput` on a component that is using the `inputBinding` or `twoWayBinding` functions/);
        });
    });
    describe('error checking', () => {
        it('should throw when provided class is not a component', () => {
            class NotAComponent {
            }
            let ADirective = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ADirective = _classThis = class {
                };
                __setFunctionName(_classThis, "ADirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ADirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ADirective = _classThis;
            })();
            let AnInjectiable = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnInjectiable = _classThis = class {
                };
                __setFunctionName(_classThis, "AnInjectiable");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnInjectiable = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnInjectiable = _classThis;
            })();
            const errorFor = (type) => `NG0906: The ${(0, stringify_utils_1.stringifyForError)(type)} is not an Angular component, ` +
                `make sure it has the \`@Component\` decorator.`;
            const hostElement = document.createElement('div');
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => (0, core_1.createComponent)(NotAComponent, { hostElement, environmentInjector })).toThrowError(errorFor(NotAComponent));
            expect(() => (0, core_1.createComponent)(ADirective, { hostElement, environmentInjector })).toThrowError(errorFor(ADirective));
            expect(() => (0, core_1.createComponent)(AnInjectiable, { hostElement, environmentInjector })).toThrowError(errorFor(AnInjectiable));
        });
    });
});
