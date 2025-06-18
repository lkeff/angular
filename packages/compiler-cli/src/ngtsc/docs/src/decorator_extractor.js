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
exports.extractorDecorator = extractorDecorator;
exports.isDecoratorDeclaration = isDecoratorDeclaration;
exports.isDecoratorOptionsInterface = isDecoratorOptionsInterface;
const typescript_1 = __importDefault(require("typescript"));
const class_extractor_1 = require("./class_extractor");
const entities_1 = require("./entities");
const jsdoc_extractor_1 = require("./jsdoc_extractor");
/** Extracts an API documentation entry for an Angular decorator. */
function extractorDecorator(declaration, typeChecker) {
    const documentedNode = getDecoratorJsDocNode(declaration);
    const decoratorType = getDecoratorType(declaration);
    if (!decoratorType) {
        throw new Error(`"${declaration.name.getText()} is not a decorator."`);
    }
    return {
        name: declaration.name.getText(),
        decoratorType: decoratorType,
        entryType: entities_1.EntryType.Decorator,
        rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(documentedNode),
        description: (0, jsdoc_extractor_1.extractJsDocDescription)(documentedNode),
        jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(documentedNode),
        members: getDecoratorOptions(declaration, typeChecker),
    };
}
/** Gets whether the given variable declaration is an Angular decorator declaration. */
function isDecoratorDeclaration(declaration) {
    return !!getDecoratorType(declaration);
}
/** Gets whether an interface is the options interface for a decorator in the same file. */
function isDecoratorOptionsInterface(declaration) {
    return declaration
        .getSourceFile()
        .statements.some((s) => typescript_1.default.isVariableStatement(s) &&
        s.declarationList.declarations.some((d) => isDecoratorDeclaration(d) && d.name.getText() === declaration.name.getText()));
}
/** Gets the type of decorator, or undefined if the declaration is not a decorator. */
function getDecoratorType(declaration) {
    var _a, _b;
    // All Angular decorators are initialized with one of `makeDecorator`, `makePropDecorator`,
    // or `makeParamDecorator`.
    const initializer = (_b = (_a = declaration.initializer) === null || _a === void 0 ? void 0 : _a.getFullText()) !== null && _b !== void 0 ? _b : '';
    if (initializer.includes('makeDecorator'))
        return entities_1.DecoratorType.Class;
    if (initializer.includes('makePropDecorator'))
        return entities_1.DecoratorType.Member;
    if (initializer.includes('makeParamDecorator'))
        return entities_1.DecoratorType.Parameter;
    return undefined;
}
/** Gets the doc entry for the options object for an Angular decorator */
function getDecoratorOptions(declaration, typeChecker) {
    var _a, _b;
    const name = declaration.name.getText();
    // Every decorator has an interface with its options in the same SourceFile.
    // Queries, however, are defined as a type alias pointing to an interface.
    const optionsDeclaration = declaration.getSourceFile().statements.find((node) => {
        return ((typescript_1.default.isInterfaceDeclaration(node) || typescript_1.default.isTypeAliasDeclaration(node)) &&
            node.name.getText() === name);
    });
    if (!optionsDeclaration) {
        throw new Error(`Decorator "${name}" has no corresponding options interface.`);
    }
    let optionsInterface;
    if (typescript_1.default.isTypeAliasDeclaration(optionsDeclaration)) {
        // We hard-code the assumption that if the decorator's option type is a type alias,
        // it resolves to a single interface (this is true for all query decorators at time of
        // this writing).
        const aliasedType = typeChecker.getTypeAtLocation(optionsDeclaration.type);
        optionsInterface = ((_b = (_a = aliasedType.getSymbol()) === null || _a === void 0 ? void 0 : _a.getDeclarations()) !== null && _b !== void 0 ? _b : []).find((d) => typescript_1.default.isInterfaceDeclaration(d));
    }
    else {
        optionsInterface = optionsDeclaration;
    }
    if (!optionsInterface || !typescript_1.default.isInterfaceDeclaration(optionsInterface)) {
        throw new Error(`Options for decorator "${name}" is not an interface.`);
    }
    // Take advantage of the interface extractor to pull the appropriate member info.
    // Hard code the knowledge that decorator options only have properties, never methods.
    return (0, class_extractor_1.extractInterface)(optionsInterface, typeChecker).members;
}
/**
 * Gets the call signature node that has the decorator's public JsDoc block.
 *
 * Every decorator has three parts:
 * - A const that has the actual decorator.
 * - An interface with the same name as the const that documents the decorator's options.
 * - An interface suffixed with "Decorator" that has the decorator's call signature and JsDoc block.
 *
 * For the description and JsDoc tags, we need the interface suffixed with "Decorator".
 */
function getDecoratorJsDocNode(declaration) {
    const name = declaration.name.getText();
    // Assume the existence of an interface in the same file with the same name
    // suffixed with "Decorator".
    const decoratorInterface = declaration.getSourceFile().statements.find((s) => {
        return typescript_1.default.isInterfaceDeclaration(s) && s.name.getText() === `${name}Decorator`;
    });
    if (!decoratorInterface || !typescript_1.default.isInterfaceDeclaration(decoratorInterface)) {
        throw new Error(`No interface "${name}Decorator" found.`);
    }
    // The public-facing JsDoc for each decorator is on one of its interface's call signatures.
    const callSignature = decoratorInterface.members.find((node) => {
        // The description block lives on one of the call signatures for this interface.
        return typescript_1.default.isCallSignatureDeclaration(node) && (0, jsdoc_extractor_1.extractRawJsDoc)(node);
    });
    if (!callSignature || !typescript_1.default.isCallSignatureDeclaration(callSignature)) {
        throw new Error(`No call signature with JsDoc on "${name}Decorator"`);
    }
    return callSignature;
}
