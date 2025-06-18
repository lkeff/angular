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
exports.DefinitionBuilder = void 0;
const compiler_1 = require("@angular/compiler");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const metadata_1 = require("@angular/compiler-cli/src/ngtsc/metadata");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
const references_and_rename_utils_1 = require("./references_and_rename_utils");
const template_target_1 = require("./template_target");
const ts_utils_1 = require("./utils/ts_utils");
const utils_1 = require("./utils");
class DefinitionBuilder {
    constructor(tsLS, compiler) {
        this.tsLS = tsLS;
        this.compiler = compiler;
        this.ttc = this.compiler.getTemplateTypeChecker();
    }
    getDefinitionAndBoundSpan(fileName, position) {
        var _a;
        const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, position, this.compiler);
        if (typeCheckInfo === undefined) {
            // We were unable to get a template at the given position. If we are in a TS file, instead
            // attempt to get an Angular definition at the location inside a TS file (examples of this
            // would be templateUrl or a url in styleUrls).
            if (!(0, utils_1.isTypeScriptFile)(fileName)) {
                return;
            }
            return getDefinitionForExpressionAtPosition(fileName, position, this.compiler);
        }
        const definitionMetas = this.getDefinitionMetaAtPosition(typeCheckInfo, position);
        if (definitionMetas === undefined) {
            return undefined;
        }
        const definitions = [];
        for (const definitionMeta of definitionMetas) {
            // The `$event` of event handlers would point to the $event parameter in the shim file, as in
            // `_t3["x"].subscribe(function ($event): any { $event }) ;`
            // If we wanted to return something for this, it would be more appropriate for something like
            // `getTypeDefinition`.
            if ((0, utils_1.isDollarEvent)(definitionMeta.node)) {
                continue;
            }
            definitions.push(...((_a = this.getDefinitionsForSymbol(Object.assign(Object.assign({}, definitionMeta), typeCheckInfo))) !== null && _a !== void 0 ? _a : []));
        }
        if (definitions.length === 0) {
            return undefined;
        }
        return { definitions, textSpan: (0, utils_1.getTextSpanOfNode)(definitionMetas[0].node) };
    }
    getDefinitionsForSymbol({ symbol, node, parent, declaration, }) {
        switch (symbol.kind) {
            case api_1.SymbolKind.Directive:
            case api_1.SymbolKind.Element:
            case api_1.SymbolKind.Template:
            case api_1.SymbolKind.DomBinding:
                // Though it is generally more appropriate for the above symbol definitions to be
                // associated with "type definitions" since the location in the template is the
                // actual definition location, the better user experience would be to allow
                // LS users to "go to definition" on an item in the template that maps to a class and be
                // taken to the directive or HTML class.
                return this.getTypeDefinitionsForTemplateInstance(symbol, node);
            case api_1.SymbolKind.Pipe: {
                if (symbol.tsSymbol !== null) {
                    return this.getDefinitionsForSymbols(symbol);
                }
                else {
                    // If there is no `ts.Symbol` for the pipe transform, we want to return the
                    // type definition (the pipe class).
                    return this.getTypeDefinitionsForSymbols(symbol.classSymbol);
                }
            }
            case api_1.SymbolKind.Output:
            case api_1.SymbolKind.Input: {
                const bindingDefs = this.getDefinitionsForSymbols(...symbol.bindings);
                // Also attempt to get directive matches for the input name. If there is a directive that
                // has the input name as part of the selector, we want to return that as well.
                const directiveDefs = this.getDirectiveTypeDefsForBindingNode(node, parent, declaration);
                return [...bindingDefs, ...directiveDefs];
            }
            case api_1.SymbolKind.LetDeclaration:
            case api_1.SymbolKind.Variable:
            case api_1.SymbolKind.Reference: {
                const definitions = [];
                if (symbol.declaration !== node) {
                    const tcbLocation = symbol.kind === api_1.SymbolKind.Reference
                        ? symbol.referenceVarLocation
                        : symbol.localVarLocation;
                    const mapping = (0, utils_1.getTemplateLocationFromTcbLocation)(this.compiler.getTemplateTypeChecker(), tcbLocation.tcbPath, tcbLocation.isShimFile, tcbLocation.positionInFile);
                    if (mapping !== null) {
                        definitions.push({
                            name: symbol.declaration.name,
                            containerName: '',
                            containerKind: typescript_1.default.ScriptElementKind.unknown,
                            kind: typescript_1.default.ScriptElementKind.variableElement,
                            textSpan: (0, utils_1.getTextSpanOfNode)(symbol.declaration),
                            contextSpan: (0, utils_1.toTextSpan)(symbol.declaration.sourceSpan),
                            fileName: mapping.templateUrl,
                        });
                    }
                }
                if (symbol.kind === api_1.SymbolKind.Variable || symbol.kind === api_1.SymbolKind.LetDeclaration) {
                    definitions.push(...this.getDefinitionsForSymbols({ tcbLocation: symbol.initializerLocation }));
                }
                return definitions;
            }
            case api_1.SymbolKind.Expression: {
                return this.getDefinitionsForSymbols(symbol);
            }
        }
    }
    getDefinitionsForSymbols(...symbols) {
        return symbols.flatMap(({ tcbLocation }) => {
            const { tcbPath, positionInFile } = tcbLocation;
            const definitionInfos = this.tsLS.getDefinitionAtPosition(tcbPath, positionInFile);
            if (definitionInfos === undefined) {
                return [];
            }
            return this.mapShimResultsToTemplates(definitionInfos);
        });
    }
    /**
     * Converts and definition info result that points to a template typecheck file to a reference to
     * the corresponding location in the template.
     */
    mapShimResultsToTemplates(definitionInfos) {
        const result = [];
        for (const info of definitionInfos) {
            if (this.ttc.isTrackedTypeCheckFile((0, file_system_1.absoluteFrom)(info.fileName))) {
                const templateDefinitionInfo = (0, references_and_rename_utils_1.convertToTemplateDocumentSpan)(info, this.ttc, this.compiler.getCurrentProgram());
                if (templateDefinitionInfo === null) {
                    continue;
                }
                result.push(templateDefinitionInfo);
            }
            else {
                result.push(info);
            }
        }
        return result;
    }
    getTypeDefinitionsAtPosition(fileName, position) {
        const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, position, this.compiler);
        if (typeCheckInfo === undefined) {
            return undefined;
        }
        const definitionMetas = this.getDefinitionMetaAtPosition(typeCheckInfo, position);
        if (definitionMetas === undefined) {
            return undefined;
        }
        const definitions = [];
        for (const { symbol, node, parent } of definitionMetas) {
            switch (symbol.kind) {
                case api_1.SymbolKind.Directive:
                case api_1.SymbolKind.DomBinding:
                case api_1.SymbolKind.Element:
                case api_1.SymbolKind.Template:
                    definitions.push(...this.getTypeDefinitionsForTemplateInstance(symbol, node));
                    break;
                case api_1.SymbolKind.Output:
                case api_1.SymbolKind.Input: {
                    const bindingDefs = this.getTypeDefinitionsForSymbols(...symbol.bindings);
                    definitions.push(...bindingDefs);
                    // Also attempt to get directive matches for the input name. If there is a directive that
                    // has the input name as part of the selector, we want to return that as well.
                    const directiveDefs = this.getDirectiveTypeDefsForBindingNode(node, parent, typeCheckInfo.declaration);
                    definitions.push(...directiveDefs);
                    break;
                }
                case api_1.SymbolKind.Pipe: {
                    if (symbol.tsSymbol !== null) {
                        definitions.push(...this.getTypeDefinitionsForSymbols(symbol));
                    }
                    else {
                        // If there is no `ts.Symbol` for the pipe transform, we want to return the
                        // type definition (the pipe class).
                        definitions.push(...this.getTypeDefinitionsForSymbols(symbol.classSymbol));
                    }
                    break;
                }
                case api_1.SymbolKind.Reference:
                    definitions.push(...this.getTypeDefinitionsForSymbols({ tcbLocation: symbol.targetLocation }));
                    break;
                case api_1.SymbolKind.Expression:
                    definitions.push(...this.getTypeDefinitionsForSymbols(symbol));
                    break;
                case api_1.SymbolKind.Variable:
                case api_1.SymbolKind.LetDeclaration: {
                    definitions.push(...this.getTypeDefinitionsForSymbols({ tcbLocation: symbol.initializerLocation }));
                    break;
                }
            }
            return definitions;
        }
        return undefined;
    }
    getTypeDefinitionsForTemplateInstance(symbol, node) {
        switch (symbol.kind) {
            case api_1.SymbolKind.Template: {
                const matches = (0, utils_1.getDirectiveMatchesForElementTag)(symbol.templateNode, symbol.directives);
                return this.getTypeDefinitionsForSymbols(...matches);
            }
            case api_1.SymbolKind.Element: {
                const matches = (0, utils_1.getDirectiveMatchesForElementTag)(symbol.templateNode, symbol.directives);
                // If one of the directive matches is a component, we should not include the native element
                // in the results because it is replaced by the component.
                return Array.from(matches).some((dir) => dir.isComponent)
                    ? this.getTypeDefinitionsForSymbols(...matches)
                    : this.getTypeDefinitionsForSymbols(...matches, symbol);
            }
            case api_1.SymbolKind.DomBinding: {
                if (!(node instanceof compiler_1.TmplAstTextAttribute)) {
                    return [];
                }
                const dirs = (0, utils_1.getDirectiveMatchesForAttribute)(node.name, symbol.host.templateNode, symbol.host.directives);
                return this.getTypeDefinitionsForSymbols(...dirs);
            }
            case api_1.SymbolKind.Directive:
                return this.getTypeDefinitionsForSymbols(symbol);
        }
    }
    getDirectiveTypeDefsForBindingNode(node, parent, component) {
        if (!(node instanceof compiler_1.TmplAstBoundAttribute) &&
            !(node instanceof compiler_1.TmplAstTextAttribute) &&
            !(node instanceof compiler_1.TmplAstBoundEvent)) {
            return [];
        }
        if (parent === null ||
            !(parent instanceof compiler_1.TmplAstTemplate || parent instanceof compiler_1.TmplAstElement)) {
            return [];
        }
        const templateOrElementSymbol = this.compiler
            .getTemplateTypeChecker()
            .getSymbolOfNode(parent, component);
        if (templateOrElementSymbol === null ||
            (templateOrElementSymbol.kind !== api_1.SymbolKind.Template &&
                templateOrElementSymbol.kind !== api_1.SymbolKind.Element)) {
            return [];
        }
        const dirs = (0, utils_1.getDirectiveMatchesForAttribute)(node.name, parent, templateOrElementSymbol.directives);
        return this.getTypeDefinitionsForSymbols(...dirs);
    }
    getTypeDefinitionsForSymbols(...symbols) {
        return symbols.flatMap(({ tcbLocation }) => {
            var _a;
            const { tcbPath, positionInFile } = tcbLocation;
            return (_a = this.tsLS.getTypeDefinitionAtPosition(tcbPath, positionInFile)) !== null && _a !== void 0 ? _a : [];
        });
    }
    getDefinitionMetaAtPosition(info, position) {
        const target = (0, template_target_1.getTargetAtPosition)(info.nodes, position);
        if (target === null) {
            return undefined;
        }
        const { context, parent } = target;
        const nodes = context.kind === template_target_1.TargetNodeKind.TwoWayBindingContext ? context.nodes : [context.node];
        const definitionMetas = [];
        for (const node of nodes) {
            const symbol = this.compiler.getTemplateTypeChecker().getSymbolOfNode(node, info.declaration);
            if (symbol === null) {
                continue;
            }
            definitionMetas.push({ node, parent, symbol });
        }
        return definitionMetas.length > 0 ? definitionMetas : undefined;
    }
}
exports.DefinitionBuilder = DefinitionBuilder;
/**
 * Gets an Angular-specific definition in a TypeScript source file.
 */
