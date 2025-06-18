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
exports.SignalQueriesMigration = void 0;
const migrations_1 = require("@angular/compiler-cli/private/migrations");
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../utils/tsurge");
const apply_import_manager_1 = require("../../utils/tsurge/helpers/apply_import_manager");
const src_1 = require("../signal-migration/src");
const common_incompatible_patterns_1 = require("../signal-migration/src/passes/problematic_patterns/common_incompatible_patterns");
const migrate_host_bindings_1 = require("../signal-migration/src/passes/reference_migration/migrate_host_bindings");
const migrate_template_references_1 = require("../signal-migration/src/passes/reference_migration/migrate_template_references");
const migrate_ts_references_1 = require("../signal-migration/src/passes/reference_migration/migrate_ts_references");
const migrate_ts_type_references_1 = require("../signal-migration/src/passes/reference_migration/migrate_ts_type_references");
const reference_resolution_1 = require("../signal-migration/src/passes/reference_resolution");
const reference_kinds_1 = require("../signal-migration/src/passes/reference_resolution/reference_kinds");
const grouped_ts_ast_visitor_1 = require("../signal-migration/src/utils/grouped_ts_ast_visitor");
const inheritance_graph_1 = require("../signal-migration/src/utils/inheritance_graph");
const convert_query_property_1 = require("./convert_query_property");
const field_tracking_1 = require("./field_tracking");
const identify_queries_1 = require("./identify_queries");
const known_queries_1 = require("./known_queries");
const query_api_names_1 = require("./query_api_names");
const fn_to_array_removal_1 = require("./fn_to_array_removal");
const fn_get_replacement_1 = require("./fn_get_replacement");
const incompatible_query_list_fns_1 = require("./incompatible_query_list_fns");
const fn_first_last_replacement_1 = require("./fn_first_last_replacement");
const incompatibility_1 = require("./incompatibility");
const incompatibility_todos_1 = require("../signal-migration/src/passes/problematic_patterns/incompatibility_todos");
const check_inheritance_1 = require("../signal-migration/src/passes/problematic_patterns/check_inheritance");
class SignalQueriesMigration extends tsurge_1.TsurgeComplexMigration {
    constructor(config = {}) {
        super();
        this.config = config;
    }
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            // Pre-Analyze the program and get access to the template type checker.
            const { templateTypeChecker } = (_b = (_a = info.ngCompiler) === null || _a === void 0 ? void 0 : _a['ensureAnalyzed']()) !== null && _b !== void 0 ? _b : {
                templateTypeChecker: null,
            };
            const resourceLoader = (_d = (_c = info.ngCompiler) === null || _c === void 0 ? void 0 : _c['resourceManager']) !== null && _d !== void 0 ? _d : null;
            // Generate all type check blocks, if we have Angular template information.
            if (templateTypeChecker !== null) {
                templateTypeChecker.generateAllTypeCheckBlocks();
            }
            const { sourceFiles, program } = info;
            const checker = program.getTypeChecker();
            const reflector = new reflection_1.TypeScriptReflectionHost(checker);
            const evaluator = new migrations_1.PartialEvaluator(reflector, checker, null);
            const res = {
                knownQueryFields: {},
                potentialProblematicQueries: {},
                potentialProblematicReferenceForMultiQueries: {},
                reusableAnalysisReferences: null,
            };
            const groupedAstVisitor = new grouped_ts_ast_visitor_1.GroupedTsAstVisitor(sourceFiles);
            const referenceResult = { references: [] };
            const classesWithFilteredQueries = new Set();
            const filteredQueriesForCompilationUnit = new Map();
            const findQueryDefinitionsVisitor = (node) => {
                const extractedQuery = (0, identify_queries_1.extractSourceQueryDefinition)(node, reflector, evaluator, info);
                if (extractedQuery !== null) {
                    const queryNode = extractedQuery.node;
                    const descriptor = {
                        key: extractedQuery.id,
                        node: queryNode,
                    };
                    const containingFile = (0, tsurge_1.projectFile)(queryNode.getSourceFile(), info);
                    // If we have a config filter function, use it here for later
                    // perf-boosted reference lookups. Useful in non-batch mode.
                    if (this.config.shouldMigrateQuery === undefined ||
                        this.config.shouldMigrateQuery(descriptor, containingFile)) {
                        classesWithFilteredQueries.add(queryNode.parent);
                        filteredQueriesForCompilationUnit.set(extractedQuery.id, {
                            fieldName: extractedQuery.queryInfo.propertyName,
                        });
                    }
                    res.knownQueryFields[extractedQuery.id] = {
                        fieldName: extractedQuery.queryInfo.propertyName,
                        isMulti: extractedQuery.queryInfo.first === false,
                    };
                    if (typescript_1.default.isAccessor(queryNode)) {
                        (0, incompatibility_1.markFieldIncompatibleInMetadata)(res.potentialProblematicQueries, extractedQuery.id, src_1.FieldIncompatibilityReason.Accessor);
                    }
                    // Detect queries with union types that are uncommon to be
                    // automatically migrate-able. E.g. `refs: ElementRef|null`,
                    // or `ElementRef|SomeOtherType`.
                    if (queryNode.type !== undefined &&
                        typescript_1.default.isUnionTypeNode(queryNode.type) &&
                        // Either too large union, or doesn't match `T|undefined`.
                        (queryNode.type.types.length > 2 ||
                            !queryNode.type.types.some((t) => t.kind === typescript_1.default.SyntaxKind.UndefinedKeyword))) {
                        (0, incompatibility_1.markFieldIncompatibleInMetadata)(res.potentialProblematicQueries, extractedQuery.id, src_1.FieldIncompatibilityReason.SignalQueries__IncompatibleMultiUnionType);
                    }
                    // Migrating fields with `@HostBinding` is incompatible as
                    // the host binding decorator does not invoke the signal.
                    const hostBindingDecorators = (0, annotations_1.getAngularDecorators)(extractedQuery.fieldDecorators, ['HostBinding'], 
                    /* isCore */ false);
                    if (hostBindingDecorators.length > 0) {
                        (0, incompatibility_1.markFieldIncompatibleInMetadata)(res.potentialProblematicQueries, extractedQuery.id, src_1.FieldIncompatibilityReason.SignalIncompatibleWithHostBinding);
                    }
                }
            };
            (_f = (_e = this.config).reportProgressFn) === null || _f === void 0 ? void 0 : _f.call(_e, 20, 'Scanning for queries..');
            groupedAstVisitor.register(findQueryDefinitionsVisitor);
            groupedAstVisitor.execute();
            const allFieldsOrKnownQueries = {
                // Note: We don't support cross-target migration of `Partial<T>` usages.
                // This is an acceptable limitation for performance reasons.
                shouldTrackClassReference: (node) => classesWithFilteredQueries.has(node),
                attemptRetrieveDescriptorFromSymbol: (s) => {
                    const descriptor = (0, field_tracking_1.getClassFieldDescriptorForSymbol)(s, info);
                    // If we are executing in upgraded analysis phase mode, we know all
                    // of the queries since there aren't any other compilation units.
                    // Ignore references to non-query class fields.
                    if (this.config.assumeNonBatch &&
                        (descriptor === null || !filteredQueriesForCompilationUnit.has(descriptor.key))) {
                        return null;
                    }
                    // In batch mode, we eagerly, rather expensively, track all references.
                    // We don't know yet if something refers to a different query or not, so we
                    // eagerly detect such and later filter those problematic references that
                    // turned out to refer to queries (once we have the global metadata).
                    return descriptor;
                },
            };
            groupedAstVisitor.register((0, reference_resolution_1.createFindAllSourceFileReferencesVisitor)(info, checker, reflector, resourceLoader, evaluator, templateTypeChecker, allFieldsOrKnownQueries, 
            // In non-batch mode, we know what inputs exist and can optimize the reference
            // resolution significantly (for e.g. VSCode integration)— as we know what
            // field names may be used to reference potential queries.
            this.config.assumeNonBatch
                ? new Set(Array.from(filteredQueriesForCompilationUnit.values()).map((f) => f.fieldName))
                : null, referenceResult).visitor);
            const inheritanceGraph = new inheritance_graph_1.InheritanceGraph(checker).expensivePopulate(info.sourceFiles);
            (0, common_incompatible_patterns_1.checkIncompatiblePatterns)(inheritanceGraph, checker, groupedAstVisitor, Object.assign(Object.assign({}, allFieldsOrKnownQueries), { isFieldIncompatible: (f) => {
                    var _a, _b;
                    return ((_a = res.potentialProblematicQueries[f.key]) === null || _a === void 0 ? void 0 : _a.fieldReason) !== null ||
                        ((_b = res.potentialProblematicQueries[f.key]) === null || _b === void 0 ? void 0 : _b.classReason) !== null;
                }, markClassIncompatible: (clazz, reason) => {
                    var _a;
                    var _b;
                    for (const field of clazz.members) {
                        const key = (0, field_tracking_1.getUniqueIDForClassProperty)(field, info);
                        if (key !== null) {
                            (_a = (_b = res.potentialProblematicQueries)[key]) !== null && _a !== void 0 ? _a : (_b[key] = { classReason: null, fieldReason: null });
                            res.potentialProblematicQueries[key].classReason = reason;
                        }
                    }
                }, markFieldIncompatible: (f, incompatibility) => (0, incompatibility_1.markFieldIncompatibleInMetadata)(res.potentialProblematicQueries, f.key, incompatibility.reason) }), () => Array.from(classesWithFilteredQueries));
            (_h = (_g = this.config).reportProgressFn) === null || _h === void 0 ? void 0 : _h.call(_g, 60, 'Scanning for references and problematic patterns..');
            groupedAstVisitor.execute();
            // Determine incompatible queries based on problematic references
            // we saw in TS code, templates or host bindings.
            for (const ref of referenceResult.references) {
                if ((0, reference_kinds_1.isTsReference)(ref) && ref.from.isWrite) {
                    (0, incompatibility_1.markFieldIncompatibleInMetadata)(res.potentialProblematicQueries, ref.target.key, src_1.FieldIncompatibilityReason.WriteAssignment);
                }
                if (((0, reference_kinds_1.isTemplateReference)(ref) || (0, reference_kinds_1.isHostBindingReference)(ref)) && ref.from.isWrite) {
                    (0, incompatibility_1.markFieldIncompatibleInMetadata)(res.potentialProblematicQueries, ref.target.key, src_1.FieldIncompatibilityReason.WriteAssignment);
                }
                // TODO: Remove this when we support signal narrowing in templates.
                // https://github.com/angular/angular/pull/55456.
                if ((0, reference_kinds_1.isTemplateReference)(ref) && ref.from.isLikelyPartOfNarrowing) {
                    (0, incompatibility_1.markFieldIncompatibleInMetadata)(res.potentialProblematicQueries, ref.target.key, src_1.FieldIncompatibilityReason.PotentiallyNarrowedInTemplateButNoSupportYet);
                }
                // Check for other incompatible query list accesses.
                (0, incompatible_query_list_fns_1.checkForIncompatibleQueryListAccesses)(ref, res);
            }
            if (this.config.assumeNonBatch) {
                res.reusableAnalysisReferences = referenceResult.references;
            }
            return (0, tsurge_1.confirmAsSerializable)(res);
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            var _c, _d;
            const combined = {
                knownQueryFields: {},
                potentialProblematicQueries: {},
                potentialProblematicReferenceForMultiQueries: {},
                reusableAnalysisReferences: null,
            };
            for (const unit of [unitA, unitB]) {
                for (const [id, value] of Object.entries(unit.knownQueryFields)) {
                    combined.knownQueryFields[id] = value;
                }
                for (const [id, info] of Object.entries(unit.potentialProblematicQueries)) {
                    if (info.fieldReason !== null) {
                        (0, incompatibility_1.markFieldIncompatibleInMetadata)(combined.potentialProblematicQueries, id, info.fieldReason);
                    }
                    if (info.classReason !== null) {
                        (_a = (_c = combined.potentialProblematicQueries)[_d = id]) !== null && _a !== void 0 ? _a : (_c[_d] = {
                            classReason: null,
                            fieldReason: null,
                        });
                        combined.potentialProblematicQueries[id].classReason =
                            info.classReason;
                    }
                }
                for (const id of Object.keys(unit.potentialProblematicReferenceForMultiQueries)) {
                    combined.potentialProblematicReferenceForMultiQueries[id] = true;
                }
                if (unit.reusableAnalysisReferences !== null) {
                    combined.reusableAnalysisReferences = unit.reusableAnalysisReferences;
                }
            }
            for (const unit of [unitA, unitB]) {
                for (const id of Object.keys(unit.potentialProblematicReferenceForMultiQueries)) {
                    if ((_b = combined.knownQueryFields[id]) === null || _b === void 0 ? void 0 : _b.isMulti) {
                        (0, incompatibility_1.markFieldIncompatibleInMetadata)(combined.potentialProblematicQueries, id, src_1.FieldIncompatibilityReason.SignalQueries__QueryListProblematicFieldAccessed);
                    }
                }
            }
            return (0, tsurge_1.confirmAsSerializable)(combined);
        });
    }
    globalMeta(combinedData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const globalUnitData = {
                knownQueryFields: combinedData.knownQueryFields,
                problematicQueries: combinedData.potentialProblematicQueries,
                reusableAnalysisReferences: combinedData.reusableAnalysisReferences,
            };
            for (const id of Object.keys(combinedData.potentialProblematicReferenceForMultiQueries)) {
                if ((_a = combinedData.knownQueryFields[id]) === null || _a === void 0 ? void 0 : _a.isMulti) {
                    (0, incompatibility_1.markFieldIncompatibleInMetadata)(globalUnitData.problematicQueries, id, src_1.FieldIncompatibilityReason.SignalQueries__QueryListProblematicFieldAccessed);
                }
            }
            return (0, tsurge_1.confirmAsSerializable)(globalUnitData);
        });
    }
    migrate(globalMetadata, info) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            // Pre-Analyze the program and get access to the template type checker.
            const { templateTypeChecker, metaReader } = (_b = (_a = info.ngCompiler) === null || _a === void 0 ? void 0 : _a['ensureAnalyzed']()) !== null && _b !== void 0 ? _b : {
                templateTypeChecker: null,
                metaReader: null,
            };
            const resourceLoader = (_d = (_c = info.ngCompiler) === null || _c === void 0 ? void 0 : _c['resourceManager']) !== null && _d !== void 0 ? _d : null;
            const { program, sourceFiles } = info;
            const checker = program.getTypeChecker();
            const reflector = new reflection_1.TypeScriptReflectionHost(checker);
            const evaluator = new migrations_1.PartialEvaluator(reflector, checker, null);
            const replacements = [];
            const importManager = new migrations_1.ImportManager();
            const printer = typescript_1.default.createPrinter();
            const filesWithSourceQueries = new Map();
            const filesWithIncompleteMigration = new Map();
            const filesWithQueryListOutsideOfDeclarations = new WeakSet();
            const knownQueries = new known_queries_1.KnownQueries(info, this.config, globalMetadata);
            const referenceResult = { references: [] };
            const sourceQueries = [];
            // Detect all queries in this unit.
            const queryWholeProgramVisitor = (node) => {
                // Detect all SOURCE queries and migrate them, if possible.
                const extractedQuery = (0, identify_queries_1.extractSourceQueryDefinition)(node, reflector, evaluator, info);
                if (extractedQuery !== null) {
                    knownQueries.registerQueryField(extractedQuery.node, extractedQuery.id);
                    sourceQueries.push(extractedQuery);
                    return;
                }
                // Detect OTHER queries, inside `.d.ts`. Needed for reference resolution below.
                if (typescript_1.default.isPropertyDeclaration(node) ||
                    (typescript_1.default.isAccessor(node) && typescript_1.default.isClassDeclaration(node.parent))) {
                    const classFieldID = (0, field_tracking_1.getUniqueIDForClassProperty)(node, info);
                    if (classFieldID !== null && globalMetadata.knownQueryFields[classFieldID] !== undefined) {
                        knownQueries.registerQueryField(node, classFieldID);
                        return;
                    }
                }
                // Detect potential usages of `QueryList` outside of queries or imports.
                // Those prevent us from removing the import later.
                if (typescript_1.default.isIdentifier(node) &&
                    node.text === 'QueryList' &&
                    typescript_1.default.findAncestor(node, typescript_1.default.isImportDeclaration) === undefined) {
                    filesWithQueryListOutsideOfDeclarations.add(node.getSourceFile());
                }
                typescript_1.default.forEachChild(node, queryWholeProgramVisitor);
            };
            for (const sf of info.fullProgramSourceFiles) {
                typescript_1.default.forEachChild(sf, queryWholeProgramVisitor);
            }
            // Set of all queries in the program. Useful for speeding up reference
            // lookups below.
            const fieldNamesToConsiderForReferenceLookup = new Set(Object.values(globalMetadata.knownQueryFields).map((f) => f.fieldName));
            // Find all references.
            const groupedAstVisitor = new grouped_ts_ast_visitor_1.GroupedTsAstVisitor(sourceFiles);
            // Re-use previous reference result if available, instead of
            // looking for references which is quite expensive.
            if (globalMetadata.reusableAnalysisReferences !== null) {
                referenceResult.references = globalMetadata.reusableAnalysisReferences;
            }
            else {
                groupedAstVisitor.register((0, reference_resolution_1.createFindAllSourceFileReferencesVisitor)(info, checker, reflector, resourceLoader, evaluator, templateTypeChecker, knownQueries, fieldNamesToConsiderForReferenceLookup, referenceResult).visitor);
            }
            // Check inheritance.
            // NOTE: Inheritance is only checked in the migrate stage as we cannot reliably
            // check during analyze— where we don't know what fields from foreign `.d.ts`
            // files refer to queries or not.
            const inheritanceGraph = new inheritance_graph_1.InheritanceGraph(checker).expensivePopulate(info.sourceFiles);
            (0, check_inheritance_1.checkInheritanceOfKnownFields)(inheritanceGraph, metaReader, knownQueries, {
                getFieldsForClass: (n) => { var _a; return (_a = knownQueries.getQueryFieldsOfClass(n)) !== null && _a !== void 0 ? _a : []; },
                isClassWithKnownFields: (clazz) => knownQueries.getQueryFieldsOfClass(clazz) !== undefined,
            });
            (_f = (_e = this.config).reportProgressFn) === null || _f === void 0 ? void 0 : _f.call(_e, 80, 'Checking inheritance..');
            groupedAstVisitor.execute();
            if (this.config.bestEffortMode) {
                (0, incompatibility_1.filterBestEffortIncompatibilities)(knownQueries);
            }
            (_h = (_g = this.config).reportProgressFn) === null || _h === void 0 ? void 0 : _h.call(_g, 90, 'Migrating queries..');
            // Migrate declarations.
            for (const extractedQuery of sourceQueries) {
                const node = extractedQuery.node;
                const sf = node.getSourceFile();
                const descriptor = { key: extractedQuery.id, node: extractedQuery.node };
                const incompatibility = knownQueries.getIncompatibilityForField(descriptor);
                updateFileState(filesWithSourceQueries, sf, extractedQuery.kind);
                if (incompatibility !== null) {
                    // Add a TODO for the incompatible query, if desired.
                    if (this.config.insertTodosForSkippedFields) {
                        replacements.push(...(0, incompatibility_todos_1.insertTodoForIncompatibility)(node, info, incompatibility, {
                            single: 'query',
                            plural: 'queries',
                        }));
                    }
                    updateFileState(filesWithIncompleteMigration, sf, extractedQuery.kind);
                    continue;
                }
                replacements.push(...(0, convert_query_property_1.computeReplacementsToMigrateQuery)(node, extractedQuery, importManager, info, printer, info.userOptions, checker));
            }
            // Migrate references.
            const referenceMigrationHost = {
                printer,
                replacements,
                shouldMigrateReferencesToField: (field) => !knownQueries.isFieldIncompatible(field),
                shouldMigrateReferencesToClass: (clazz) => {
                    var _a;
                    return !!((_a = knownQueries
                        .getQueryFieldsOfClass(clazz)) === null || _a === void 0 ? void 0 : _a.some((q) => !knownQueries.isFieldIncompatible(q)));
                },
            };
            (0, migrate_ts_references_1.migrateTypeScriptReferences)(referenceMigrationHost, referenceResult.references, checker, info);
            (0, migrate_template_references_1.migrateTemplateReferences)(referenceMigrationHost, referenceResult.references);
            (0, migrate_host_bindings_1.migrateHostBindings)(referenceMigrationHost, referenceResult.references, info);
            (0, migrate_ts_type_references_1.migrateTypeScriptTypeReferences)(referenceMigrationHost, referenceResult.references, importManager, info);
            // Fix problematic calls, like `QueryList#toArray`, or `QueryList#get`.
            for (const ref of referenceResult.references) {
                (0, fn_to_array_removal_1.removeQueryListToArrayCall)(ref, info, globalMetadata, knownQueries, replacements);
                (0, fn_get_replacement_1.replaceQueryListGetCall)(ref, info, globalMetadata, knownQueries, replacements);
                (0, fn_first_last_replacement_1.replaceQueryListFirstAndLastReferences)(ref, info, globalMetadata, knownQueries, replacements);
            }
            // Remove imports if possible.
            for (const [file, types] of filesWithSourceQueries) {
                let seenIncompatibleMultiQuery = false;
                for (const type of types) {
                    const incompatibleQueryTypesForFile = filesWithIncompleteMigration.get(file);
                    // Query type is fully migrated. No incompatible queries in file.
                    if (!(incompatibleQueryTypesForFile === null || incompatibleQueryTypesForFile === void 0 ? void 0 : incompatibleQueryTypesForFile.has(type))) {
                        importManager.removeImport(file, (0, query_api_names_1.queryFunctionNameToDecorator)(type), '@angular/core');
                    }
                    else if (type === 'viewChildren' || type === 'contentChildren') {
                        seenIncompatibleMultiQuery = true;
                    }
                }
                if (!seenIncompatibleMultiQuery && !filesWithQueryListOutsideOfDeclarations.has(file)) {
                    importManager.removeImport(file, 'QueryList', '@angular/core');
                }
            }
            (0, apply_import_manager_1.applyImportManagerChanges)(importManager, replacements, sourceFiles, info);
            return { replacements, knownQueries };
        });
    }
    stats(globalMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let queriesCount = 0;
            let multiQueries = 0;
            let incompatibleQueries = 0;
            const fieldIncompatibleCounts = {};
            const classIncompatibleCounts = {};
            for (const query of Object.values(globalMetadata.knownQueryFields)) {
                queriesCount++;
                if (query.isMulti) {
                    multiQueries++;
                }
            }
            for (const [id, info] of Object.entries(globalMetadata.problematicQueries)) {
                if (globalMetadata.knownQueryFields[id] === undefined) {
                    continue;
                }
                // Do not count queries that were forcibly ignored via best effort mode.
                if (this.config.bestEffortMode &&
                    (info.fieldReason === null ||
                        !src_1.nonIgnorableFieldIncompatibilities.includes(info.fieldReason))) {
                    continue;
                }
                incompatibleQueries++;
                if (info.classReason !== null) {
                    const reasonName = src_1.ClassIncompatibilityReason[info.classReason];
                    const key = `incompat-class-${reasonName}`;
                    (_a = classIncompatibleCounts[key]) !== null && _a !== void 0 ? _a : (classIncompatibleCounts[key] = 0);
                    classIncompatibleCounts[key]++;
                }
                if (info.fieldReason !== null) {
                    const reasonName = src_1.FieldIncompatibilityReason[info.fieldReason];
                    const key = `incompat-field-${reasonName}`;
                    (_b = fieldIncompatibleCounts[key]) !== null && _b !== void 0 ? _b : (fieldIncompatibleCounts[key] = 0);
                    fieldIncompatibleCounts[key]++;
                }
            }
            return {
                counters: Object.assign(Object.assign({ queriesCount,
                    multiQueries,
                    incompatibleQueries }, fieldIncompatibleCounts), classIncompatibleCounts),
            };
        });
    }
}
exports.SignalQueriesMigration = SignalQueriesMigration;
/**
 * Updates the given map to capture the given query type.
 * The map may track migrated queries in a file, or query types
 * that couldn't be migrated.
 */
function updateFileState(stateMap, node, queryType) {
    const file = node.getSourceFile();
    if (!stateMap.has(file)) {
        stateMap.set(file, new Set());
    }
    stateMap.get(file).add(queryType);
}
