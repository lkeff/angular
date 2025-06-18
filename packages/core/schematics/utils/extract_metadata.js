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
exports.extractAngularClassMetadata = extractAngularClassMetadata;
const typescript_1 = __importDefault(require("typescript"));
const ng_decorators_1 = require("./ng_decorators");
const functions_1 = require("./typescript/functions");
/** Extracts `@Directive` or `@Component` metadata from the given class. */
function extractAngularClassMetadata(typeChecker, node) {
    const decorators = typescript_1.default.getDecorators(node);
    if (!decorators || !decorators.length) {
        return null;
    }
    const ngDecorators = (0, ng_decorators_1.getAngularDecorators)(typeChecker, decorators);
    const componentDecorator = ngDecorators.find((dec) => dec.name === 'Component');
    const directiveDecorator = ngDecorators.find((dec) => dec.name === 'Directive');
    const decorator = componentDecorator !== null && componentDecorator !== void 0 ? componentDecorator : directiveDecorator;
    // In case no decorator could be found on the current class, skip.
    if (!decorator) {
        return null;
    }
    const decoratorCall = decorator.node.expression;
    // In case the decorator call is not valid, skip this class declaration.
    if (decoratorCall.arguments.length !== 1) {
        return null;
    }
    const metadata = (0, functions_1.unwrapExpression)(decoratorCall.arguments[0]);
    // Ensure that the metadata is an object literal expression.
    if (!typescript_1.default.isObjectLiteralExpression(metadata)) {
        return null;
    }
    return {
        type: componentDecorator ? 'component' : 'directive',
        node: metadata,
    };
}
