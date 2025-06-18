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
        const markdownContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('docs-card/docs-card.md'), { encoding: 'utf-8' });
        markdownDocument = jsdom_1.JSDOM.fragment(yield (0, parse_1.parseMarkdown)(markdownContent, {}));
    }));
    it('creates cards with no links', () => {
        var _a, _b;
        const cardEl = markdownDocument.querySelectorAll('.docs-card')[0];
        expect((_b = (_a = cardEl.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).toBe('No Link Card');
        expect(cardEl.tagName).not.toBe('A');
    });
    it('creates cards withs links', () => {
        var _a, _b;
        const cardEl = markdownDocument.querySelectorAll('.docs-card')[1];
        expect((_b = (_a = cardEl.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).toBe('Link Card');
        expect(cardEl.tagName).toBe('A');
        expect(cardEl.getAttribute('href')).toBe('in/app/link');
    });
    it('creates cards with svg images', () => {
        var _a, _b;
        const cardEl = markdownDocument.querySelectorAll('.docs-card')[2];
        expect((_b = (_a = cardEl.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).toBe('Image Card');
        expect(cardEl.querySelector('svg')).toBeTruthy();
    });
});
