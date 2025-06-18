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
const util_1 = require("./util");
describe('Defer E2E Tests', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Don't wait for Angular since it is not bootstrapped automatically.
        yield protractor_1.browser.waitForAngularEnabled(false);
        // Load the page without waiting for Angular since it is not bootstrapped automatically.
        yield (0, util_1.navigateTo)('defer');
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Make sure there were no client side errors.
        yield (0, util_1.verifyNoBrowserErrors)();
    }));
    it('should text in defered component with input', () => __awaiter(void 0, void 0, void 0, function* () {
        // Test the contents from the server.
        expect(yield (0, protractor_1.element)(protractor_1.by.css('p')).getText()).toEqual('Hydrate Never works!');
        yield (0, util_1.bootstrapClientApp)();
        // Retest the contents after the client bootstraps.
        expect(yield (0, protractor_1.element)(protractor_1.by.css('p')).getText()).toEqual('Hydrate Never works!');
    }));
});
