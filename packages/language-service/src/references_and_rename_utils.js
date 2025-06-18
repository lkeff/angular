"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetDetailsAtTemplatePosition = getTargetDetailsAtTemplatePosition;
exports.createLocationKey = createLocationKey;
exports.convertToTemplateDocumentSpan = convertToTemplateDocumentSpan;
exports.getRenameTextAndSpanAtPosition = getRenameTextAndSpanAtPosition;
exports.getParentClassMeta = getParentClassMeta;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const comments_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/src/comments");
const typescript_1 = __importDefault(require("typescript"));
const template_target_1 = require("./template_target");
const ts_utils_1 = require("./utils/ts_utils");
const utils_1 = require("./utils");
/**
 * Converts a `TcbLocation` to a more genericly named `FilePosition`.
 */
function toFilePosition(tcbLocation) {
    return { fileName: tcbLocation.tcbPath, position: tcbLocation.positionInFile };
}
/**
 * Takes a position in a template and finds equivalent targets in TS files as well as details about
 * the targeted template node.
 */
function getTargetDetailsAtTemplatePosition(info, position, templateTypeChecker) {
    // Find the AST node in the template at the position.
    const positionDetails = (0, template_target_1.getTargetAtPosition)(info.nodes, position);
    if (positionDetails === null) {
        return null;
    }
    const nodes = positionDetails.context.kind === template_target_1.TargetNodeKind.TwoWayBindingContext
        ? positionDetails.context.nodes
        : [positionDetails.context.node];
    const details = [];
    for (const node of nodes) {
        // Get the information about the TCB at the template position.
        const symbol = templateTypeChecker.getSymbolOfNode(node, info.declaration);
        if (symbol === null) {
            continue;
        }
        const templateTarget = node;
        switch (symbol.kind) {
            case api_1.SymbolKind.Directive:
            case api_1.SymbolKind.Template:
                // References to elements, templates, and directives will be through template references
                // (#ref). They shouldn't be used directly for a Language Service reference request.
                break;
            case api_1.SymbolKind.Element: {
                const matches = (0, utils_1.getDirectiveMatchesForElementTag)(symbol.templateNode, symbol.directives);
                details.push({
                    typescriptLocations: getPositionsForDirectives(matches),
                    templateTarget,
                    symbol,
                });
                break;
            }
            case api_1.SymbolKind.DomBinding: {
                // Dom bindings aren't currently type-checked (see `checkTypeOfDomBindings`) so they don't
                // have a shim location. This means we can't match dom bindings to their lib.dom
                // reference, but we can still see if they match to a directive.
                if (!(node instanceof compiler_1.TmplAstTextAttribute) && !(node instanceof compiler_1.TmplAstBoundAttribute)) {
                    return null;
                }
                const directives = (0, utils_1.getDirectiveMatchesForAttribute)(node.name, symbol.host.templateNode, symbol.host.directives);
                details.push({
                    typescriptLocations: getPositionsForDirectives(directives),
                    templateTarget,
                    symbol,
                });
                break;
            }
            case api_1.SymbolKind.Reference: {
                details.push({
                    typescriptLocations: [toFilePosition(symbol.referenceVarLocation)],
                    templateTarget,
                    symbol,
                });
                break;
            }
            case api_1.SymbolKind.Variable: {
                if (templateTarget instanceof compiler_1.TmplAstVariable) {
                    if (templateTarget.valueSpan !== undefined &&
                        (0, utils_1.isWithin)(position, templateTarget.valueSpan)) {
                        // In the valueSpan of the variable, we want to get the reference of the initializer.
                        details.push({
                            typescriptLocations: [toFilePosition(symbol.initializerLocation)],
                            templateTarget,
                            symbol,
                        });
                    }
                    else if ((0, utils_1.isWithin)(position, templateTarget.keySpan)) {
                        // In the keySpan of the variable, we want to get the reference of the local variable.
                        details.push({
                            typescriptLocations: [toFilePosition(symbol.localVarLocation)],
                            templateTarget,
                            symbol,
                        });
                    }
                }
                else {
                    // If the templateNode is not the `TmplAstVariable`, it must be a usage of the
                    // variable somewhere in the template.
                    details.push({
                        typescriptLocations: [toFilePosition(symbol.localVarLocation)],
                        templateTarget,
                        symbol,
                    });
                }
                break;
            }
            case api_1.SymbolKind.LetDeclaration:
                // If the templateNode isn't on a let declaration, it has to be on a usage of it
                // somewhere in the template. Otherwise only pick up when it's within the name.
                if (!(templateTarget instanceof compiler_1.TmplAstLetDeclaration) ||
                    (0, utils_1.isWithin)(position, templateTarget.nameSpan)) {
                    details.push({
                        typescriptLocations: [toFilePosition(symbol.localVarLocation)],
                        templateTarget,
                        symbol,
                    });
                }
                break;
            case api_1.SymbolKind.Input:
            case api_1.SymbolKind.Output: {
                details.push({
                    typescriptLocations: symbol.bindings.map((binding) => toFilePosition(binding.tcbLocation)),
                    templateTarget,
                    symbol,
                });
                break;
            }
            case api_1.SymbolKind.Pipe:
            case api_1.SymbolKind.Expression: {
                details.push({
                    typescriptLocations: [toFilePosition(symbol.tcbLocation)],
                    templateTarget,
                    symbol,
                });
                break;
            }
        }
    }
    return details.length > 0 ? details : null;
}
/**
 * Given a set of `DirectiveSymbol`s, finds the equivalent `FilePosition` of the class declaration.
 */
