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
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('Security E2E Tests', () => {
    beforeAll(() => protractor_1.browser.get(''));
    it('sanitizes innerHTML', () => __awaiter(void 0, void 0, void 0, function* () {
        const interpolated = (0, protractor_1.element)(protractor_1.By.className('e2e-inner-html-interpolated'));
        expect(yield interpolated.getText()).toContain('Template <script>alert("0wned")</script> <b>Syntax</b>');
        const bound = (0, protractor_1.element)(protractor_1.By.className('e2e-inner-html-bound'));
        expect(yield bound.getText()).toContain('Template Syntax');
        const bold = (0, protractor_1.element)(protractor_1.By.css('.e2e-inner-html-bound b'));
        expect(yield bold.getText()).toContain('Syntax');
    }));
    it('escapes untrusted URLs', () => __awaiter(void 0, void 0, void 0, function* () {
        const untrustedUrl = (0, protractor_1.element)(protractor_1.By.className('e2e-dangerous-url'));
        expect(yield untrustedUrl.getAttribute('href')).toMatch(/^unsafe:javascript/);
    }));
    it('binds trusted URLs', () => __awaiter(void 0, void 0, void 0, function* () {
        const trustedUrl = (0, protractor_1.element)(protractor_1.By.className('e2e-trusted-url'));
        expect(yield trustedUrl.getAttribute('href')).toMatch(/^javascript:alert/);
    }));
    it('escapes untrusted resource URLs', () => __awaiter(void 0, void 0, void 0, function* () {
        const iframe = (0, protractor_1.element)(protractor_1.By.className('e2e-iframe-untrusted-src'));
        expect(yield iframe.getAttribute('src')).toBe('');
    }));
    it('binds trusted resource URLs', () => __awaiter(void 0, void 0, void 0, function* () {
        const iframe = (0, protractor_1.element)(protractor_1.By.className('e2e-iframe-trusted-src'));
        expect(yield iframe.getAttribute('src')).toMatch(/^https:\/\/www\.youtube\.com\//);
    }));
});
