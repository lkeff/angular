"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGlobalMetaPhase = executeGlobalMetaPhase;
/**
 * Executes the `globalMeta` stage for the given migration
 * to convert the combined unit data into global meta.
 *
 * @returns the serializable global meta.
 */
function executeGlobalMetaPhase(migration, combinedUnitData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield migration.globalMeta(combinedUnitData);
    });
}
