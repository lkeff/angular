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
const testing_1 = require("../../testing");
const di_1 = require("../../src/render3/di");
const view_1 = require("../../src/render3/interfaces/view");
const state_1 = require("../../src/render3/state");
const tnode_manipulation_1 = require("../../src/render3/tnode_manipulation");
const construction_1 = require("../../src/render3/view/construction");
describe('di', () => {
    describe('directive injection', () => {
        describe('flags', () => {
            it('should check only the current node with @Self even with false positive', () => {
                let DirNotOnSelf = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ selector: '[notOnSelf]' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirNotOnSelf = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirNotOnSelf");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirNotOnSelf = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirNotOnSelf = _classThis;
                })();
                let DirTryInjectFromSelf = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ selector: '[tryInjectFromSelf]' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirTryInjectFromSelf = _classThis = class {
                        constructor(dir) {
                            this.dir = dir;
                        }
                    };
                    __setFunctionName(_classThis, "DirTryInjectFromSelf");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirTryInjectFromSelf = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirTryInjectFromSelf = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
            <div notOnSelf>
              <div tryInjectFromSelf></div>
            </div>
          `,
                            imports: [DirNotOnSelf, DirTryInjectFromSelf],
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
                expect(() => {
                    testing_1.TestBed.createComponent(App).detectChanges();
                }).toThrowError('NG0201: No provider for DirNotOnSelf found in NodeInjector. Find more at https://angular.dev/errors/NG0201');
            });
        });
    });
    describe('ɵɵinject', () => {
        describe('bloom filter', () => {
            let mockTView;
            beforeEach(() => {
                mockTView = { data: [0, 0, 0, 0, 0, 0, 0, 0, null], firstCreatePass: true };
            });
            function bloomState() {
                return mockTView.data.slice(0, 8 /* NodeInjectorOffset.TNODE */).reverse();
            }
            class Dir0 {
            }
            /** @internal */ Dir0.__NG_ELEMENT_ID__ = 0;
            class Dir1 {
            }
            /** @internal */ Dir1.__NG_ELEMENT_ID__ = 1;
            class Dir33 {
            }
            /** @internal */ Dir33.__NG_ELEMENT_ID__ = 33;
            class Dir66 {
            }
            /** @internal */ Dir66.__NG_ELEMENT_ID__ = 66;
            class Dir99 {
            }
            /** @internal */ Dir99.__NG_ELEMENT_ID__ = 99;
            class Dir132 {
            }
            /** @internal */ Dir132.__NG_ELEMENT_ID__ = 132;
            class Dir165 {
            }
            /** @internal */ Dir165.__NG_ELEMENT_ID__ = 165;
            class Dir198 {
            }
            /** @internal */ Dir198.__NG_ELEMENT_ID__ = 198;
            class Dir231 {
            }
            /** @internal */ Dir231.__NG_ELEMENT_ID__ = 231;
            class Dir260 {
            }
            /** @internal */ Dir260.__NG_ELEMENT_ID__ = 260;
            it('should add values', () => {
                (0, di_1.bloomAdd)(0, mockTView, Dir0);
                expect(bloomState()).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
                (0, di_1.bloomAdd)(0, mockTView, Dir33);
                expect(bloomState()).toEqual([0, 0, 0, 0, 0, 0, 2, 1]);
                (0, di_1.bloomAdd)(0, mockTView, Dir66);
                expect(bloomState()).toEqual([0, 0, 0, 0, 0, 4, 2, 1]);
                (0, di_1.bloomAdd)(0, mockTView, Dir99);
                expect(bloomState()).toEqual([0, 0, 0, 0, 8, 4, 2, 1]);
                (0, di_1.bloomAdd)(0, mockTView, Dir132);
                expect(bloomState()).toEqual([0, 0, 0, 16, 8, 4, 2, 1]);
                (0, di_1.bloomAdd)(0, mockTView, Dir165);
                expect(bloomState()).toEqual([0, 0, 32, 16, 8, 4, 2, 1]);
                (0, di_1.bloomAdd)(0, mockTView, Dir198);
                expect(bloomState()).toEqual([0, 64, 32, 16, 8, 4, 2, 1]);
                (0, di_1.bloomAdd)(0, mockTView, Dir231);
                expect(bloomState()).toEqual([128, 64, 32, 16, 8, 4, 2, 1]);
                (0, di_1.bloomAdd)(0, mockTView, Dir260);
                expect(bloomState()).toEqual([128, 64, 32, 16, 8, 4, 2, 17 /* 1 + 2^(260-256) */]);
            });
            it('should query values', () => {
                (0, di_1.bloomAdd)(0, mockTView, Dir0);
                (0, di_1.bloomAdd)(0, mockTView, Dir33);
                (0, di_1.bloomAdd)(0, mockTView, Dir66);
                (0, di_1.bloomAdd)(0, mockTView, Dir99);
                (0, di_1.bloomAdd)(0, mockTView, Dir132);
                (0, di_1.bloomAdd)(0, mockTView, Dir165);
                (0, di_1.bloomAdd)(0, mockTView, Dir198);
                (0, di_1.bloomAdd)(0, mockTView, Dir231);
                (0, di_1.bloomAdd)(0, mockTView, Dir260);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir0), 0, mockTView.data)).toEqual(true);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir1), 0, mockTView.data)).toEqual(false);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir33), 0, mockTView.data)).toEqual(true);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir66), 0, mockTView.data)).toEqual(true);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir99), 0, mockTView.data)).toEqual(true);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir132), 0, mockTView.data)).toEqual(true);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir165), 0, mockTView.data)).toEqual(true);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir198), 0, mockTView.data)).toEqual(true);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir231), 0, mockTView.data)).toEqual(true);
                expect((0, di_1.bloomHasToken)((0, di_1.bloomHashBitOrFactory)(Dir260), 0, mockTView.data)).toEqual(true);
            });
        });
    });
    describe('getOrCreateNodeInjector', () => {
        it('should handle initial undefined state', () => {
            const contentView = (0, construction_1.createLView)(null, (0, construction_1.createTView)(1 /* TViewType.Component */, null, null, 1, 0, null, null, null, null, null, null), {}, 16 /* LViewFlags.CheckAlways */, null, null, {
                rendererFactory: {},
                sanitizer: null,
                changeDetectionScheduler: null,
                ngReflect: false,
            }, {}, null, null, null);
            (0, state_1.enterView)(contentView);
            try {
                const parentTNode = (0, tnode_manipulation_1.getOrCreateTNode)(contentView[view_1.TVIEW], view_1.HEADER_OFFSET, 2 /* TNodeType.Element */, null, null);
                // Simulate the situation where the previous parent is not initialized.
                // This happens on first bootstrap because we don't init existing values
                // so that we have smaller HelloWorld.
                parentTNode.parent = undefined;
                const injector = (0, di_1.getOrCreateNodeInjectorForNode)(parentTNode, contentView);
                expect(injector).not.toEqual(-1);
            }
            finally {
                (0, state_1.leaveView)();
            }
        });
    });
});
