"use strict";
/**
 *
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
exports.emitTemplateFn = emitTemplateFn;
exports.emitHostBindingFunction = emitHostBindingFunction;
const o = __importStar(require("../../../../src/output/output_ast"));
const ir = __importStar(require("../ir"));
const compilation_1 = require("./compilation");
const any_cast_1 = require("./phases/any_cast");
const apply_i18n_expressions_1 = require("./phases/apply_i18n_expressions");
const assign_i18n_slot_dependencies_1 = require("./phases/assign_i18n_slot_dependencies");
const attach_source_locations_1 = require("./phases/attach_source_locations");
const attribute_extraction_1 = require("./phases/attribute_extraction");
const binding_specialization_1 = require("./phases/binding_specialization");
const chaining_1 = require("./phases/chaining");
const collapse_singleton_interpolations_1 = require("./phases/collapse_singleton_interpolations");
const conditionals_1 = require("./phases/conditionals");
const const_collection_1 = require("./phases/const_collection");
const convert_i18n_bindings_1 = require("./phases/convert_i18n_bindings");
const create_i18n_contexts_1 = require("./phases/create_i18n_contexts");
const deduplicate_text_bindings_1 = require("./phases/deduplicate_text_bindings");
const defer_configs_1 = require("./phases/defer_configs");
const defer_resolve_targets_1 = require("./phases/defer_resolve_targets");
const empty_elements_1 = require("./phases/empty_elements");
const expand_safe_reads_1 = require("./phases/expand_safe_reads");
const extract_i18n_messages_1 = require("./phases/extract_i18n_messages");
const generate_advance_1 = require("./phases/generate_advance");
const generate_local_let_references_1 = require("./phases/generate_local_let_references");
const generate_projection_def_1 = require("./phases/generate_projection_def");
const generate_variables_1 = require("./phases/generate_variables");
const has_const_expression_collection_1 = require("./phases/has_const_expression_collection");
const host_style_property_parsing_1 = require("./phases/host_style_property_parsing");
const i18n_const_collection_1 = require("./phases/i18n_const_collection");
const i18n_text_extraction_1 = require("./phases/i18n_text_extraction");
const local_refs_1 = require("./phases/local_refs");
const namespace_1 = require("./phases/namespace");
const naming_1 = require("./phases/naming");
const next_context_merging_1 = require("./phases/next_context_merging");
const ng_container_1 = require("./phases/ng_container");
const nonbindable_1 = require("./phases/nonbindable");
const ordering_1 = require("./phases/ordering");
const parse_extracted_styles_1 = require("./phases/parse_extracted_styles");
const phase_remove_content_selectors_1 = require("./phases/phase_remove_content_selectors");
const pipe_creation_1 = require("./phases/pipe_creation");
const pipe_variadic_1 = require("./phases/pipe_variadic");
const propagate_i18n_blocks_1 = require("./phases/propagate_i18n_blocks");
const pure_function_extraction_1 = require("./phases/pure_function_extraction");
const pure_literal_structures_1 = require("./phases/pure_literal_structures");
const reify_1 = require("./phases/reify");
const remove_empty_bindings_1 = require("./phases/remove_empty_bindings");
const remove_i18n_contexts_1 = require("./phases/remove_i18n_contexts");
const remove_illegal_let_references_1 = require("./phases/remove_illegal_let_references");
const remove_unused_i18n_attrs_1 = require("./phases/remove_unused_i18n_attrs");
const resolve_contexts_1 = require("./phases/resolve_contexts");
const resolve_defer_deps_fns_1 = require("./phases/resolve_defer_deps_fns");
const resolve_dollar_event_1 = require("./phases/resolve_dollar_event");
const resolve_i18n_element_placeholders_1 = require("./phases/resolve_i18n_element_placeholders");
const resolve_i18n_expression_placeholders_1 = require("./phases/resolve_i18n_expression_placeholders");
const resolve_names_1 = require("./phases/resolve_names");
const resolve_sanitizers_1 = require("./phases/resolve_sanitizers");
const save_restore_view_1 = require("./phases/save_restore_view");
const slot_allocation_1 = require("./phases/slot_allocation");
const store_let_optimization_1 = require("./phases/store_let_optimization");
const strip_nonrequired_parentheses_1 = require("./phases/strip_nonrequired_parentheses");
const style_binding_specialization_1 = require("./phases/style_binding_specialization");
const temporary_variables_1 = require("./phases/temporary_variables");
const track_fn_optimization_1 = require("./phases/track_fn_optimization");
const track_variables_1 = require("./phases/track_variables");
const transform_two_way_binding_set_1 = require("./phases/transform_two_way_binding_set");
const var_counting_1 = require("./phases/var_counting");
const variable_optimization_1 = require("./phases/variable_optimization");
const wrap_icus_1 = require("./phases/wrap_icus");
const phases = [
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: phase_remove_content_selectors_1.removeContentSelectors },
    { kind: compilation_1.CompilationJobKind.Host, fn: host_style_property_parsing_1.parseHostStyleProperties },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: namespace_1.emitNamespaceChanges },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: propagate_i18n_blocks_1.propagateI18nBlocks },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: wrap_icus_1.wrapI18nIcus },
    { kind: compilation_1.CompilationJobKind.Both, fn: deduplicate_text_bindings_1.deduplicateTextBindings },
    { kind: compilation_1.CompilationJobKind.Both, fn: style_binding_specialization_1.specializeStyleBindings },
    { kind: compilation_1.CompilationJobKind.Both, fn: binding_specialization_1.specializeBindings },
    { kind: compilation_1.CompilationJobKind.Both, fn: attribute_extraction_1.extractAttributes },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: create_i18n_contexts_1.createI18nContexts },
    { kind: compilation_1.CompilationJobKind.Both, fn: parse_extracted_styles_1.parseExtractedStyles },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: remove_empty_bindings_1.removeEmptyBindings },
    { kind: compilation_1.CompilationJobKind.Both, fn: collapse_singleton_interpolations_1.collapseSingletonInterpolations },
    { kind: compilation_1.CompilationJobKind.Both, fn: ordering_1.orderOps },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: conditionals_1.generateConditionalExpressions },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: pipe_creation_1.createPipes },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: defer_configs_1.configureDeferInstructions },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: i18n_text_extraction_1.convertI18nText },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: convert_i18n_bindings_1.convertI18nBindings },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: remove_unused_i18n_attrs_1.removeUnusedI18nAttributesOps },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: assign_i18n_slot_dependencies_1.assignI18nSlotDependencies },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: apply_i18n_expressions_1.applyI18nExpressions },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: pipe_variadic_1.createVariadicPipes },
    { kind: compilation_1.CompilationJobKind.Both, fn: pure_literal_structures_1.generatePureLiteralStructures },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: generate_projection_def_1.generateProjectionDefs },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: generate_local_let_references_1.generateLocalLetReferences },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: generate_variables_1.generateVariables },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: save_restore_view_1.saveAndRestoreView },
    { kind: compilation_1.CompilationJobKind.Both, fn: any_cast_1.deleteAnyCasts },
    { kind: compilation_1.CompilationJobKind.Both, fn: resolve_dollar_event_1.resolveDollarEvent },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: track_variables_1.generateTrackVariables },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: remove_illegal_let_references_1.removeIllegalLetReferences },
    { kind: compilation_1.CompilationJobKind.Both, fn: resolve_names_1.resolveNames },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: defer_resolve_targets_1.resolveDeferTargetNames },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: transform_two_way_binding_set_1.transformTwoWayBindingSet },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: track_fn_optimization_1.optimizeTrackFns },
    { kind: compilation_1.CompilationJobKind.Both, fn: resolve_contexts_1.resolveContexts },
    { kind: compilation_1.CompilationJobKind.Both, fn: resolve_sanitizers_1.resolveSanitizers },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: local_refs_1.liftLocalRefs },
    { kind: compilation_1.CompilationJobKind.Both, fn: expand_safe_reads_1.expandSafeReads },
    { kind: compilation_1.CompilationJobKind.Both, fn: strip_nonrequired_parentheses_1.stripNonrequiredParentheses },
    { kind: compilation_1.CompilationJobKind.Both, fn: temporary_variables_1.generateTemporaryVariables },
    { kind: compilation_1.CompilationJobKind.Both, fn: variable_optimization_1.optimizeVariables },
    { kind: compilation_1.CompilationJobKind.Both, fn: store_let_optimization_1.optimizeStoreLet },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: slot_allocation_1.allocateSlots },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: resolve_i18n_element_placeholders_1.resolveI18nElementPlaceholders },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: resolve_i18n_expression_placeholders_1.resolveI18nExpressionPlaceholders },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: extract_i18n_messages_1.extractI18nMessages },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: i18n_const_collection_1.collectI18nConsts },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: has_const_expression_collection_1.collectConstExpressions },
    { kind: compilation_1.CompilationJobKind.Both, fn: const_collection_1.collectElementConsts },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: remove_i18n_contexts_1.removeI18nContexts },
    { kind: compilation_1.CompilationJobKind.Both, fn: var_counting_1.countVariables },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: generate_advance_1.generateAdvance },
    { kind: compilation_1.CompilationJobKind.Both, fn: naming_1.nameFunctionsAndVariables },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: resolve_defer_deps_fns_1.resolveDeferDepsFns },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: next_context_merging_1.mergeNextContextExpressions },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: ng_container_1.generateNgContainerOps },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: empty_elements_1.collapseEmptyInstructions },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: attach_source_locations_1.attachSourceLocations },
    { kind: compilation_1.CompilationJobKind.Tmpl, fn: nonbindable_1.disableBindings },
    { kind: compilation_1.CompilationJobKind.Both, fn: pure_function_extraction_1.extractPureFunctions },
    { kind: compilation_1.CompilationJobKind.Both, fn: reify_1.reify },
    { kind: compilation_1.CompilationJobKind.Both, fn: chaining_1.chain },
];
/**
 * Run all transformation phases in the correct order against a compilation job. After this
 * processing, the compilation should be in a state where it can be emitted.
 */
