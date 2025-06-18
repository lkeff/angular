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
exports.removeUnusedI18nAttributesOps = removeUnusedI18nAttributesOps;
const ir = __importStar(require("../../ir"));
/**
 * i18nAttributes ops will be generated for each i18n attribute. However, not all i18n attribues
 * will contain dynamic content, and so some of these i18nAttributes ops may be unnecessary.
 */
function removeUnusedI18nAttributesOps(job) {
    for (const unit of job.units) {
        const ownersWithI18nExpressions = new Set();
        for (const op of unit.update) {
            switch (op.kind) {
                case ir.OpKind.I18nExpression:
                    ownersWithI18nExpressions.add(op.i18nOwner);
            }
        }
        for (const op of unit.create) {
            switch (op.kind) {
                case ir.OpKind.I18nAttributes:
                    if (ownersWithI18nExpressions.has(op.xref)) {
                        continue;
                    }
                    ir.OpList.remove(op);
            }
        }
    }
}
