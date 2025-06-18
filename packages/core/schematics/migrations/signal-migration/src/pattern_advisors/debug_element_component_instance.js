"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugElementComponentInstance = void 0;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Detects `query(By.directive(T)).componentInstance` patterns and enhances
 * them with information of `T`. This is important because `.componentInstance`
 * is currently typed as `any` and may cause runtime test failures after input
 * migrations then.
 *
 * The reference resolution pass leverages information from this pattern
 * recognizer.
 */
class DebugElementComponentInstance {
    constructor(checker) {
        this.checker = checker;
        this.cache = new WeakMap();
    }
    detect(node) {
        if (this.cache.has(node)) {
            return this.cache.get(node);
        }
        if (!typescript_1.default.isPropertyAccessExpression(node)) {
            return null;
        }
        // Check for `<>.componentInstance`.
        if (!typescript_1.default.isIdentifier(node.name) || node.name.text !== 'componentInstance') {
            return null;
        }
        // Check for `<>.query(..).<>`.
        if (!typescript_1.default.isCallExpression(node.expression) ||
            !typescript_1.default.isPropertyAccessExpression(node.expression.expression) ||
            !typescript_1.default.isIdentifier(node.expression.expression.name) ||
            node.expression.expression.name.text !== 'query') {
            return null;
        }
        const queryCall = node.expression;
        if (queryCall.arguments.length !== 1) {
            return null;
        }
        const queryArg = queryCall.arguments[0];
        let typeExpr;
        if (typescript_1.default.isCallExpression(queryArg) &&
            queryArg.arguments.length === 1 &&
            typescript_1.default.isIdentifier(queryArg.arguments[0])) {
            // Detect references, like: `query(By.directive(T))`.
            typeExpr = queryArg.arguments[0];
        }
        else if (typescript_1.default.isIdentifier(queryArg)) {
            // Detect references, like: `harness.query(T)`.
            typeExpr = queryArg;
        }
        else {
            return null;
        }
        const symbol = this.checker.getSymbolAtLocation(typeExpr);
        if ((symbol === null || symbol === void 0 ? void 0 : symbol.valueDeclaration) === undefined ||
            !typescript_1.default.isClassDeclaration(symbol === null || symbol === void 0 ? void 0 : symbol.valueDeclaration)) {
            // Cache this as we use the expensive type checker.
            this.cache.set(node, null);
            return null;
        }
        const type = this.checker.getTypeAtLocation(symbol.valueDeclaration);
        this.cache.set(node, type);
        return type;
    }
}
exports.DebugElementComponentInstance = DebugElementComponentInstance;
