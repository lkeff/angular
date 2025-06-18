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
exports.isInitializerApiFunction = isInitializerApiFunction;
exports.extractInitializerApiFunction = extractInitializerApiFunction;
const typescript_1 = __importDefault(require("typescript"));
const entities_1 = require("./entities");
const function_extractor_1 = require("./function_extractor");
const generics_extractor_1 = require("./generics_extractor");
const jsdoc_extractor_1 = require("./jsdoc_extractor");
/** JSDoc used to recognize an initializer API function. */
const initializerApiTag = 'initializerApiFunction';
/**
 * Checks whether the given node corresponds to an initializer API function.
 *
 * An initializer API function is a function declaration or variable declaration
 * that is explicitly annotated with `@initializerApiFunction`.
 *
 * Note: The node may be a function overload signature that is automatically
 * resolved to its implementation to detect the JSDoc tag.
 */
function isInitializerApiFunction(node, typeChecker) {
    // If this is matching an overload signature, resolve to the implementation
    // as it would hold the `@initializerApiFunction` tag.
    if (typescript_1.default.isFunctionDeclaration(node) && node.name !== undefined && node.body === undefined) {
        const implementation = (0, function_extractor_1.findImplementationOfFunction)(node, typeChecker);
        if (implementation !== undefined) {
            node = implementation;
        }
    }
    if (!typescript_1.default.isFunctionDeclaration(node) && !typescript_1.default.isVariableDeclaration(node)) {
        return false;
    }
    let tagContainer = typescript_1.default.isFunctionDeclaration(node) ? node : getContainerVariableStatement(node);
    if (tagContainer === null) {
        return false;
    }
    const tags = typescript_1.default.getJSDocTags(tagContainer);
    return tags.some((t) => t.tagName.text === initializerApiTag);
}
/**
 * Extracts the given node as initializer API function and returns
 * a docs entry that can be rendered to represent the API function.
 */
function extractInitializerApiFunction(node, typeChecker) {
    var _a;
    if (node.name === undefined || !typescript_1.default.isIdentifier(node.name)) {
        throw new Error(`Initializer API: Expected literal variable name.`);
    }
    const container = typescript_1.default.isFunctionDeclaration(node) ? node : getContainerVariableStatement(node);
    if (container === null) {
        throw new Error('Initializer API: Could not find container AST node of variable.');
    }
    const name = node.name.text;
    const type = typeChecker.getTypeAtLocation(node);
    // Top-level call signatures. E.g. `input()`, `input<ReadT>(initialValue: ReadT)`. etc.
    const callFunction = extractFunctionWithOverloads(name, type, typeChecker);
    // Sub-functions like `input.required()`.
    const subFunctions = [];
    for (const property of type.getProperties()) {
        const subName = property.getName();
        const subDecl = (_a = property.getDeclarations()) === null || _a === void 0 ? void 0 : _a[0];
        if (subDecl === undefined || !typescript_1.default.isPropertySignature(subDecl)) {
            throw new Error(`Initializer API: Could not resolve declaration of sub-property: ${name}.${subName}`);
        }
        const subType = typeChecker.getTypeAtLocation(subDecl);
        subFunctions.push(extractFunctionWithOverloads(subName, subType, typeChecker));
    }
    let jsdocTags;
    let description;
    let rawComment;
    // Extract container API documentation.
    // The container description describes the overall function, while
    // we allow the individual top-level call signatures to represent
    // their individual overloads.
    if (typescript_1.default.isFunctionDeclaration(node)) {
        const implementation = (0, function_extractor_1.findImplementationOfFunction)(node, typeChecker);
        if (implementation === undefined) {
            throw new Error(`Initializer API: Could not find implementation of function: ${name}`);
        }
        callFunction.implementation = {
            name,
            entryType: entities_1.EntryType.Function,
            isNewType: false,
            description: (0, jsdoc_extractor_1.extractJsDocDescription)(implementation),
            generics: (0, generics_extractor_1.extractGenerics)(implementation),
            jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(implementation),
            params: (0, function_extractor_1.extractAllParams)(implementation.parameters, typeChecker),
            rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(implementation),
            returnType: typeChecker.typeToString(typeChecker.getReturnTypeOfSignature(typeChecker.getSignatureFromDeclaration(implementation))),
        };
        jsdocTags = callFunction.implementation.jsdocTags;
        description = callFunction.implementation.description;
        rawComment = callFunction.implementation.description;
    }
    else {
        jsdocTags = (0, jsdoc_extractor_1.extractJsDocTags)(container);
        description = (0, jsdoc_extractor_1.extractJsDocDescription)(container);
        rawComment = (0, jsdoc_extractor_1.extractRawJsDoc)(container);
    }
    // Extract additional docs metadata from the initializer API JSDoc tag.
    const metadataTag = jsdocTags.find((t) => t.name === initializerApiTag);
    if (metadataTag === undefined) {
        throw new Error('Initializer API: Detected initializer API function does ' +
            `not have "@initializerApiFunction" tag: ${name}`);
    }
    let parsedMetadata = undefined;
    if (metadataTag.comment.trim() !== '') {
        try {
            parsedMetadata = JSON.parse(metadataTag.comment);
        }
        catch (e) {
            throw new Error(`Could not parse initializer API function metadata: ${e}`);
        }
    }
    return {
        entryType: entities_1.EntryType.InitializerApiFunction,
        name,
        description,
        jsdocTags,
        rawComment,
        callFunction,
        subFunctions,
        __docsMetadata__: parsedMetadata,
    };
}
/**
 * Gets the container node of the given variable declaration.
 *
 * A variable declaration may be annotated with e.g. `@initializerApiFunction`,
 * but the JSDoc tag is not attached to the node, but to the containing variable
 * statement.
 */
function getContainerVariableStatement(node) {
    if (!typescript_1.default.isVariableDeclarationList(node.parent)) {
        return null;
    }
    if (!typescript_1.default.isVariableStatement(node.parent.parent)) {
        return null;
    }
    return node.parent.parent;
}
/**
 * Extracts all given signatures and returns them as a function with
 * overloads.
 *
 * The implementation of the function may be attached later, or may
 * be non-existent. E.g. initializer APIs declared using an interface
 * with call signatures do not have an associated implementation function
 * that is statically retrievable. The constant holds the overall API description.
 */
function extractFunctionWithOverloads(name, type, typeChecker) {
    return {
        name,
        signatures: (0, function_extractor_1.extractCallSignatures)(name, typeChecker, type),
        // Implementation may be populated later.
        implementation: null,
    };
}
