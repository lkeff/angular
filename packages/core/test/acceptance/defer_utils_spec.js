"use strict";
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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const defer_1 = require("../../src/render3/util/defer");
describe('@defer debugging utilities', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
        });
    });
    it('should get current state of a defer block', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <section>
          @defer (when false) {
            Loaded
          } @placeholder {
            Placeholder
          } @loading {
            Loading
          }
        </section>
      `,
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const [block] = yield fixture.getDeferBlocks();
        yield block.render(testing_1.DeferBlockState.Placeholder);
        expect((0, defer_1.getDeferBlocks)(fixture.nativeElement)[0].state).toBe('placeholder');
        yield block.render(testing_1.DeferBlockState.Loading);
        expect((0, defer_1.getDeferBlocks)(fixture.nativeElement)[0].state).toBe('loading');
        yield block.render(testing_1.DeferBlockState.Complete);
        expect((0, defer_1.getDeferBlocks)(fixture.nativeElement)[0].state).toBe('complete');
    }));
    it('should expose which blocks are connected to the defer block', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @defer (when false) {
          No connected
        }

        @defer (when false) {
          Has loading
        } @loading (minimum 2s; after 1s) {
          Loading
        }

        @defer (when false) {
          Has all
        } @placeholder (minimum 500) {
          Placeholder
        } @loading {
          Loading
        } @error {
          Error
        }
      `,
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const blocks = (0, defer_1.getDeferBlocks)(fixture.nativeElement);
        expect(blocks.length).toBe(3);
        expect(blocks[0]).toEqual(jasmine.objectContaining({
            loadingBlock: { exists: false, minimumTime: null, afterTime: null },
            placeholderBlock: { exists: false, minimumTime: null },
            hasErrorBlock: false,
        }));
        expect(blocks[1]).toEqual(jasmine.objectContaining({
            loadingBlock: { exists: true, minimumTime: 2000, afterTime: 1000 },
            placeholderBlock: { exists: false, minimumTime: null },
            hasErrorBlock: false,
        }));
        expect(blocks[2]).toEqual(jasmine.objectContaining({
            loadingBlock: { exists: true, minimumTime: null, afterTime: null },
            placeholderBlock: { exists: true, minimumTime: 500 },
            hasErrorBlock: true,
        }));
    });
    it('should expose the triggers that were registered on the defer block', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <section>
          @defer (when false; on timer(500); on interaction) {
            Loaded
          } @placeholder {
            <button>Load</button>
          }
        </section>
      `,
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const blocks = (0, defer_1.getDeferBlocks)(fixture.nativeElement);
        expect(blocks.length).toBe(1);
        expect(blocks[0].triggers).toEqual(['on interaction', 'on timer(500ms)', 'when <expression>']);
    }));
    it('should return deferred blocks only under the specified DOM node', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <section>
          <div>
            <header>
              @defer (when false) {
                Loaded
              } @placeholder {
                Placeholder
              }
            </header>
          </div>

          @defer (when false) {
            Loaded
          } @placeholder {
            Placeholder
          }
        </section>

        <button>Hello</button>
      `,
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const blocks = yield fixture.getDeferBlocks();
        // Render out one of the blocks so we can distinguish them.
        yield blocks[1].render(testing_1.DeferBlockState.Complete);
        const section = fixture.nativeElement.querySelector('section');
        const header = section.querySelector('header');
        const button = fixture.nativeElement.querySelector('button');
        expect((0, defer_1.getDeferBlocks)(section)).toEqual([
            jasmine.objectContaining({ state: 'placeholder' }),
            jasmine.objectContaining({ state: 'complete' }),
        ]);
        expect((0, defer_1.getDeferBlocks)(header)).toEqual([jasmine.objectContaining({ state: 'placeholder' })]);
        expect((0, defer_1.getDeferBlocks)(button)).toEqual([]);
    }));
    it('should be able to resolve defer blocks inside embedded views', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <section>
          @if (true) {
            <div>
              @switch (1) {
                @case (1) {
                  @if (true) {
                    @defer (when false) {
                      Loaded
                    } @placeholder {
                      Placeholder
                    }
                  }
                }
              }
            </div>
          }
        </section>
      `,
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect((0, defer_1.getDeferBlocks)(fixture.nativeElement)).toEqual([
            jasmine.objectContaining({ state: 'placeholder' }),
        ]);
    });
    it('should be able to resolve a defer block nested inside of another defer block', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <section>
          @defer (when false) {
            Loaded root

            @defer (when false) {
              Loaded inner
            } @placeholder {
              Placeholder inner
            }
          } @placeholder {
            Placeholder root
          }
        </section>
      `,
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const [root] = yield fixture.getDeferBlocks();
        expect((0, defer_1.getDeferBlocks)(fixture.nativeElement)).toEqual([
            jasmine.objectContaining({ state: 'placeholder' }),
        ]);
        yield root.render(testing_1.DeferBlockState.Complete);
        fixture.detectChanges();
        expect((0, defer_1.getDeferBlocks)(fixture.nativeElement)).toEqual([
            jasmine.objectContaining({ state: 'complete' }),
            jasmine.objectContaining({ state: 'placeholder' }),
        ]);
    }));
    it('should return the root nodes of the currently-rendered block', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        Before
        @defer (when false) {
          <button>One</button>
          Loaded
          <span>Two</span>
        } @placeholder {
          Placeholder text
        }
        After
      `,
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        let results = (0, defer_1.getDeferBlocks)(fixture.nativeElement);
        expect(results.length).toBe(1);
        expect(results[0].state).toBe('placeholder');
        expect(stringifyNodes(results[0].rootNodes)).toEqual(['Text(Placeholder text)']);
        const [block] = yield fixture.getDeferBlocks();
        yield block.render(testing_1.DeferBlockState.Complete);
        results = (0, defer_1.getDeferBlocks)(fixture.nativeElement);
        expect(results.length).toBe(1);
        expect(results[0].state).toBe('complete');
        expect(stringifyNodes(results[0].rootNodes)).toEqual([
            'Element(button, One)',
            'Text(Loaded)',
            'Element(span, Two)',
        ]);
    }));
    it('should skip over TNodes that do not correspond to DOM nodes', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        Before
        @defer (when false) {
          Loaded
        } @placeholder {
          @let one = 1;
          One is {{one}}
          @let two = one + 1;
          Two is {{two}}
        }
        After
      `,
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        let results = (0, defer_1.getDeferBlocks)(fixture.nativeElement);
        expect(results.length).toBe(1);
        expect(results[0].state).toBe('placeholder');
        expect(stringifyNodes(results[0].rootNodes)).toEqual(['Text(One is 1)', 'Text(Two is 2)']);
        const [block] = yield fixture.getDeferBlocks();
        yield block.render(testing_1.DeferBlockState.Complete);
    }));
    function stringifyNodes(nodes) {
        return nodes.map((node) => {
            var _a, _b, _c;
            switch (node.nodeType) {
                case document.COMMENT_NODE:
                    return `Comment(${(_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim()})`;
                case document.ELEMENT_NODE:
                    return `Element(${node.nodeName.toLowerCase()}, ${(_b = node.textContent) === null || _b === void 0 ? void 0 : _b.trim()})`;
                case document.TEXT_NODE:
                    return `Text(${(_c = node.textContent) === null || _c === void 0 ? void 0 : _c.trim()})`;
                default:
                    throw new Error('Unsupported node. Function may need to be updated.');
            }
        });
    }
});
