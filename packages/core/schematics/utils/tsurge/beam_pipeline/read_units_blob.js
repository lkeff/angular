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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCompilationUnitBlob = readCompilationUnitBlob;
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
/**
 * Integrating a `Tsurge` migration requires the "merging" of all
 * compilation unit data into a single "global migration data".
 *
 * This is achieved in a Beam pipeline by having a pipeline stage that
 * takes all compilation unit worker data and writing it into a single
 * buffer, delimited by new lines (`\n`).
 *
 * This "merged bytes files", containing all unit data, one per line, can
 * then be parsed by this function and fed into the migration merge logic.
 *
 * @returns All compilation unit data for the migration.
 */
function readCompilationUnitBlob(_migrationForTypeSafety, mergedUnitDataByteAbsFilePath) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(mergedUnitDataByteAbsFilePath, 'utf8'),
            crlfDelay: Infinity,
        });
        const unitData = [];
        let failed = false;
        rl.on('line', (line) => {
            const trimmedLine = line.trim();
            if (trimmedLine === '') {
                return;
            }
            try {
                const parsed = JSON.parse(trimmedLine);
                unitData.push(parsed);
            }
            catch (e) {
                failed = true;
                reject(new Error(`Could not parse data line: ${e} — ${trimmedLine}`));
                rl.close();
            }
        });
        rl.on('close', () => __awaiter(this, void 0, void 0, function* () {
            if (!failed) {
                resolve(unitData);
            }
        }));
    });
}