function getPositionsForDirectives(directives) {
    const allDirectives = [];
    for (const dir of directives.values()) {
        const dirClass = dir.tsSymbol.valueDeclaration;
        if (dirClass === undefined || !typescript_1.default.isClassDeclaration(dirClass) || dirClass.name === undefined) {
            continue;
        }
        const { fileName } = dirClass.getSourceFile();
        const position = dirClass.name.getStart();
        allDirectives.push({ fileName, position });
    }
    return allDirectives;
}
/**
 * Creates a "key" for a rename/reference location by concatenating file name, span start, and span
 * length. This allows us to de-duplicate template results when an item may appear several times
 * in the TCB but map back to the same template location.
 */
function createLocationKey(ds) {
    return ds.fileName + ds.textSpan.start + ds.textSpan.length;
}
/**
 * Converts a given `ts.DocumentSpan` in a shim file to its equivalent `ts.DocumentSpan` in the
 * template.
 *
 * You can optionally provide a `requiredNodeText` that ensures the equivalent template node's text
 * matches. If it does not, this function will return `null`.
 */
function convertToTemplateDocumentSpan(shimDocumentSpan, templateTypeChecker, program, requiredNodeText) {
    const sf = program.getSourceFile(shimDocumentSpan.fileName);
    if (sf === undefined) {
        return null;
    }
    const tcbNode = (0, ts_utils_1.findTightestNode)(sf, shimDocumentSpan.textSpan.start);
    if (tcbNode === undefined ||
        (0, comments_1.hasExpressionIdentifier)(sf, tcbNode, comments_1.ExpressionIdentifier.EVENT_PARAMETER)) {
        // If the reference result is the $event parameter in the subscribe/addEventListener
        // function in the TCB, we want to filter this result out of the references. We really only
        // want to return references to the parameter in the template itself.
        return null;
    }
    // Variables in the typecheck block are generated with the type on the right hand
    // side: `var _t1 = null! as i1.DirA`. Finding references of DirA will return the type
    // assertion and we need to map it back to the variable identifier _t1.
    if ((0, comments_1.hasExpressionIdentifier)(sf, tcbNode, comments_1.ExpressionIdentifier.VARIABLE_AS_EXPRESSION)) {
        let newNode = tcbNode;
        while (!typescript_1.default.isVariableDeclaration(newNode)) {
            newNode = newNode.parent;
        }
        newNode = newNode.name;
        shimDocumentSpan.textSpan = {
            start: newNode.getStart(),
            length: newNode.getEnd() - newNode.getStart(),
        };
    }
    // TODO(atscott): Determine how to consistently resolve paths. i.e. with the project
    // serverHost or LSParseConfigHost in the adapter. We should have a better defined way to
    // normalize paths.
    const mapping = (0, utils_1.getTemplateLocationFromTcbLocation)(templateTypeChecker, (0, file_system_1.absoluteFrom)(shimDocumentSpan.fileName), 
    /* tcbIsShim */ true, shimDocumentSpan.textSpan.start);
    if (mapping === null) {
        return null;
    }
    const { span, templateUrl } = mapping;
    if (requiredNodeText !== undefined && span.toString() !== requiredNodeText) {
        return null;
    }
    return Object.assign(Object.assign({}, shimDocumentSpan), { fileName: templateUrl, textSpan: (0, utils_1.toTextSpan)(span), 
        // Specifically clear other text span values because we do not have enough knowledge to
        // convert these to spans in the template.
        contextSpan: undefined, originalContextSpan: undefined, originalTextSpan: undefined });
}
/**
 * Finds the text and `ts.TextSpan` for the node at a position in a template.
 */
