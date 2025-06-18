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
exports.InjectableDecoratorHandler = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const common_1 = require("../../annotations/common");
const diagnostics_1 = require("../../diagnostics");
const perf_1 = require("../../perf");
const reflection_1 = require("../../reflection");
const transform_1 = require("../../transform");
const common_2 = require("../common");
/**
 * Adapts the `compileInjectable` compiler for `@Injectable` decorators to the Ivy compiler.
 */
class InjectableDecoratorHandler {
    constructor(reflector, evaluator, isCore, strictCtorDeps, injectableRegistry, perf, includeClassMetadata, compilationMode, 
    /**
     * What to do if the injectable already contains a ɵprov property.
     *
     * If true then an error diagnostic is reported.
     * If false then there is no error and a new ɵprov property is not added.
     */
    errorOnDuplicateProv = true) {
        this.reflector = reflector;
        this.evaluator = evaluator;
        this.isCore = isCore;
        this.strictCtorDeps = strictCtorDeps;
        this.injectableRegistry = injectableRegistry;
        this.perf = perf;
        this.includeClassMetadata = includeClassMetadata;
        this.compilationMode = compilationMode;
        this.errorOnDuplicateProv = errorOnDuplicateProv;
        this.precedence = transform_1.HandlerPrecedence.SHARED;
        this.name = 'InjectableDecoratorHandler';
    }
    detect(node, decorators) {
        if (!decorators) {
            return undefined;
        }
        const decorator = (0, common_2.findAngularDecorator)(decorators, 'Injectable', this.isCore);
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
    analyze(node, decorator) {
        this.perf.eventCount(perf_1.PerfEvent.AnalyzeInjectable);
        const meta = extractInjectableMetadata(node, decorator, this.reflector);
        const decorators = this.reflector.getDecoratorsOfDeclaration(node);
        return {
            analysis: {
                meta,
                ctorDeps: extractInjectableCtorDeps(node, meta, decorator, this.reflector, this.isCore, this.strictCtorDeps),
                classMetadata: this.includeClassMetadata
                    ? (0, common_2.extractClassMetadata)(node, this.reflector, this.isCore)
                    : null,
                // Avoid generating multiple factories if a class has
                // more Angular decorators, apart from Injectable.
                needsFactory: !decorators ||
                    decorators.every((current) => !(0, common_2.isAngularCore)(current) || current.name === 'Injectable'),
            },
        };
    }
    symbol() {
        return null;
    }
    register(node, analysis) {
        if (this.compilationMode === transform_1.CompilationMode.LOCAL) {
            return;
        }
        this.injectableRegistry.registerInjectable(node, {
            ctorDeps: analysis.ctorDeps,
        });
    }
    resolve(node, analysis) {
        if (this.compilationMode === transform_1.CompilationMode.LOCAL) {
            return {};
        }
        if (requiresValidCtor(analysis.meta)) {
            const diagnostic = (0, common_2.checkInheritanceOfInjectable)(node, this.injectableRegistry, this.reflector, this.evaluator, this.strictCtorDeps, 'Injectable');
            if (diagnostic !== null) {
                return {
                    diagnostics: [diagnostic],
                };
            }
        }
        return {};
    }
    compileFull(node, analysis) {
        return this.compile(common_2.compileNgFactoryDefField, (meta) => (0, compiler_1.compileInjectable)(meta, false), compiler_1.compileClassMetadata, node, analysis);
    }
    compilePartial(node, analysis) {
        return this.compile(common_2.compileDeclareFactory, compiler_1.compileDeclareInjectableFromMetadata, compiler_1.compileDeclareClassMetadata, node, analysis);
    }
    compileLocal(node, analysis) {
        return this.compile(common_2.compileNgFactoryDefField, (meta) => (0, compiler_1.compileInjectable)(meta, false), compiler_1.compileClassMetadata, node, analysis);
    }
    compile(compileFactoryFn, compileInjectableFn, compileClassMetadataFn, node, analysis) {
        const results = [];
        if (analysis.needsFactory) {
            const meta = analysis.meta;
            const factoryRes = compileFactoryFn((0, common_2.toFactoryMetadata)(Object.assign(Object.assign({}, meta), { deps: analysis.ctorDeps }), compiler_1.FactoryTarget.Injectable));
            if (analysis.classMetadata !== null) {
                factoryRes.statements.push(compileClassMetadataFn(analysis.classMetadata).toStmt());
            }
            results.push(factoryRes);
        }
        const ɵprov = this.reflector.getMembersOfClass(node).find((member) => member.name === 'ɵprov');
        if (ɵprov !== undefined && this.errorOnDuplicateProv) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.INJECTABLE_DUPLICATE_PROV, ɵprov.nameNode || ɵprov.node || node, 'Injectables cannot contain a static ɵprov property, because the compiler is going to generate one.');
        }
        if (ɵprov === undefined) {
            // Only add a new ɵprov if there is not one already
            const res = compileInjectableFn(analysis.meta);
            results.push({
                name: 'ɵprov',
                initializer: res.expression,
                statements: res.statements,
                type: res.type,
                deferrableImports: null,
            });
        }
        return results;
    }
}
exports.InjectableDecoratorHandler = InjectableDecoratorHandler;
/**
 * Read metadata from the `@Injectable` decorator and produce the `IvyInjectableMetadata`, the
 * input metadata needed to run `compileInjectable`.
 *
 * A `null` return value indicates this is @Injectable has invalid data.
 */
