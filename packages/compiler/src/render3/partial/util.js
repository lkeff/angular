"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOptionalLiteralArray = toOptionalLiteralArray;
exports.toOptionalLiteralMap = toOptionalLiteralMap;
exports.compileDependencies = compileDependencies;
exports.compileDependency = compileDependency;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const o = __importStar(require("../../output/output_ast"));
const util_1 = require("../view/util");
/**
 * Creates an array literal expression from the given array, mapping all values to an expression
 * using the provided mapping function. If the array is empty or null, then null is returned.
 *
 * @param values The array to transfer into literal array expression.
 * @param mapper The logic to use for creating an expression for the array's values.
 * @returns An array literal expression representing `values`, or null if `values` is empty or
 * is itself null.
 */
function toOptionalLiteralArray(values, mapper) {
    if (values === null || values.length === 0) {
        return null;
    }
    return o.literalArr(values.map((value) => mapper(value)));
}
/**
 * Creates an object literal expression from the given object, mapping all values to an expression
 * using the provided mapping function. If the object has no keys, then null is returned.
 *
 * @param object The object to transfer into an object literal expression.
 * @param mapper The logic to use for creating an expression for the object's values.
 * @returns An object literal expression representing `object`, or null if `object` does not have
 * any keys.
 */
function toOptionalLiteralMap(object, mapper) {
    const entries = Object.keys(object).map((key) => {
        const value = object[key];
        return { key, value: mapper(value), quoted: true };
    });
    if (entries.length > 0) {
        return o.literalMap(entries);
    }
    else {
        return null;
    }
}
function compileDependencies(deps) {
    if (deps === 'invalid') {
        // The `deps` can be set to the string "invalid"  by the `unwrapConstructorDependencies()`
        // function, which tries to convert `ConstructorDeps` into `R3DependencyMetadata[]`.
        return o.literal('invalid');
    }
    else if (deps === null) {
        return o.literal(null);
    }
    else {
        return o.literalArr(deps.map(compileDependency));
    }
}
function compileDependency(dep) {
    const depMeta = new util_1.DefinitionMap();
    depMeta.set('token', dep.token);
    if (dep.attributeNameType !== null) {
        depMeta.set('attribute', o.literal(true));
    }
    if (dep.host) {
        depMeta.set('host', o.literal(true));
    }
    if (dep.optional) {
        depMeta.set('optional', o.literal(true));
    }
    if (dep.self) {
        depMeta.set('self', o.literal(true));
    }
    if (dep.skipSelf) {
        depMeta.set('skipSelf', o.literal(true));
    }
    return depMeta.toLiteralMap();
}
