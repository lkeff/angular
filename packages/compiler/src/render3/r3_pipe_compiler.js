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
exports.compilePipeFromMetadata = compilePipeFromMetadata;
exports.createPipeType = createPipeType;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const o = __importStar(require("../output/output_ast"));
const r3_identifiers_1 = require("./r3_identifiers");
const util_1 = require("./util");
function compilePipeFromMetadata(metadata) {
    const definitionMapValues = [];
    // e.g. `name: 'myPipe'`
    definitionMapValues.push({ key: 'name', value: o.literal(metadata.pipeName), quoted: false });
    // e.g. `type: MyPipe`
    definitionMapValues.push({ key: 'type', value: metadata.type.value, quoted: false });
    // e.g. `pure: true`
    definitionMapValues.push({ key: 'pure', value: o.literal(metadata.pure), quoted: false });
    if (metadata.isStandalone === false) {
        definitionMapValues.push({ key: 'standalone', value: o.literal(false), quoted: false });
    }
    const expression = o
        .importExpr(r3_identifiers_1.Identifiers.definePipe)
        .callFn([o.literalMap(definitionMapValues)], undefined, true);
    const type = createPipeType(metadata);
    return { expression, type, statements: [] };
}
function createPipeType(metadata) {
    return new o.ExpressionType(o.importExpr(r3_identifiers_1.Identifiers.PipeDeclaration, [
        (0, util_1.typeWithParameters)(metadata.type.type, metadata.typeArgumentCount),
        new o.ExpressionType(new o.LiteralExpr(metadata.pipeName)),
        new o.ExpressionType(new o.LiteralExpr(metadata.isStandalone)),
    ]));
}
