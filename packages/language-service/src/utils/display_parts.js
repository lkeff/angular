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
exports.DisplayInfoKind = exports.SYMBOL_TEXT = exports.SYMBOL_SPACE = exports.SYMBOL_PUNC = exports.SYMBOL_INTERFACE = exports.ALIAS_NAME = void 0;
exports.getSymbolDisplayInfo = getSymbolDisplayInfo;
exports.createDisplayParts = createDisplayParts;
exports.unsafeCastDisplayInfoKindToScriptElementKind = unsafeCastDisplayInfoKindToScriptElementKind;
exports.getDirectiveDisplayInfo = getDirectiveDisplayInfo;
exports.getTsSymbolDisplayInfo = getTsSymbolDisplayInfo;
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
// Reverse mappings of enum would generate strings
exports.ALIAS_NAME = typescript_1.default.SymbolDisplayPartKind[typescript_1.default.SymbolDisplayPartKind.aliasName];
exports.SYMBOL_INTERFACE = typescript_1.default.SymbolDisplayPartKind[typescript_1.default.SymbolDisplayPartKind.interfaceName];
exports.SYMBOL_PUNC = typescript_1.default.SymbolDisplayPartKind[typescript_1.default.SymbolDisplayPartKind.punctuation];
exports.SYMBOL_SPACE = typescript_1.default.SymbolDisplayPartKind[typescript_1.default.SymbolDisplayPartKind.space];
exports.SYMBOL_TEXT = typescript_1.default.SymbolDisplayPartKind[typescript_1.default.SymbolDisplayPartKind.text];
/**
 * Label for various kinds of Angular entities for TS display info.
 */
var DisplayInfoKind;
(function (DisplayInfoKind) {
    DisplayInfoKind["ATTRIBUTE"] = "attribute";
    DisplayInfoKind["BLOCK"] = "block";
    DisplayInfoKind["TRIGGER"] = "trigger";
    DisplayInfoKind["COMPONENT"] = "component";
    DisplayInfoKind["DIRECTIVE"] = "directive";
    DisplayInfoKind["EVENT"] = "event";
    DisplayInfoKind["REFERENCE"] = "reference";
    DisplayInfoKind["ELEMENT"] = "element";
    DisplayInfoKind["VARIABLE"] = "variable";
    DisplayInfoKind["PIPE"] = "pipe";
    DisplayInfoKind["PROPERTY"] = "property";
    DisplayInfoKind["METHOD"] = "method";
    DisplayInfoKind["TEMPLATE"] = "template";
    DisplayInfoKind["KEYWORD"] = "keyword";
    DisplayInfoKind["LET"] = "let";
})(DisplayInfoKind || (exports.DisplayInfoKind = DisplayInfoKind = {}));
function getSymbolDisplayInfo(tsLS, typeChecker, symbol) {
    let kind;
    if (symbol.kind === api_1.SymbolKind.Reference) {
        kind = DisplayInfoKind.REFERENCE;
    }
    else if (symbol.kind === api_1.SymbolKind.Variable) {
        kind = DisplayInfoKind.VARIABLE;
    }
    else if (symbol.kind === api_1.SymbolKind.LetDeclaration) {
        kind = DisplayInfoKind.LET;
    }
    else {
        throw new Error(`AssertionError: unexpected symbol kind ${api_1.SymbolKind[symbol.kind]}`);
    }
    const displayParts = createDisplayParts(symbol.declaration.name, kind, 
    /* containerName */ undefined, typeChecker.typeToString(symbol.tsType));
    const quickInfo = symbol.kind === api_1.SymbolKind.Reference
        ? getQuickInfoFromTypeDefAtLocation(tsLS, symbol.targetLocation)
        : getQuickInfoFromTypeDefAtLocation(tsLS, symbol.initializerLocation);
    return {
        kind,
        displayParts,
        documentation: quickInfo === null || quickInfo === void 0 ? void 0 : quickInfo.documentation,
        tags: quickInfo === null || quickInfo === void 0 ? void 0 : quickInfo.tags,
    };
}
/**
 * Construct a compound `ts.SymbolDisplayPart[]` which incorporates the container and type of a
 * target declaration.
 * @param name Name of the target
 * @param kind component, directive, pipe, etc.
 * @param containerName either the Symbol's container or the NgModule that contains the directive
 * @param type user-friendly name of the type
 * @param documentation docstring or comment
 */
