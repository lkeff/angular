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
exports.AstValue = exports.AstObject = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const o = __importStar(require("@angular/compiler"));
const fatal_linker_error_1 = require("../fatal_linker_error");
/**
 * This helper class wraps an object expression along with an `AstHost` object, exposing helper
 * methods that make it easier to extract the properties of the object.
 *
 * The generic `T` is used as reference type of the expected structure that is represented by this
 * object. It does not achieve full type-safety for the provided operations in correspondence with
 * `T`; its main goal is to provide references to a documented type and ensure that the properties
 * that are read from the object are present.
 *
 * Unfortunately, the generic types are unable to prevent reading an optional property from the
 * object without first having called `has` to ensure that the property exists. This is one example
 * of where full type-safety is not achieved.
 */
class AstObject {
    /**
     * Create a new `AstObject` from the given `expression` and `host`.
     */
    static parse(expression, host) {
        const obj = host.parseObjectLiteral(expression);
        return new AstObject(expression, obj, host);
    }
    constructor(expression, obj, host) {
        this.expression = expression;
        this.obj = obj;
        this.host = host;
    }
    /**
     * Returns true if the object has a property called `propertyName`.
     */
    has(propertyName) {
        return this.obj.has(propertyName);
    }
    /**
     * Returns the number value of the property called `propertyName`.
     *
     * Throws an error if there is no such property or the property is not a number.
     */
    getNumber(propertyName) {
        return this.host.parseNumericLiteral(this.getRequiredProperty(propertyName));
    }
    /**
     * Returns the string value of the property called `propertyName`.
     *
     * Throws an error if there is no such property or the property is not a string.
     */
    getString(propertyName) {
        return this.host.parseStringLiteral(this.getRequiredProperty(propertyName));
    }
    /**
     * Returns the boolean value of the property called `propertyName`.
     *
     * Throws an error if there is no such property or the property is not a boolean.
     */
    getBoolean(propertyName) {
        return this.host.parseBooleanLiteral(this.getRequiredProperty(propertyName));
    }
    /**
     * Returns the nested `AstObject` parsed from the property called `propertyName`.
     *
     * Throws an error if there is no such property or the property is not an object.
     */
    getObject(propertyName) {
        const expr = this.getRequiredProperty(propertyName);
        const obj = this.host.parseObjectLiteral(expr);
        return new AstObject(expr, obj, this.host);
    }
    /**
     * Returns an array of `AstValue` objects parsed from the property called `propertyName`.
     *
     * Throws an error if there is no such property or the property is not an array.
     */
    getArray(propertyName) {
        const arr = this.host.parseArrayLiteral(this.getRequiredProperty(propertyName));
        return arr.map((entry) => new AstValue(entry, this.host));
    }
    /**
     * Returns a `WrappedNodeExpr` object that wraps the expression at the property called
     * `propertyName`.
     *
     * Throws an error if there is no such property.
     */
    getOpaque(propertyName) {
        return new o.WrappedNodeExpr(this.getRequiredProperty(propertyName));
    }
    /**
     * Returns the raw `TExpression` value of the property called `propertyName`.
     *
     * Throws an error if there is no such property.
     */
    getNode(propertyName) {
        return this.getRequiredProperty(propertyName);
    }
    /**
     * Returns an `AstValue` that wraps the value of the property called `propertyName`.
     *
     * Throws an error if there is no such property.
     */
    getValue(propertyName) {
        return new AstValue(this.getRequiredProperty(propertyName), this.host);
    }
    /**
     * Converts the AstObject to a raw JavaScript object, mapping each property value (as an
     * `AstValue`) to the generic type (`T`) via the `mapper` function.
     */
    toLiteral(mapper) {
        const result = {};
        for (const [key, expression] of this.obj) {
            result[key] = mapper(new AstValue(expression, this.host), key);
        }
        return result;
    }
    /**
     * Converts the AstObject to a JavaScript Map, mapping each property value (as an
     * `AstValue`) to the generic type (`T`) via the `mapper` function.
     */
    toMap(mapper) {
        const result = new Map();
        for (const [key, expression] of this.obj) {
            result.set(key, mapper(new AstValue(expression, this.host)));
        }
        return result;
    }
    getRequiredProperty(propertyName) {
        if (!this.obj.has(propertyName)) {
            throw new fatal_linker_error_1.FatalLinkerError(this.expression, `Expected property '${propertyName}' to be present.`);
        }
        return this.obj.get(propertyName);
    }
}
exports.AstObject = AstObject;
/**
 * This helper class wraps an `expression`, exposing methods that use the `host` to give
 * access to the underlying value of the wrapped expression.
 *
 * The generic `T` is used as reference type of the expected type that is represented by this value.
 * It does not achieve full type-safety for the provided operations in correspondence with `T`; its
 * main goal is to provide references to a documented type.
 */
