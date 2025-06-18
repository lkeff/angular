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
exports.attachSourceLocations = attachSourceLocations;
const ir = __importStar(require("../../ir"));
/**
 * Locates all of the elements defined in a creation block and outputs an op
 * that will expose their definition location in the DOM.
 */
function attachSourceLocations(job) {
    if (!job.enableDebugLocations || job.relativeTemplatePath === null) {
        return;
    }
    for (const unit of job.units) {
        const locations = [];
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.ElementStart || op.kind === ir.OpKind.Element) {
                const start = op.startSourceSpan.start;
                locations.push({
                    targetSlot: op.handle,
                    offset: start.offset,
                    line: start.line,
                    column: start.col,
                });
            }
        }
        if (locations.length > 0) {
            unit.create.push(ir.createSourceLocationOp(job.relativeTemplatePath, locations));
        }
    }
}
