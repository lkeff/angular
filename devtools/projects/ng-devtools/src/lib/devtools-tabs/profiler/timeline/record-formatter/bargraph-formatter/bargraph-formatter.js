"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarGraphFormatter = void 0;
const memo_decorator_1 = require("../../../../../vendor/memo-decorator");
const record_formatter_1 = require("../record-formatter");
let BarGraphFormatter = (() => {
    var _a;
    let _classSuper = record_formatter_1.RecordFormatter;
    let _instanceExtraInitializers = [];
    let _formatFrame_decorators;
    return _a = class BarGraphFormatter extends _classSuper {
            formatFrame(frame) {
                const result = [];
                this.addFrame(result, frame.directives);
                // Remove nodes with 0 value.
                const nodesWithValue = result.filter((element) => element.value > 0);
                // Merge nodes with the same label.
                const uniqueBarGraphNodes = {};
                nodesWithValue.forEach((node) => {
                    if (uniqueBarGraphNodes[node.label] === undefined) {
                        uniqueBarGraphNodes[node.label] = {
                            label: node.label,
                            value: node.value,
                            original: node.original,
                            directives: [...node.original.directives],
                            parents: [],
                            count: 1,
                        };
                    }
                    else {
                        // sum values of merged nodes
                        uniqueBarGraphNodes[node.label].value += node.value;
                        // merge directives of merged nodes
                        uniqueBarGraphNodes[node.label].directives.push(...node.original.directives);
                        // increment count of merged nodes with the same label
                        uniqueBarGraphNodes[node.label].count++;
                    }
                });
                // Sort nodes by value.
                return Object.values(uniqueBarGraphNodes).sort((a, b) => b.value - a.value);
            }
            addFrame(nodes, elements, parents = []) {
                let timeSpent = 0;
                elements.forEach((element) => {
                    // Possibly undefined because of the insertion on the backend.
                    if (!element) {
                        console.error('Unable to insert undefined element');
                        return;
                    }
                    timeSpent += this.addFrame(nodes, element.children, parents.concat(element));
                    timeSpent += super.getValue(element);
                    element.directives.forEach((dir) => {
                        const innerNode = {
                            parents,
                            value: super.getDirectiveValue(dir),
                            label: dir.name,
                            original: element,
                            count: 1,
                        };
                        nodes.push(innerNode);
                    });
                });
                return timeSpent;
            }
            constructor() {
                super(...arguments);
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _formatFrame_decorators = [(0, memo_decorator_1.memo)({ cache: new WeakMap() })];
            __esDecorate(_a, null, _formatFrame_decorators, { kind: "method", name: "formatFrame", static: false, private: false, access: { has: obj => "formatFrame" in obj, get: obj => obj.formatFrame }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.BarGraphFormatter = BarGraphFormatter;
