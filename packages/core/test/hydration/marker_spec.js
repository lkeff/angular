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
const utils_1 = require("../../src/hydration/utils");
describe('verifySsrContentsIntegrity', () => {
    if (typeof DOMParser === 'undefined') {
        it('is only tested in the browser', () => {
            expect(typeof DOMParser).toBe('undefined');
        });
        return;
    }
    function doc(html) {
        return __awaiter(this, void 0, void 0, function* () {
            return new DOMParser().parseFromString(html, 'text/html');
        });
    }
    it('fails without integrity marker comment', () => __awaiter(void 0, void 0, void 0, function* () {
        const dom = yield doc('<app-root></app-root>');
        expect(() => (0, utils_1.verifySsrContentsIntegrity)(dom)).toThrowError(/NG0507/);
    }));
    it('succeeds with "complete" DOM', () => __awaiter(void 0, void 0, void 0, function* () {
        const dom = yield doc(`<!doctype html><head><title>Hi</title></head><body><!--${utils_1.SSR_CONTENT_INTEGRITY_MARKER}--><app-root></app-root></body>`);
        expect(() => (0, utils_1.verifySsrContentsIntegrity)(dom)).not.toThrow();
    }));
    it('succeeds with <body>-less DOM', () => __awaiter(void 0, void 0, void 0, function* () {
        const dom = yield doc(`<!doctype html><head><title>Hi</title></head><!--${utils_1.SSR_CONTENT_INTEGRITY_MARKER}--><app-root></app-root>`);
        expect(() => (0, utils_1.verifySsrContentsIntegrity)(dom)).not.toThrow();
    }));
    it('succeeds with <body>- and <head>-less DOM', () => __awaiter(void 0, void 0, void 0, function* () {
        const dom = yield doc(`<!doctype html><title>Hi</title><!--${utils_1.SSR_CONTENT_INTEGRITY_MARKER}--><app-root></app-root>`);
        expect(() => (0, utils_1.verifySsrContentsIntegrity)(dom)).not.toThrow();
    }));
    it('succeeds with <body>-less DOM that contains whitespace', () => __awaiter(void 0, void 0, void 0, function* () {
        const dom = yield doc(`<!doctype html><head><title>Hi</title></head>\n<!--${utils_1.SSR_CONTENT_INTEGRITY_MARKER}-->\n<app-root></app-root>`);
        expect(() => (0, utils_1.verifySsrContentsIntegrity)(dom)).not.toThrow();
    }));
    it('succeeds with <body>- and <head>-less DOM that contains whitespace', () => __awaiter(void 0, void 0, void 0, function* () {
        const dom = yield doc(`<!doctype html><title>Hi</title>\n<!--${utils_1.SSR_CONTENT_INTEGRITY_MARKER}-->\n<app-root></app-root>`);
        expect(() => (0, utils_1.verifySsrContentsIntegrity)(dom)).not.toThrow();
    }));
});
