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
const testing_1 = require("../testing");
const error_handler_1 = require("../src/error_handler");
class MockConsole {
    constructor() {
        this.res = [];
    }
    error(...s) {
        this.res.push(s);
    }
}
function errorToString(error) {
    const logger = new MockConsole();
    const errorHandler = new error_handler_1.ErrorHandler();
    errorHandler._console = logger;
    errorHandler.handleError(error);
    return logger.res.map((line) => line.map((x) => `${x}`).join('#')).join('\n');
}
describe('ErrorHandler', () => {
    it('should output exception', () => {
        const e = errorToString(new Error('message!'));
        expect(e).toContain('message!');
    });
    it('should correctly handle primitive values', () => {
        expect(errorToString('message')).toBe('ERROR#message');
        expect(errorToString(404)).toBe('ERROR#404');
        expect(errorToString(0)).toBe('ERROR#0');
        expect(errorToString(true)).toBe('ERROR#true');
        expect(errorToString(false)).toBe('ERROR#false');
        expect(errorToString(null)).toBe('ERROR#null');
        expect(errorToString(undefined)).toBe('ERROR#undefined');
    });
    it('installs global error handler once', () => __awaiter(void 0, void 0, void 0, function* () {
        if (isNode) {
            return;
        }
        // override global.onerror to prevent jasmine report error
        let originalWindowOnError = window.onerror;
        window.onerror = function () { };
        testing_1.TestBed.configureTestingModule({
            rethrowApplicationErrors: false,
            providers: [(0, error_handler_1.provideBrowserGlobalErrorListeners)(), (0, error_handler_1.provideBrowserGlobalErrorListeners)()],
        });
        const spy = spyOn(testing_1.TestBed.inject(error_handler_1.ErrorHandler), 'handleError');
        yield new Promise((resolve) => {
            setTimeout(() => {
                throw new Error('abc');
            });
            setTimeout(resolve, 1);
        });
        expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ message: 'abc' }));
        expect(spy.calls.count()).toBe(1);
        window.onerror = originalWindowOnError;
    }));
});
