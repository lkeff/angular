"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameBuilder = exports.ReferencesBuilder = void 0;
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const metadata_1 = require("@angular/compiler-cli/src/ngtsc/metadata");
const perf_1 = require("@angular/compiler-cli/src/ngtsc/perf");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
const references_and_rename_utils_1 = require("./references_and_rename_utils");
const ts_utils_1 = require("./utils/ts_utils");
const utils_1 = require("./utils");
class ReferencesBuilder {
    constructor(tsLS, compiler) {
        this.tsLS = tsLS;
        this.compiler = compiler;
        this.ttc = this.compiler.getTemplateTypeChecker();
    }
    getReferencesAtPosition(filePath, position) {
        this.ttc.generateAllTypeCheckBlocks();
        const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(filePath, position, this.compiler);
        if (typeCheckInfo === undefined) {
            return this.getReferencesAtTypescriptPosition(filePath, position);
        }
        return this.getReferencesAtTemplatePosition(typeCheckInfo, position);
    }
    getReferencesAtTemplatePosition(typeCheckInfo, position) {
        const allTargetDetails = (0, references_and_rename_utils_1.getTargetDetailsAtTemplatePosition)(typeCheckInfo, position, this.ttc);
        if (allTargetDetails === null) {
            return undefined;
        }
        const allReferences = [];
        for (const targetDetails of allTargetDetails) {
            for (const location of targetDetails.typescriptLocations) {
                const refs = this.getReferencesAtTypescriptPosition(location.fileName, location.position);
                if (refs !== undefined) {
                    allReferences.push(...refs);
                }
            }
        }
        return allReferences.length > 0 ? allReferences : undefined;
    }
    getReferencesAtTypescriptPosition(fileName, position) {
        const refs = this.tsLS.getReferencesAtPosition(fileName, position);
        if (refs === undefined) {
            return undefined;
        }
        const entries = [];
        for (const ref of refs) {
            if (this.ttc.isTrackedTypeCheckFile((0, file_system_1.absoluteFrom)(ref.fileName))) {
                const entry = (0, references_and_rename_utils_1.convertToTemplateDocumentSpan)(ref, this.ttc, this.compiler.getCurrentProgram());
                if (entry !== null) {
                    entries.push(entry);
                }
            }
            else {
                entries.push(ref);
            }
        }
        return entries;
    }
}
exports.ReferencesBuilder = ReferencesBuilder;
var RequestKind;
(function (RequestKind) {
    RequestKind[RequestKind["DirectFromTemplate"] = 0] = "DirectFromTemplate";
    RequestKind[RequestKind["DirectFromTypeScript"] = 1] = "DirectFromTypeScript";
    RequestKind[RequestKind["PipeName"] = 2] = "PipeName";
    RequestKind[RequestKind["Selector"] = 3] = "Selector";
})(RequestKind || (RequestKind = {}));
function isDirectRenameContext(context) {
    return (context.type === RequestKind.DirectFromTemplate ||
        context.type === RequestKind.DirectFromTypeScript);
}
class RenameBuilder {
    constructor(tsLS, compiler) {
        this.tsLS = tsLS;
        this.compiler = compiler;
        this.ttc = this.compiler.getTemplateTypeChecker();
    }
    getRenameInfo(filePath, position) {
        return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.LsReferencesAndRenames, () => {
            const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(filePath, position, this.compiler);
            // We could not get a template at position so we assume the request came from outside the
            // template.
            if (typeCheckInfo === undefined) {
                const renameRequest = this.buildRenameRequestAtTypescriptPosition(filePath, position);
                if (renameRequest === null) {
                    return {
                        canRename: false,
                        localizedErrorMessage: 'Could not determine rename info at typescript position.',
                    };
                }
                if (renameRequest.type === RequestKind.PipeName) {
                    const pipeName = renameRequest.pipeNameExpr.text;
                    return {
                        canRename: true,
                        displayName: pipeName,
                        fullDisplayName: pipeName,
                        triggerSpan: {
                            length: pipeName.length,
                            // Offset the pipe name by 1 to account for start of string '/`/"
                            start: renameRequest.pipeNameExpr.getStart() + 1,
                        },
                    };
                }
                else {
                    // TODO(atscott): Add support for other special indirect renames from typescript files.
                    return this.tsLS.getRenameInfo(filePath, position);
                }
            }
            const allTargetDetails = (0, references_and_rename_utils_1.getTargetDetailsAtTemplatePosition)(typeCheckInfo, position, this.ttc);
            if (allTargetDetails === null) {
                return {
                    canRename: false,
                    localizedErrorMessage: 'Could not find template node at position.',
                };
            }
            const { templateTarget } = allTargetDetails[0];
            const templateTextAndSpan = (0, references_and_rename_utils_1.getRenameTextAndSpanAtPosition)(templateTarget, position);
            if (templateTextAndSpan === null) {
                return { canRename: false, localizedErrorMessage: 'Could not determine template node text.' };
            }
            const { text, span } = templateTextAndSpan;
            return {
                canRename: true,
                displayName: text,
                fullDisplayName: text,
                triggerSpan: span,
            };
        });
    }
    findRenameLocations(filePath, position) {
        this.ttc.generateAllTypeCheckBlocks();
        return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.LsReferencesAndRenames, () => {
            const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(filePath, position, this.compiler);
            // We could not get a template at position so we assume the request came from outside the
            // template.
            if (typeCheckInfo === undefined) {
                const renameRequest = this.buildRenameRequestAtTypescriptPosition(filePath, position);
                if (renameRequest === null) {
                    return null;
                }
                return this.findRenameLocationsAtTypescriptPosition(renameRequest);
            }
            return this.findRenameLocationsAtTemplatePosition(typeCheckInfo, position);
        });
    }
    findRenameLocationsAtTemplatePosition(typeCheckInfo, position) {
        const allTargetDetails = (0, references_and_rename_utils_1.getTargetDetailsAtTemplatePosition)(typeCheckInfo, position, this.ttc);
        if (allTargetDetails === null) {
            return null;
        }
        const renameRequests = this.buildRenameRequestsFromTemplateDetails(allTargetDetails, position);
        if (renameRequests === null) {
            return null;
        }
        const allRenameLocations = [];
        for (const renameRequest of renameRequests) {
            const locations = this.findRenameLocationsAtTypescriptPosition(renameRequest);
            // If we couldn't find rename locations for _any_ result, we should not allow renaming to
            // proceed instead of having a partially complete rename.
            if (locations === null) {
                return null;
            }
            allRenameLocations.push(...locations);
        }
        return allRenameLocations.length > 0 ? allRenameLocations : null;
    }
    findRenameLocationsAtTypescriptPosition(renameRequest) {
        return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.LsReferencesAndRenames, () => {
            const renameInfo = getExpectedRenameTextAndInitialRenameEntries(renameRequest);
            if (renameInfo === null) {
                return null;
            }
            const { entries, expectedRenameText } = renameInfo;
            const { fileName, position } = getRenameRequestPosition(renameRequest);
            const findInStrings = false;
            const findInComments = false;
            const locations = this.tsLS.findRenameLocations(fileName, position, findInStrings, findInComments);
            if (locations === undefined) {
                return null;
            }
            for (const location of locations) {
                if (this.ttc.isTrackedTypeCheckFile((0, file_system_1.absoluteFrom)(location.fileName))) {
                    const entry = (0, references_and_rename_utils_1.convertToTemplateDocumentSpan)(location, this.ttc, this.compiler.getCurrentProgram(), expectedRenameText);
                    // There is no template node whose text matches the original rename request. Bail on
                    // renaming completely rather than providing incomplete results.
                    if (entry === null) {
                        return null;
                    }
                    entries.push(entry);
                }
                else {
                    if (!isDirectRenameContext(renameRequest)) {
                        // Discard any non-template results for non-direct renames. We should only rename
                        // template results + the name/selector/alias `ts.Expression`. The other results
                        // will be the `ts.Identifier` of the transform method (pipe rename) or the
                        // directive class (selector rename).
                        continue;
                    }
                    // Ensure we only allow renaming a TS result with matching text
                    const refNode = this.getTsNodeAtPosition(location.fileName, location.textSpan.start);
                    if (refNode === null || refNode.getText() !== expectedRenameText) {
                        return null;
                    }
                    entries.push(location);
                }
            }
            return entries;
        });
    }
    getTsNodeAtPosition(filePath, position) {
        var _a;
        const sf = this.compiler.getCurrentProgram().getSourceFile(filePath);
        if (!sf) {
            return null;
        }
        return (_a = (0, ts_utils_1.findTightestNode)(sf, position)) !== null && _a !== void 0 ? _a : null;
    }
    buildRenameRequestsFromTemplateDetails(allTargetDetails, templatePosition) {
        const renameRequests = [];
        for (const targetDetails of allTargetDetails) {
            for (const location of targetDetails.typescriptLocations) {
                if (targetDetails.symbol.kind === api_1.SymbolKind.Pipe) {
                    const meta = this.compiler.getMeta(targetDetails.symbol.classSymbol.tsSymbol.valueDeclaration);
                    if (meta === null || meta.kind !== metadata_1.MetaKind.Pipe) {
                        return null;
                    }
                    const renameRequest = this.buildPipeRenameRequest(meta);
                    if (renameRequest === null) {
                        return null;
                    }
                    renameRequests.push(renameRequest);
                }
                else {
                    const renameRequest = {
                        type: RequestKind.DirectFromTemplate,
                        templatePosition,
                        requestNode: targetDetails.templateTarget,
                        renamePosition: location,
                    };
                    renameRequests.push(renameRequest);
                }
            }
        }
        return renameRequests;
    }
    buildRenameRequestAtTypescriptPosition(filePath, position) {
        const requestNode = this.getTsNodeAtPosition(filePath, position);
        if (requestNode === null) {
            return null;
        }
        const meta = (0, references_and_rename_utils_1.getParentClassMeta)(requestNode, this.compiler);
        if (meta !== null && meta.kind === metadata_1.MetaKind.Pipe && meta.nameExpr === requestNode) {
            return this.buildPipeRenameRequest(meta);
        }
        else {
            return { type: RequestKind.DirectFromTypeScript, requestNode };
        }
    }
    buildPipeRenameRequest(meta) {
        var _a;
        if (!typescript_1.default.isClassDeclaration(meta.ref.node) ||
            meta.nameExpr === null ||
            !typescript_1.default.isStringLiteral(meta.nameExpr)) {
            return null;
        }
        const typeChecker = this.compiler.getCurrentProgram().getTypeChecker();
        const memberMethods = (_a = (0, ts_utils_1.collectMemberMethods)(meta.ref.node, typeChecker)) !== null && _a !== void 0 ? _a : [];
        const pipeTransformNode = memberMethods.find((m) => m.name.getText() === 'transform');
        if (pipeTransformNode === undefined) {
            return null;
        }
        return {
            type: RequestKind.PipeName,
            pipeNameExpr: meta.nameExpr,
            renamePosition: {
                fileName: pipeTransformNode.getSourceFile().fileName,
                position: pipeTransformNode.getStart(),
            },
        };
    }
}
exports.RenameBuilder = RenameBuilder;
/**
 * From the provided `RenameRequest`, determines what text we should expect all produced
 * `ts.RenameLocation`s to have and creates an initial entry for indirect renames (one which is
 * required for the rename operation, but cannot be found by the native TS LS).
 */
