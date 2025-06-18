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
exports.generateNgContainerOps = generateNgContainerOps;
const ir = __importStar(require("../../ir"));
const CONTAINER_TAG = 'ng-container';
/**
 * Replace an `Element` or `ElementStart` whose tag is `ng-container` with a specific op.
 */
function generateNgContainerOps(job) {
    for (const unit of job.units) {
        const updatedElementXrefs = new Set();
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.ElementStart && op.tag === CONTAINER_TAG) {
                // Transmute the `ElementStart` instruction to `ContainerStart`.
                op.kind = ir.OpKind.ContainerStart;
                updatedElementXrefs.add(op.xref);
            }
            if (op.kind === ir.OpKind.ElementEnd && updatedElementXrefs.has(op.xref)) {
                // This `ElementEnd` is associated with an `ElementStart` we already transmuted.
                op.kind = ir.OpKind.ContainerEnd;
            }
        }
    }
}
