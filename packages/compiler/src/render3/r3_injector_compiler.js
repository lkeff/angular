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
exports.compileInjector = compileInjector;
exports.createInjectorType = createInjectorType;
const o = __importStar(require("../output/output_ast"));
const r3_identifiers_1 = require("./r3_identifiers");
const util_1 = require("./view/util");
function compileInjector(meta) {
    const definitionMap = new util_1.DefinitionMap();
    if (meta.providers !== null) {
        definitionMap.set('providers', meta.providers);
    }
    if (meta.imports.length > 0) {
        definitionMap.set('imports', o.literalArr(meta.imports));
    }
    const expression = o
        .importExpr(r3_identifiers_1.Identifiers.defineInjector)
        .callFn([definitionMap.toLiteralMap()], undefined, true);
    const type = createInjectorType(meta);
    return { expression, type, statements: [] };
}
function createInjectorType(meta) {
    return new o.ExpressionType(o.importExpr(r3_identifiers_1.Identifiers.InjectorDeclaration, [new o.ExpressionType(meta.type.type)]));
}
