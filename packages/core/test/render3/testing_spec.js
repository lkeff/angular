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
const testing_1 = require("@angular/private/testing");
describe('testing', () => {
    describe('withBody', () => {
        let passed;
        beforeEach(() => (passed = false));
        afterEach(() => expect(passed).toEqual(true));
        it('should set up body', (0, testing_1.withBody)('<span>works!</span>', () => {
            expect(document.body.innerHTML).toEqual('<span>works!</span>');
            passed = true;
        }));
        it('should support promises', (0, testing_1.withBody)('<span>works!</span>', () => {
            return Promise.resolve(true).then(() => {
                passed = true;
            });
        }));
        it('should support async and await', (0, testing_1.withBody)('<span>works!</span>', () => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.resolve(true);
            passed = true;
        })));
    });
    describe('domino', () => {
        it('should have document present', () => {
            // In Browser this tests passes, bun we also want to make sure we pass in node.js
            // We expect that node.js will load domino for us.
            expect(document).toBeTruthy();
        });
    });
    describe('requestAnimationFrame', () => {
        it('should have requestAnimationFrame', (done) => {
            // In Browser we have requestAnimationFrame, but verify that we also have it node.js
            requestAnimationFrame(() => done());
        });
    });
});
