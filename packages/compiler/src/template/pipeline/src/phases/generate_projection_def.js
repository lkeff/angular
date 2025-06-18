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
exports.generateProjectionDefs = generateProjectionDefs;
const core_1 = require("../../../../core");
const ir = __importStar(require("../../ir"));
const conversion_1 = require("../conversion");
/**
 * Locate projection slots, populate the each component's `ngContentSelectors` literal field,
 * populate `project` arguments, and generate the required `projectionDef` instruction for the job's
 * root view.
 */
function generateProjectionDefs(job) {
    // TODO: Why does TemplateDefinitionBuilder force a shared constant?
    const share = job.compatibility === ir.CompatibilityMode.TemplateDefinitionBuilder;
    // Collect all selectors from this component, and its nested views. Also, assign each projection a
    // unique ascending projection slot index.
    const selectors = [];
    let projectionSlotIndex = 0;
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.Projection) {
                selectors.push(op.selector);
                op.projectionSlotIndex = projectionSlotIndex++;
            }
        }
    }
    if (selectors.length > 0) {
        // Create the projectionDef array. If we only found a single wildcard selector, then we use the
        // default behavior with no arguments instead.
        let defExpr = null;
        if (selectors.length > 1 || selectors[0] !== '*') {
            const def = selectors.map((s) => (s === '*' ? s : (0, core_1.parseSelectorToR3Selector)(s)));
            defExpr = job.pool.getConstLiteral((0, conversion_1.literalOrArrayLiteral)(def), share);
        }
        // Create the ngContentSelectors constant.
        job.contentSelectors = job.pool.getConstLiteral((0, conversion_1.literalOrArrayLiteral)(selectors), share);
        // The projection def instruction goes at the beginning of the root view, before any
        // `projection` instructions.
        job.root.create.prepend([ir.createProjectionDefOp(defExpr)]);
    }
}
