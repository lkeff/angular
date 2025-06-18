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
exports.KeyValuePipe = void 0;
exports.defaultComparator = defaultComparator;
const core_1 = require("@angular/core");
function makeKeyValuePair(key, value) {
    return { key: key, value: value };
}
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms Object or Map into an array of key value pairs.
 *
 * The output array will be ordered by keys.
 * By default the comparator will be by Unicode point value.
 * You can optionally pass a compareFn if your keys are complex types.
 * Passing `null` as the compareFn will use natural ordering of the input.
 *
 * @usageNotes
 * ### Examples
 *
 * This examples show how an Object or a Map can be iterated by ngFor with the use of this
 * keyvalue pipe.
 *
 * {@example common/pipes/ts/keyvalue_pipe.ts region='KeyValuePipe'}
 *
 * @publicApi
 */
let KeyValuePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'keyvalue',
            pure: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var KeyValuePipe = _classThis = class {
        constructor(differs) {
            this.differs = differs;
            this.keyValues = [];
            this.compareFn = defaultComparator;
        }
        transform(input, compareFn = defaultComparator) {
            var _a;
            if (!input || (!(input instanceof Map) && typeof input !== 'object')) {
                return null;
            }
            // make a differ for whatever type we've been passed in
            (_a = this.differ) !== null && _a !== void 0 ? _a : (this.differ = this.differs.find(input).create());
            const differChanges = this.differ.diff(input);
            const compareFnChanged = compareFn !== this.compareFn;
            if (differChanges) {
                this.keyValues = [];
                differChanges.forEachItem((r) => {
                    this.keyValues.push(makeKeyValuePair(r.key, r.currentValue));
                });
            }
            if (differChanges || compareFnChanged) {
                if (compareFn) {
                    this.keyValues.sort(compareFn);
                }
                this.compareFn = compareFn;
            }
            return this.keyValues;
        }
    };
    __setFunctionName(_classThis, "KeyValuePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        KeyValuePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return KeyValuePipe = _classThis;
})();
exports.KeyValuePipe = KeyValuePipe;
function defaultComparator(keyValueA, keyValueB) {
    const a = keyValueA.key;
    const b = keyValueB.key;
    // If both keys are the same, return 0 (no sorting needed).
    if (a === b)
        return 0;
    // If one of the keys is `null` or `undefined`, place it at the end of the sort.
    if (a == null)
        return 1; // `a` comes after `b`.
    if (b == null)
        return -1; // `b` comes after `a`.
    // If both keys are strings, compare them lexicographically.
    if (typeof a == 'string' && typeof b == 'string') {
        return a < b ? -1 : 1;
    }
    // If both keys are numbers, sort them numerically.
    if (typeof a == 'number' && typeof b == 'number') {
        return a - b;
    }
    // If both keys are booleans, sort `false` before `true`.
    if (typeof a == 'boolean' && typeof b == 'boolean') {
        return a < b ? -1 : 1;
    }
    // Fallback case: if keys are of different types, compare their string representations.
    const aString = String(a);
    const bString = String(b);
    // Compare the string representations lexicographically.
    return aString == bString ? 0 : aString < bString ? -1 : 1;
}
