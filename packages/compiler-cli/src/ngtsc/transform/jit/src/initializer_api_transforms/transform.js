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
exports.getInitializerApiJitTransform = getInitializerApiJitTransform;
const typescript_1 = __importDefault(require("typescript"));
const annotations_1 = require("../../../../annotations");
const typescript_2 = require("../../../../reflection/src/typescript");
const translator_1 = require("../../../../translator");
const input_function_1 = require("./input_function");
const model_function_1 = require("./model_function");
const output_function_1 = require("./output_function");
const query_functions_1 = require("./query_functions");
/** Decorators for classes that should be transformed. */
const decoratorsWithInputs = ['Directive', 'Component'];
/**
 * List of possible property transforms.
 * The first one matched on a class member will apply.
 */
const propertyTransforms = [
    input_function_1.signalInputsTransform,
    output_function_1.initializerApiOutputTransform,
    query_functions_1.queryFunctionsTransforms,
    model_function_1.signalModelTransform,
];
/**
 * Creates an AST transform that looks for Angular classes and transforms
 * initializer-based declared members to work with JIT compilation.
 *
 * For example, an `input()` member may be transformed to add an `@Input`
 * decorator for JIT.
 *
 * @param host Reflection host
 * @param importTracker Import tracker for efficient import checking.
 * @param isCore Whether this transforms runs against `@angular/core`.
 * @param shouldTransformClass Optional function to check if a given class should be transformed.
 */
function getInitializerApiJitTransform(host, importTracker, isCore, shouldTransformClass) {
    return (ctx) => {
        return (sourceFile) => {
            const importManager = new translator_1.ImportManager();
            sourceFile = typescript_1.default.visitNode(sourceFile, createTransformVisitor(ctx, host, importManager, importTracker, isCore, shouldTransformClass), typescript_1.default.isSourceFile);
            return importManager.transformTsFile(ctx, sourceFile);
        };
    };
}
function createTransformVisitor(ctx, host, importManager, importTracker, isCore, shouldTransformClass) {
    const visitor = (node) => {
        var _a;
        if (typescript_1.default.isClassDeclaration(node) && node.name !== undefined) {
            const originalNode = typescript_1.default.getOriginalNode(node, typescript_1.default.isClassDeclaration);
            // Note: Attempt to detect the `angularDecorator` on the original node of the class.
            // That is because e.g. Tsickle or other transforms might have transformed the node
            // already to transform decorators.
            const angularDecorator = (_a = host
                .getDecoratorsOfDeclaration(originalNode)) === null || _a === void 0 ? void 0 : _a.find((d) => decoratorsWithInputs.some((name) => (0, annotations_1.isAngularDecorator)(d, name, isCore)));
            if (angularDecorator !== undefined &&
                (shouldTransformClass === undefined || shouldTransformClass(node))) {
                let hasChanged = false;
                const sourceFile = originalNode.getSourceFile();
                const members = node.members.map((memberNode) => {
                    if (!typescript_1.default.isPropertyDeclaration(memberNode)) {
                        return memberNode;
                    }
                    const member = (0, typescript_2.reflectClassMember)(memberNode);
                    if (member === null) {
                        return memberNode;
                    }
                    // Find the first matching transform and update the class member.
                    for (const transform of propertyTransforms) {
                        const newNode = transform(Object.assign(Object.assign({}, member), { node: memberNode }), sourceFile, host, ctx.factory, importTracker, importManager, angularDecorator, isCore);
                        if (newNode !== member.node) {
                            hasChanged = true;
                            return newNode;
                        }
                    }
                    return memberNode;
                });
                if (hasChanged) {
                    return ctx.factory.updateClassDeclaration(node, node.modifiers, node.name, node.typeParameters, node.heritageClauses, members);
                }
            }
        }
        return typescript_1.default.visitEachChild(node, visitor, ctx);
    };
    return visitor;
}
