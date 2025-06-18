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
const fs_1 = require("fs");
const nav_items_gen_1 = require("./nav-items-gen");
const strategies_1 = require("./strategies");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [paramFilePath] = process.argv.slice(2);
        const rawParamLines = (0, fs_1.readFileSync)(paramFilePath, { encoding: 'utf8' }).split('\n');
        const [joinedSrcs, packageDir, strategy, outputFilePath] = rawParamLines;
        const srcs = joinedSrcs.split(',');
        // Generate navigation data
        const navData = yield (0, nav_items_gen_1.generateNavItems)(srcs, (0, strategies_1.getNavItemGenStrategy)(strategy, packageDir));
        (0, fs_1.writeFileSync)(outputFilePath, JSON.stringify(navData));
    });
}
await main();