function getExpectedRenameTextAndInitialRenameEntries(renameRequest) {
    let expectedRenameText;
    const entries = [];
    if (renameRequest.type === RequestKind.DirectFromTypeScript) {
        expectedRenameText = renameRequest.requestNode.getText();
    }
    else if (renameRequest.type === RequestKind.DirectFromTemplate) {
        const templateNodeText = (0, references_and_rename_utils_1.getRenameTextAndSpanAtPosition)(renameRequest.requestNode, renameRequest.templatePosition);
        if (templateNodeText === null) {
            return null;
        }
        expectedRenameText = templateNodeText.text;
    }
    else if (renameRequest.type === RequestKind.PipeName) {
        const { pipeNameExpr } = renameRequest;
        expectedRenameText = pipeNameExpr.text;
        const entry = {
            fileName: renameRequest.pipeNameExpr.getSourceFile().fileName,
            textSpan: { start: pipeNameExpr.getStart() + 1, length: pipeNameExpr.getText().length - 2 },
        };
        entries.push(entry);
    }
    else {
        // TODO(atscott): Implement other types of special renames
        return null;
    }
    return { entries, expectedRenameText };
}
/**
 * Given a `RenameRequest`, determines the `FilePosition` to use asking the native TS LS for rename
 * locations.
 */
function getRenameRequestPosition(renameRequest) {
    const fileName = renameRequest.type === RequestKind.DirectFromTypeScript
        ? renameRequest.requestNode.getSourceFile().fileName
        : renameRequest.renamePosition.fileName;
    const position = renameRequest.type === RequestKind.DirectFromTypeScript
        ? renameRequest.requestNode.getStart()
        : renameRequest.renamePosition.position;
    return { fileName, position };
}
