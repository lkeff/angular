"use strict";
/*!
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
exports.isStandaloneComponent = isStandaloneComponent;
exports.isAngularRoutesArray = isAngularRoutesArray;
exports.isRouterModuleCallExpression = isRouterModuleCallExpression;
exports.isRouterCallExpression = isRouterCallExpression;
exports.isRouterProviderCallExpression = isRouterProviderCallExpression;
exports.isProvideRoutesCallExpression = isProvideRoutesCallExpression;
const typescript_1 = __importDefault(require("typescript"));
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const property_name_1 = require("../../utils/typescript/property_name");
/**
 * Checks whether a component is standalone.
 * @param node Class being checked.
 * @param reflector The reflection host to use.
 */
function isStandaloneComponent(node, reflector) {
    const decorators = reflector.getDecoratorsOfDeclaration(node);
    if (decorators === null) {
        return false;
    }
    const decorator = (0, annotations_1.findAngularDecorator)(decorators, 'Component', false);
    if (decorator === undefined || decorator.args === null || decorator.args.length !== 1) {
        return false;
    }
    const arg = decorator.args[0];
    if (typescript_1.default.isObjectLiteralExpression(arg)) {
        const property = (0, property_name_1.findLiteralProperty)(arg, 'standalone');
        if (property) {
            return property.initializer.getText() === 'true';
        }
        else {
            return true; // standalone is true by default in v19
        }
    }
    return false;
}
/**
 * Checks whether a node is variable declaration of type Routes or Route[] and comes from @angular/router
 * @param node Variable declaration being checked.
 * @param typeChecker
 */
function isAngularRoutesArray(node, typeChecker) {
    var _a, _b;
    if (typescript_1.default.isVariableDeclaration(node)) {
        const type = typeChecker.getTypeAtLocation(node);
        if (type && typeChecker.isArrayType(type)) {
            // Route[] is an array type
            const typeArguments = typeChecker.getTypeArguments(type);
            const symbol = (_a = typeArguments[0]) === null || _a === void 0 ? void 0 : _a.getSymbol();
            return ((symbol === null || symbol === void 0 ? void 0 : symbol.name) === 'Route' &&
                ((_b = symbol === null || symbol === void 0 ? void 0 : symbol.declarations) === null || _b === void 0 ? void 0 : _b.some((decl) => {
                    return decl.getSourceFile().fileName.includes('@angular/router');
                })));
        }
    }
    return false;
}
/**
 * Checks whether a node is a call expression to a router module method.
 * Examples:
 * - RouterModule.forRoot(routes)
 * - RouterModule.forChild(routes)
 */
function isRouterModuleCallExpression(node, typeChecker) {
    if (typescript_1.default.isPropertyAccessExpression(node.expression)) {
        const propAccess = node.expression;
        const moduleSymbol = typeChecker.getSymbolAtLocation(propAccess.expression);
        return ((moduleSymbol === null || moduleSymbol === void 0 ? void 0 : moduleSymbol.name) === 'RouterModule' &&
            (propAccess.name.text === 'forRoot' || propAccess.name.text === 'forChild'));
    }
    return false;
}
/**
 * Checks whether a node is a call expression to a router method.
 * Example: this.router.resetConfig(routes)
 */
function isRouterCallExpression(node, typeChecker) {
    var _a;
    if (typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === 'resetConfig') {
        const calleeExpression = node.expression.expression;
        const symbol = typeChecker.getSymbolAtLocation(calleeExpression);
        if (symbol) {
            const type = typeChecker.getTypeOfSymbolAtLocation(symbol, calleeExpression);
            // if type of router is Router, then it is a router call expression
            return ((_a = type.aliasSymbol) === null || _a === void 0 ? void 0 : _a.escapedName) === 'Router';
        }
    }
    return false;
}
/**
 * Checks whether a node is a call expression to router provide function.
 * Example: provideRoutes(routes)
 */
function isRouterProviderCallExpression(node, typeChecker) {
    if (typescript_1.default.isIdentifier(node.expression)) {
        const moduleSymbol = typeChecker.getSymbolAtLocation(node.expression);
        return moduleSymbol && moduleSymbol.name === 'provideRoutes';
    }
    return false;
}
/**
 * Checks whether a node is a call expression to provideRouter function.
 * Example: provideRouter(routes)
 */
function isProvideRoutesCallExpression(node, typeChecker) {
    if (typescript_1.default.isIdentifier(node.expression)) {
        const moduleSymbol = typeChecker.getSymbolAtLocation(node.expression);
        return moduleSymbol && moduleSymbol.name === 'provideRouter';
    }
    return false;
}
