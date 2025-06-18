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
exports.UnusedImportsMigration = void 0;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../utils/tsurge");
const compiler_cli_1 = require("@angular/compiler-cli");
const api_1 = require("@angular/compiler-cli/src/ngtsc/core/api");
const migrations_1 = require("@angular/compiler-cli/private/migrations");
const apply_import_manager_1 = require("../../utils/tsurge/helpers/apply_import_manager");
/** Migration that cleans up unused imports from a project. */
class UnusedImportsMigration extends tsurge_1.TsurgeFunnelMigration {
    constructor() {
        super(...arguments);
        this.printer = typescript_1.default.createPrinter();
    }
    createProgram(tsconfigAbsPath, fs) {
        return super.createProgram(tsconfigAbsPath, fs, {
            extendedDiagnostics: {
                checks: {
                    // Ensure that the diagnostic is enabled.
                    unusedStandaloneImports: api_1.DiagnosticCategoryLabel.Warning,
                },
            },
        });
    }
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const nodePositions = new Map();
            const replacements = [];
            const removedIdentifiers = [];
            let changedFiles = 0;
            (_a = info.ngCompiler) === null || _a === void 0 ? void 0 : _a.getDiagnostics().forEach((diag) => {
                if (diag.file !== undefined &&
                    diag.start !== undefined &&
                    diag.length !== undefined &&
                    diag.code === (0, compiler_cli_1.ngErrorCode)(compiler_cli_1.ErrorCode.UNUSED_STANDALONE_IMPORTS)) {
                    if (!nodePositions.has(diag.file)) {
                        nodePositions.set(diag.file, new Set());
                    }
                    nodePositions.get(diag.file).add(this.getNodeID(diag.start, diag.length));
                }
            });
            nodePositions.forEach((locations, sourceFile) => {
                const resolvedLocations = this.resolveRemovalLocations(sourceFile, locations);
                const usageAnalysis = this.analyzeUsages(sourceFile, resolvedLocations);
                if (resolvedLocations.allRemovedIdentifiers.size > 0) {
                    changedFiles++;
                    resolvedLocations.allRemovedIdentifiers.forEach((identifier) => {
                        removedIdentifiers.push(this.getNodeID(identifier.getStart(), identifier.getWidth()));
                    });
                }
                this.generateReplacements(sourceFile, resolvedLocations, usageAnalysis, info, replacements);
            });
            return (0, tsurge_1.confirmAsSerializable)({ replacements, removedIdentifiers, changedFiles });
        });
    }
    migrate(globalData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, tsurge_1.confirmAsSerializable)(globalData);
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            const combinedReplacements = [];
            const combinedRemovedIdentifiers = [];
            const seenReplacements = new Set();
            const seenIdentifiers = new Set();
            const changedFileIds = new Set();
            [unitA, unitB].forEach((unit) => {
                for (const replacement of unit.replacements) {
                    const key = this.getReplacementID(replacement);
                    changedFileIds.add(replacement.projectFile.id);
                    if (!seenReplacements.has(key)) {
                        seenReplacements.add(key);
                        combinedReplacements.push(replacement);
                    }
                }
                for (const identifier of unit.removedIdentifiers) {
                    if (!seenIdentifiers.has(identifier)) {
                        seenIdentifiers.add(identifier);
                        combinedRemovedIdentifiers.push(identifier);
                    }
                }
            });
            return (0, tsurge_1.confirmAsSerializable)({
                replacements: combinedReplacements,
                removedIdentifiers: combinedRemovedIdentifiers,
                changedFiles: changedFileIds.size,
            });
        });
    }
    globalMeta(combinedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, tsurge_1.confirmAsSerializable)(combinedData);
        });
    }
    stats(globalMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                counters: {
                    removedImports: globalMetadata.removedIdentifiers.length,
                    changedFiles: globalMetadata.changedFiles,
                },
            };
        });
    }
    /** Gets an ID that can be used to look up a node based on its location. */
    getNodeID(start, length) {
        return `${start}/${length}`;
    }
    /** Gets a unique ID for a replacement. */
    getReplacementID(replacement) {
        const { position, end, toInsert } = replacement.update.data;
        return replacement.projectFile.id + '/' + position + '/' + end + '/' + toInsert;
    }
    /**
     * Resolves a set of node locations to the actual AST nodes that need to be migrated.
     * @param sourceFile File in which to resolve the locations.
     * @param locations Location keys that should be resolved.
     */
    resolveRemovalLocations(sourceFile, locations) {
        const result = {
            fullRemovals: new Set(),
            partialRemovals: new Map(),
            allRemovedIdentifiers: new Set(),
        };
        const walk = (node) => {
            if (!typescript_1.default.isIdentifier(node)) {
                node.forEachChild(walk);
                return;
            }
            // The TS typings don't reflect that the parent can be undefined.
            const parent = node.parent;
            if (!parent) {
                return;
            }
            if (locations.has(this.getNodeID(node.getStart(), node.getWidth()))) {
                // When the entire array needs to be cleared, the diagnostic is
                // reported on the property assignment, rather than an array element.
                if (typescript_1.default.isPropertyAssignment(parent) &&
                    parent.name === node &&
                    typescript_1.default.isArrayLiteralExpression(parent.initializer)) {
                    result.fullRemovals.add(parent.initializer);
                    parent.initializer.elements.forEach((element) => {
                        if (typescript_1.default.isIdentifier(element)) {
                            result.allRemovedIdentifiers.add(element);
                        }
                    });
                }
                else if (typescript_1.default.isArrayLiteralExpression(parent)) {
                    if (!result.partialRemovals.has(parent)) {
                        result.partialRemovals.set(parent, new Set());
                    }
                    result.partialRemovals.get(parent).add(node);
                    result.allRemovedIdentifiers.add(node);
                }
            }
        };
        walk(sourceFile);
        return result;
    }
    /**
     * Analyzes how identifiers are used across a file.
     * @param sourceFile File to be analyzed.
     * @param locations Locations that will be changed as a part of this migration.
     */
    analyzeUsages(sourceFile, locations) {
        const { partialRemovals, fullRemovals } = locations;
        const result = {
            importedSymbols: new Map(),
            identifierCounts: new Map(),
        };
        const walk = (node) => {
            var _a, _b;
            if (typescript_1.default.isIdentifier(node) &&
                node.parent &&
                // Don't track individual identifiers marked for removal.
                (!typescript_1.default.isArrayLiteralExpression(node.parent) ||
                    !partialRemovals.has(node.parent) ||
                    !partialRemovals.get(node.parent).has(node))) {
                result.identifierCounts.set(node.text, ((_a = result.identifierCounts.get(node.text)) !== null && _a !== void 0 ? _a : 0) + 1);
            }
            // Don't track identifiers in array literals that are about to be removed.
            if (typescript_1.default.isArrayLiteralExpression(node) && fullRemovals.has(node)) {
                return;
            }
            if (typescript_1.default.isImportDeclaration(node)) {
                const namedBindings = (_b = node.importClause) === null || _b === void 0 ? void 0 : _b.namedBindings;
                const moduleName = typescript_1.default.isStringLiteral(node.moduleSpecifier)
                    ? node.moduleSpecifier.text
                    : null;
                if (namedBindings && typescript_1.default.isNamedImports(namedBindings) && moduleName !== null) {
                    namedBindings.elements.forEach((imp) => {
                        if (!result.importedSymbols.has(moduleName)) {
                            result.importedSymbols.set(moduleName, new Map());
                        }
                        const symbolName = (imp.propertyName || imp.name).text;
                        const localName = imp.name.text;
                        result.importedSymbols.get(moduleName).set(localName, symbolName);
                    });
                }
                // Don't track identifiers in imports.
                return;
            }
            // Track identifiers in all other node kinds.
            node.forEachChild(walk);
        };
        walk(sourceFile);
        return result;
    }
    /**
     * Generates text replacements based on the data produced by the migration.
     * @param sourceFile File being migrated.
     * @param removalLocations Data about nodes being removed.
     * @param usages Data about identifier usage.
     * @param info Information about the current program.
     * @param replacements Array tracking all text replacements.
     */
    generateReplacements(sourceFile, removalLocations, usages, info, replacements) {
        const { fullRemovals, partialRemovals, allRemovedIdentifiers } = removalLocations;
        const { importedSymbols, identifierCounts } = usages;
        const importManager = new migrations_1.ImportManager();
        // Replace full arrays with empty ones. This allows preserves more of the user's formatting.
        fullRemovals.forEach((node) => {
            replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(sourceFile, info), new tsurge_1.TextUpdate({
                position: node.getStart(),
                end: node.getEnd(),
                toInsert: '[]',
            })));
        });
        // Filter out the unused identifiers from an array.
        partialRemovals.forEach((toRemove, node) => {
            const newNode = typescript_1.default.factory.updateArrayLiteralExpression(node, node.elements.filter((el) => !toRemove.has(el)));
            replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(sourceFile, info), new tsurge_1.TextUpdate({
                position: node.getStart(),
                end: node.getEnd(),
                toInsert: this.printer.printNode(typescript_1.default.EmitHint.Unspecified, newNode, sourceFile),
            })));
        });
        // Attempt to clean up unused import declarations. Note that this isn't foolproof, because we
        // do the matching based on identifier text, rather than going through the type checker which
        // can be expensive. This should be enough for the vast majority of cases in this schematic
        // since we're dealing exclusively with directive/pipe class names which tend to be very
        // specific. In the worst case we may end up not removing an import declaration which would
        // still be valid code that the user can clean up themselves.
        importedSymbols.forEach((names, moduleName) => {
            names.forEach((symbolName, localName) => {
                // Note that in the `identifierCounts` lookup both zero and undefined
                // are valid and mean that the identifiers isn't being used anymore.
                if (!identifierCounts.get(localName)) {
                    for (const identifier of allRemovedIdentifiers) {
                        if (identifier.text === localName) {
                            importManager.removeImport(sourceFile, symbolName, moduleName);
                            break;
                        }
                    }
                }
            });
        });
        (0, apply_import_manager_1.applyImportManagerChanges)(importManager, replacements, [sourceFile], info);
    }
}
exports.UnusedImportsMigration = UnusedImportsMigration;
