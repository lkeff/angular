"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringConcatBuiltinFn = exports.ArrayConcatBuiltinFn = exports.ArraySliceBuiltinFn = void 0;
const dynamic_1 = require("./dynamic");
const result_1 = require("./result");
class ArraySliceBuiltinFn extends result_1.KnownFn {
    constructor(lhs) {
        super();
        this.lhs = lhs;
    }
    evaluate(node, args) {
        if (args.length === 0) {
            return this.lhs;
        }
        else {
            return dynamic_1.DynamicValue.fromUnknown(node);
        }
    }
}
exports.ArraySliceBuiltinFn = ArraySliceBuiltinFn;
class ArrayConcatBuiltinFn extends result_1.KnownFn {
    constructor(lhs) {
        super();
        this.lhs = lhs;
    }
    evaluate(node, args) {
        const result = [...this.lhs];
        for (const arg of args) {
            if (arg instanceof dynamic_1.DynamicValue) {
                result.push(dynamic_1.DynamicValue.fromDynamicInput(node, arg));
            }
            else if (Array.isArray(arg)) {
                result.push(...arg);
            }
            else {
                result.push(arg);
            }
        }
        return result;
    }
}
exports.ArrayConcatBuiltinFn = ArrayConcatBuiltinFn;
class StringConcatBuiltinFn extends result_1.KnownFn {
    constructor(lhs) {
        super();
        this.lhs = lhs;
    }
    evaluate(node, args) {
        let result = this.lhs;
        for (const arg of args) {
            const resolved = arg instanceof result_1.EnumValue ? arg.resolved : arg;
            if (typeof resolved === 'string' ||
                typeof resolved === 'number' ||
                typeof resolved === 'boolean' ||
                resolved == null) {
                // Cast to `any`, because `concat` will convert
                // anything to a string, but TS only allows strings.
                result = result.concat(resolved);
            }
            else {
                return dynamic_1.DynamicValue.fromUnknown(node);
            }
        }
        return result;
    }
}
exports.StringConcatBuiltinFn = StringConcatBuiltinFn;
