"use strict";
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
exports.compileDeclareComponentFromMetadata = compileDeclareComponentFromMetadata;
exports.createComponentDefinitionMap = createComponentDefinitionMap;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core = __importStar(require("../../core"));
const defaults_1 = require("../../ml_parser/defaults");
const o = __importStar(require("../../output/output_ast"));
const parse_util_1 = require("../../parse_util");
const r3_ast_1 = require("../r3_ast");
const r3_identifiers_1 = require("../r3_identifiers");
const util_1 = require("../util");
const api_1 = require("../view/api");
const compiler_1 = require("../view/compiler");
const util_2 = require("../view/util");
const directive_1 = require("./directive");
const util_3 = require("./util");
/**
 * Compile a component declaration defined by the `R3ComponentMetadata`.
 */
function compileDeclareComponentFromMetadata(meta, template, additionalTemplateInfo) {
    const definitionMap = createComponentDefinitionMap(meta, template, additionalTemplateInfo);
    const expression = o.importExpr(r3_identifiers_1.Identifiers.declareComponent).callFn([definitionMap.toLiteralMap()]);
    const type = (0, compiler_1.createComponentType)(meta);
    return { expression, type, statements: [] };
}
/**
 * Gathers the declaration fields for a component into a `DefinitionMap`.
 */
