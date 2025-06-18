"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerFacadeImpl = void 0;
exports.publishFacade = publishFacade;
const constant_pool_1 = require("./constant_pool");
const core_1 = require("./core");
const injectable_compiler_2_1 = require("./injectable_compiler_2");
const defaults_1 = require("./ml_parser/defaults");
const output_ast_1 = require("./output/output_ast");
const output_jit_1 = require("./output/output_jit");
const parse_util_1 = require("./parse_util");
const r3_factory_1 = require("./render3/r3_factory");
const r3_injector_compiler_1 = require("./render3/r3_injector_compiler");
const r3_jit_1 = require("./render3/r3_jit");
const r3_module_compiler_1 = require("./render3/r3_module_compiler");
const r3_pipe_compiler_1 = require("./render3/r3_pipe_compiler");
const util_1 = require("./render3/util");
const api_1 = require("./render3/view/api");
const compiler_1 = require("./render3/view/compiler");
const t2_binder_1 = require("./render3/view/t2_binder");
const template_1 = require("./render3/view/template");
const resource_loader_1 = require("./resource_loader");
const dom_element_schema_registry_1 = require("./schema/dom_element_schema_registry");
const util_2 = require("./util");
class CompilerFacadeImpl {
    constructor(jitEvaluator = new output_jit_1.JitEvaluator()) {
        this.jitEvaluator = jitEvaluator;
        this.FactoryTarget = r3_factory_1.FactoryTarget;
        this.ResourceLoader = resource_loader_1.ResourceLoader;
        this.elementSchemaRegistry = new dom_element_schema_registry_1.DomElementSchemaRegistry();
    }
    compilePipe(angularCoreEnv, sourceMapUrl, facade) {
        const metadata = {
            name: facade.name,
            type: (0, util_1.wrapReference)(facade.type),
            typeArgumentCount: 0,
            deps: null,
            pipeName: facade.pipeName,
            pure: facade.pure,
            isStandalone: facade.isStandalone,
        };
        const res = (0, r3_pipe_compiler_1.compilePipeFromMetadata)(metadata);
        return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
    }
    compilePipeDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
        const meta = convertDeclarePipeFacadeToMetadata(declaration);
        const res = (0, r3_pipe_compiler_1.compilePipeFromMetadata)(meta);
        return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
    }
    compileInjectable(angularCoreEnv, sourceMapUrl, facade) {
        var _a;
        const { expression, statements } = (0, injectable_compiler_2_1.compileInjectable)({
            name: facade.name,
            type: (0, util_1.wrapReference)(facade.type),
            typeArgumentCount: facade.typeArgumentCount,
            providedIn: computeProvidedIn(facade.providedIn),
            useClass: convertToProviderExpression(facade, 'useClass'),
            useFactory: wrapExpression(facade, 'useFactory'),
            useValue: convertToProviderExpression(facade, 'useValue'),
            useExisting: convertToProviderExpression(facade, 'useExisting'),
            deps: (_a = facade.deps) === null || _a === void 0 ? void 0 : _a.map(convertR3DependencyMetadata),
        }, 
        /* resolveForwardRefs */ true);
        return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, statements);
    }
    compileInjectableDeclaration(angularCoreEnv, sourceMapUrl, facade) {
        var _a;
        const { expression, statements } = (0, injectable_compiler_2_1.compileInjectable)({
            name: facade.type.name,
            type: (0, util_1.wrapReference)(facade.type),
            typeArgumentCount: 0,
            providedIn: computeProvidedIn(facade.providedIn),
            useClass: convertToProviderExpression(facade, 'useClass'),
            useFactory: wrapExpression(facade, 'useFactory'),
            useValue: convertToProviderExpression(facade, 'useValue'),
            useExisting: convertToProviderExpression(facade, 'useExisting'),
            deps: (_a = facade.deps) === null || _a === void 0 ? void 0 : _a.map(convertR3DeclareDependencyMetadata),
        }, 
        /* resolveForwardRefs */ true);
        return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, statements);
    }
    compileInjector(angularCoreEnv, sourceMapUrl, facade) {
        const meta = {
            name: facade.name,
            type: (0, util_1.wrapReference)(facade.type),
            providers: facade.providers && facade.providers.length > 0
                ? new output_ast_1.WrappedNodeExpr(facade.providers)
                : null,
            imports: facade.imports.map((i) => new output_ast_1.WrappedNodeExpr(i)),
        };
        const res = (0, r3_injector_compiler_1.compileInjector)(meta);
        return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
    }
    compileInjectorDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
        const meta = convertDeclareInjectorFacadeToMetadata(declaration);
        const res = (0, r3_injector_compiler_1.compileInjector)(meta);
        return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
    }
    compileNgModule(angularCoreEnv, sourceMapUrl, facade) {
        const meta = {
            kind: r3_module_compiler_1.R3NgModuleMetadataKind.Global,
            type: (0, util_1.wrapReference)(facade.type),
            bootstrap: facade.bootstrap.map(util_1.wrapReference),
            declarations: facade.declarations.map(util_1.wrapReference),
            publicDeclarationTypes: null, // only needed for types in AOT
            imports: facade.imports.map(util_1.wrapReference),
            includeImportTypes: true,
            exports: facade.exports.map(util_1.wrapReference),
            selectorScopeMode: r3_module_compiler_1.R3SelectorScopeMode.Inline,
            containsForwardDecls: false,
            schemas: facade.schemas ? facade.schemas.map(util_1.wrapReference) : null,
            id: facade.id ? new output_ast_1.WrappedNodeExpr(facade.id) : null,
        };
        const res = (0, r3_module_compiler_1.compileNgModule)(meta);
        return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
    }
    compileNgModuleDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
        const expression = (0, r3_module_compiler_1.compileNgModuleDeclarationExpression)(declaration);
        return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, []);
    }
    compileDirective(angularCoreEnv, sourceMapUrl, facade) {
        const meta = convertDirectiveFacadeToMetadata(facade);
        return this.compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta);
    }
    compileDirectiveDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
        const typeSourceSpan = this.createParseSourceSpan('Directive', declaration.type.name, sourceMapUrl);
        const meta = convertDeclareDirectiveFacadeToMetadata(declaration, typeSourceSpan);
        return this.compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta);
    }
    compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta) {
        const constantPool = new constant_pool_1.ConstantPool();
        const bindingParser = (0, template_1.makeBindingParser)();
        const res = (0, compiler_1.compileDirectiveFromMetadata)(meta, constantPool, bindingParser);
        return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, constantPool.statements);
    }
    compileComponent(angularCoreEnv, sourceMapUrl, facade) {
        var _a;
        // Parse the template and check for errors.
        const { template, interpolation, defer } = parseJitTemplate(facade.template, facade.name, sourceMapUrl, facade.preserveWhitespaces, facade.interpolation, undefined);
        // Compile the component metadata, including template, into an expression.
        const meta = Object.assign(Object.assign(Object.assign({}, facade), convertDirectiveFacadeToMetadata(facade)), { selector: facade.selector || this.elementSchemaRegistry.getDefaultComponentElementName(), template, declarations: facade.declarations.map(convertDeclarationFacadeToMetadata), declarationListEmitMode: 0 /* DeclarationListEmitMode.Direct */, defer, styles: [...facade.styles, ...template.styles], encapsulation: facade.encapsulation, interpolation, changeDetection: (_a = facade.changeDetection) !== null && _a !== void 0 ? _a : null, animations: facade.animations != null ? new output_ast_1.WrappedNodeExpr(facade.animations) : null, viewProviders: facade.viewProviders != null ? new output_ast_1.WrappedNodeExpr(facade.viewProviders) : null, relativeContextFilePath: '', i18nUseExternalIds: true, relativeTemplatePath: null });
        const jitExpressionSourceMap = `ng:///${facade.name}.js`;
        return this.compileComponentFromMeta(angularCoreEnv, jitExpressionSourceMap, meta);
    }
    compileComponentDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
        const typeSourceSpan = this.createParseSourceSpan('Component', declaration.type.name, sourceMapUrl);
        const meta = convertDeclareComponentFacadeToMetadata(declaration, typeSourceSpan, sourceMapUrl);
        return this.compileComponentFromMeta(angularCoreEnv, sourceMapUrl, meta);
    }
    compileComponentFromMeta(angularCoreEnv, sourceMapUrl, meta) {
        const constantPool = new constant_pool_1.ConstantPool();
        const bindingParser = (0, template_1.makeBindingParser)(meta.interpolation);
        const res = (0, compiler_1.compileComponentFromMetadata)(meta, constantPool, bindingParser);
        return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, constantPool.statements);
    }
    compileFactory(angularCoreEnv, sourceMapUrl, meta) {
        const factoryRes = (0, r3_factory_1.compileFactoryFunction)({
            name: meta.name,
            type: (0, util_1.wrapReference)(meta.type),
            typeArgumentCount: meta.typeArgumentCount,
            deps: convertR3DependencyMetadataArray(meta.deps),
            target: meta.target,
        });
        return this.jitExpression(factoryRes.expression, angularCoreEnv, sourceMapUrl, factoryRes.statements);
    }
    compileFactoryDeclaration(angularCoreEnv, sourceMapUrl, meta) {
        const factoryRes = (0, r3_factory_1.compileFactoryFunction)({
            name: meta.type.name,
            type: (0, util_1.wrapReference)(meta.type),
            typeArgumentCount: 0,
            deps: Array.isArray(meta.deps)
                ? meta.deps.map(convertR3DeclareDependencyMetadata)
                : meta.deps,
            target: meta.target,
        });
        return this.jitExpression(factoryRes.expression, angularCoreEnv, sourceMapUrl, factoryRes.statements);
    }
    createParseSourceSpan(kind, typeName, sourceUrl) {
        return (0, parse_util_1.r3JitTypeSourceSpan)(kind, typeName, sourceUrl);
    }
    /**
     * JIT compiles an expression and returns the result of executing that expression.
     *
     * @param def the definition which will be compiled and executed to get the value to patch
     * @param context an object map of @angular/core symbol names to symbols which will be available
     * in the context of the compiled expression
     * @param sourceUrl a URL to use for the source map of the compiled expression
     * @param preStatements a collection of statements that should be evaluated before the expression.
     */
    jitExpression(def, context, sourceUrl, preStatements) {
        // The ConstantPool may contain Statements which declare variables used in the final expression.
        // Therefore, its statements need to precede the actual JIT operation. The final statement is a
        // declaration of $def which is set to the expression being compiled.
        const statements = [
            ...preStatements,
            new output_ast_1.DeclareVarStmt('$def', def, undefined, output_ast_1.StmtModifier.Exported),
        ];
        const res = this.jitEvaluator.evaluateStatements(sourceUrl, statements, new r3_jit_1.R3JitReflector(context), 
        /* enableSourceMaps */ true);
        return res['$def'];
    }
}
exports.CompilerFacadeImpl = CompilerFacadeImpl;
function convertToR3QueryMetadata(facade) {
    return Object.assign(Object.assign({}, facade), { isSignal: facade.isSignal, predicate: convertQueryPredicate(facade.predicate), read: facade.read ? new output_ast_1.WrappedNodeExpr(facade.read) : null, static: facade.static, emitDistinctChangesOnly: facade.emitDistinctChangesOnly });
}
function convertQueryDeclarationToMetadata(declaration) {
    var _a, _b, _c, _d;
    return {
        propertyName: declaration.propertyName,
        first: (_a = declaration.first) !== null && _a !== void 0 ? _a : false,
        predicate: convertQueryPredicate(declaration.predicate),
        descendants: (_b = declaration.descendants) !== null && _b !== void 0 ? _b : false,
        read: declaration.read ? new output_ast_1.WrappedNodeExpr(declaration.read) : null,
        static: (_c = declaration.static) !== null && _c !== void 0 ? _c : false,
        emitDistinctChangesOnly: (_d = declaration.emitDistinctChangesOnly) !== null && _d !== void 0 ? _d : true,
        isSignal: !!declaration.isSignal,
    };
}
function convertQueryPredicate(predicate) {
    return Array.isArray(predicate)
        ? // The predicate is an array of strings so pass it through.
            predicate
        : // The predicate is a type - assume that we will need to unwrap any `forwardRef()` calls.
            (0, util_1.createMayBeForwardRefExpression)(new output_ast_1.WrappedNodeExpr(predicate), 1 /* ForwardRefHandling.Wrapped */);
}
function convertDirectiveFacadeToMetadata(facade) {
    var _a;
    const inputsFromMetadata = parseInputsArray(facade.inputs || []);
    const outputsFromMetadata = parseMappingStringArray(facade.outputs || []);
    const propMetadata = facade.propMetadata;
    const inputsFromType = {};
    const outputsFromType = {};
    for (const field in propMetadata) {
        if (propMetadata.hasOwnProperty(field)) {
            propMetadata[field].forEach((ann) => {
                if (isInput(ann)) {
                    inputsFromType[field] = {
                        bindingPropertyName: ann.alias || field,
                        classPropertyName: field,
                        required: ann.required || false,
                        // For JIT, decorators are used to declare signal inputs. That is because of
                        // a technical limitation where it's not possible to statically reflect class
                        // members of a directive/component at runtime before instantiating the class.
                        isSignal: !!ann.isSignal,
                        transformFunction: ann.transform != null ? new output_ast_1.WrappedNodeExpr(ann.transform) : null,
                    };
                }
                else if (isOutput(ann)) {
                    outputsFromType[field] = ann.alias || field;
                }
            });
        }
    }
    const hostDirectives = ((_a = facade.hostDirectives) === null || _a === void 0 ? void 0 : _a.length)
        ? facade.hostDirectives.map((hostDirective) => {
            return typeof hostDirective === 'function'
                ? {
                    directive: (0, util_1.wrapReference)(hostDirective),
                    inputs: null,
                    outputs: null,
                    isForwardReference: false,
                }
                : {
                    directive: (0, util_1.wrapReference)(hostDirective.directive),
                    isForwardReference: false,
                    inputs: hostDirective.inputs ? parseMappingStringArray(hostDirective.inputs) : null,
                    outputs: hostDirective.outputs
                        ? parseMappingStringArray(hostDirective.outputs)
                        : null,
                };
        })
        : null;
    return Object.assign(Object.assign({}, facade), { typeArgumentCount: 0, typeSourceSpan: facade.typeSourceSpan, type: (0, util_1.wrapReference)(facade.type), deps: null, host: Object.assign({}, extractHostBindings(facade.propMetadata, facade.typeSourceSpan, facade.host)), inputs: Object.assign(Object.assign({}, inputsFromMetadata), inputsFromType), outputs: Object.assign(Object.assign({}, outputsFromMetadata), outputsFromType), queries: facade.queries.map(convertToR3QueryMetadata), providers: facade.providers != null ? new output_ast_1.WrappedNodeExpr(facade.providers) : null, viewQueries: facade.viewQueries.map(convertToR3QueryMetadata), fullInheritance: false, hostDirectives });
}
function convertDeclareDirectiveFacadeToMetadata(declaration, typeSourceSpan) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const hostDirectives = ((_a = declaration.hostDirectives) === null || _a === void 0 ? void 0 : _a.length)
        ? declaration.hostDirectives.map((dir) => ({
            directive: (0, util_1.wrapReference)(dir.directive),
            isForwardReference: false,
            inputs: dir.inputs ? getHostDirectiveBindingMapping(dir.inputs) : null,
            outputs: dir.outputs ? getHostDirectiveBindingMapping(dir.outputs) : null,
        }))
        : null;
    return {
        name: declaration.type.name,
        type: (0, util_1.wrapReference)(declaration.type),
        typeSourceSpan,
        selector: (_b = declaration.selector) !== null && _b !== void 0 ? _b : null,
        inputs: declaration.inputs ? inputsPartialMetadataToInputMetadata(declaration.inputs) : {},
        outputs: (_c = declaration.outputs) !== null && _c !== void 0 ? _c : {},
        host: convertHostDeclarationToMetadata(declaration.host),
        queries: ((_d = declaration.queries) !== null && _d !== void 0 ? _d : []).map(convertQueryDeclarationToMetadata),
        viewQueries: ((_e = declaration.viewQueries) !== null && _e !== void 0 ? _e : []).map(convertQueryDeclarationToMetadata),
        providers: declaration.providers !== undefined ? new output_ast_1.WrappedNodeExpr(declaration.providers) : null,
        exportAs: (_f = declaration.exportAs) !== null && _f !== void 0 ? _f : null,
        usesInheritance: (_g = declaration.usesInheritance) !== null && _g !== void 0 ? _g : false,
        lifecycle: { usesOnChanges: (_h = declaration.usesOnChanges) !== null && _h !== void 0 ? _h : false },
        deps: null,
        typeArgumentCount: 0,
        fullInheritance: false,
        isStandalone: (_j = declaration.isStandalone) !== null && _j !== void 0 ? _j : (0, util_2.getJitStandaloneDefaultForVersion)(declaration.version),
        isSignal: (_k = declaration.isSignal) !== null && _k !== void 0 ? _k : false,
        hostDirectives,
    };
}
function convertHostDeclarationToMetadata(host = {}) {
    var _a, _b, _c;
    return {
        attributes: convertOpaqueValuesToExpressions((_a = host.attributes) !== null && _a !== void 0 ? _a : {}),
        listeners: (_b = host.listeners) !== null && _b !== void 0 ? _b : {},
        properties: (_c = host.properties) !== null && _c !== void 0 ? _c : {},
        specialAttributes: {
            classAttr: host.classAttribute,
            styleAttr: host.styleAttribute,
        },
    };
}
/**
 * Parses a host directive mapping where each odd array key is the name of an input/output
 * and each even key is its public name, e.g. `['one', 'oneAlias', 'two', 'two']`.
 */