function getRenameTextAndSpanAtPosition(node, position) {
    if (node instanceof compiler_1.TmplAstBoundAttribute ||
        node instanceof compiler_1.TmplAstTextAttribute ||
        node instanceof compiler_1.TmplAstBoundEvent) {
        return node.keySpan === undefined ? null : { text: node.name, span: (0, utils_1.toTextSpan)(node.keySpan) };
    }
    else if (node instanceof compiler_1.TmplAstLetDeclaration && (0, utils_1.isWithin)(position, node.nameSpan)) {
        return { text: node.nameSpan.toString(), span: (0, utils_1.toTextSpan)(node.nameSpan) };
    }
    else if (node instanceof compiler_1.TmplAstVariable || node instanceof compiler_1.TmplAstReference) {
        if ((0, utils_1.isWithin)(position, node.keySpan)) {
            return { text: node.keySpan.toString(), span: (0, utils_1.toTextSpan)(node.keySpan) };
        }
        else if (node.valueSpan && (0, utils_1.isWithin)(position, node.valueSpan)) {
            return { text: node.valueSpan.toString(), span: (0, utils_1.toTextSpan)(node.valueSpan) };
        }
    }
    else if (node instanceof compiler_1.PropertyRead ||
        node instanceof compiler_1.PropertyWrite ||
        node instanceof compiler_1.SafePropertyRead ||
        node instanceof compiler_1.BindingPipe) {
        return { text: node.name, span: (0, utils_1.toTextSpan)(node.nameSpan) };
    }
    else if (node instanceof compiler_1.LiteralPrimitive) {
        const span = (0, utils_1.toTextSpan)(node.sourceSpan);
        const text = node.value;
        if (typeof text === 'string') {
            // The span of a string literal includes the quotes but they should be removed for renaming.
            span.start += 1;
            span.length -= 2;
        }
        return { text, span };
    }
    else if (node instanceof compiler_1.TmplAstElement) {
        return { text: node.name, span: (0, utils_1.toTextSpan)(node.startSourceSpan) };
    }
    return null;
}
/**
 * Retrieves the `PipeMeta` or `DirectiveMeta` of the given `ts.Node`'s parent class.
 *
 * Returns `null` if the node has no parent class or there is no meta associated with the class.
 */
function getParentClassMeta(requestNode, compiler) {
    const parentClass = (0, ts_utils_1.getParentClassDeclaration)(requestNode);
    if (parentClass === undefined) {
        return null;
    }
    return compiler.getMeta(parentClass);
}
