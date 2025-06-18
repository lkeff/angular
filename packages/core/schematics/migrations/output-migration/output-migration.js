"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputMigration = void 0;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../utils/tsurge");
const metadata_1 = require("@angular/compiler-cli/src/ngtsc/metadata");
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const migrations_1 = require("@angular/compiler-cli/private/migrations");
const output_helpers_1 = require("./output_helpers");
const output_replacements_1 = require("./output-replacements");
const reference_resolution_1 = require("../signal-migration/src/passes/reference_resolution");
const reference_kinds_1 = require("../signal-migration/src/passes/reference_resolution/reference_kinds");
class OutputMigration extends tsurge_1.TsurgeFunnelMigration {
    constructor(config = {}) {
        super();
        this.config = config;
    }
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const { sourceFiles, program } = info;
            const outputFieldReplacements = {};
            const problematicUsages = {};
            let problematicDeclarationCount = 0;
            const filesWithOutputDeclarations = new Set();
            const checker = program.getTypeChecker();
            const reflector = new reflection_1.TypeScriptReflectionHost(checker);
            const dtsReader = new metadata_1.DtsMetadataReader(checker, reflector);
            const evaluator = new migrations_1.PartialEvaluator(reflector, checker, null);
            const resourceLoader = (_b = (_a = info.ngCompiler) === null || _a === void 0 ? void 0 : _a['resourceManager']) !== null && _b !== void 0 ? _b : null;
            // Pre-analyze the program and get access to the template type checker.
            // If we are processing a non-Angular target, there is no template info.
            const { templateTypeChecker } = (_d = (_c = info.ngCompiler) === null || _c === void 0 ? void 0 : _c['ensureAnalyzed']()) !== null && _d !== void 0 ? _d : {
                templateTypeChecker: null,
            };
            const knownFields = {
                // Note: We don't support cross-target migration of `Partial<T>` usages.
                // This is an acceptable limitation for performance reasons.
                shouldTrackClassReference: () => false,
                attemptRetrieveDescriptorFromSymbol: (s) => {
                    const propDeclaration = (0, output_helpers_1.getTargetPropertyDeclaration)(s);
                    if (propDeclaration !== null) {
                        const classFieldID = (0, output_helpers_1.getUniqueIdForProperty)(info, propDeclaration);
                        if (classFieldID !== null) {
                            return {
                                node: propDeclaration,
                                key: classFieldID,
                            };
                        }
                    }
                    return null;
                },
            };
            let isTestFile = false;
            const outputMigrationVisitor = (node) => {
                var _a;
                // detect output declarations
                if (typescript_1.default.isPropertyDeclaration(node)) {
                    const outputDecorator = (0, output_helpers_1.getOutputDecorator)(node, reflector);
                    if (outputDecorator !== null) {
                        if ((0, output_helpers_1.isOutputDeclarationEligibleForMigration)(node)) {
                            const outputDef = {
                                id: (0, output_helpers_1.getUniqueIdForProperty)(info, node),
                                aliasParam: (_a = outputDecorator.args) === null || _a === void 0 ? void 0 : _a.at(0),
                            };
                            const outputFile = (0, tsurge_1.projectFile)(node.getSourceFile(), info);
                            if (this.config.shouldMigrate === undefined ||
                                this.config.shouldMigrate({
                                    key: outputDef.id,
                                    node: node,
                                }, outputFile)) {
                                const aliasParam = outputDef.aliasParam;
                                const aliasOptionValue = aliasParam ? evaluator.evaluate(aliasParam) : undefined;
                                if (aliasOptionValue == undefined || typeof aliasOptionValue === 'string') {
                                    filesWithOutputDeclarations.add(node.getSourceFile());
                                    addOutputReplacement(outputFieldReplacements, outputDef.id, outputFile, (0, output_replacements_1.calculateDeclarationReplacement)(info, node, aliasOptionValue === null || aliasOptionValue === void 0 ? void 0 : aliasOptionValue.toString()));
                                }
                                else {
                                    problematicUsages[outputDef.id] = true;
                                    problematicDeclarationCount++;
                                }
                            }
                        }
                        else {
                            problematicDeclarationCount++;
                        }
                    }
                }
                // detect .next usages that should be migrated to .emit
                if ((0, output_helpers_1.isPotentialNextCallUsage)(node) && typescript_1.default.isPropertyAccessExpression(node.expression)) {
                    const propertyDeclaration = (0, output_helpers_1.isTargetOutputDeclaration)(node.expression.expression, checker, reflector, dtsReader);
                    if (propertyDeclaration !== null) {
                        const id = (0, output_helpers_1.getUniqueIdForProperty)(info, propertyDeclaration);
                        const outputFile = (0, tsurge_1.projectFile)(node.getSourceFile(), info);
                        addOutputReplacement(outputFieldReplacements, id, outputFile, (0, output_replacements_1.calculateNextFnReplacement)(info, node.expression.name));
                    }
                }
                // detect .complete usages that should be removed
                if ((0, output_helpers_1.isPotentialCompleteCallUsage)(node) && typescript_1.default.isPropertyAccessExpression(node.expression)) {
                    const propertyDeclaration = (0, output_helpers_1.isTargetOutputDeclaration)(node.expression.expression, checker, reflector, dtsReader);
                    if (propertyDeclaration !== null) {
                        const id = (0, output_helpers_1.getUniqueIdForProperty)(info, propertyDeclaration);
                        const outputFile = (0, tsurge_1.projectFile)(node.getSourceFile(), info);
                        if (typescript_1.default.isExpressionStatement(node.parent)) {
                            addOutputReplacement(outputFieldReplacements, id, outputFile, (0, output_replacements_1.calculateCompleteCallReplacement)(info, node.parent));
                        }
                        else {
                            problematicUsages[id] = true;
                        }
                    }
                }
                addCommentForEmptyEmit(node, info, checker, reflector, dtsReader, outputFieldReplacements);
                // detect imports of test runners
                if ((0, output_helpers_1.isTestRunnerImport)(node)) {
                    isTestFile = true;
                }
                // detect unsafe access of the output property
                if ((0, output_helpers_1.isPotentialPipeCallUsage)(node) && typescript_1.default.isPropertyAccessExpression(node.expression)) {
                    const propertyDeclaration = (0, output_helpers_1.isTargetOutputDeclaration)(node.expression.expression, checker, reflector, dtsReader);
                    if (propertyDeclaration !== null) {
                        const id = (0, output_helpers_1.getUniqueIdForProperty)(info, propertyDeclaration);
                        if (isTestFile) {
                            const outputFile = (0, tsurge_1.projectFile)(node.getSourceFile(), info);
                            addOutputReplacement(outputFieldReplacements, id, outputFile, ...(0, output_replacements_1.calculatePipeCallReplacement)(info, node));
                        }
                        else {
                            problematicUsages[id] = true;
                        }
                    }
                }
                typescript_1.default.forEachChild(node, outputMigrationVisitor);
            };
            // calculate output migration replacements
            for (const sf of sourceFiles) {
                isTestFile = false;
                typescript_1.default.forEachChild(sf, outputMigrationVisitor);
            }
            // take care of the references in templates and host bindings
            const referenceResult = { references: [] };
            const { visitor: templateHostRefVisitor } = (0, reference_resolution_1.createFindAllSourceFileReferencesVisitor)(info, checker, reflector, resourceLoader, evaluator, templateTypeChecker, knownFields, null, // TODO: capture known output names as an optimization
            referenceResult);
            // calculate template / host binding replacements
            for (const sf of sourceFiles) {
                typescript_1.default.forEachChild(sf, templateHostRefVisitor);
            }
            for (const ref of referenceResult.references) {
                // detect .next usages that should be migrated to .emit in template and host binding expressions
                if (ref.kind === reference_kinds_1.ReferenceKind.InTemplate) {
                    const callExpr = (0, output_helpers_1.checkNonTsReferenceCallsField)(ref, 'next');
                    // TODO: here and below for host bindings, we should ideally filter in the global meta stage
                    // (instead of using the `outputFieldReplacements` map)
                    //  as technically, the call expression could refer to an output
                    //  from a whole different compilation unit (e.g. tsconfig.json).
                    if (callExpr !== null && outputFieldReplacements[ref.target.key] !== undefined) {
                        addOutputReplacement(outputFieldReplacements, ref.target.key, ref.from.templateFile, (0, output_replacements_1.calculateNextFnReplacementInTemplate)(ref.from.templateFile, callExpr.nameSpan));
                    }
                }
                else if (ref.kind === reference_kinds_1.ReferenceKind.InHostBinding) {
                    const callExpr = (0, output_helpers_1.checkNonTsReferenceCallsField)(ref, 'next');
                    if (callExpr !== null && outputFieldReplacements[ref.target.key] !== undefined) {
                        addOutputReplacement(outputFieldReplacements, ref.target.key, ref.from.file, (0, output_replacements_1.calculateNextFnReplacementInHostBinding)(ref.from.file, ref.from.hostPropertyNode.getStart() + 1, callExpr.nameSpan));
                    }
                }
            }
            // calculate import replacements but do so only for files that have output declarations
            const importReplacements = (0, output_replacements_1.calculateImportReplacements)(info, filesWithOutputDeclarations);
            return (0, tsurge_1.confirmAsSerializable)({
                problematicDeclarationCount,
                outputFields: outputFieldReplacements,
                importReplacements,
                problematicUsages,
            });
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputFields = {};
            const importReplacements = {};
            const problematicUsages = {};
            let problematicDeclarationCount = 0;
            for (const unit of [unitA, unitB]) {
                for (const declIdStr of Object.keys(unit.outputFields)) {
                    const declId = declIdStr;
                    // THINK: detect clash? Should we have an utility to merge data based on unique IDs?
                    outputFields[declId] = unit.outputFields[declId];
                }
                for (const fileIDStr of Object.keys(unit.importReplacements)) {
                    const fileID = fileIDStr;
                    importReplacements[fileID] = unit.importReplacements[fileID];
                }
                problematicDeclarationCount += unit.problematicDeclarationCount;
            }
            for (const unit of [unitA, unitB]) {
                for (const declIdStr of Object.keys(unit.problematicUsages)) {
                    const declId = declIdStr;
                    problematicUsages[declId] = unit.problematicUsages[declId];
                }
            }
            return (0, tsurge_1.confirmAsSerializable)({
                problematicDeclarationCount,
                outputFields,
                importReplacements,
                problematicUsages,
            });
        });
    }
    globalMeta(combinedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalMeta = {
                importReplacements: combinedData.importReplacements,
                outputFields: combinedData.outputFields,
                problematicDeclarationCount: combinedData.problematicDeclarationCount,
                problematicUsages: {},
            };
            for (const keyStr of Object.keys(combinedData.problematicUsages)) {
                const key = keyStr;
                // it might happen that a problematic usage is detected but we didn't see the declaration - skipping those
                if (globalMeta.outputFields[key] !== undefined) {
                    globalMeta.problematicUsages[key] = true;
                }
            }
            // Noop here as we don't have any form of special global metadata.
            return (0, tsurge_1.confirmAsSerializable)(combinedData);
        });
    }
    stats(globalMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const detectedOutputs = new Set(Object.keys(globalMetadata.outputFields)).size +
                globalMetadata.problematicDeclarationCount;
            const problematicOutputs = new Set(Object.keys(globalMetadata.problematicUsages)).size +
                globalMetadata.problematicDeclarationCount;
            const successRate = detectedOutputs > 0 ? (detectedOutputs - problematicOutputs) / detectedOutputs : 1;
            return {
                counters: {
                    detectedOutputs,
                    problematicOutputs,
                    successRate,
                },
            };
        });
    }
    migrate(globalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const migratedFiles = new Set();
            const problematicFiles = new Set();
            const replacements = [];
            for (const declIdStr of Object.keys(globalData.outputFields)) {
                const declId = declIdStr;
                const outputField = globalData.outputFields[declId];
                if (!globalData.problematicUsages[declId]) {
                    replacements.push(...outputField.replacements);
                    migratedFiles.add(outputField.file.id);
                }
                else {
                    problematicFiles.add(outputField.file.id);
                }
            }
            for (const fileIDStr of Object.keys(globalData.importReplacements)) {
                const fileID = fileIDStr;
                if (migratedFiles.has(fileID)) {
                    const importReplacements = globalData.importReplacements[fileID];
                    if (problematicFiles.has(fileID)) {
                        replacements.push(...importReplacements.add);
                    }
                    else {
                        replacements.push(...importReplacements.addAndRemove);
                    }
                }
            }
            return { replacements };
        });
    }
}
exports.OutputMigration = OutputMigration;
function addOutputReplacement(outputFieldReplacements, outputId, file, ...replacements) {
    let existingReplacements = outputFieldReplacements[outputId];
    if (existingReplacements === undefined) {
        outputFieldReplacements[outputId] = existingReplacements = {
            file: file,
            replacements: [],
        };
    }
    existingReplacements.replacements.push(...replacements);
}
function addCommentForEmptyEmit(node, info, checker, reflector, dtsReader, outputFieldReplacements) {
    var _a;
    if (!isEmptyEmitCall(node))
        return;
    const propertyAccess = getPropertyAccess(node);
    if (!propertyAccess)
        return;
    const symbol = checker.getSymbolAtLocation(propertyAccess.name);
    if (!symbol || !((_a = symbol.declarations) === null || _a === void 0 ? void 0 : _a.length))
        return;
    const propertyDeclaration = (0, output_helpers_1.isTargetOutputDeclaration)(propertyAccess, checker, reflector, dtsReader);
    if (!propertyDeclaration)
        return;
    const eventEmitterType = getEventEmitterArgumentType(propertyDeclaration);
    if (!eventEmitterType)
        return;
    const id = (0, output_helpers_1.getUniqueIdForProperty)(info, propertyDeclaration);
    const file = (0, tsurge_1.projectFile)(node.getSourceFile(), info);
    const formatter = getFormatterText(node);
    const todoReplacement = new tsurge_1.TextUpdate({
        toInsert: `${formatter.indent}// TODO: The 'emit' function requires a mandatory ${eventEmitterType} argument\n`,
        end: formatter.lineStartPos,
        position: formatter.lineStartPos,
    });
    addOutputReplacement(outputFieldReplacements, id, file, new tsurge_1.Replacement(file, todoReplacement));
}
function isEmptyEmitCall(node) {
    return (typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === 'emit' &&
        node.arguments.length === 0);
}
function getPropertyAccess(node) {
    const propertyAccessExpression = node.expression.expression;
    return typescript_1.default.isPropertyAccessExpression(propertyAccessExpression) ? propertyAccessExpression : null;
}
function getEventEmitterArgumentType(propertyDeclaration) {
    var _a;
    const initializer = propertyDeclaration.initializer;
    if (!initializer || !typescript_1.default.isNewExpression(initializer))
        return null;
    const isEventEmitter = typescript_1.default.isIdentifier(initializer.expression) && initializer.expression.getText() === 'EventEmitter';
    if (!isEventEmitter)
        return null;
    const [typeArg] = (_a = initializer.typeArguments) !== null && _a !== void 0 ? _a : [];
    return typeArg ? typeArg.getText() : null;
}
function getFormatterText(node) {
    const sourceFile = node.getSourceFile();
    const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    const lineStartPos = sourceFile.getPositionOfLineAndCharacter(line, 0);
    const indent = sourceFile.text.slice(lineStartPos, node.getStart());
    return { indent, lineStartPos };
}
