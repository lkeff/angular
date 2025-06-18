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
const protractor_1 = require("protractor");
const test_utils_1 = require("./test_utils");
describe('tree benchmark perf', () => {
    it('should work for createOnly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, test_utils_1.runTreeBenchmark)({
            // This cannot be called "createOnly" because the actual destroy benchmark
            // has the "createOnly" id already. See: https://github.com/angular/angular/pull/21503
            id: 'createOnlyForReal',
            prepare: () => (0, protractor_1.$)('#destroyDom').click(),
            work: () => (0, protractor_1.$)('#createDom').click(),
        });
    }));
    it('should work for destroy', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, test_utils_1.runTreeBenchmark)({
            // This is actually a benchmark for destroying the dom, but it has been accidentally
            // named "createOnly". See https://github.com/angular/angular/pull/21503.
            id: 'createOnly',
            prepare: () => (0, protractor_1.$)('#createDom').click(),
            work: () => (0, protractor_1.$)('#destroyDom').click(),
        });
    }));
    it('should work for createDestroy', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, test_utils_1.runTreeBenchmark)({
            id: 'createDestroy',
            work: () => {
                (0, protractor_1.$)('#destroyDom').click();
                (0, protractor_1.$)('#createDom').click();
            },
        });
    }));
    it('should work for update', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, test_utils_1.runTreeBenchmark)({
            id: 'update',
            work: () => (0, protractor_1.$)('#createDom').click(),
        });
    }));
});