function getDefinitionForExpressionAtPosition(fileName, position, compiler) {
    var _a;
    const sf = compiler.getCurrentProgram().getSourceFile(fileName);
    if (sf === undefined) {
        return;
    }
    const expression = (0, ts_utils_1.findTightestNode)(sf, position);
    if (expression === undefined) {
        return;
    }
    const classDeclaration = (0, ts_utils_1.getParentClassDeclaration)(expression);
    if (classDeclaration === undefined) {
        return;
    }
    const resource = compiler.getDirectiveResources(classDeclaration);
    if (resource === null) {
        return;
    }
    let resourceForExpression = null;
    if (((_a = resource.template) === null || _a === void 0 ? void 0 : _a.node) === expression) {
        resourceForExpression = resource.template;
    }
    if (resourceForExpression === null && resource.styles !== null) {
        for (const style of resource.styles) {
            if (style.node === expression) {
                resourceForExpression = style;
                break;
            }
        }
    }
    if (resourceForExpression === null && resource.hostBindings !== null) {
        for (const binding of resource.hostBindings) {
            if (binding.node === expression) {
                resourceForExpression = binding;
                break;
            }
        }
    }
    if (resourceForExpression === null || !(0, metadata_1.isExternalResource)(resourceForExpression)) {
        return;
    }
    const templateDefinitions = [
        {
            kind: typescript_1.default.ScriptElementKind.externalModuleName,
            name: resourceForExpression.path,
            containerKind: typescript_1.default.ScriptElementKind.unknown,
            containerName: '',
            // Reading the template is expensive, so don't provide a preview.
            // TODO(ayazhafiz): Consider providing an actual span:
            //  1. We're likely to read the template anyway
            //  2. We could show just the first 100 chars or so
            textSpan: { start: 0, length: 0 },
            fileName: resourceForExpression.path,
        },
    ];
    return {
        definitions: templateDefinitions,
        textSpan: {
            // Exclude opening and closing quotes in the url span.
            start: expression.getStart() + 1,
            length: expression.getWidth() - 2,
        },
    };
}
