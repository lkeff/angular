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
const parse_1 = require("../../../guides/parse");
const runfiles_1 = require("@bazel/runfiles");
const promises_1 = require("fs/promises");
const jsdom_1 = require("jsdom");
describe('markdown to html', () => {
    let markdownDocument;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const markdownContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('image/image.md'), {
            encoding: 'utf-8',
        });
        markdownDocument = jsdom_1.JSDOM.fragment(yield (0, parse_1.parseMarkdown)(markdownContent, {}));
    }));
    it('should wrap images in custom classes', () => {
        const image = markdownDocument.querySelector('img');
        expect(image === null || image === void 0 ? void 0 : image.classList.contains('docs-image')).toBeTrue();
    });
    it('should handle images hosted internal to the application', () => {
        const image = markdownDocument.querySelector('img[title="Local Image"]');
        expect(image === null || image === void 0 ? void 0 : image.getAttribute('src')).toBe('unknown/some-image.png');
    });
});
