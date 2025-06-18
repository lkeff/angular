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
exports.removeContentSelectors = removeContentSelectors;
const ir = __importStar(require("../../ir"));
const elements_1 = require("../util/elements");
/**
 * Attributes of `ng-content` named 'select' are specifically removed, because they control which
 * content matches as a property of the `projection`, and are not a plain attribute.
 */
function removeContentSelectors(job) {
    for (const unit of job.units) {
        const elements = (0, elements_1.createOpXrefMap)(unit);
        for (const op of unit.ops()) {
            switch (op.kind) {
                case ir.OpKind.Binding:
                    const target = lookupInXrefMap(elements, op.target);
                    if (isSelectAttribute(op.name) && target.kind === ir.OpKind.Projection) {
                        ir.OpList.remove(op);
                    }
                    break;
            }
        }
    }
}
function isSelectAttribute(name) {
    return name.toLowerCase() === 'select';
}
/**
 * Looks up an element in the given map by xref ID.
 */
function lookupInXrefMap(map, xref) {
    const el = map.get(xref);
    if (el === undefined) {
        throw new Error('All attributes should have an slottable target.');
    }
    return el;
}