function extractInjectableMetadata(clazz, decorator, reflector) {
    const name = clazz.name.text;
    const type = (0, common_2.wrapTypeReference)(reflector, clazz);
    const typeArgumentCount = reflector.getGenericArityOfClass(clazz) || 0;
    if (decorator.args === null) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_NOT_CALLED, decorator.node, '@Injectable must be called');
    }
    if (decorator.args.length === 0) {
        return {
            name,
            type,
            typeArgumentCount,
            providedIn: (0, compiler_1.createMayBeForwardRefExpression)(new compiler_1.LiteralExpr(null), compiler_1.ForwardRefHandling.None),
        };
    }
    else if (decorator.args.length === 1) {
        const metaNode = decorator.args[0];
        // Firstly make sure the decorator argument is an inline literal - if not, it's illegal to
        // transport references from one location to another. This is the problem that lowering
        // used to solve - if this restriction proves too undesirable we can re-implement lowering.
        if (!typescript_1.default.isObjectLiteralExpression(metaNode)) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARG_NOT_LITERAL, metaNode, `@Injectable argument must be an object literal`);
        }
        // Resolve the fields of the literal into a map of field name to expression.
        const meta = (0, reflection_1.reflectObjectLiteral)(metaNode);
        const providedIn = meta.has('providedIn')
            ? getProviderExpression(meta.get('providedIn'), reflector)
            : (0, compiler_1.createMayBeForwardRefExpression)(new compiler_1.LiteralExpr(null), compiler_1.ForwardRefHandling.None);
        let deps = undefined;
        if ((meta.has('useClass') || meta.has('useFactory')) && meta.has('deps')) {
            const depsExpr = meta.get('deps');
            if (!typescript_1.default.isArrayLiteralExpression(depsExpr)) {
                throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.VALUE_NOT_LITERAL, depsExpr, `@Injectable deps metadata must be an inline array`);
            }
            deps = depsExpr.elements.map((dep) => getDep(dep, reflector));
        }
        const result = { name, type, typeArgumentCount, providedIn };
        if (meta.has('useValue')) {
            result.useValue = getProviderExpression(meta.get('useValue'), reflector);
        }
        else if (meta.has('useExisting')) {
            result.useExisting = getProviderExpression(meta.get('useExisting'), reflector);
        }
        else if (meta.has('useClass')) {
            result.useClass = getProviderExpression(meta.get('useClass'), reflector);
            result.deps = deps;
        }
        else if (meta.has('useFactory')) {
            result.useFactory = new compiler_1.WrappedNodeExpr(meta.get('useFactory'));
            result.deps = deps;
        }
        return result;
    }
    else {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARITY_WRONG, decorator.args[2], 'Too many arguments to @Injectable');
    }
}
/**
 * Get the `R3ProviderExpression` for this `expression`.
 *
 * The `useValue`, `useExisting` and `useClass` properties might be wrapped in a `ForwardRef`, which
 * needs to be unwrapped. This function will do that unwrapping and set a flag on the returned
 * object to indicate whether the value needed unwrapping.
 */
