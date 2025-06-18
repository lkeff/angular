"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownFn = exports.EnumValue = exports.ResolvedModule = void 0;
/**
 * A collection of publicly exported declarations from a module. Each declaration is evaluated
 * lazily upon request.
 */
class ResolvedModule {
    constructor(exports, evaluate) {
        this.exports = exports;
        this.evaluate = evaluate;
    }
    getExport(name) {
        if (!this.exports.has(name)) {
            return undefined;
        }
        return this.evaluate(this.exports.get(name));
    }
    getExports() {
        const map = new Map();
        this.exports.forEach((decl, name) => {
            map.set(name, this.evaluate(decl));
        });
        return map;
    }
}
exports.ResolvedModule = ResolvedModule;
/**
 * A value member of an enumeration.
 *
 * Contains a `Reference` to the enumeration itself, and the name of the referenced member.
 */
class EnumValue {
    constructor(enumRef, name, resolved) {
        this.enumRef = enumRef;
        this.name = name;
        this.resolved = resolved;
    }
}
exports.EnumValue = EnumValue;
/**
 * An implementation of a known function that can be statically evaluated.
 * It could be a built-in function or method (such as `Array.prototype.slice`) or a TypeScript
 * helper (such as `__spread`).
 */
class KnownFn {
}
exports.KnownFn = KnownFn;
