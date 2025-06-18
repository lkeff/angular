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
exports.ɵutil = exports.ɵupgradeHelper = exports.ɵconstants = exports.ɵangular1 = void 0;
/**
 * Note: We intentionally use cross entry-point relative paths here. This
 * is because the primary entry-point is deprecated and we also don't have
 * it available in G3.
 */
// @ng_package: ignore-cross-repo-import
const ɵangular1 = __importStar(require("../src/common/src/angular1"));
exports.ɵangular1 = ɵangular1;
// @ng_package: ignore-cross-repo-import
const ɵconstants = __importStar(require("../src/common/src/constants"));
exports.ɵconstants = ɵconstants;
// @ng_package: ignore-cross-repo-import
const ɵupgradeHelper = __importStar(require("../src/common/src/upgrade_helper"));
exports.ɵupgradeHelper = ɵupgradeHelper;
// @ng_package: ignore-cross-repo-import
const ɵutil = __importStar(require("../src/common/src/util"));
exports.ɵutil = ɵutil;
