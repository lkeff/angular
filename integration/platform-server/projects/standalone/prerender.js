"use strict";
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
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/* tslint:disable:no-console  */
const platform_server_1 = require("@angular/platform-server");
const main_server_1 = __importDefault(require("./src/main.server"));
const node_url_1 = require("node:url");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const serverDistFolder = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(import.meta.url));
const browserDistFolder = (0, node_path_1.resolve)(serverDistFolder, '../browser');
const indexHtml = (0, node_fs_1.readFileSync)((0, node_path_1.join)(browserDistFolder, 'index.csr.html'), 'utf-8');
function runTest() {
    return __awaiter(this, void 0, void 0, function* () {
        // Test and validate the errors are printed in the console.
        const originalConsoleError = console.error;
        const errors = [];
        console.error = (error, data) => errors.push(error.toString() + ' ' + data.toString());
        try {
            yield (0, platform_server_1.renderApplication)(main_server_1.default, {
                document: indexHtml,
                url: '/error',
            });
        }
        catch (_a) { }
        console.error = originalConsoleError;
        // Test case
        if (!errors.some((e) => e.includes('Error in resolver'))) {
            errors.forEach(console.error);
            console.error('\nError: expected rendering errors ("Error in resolver") to be printed in the console.\n');
            process.exit(1);
        }
    });
}
runTest();
