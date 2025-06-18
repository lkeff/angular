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
const abstract_emitter_1 = require("../../src/output/abstract_emitter");
const o = __importStar(require("../../src/output/output_ast"));
const output_jit_1 = require("../../src/output/output_jit");
const r3_jit_1 = require("../../src/render3/r3_jit");
const util_1 = require("../../src/util");
describe('Output JIT', () => {
    describe('regression', () => {
        it('should generate unique argument names', () => {
            const externalIds = (0, util_1.newArray)(10, 1).map((_, index) => new o.ExternalReference('@angular/core', `id_${index}_`));
            const externalIds1 = (0, util_1.newArray)(10, 1).map((_, index) => new o.ExternalReference('@angular/core', `id_${index}_1`));
            const ctx = abstract_emitter_1.EmitterVisitorContext.createRoot();
            const reflectorContext = {};
            for (const { name } of externalIds) {
                reflectorContext[name] = name;
            }
            for (const { name } of externalIds1) {
                reflectorContext[name] = name;
            }
            const converter = new output_jit_1.JitEmitterVisitor(new r3_jit_1.R3JitReflector(reflectorContext));
            converter.visitAllStatements([o.literalArr([...externalIds1, ...externalIds].map((id) => o.importExpr(id))).toStmt()], ctx);
            const args = converter.getArgs();
            expect(Object.keys(args).length).toBe(20);
        });
    });
    it('should use strict mode', () => {
        const evaluator = new output_jit_1.JitEvaluator();
        expect(() => {
            evaluator.evaluateStatements('http://angular.io/something.ts', [
                // Set an undeclared variable
                // foo = "bar";
                o.variable('foo').equals(o.literal('bar')).toStmt(),
            ], new r3_jit_1.R3JitReflector({}), false);
        }).toThrowError();
    });
    it('should not add more than one strict mode statement if there is already one present', () => {
        const converter = new output_jit_1.JitEmitterVisitor(new r3_jit_1.R3JitReflector({}));
        const ctx = abstract_emitter_1.EmitterVisitorContext.createRoot();
        converter.visitAllStatements([o.literal('use strict').toStmt()], ctx);
        const matches = ctx.toSource().match(/'use strict';/g);
        expect(matches.length).toBe(1);
    });
});
