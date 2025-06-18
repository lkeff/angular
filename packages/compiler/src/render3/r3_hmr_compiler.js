"use strict";
/*!
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
exports.compileHmrInitializer = compileHmrInitializer;
exports.compileHmrUpdateCallback = compileHmrUpdateCallback;
const o = __importStar(require("../output/output_ast"));
const r3_identifiers_1 = require("./r3_identifiers");
const util_1 = require("./util");
/**
 * Compiles the expression that initializes HMR for a class.
 * @param meta HMR metadata extracted from the class.
 */
function compileHmrInitializer(meta) {
    const moduleName = 'm';
    const dataName = 'd';
    const timestampName = 't';
    const idName = 'id';
    const importCallbackName = `${meta.className}_HmrLoad`;
    const namespaces = meta.namespaceDependencies.map((dep) => {
        return new o.ExternalExpr({ moduleName: dep.moduleName, name: null });
    });
    // m.default
    const defaultRead = o.variable(moduleName).prop('default');
    // ɵɵreplaceMetadata(Comp, m.default, [...namespaces], [...locals], import.meta, id);
    const replaceCall = o
        .importExpr(r3_identifiers_1.Identifiers.replaceMetadata)
        .callFn([
        meta.type,
        defaultRead,
        o.literalArr(namespaces),
        o.literalArr(meta.localDependencies.map((l) => l.runtimeRepresentation)),
        o.variable('import').prop('meta'),
        o.variable(idName),
    ]);
    // (m) => m.default && ɵɵreplaceMetadata(...)
    const replaceCallback = o.arrowFn([new o.FnParam(moduleName)], defaultRead.and(replaceCall));
    // '<url>?c=' + id + '&t=' + encodeURIComponent(t)
    const urlValue = o
        .literal(`./@ng/component?c=`)
        .plus(o.variable(idName))
        .plus(o.literal('&t='))
        .plus(o.variable('encodeURIComponent').callFn([o.variable(timestampName)]));
    // import.meta.url
    const urlBase = o.variable('import').prop('meta').prop('url');
    // new URL(urlValue, urlBase).href
    const urlHref = new o.InstantiateExpr(o.variable('URL'), [urlValue, urlBase]).prop('href');
    // function Cmp_HmrLoad(t) {
    //   import(/* @vite-ignore */ urlHref).then((m) => m.default && replaceMetadata(...));
    // }
    const importCallback = new o.DeclareFunctionStmt(importCallbackName, [new o.FnParam(timestampName)], [
        // The vite-ignore special comment is required to prevent Vite from generating a superfluous
        // warning for each usage within the development code. If Vite provides a method to
        // programmatically avoid this warning in the future, this added comment can be removed here.
        new o.DynamicImportExpr(urlHref, null, '@vite-ignore')
            .prop('then')
            .callFn([replaceCallback])
            .toStmt(),
    ], null, o.StmtModifier.Final);
    // (d) => d.id === id && Cmp_HmrLoad(d.timestamp)
    const updateCallback = o.arrowFn([new o.FnParam(dataName)], o
        .variable(dataName)
        .prop('id')
        .identical(o.variable(idName))
        .and(o.variable(importCallbackName).callFn([o.variable(dataName).prop('timestamp')])));
    // Cmp_HmrLoad(Date.now());
    // Initial call to kick off the loading in order to avoid edge cases with components
    // coming from lazy chunks that change before the chunk has loaded.
    const initialCall = o
        .variable(importCallbackName)
        .callFn([o.variable('Date').prop('now').callFn([])]);
    // import.meta.hot
    const hotRead = o.variable('import').prop('meta').prop('hot');
    // import.meta.hot.on('angular:component-update', () => ...);
    const hotListener = hotRead
        .clone()
        .prop('on')
        .callFn([o.literal('angular:component-update'), updateCallback]);
    return o
        .arrowFn([], [
        // const id = <id>;
        new o.DeclareVarStmt(idName, o.literal(encodeURIComponent(`${meta.filePath}@${meta.className}`)), null, o.StmtModifier.Final),
        // function Cmp_HmrLoad() {...}.
        importCallback,
        // ngDevMode && Cmp_HmrLoad(Date.now());
        (0, util_1.devOnlyGuardedExpression)(initialCall).toStmt(),
        // ngDevMode && import.meta.hot && import.meta.hot.on(...)
        (0, util_1.devOnlyGuardedExpression)(hotRead.and(hotListener)).toStmt(),
    ])
        .callFn([]);
}
/**
 * Compiles the HMR update callback for a class.
 * @param definitions Compiled definitions for the class (e.g. `defineComponent` calls).
 * @param constantStatements Supporting constants statements that were generated alongside
 *  the definition.
 * @param meta HMR metadata extracted from the class.
 */
function compileHmrUpdateCallback(definitions, constantStatements, meta) {
    const namespaces = 'ɵɵnamespaces';
    const params = [meta.className, namespaces].map((name) => new o.FnParam(name, o.DYNAMIC_TYPE));
    const body = [];
    for (const local of meta.localDependencies) {
        params.push(new o.FnParam(local.name));
    }
    // Declare variables that read out the individual namespaces.
    for (let i = 0; i < meta.namespaceDependencies.length; i++) {
        body.push(new o.DeclareVarStmt(meta.namespaceDependencies[i].assignedName, o.variable(namespaces).key(o.literal(i)), o.DYNAMIC_TYPE, o.StmtModifier.Final));
    }
    body.push(...constantStatements);
    for (const field of definitions) {
        if (field.initializer !== null) {
            body.push(o.variable(meta.className).prop(field.name).set(field.initializer).toStmt());
            for (const stmt of field.statements) {
                body.push(stmt);
            }
        }
    }
    return new o.DeclareFunctionStmt(`${meta.className}_UpdateMetadata`, params, body, null, o.StmtModifier.Final);
}
