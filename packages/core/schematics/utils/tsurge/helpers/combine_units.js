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
exports.synchronouslyCombineUnitData = synchronouslyCombineUnitData;
/**
 * Synchronously combines unit data for the given migration.
 *
 * Note: This helper is useful for testing and execution of
 * Tsurge migrations in non-batchable environments. In general,
 * prefer parallel execution of combining via e.g. Beam combiners.
 */
function synchronouslyCombineUnitData(migration, unitDatas) {
    return __awaiter(this, void 0, void 0, function* () {
        if (unitDatas.length === 0) {
            return null;
        }
        if (unitDatas.length === 1) {
            return unitDatas[0];
        }
        let combined = unitDatas[0];
        for (let i = 1; i < unitDatas.length; i++) {
            const other = unitDatas[i];
            combined = yield migration.combine(combined, other);
        }
        return combined;
    });
}
