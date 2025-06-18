"use strict";
/**
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParenthesizedExpr = exports.NotExpr = exports.NONE_TYPE = exports.MapType = exports.LocalizedString = exports.LiteralMapExpr = exports.literalMap = exports.LiteralExpr = exports.LiteralArrayExpr = exports.literal = exports.LeadingComment = exports.leadingComment = exports.JSDocComment = exports.jsDocComment = exports.InvokeFunctionExpr = exports.InstantiateExpr = exports.IfStmt = exports.FunctionExpr = exports.ExternalReference = exports.ExternalExpr = exports.ExpressionType = exports.ExpressionStatement = exports.Expression = exports.DynamicImportExpr = exports.DYNAMIC_TYPE = exports.DeclareVarStmt = exports.DeclareFunctionStmt = exports.ConditionalExpr = exports.CommaExpr = exports.BuiltinTypeName = exports.BuiltinType = exports.BinaryOperatorExpr = exports.BinaryOperator = exports.ArrowFunctionExpr = exports.ArrayType = exports.EmitterVisitorContext = exports.TreeError = exports.ParseTreeResult = exports.InterpolationConfig = exports.DEFAULT_INTERPOLATION_CONFIG = exports.publishFacade = exports.ViewEncapsulation = exports.emitDistinctChangesOnlyDefaultValue = exports.ChangeDetectionStrategy = exports.ConstantPool = exports.preserveWhitespacesDefault = exports.CompilerConfig = exports.core = exports.NO_ERRORS_SCHEMA = exports.CUSTOM_ELEMENTS_SCHEMA = void 0;
exports.TmplAstIfBlockBranch = exports.TmplAstIfBlock = exports.TmplAstIdleDeferredTrigger = exports.TmplAstIcu = exports.TmplAstHoverDeferredTrigger = exports.TmplAstForLoopBlockEmpty = exports.TmplAstForLoopBlock = exports.TmplAstElement = exports.TmplAstDeferredTrigger = exports.TmplAstDeferredBlockPlaceholder = exports.TmplAstDeferredBlockLoading = exports.TmplAstDeferredBlockError = exports.TmplAstDeferredBlock = exports.TmplAstContent = exports.TmplAstBoundText = exports.TmplAstBoundEvent = exports.TmplAstBoundDeferredTrigger = exports.TmplAstBoundAttribute = exports.TmplAstBlockNode = exports.compileDeclarePipeFromMetadata = exports.compileDeclareNgModuleFromMetadata = exports.compileDeclareInjectorFromMetadata = exports.compileDeclareInjectableFromMetadata = exports.compileDeclareFactoryFunction = exports.compileDeclareDirectiveFromMetadata = exports.compileDeclareComponentFromMetadata = exports.compileDeclareClassMetadata = exports.compileComponentDeclareClassMetadata = exports.JitEvaluator = exports.WriteVarExpr = exports.WritePropExpr = exports.WriteKeyExpr = exports.WrappedNodeExpr = exports.VoidExpr = exports.UnaryOperatorExpr = exports.UnaryOperator = exports.TypeofExpr = exports.TypeModifier = exports.Type = exports.TransplantedType = exports.TemplateLiteralExpr = exports.TemplateLiteralElementExpr = exports.TaggedTemplateLiteralExpr = exports.STRING_TYPE = exports.StmtModifier = exports.Statement = exports.ReturnStatement = exports.ReadVarExpr = exports.ReadPropExpr = exports.ReadKeyExpr = void 0;
exports.outputAst = exports.Version = exports.createCssSelectorFromNode = exports.CombinedRecursiveAstVisitor = exports.parseTemplate = exports.makeBindingParser = exports.verifyHostBindings = exports.parseHostBindings = exports.encapsulateStyle = exports.compileDirectiveFromMetadata = exports.compileDeferResolverFunction = exports.compileComponentFromMetadata = exports.getSafePropertyAccessString = exports.devOnlyGuardedExpression = exports.createMayBeForwardRefExpression = exports.compilePipeFromMetadata = exports.R3SelectorScopeMode = exports.R3NgModuleMetadataKind = exports.compileNgModule = exports.compileInjector = exports.R3Identifiers = exports.compileHmrUpdateCallback = exports.compileHmrInitializer = exports.FactoryTarget = exports.compileFactoryFunction = exports.compileOpaqueAsyncClassMetadata = exports.compileComponentClassMetadata = exports.compileClassMetadata = exports.compileClassDebugInfo = exports.tmplAstVisitAll = exports.TmplAstDirective = exports.TmplAstComponent = exports.TmplAstHostElement = exports.TmplAstViewportDeferredTrigger = exports.TmplAstVariable = exports.TmplAstUnknownBlock = exports.TmplAstTimerDeferredTrigger = exports.TmplAstTextAttribute = exports.TmplAstText = exports.TmplAstTemplate = exports.TmplAstSwitchBlockCase = exports.TmplAstSwitchBlock = exports.TmplAstReference = exports.TmplAstRecursiveVisitor = exports.TmplAstNeverDeferredTrigger = exports.TmplAstLetDeclaration = exports.TmplAstInteractionDeferredTrigger = exports.TmplAstImmediateDeferredTrigger = void 0;
//////////////////////////////////////
// THIS FILE HAS GLOBAL SIDE EFFECT //
//       (see bottom of file)       //
//////////////////////////////////////
/**
 * @module
 * @description
 * Entry point for all APIs of the compiler package.
 *
 * <div class="callout is-critical">
 *   <header>Unstable APIs</header>
 *   <p>
 *     All compiler apis are currently considered experimental and private!
 *   </p>
 *   <p>
 *     We expect the APIs in this package to keep on changing. Do not rely on them.
 *   </p>
 * </div>
 */