class AstValue {
    constructor(expression, host) {
        this.expression = expression;
        this.host = host;
        /** Type brand that ensures that the `T` type is respected for assignability. */
        this.ɵtypeBrand = null;
    }
    /**
     * Get the name of the symbol represented by the given expression node, or `null` if it is not a
     * symbol.
     */
    getSymbolName() {
        return this.host.getSymbolName(this.expression);
    }
    /**
     * Is this value a number?
     */
    isNumber() {
        return this.host.isNumericLiteral(this.expression);
    }
    /**
     * Parse the number from this value, or error if it is not a number.
     */
    getNumber() {
        return this.host.parseNumericLiteral(this.expression);
    }
    /**
     * Is this value a string?
     */
    isString() {
        return this.host.isStringLiteral(this.expression);
    }
    /**
     * Parse the string from this value, or error if it is not a string.
     */
    getString() {
        return this.host.parseStringLiteral(this.expression);
    }
    /**
     * Is this value a boolean?
     */
    isBoolean() {
        return this.host.isBooleanLiteral(this.expression);
    }
    /**
     * Parse the boolean from this value, or error if it is not a boolean.
     */
    getBoolean() {
        return this.host.parseBooleanLiteral(this.expression);
    }
    /**
     * Is this value an object literal?
     */
    isObject() {
        return this.host.isObjectLiteral(this.expression);
    }
    /**
     * Parse this value into an `AstObject`, or error if it is not an object literal.
     */
    getObject() {
        return AstObject.parse(this.expression, this.host);
    }
    /**
     * Is this value an array literal?
     */
    isArray() {
        return this.host.isArrayLiteral(this.expression);
    }
    /** Whether the value is explicitly set to `null`. */
    isNull() {
        return this.host.isNull(this.expression);
    }
    /**
     * Parse this value into an array of `AstValue` objects, or error if it is not an array literal.
     */
    getArray() {
        const arr = this.host.parseArrayLiteral(this.expression);
        return arr.map((entry) => new AstValue(entry, this.host));
    }
    /**
     * Is this value a function expression?
     */
    isFunction() {
        return this.host.isFunctionExpression(this.expression);
    }
    /**
     * Extract the return value as an `AstValue` from this value as a function expression, or error if
     * it is not a function expression.
     */
    getFunctionReturnValue() {
        return new AstValue(this.host.parseReturnValue(this.expression), this.host);
    }
    /**
     * Extract the parameters from this value as a function expression, or error if it is not a
     * function expression.
     */
    getFunctionParameters() {
        return this.host
            .parseParameters(this.expression)
            .map((param) => new AstValue(param, this.host));
    }
    isCallExpression() {
        return this.host.isCallExpression(this.expression);
    }
    getCallee() {
        return new AstValue(this.host.parseCallee(this.expression), this.host);
    }
    getArguments() {
        const args = this.host.parseArguments(this.expression);
        return args.map((arg) => new AstValue(arg, this.host));
    }
    /**
     * Return the `TExpression` of this value wrapped in a `WrappedNodeExpr`.
     */
    getOpaque() {
        return new o.WrappedNodeExpr(this.expression);
    }
    /**
     * Get the range of the location of this value in the original source.
     */
    getRange() {
        return this.host.getRange(this.expression);
    }
}
exports.AstValue = AstValue;
