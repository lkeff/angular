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
exports.checkFilesInDirectory = void 0;
const navigation_utils_1 = require("./navigation.utils");
const checkFilesInDirectory = (dir_1, fs_1, filterFromRootPredicate_1, ...args_1) => __awaiter(void 0, [dir_1, fs_1, filterFromRootPredicate_1, ...args_1], void 0, function* (dir, fs, filterFromRootPredicate, files = []) {
    var _a;
    const entries = (_a = (yield fs.readdir(dir, { withFileTypes: true }))) !== null && _a !== void 0 ? _a : [];
    for (const entry of entries) {
        const fullPath = (0, navigation_utils_1.normalizePath)(`${dir}/${entry.name}`);
        if (filterFromRootPredicate && !(filterFromRootPredicate === null || filterFromRootPredicate === void 0 ? void 0 : filterFromRootPredicate(entry.name))) {
            continue;
        }
        if (entry.isFile()) {
            const content = yield fs.readFile(fullPath, 'utf-8');
            files.push({ content, path: fullPath });
        }
        else if (entry.isDirectory()) {
            yield (0, exports.checkFilesInDirectory)(fullPath, fs, null, files);
        }
    }
    return files;
});
exports.checkFilesInDirectory = checkFilesInDirectory;
