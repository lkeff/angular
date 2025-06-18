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
const driver_utilities_1 = require("@angular/build-tooling/bazel/benchmark/driver-utilities");
const protractor_1 = require("protractor");
describe('benchmarks', () => {
    it('should work for create', () => __awaiter(void 0, void 0, void 0, function* () {
        protractor_1.browser.rootEl = '#root';
        yield (0, driver_utilities_1.runBenchmark)({
            id: 'create',
            url: '',
            ignoreBrowserSynchronization: true,
            params: [],
            prepare: () => (0, protractor_1.$)('#reset').click(),
            work: () => (0, protractor_1.$)('#init').click(),
        });
    }));
});
