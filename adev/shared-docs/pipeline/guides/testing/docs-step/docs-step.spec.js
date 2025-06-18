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
        const markdownContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('docs-step/docs-step.md'), { encoding: 'utf-8' });
        markdownDocument = jsdom_1.JSDOM.fragment(yield (0, parse_1.parseMarkdown)(markdownContent, {}));
    }));
    it('should create a list item for each step', () => {
        const stepEls = markdownDocument.querySelectorAll('li');
        expect(stepEls.length).toBe(2);
    });
    it('should render each step with the provided information', () => {
        var _a, _b, _c, _d;
        const [firstStepEl, secondStepEl] = markdownDocument.querySelectorAll('li');
        const firstStepAEl = firstStepEl.querySelector('a');
        const firstStepTextContentEl = firstStepEl.querySelector('p');
        const firstStepHeadingEl = firstStepEl.querySelector('h3');
        expect((_a = firstStepHeadingEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).toBe('Step 1');
        expect(firstStepTextContentEl.textContent).toContain('first thing');
        expect(firstStepAEl.getAttribute('href')).toBe(`#${firstStepHeadingEl.getAttribute('id')}`);
        expect(firstStepAEl.getAttribute('tabindex')).toBe('-1');
        expect((_c = (_b = secondStepEl.querySelector('h3')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim()).toBe('Step B');
        expect((_d = secondStepEl.querySelector('p')) === null || _d === void 0 ? void 0 : _d.textContent).toContain('another thing');
    });
    it('should create a self referencial anchor for the step', () => {
        const firstStepEl = markdownDocument.querySelector('li');
        const firstStepAEl = firstStepEl.querySelector('a');
        const firstStepHeadingEl = firstStepEl.querySelector('h3');
        expect(firstStepAEl.getAttribute('href')).toBe(`#${firstStepHeadingEl.getAttribute('id')}`);
        expect(firstStepAEl.getAttribute('tabindex')).toBe('-1');
    });
    it('should create a a link that is not reachable via tab', () => {
        const firstStepEl = markdownDocument.querySelector('li');
        const firstStepAEl = firstStepEl.querySelector('a');
        expect(firstStepAEl.getAttribute('tabindex')).toBe('-1');
    });
});