function getHostDirectiveBindingMapping(array) {
    let result = null;
    for (let i = 1; i < array.length; i += 2) {
        result = result || {};
        result[array[i - 1]] = array[i];
    }
    return result;
}
function convertOpaqueValuesToExpressions(obj) {
    const result = {};
    for (const key of Object.keys(obj)) {
        result[key] = new output_ast_1.WrappedNodeExpr(obj[key]);
    }
    return result;
}
function convertDeclareComponentFacadeToMetadata(decl, typeSourceSpan, sourceMapUrl) {
    var _a, _b, _c, _d;
    const { template, interpolation, defer } = parseJitTemplate(decl.template, decl.type.name, sourceMapUrl, (_a = decl.preserveWhitespaces) !== null && _a !== void 0 ? _a : false, decl.interpolation, decl.deferBlockDependencies);
    const declarations = [];
    if (decl.dependencies) {
        for (const innerDep of decl.dependencies) {
            switch (innerDep.kind) {
                case 'directive':
                case 'component':
                    declarations.push(convertDirectiveDeclarationToMetadata(innerDep));
                    break;
                case 'pipe':
                    declarations.push(convertPipeDeclarationToMetadata(innerDep));
                    break;
            }
        }
    }
    else if (decl.components || decl.directives || decl.pipes) {
        // Existing declarations on NPM may not be using the new `dependencies` merged field, and may
        // have separate fields for dependencies instead. Unify them for JIT compilation.
        decl.components &&
            declarations.push(...decl.components.map((dir) => convertDirectiveDeclarationToMetadata(dir, /* isComponent */ true)));
        decl.directives &&
            declarations.push(...decl.directives.map((dir) => convertDirectiveDeclarationToMetadata(dir)));
        decl.pipes && declarations.push(...convertPipeMapToMetadata(decl.pipes));
    }
    return Object.assign(Object.assign({}, convertDeclareDirectiveFacadeToMetadata(decl, typeSourceSpan)), { template, styles: (_b = decl.styles) !== null && _b !== void 0 ? _b : [], declarations, viewProviders: decl.viewProviders !== undefined ? new output_ast_1.WrappedNodeExpr(decl.viewProviders) : null, animations: decl.animations !== undefined ? new output_ast_1.WrappedNodeExpr(decl.animations) : null, defer, changeDetection: (_c = decl.changeDetection) !== null && _c !== void 0 ? _c : core_1.ChangeDetectionStrategy.Default, encapsulation: (_d = decl.encapsulation) !== null && _d !== void 0 ? _d : core_1.ViewEncapsulation.Emulated, interpolation, declarationListEmitMode: 2 /* DeclarationListEmitMode.ClosureResolved */, relativeContextFilePath: '', i18nUseExternalIds: true, relativeTemplatePath: null });
}
function convertDeclarationFacadeToMetadata(declaration) {
    return Object.assign(Object.assign({}, declaration), { type: new output_ast_1.WrappedNodeExpr(declaration.type) });
}
function convertDirectiveDeclarationToMetadata(declaration, isComponent = null) {
    var _a, _b, _c;
    return {
        kind: api_1.R3TemplateDependencyKind.Directive,
        isComponent: isComponent || declaration.kind === 'component',
        selector: declaration.selector,
        type: new output_ast_1.WrappedNodeExpr(declaration.type),
        inputs: (_a = declaration.inputs) !== null && _a !== void 0 ? _a : [],
        outputs: (_b = declaration.outputs) !== null && _b !== void 0 ? _b : [],
        exportAs: (_c = declaration.exportAs) !== null && _c !== void 0 ? _c : null,
    };
}
function convertPipeMapToMetadata(pipes) {
    if (!pipes) {
        return [];
    }
    return Object.keys(pipes).map((name) => {
        return {
            kind: api_1.R3TemplateDependencyKind.Pipe,
            name,
            type: new output_ast_1.WrappedNodeExpr(pipes[name]),
        };
    });
}
function convertPipeDeclarationToMetadata(pipe) {
    return {
        kind: api_1.R3TemplateDependencyKind.Pipe,
        name: pipe.name,
        type: new output_ast_1.WrappedNodeExpr(pipe.type),
    };
}
function parseJitTemplate(template, typeName, sourceMapUrl, preserveWhitespaces, interpolation, deferBlockDependencies) {
    const interpolationConfig = interpolation
        ? defaults_1.InterpolationConfig.fromArray(interpolation)
        : defaults_1.DEFAULT_INTERPOLATION_CONFIG;
    // Parse the template and check for errors.
    const parsed = (0, template_1.parseTemplate)(template, sourceMapUrl, {
        preserveWhitespaces,
        interpolationConfig,
    });
    if (parsed.errors !== null) {
        const errors = parsed.errors.map((err) => err.toString()).join(', ');
        throw new Error(`Errors during JIT compilation of template for ${typeName}: ${errors}`);
    }
    const binder = new t2_binder_1.R3TargetBinder(null);
    const boundTarget = binder.bind({ template: parsed.nodes });
    return {
        template: parsed,
        interpolation: interpolationConfig,
        defer: createR3ComponentDeferMetadata(boundTarget, deferBlockDependencies),
    };
}
/**
 * Convert the expression, if present to an `R3ProviderExpression`.
 *
 * In JIT mode we do not want the compiler to wrap the expression in a `forwardRef()` call because,
 * if it is referencing a type that has not yet been defined, it will have already been wrapped in
 * a `forwardRef()` - either by the application developer or during partial-compilation. Thus we can
 * use `ForwardRefHandling.None`.
 */
