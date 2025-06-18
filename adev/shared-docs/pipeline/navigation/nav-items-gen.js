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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNavItems = generateNavItems;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const path_1 = require("path");
/**
 * Generate navigations items by a provided strategy.
 *
 * @param mdFilesPaths Paths to the Markdown files that represent the page contents
 * @param strategy Strategy
 * @returns An array with navigation items
 */
function generateNavItems(mdFilesPaths, strategy) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const navItems = [];
        const { labelGeneratorFn, pathPrefix, contentPath } = strategy;
        for (const path of mdFilesPaths) {
            const fullPath = (0, path_1.resolve)((0, path_1.dirname)(path), (0, path_1.basename)(path));
            const name = (_a = path.split('/').pop()) === null || _a === void 0 ? void 0 : _a.replace('.md', '');
            const firstLine = yield getMdFileHeading(fullPath);
            navItems.push({
                label: labelGeneratorFn(name, firstLine),
                path: `${pathPrefix}/${name}`,
                contentPath: `${contentPath}/${name}`,
            });
        }
        return navItems;
    });
}
/** Extract the first heading from a Markdown file. */
function getMdFileHeading(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const readStream = fs_1.default.createReadStream(filePath);
        const rl = readline_1.default.createInterface({ input: readStream });
        try {
            for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a; _d = true) {
                _c = rl_1_1.value;
                _d = false;
                const line = _c;
                if (line.trim().startsWith('#')) {
                    rl.close();
                    readStream.destroy();
                    return line.replace(/^#+[ \t]+/, '');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return '';
    });
}
