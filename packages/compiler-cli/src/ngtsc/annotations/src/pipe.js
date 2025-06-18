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
exports.PipeDecoratorHandler = exports.PipeSymbol = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../diagnostics");
const imports_1 = require("../../imports");
const semantic_graph_1 = require("../../incremental/semantic_graph");
const metadata_1 = require("../../metadata");
const perf_1 = require("../../perf");
const reflection_1 = require("../../reflection");
const transform_1 = require("../../transform");
const common_1 = require("../common");
/**
 * Represents an Angular pipe.
 */
class PipeSymbol extends semantic_graph_1.SemanticSymbol {
    constructor(decl, name) {
        super(decl);
        this.name = name;
    }
    isPublicApiAffected(previousSymbol) {
        if (!(previousSymbol instanceof PipeSymbol)) {
            return true;
        }
        return this.name !== previousSymbol.name;
    }
    isTypeCheckApiAffected(previousSymbol) {
        return this.isPublicApiAffected(previousSymbol);
    }
}
exports.PipeSymbol = PipeSymbol;
class PipeDecoratorHandler {
    constructor(reflector, evaluator, metaRegistry, scopeRegistry, injectableRegistry, isCore, perf, includeClassMetadata, compilationMode, generateExtraImportsInLocalMode, strictStandalone, implicitStandaloneValue) {
        this.reflector = reflector;
        this.evaluator = evaluator;
        this.metaRegistry = metaRegistry;
        this.scopeRegistry = scopeRegistry;
        this.injectableRegistry = injectableRegistry;
        this.isCore = isCore;
        this.perf = perf;
        this.includeClassMetadata = includeClassMetadata;
        this.compilationMode = compilationMode;
        this.generateExtraImportsInLocalMode = generateExtraImportsInLocalMode;
        this.strictStandalone = strictStandalone;
        this.implicitStandaloneValue = implicitStandaloneValue;
        this.precedence = transform_1.HandlerPrecedence.PRIMARY;
        this.name = 'PipeDecoratorHandler';
    }
    detect(node, decorators) {
        if (!decorators) {
            return undefined;
        }
        const decorator = (0, common_1.findAngularDecorator)(decorators, 'Pipe', this.isCore);
        if (decorator !== undefined) {
            return {
                trigger: decorator.node,
                decorator: decorator,
                metadata: decorator,
            };
        }
        else {
            return undefined;
        }
    }
    analyze(clazz, decorator) {
        var _a;
        this.perf.eventCount(perf_1.PerfEvent.AnalyzePipe);
        const name = clazz.name.text;
        const type = (0, common_1.wrapTypeReference)(this.reflector, clazz);
        if (decorator.args === null) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_NOT_CALLED, decorator.node, `@Pipe must be called`);
        }
        if (decorator.args.length !== 1) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, '@Pipe must have exactly one argument');
        }
        const meta = (0, common_1.unwrapExpression)(decorator.args[0]);
        if (!typescript_1.default.isObjectLiteralExpression(meta)) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARG_NOT_LITERAL, meta, '@Pipe must have a literal argument');
        }
        const pipe = (0, reflection_1.reflectObjectLiteral)(meta);
        if (!pipe.has('name')) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.PIPE_MISSING_NAME, meta, `@Pipe decorator is missing name field`);
        }
        const pipeNameExpr = pipe.get('name');
        const pipeName = this.evaluator.evaluate(pipeNameExpr);
        if (typeof pipeName !== 'string') {
            throw (0, common_1.createValueHasWrongTypeError)(pipeNameExpr, pipeName, `@Pipe.name must be a string`);
        }
        let pure = true;
        if (pipe.has('pure')) {
            const expr = pipe.get('pure');
            const pureValue = this.evaluator.evaluate(expr);
            if (typeof pureValue !== 'boolean') {
                throw (0, common_1.createValueHasWrongTypeError)(expr, pureValue, `@Pipe.pure must be a boolean`);
            }
            pure = pureValue;
        }
        let isStandalone = this.implicitStandaloneValue;
        if (pipe.has('standalone')) {
            const expr = pipe.get('standalone');
            const resolved = this.evaluator.evaluate(expr);
            if (typeof resolved !== 'boolean') {
                throw (0, common_1.createValueHasWrongTypeError)(expr, resolved, `standalone flag must be a boolean`);
            }
            isStandalone = resolved;
            if (!isStandalone && this.strictStandalone) {
                throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.NON_STANDALONE_NOT_ALLOWED, expr, `Only standalone pipes are allowed when 'strictStandalone' is enabled.`);
            }
        }
        return {
            analysis: {
                meta: {
                    name,
                    type,
                    typeArgumentCount: this.reflector.getGenericArityOfClass(clazz) || 0,
                    pipeName,
                    deps: (0, common_1.getValidConstructorDependencies)(clazz, this.reflector, this.isCore),
                    pure,
                    isStandalone,
                },
                classMetadata: this.includeClassMetadata
                    ? (0, common_1.extractClassMetadata)(clazz, this.reflector, this.isCore)
                    : null,
                pipeNameExpr,
                decorator: (_a = decorator === null || decorator === void 0 ? void 0 : decorator.node) !== null && _a !== void 0 ? _a : null,
            },
        };
    }
    symbol(node, analysis) {
        return new PipeSymbol(node, analysis.meta.pipeName);
    }
    register(node, analysis) {
        const ref = new imports_1.Reference(node);
        this.metaRegistry.registerPipeMetadata({
            kind: metadata_1.MetaKind.Pipe,
            ref,
            name: analysis.meta.pipeName,
            nameExpr: analysis.pipeNameExpr,
            isStandalone: analysis.meta.isStandalone,
            decorator: analysis.decorator,
            isExplicitlyDeferred: false,
            isPure: analysis.meta.pure,
        });
        this.injectableRegistry.registerInjectable(node, {
            ctorDeps: analysis.meta.deps,
        });
    }
    resolve(node) {
        if (this.compilationMode === transform_1.CompilationMode.LOCAL) {
            return {};
        }
        const duplicateDeclData = this.scopeRegistry.getDuplicateDeclarations(node);
        if (duplicateDeclData !== null) {
            // This pipe was declared twice (or more).
            return {
                diagnostics: [(0, common_1.makeDuplicateDeclarationError)(node, duplicateDeclData, 'Pipe')],
            };
        }
        return {};
    }
    compileFull(node, analysis) {
        const fac = (0, common_1.compileNgFactoryDefField)((0, common_1.toFactoryMetadata)(analysis.meta, compiler_1.FactoryTarget.Pipe));
        const def = (0, compiler_1.compilePipeFromMetadata)(analysis.meta);
        const classMetadata = analysis.classMetadata !== null
            ? (0, compiler_1.compileClassMetadata)(analysis.classMetadata).toStmt()
            : null;
        return (0, common_1.compileResults)(fac, def, classMetadata, 'ɵpipe', null, null /* deferrableImports */);
    }
    compilePartial(node, analysis) {
        const fac = (0, common_1.compileDeclareFactory)((0, common_1.toFactoryMetadata)(analysis.meta, compiler_1.FactoryTarget.Pipe));
        const def = (0, compiler_1.compileDeclarePipeFromMetadata)(analysis.meta);
        const classMetadata = analysis.classMetadata !== null
            ? (0, compiler_1.compileDeclareClassMetadata)(analysis.classMetadata).toStmt()
            : null;
        return (0, common_1.compileResults)(fac, def, classMetadata, 'ɵpipe', null, null /* deferrableImports */);
    }
    compileLocal(node, analysis) {
        const fac = (0, common_1.compileNgFactoryDefField)((0, common_1.toFactoryMetadata)(analysis.meta, compiler_1.FactoryTarget.Pipe));
        const def = (0, compiler_1.compilePipeFromMetadata)(analysis.meta);
        const classMetadata = analysis.classMetadata !== null
            ? (0, compiler_1.compileClassMetadata)(analysis.classMetadata).toStmt()
            : null;
        return (0, common_1.compileResults)(fac, def, classMetadata, 'ɵpipe', null, null /* deferrableImports */);
    }
}
exports.PipeDecoratorHandler = PipeDecoratorHandler;
