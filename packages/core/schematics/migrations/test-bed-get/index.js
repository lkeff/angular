"use strict";
/*!
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
exports.migrate = migrate;
const test_bed_get_migration_1 = require("./test_bed_get_migration");
const angular_devkit_1 = require("../../utils/tsurge/helpers/angular_devkit");
function migrate() {
    return (tree) => __awaiter(this, void 0, void 0, function* () {
        yield (0, angular_devkit_1.runMigrationInDevkit)({
            tree,
            getMigration: () => new test_bed_get_migration_1.TestBedGetMigration(),
        });
    });
}
