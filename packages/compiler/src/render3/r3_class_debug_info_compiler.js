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
exports.compileClassDebugInfo = compileClassDebugInfo;
const map_util_1 = require("../output/map_util");
const o = __importStar(require("../output/output_ast"));
const r3_identifiers_1 = require("./r3_identifiers");
const util_1 = require("./util");
/**
 * Generate an ngDevMode guarded call to setClassDebugInfo with the debug info about the class
 * (e.g., the file name in which the class is defined)
 */
function compileClassDebugInfo(debugInfo) {
    const debugInfoObject = {
        className: debugInfo.className,
    };
    // Include file path and line number only if the file relative path is calculated successfully.
    if (debugInfo.filePath) {
        debugInfoObject.filePath = debugInfo.filePath;
        debugInfoObject.lineNumber = debugInfo.lineNumber;
    }
    // Include forbidOrphanRendering only if it's set to true (to reduce generated code)
    if (debugInfo.forbidOrphanRendering) {
        debugInfoObject.forbidOrphanRendering = o.literal(true);
    }
    const fnCall = o
        .importExpr(r3_identifiers_1.Identifiers.setClassDebugInfo)
        .callFn([debugInfo.type, (0, map_util_1.mapLiteral)(debugInfoObject)]);
    const iife = o.arrowFn([], [(0, util_1.devOnlyGuardedExpression)(fnCall).toStmt()]);
    return iife.callFn([]);
}
