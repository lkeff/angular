#!/usr/bin/env node
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
// Must be imported first, because Angular decorators throw on load.
require("reflect-metadata");
const file_system_1 = require("../ngtsc/file_system");
const main_1 = require("../main");
function runNgcComamnd() {
    return __awaiter(this, void 0, void 0, function* () {
        process.title = 'Angular Compiler (ngc)';
        const args = process.argv.slice(2);
        // We are running the real compiler so run against the real file-system
        (0, file_system_1.setFileSystem)(new file_system_1.NodeJSFileSystem());
        process.exitCode = (0, main_1.main)(args, undefined, undefined, undefined, undefined, undefined);
    });
}
runNgcComamnd().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