function transform(job, kind) {
    for (const phase of phases) {
        if (phase.kind === kind || phase.kind === compilation_1.CompilationJobKind.Both) {
            // The type of `Phase` above ensures it is impossible to call a phase that doesn't support the
            // job kind.
            phase.fn(job);
        }
    }
}
/**
 * Compile all views in the given `ComponentCompilation` into the final template function, which may
 * reference constants defined in a `ConstantPool`.
 */
function emitTemplateFn(tpl, pool) {
    const rootFn = emitView(tpl.root);
    emitChildViews(tpl.root, pool);
    return rootFn;
}
function emitChildViews(parent, pool) {
    for (const unit of parent.job.units) {
        if (unit.parent !== parent.xref) {
            continue;
        }
        // Child views are emitted depth-first.
        emitChildViews(unit, pool);
        const viewFn = emitView(unit);
        pool.statements.push(viewFn.toDeclStmt(viewFn.name));
    }
}
/**
 * Emit a template function for an individual `ViewCompilation` (which may be either the root view
 * or an embedded view).
 */
function emitView(view) {
    if (view.fnName === null) {
        throw new Error(`AssertionError: view ${view.xref} is unnamed`);
    }
    const createStatements = [];
    for (const op of view.create) {
        if (op.kind !== ir.OpKind.Statement) {
            throw new Error(`AssertionError: expected all create ops to have been compiled, but got ${ir.OpKind[op.kind]}`);
        }
        createStatements.push(op.statement);
    }
    const updateStatements = [];
    for (const op of view.update) {
        if (op.kind !== ir.OpKind.Statement) {
            throw new Error(`AssertionError: expected all update ops to have been compiled, but got ${ir.OpKind[op.kind]}`);
        }
        updateStatements.push(op.statement);
    }
    const createCond = maybeGenerateRfBlock(1, createStatements);
    const updateCond = maybeGenerateRfBlock(2, updateStatements);
    return o.fn([new o.FnParam('rf'), new o.FnParam('ctx')], [...createCond, ...updateCond], 
    /* type */ undefined, 
    /* sourceSpan */ undefined, view.fnName);
}
function maybeGenerateRfBlock(flag, statements) {
    if (statements.length === 0) {
        return [];
    }
    return [
        o.ifStmt(new o.BinaryOperatorExpr(o.BinaryOperator.BitwiseAnd, o.variable('rf'), o.literal(flag)), statements),
    ];
}
function emitHostBindingFunction(job) {
    if (job.root.fnName === null) {
        throw new Error(`AssertionError: host binding function is unnamed`);
    }
    const createStatements = [];
    for (const op of job.root.create) {
        if (op.kind !== ir.OpKind.Statement) {
            throw new Error(`AssertionError: expected all create ops to have been compiled, but got ${ir.OpKind[op.kind]}`);
        }
        createStatements.push(op.statement);
    }
    const updateStatements = [];
    for (const op of job.root.update) {
        if (op.kind !== ir.OpKind.Statement) {
            throw new Error(`AssertionError: expected all update ops to have been compiled, but got ${ir.OpKind[op.kind]}`);
        }
        updateStatements.push(op.statement);
    }
    if (createStatements.length === 0 && updateStatements.length === 0) {
        return null;
    }
    const createCond = maybeGenerateRfBlock(1, createStatements);
    const updateCond = maybeGenerateRfBlock(2, updateStatements);
    return o.fn([new o.FnParam('rf'), new o.FnParam('ctx')], [...createCond, ...updateCond], 
    /* type */ undefined, 
    /* sourceSpan */ undefined, job.root.fnName);
}
