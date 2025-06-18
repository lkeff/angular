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
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileInjectable = compileInjectable;
exports.createInjectableType = createInjectableType;
const o = __importStar(require("./output/output_ast"));
const r3_factory_1 = require("./render3/r3_factory");
const r3_identifiers_1 = require("./render3/r3_identifiers");
const util_1 = require("./render3/util");
const util_2 = require("./render3/view/util");
function compileInjectable(meta, resolveForwardRefs) {
    let result = null;
    const factoryMeta = {
        name: meta.name,
        type: meta.type,
        typeArgumentCount: meta.typeArgumentCount,
        deps: [],
        target: r3_factory_1.FactoryTarget.Injectable,
    };
    if (meta.useClass !== undefined) {
        // meta.useClass has two modes of operation. Either deps are specified, in which case `new` is
        // used to instantiate the class with dependencies injected, or deps are not specified and
        // the factory of the class is used to instantiate it.
        //
        // A special case exists for useClass: Type where Type is the injectable type itself and no
        // deps are specified, in which case 'useClass' is effectively ignored.
        const useClassOnSelf = meta.useClass.expression.isEquivalent(meta.type.value);
        let deps = undefined;
        if (meta.deps !== undefined) {
            deps = meta.deps;
        }
        if (deps !== undefined) {
            // factory: () => new meta.useClass(...deps)
            result = (0, r3_factory_1.compileFactoryFunction)(Object.assign(Object.assign({}, factoryMeta), { delegate: meta.useClass.expression, delegateDeps: deps, delegateType: r3_factory_1.R3FactoryDelegateType.Class }));
        }
        else if (useClassOnSelf) {
            result = (0, r3_factory_1.compileFactoryFunction)(factoryMeta);
        }
        else {
            result = {
                statements: [],
                expression: delegateToFactory(meta.type.value, meta.useClass.expression, resolveForwardRefs),
            };
        }
    }
    else if (meta.useFactory !== undefined) {
        if (meta.deps !== undefined) {
            result = (0, r3_factory_1.compileFactoryFunction)(Object.assign(Object.assign({}, factoryMeta), { delegate: meta.useFactory, delegateDeps: meta.deps || [], delegateType: r3_factory_1.R3FactoryDelegateType.Function }));
        }
        else {
            result = { statements: [], expression: o.arrowFn([], meta.useFactory.callFn([])) };
        }
    }
    else if (meta.useValue !== undefined) {
        // Note: it's safe to use `meta.useValue` instead of the `USE_VALUE in meta` check used for
        // client code because meta.useValue is an Expression which will be defined even if the actual
        // value is undefined.
        result = (0, r3_factory_1.compileFactoryFunction)(Object.assign(Object.assign({}, factoryMeta), { expression: meta.useValue.expression }));
    }
    else if (meta.useExisting !== undefined) {
        // useExisting is an `inject` call on the existing token.
        result = (0, r3_factory_1.compileFactoryFunction)(Object.assign(Object.assign({}, factoryMeta), { expression: o.importExpr(r3_identifiers_1.Identifiers.inject).callFn([meta.useExisting.expression]) }));
    }
    else {
        result = {
            statements: [],
            expression: delegateToFactory(meta.type.value, meta.type.value, resolveForwardRefs),
        };
    }
    const token = meta.type.value;
    const injectableProps = new util_2.DefinitionMap();
    injectableProps.set('token', token);
    injectableProps.set('factory', result.expression);
    // Only generate providedIn property if it has a non-null value
    if (meta.providedIn.expression.value !== null) {
        injectableProps.set('providedIn', (0, util_1.convertFromMaybeForwardRefExpression)(meta.providedIn));
    }
    const expression = o
        .importExpr(r3_identifiers_1.Identifiers.ɵɵdefineInjectable)
        .callFn([injectableProps.toLiteralMap()], undefined, true);
    return {
        expression,
        type: createInjectableType(meta),
        statements: result.statements,
    };
}
function createInjectableType(meta) {
    return new o.ExpressionType(o.importExpr(r3_identifiers_1.Identifiers.InjectableDeclaration, [
        (0, util_1.typeWithParameters)(meta.type.type, meta.typeArgumentCount),
    ]));
}
function delegateToFactory(type, useType, unwrapForwardRefs) {
    if (type.node === useType.node) {
        // The types are the same, so we can simply delegate directly to the type's factory.
        // ```
        // factory: type.ɵfac
        // ```
        return useType.prop('ɵfac');
    }
    if (!unwrapForwardRefs) {
        // The type is not wrapped in a `forwardRef()`, so we create a simple factory function that
        // accepts a sub-type as an argument.
        // ```
        // factory: function(t) { return useType.ɵfac(t); }
        // ```
        return createFactoryFunction(useType);
    }
    // The useType is actually wrapped in a `forwardRef()` so we need to resolve that before
    // calling its factory.
    // ```
    // factory: function(t) { return core.resolveForwardRef(type).ɵfac(t); }
    // ```
    const unwrappedType = o.importExpr(r3_identifiers_1.Identifiers.resolveForwardRef).callFn([useType]);
    return createFactoryFunction(unwrappedType);
}
function createFactoryFunction(type) {
    const t = new o.FnParam('__ngFactoryType__', o.DYNAMIC_TYPE);
    return o.arrowFn([t], type.prop('ɵfac').callFn([o.variable(t.name)]));
}