const core = __importStar(require("./core"));
exports.core = core;
const jit_compiler_facade_1 = require("./jit_compiler_facade");
const outputAst = __importStar(require("./output/output_ast"));
exports.outputAst = outputAst;
const util_1 = require("./util");
var core_1 = require("./core");
Object.defineProperty(exports, "CUSTOM_ELEMENTS_SCHEMA", { enumerable: true, get: function () { return core_1.CUSTOM_ELEMENTS_SCHEMA; } });
Object.defineProperty(exports, "NO_ERRORS_SCHEMA", { enumerable: true, get: function () { return core_1.NO_ERRORS_SCHEMA; } });
var config_1 = require("./config");
Object.defineProperty(exports, "CompilerConfig", { enumerable: true, get: function () { return config_1.CompilerConfig; } });
Object.defineProperty(exports, "preserveWhitespacesDefault", { enumerable: true, get: function () { return config_1.preserveWhitespacesDefault; } });
var constant_pool_1 = require("./constant_pool");
Object.defineProperty(exports, "ConstantPool", { enumerable: true, get: function () { return constant_pool_1.ConstantPool; } });
var core_2 = require("./core");
Object.defineProperty(exports, "ChangeDetectionStrategy", { enumerable: true, get: function () { return core_2.ChangeDetectionStrategy; } });
Object.defineProperty(exports, "emitDistinctChangesOnlyDefaultValue", { enumerable: true, get: function () { return core_2.emitDistinctChangesOnlyDefaultValue; } });
Object.defineProperty(exports, "ViewEncapsulation", { enumerable: true, get: function () { return core_2.ViewEncapsulation; } });
__exportStar(require("./expression_parser/ast"), exports);
__exportStar(require("./expression_parser/lexer"), exports);
__exportStar(require("./expression_parser/parser"), exports);
__exportStar(require("./i18n/index"), exports);
__exportStar(require("./injectable_compiler_2"), exports);
var jit_compiler_facade_2 = require("./jit_compiler_facade");
Object.defineProperty(exports, "publishFacade", { enumerable: true, get: function () { return jit_compiler_facade_2.publishFacade; } });
__exportStar(require("./ml_parser/ast"), exports);
var defaults_1 = require("./ml_parser/defaults");
Object.defineProperty(exports, "DEFAULT_INTERPOLATION_CONFIG", { enumerable: true, get: function () { return defaults_1.DEFAULT_INTERPOLATION_CONFIG; } });
Object.defineProperty(exports, "InterpolationConfig", { enumerable: true, get: function () { return defaults_1.InterpolationConfig; } });
__exportStar(require("./ml_parser/html_parser"), exports);
__exportStar(require("./ml_parser/html_tags"), exports);
var parser_1 = require("./ml_parser/parser");
Object.defineProperty(exports, "ParseTreeResult", { enumerable: true, get: function () { return parser_1.ParseTreeResult; } });
Object.defineProperty(exports, "TreeError", { enumerable: true, get: function () { return parser_1.TreeError; } });
__exportStar(require("./ml_parser/tags"), exports);
__exportStar(require("./ml_parser/xml_parser"), exports);
var abstract_emitter_1 = require("./output/abstract_emitter");
Object.defineProperty(exports, "EmitterVisitorContext", { enumerable: true, get: function () { return abstract_emitter_1.EmitterVisitorContext; } });
var output_ast_1 = require("./output/output_ast");
Object.defineProperty(exports, "ArrayType", { enumerable: true, get: function () { return output_ast_1.ArrayType; } });
Object.defineProperty(exports, "ArrowFunctionExpr", { enumerable: true, get: function () { return output_ast_1.ArrowFunctionExpr; } });
Object.defineProperty(exports, "BinaryOperator", { enumerable: true, get: function () { return output_ast_1.BinaryOperator; } });
Object.defineProperty(exports, "BinaryOperatorExpr", { enumerable: true, get: function () { return output_ast_1.BinaryOperatorExpr; } });
Object.defineProperty(exports, "BuiltinType", { enumerable: true, get: function () { return output_ast_1.BuiltinType; } });
Object.defineProperty(exports, "BuiltinTypeName", { enumerable: true, get: function () { return output_ast_1.BuiltinTypeName; } });
Object.defineProperty(exports, "CommaExpr", { enumerable: true, get: function () { return output_ast_1.CommaExpr; } });
Object.defineProperty(exports, "ConditionalExpr", { enumerable: true, get: function () { return output_ast_1.ConditionalExpr; } });
Object.defineProperty(exports, "DeclareFunctionStmt", { enumerable: true, get: function () { return output_ast_1.DeclareFunctionStmt; } });
Object.defineProperty(exports, "DeclareVarStmt", { enumerable: true, get: function () { return output_ast_1.DeclareVarStmt; } });
Object.defineProperty(exports, "DYNAMIC_TYPE", { enumerable: true, get: function () { return output_ast_1.DYNAMIC_TYPE; } });
Object.defineProperty(exports, "DynamicImportExpr", { enumerable: true, get: function () { return output_ast_1.DynamicImportExpr; } });
Object.defineProperty(exports, "Expression", { enumerable: true, get: function () { return output_ast_1.Expression; } });
Object.defineProperty(exports, "ExpressionStatement", { enumerable: true, get: function () { return output_ast_1.ExpressionStatement; } });
Object.defineProperty(exports, "ExpressionType", { enumerable: true, get: function () { return output_ast_1.ExpressionType; } });
Object.defineProperty(exports, "ExternalExpr", { enumerable: true, get: function () { return output_ast_1.ExternalExpr; } });
Object.defineProperty(exports, "ExternalReference", { enumerable: true, get: function () { return output_ast_1.ExternalReference; } });
Object.defineProperty(exports, "FunctionExpr", { enumerable: true, get: function () { return output_ast_1.FunctionExpr; } });
Object.defineProperty(exports, "IfStmt", { enumerable: true, get: function () { return output_ast_1.IfStmt; } });
Object.defineProperty(exports, "InstantiateExpr", { enumerable: true, get: function () { return output_ast_1.InstantiateExpr; } });
Object.defineProperty(exports, "InvokeFunctionExpr", { enumerable: true, get: function () { return output_ast_1.InvokeFunctionExpr; } });
Object.defineProperty(exports, "jsDocComment", { enumerable: true, get: function () { return output_ast_1.jsDocComment; } });
Object.defineProperty(exports, "JSDocComment", { enumerable: true, get: function () { return output_ast_1.JSDocComment; } });
Object.defineProperty(exports, "leadingComment", { enumerable: true, get: function () { return output_ast_1.leadingComment; } });
Object.defineProperty(exports, "LeadingComment", { enumerable: true, get: function () { return output_ast_1.LeadingComment; } });
Object.defineProperty(exports, "literal", { enumerable: true, get: function () { return output_ast_1.literal; } });
Object.defineProperty(exports, "LiteralArrayExpr", { enumerable: true, get: function () { return output_ast_1.LiteralArrayExpr; } });
Object.defineProperty(exports, "LiteralExpr", { enumerable: true, get: function () { return output_ast_1.LiteralExpr; } });
Object.defineProperty(exports, "literalMap", { enumerable: true, get: function () { return output_ast_1.literalMap; } });
Object.defineProperty(exports, "LiteralMapExpr", { enumerable: true, get: function () { return output_ast_1.LiteralMapExpr; } });
Object.defineProperty(exports, "LocalizedString", { enumerable: true, get: function () { return output_ast_1.LocalizedString; } });
Object.defineProperty(exports, "MapType", { enumerable: true, get: function () { return output_ast_1.MapType; } });
Object.defineProperty(exports, "NONE_TYPE", { enumerable: true, get: function () { return output_ast_1.NONE_TYPE; } });
Object.defineProperty(exports, "NotExpr", { enumerable: true, get: function () { return output_ast_1.NotExpr; } });
Object.defineProperty(exports, "ParenthesizedExpr", { enumerable: true, get: function () { return output_ast_1.ParenthesizedExpr; } });
Object.defineProperty(exports, "ReadKeyExpr", { enumerable: true, get: function () { return output_ast_1.ReadKeyExpr; } });
Object.defineProperty(exports, "ReadPropExpr", { enumerable: true, get: function () { return output_ast_1.ReadPropExpr; } });
Object.defineProperty(exports, "ReadVarExpr", { enumerable: true, get: function () { return output_ast_1.ReadVarExpr; } });
Object.defineProperty(exports, "ReturnStatement", { enumerable: true, get: function () { return output_ast_1.ReturnStatement; } });
Object.defineProperty(exports, "Statement", { enumerable: true, get: function () { return output_ast_1.Statement; } });
Object.defineProperty(exports, "StmtModifier", { enumerable: true, get: function () { return output_ast_1.StmtModifier; } });
Object.defineProperty(exports, "STRING_TYPE", { enumerable: true, get: function () { return output_ast_1.STRING_TYPE; } });
Object.defineProperty(exports, "TaggedTemplateLiteralExpr", { enumerable: true, get: function () { return output_ast_1.TaggedTemplateLiteralExpr; } });
Object.defineProperty(exports, "TemplateLiteralElementExpr", { enumerable: true, get: function () { return output_ast_1.TemplateLiteralElementExpr; } });
Object.defineProperty(exports, "TemplateLiteralExpr", { enumerable: true, get: function () { return output_ast_1.TemplateLiteralExpr; } });
Object.defineProperty(exports, "TransplantedType", { enumerable: true, get: function () { return output_ast_1.TransplantedType; } });
Object.defineProperty(exports, "Type", { enumerable: true, get: function () { return output_ast_1.Type; } });
Object.defineProperty(exports, "TypeModifier", { enumerable: true, get: function () { return output_ast_1.TypeModifier; } });
Object.defineProperty(exports, "TypeofExpr", { enumerable: true, get: function () { return output_ast_1.TypeofExpr; } });
Object.defineProperty(exports, "UnaryOperator", { enumerable: true, get: function () { return output_ast_1.UnaryOperator; } });
Object.defineProperty(exports, "UnaryOperatorExpr", { enumerable: true, get: function () { return output_ast_1.UnaryOperatorExpr; } });
Object.defineProperty(exports, "VoidExpr", { enumerable: true, get: function () { return output_ast_1.VoidExpr; } });
Object.defineProperty(exports, "WrappedNodeExpr", { enumerable: true, get: function () { return output_ast_1.WrappedNodeExpr; } });
Object.defineProperty(exports, "WriteKeyExpr", { enumerable: true, get: function () { return output_ast_1.WriteKeyExpr; } });
Object.defineProperty(exports, "WritePropExpr", { enumerable: true, get: function () { return output_ast_1.WritePropExpr; } });
Object.defineProperty(exports, "WriteVarExpr", { enumerable: true, get: function () { return output_ast_1.WriteVarExpr; } });
var output_jit_1 = require("./output/output_jit");
Object.defineProperty(exports, "JitEvaluator", { enumerable: true, get: function () { return output_jit_1.JitEvaluator; } });
__exportStar(require("./parse_util"), exports);
__exportStar(require("./render3/partial/api"), exports);
var class_metadata_1 = require("./render3/partial/class_metadata");
Object.defineProperty(exports, "compileComponentDeclareClassMetadata", { enumerable: true, get: function () { return class_metadata_1.compileComponentDeclareClassMetadata; } });
Object.defineProperty(exports, "compileDeclareClassMetadata", { enumerable: true, get: function () { return class_metadata_1.compileDeclareClassMetadata; } });
var component_1 = require("./render3/partial/component");
Object.defineProperty(exports, "compileDeclareComponentFromMetadata", { enumerable: true, get: function () { return component_1.compileDeclareComponentFromMetadata; } });
var directive_1 = require("./render3/partial/directive");
Object.defineProperty(exports, "compileDeclareDirectiveFromMetadata", { enumerable: true, get: function () { return directive_1.compileDeclareDirectiveFromMetadata; } });
var factory_1 = require("./render3/partial/factory");
Object.defineProperty(exports, "compileDeclareFactoryFunction", { enumerable: true, get: function () { return factory_1.compileDeclareFactoryFunction; } });
var injectable_1 = require("./render3/partial/injectable");
Object.defineProperty(exports, "compileDeclareInjectableFromMetadata", { enumerable: true, get: function () { return injectable_1.compileDeclareInjectableFromMetadata; } });
var injector_1 = require("./render3/partial/injector");
Object.defineProperty(exports, "compileDeclareInjectorFromMetadata", { enumerable: true, get: function () { return injector_1.compileDeclareInjectorFromMetadata; } });
var ng_module_1 = require("./render3/partial/ng_module");
Object.defineProperty(exports, "compileDeclareNgModuleFromMetadata", { enumerable: true, get: function () { return ng_module_1.compileDeclareNgModuleFromMetadata; } });
var pipe_1 = require("./render3/partial/pipe");
Object.defineProperty(exports, "compileDeclarePipeFromMetadata", { enumerable: true, get: function () { return pipe_1.compileDeclarePipeFromMetadata; } });
var r3_ast_1 = require("./render3/r3_ast");
Object.defineProperty(exports, "TmplAstBlockNode", { enumerable: true, get: function () { return r3_ast_1.BlockNode; } });
Object.defineProperty(exports, "TmplAstBoundAttribute", { enumerable: true, get: function () { return r3_ast_1.BoundAttribute; } });
Object.defineProperty(exports, "TmplAstBoundDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.BoundDeferredTrigger; } });
Object.defineProperty(exports, "TmplAstBoundEvent", { enumerable: true, get: function () { return r3_ast_1.BoundEvent; } });
Object.defineProperty(exports, "TmplAstBoundText", { enumerable: true, get: function () { return r3_ast_1.BoundText; } });
Object.defineProperty(exports, "TmplAstContent", { enumerable: true, get: function () { return r3_ast_1.Content; } });
Object.defineProperty(exports, "TmplAstDeferredBlock", { enumerable: true, get: function () { return r3_ast_1.DeferredBlock; } });
Object.defineProperty(exports, "TmplAstDeferredBlockError", { enumerable: true, get: function () { return r3_ast_1.DeferredBlockError; } });
Object.defineProperty(exports, "TmplAstDeferredBlockLoading", { enumerable: true, get: function () { return r3_ast_1.DeferredBlockLoading; } });
Object.defineProperty(exports, "TmplAstDeferredBlockPlaceholder", { enumerable: true, get: function () { return r3_ast_1.DeferredBlockPlaceholder; } });
Object.defineProperty(exports, "TmplAstDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.DeferredTrigger; } });
Object.defineProperty(exports, "TmplAstElement", { enumerable: true, get: function () { return r3_ast_1.Element; } });
Object.defineProperty(exports, "TmplAstForLoopBlock", { enumerable: true, get: function () { return r3_ast_1.ForLoopBlock; } });
Object.defineProperty(exports, "TmplAstForLoopBlockEmpty", { enumerable: true, get: function () { return r3_ast_1.ForLoopBlockEmpty; } });
Object.defineProperty(exports, "TmplAstHoverDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.HoverDeferredTrigger; } });
Object.defineProperty(exports, "TmplAstIcu", { enumerable: true, get: function () { return r3_ast_1.Icu; } });
Object.defineProperty(exports, "TmplAstIdleDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.IdleDeferredTrigger; } });
Object.defineProperty(exports, "TmplAstIfBlock", { enumerable: true, get: function () { return r3_ast_1.IfBlock; } });
Object.defineProperty(exports, "TmplAstIfBlockBranch", { enumerable: true, get: function () { return r3_ast_1.IfBlockBranch; } });
Object.defineProperty(exports, "TmplAstImmediateDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.ImmediateDeferredTrigger; } });
Object.defineProperty(exports, "TmplAstInteractionDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.InteractionDeferredTrigger; } });
Object.defineProperty(exports, "TmplAstLetDeclaration", { enumerable: true, get: function () { return r3_ast_1.LetDeclaration; } });
Object.defineProperty(exports, "TmplAstNeverDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.NeverDeferredTrigger; } });
Object.defineProperty(exports, "TmplAstRecursiveVisitor", { enumerable: true, get: function () { return r3_ast_1.RecursiveVisitor; } });
Object.defineProperty(exports, "TmplAstReference", { enumerable: true, get: function () { return r3_ast_1.Reference; } });
Object.defineProperty(exports, "TmplAstSwitchBlock", { enumerable: true, get: function () { return r3_ast_1.SwitchBlock; } });
Object.defineProperty(exports, "TmplAstSwitchBlockCase", { enumerable: true, get: function () { return r3_ast_1.SwitchBlockCase; } });
Object.defineProperty(exports, "TmplAstTemplate", { enumerable: true, get: function () { return r3_ast_1.Template; } });
Object.defineProperty(exports, "TmplAstText", { enumerable: true, get: function () { return r3_ast_1.Text; } });
Object.defineProperty(exports, "TmplAstTextAttribute", { enumerable: true, get: function () { return r3_ast_1.TextAttribute; } });
Object.defineProperty(exports, "TmplAstTimerDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.TimerDeferredTrigger; } });
Object.defineProperty(exports, "TmplAstUnknownBlock", { enumerable: true, get: function () { return r3_ast_1.UnknownBlock; } });
Object.defineProperty(exports, "TmplAstVariable", { enumerable: true, get: function () { return r3_ast_1.Variable; } });
Object.defineProperty(exports, "TmplAstViewportDeferredTrigger", { enumerable: true, get: function () { return r3_ast_1.ViewportDeferredTrigger; } });
Object.defineProperty(exports, "TmplAstHostElement", { enumerable: true, get: function () { return r3_ast_1.HostElement; } });
Object.defineProperty(exports, "TmplAstComponent", { enumerable: true, get: function () { return r3_ast_1.Component; } });
Object.defineProperty(exports, "TmplAstDirective", { enumerable: true, get: function () { return r3_ast_1.Directive; } });
Object.defineProperty(exports, "tmplAstVisitAll", { enumerable: true, get: function () { return r3_ast_1.visitAll; } });
var r3_class_debug_info_compiler_1 = require("./render3/r3_class_debug_info_compiler");
Object.defineProperty(exports, "compileClassDebugInfo", { enumerable: true, get: function () { return r3_class_debug_info_compiler_1.compileClassDebugInfo; } });
var r3_class_metadata_compiler_1 = require("./render3/r3_class_metadata_compiler");
Object.defineProperty(exports, "compileClassMetadata", { enumerable: true, get: function () { return r3_class_metadata_compiler_1.compileClassMetadata; } });
Object.defineProperty(exports, "compileComponentClassMetadata", { enumerable: true, get: function () { return r3_class_metadata_compiler_1.compileComponentClassMetadata; } });
Object.defineProperty(exports, "compileOpaqueAsyncClassMetadata", { enumerable: true, get: function () { return r3_class_metadata_compiler_1.compileOpaqueAsyncClassMetadata; } });
var r3_factory_1 = require("./render3/r3_factory");
Object.defineProperty(exports, "compileFactoryFunction", { enumerable: true, get: function () { return r3_factory_1.compileFactoryFunction; } });
Object.defineProperty(exports, "FactoryTarget", { enumerable: true, get: function () { return r3_factory_1.FactoryTarget; } });
var r3_hmr_compiler_1 = require("./render3/r3_hmr_compiler");
Object.defineProperty(exports, "compileHmrInitializer", { enumerable: true, get: function () { return r3_hmr_compiler_1.compileHmrInitializer; } });
Object.defineProperty(exports, "compileHmrUpdateCallback", { enumerable: true, get: function () { return r3_hmr_compiler_1.compileHmrUpdateCallback; } });
var r3_identifiers_1 = require("./render3/r3_identifiers");
Object.defineProperty(exports, "R3Identifiers", { enumerable: true, get: function () { return r3_identifiers_1.Identifiers; } });
var r3_injector_compiler_1 = require("./render3/r3_injector_compiler");
Object.defineProperty(exports, "compileInjector", { enumerable: true, get: function () { return r3_injector_compiler_1.compileInjector; } });
var r3_module_compiler_1 = require("./render3/r3_module_compiler");
Object.defineProperty(exports, "compileNgModule", { enumerable: true, get: function () { return r3_module_compiler_1.compileNgModule; } });
Object.defineProperty(exports, "R3NgModuleMetadataKind", { enumerable: true, get: function () { return r3_module_compiler_1.R3NgModuleMetadataKind; } });
Object.defineProperty(exports, "R3SelectorScopeMode", { enumerable: true, get: function () { return r3_module_compiler_1.R3SelectorScopeMode; } });
var r3_pipe_compiler_1 = require("./render3/r3_pipe_compiler");
Object.defineProperty(exports, "compilePipeFromMetadata", { enumerable: true, get: function () { return r3_pipe_compiler_1.compilePipeFromMetadata; } });
var util_2 = require("./render3/util");
Object.defineProperty(exports, "createMayBeForwardRefExpression", { enumerable: true, get: function () { return util_2.createMayBeForwardRefExpression; } });
Object.defineProperty(exports, "devOnlyGuardedExpression", { enumerable: true, get: function () { return util_2.devOnlyGuardedExpression; } });
Object.defineProperty(exports, "getSafePropertyAccessString", { enumerable: true, get: function () { return util_2.getSafePropertyAccessString; } });
__exportStar(require("./render3/view/api"), exports);
var compiler_1 = require("./render3/view/compiler");
Object.defineProperty(exports, "compileComponentFromMetadata", { enumerable: true, get: function () { return compiler_1.compileComponentFromMetadata; } });
Object.defineProperty(exports, "compileDeferResolverFunction", { enumerable: true, get: function () { return compiler_1.compileDeferResolverFunction; } });
Object.defineProperty(exports, "compileDirectiveFromMetadata", { enumerable: true, get: function () { return compiler_1.compileDirectiveFromMetadata; } });
Object.defineProperty(exports, "encapsulateStyle", { enumerable: true, get: function () { return compiler_1.encapsulateStyle; } });
Object.defineProperty(exports, "parseHostBindings", { enumerable: true, get: function () { return compiler_1.parseHostBindings; } });
Object.defineProperty(exports, "verifyHostBindings", { enumerable: true, get: function () { return compiler_1.verifyHostBindings; } });
__exportStar(require("./render3/view/t2_api"), exports);
__exportStar(require("./render3/view/t2_binder"), exports);
var template_1 = require("./render3/view/template");
Object.defineProperty(exports, "makeBindingParser", { enumerable: true, get: function () { return template_1.makeBindingParser; } });
Object.defineProperty(exports, "parseTemplate", { enumerable: true, get: function () { return template_1.parseTemplate; } });
var combined_visitor_1 = require("./combined_visitor");
Object.defineProperty(exports, "CombinedRecursiveAstVisitor", { enumerable: true, get: function () { return combined_visitor_1.CombinedRecursiveAstVisitor; } });
var util_3 = require("./render3/view/util");
Object.defineProperty(exports, "createCssSelectorFromNode", { enumerable: true, get: function () { return util_3.createCssSelectorFromNode; } });
__exportStar(require("./resource_loader"), exports);
__exportStar(require("./schema/dom_element_schema_registry"), exports);
__exportStar(require("./schema/element_schema_registry"), exports);
__exportStar(require("./directive_matching"), exports);
var util_4 = require("./util");
Object.defineProperty(exports, "Version", { enumerable: true, get: function () { return util_4.Version; } });
__exportStar(require("./version"), exports);
// This file only reexports content of the `src` folder. Keep it that way.
// This function call has a global side effects and publishes the compiler into global namespace for
// the late binding of the Compiler to the @angular/core for jit compilation.
(0, jit_compiler_facade_1.publishFacade)(util_1.global);
