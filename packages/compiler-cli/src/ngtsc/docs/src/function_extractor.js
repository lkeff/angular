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
exports.FunctionExtractor = void 0;
exports.extractAllParams = extractAllParams;
exports.extractCallSignatures = extractCallSignatures;
exports.findImplementationOfFunction = findImplementationOfFunction;
const typescript_1 = __importDefault(require("typescript"));
const entities_1 = require("./entities");
const generics_extractor_1 = require("./generics_extractor");
const jsdoc_extractor_1 = require("./jsdoc_extractor");
const type_extractor_1 = require("./type_extractor");
class FunctionExtractor {
    constructor(name, exportDeclaration, typeChecker) {
        this.name = name;
        this.exportDeclaration = exportDeclaration;
        this.typeChecker = typeChecker;
    }
    extract() {
        var _a, _b;
        // TODO: is there any real situation in which the signature would not be available here?
        //     Is void a better type?
        const signature = this.typeChecker.getSignatureFromDeclaration(this.exportDeclaration);
        const returnType = signature ? extractReturnType(signature, this.typeChecker) : 'unknown';
        const implementation = (_a = findImplementationOfFunction(this.exportDeclaration, this.typeChecker)) !== null && _a !== void 0 ? _a : this.exportDeclaration;
        const type = this.typeChecker.getTypeAtLocation(this.exportDeclaration);
        const overloads = typescript_1.default.isConstructorDeclaration(this.exportDeclaration)
            ? constructorOverloads(this.exportDeclaration, this.typeChecker)
            : extractCallSignatures(this.name, this.typeChecker, type);
        const jsdocsTags = (0, jsdoc_extractor_1.extractJsDocTags)(implementation);
        const description = (0, jsdoc_extractor_1.extractJsDocDescription)(implementation);
        return {
            name: this.name,
            signatures: overloads,
            implementation: {
                params: extractAllParams(implementation.parameters, this.typeChecker),
                isNewType: typescript_1.default.isConstructSignatureDeclaration(implementation),
                returnType,
                returnDescription: (_b = jsdocsTags.find((tag) => tag.name === 'returns')) === null || _b === void 0 ? void 0 : _b.comment,
                generics: (0, generics_extractor_1.extractGenerics)(implementation),
                name: this.name,
                description,
                entryType: entities_1.EntryType.Function,
                jsdocTags: jsdocsTags,
                rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(implementation),
            },
            entryType: entities_1.EntryType.Function,
            description,
            jsdocTags: jsdocsTags,
            rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(implementation),
        };
    }
}
exports.FunctionExtractor = FunctionExtractor;
function constructorOverloads(constructorDeclaration, typeChecker) {
    const classDeclaration = constructorDeclaration.parent;
    const constructorNode = classDeclaration.members.filter((member) => {
        return typescript_1.default.isConstructorDeclaration(member) && !member.body;
    });
    return constructorNode.map((n) => {
        var _a;
        return {
            name: 'constructor',
            params: extractAllParams(n.parameters, typeChecker),
            returnType: (_a = typeChecker.getTypeAtLocation(classDeclaration)) === null || _a === void 0 ? void 0 : _a.symbol.name,
            description: (0, jsdoc_extractor_1.extractJsDocDescription)(n),
            entryType: entities_1.EntryType.Function,
            jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(n),
            rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(n),
            generics: (0, generics_extractor_1.extractGenerics)(n),
            isNewType: false,
        };
    });
}
/** Extracts parameters of the given parameter declaration AST nodes. */
function extractAllParams(params, typeChecker) {
    return params.map((param) => ({
        name: param.name.getText(),
        description: (0, jsdoc_extractor_1.extractJsDocDescription)(param),
        type: (0, type_extractor_1.extractResolvedTypeString)(param, typeChecker),
        isOptional: !!(param.questionToken || param.initializer),
        isRestParam: !!param.dotDotDotToken,
    }));
}
/** Filters the list signatures to valid function and initializer API signatures. */
function filterSignatureDeclarations(signatures) {
    const result = [];
    for (const signature of signatures) {
        const decl = signature.getDeclaration();
        if (typescript_1.default.isFunctionDeclaration(decl) ||
            typescript_1.default.isCallSignatureDeclaration(decl) ||
            typescript_1.default.isMethodDeclaration(decl) ||
            typescript_1.default.isConstructSignatureDeclaration(decl)) {
            result.push({ signature, decl });
        }
    }
    return result;
}
function extractCallSignatures(name, typeChecker, type) {
    return filterSignatureDeclarations(type.getCallSignatures()).map(({ decl, signature }) => ({
        name,
        entryType: entities_1.EntryType.Function,
        description: (0, jsdoc_extractor_1.extractJsDocDescription)(decl),
        generics: (0, generics_extractor_1.extractGenerics)(decl),
        isNewType: false,
        jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(decl),
        params: extractAllParams(decl.parameters, typeChecker),
        rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(decl),
        returnType: extractReturnType(signature, typeChecker),
    }));
}
function extractReturnType(signature, typeChecker) {
    var _a;
    // Handling Type Predicates
    if (((_a = signature === null || signature === void 0 ? void 0 : signature.declaration) === null || _a === void 0 ? void 0 : _a.type) && typescript_1.default.isTypePredicateNode(signature.declaration.type)) {
        return signature.declaration.type.getText();
    }
    return typeChecker.typeToString(typeChecker.getReturnTypeOfSignature(signature), undefined, 
    // This ensures that e.g. `T | undefined` is not reduced to `T`.
    typescript_1.default.TypeFormatFlags.NoTypeReduction | typescript_1.default.TypeFormatFlags.NoTruncation);
}
/** Finds the implementation of the given function declaration overload signature. */
function findImplementationOfFunction(node, typeChecker) {
    var _a;
    if (node.body !== undefined || node.name === undefined) {
        return node;
    }
    const symbol = typeChecker.getSymbolAtLocation(node.name);
    const implementation = (_a = symbol === null || symbol === void 0 ? void 0 : symbol.declarations) === null || _a === void 0 ? void 0 : _a.find((s) => typescript_1.default.isFunctionDeclaration(s) && s.body !== undefined);
    return implementation;
}
