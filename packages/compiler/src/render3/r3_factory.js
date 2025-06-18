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
exports.FactoryTarget = exports.R3FactoryDelegateType = void 0;
exports.compileFactoryFunction = compileFactoryFunction;
exports.createFactoryType = createFactoryType;
exports.isDelegatedFactoryMetadata = isDelegatedFactoryMetadata;
exports.isExpressionFactoryMetadata = isExpressionFactoryMetadata;
const o = __importStar(require("../output/output_ast"));
const r3_identifiers_1 = require("../render3/r3_identifiers");
const util_1 = require("./util");
var R3FactoryDelegateType;
(function (R3FactoryDelegateType) {
    R3FactoryDelegateType[R3FactoryDelegateType["Class"] = 0] = "Class";
    R3FactoryDelegateType[R3FactoryDelegateType["Function"] = 1] = "Function";
})(R3FactoryDelegateType || (exports.R3FactoryDelegateType = R3FactoryDelegateType = {}));
var FactoryTarget;
(function (FactoryTarget) {
    FactoryTarget[FactoryTarget["Directive"] = 0] = "Directive";
    FactoryTarget[FactoryTarget["Component"] = 1] = "Component";
    FactoryTarget[FactoryTarget["Injectable"] = 2] = "Injectable";
    FactoryTarget[FactoryTarget["Pipe"] = 3] = "Pipe";
    FactoryTarget[FactoryTarget["NgModule"] = 4] = "NgModule";
})(FactoryTarget || (exports.FactoryTarget = FactoryTarget = {}));
/**
 * Construct a factory function expression for the given `R3FactoryMetadata`.
 */
