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
exports.createOpXrefMap = createOpXrefMap;
const ir = __importStar(require("../../ir"));
/**
 * Gets a map of all elements in the given view by their xref id.
 */
function createOpXrefMap(unit) {
    const map = new Map();
    for (const op of unit.create) {
        if (!ir.hasConsumesSlotTrait(op)) {
            continue;
        }
        map.set(op.xref, op);
        // TODO(dylhunn): `@for` loops with `@empty` blocks need to be special-cased here,
        // because the slot consumer trait currently only supports one slot per consumer and we
        // need two. This should be revisited when making the refactors mentioned in:
        // https://github.com/angular/angular/pull/53620#discussion_r1430918822
        if (op.kind === ir.OpKind.RepeaterCreate && op.emptyView !== null) {
            map.set(op.emptyView, op);
        }
    }
    return map;
}