function convertToProviderExpression(obj, property) {
    if (obj.hasOwnProperty(property)) {
        return (0, util_1.createMayBeForwardRefExpression)(new output_ast_1.WrappedNodeExpr(obj[property]), 0 /* ForwardRefHandling.None */);
    }
    else {
        return undefined;
    }
}
function wrapExpression(obj, property) {
    if (obj.hasOwnProperty(property)) {
        return new output_ast_1.WrappedNodeExpr(obj[property]);
    }
    else {
        return undefined;
    }
}
function computeProvidedIn(providedIn) {
    const expression = typeof providedIn === 'function'
        ? new output_ast_1.WrappedNodeExpr(providedIn)
        : new output_ast_1.LiteralExpr(providedIn !== null && providedIn !== void 0 ? providedIn : null);
    // See `convertToProviderExpression()` for why this uses `ForwardRefHandling.None`.
    return (0, util_1.createMayBeForwardRefExpression)(expression, 0 /* ForwardRefHandling.None */);
}
function convertR3DependencyMetadataArray(facades) {
    return facades == null ? null : facades.map(convertR3DependencyMetadata);
}
function convertR3DependencyMetadata(facade) {
    const isAttributeDep = facade.attribute != null; // both `null` and `undefined`
    const rawToken = facade.token === null ? null : new output_ast_1.WrappedNodeExpr(facade.token);
    // In JIT mode, if the dep is an `@Attribute()` then we use the attribute name given in
    // `attribute` rather than the `token`.
    const token = isAttributeDep ? new output_ast_1.WrappedNodeExpr(facade.attribute) : rawToken;
    return createR3DependencyMetadata(token, isAttributeDep, facade.host, facade.optional, facade.self, facade.skipSelf);
}
function convertR3DeclareDependencyMetadata(facade) {
    var _a, _b, _c, _d, _e;
    const isAttributeDep = (_a = facade.attribute) !== null && _a !== void 0 ? _a : false;
    const token = facade.token === null ? null : new output_ast_1.WrappedNodeExpr(facade.token);
    return createR3DependencyMetadata(token, isAttributeDep, (_b = facade.host) !== null && _b !== void 0 ? _b : false, (_c = facade.optional) !== null && _c !== void 0 ? _c : false, (_d = facade.self) !== null && _d !== void 0 ? _d : false, (_e = facade.skipSelf) !== null && _e !== void 0 ? _e : false);
}
function createR3DependencyMetadata(token, isAttributeDep, host, optional, self, skipSelf) {
    // If the dep is an `@Attribute()` the `attributeNameType` ought to be the `unknown` type.
    // But types are not available at runtime so we just use a literal `"<unknown>"` string as a dummy
    // marker.
    const attributeNameType = isAttributeDep ? (0, output_ast_1.literal)('unknown') : null;
    return { token, attributeNameType, host, optional, self, skipSelf };
}
function createR3ComponentDeferMetadata(boundTarget, deferBlockDependencies) {
    const deferredBlocks = boundTarget.getDeferBlocks();
    const blocks = new Map();
    for (let i = 0; i < deferredBlocks.length; i++) {
        const dependencyFn = deferBlockDependencies === null || deferBlockDependencies === void 0 ? void 0 : deferBlockDependencies[i];
        blocks.set(deferredBlocks[i], dependencyFn ? new output_ast_1.WrappedNodeExpr(dependencyFn) : null);
    }
    return { mode: 0 /* DeferBlockDepsEmitMode.PerBlock */, blocks };
}
function extractHostBindings(propMetadata, sourceSpan, host) {
    // First parse the declarations from the metadata.
    const bindings = (0, compiler_1.parseHostBindings)(host || {});
    // After that check host bindings for errors
    const errors = (0, compiler_1.verifyHostBindings)(bindings, sourceSpan);
    if (errors.length) {
        throw new Error(errors.map((error) => error.msg).join('\n'));
    }
    // Next, loop over the properties of the object, looking for @HostBinding and @HostListener.
    for (const field in propMetadata) {
        if (propMetadata.hasOwnProperty(field)) {
            propMetadata[field].forEach((ann) => {
                if (isHostBinding(ann)) {
                    // Since this is a decorator, we know that the value is a class member. Always access it
                    // through `this` so that further down the line it can't be confused for a literal value
                    // (e.g. if there's a property called `true`).
                    bindings.properties[ann.hostPropertyName || field] = (0, util_1.getSafePropertyAccessString)('this', field);
                }
                else if (isHostListener(ann)) {
                    bindings.listeners[ann.eventName || field] = `${field}(${(ann.args || []).join(',')})`;
                }
            });
        }
    }
    return bindings;
}
function isHostBinding(value) {
    return value.ngMetadataName === 'HostBinding';
}
function isHostListener(value) {
    return value.ngMetadataName === 'HostListener';
}
function isInput(value) {
    return value.ngMetadataName === 'Input';
}
function isOutput(value) {
    return value.ngMetadataName === 'Output';
}
function inputsPartialMetadataToInputMetadata(inputs) {
    return Object.keys(inputs).reduce((result, minifiedClassName) => {
        const value = inputs[minifiedClassName];
        // Handle legacy partial input output.
        if (typeof value === 'string' || Array.isArray(value)) {
            result[minifiedClassName] = parseLegacyInputPartialOutput(value);
        }
        else {
            result[minifiedClassName] = {
                bindingPropertyName: value.publicName,
                classPropertyName: minifiedClassName,
                transformFunction: value.transformFunction !== null ? new output_ast_1.WrappedNodeExpr(value.transformFunction) : null,
                required: value.isRequired,
                isSignal: value.isSignal,
            };
        }
        return result;
    }, {});
}
/**
 * Parses the legacy input partial output. For more details see `partial/directive.ts`.
 * TODO(legacy-partial-output-inputs): Remove in v18.
 */
