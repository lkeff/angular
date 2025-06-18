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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const analyze_exec_1 = require("../../../../utils/tsurge/executors/analyze_exec");
const migrate_exec_1 = require("../../../../utils/tsurge/executors/migrate_exec");
const migration_1 = require("../migration");
const write_replacements_1 = require("../write_replacements");
const global_meta_exec_1 = require("../../../../utils/tsurge/executors/global_meta_exec");
const combine_units_1 = require("../../../../utils/tsurge/helpers/combine_units");
main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [mode, ...args] = process.argv.slice(2);
        const migration = new migration_1.SignalInputMigration({ insertTodosForSkippedFields: true });
        if (mode === 'extract') {
            const analyzeResult = yield (0, analyze_exec_1.executeAnalyzePhase)(migration, path_1.default.resolve(args[0]));
            process.stdout.write(JSON.stringify(analyzeResult));
        }
        else if (mode === 'combine-all') {
            const unitPromises = args.map((f) => readUnitMeta(path_1.default.resolve(f)));
            const units = yield Promise.all(unitPromises);
            const mergedResult = yield (0, combine_units_1.synchronouslyCombineUnitData)(migration, units);
            process.stdout.write(JSON.stringify(mergedResult));
        }
        else if (mode === 'global-meta') {
            const metaResult = yield (0, global_meta_exec_1.executeGlobalMetaPhase)(migration, yield readUnitMeta(args[0]));
            process.stdout.write(JSON.stringify(metaResult));
        }
        else if (mode === 'migrate') {
            const { replacements, projectRoot } = yield (0, migrate_exec_1.executeMigratePhase)(migration, JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(args[1]), 'utf8')), path_1.default.resolve(args[0]));
            (0, write_replacements_1.writeMigrationReplacements)(replacements, projectRoot);
        }
    });
}
function readUnitMeta(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_1.default.promises
            .readFile(filePath, 'utf8')
            .then((data) => JSON.parse(data));
    });
}
