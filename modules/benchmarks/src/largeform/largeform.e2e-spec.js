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
describe('largeform benchmark', () => {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    it('should work for ng2', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, driver_utilities_1.openBrowser)({
            url: '/',
            params: [{ name: 'copies', value: 1 }],
            ignoreBrowserSynchronization: true,
        });
        yield (0, protractor_1.$)('#createDom').click();
        expect(yield protractor_1.element.all(protractor_1.By.css('input[name=value0]')).get(0).getAttribute('value')).toBe('someValue0');
        yield (0, protractor_1.$)('#destroyDom').click();
        expect(yield protractor_1.element.all(protractor_1.By.css('input[name=value0]')).count()).toBe(0);
    }));
});