function parseLegacyInputPartialOutput(value) {
    if (typeof value === 'string') {
        return {
            bindingPropertyName: value,
            classPropertyName: value,
            transformFunction: null,
            required: false,
            // legacy partial output does not capture signal inputs.
            isSignal: false,
        };
    }
    return {
        bindingPropertyName: value[0],
        classPropertyName: value[1],
        transformFunction: value[2] ? new output_ast_1.WrappedNodeExpr(value[2]) : null,
        required: false,
        // legacy partial output does not capture signal inputs.
        isSignal: false,
    };
}
function parseInputsArray(values) {
    return values.reduce((results, value) => {
        if (typeof value === 'string') {
            const [bindingPropertyName, classPropertyName] = parseMappingString(value);
            results[classPropertyName] = {
                bindingPropertyName,
                classPropertyName,
                required: false,
                // Signal inputs not supported for the inputs array.
                isSignal: false,
                transformFunction: null,
            };
        }
        else {
            results[value.name] = {
                bindingPropertyName: value.alias || value.name,
                classPropertyName: value.name,
                required: value.required || false,
                // Signal inputs not supported for the inputs array.
                isSignal: false,
                transformFunction: value.transform != null ? new output_ast_1.WrappedNodeExpr(value.transform) : null,
            };
        }
        return results;
    }, {});
}
function parseMappingStringArray(values) {
    return values.reduce((results, value) => {
        const [alias, fieldName] = parseMappingString(value);
        results[fieldName] = alias;
        return results;
    }, {});
}
function parseMappingString(value) {
    // Either the value is 'field' or 'field: property'. In the first case, `property` will
    // be undefined, in which case the field name should also be used as the property name.
    const [fieldName, bindingPropertyName] = value.split(':', 2).map((str) => str.trim());
    return [bindingPropertyName !== null && bindingPropertyName !== void 0 ? bindingPropertyName : fieldName, fieldName];
}
function convertDeclarePipeFacadeToMetadata(declaration) {
    var _a, _b;
    return {
        name: declaration.type.name,
        type: (0, util_1.wrapReference)(declaration.type),
        typeArgumentCount: 0,
        pipeName: declaration.name,
        deps: null,
        pure: (_a = declaration.pure) !== null && _a !== void 0 ? _a : true,
        isStandalone: (_b = declaration.isStandalone) !== null && _b !== void 0 ? _b : (0, util_2.getJitStandaloneDefaultForVersion)(declaration.version),
    };
}
function convertDeclareInjectorFacadeToMetadata(declaration) {
    return {
        name: declaration.type.name,
        type: (0, util_1.wrapReference)(declaration.type),
        providers: declaration.providers !== undefined && declaration.providers.length > 0
            ? new output_ast_1.WrappedNodeExpr(declaration.providers)
            : null,
        imports: declaration.imports !== undefined
            ? declaration.imports.map((i) => new output_ast_1.WrappedNodeExpr(i))
            : [],
    };
}
function publishFacade(global) {
    const ng = global.ng || (global.ng = {});
    ng.ɵcompilerFacade = new CompilerFacadeImpl();
}
