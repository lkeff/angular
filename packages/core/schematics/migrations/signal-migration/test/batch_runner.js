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
/**
 * @fileoverview Executes the given migration phase in batch mode.
 *
 * I.e. The tsconfig of the project is updated to only consider a single
 * file. Then the migration is invoked.
 */
const childProcess = __importStar(require("child_process"));
const tinyglobby_1 = require("tinyglobby");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const maxParallel = os_1.default.cpus().length;
main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [mode, sourceDir] = process.argv.slice(2);
        const files = (0, tinyglobby_1.globSync)('**/*', { cwd: sourceDir }).filter((f) => f.endsWith('.ts'));
        if (mode === 'analyze') {
            const tsconfig = path_1.default.join(sourceDir, 'tsconfig.json');
            const baseConfig = JSON.parse(fs_1.default.readFileSync(tsconfig, 'utf8'));
            schedule(files, maxParallel, (fileName) => __awaiter(this, void 0, void 0, function* () {
                const tmpTsconfigName = path_1.default.join(sourceDir, `${fileName}.tsconfig.json`);
                const extractResultFile = path_1.default.join(sourceDir, `${fileName}.extract.json`);
                // update tsconfig.
                yield fs_1.default.promises.writeFile(tmpTsconfigName, JSON.stringify(Object.assign(Object.assign({}, baseConfig), { include: [fileName] })));
                // execute command.
                const extractResult = yield promiseExec(`migration extract ${path_1.default.resolve(tmpTsconfigName)}`, { env: Object.assign(Object.assign({}, process.env), { 'LIMIT_TO_ROOT_NAMES_ONLY': '1' }) });
                // write individual result.
                yield fs_1.default.promises.writeFile(extractResultFile, extractResult);
            }));
        }
        else if (mode === 'combine-all') {
            const metadataFiles = files.map((f) => path_1.default.resolve(path_1.default.join(sourceDir, `${f}.extract.json`)));
            const mergeResult = yield promiseExec(`migration combine-all ${metadataFiles.join(' ')}`);
            // write merge result.
            yield fs_1.default.promises.writeFile(path_1.default.join(sourceDir, 'combined.json'), mergeResult);
        }
        else if (mode === 'global-meta') {
            const combinedUnitFile = path_1.default.join(sourceDir, 'combined.json');
            const globalMeta = yield promiseExec(`migration global-meta ${combinedUnitFile}`);
            // write global meta result.
            yield fs_1.default.promises.writeFile(path_1.default.join(sourceDir, 'global_meta.json'), globalMeta);
        }
        else if (mode === 'migrate') {
            schedule(files, maxParallel, (fileName) => __awaiter(this, void 0, void 0, function* () {
                const filePath = path_1.default.join(sourceDir, fileName);
                // tsconfig should exist from analyze phase.
                const tmpTsconfigName = path_1.default.join(sourceDir, `${fileName}.tsconfig.json`);
                const mergeMetadataFile = path_1.default.join(sourceDir, 'global_meta.json');
                // migrate in parallel.
                yield promiseExec(`migration migrate ${path_1.default.resolve(tmpTsconfigName)} ${mergeMetadataFile} ${path_1.default.resolve(filePath)}`, { env: Object.assign(Object.assign({}, process.env), { 'LIMIT_TO_ROOT_NAMES_ONLY': '1' }) });
            }));
        }
    });
}
function promiseExec(command, opts) {
    return new Promise((resolve, reject) => {
        var _a, _b;
        const proc = childProcess.exec(command, opts);
        let stdout = '';
        (_a = proc.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (d) => (stdout += d.toString('utf8')));
        (_b = proc.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (d) => process.stderr.write(d.toString('utf8')));
        proc.on('close', (code, signal) => {
            if (code === 0 && signal === null) {
                resolve(stdout);
            }
            else {
                reject();
            }
        });
    });
}
function schedule(items, maxParallel, doFn) {
    return __awaiter(this, void 0, void 0, function* () {
        let idx = 0;
        let tasks = [];
        while (idx < items.length) {
            tasks = [];
            while (idx < items.length && tasks.length < maxParallel) {
                tasks.push(doFn(items[idx]));
                idx++;
            }
            yield Promise.all(tasks);
        }
    });
}