function getProviderExpression(expression, reflector) {
    const forwardRefValue = (0, common_2.tryUnwrapForwardRef)(expression, reflector);
    return (0, compiler_1.createMayBeForwardRefExpression)(new compiler_1.WrappedNodeExpr(forwardRefValue !== null && forwardRefValue !== void 0 ? forwardRefValue : expression), forwardRefValue !== null ? compiler_1.ForwardRefHandling.Unwrapped : compiler_1.ForwardRefHandling.None);
}
function extractInjectableCtorDeps(clazz, meta, decorator, reflector, isCore, strictCtorDeps) {
    if (decorator.args === null) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_NOT_CALLED, decorator.node, '@Injectable must be called');
    }
    let ctorDeps = null;
    if (decorator.args.length === 0) {
        // Ideally, using @Injectable() would have the same effect as using @Injectable({...}), and be
        // subject to the same validation. However, existing Angular code abuses @Injectable, applying
        // it to things like abstract classes with constructors that were never meant for use with
        // Angular's DI.
        //
        // To deal with this, @Injectable() without an argument is more lenient, and if the
        // constructor signature does not work for DI then a factory definition (ɵfac) that throws is
        // generated.
        if (strictCtorDeps && !(0, common_1.isAbstractClassDeclaration)(clazz)) {
            ctorDeps = (0, common_2.getValidConstructorDependencies)(clazz, reflector, isCore);
        }
        else {
            ctorDeps = (0, common_2.unwrapConstructorDependencies)((0, common_2.getConstructorDependencies)(clazz, reflector, isCore));
        }
        return ctorDeps;
    }
    else if (decorator.args.length === 1) {
        const rawCtorDeps = (0, common_2.getConstructorDependencies)(clazz, reflector, isCore);
        if (strictCtorDeps && !(0, common_1.isAbstractClassDeclaration)(clazz) && requiresValidCtor(meta)) {
            // Since use* was not provided for a concrete class, validate the deps according to
            // strictCtorDeps.
            ctorDeps = (0, common_2.validateConstructorDependencies)(clazz, rawCtorDeps);
        }
        else {
            ctorDeps = (0, common_2.unwrapConstructorDependencies)(rawCtorDeps);
        }
    }
    return ctorDeps;
}
function requiresValidCtor(meta) {
    return (meta.useValue === undefined &&
        meta.useExisting === undefined &&
        meta.useClass === undefined &&
        meta.useFactory === undefined);
}
function getDep(dep, reflector) {
    const meta = {
        token: new compiler_1.WrappedNodeExpr(dep),
        attributeNameType: null,
        host: false,
        optional: false,
        self: false,
        skipSelf: false,
    };
    function maybeUpdateDecorator(dec, reflector, token) {
        const source = reflector.getImportOfIdentifier(dec);
        if (source === null || source.from !== '@angular/core') {
            return false;
        }
        switch (source.name) {
            case 'Inject':
                if (token !== undefined) {
                    meta.token = new compiler_1.WrappedNodeExpr(token);
                }
                break;
            case 'Optional':
                meta.optional = true;
                break;
            case 'SkipSelf':
                meta.skipSelf = true;
                break;
            case 'Self':
                meta.self = true;
                break;
            default:
                return false;
        }
        return true;
    }
    if (typescript_1.default.isArrayLiteralExpression(dep)) {
        dep.elements.forEach((el) => {
            let isDecorator = false;
            if (typescript_1.default.isIdentifier(el)) {
                isDecorator = maybeUpdateDecorator(el, reflector);
            }
            else if (typescript_1.default.isNewExpression(el) && typescript_1.default.isIdentifier(el.expression)) {
                const token = (el.arguments && el.arguments.length > 0 && el.arguments[0]) || undefined;
                isDecorator = maybeUpdateDecorator(el.expression, reflector, token);
            }
            if (!isDecorator) {
                meta.token = new compiler_1.WrappedNodeExpr(el);
            }
        });
    }
    return meta;
}
