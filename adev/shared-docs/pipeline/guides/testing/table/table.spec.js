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
const promises_1 = require("fs/promises");
const parse_1 = require("../../../guides/parse");
const runfiles_1 = require("@bazel/runfiles");
describe('markdown to html', () => {
    let parsedMarkdown;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const markdownContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('table/table.md'), {
            encoding: 'utf-8',
        });
        parsedMarkdown = yield (0, parse_1.parseMarkdown)(markdownContent, {});
    }));
    it('should wrap the table in custom div', () => {
        expect(parsedMarkdown).toContain('<div class="docs-table docs-scroll-track-transparent">');
    });
    it('should place the initial row as table header cells', () => {
        expect(parsedMarkdown).toContain('<th>Sports</th>');
        expect(parsedMarkdown).toContain('<th>Season</th>');
    });
    it('should place the subsequent rows as regular table cells', () => {
        expect(parsedMarkdown).toContain('<td>Baseball</td>');
        expect(parsedMarkdown).toContain('<td>Year Round</td>');
    });
});
