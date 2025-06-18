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
const core_1 = require("../../src/core");
const framework_injector_profiler_1 = require("../../src/render3/debug/framework_injector_profiler");
const injector_profiler_1 = require("../../src/render3/debug/injector_profiler");
const signal_debug_1 = require("../../src/render3/util/signal_debug");
const testing_1 = require("../../testing");
describe('getSignalGraph', () => {
    beforeEach(() => {
        // Effect detection depends on the framework injector profiler being enabled
        (0, injector_profiler_1.setInjectorProfiler)(null);
        (0, framework_injector_profiler_1.setupFrameworkInjectorProfiler)();
    });
    afterEach(() => {
        (0, framework_injector_profiler_1.getFrameworkDIDebugData)().reset();
        (0, injector_profiler_1.setInjectorProfiler)(null);
        testing_1.TestBed.resetTestingModule();
    });
    /**
     *
     * DebugSignalGraphEdge has integer fields representing indexes in the nodes array.
     * This function maps those indexes to the actual nodes and returns an array of edges.
     *
     */
    function mapEdgeIndicesIntoNodes(edges, nodes) {
        return edges.map(({ consumer, producer }) => ({
            consumer: nodes[consumer],
            producer: nodes[producer],
        }));
    }
    it('should return the signal graph for a component with signals', (0, testing_1.fakeAsync)(() => {
        let WithSignals = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'component-with-signals', template: `{{ primitiveSignal() }}` })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithSignals = _classThis = class {
                constructor() {
                    this.primitiveSignal = (0, core_1.signal)(123, { debugName: 'primitiveSignal' });
                }
            };
            __setFunctionName(_classThis, "WithSignals");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithSignals = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithSignals = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [WithSignals] });
        const fixture = testing_1.TestBed.createComponent(WithSignals);
        (0, testing_1.tick)();
        fixture.detectChanges();
        const injector = fixture.componentRef.injector;
        const signalGraph = (0, signal_debug_1.getSignalGraph)(injector);
        const { nodes, edges } = signalGraph;
        // 2 nodes
        //   template
        //   primitiveSignal
        expect(nodes.length).toBe(2);
        // 1 edge
        //   template depends on primitiveSignal
        expect(edges.length).toBe(1);
        const signalNode = nodes.find((node) => node.kind === 'signal');
        expect(signalNode).toBeDefined();
        expect(signalNode.label).toBe('primitiveSignal');
        expect(signalNode.value).toBe(123);
    }));
    it('should return the signal graph for a component with effects', (0, testing_1.fakeAsync)(() => {
        let WithEffect = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'component-with-effect', template: `` })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithEffect = _classThis = class {
                constructor() {
                    this.stateFromEffect = 0;
                    this.primitiveSignal = (0, core_1.signal)(123, { debugName: 'primitiveSignal' });
                    this.primitiveSignal2 = (0, core_1.signal)(456, { debugName: 'primitiveSignal2' });
                    (0, core_1.effect)(() => {
                        this.stateFromEffect = this.primitiveSignal() * this.primitiveSignal2();
                    }, { debugName: 'primitiveSignalEffect' });
                }
            };
            __setFunctionName(_classThis, "WithEffect");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithEffect = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithEffect = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [WithEffect] }).compileComponents();
        const fixture = testing_1.TestBed.createComponent(WithEffect);
        (0, testing_1.tick)();
        fixture.detectChanges();
        const injector = fixture.componentRef.injector;
        const signalGraph = (0, signal_debug_1.getSignalGraph)(injector);
        const { nodes, edges } = signalGraph;
        expect(nodes.length).toBe(3);
        const effectNode = nodes.find((node) => node.label === 'primitiveSignalEffect');
        expect(effectNode).toBeDefined();
        const signalNode = nodes.find((node) => node.label === 'primitiveSignal');
        expect(signalNode).toBeDefined();
        const signalNode2 = nodes.find((node) => node.label === 'primitiveSignal2');
        expect(signalNode2).toBeDefined();
        expect(edges.length).toBe(2);
        const edgesWithNodes = mapEdgeIndicesIntoNodes(edges, nodes);
        expect(edgesWithNodes).toContain({ consumer: effectNode, producer: signalNode });
    }));
    it('should return the signal graph for a component with a computed', (0, testing_1.fakeAsync)(() => {
        let WithComputed = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'component-with-computed', template: `{{ computedSignal() }}` })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithComputed = _classThis = class {
                constructor() {
                    this.primitiveSignal = (0, core_1.signal)(123, { debugName: 'primitiveSignal' });
                    this.primitiveSignal2 = (0, core_1.signal)(456, { debugName: 'primitiveSignal2' });
                    this.computedSignal = (0, core_1.computed)(() => this.primitiveSignal() * this.primitiveSignal2(), {
                        debugName: 'computedSignal',
                    });
                }
            };
            __setFunctionName(_classThis, "WithComputed");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithComputed = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithComputed = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [WithComputed] }).compileComponents();
        const fixture = testing_1.TestBed.createComponent(WithComputed);
        (0, testing_1.tick)();
        fixture.detectChanges();
        const injector = fixture.componentRef.injector;
        const signalGraph = (0, signal_debug_1.getSignalGraph)(injector);
        const { nodes, edges } = signalGraph;
        // 4 nodes
        //   template
        //   primitiveSignal
        //   primitiveSignal2
        //   computedSignal
        expect(nodes.length).toBe(4);
        const templateNode = nodes.find((node) => node.kind === 'template');
        expect(templateNode).toBeDefined();
        const primitiveSignalNode = nodes.find((node) => node.label === 'primitiveSignal');
        expect(primitiveSignalNode).toBeDefined();
        expect(primitiveSignalNode.value).toBe(123);
        const primitiveSignal2Node = nodes.find((node) => node.label === 'primitiveSignal2');
        expect(primitiveSignal2Node).toBeDefined();
        expect(primitiveSignal2Node.value).toBe(456);
        const computedSignalNode = nodes.find((node) => node.label === 'computedSignal');
        expect(computedSignalNode).toBeDefined();
        expect(computedSignalNode.label).toBe('computedSignal');
        expect(computedSignalNode.value).toBe(123 * 456);
        // 3 edges
        //   computedSignal depends on primitiveSignal
        //   computedSignal depends on primitiveSignal2
        //   template depends on computedSignal
        expect(edges.length).toBe(3);
        const edgesWithNodes = mapEdgeIndicesIntoNodes(edges, nodes);
        expect(edgesWithNodes).toContain({ consumer: templateNode, producer: computedSignalNode });
        expect(edgesWithNodes).toContain({
            consumer: computedSignalNode,
            producer: primitiveSignalNode,
        });
        expect(edgesWithNodes).toContain({
            consumer: computedSignalNode,
            producer: primitiveSignal2Node,
        });
    }));
    it('should return the signal graph for a component with unused reactive nodes', (0, testing_1.fakeAsync)(() => {
        let WithUnusedReactiveNodes = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'component-with-unused-signal', template: `` })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithUnusedReactiveNodes = _classThis = class {
                constructor() {
                    this.primitiveSignal = (0, core_1.signal)(123, { debugName: 'primitiveSignal' });
                    this.computedSignal = (0, core_1.computed)(() => this.primitiveSignal() * this.primitiveSignal(), {
                        debugName: 'computedSignal',
                    });
                }
            };
            __setFunctionName(_classThis, "WithUnusedReactiveNodes");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithUnusedReactiveNodes = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithUnusedReactiveNodes = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [WithUnusedReactiveNodes] }).compileComponents();
        const fixture = testing_1.TestBed.createComponent(WithUnusedReactiveNodes);
        (0, testing_1.tick)();
        fixture.detectChanges();
        const injector = fixture.componentRef.injector;
        const signalGraph = (0, signal_debug_1.getSignalGraph)(injector);
        const { nodes, edges } = signalGraph;
        expect(nodes.length).toBe(0);
        expect(edges.length).toBe(0);
    }));
    it('should return the signal graph for a component with no component effect signal dependencies', (0, testing_1.fakeAsync)(() => {
        let WithNoEffectSignalDependencies = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'component-with-zero-effect', template: `` })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithNoEffectSignalDependencies = _classThis = class {
                constructor() {
                    this.primitiveSignal = (0, core_1.signal)(123, { debugName: 'primitiveSignal' });
                    this.primitiveSignalEffect = (0, core_1.effect)(() => { }, { debugName: 'primitiveSignalEffect' });
                }
            };
            __setFunctionName(_classThis, "WithNoEffectSignalDependencies");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithNoEffectSignalDependencies = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithNoEffectSignalDependencies = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [WithNoEffectSignalDependencies] }).compileComponents();
        const fixture = testing_1.TestBed.createComponent(WithNoEffectSignalDependencies);
        (0, testing_1.tick)();
        fixture.detectChanges();
        const injector = fixture.componentRef.injector;
        const signalGraph = (0, signal_debug_1.getSignalGraph)(injector);
        const { nodes, edges } = signalGraph;
        expect(nodes.length).toBe(1); // 1 effect node detected
        expect(edges.length).toBe(0);
    }));
    it('should return the signal graph for a component with no signal dependencies in the template or component effects', (0, testing_1.fakeAsync)(() => {
        let WithNoEffectDependencies = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'component-with-no-effect-dependencies', template: `` })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithNoEffectDependencies = _classThis = class {
            };
            __setFunctionName(_classThis, "WithNoEffectDependencies");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithNoEffectDependencies = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithNoEffectDependencies = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [WithNoEffectDependencies] }).compileComponents();
        const fixture = testing_1.TestBed.createComponent(WithNoEffectDependencies);
        (0, testing_1.tick)();
        fixture.detectChanges();
        const injector = fixture.componentRef.injector;
        const signalGraph = (0, signal_debug_1.getSignalGraph)(injector);
        const { nodes, edges } = signalGraph;
        expect(nodes.length).toBe(0);
        expect(edges.length).toBe(0);
    }));
    it('should capture signals created in external services in the signal graph', (0, testing_1.fakeAsync)(() => {
        let ExternalService = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ExternalService = _classThis = class {
                constructor() {
                    this.oneTwoThree = (0, core_1.signal)(123, { debugName: 'oneTwoThree' });
                    this.fourFiveSix = (0, core_1.signal)(456, { debugName: 'fourFiveSix' });
                }
            };
            __setFunctionName(_classThis, "ExternalService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ExternalService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ExternalService = _classThis;
        })();
        let WithExternalService = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    providers: [ExternalService],
                    selector: 'component-with-external-service',
                    template: `{{externalService.oneTwoThree()}}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WithExternalService = _classThis = class {
                constructor() {
                    this.externalService = (0, core_1.inject)(ExternalService);
                    (0, core_1.effect)(() => {
                        this.externalService.fourFiveSix();
                    }, { debugName: 'externalServiceEffect' });
                }
            };
            __setFunctionName(_classThis, "WithExternalService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithExternalService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithExternalService = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ imports: [WithExternalService] }).compileComponents();
        const fixture = testing_1.TestBed.createComponent(WithExternalService);
        (0, testing_1.tick)();
        fixture.detectChanges();
        const injector = fixture.componentRef.injector;
        const signalGraph = (0, signal_debug_1.getSignalGraph)(injector);
        const { nodes, edges } = signalGraph;
        expect(nodes.length).toBe(4);
        const templateNode = nodes.find((node) => node.kind === 'template');
        expect(templateNode).toBeDefined();
        const externalServiceEffectNode = nodes.find((node) => node.label === 'externalServiceEffect');
        expect(externalServiceEffectNode).toBeDefined();
        expect(externalServiceEffectNode.kind).toBe('effect');
        const oneTwoThreeNode = nodes.find((node) => node.label === 'oneTwoThree');
        expect(oneTwoThreeNode).toBeDefined();
        expect(oneTwoThreeNode.value).toBe(123);
        const fourFiveSixNode = nodes.find((node) => node.label === 'fourFiveSix');
        expect(fourFiveSixNode).toBeDefined();
        expect(fourFiveSixNode.value).toBe(456);
        expect(edges.length).toBe(2);
        const edgesWithNodes = mapEdgeIndicesIntoNodes(edges, nodes);
        expect(edgesWithNodes).toContain({ consumer: templateNode, producer: oneTwoThreeNode });
        expect(edgesWithNodes).toContain({
            consumer: externalServiceEffectNode,
            producer: fourFiveSixNode,
        });
    }));
});