function compileFactoryFunction(meta) {
    const t = o.variable('__ngFactoryType__');
    let baseFactoryVar = null;
    // The type to instantiate via constructor invocation. If there is no delegated factory, meaning
    // this type is always created by constructor invocation, then this is the type-to-create
    // parameter provided by the user (t) if specified, or the current type if not. If there is a
    // delegated factory (which is used to create the current type) then this is only the type-to-
    // create parameter (t).
    const typeForCtor = !isDelegatedFactoryMetadata(meta)
        ? new o.BinaryOperatorExpr(o.BinaryOperator.Or, t, meta.type.value)
        : t;
    let ctorExpr = null;
    if (meta.deps !== null) {
        // There is a constructor (either explicitly or implicitly defined).
        if (meta.deps !== 'invalid') {
            ctorExpr = new o.InstantiateExpr(typeForCtor, injectDependencies(meta.deps, meta.target));
        }
    }
    else {
        // There is no constructor, use the base class' factory to construct typeForCtor.
        baseFactoryVar = o.variable(`ɵ${meta.name}_BaseFactory`);
        ctorExpr = baseFactoryVar.callFn([typeForCtor]);
    }
    const body = [];
    let retExpr = null;
    function makeConditionalFactory(nonCtorExpr) {
        const r = o.variable('__ngConditionalFactory__');
        body.push(r.set(o.NULL_EXPR).toDeclStmt());
        const ctorStmt = ctorExpr !== null
            ? r.set(ctorExpr).toStmt()
            : o.importExpr(r3_identifiers_1.Identifiers.invalidFactory).callFn([]).toStmt();
        body.push(o.ifStmt(t, [ctorStmt], [r.set(nonCtorExpr).toStmt()]));
        return r;
    }
    if (isDelegatedFactoryMetadata(meta)) {
        // This type is created with a delegated factory. If a type parameter is not specified, call
        // the factory instead.
        const delegateArgs = injectDependencies(meta.delegateDeps, meta.target);
        // Either call `new delegate(...)` or `delegate(...)` depending on meta.delegateType.
        const factoryExpr = new (meta.delegateType === R3FactoryDelegateType.Class ? o.InstantiateExpr : o.InvokeFunctionExpr)(meta.delegate, delegateArgs);
        retExpr = makeConditionalFactory(factoryExpr);
    }
    else if (isExpressionFactoryMetadata(meta)) {
        // TODO(alxhub): decide whether to lower the value here or in the caller
        retExpr = makeConditionalFactory(meta.expression);
    }
    else {
        retExpr = ctorExpr;
    }
    if (retExpr === null) {
        // The expression cannot be formed so render an `ɵɵinvalidFactory()` call.
        body.push(o.importExpr(r3_identifiers_1.Identifiers.invalidFactory).callFn([]).toStmt());
    }
    else if (baseFactoryVar !== null) {
        // This factory uses a base factory, so call `ɵɵgetInheritedFactory()` to compute it.
        const getInheritedFactoryCall = o.importExpr(r3_identifiers_1.Identifiers.getInheritedFactory).callFn([meta.type.value]);
        // Memoize the base factoryFn: `baseFactory || (baseFactory = ɵɵgetInheritedFactory(...))`
        const baseFactory = new o.BinaryOperatorExpr(o.BinaryOperator.Or, baseFactoryVar, baseFactoryVar.set(getInheritedFactoryCall));
        body.push(new o.ReturnStatement(baseFactory.callFn([typeForCtor])));
    }
    else {
        // This is straightforward factory, just return it.
        body.push(new o.ReturnStatement(retExpr));
    }
    let factoryFn = o.fn([new o.FnParam(t.name, o.DYNAMIC_TYPE)], body, o.INFERRED_TYPE, undefined, `${meta.name}_Factory`);
    if (baseFactoryVar !== null) {
        // There is a base factory variable so wrap its declaration along with the factory function into
        // an IIFE.
        factoryFn = o
            .arrowFn([], [new o.DeclareVarStmt(baseFactoryVar.name), new o.ReturnStatement(factoryFn)])
            .callFn([], /* sourceSpan */ undefined, /* pure */ true);
    }
    return {
        expression: factoryFn,
        statements: [],
        type: createFactoryType(meta),
    };
}
function createFactoryType(meta) {
    const ctorDepsType = meta.deps !== null && meta.deps !== 'invalid' ? createCtorDepsType(meta.deps) : o.NONE_TYPE;
    return o.expressionType(o.importExpr(r3_identifiers_1.Identifiers.FactoryDeclaration, [
        (0, util_1.typeWithParameters)(meta.type.type, meta.typeArgumentCount),
        ctorDepsType,
    ]));
}
function injectDependencies(deps, target) {
    return deps.map((dep, index) => compileInjectDependency(dep, target, index));
}
function compileInjectDependency(dep, target, index) {
    // Interpret the dependency according to its resolved type.
    if (dep.token === null) {
        return o.importExpr(r3_identifiers_1.Identifiers.invalidFactoryDep).callFn([o.literal(index)]);
    }
    else if (dep.attributeNameType === null) {
        // Build up the injection flags according to the metadata.
        const flags = 0 /* InjectFlags.Default */ |
            (dep.self ? 2 /* InjectFlags.Self */ : 0) |
            (dep.skipSelf ? 4 /* InjectFlags.SkipSelf */ : 0) |
            (dep.host ? 1 /* InjectFlags.Host */ : 0) |
            (dep.optional ? 8 /* InjectFlags.Optional */ : 0) |
            (target === FactoryTarget.Pipe ? 16 /* InjectFlags.ForPipe */ : 0);
        // If this dependency is optional or otherwise has non-default flags, then additional
        // parameters describing how to inject the dependency must be passed to the inject function
        // that's being used.
        let flagsParam = flags !== 0 /* InjectFlags.Default */ || dep.optional ? o.literal(flags) : null;
        // Build up the arguments to the injectFn call.
        const injectArgs = [dep.token];
        if (flagsParam) {
            injectArgs.push(flagsParam);
        }
        const injectFn = getInjectFn(target);
        return o.importExpr(injectFn).callFn(injectArgs);
    }
    else {
        // The `dep.attributeTypeName` value is defined, which indicates that this is an `@Attribute()`
        // type dependency. For the generated JS we still want to use the `dep.token` value in case the
        // name given for the attribute is not a string literal. For example given `@Attribute(foo())`,
        // we want to generate `ɵɵinjectAttribute(foo())`.
        //
        // The `dep.attributeTypeName` is only actually used (in `createCtorDepType()`) to generate
        // typings.
        return o.importExpr(r3_identifiers_1.Identifiers.injectAttribute).callFn([dep.token]);
    }
}
function createCtorDepsType(deps) {
    let hasTypes = false;
    const attributeTypes = deps.map((dep) => {
        const type = createCtorDepType(dep);
        if (type !== null) {
            hasTypes = true;
            return type;
        }
        else {
            return o.literal(null);
        }
    });
    if (hasTypes) {
        return o.expressionType(o.literalArr(attributeTypes));
    }
    else {
        return o.NONE_TYPE;
    }
}
function createCtorDepType(dep) {
    const entries = [];
    if (dep.attributeNameType !== null) {
        entries.push({ key: 'attribute', value: dep.attributeNameType, quoted: false });
    }
    if (dep.optional) {
        entries.push({ key: 'optional', value: o.literal(true), quoted: false });
    }
    if (dep.host) {
        entries.push({ key: 'host', value: o.literal(true), quoted: false });
    }
    if (dep.self) {
        entries.push({ key: 'self', value: o.literal(true), quoted: false });
    }
    if (dep.skipSelf) {
        entries.push({ key: 'skipSelf', value: o.literal(true), quoted: false });
    }
    return entries.length > 0 ? o.literalMap(entries) : null;
}
function isDelegatedFactoryMetadata(meta) {
    return meta.delegateType !== undefined;
}
function isExpressionFactoryMetadata(meta) {
    return meta.expression !== undefined;
}
function getInjectFn(target) {
    switch (target) {
        case FactoryTarget.Component:
        case FactoryTarget.Directive:
        case FactoryTarget.Pipe:
            return r3_identifiers_1.Identifiers.directiveInject;
        case FactoryTarget.NgModule:
        case FactoryTarget.Injectable:
        default:
            return r3_identifiers_1.Identifiers.inject;
    }
}