function createComponentDefinitionMap(meta, template, templateInfo) {
    const definitionMap = (0, directive_1.createDirectiveDefinitionMap)(meta);
    const blockVisitor = new BlockPresenceVisitor();
    (0, r3_ast_1.visitAll)(blockVisitor, template.nodes);
    definitionMap.set('template', getTemplateExpression(template, templateInfo));
    if (templateInfo.isInline) {
        definitionMap.set('isInline', o.literal(true));
    }
    // Set the minVersion to 17.0.0 if the component is using at least one block in its template.
    // We don't do this for templates without blocks, in order to preserve backwards compatibility.
    if (blockVisitor.hasBlocks) {
        definitionMap.set('minVersion', o.literal('17.0.0'));
    }
    definitionMap.set('styles', (0, util_3.toOptionalLiteralArray)(meta.styles, o.literal));
    definitionMap.set('dependencies', compileUsedDependenciesMetadata(meta));
    definitionMap.set('viewProviders', meta.viewProviders);
    definitionMap.set('animations', meta.animations);
    if (meta.changeDetection !== null) {
        if (typeof meta.changeDetection === 'object') {
            throw new Error('Impossible state! Change detection flag is not resolved!');
        }
        definitionMap.set('changeDetection', o
            .importExpr(r3_identifiers_1.Identifiers.ChangeDetectionStrategy)
            .prop(core.ChangeDetectionStrategy[meta.changeDetection]));
    }
    if (meta.encapsulation !== core.ViewEncapsulation.Emulated) {
        definitionMap.set('encapsulation', o.importExpr(r3_identifiers_1.Identifiers.ViewEncapsulation).prop(core.ViewEncapsulation[meta.encapsulation]));
    }
    if (meta.interpolation !== defaults_1.DEFAULT_INTERPOLATION_CONFIG) {
        definitionMap.set('interpolation', o.literalArr([o.literal(meta.interpolation.start), o.literal(meta.interpolation.end)]));
    }
    if (template.preserveWhitespaces === true) {
        definitionMap.set('preserveWhitespaces', o.literal(true));
    }
    if (meta.defer.mode === 0 /* DeferBlockDepsEmitMode.PerBlock */) {
        const resolvers = [];
        let hasResolvers = false;
        for (const deps of meta.defer.blocks.values()) {
            // Note: we need to push a `null` even if there are no dependencies, because matching of
            // defer resolver functions to defer blocks happens by index and not adding an array
            // entry for a block can throw off the blocks coming after it.
            if (deps === null) {
                resolvers.push(o.literal(null));
            }
            else {
                resolvers.push(deps);
                hasResolvers = true;
            }
        }
        // If *all* the resolvers are null, we can skip the field.
        if (hasResolvers) {
            definitionMap.set('deferBlockDependencies', o.literalArr(resolvers));
        }
    }
    else {
        throw new Error('Unsupported defer function emit mode in partial compilation');
    }
    return definitionMap;
}
function getTemplateExpression(template, templateInfo) {
    // If the template has been defined using a direct literal, we use that expression directly
    // without any modifications. This is ensures proper source mapping from the partially
    // compiled code to the source file declaring the template. Note that this does not capture
    // template literals referenced indirectly through an identifier.
    if (templateInfo.inlineTemplateLiteralExpression !== null) {
        return templateInfo.inlineTemplateLiteralExpression;
    }
    // If the template is defined inline but not through a literal, the template has been resolved
    // through static interpretation. We create a literal but cannot provide any source span. Note
    // that we cannot use the expression defining the template because the linker expects the template
    // to be defined as a literal in the declaration.
    if (templateInfo.isInline) {
        return o.literal(templateInfo.content, null, null);
    }
    // The template is external so we must synthesize an expression node with
    // the appropriate source-span.
    const contents = templateInfo.content;
    const file = new parse_util_1.ParseSourceFile(contents, templateInfo.sourceUrl);
    const start = new parse_util_1.ParseLocation(file, 0, 0, 0);
    const end = computeEndLocation(file, contents);
    const span = new parse_util_1.ParseSourceSpan(start, end);
    return o.literal(contents, null, span);
}
function computeEndLocation(file, contents) {
    const length = contents.length;
    let lineStart = 0;
    let lastLineStart = 0;
    let line = 0;
    do {
        lineStart = contents.indexOf('\n', lastLineStart);
        if (lineStart !== -1) {
            lastLineStart = lineStart + 1;
            line++;
        }
    } while (lineStart !== -1);
    return new parse_util_1.ParseLocation(file, length, line, length - lastLineStart);
}
function compileUsedDependenciesMetadata(meta) {
    const wrapType = meta.declarationListEmitMode !== 0 /* DeclarationListEmitMode.Direct */
        ? util_1.generateForwardRef
        : (expr) => expr;
    if (meta.declarationListEmitMode === 3 /* DeclarationListEmitMode.RuntimeResolved */) {
        throw new Error(`Unsupported emit mode`);
    }
    return (0, util_3.toOptionalLiteralArray)(meta.declarations, (decl) => {
        switch (decl.kind) {
            case api_1.R3TemplateDependencyKind.Directive:
                const dirMeta = new util_2.DefinitionMap();
                dirMeta.set('kind', o.literal(decl.isComponent ? 'component' : 'directive'));
                dirMeta.set('type', wrapType(decl.type));
                dirMeta.set('selector', o.literal(decl.selector));
                dirMeta.set('inputs', (0, util_3.toOptionalLiteralArray)(decl.inputs, o.literal));
                dirMeta.set('outputs', (0, util_3.toOptionalLiteralArray)(decl.outputs, o.literal));
                dirMeta.set('exportAs', (0, util_3.toOptionalLiteralArray)(decl.exportAs, o.literal));
                return dirMeta.toLiteralMap();
            case api_1.R3TemplateDependencyKind.Pipe:
                const pipeMeta = new util_2.DefinitionMap();
                pipeMeta.set('kind', o.literal('pipe'));
                pipeMeta.set('type', wrapType(decl.type));
                pipeMeta.set('name', o.literal(decl.name));
                return pipeMeta.toLiteralMap();
            case api_1.R3TemplateDependencyKind.NgModule:
                const ngModuleMeta = new util_2.DefinitionMap();
                ngModuleMeta.set('kind', o.literal('ngmodule'));
                ngModuleMeta.set('type', wrapType(decl.type));
                return ngModuleMeta.toLiteralMap();
        }
    });
}
class BlockPresenceVisitor extends r3_ast_1.RecursiveVisitor {
    constructor() {
        super(...arguments);
        this.hasBlocks = false;
    }
    visitDeferredBlock() {
        this.hasBlocks = true;
    }
    visitDeferredBlockPlaceholder() {
        this.hasBlocks = true;
    }
    visitDeferredBlockLoading() {
        this.hasBlocks = true;
    }
    visitDeferredBlockError() {
        this.hasBlocks = true;
    }
    visitIfBlock() {
        this.hasBlocks = true;
    }
    visitIfBlockBranch() {
        this.hasBlocks = true;
    }
    visitForLoopBlock() {
        this.hasBlocks = true;
    }
    visitForLoopBlockEmpty() {
        this.hasBlocks = true;
    }
    visitSwitchBlock() {
        this.hasBlocks = true;
    }
    visitSwitchBlockCase() {
        this.hasBlocks = true;
    }
}
