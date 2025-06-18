"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickInfoBuilder = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
const display_parts_1 = require("./utils/display_parts");
const quick_info_built_ins_1 = require("./quick_info_built_ins");
const utils_1 = require("./utils");
class QuickInfoBuilder {
    constructor(tsLS, compiler, component, node, positionDetails) {
        this.tsLS = tsLS;
        this.compiler = compiler;
        this.component = component;
        this.node = node;
        this.positionDetails = positionDetails;
        this.typeChecker = this.compiler.getCurrentProgram().getTypeChecker();
        this.parent = this.positionDetails.parent;
    }
    get() {
        if (this.node instanceof compiler_1.TmplAstDeferredTrigger || this.node instanceof compiler_1.TmplAstBlockNode) {
            return (0, quick_info_built_ins_1.createQuickInfoForBuiltIn)(this.node, this.positionDetails.position);
        }
        const symbol = this.compiler
            .getTemplateTypeChecker()
            .getSymbolOfNode(this.node, this.component);
        if (symbol !== null) {
            return this.getQuickInfoForSymbol(symbol);
        }
        if ((0, quick_info_built_ins_1.isDollarAny)(this.node)) {
            return (0, quick_info_built_ins_1.createDollarAnyQuickInfo)(this.node);
        }
        // If the cursor lands on the receiver of a method call, we have to look
        // at the entire call in order to figure out if it's a call to `$any`.
        if (this.parent !== null && (0, quick_info_built_ins_1.isDollarAny)(this.parent) && this.parent.receiver === this.node) {
            return (0, quick_info_built_ins_1.createDollarAnyQuickInfo)(this.parent);
        }
        return undefined;
    }
    getQuickInfoForSymbol(symbol) {
        switch (symbol.kind) {
            case api_1.SymbolKind.Input:
            case api_1.SymbolKind.Output:
                return this.getQuickInfoForBindingSymbol(symbol);
            case api_1.SymbolKind.Template:
                return (0, quick_info_built_ins_1.createNgTemplateQuickInfo)(this.node);
            case api_1.SymbolKind.Element:
                return this.getQuickInfoForElementSymbol(symbol);
            case api_1.SymbolKind.Variable:
                return this.getQuickInfoForVariableSymbol(symbol);
            case api_1.SymbolKind.LetDeclaration:
                return this.getQuickInfoForLetDeclarationSymbol(symbol);
            case api_1.SymbolKind.Reference:
                return this.getQuickInfoForReferenceSymbol(symbol);
            case api_1.SymbolKind.DomBinding:
                return this.getQuickInfoForDomBinding(symbol);
            case api_1.SymbolKind.Directive:
                return this.getQuickInfoAtTcbLocation(symbol.tcbLocation);
            case api_1.SymbolKind.Pipe:
                return this.getQuickInfoForPipeSymbol(symbol);
            case api_1.SymbolKind.Expression:
                return this.getQuickInfoAtTcbLocation(symbol.tcbLocation);
        }
    }
    getQuickInfoForBindingSymbol(symbol) {
        if (symbol.bindings.length === 0) {
            return undefined;
        }
        const kind = symbol.kind === api_1.SymbolKind.Input ? display_parts_1.DisplayInfoKind.PROPERTY : display_parts_1.DisplayInfoKind.EVENT;
        const quickInfo = this.getQuickInfoAtTcbLocation(symbol.bindings[0].tcbLocation);
        return quickInfo === undefined ? undefined : updateQuickInfoKind(quickInfo, kind);
    }
    getQuickInfoForElementSymbol(symbol) {
        const { templateNode } = symbol;
        const matches = (0, utils_1.getDirectiveMatchesForElementTag)(templateNode, symbol.directives);
        const directiveSymbol = matches.size > 0 ? matches.values().next().value : null;
        if (directiveSymbol) {
            return this.getQuickInfoForDirectiveSymbol(directiveSymbol, templateNode);
        }
        return (0, utils_1.createQuickInfo)(templateNode.name, display_parts_1.DisplayInfoKind.ELEMENT, (0, utils_1.getTextSpanOfNode)(templateNode), undefined /* containerName */, this.typeChecker.typeToString(symbol.tsType));
    }
    getQuickInfoForVariableSymbol(symbol) {
        const info = this.getQuickInfoFromTypeDefAtLocation(symbol.initializerLocation);
        return (0, utils_1.createQuickInfo)(symbol.declaration.name, display_parts_1.DisplayInfoKind.VARIABLE, (0, utils_1.getTextSpanOfNode)(this.node), undefined /* containerName */, this.typeChecker.typeToString(symbol.tsType), info === null || info === void 0 ? void 0 : info.documentation, info === null || info === void 0 ? void 0 : info.tags);
    }
    getQuickInfoForLetDeclarationSymbol(symbol) {
        const info = this.getQuickInfoFromTypeDefAtLocation(symbol.initializerLocation);
        return (0, utils_1.createQuickInfo)(symbol.declaration.name, display_parts_1.DisplayInfoKind.LET, (0, utils_1.getTextSpanOfNode)(this.node), undefined /* containerName */, this.typeChecker.typeToString(symbol.tsType), info === null || info === void 0 ? void 0 : info.documentation, info === null || info === void 0 ? void 0 : info.tags);
    }
    getQuickInfoForReferenceSymbol(symbol) {
        const info = this.getQuickInfoFromTypeDefAtLocation(symbol.targetLocation);
        return (0, utils_1.createQuickInfo)(symbol.declaration.name, display_parts_1.DisplayInfoKind.REFERENCE, (0, utils_1.getTextSpanOfNode)(this.node), undefined /* containerName */, this.typeChecker.typeToString(symbol.tsType), info === null || info === void 0 ? void 0 : info.documentation, info === null || info === void 0 ? void 0 : info.tags);
    }
    getQuickInfoForPipeSymbol(symbol) {
        if (symbol.tsSymbol !== null) {
            const quickInfo = this.getQuickInfoAtTcbLocation(symbol.tcbLocation);
            return quickInfo === undefined
                ? undefined
                : updateQuickInfoKind(quickInfo, display_parts_1.DisplayInfoKind.PIPE);
        }
        else {
            return (0, utils_1.createQuickInfo)(this.typeChecker.typeToString(symbol.classSymbol.tsType), display_parts_1.DisplayInfoKind.PIPE, (0, utils_1.getTextSpanOfNode)(this.node));
        }
    }
    getQuickInfoForDomBinding(symbol) {
        if (!(this.node instanceof compiler_1.TmplAstTextAttribute) &&
            !(this.node instanceof compiler_1.TmplAstBoundAttribute)) {
            return undefined;
        }
        const directives = (0, utils_1.getDirectiveMatchesForAttribute)(this.node.name, symbol.host.templateNode, symbol.host.directives);
        const directiveSymbol = directives.size > 0 ? directives.values().next().value : null;
        return directiveSymbol ? this.getQuickInfoForDirectiveSymbol(directiveSymbol) : undefined;
    }
    getQuickInfoForDirectiveSymbol(dir, node = this.node) {
        const kind = dir.isComponent ? display_parts_1.DisplayInfoKind.COMPONENT : display_parts_1.DisplayInfoKind.DIRECTIVE;
        const info = this.getQuickInfoFromTypeDefAtLocation(dir.tcbLocation);
        let containerName;
        if (typescript_1.default.isClassDeclaration(dir.tsSymbol.valueDeclaration) && dir.ngModule !== null) {
            containerName = dir.ngModule.name.getText();
        }
        return (0, utils_1.createQuickInfo)(this.typeChecker.typeToString(dir.tsType), kind, (0, utils_1.getTextSpanOfNode)(this.node), containerName, undefined, info === null || info === void 0 ? void 0 : info.documentation, info === null || info === void 0 ? void 0 : info.tags);
    }
    getQuickInfoFromTypeDefAtLocation(tcbLocation) {
        const typeDefs = this.tsLS.getTypeDefinitionAtPosition(tcbLocation.tcbPath, tcbLocation.positionInFile);
        if (typeDefs === undefined || typeDefs.length === 0) {
            return undefined;
        }
        return this.tsLS.getQuickInfoAtPosition(typeDefs[0].fileName, typeDefs[0].textSpan.start);
    }
    getQuickInfoAtTcbLocation(location) {
        const quickInfo = this.tsLS.getQuickInfoAtPosition(location.tcbPath, location.positionInFile);
        if (quickInfo === undefined || quickInfo.displayParts === undefined) {
            return quickInfo;
        }
        quickInfo.displayParts = (0, utils_1.filterAliasImports)(quickInfo.displayParts);
        const textSpan = (0, utils_1.getTextSpanOfNode)(this.node);
        return Object.assign(Object.assign({}, quickInfo), { textSpan });
    }
}
exports.QuickInfoBuilder = QuickInfoBuilder;
function updateQuickInfoKind(quickInfo, kind) {
    if (quickInfo.displayParts === undefined) {
        return quickInfo;
    }
    const startsWithKind = quickInfo.displayParts.length >= 3 &&
        displayPartsEqual(quickInfo.displayParts[0], { text: '(', kind: display_parts_1.SYMBOL_PUNC }) &&
        quickInfo.displayParts[1].kind === display_parts_1.SYMBOL_TEXT &&
        displayPartsEqual(quickInfo.displayParts[2], { text: ')', kind: display_parts_1.SYMBOL_PUNC });
    if (startsWithKind) {
        quickInfo.displayParts[1].text = kind;
    }
    else {
        quickInfo.displayParts = [
            { text: '(', kind: display_parts_1.SYMBOL_PUNC },
            { text: kind, kind: display_parts_1.SYMBOL_TEXT },
            { text: ')', kind: display_parts_1.SYMBOL_PUNC },
            { text: ' ', kind: display_parts_1.SYMBOL_SPACE },
            ...quickInfo.displayParts,
        ];
    }
    return quickInfo;
}
function displayPartsEqual(a, b) {
    return a.text === b.text && a.kind === b.kind;
}