function createDisplayParts(name, kind, containerName, type) {
    const containerDisplayParts = containerName !== undefined
        ? [
            { text: containerName, kind: exports.SYMBOL_INTERFACE },
            { text: '.', kind: exports.SYMBOL_PUNC },
        ]
        : [];
    const typeDisplayParts = type !== undefined
        ? [
            { text: ':', kind: exports.SYMBOL_PUNC },
            { text: ' ', kind: exports.SYMBOL_SPACE },
            { text: type, kind: exports.SYMBOL_INTERFACE },
        ]
        : [];
    return [
        { text: '(', kind: exports.SYMBOL_PUNC },
        { text: kind, kind: exports.SYMBOL_TEXT },
        { text: ')', kind: exports.SYMBOL_PUNC },
        { text: ' ', kind: exports.SYMBOL_SPACE },
        ...containerDisplayParts,
        { text: name, kind: exports.SYMBOL_INTERFACE },
        ...typeDisplayParts,
    ];
}
/**
 * Convert a `SymbolDisplayInfoKind` to a `ts.ScriptElementKind` type, allowing it to pass through
 * TypeScript APIs.
 *
 * In practice, this is an "illegal" type cast. Since `ts.ScriptElementKind` is a string, this is
 * safe to do if TypeScript only uses the value in a string context. Consumers of this conversion
 * function are responsible for ensuring this is the case.
 */
function unsafeCastDisplayInfoKindToScriptElementKind(kind) {
    return kind;
}
function getQuickInfoFromTypeDefAtLocation(tsLS, tcbLocation) {
    const typeDefs = tsLS.getTypeDefinitionAtPosition(tcbLocation.tcbPath, tcbLocation.positionInFile);
    if (typeDefs === undefined || typeDefs.length === 0) {
        return undefined;
    }
    return tsLS.getQuickInfoAtPosition(typeDefs[0].fileName, typeDefs[0].textSpan.start);
}
function getDirectiveDisplayInfo(tsLS, dir) {
    var _a, _b;
    const kind = dir.isComponent ? DisplayInfoKind.COMPONENT : DisplayInfoKind.DIRECTIVE;
    const decl = dir.tsSymbol.declarations.find(typescript_1.default.isClassDeclaration);
    if (decl === undefined || decl.name === undefined) {
        return {
            kind,
            displayParts: [],
            documentation: [],
            tags: undefined,
        };
    }
    const res = tsLS.getQuickInfoAtPosition(decl.getSourceFile().fileName, decl.name.getStart());
    if (res === undefined) {
        return {
            kind,
            displayParts: [],
            documentation: [],
            tags: undefined,
        };
    }
    const displayParts = createDisplayParts(dir.tsSymbol.name, kind, (_b = (_a = dir.ngModule) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.text, undefined);
    return {
        kind,
        displayParts,
        documentation: res.documentation,
        tags: res.tags,
    };
}
function getTsSymbolDisplayInfo(tsLS, checker, symbol, kind, ownerName) {
    const decl = symbol.valueDeclaration;
    if (decl === undefined ||
        (!typescript_1.default.isPropertyDeclaration(decl) &&
            !typescript_1.default.isMethodDeclaration(decl) &&
            !(0, reflection_1.isNamedClassDeclaration)(decl)) ||
        !typescript_1.default.isIdentifier(decl.name)) {
        return null;
    }
    const res = tsLS.getQuickInfoAtPosition(decl.getSourceFile().fileName, decl.name.getStart());
    if (res === undefined) {
        return {
            kind,
            displayParts: [],
            documentation: [],
            tags: undefined,
        };
    }
    const type = checker.getDeclaredTypeOfSymbol(symbol);
    const typeString = checker.typeToString(type);
    const displayParts = createDisplayParts(symbol.name, kind, ownerName !== null && ownerName !== void 0 ? ownerName : undefined, typeString);
    return {
        kind,
        displayParts,
        documentation: res.documentation,
        tags: res.tags,
    };
}
