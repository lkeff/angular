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
const CreateWorker = {
    id: 'create',
    prepare: () => (0, protractor_1.$)('#prepare').click(),
    work: () => (0, protractor_1.$)('#createDom').click(),
};
const UpdateWorker = {
    id: 'update',
    prepare: () => {
        (0, protractor_1.$)('#prepare').click();
        (0, protractor_1.$)('#createDom').click();
    },
    work: () => (0, protractor_1.$)('#updateDom').click(),
};
// In order to make sure that we don't change the ids of the benchmarks, we need to
// determine the current test package name from the Bazel target. This is necessary
// because previous to the Bazel conversion, the benchmark test ids contained the test
// name. e.g. "largeTable.ng2_switch.createDestroy". We determine the name of the
// Bazel package where this test runs from the current test target. The Bazel target
// looks like: "//modules/benchmarks/src/largetable/{pkg_name}:{target_name}".
const testPackageName = process.env['BAZEL_TARGET'].split(':')[0].split('/').pop();
describe('hydration benchmark perf', () => {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    [CreateWorker, UpdateWorker].forEach((worker) => {
        describe(worker.id, () => {
            it(`should run benchmark for ${testPackageName}`, () => __awaiter(void 0, void 0, void 0, function* () {
                yield runTableBenchmark({
                    id: `hydration.${testPackageName}.${worker.id}`,
                    url: '/',
                    ignoreBrowserSynchronization: true,
                    worker,
                });
            }));
        });
    });
});
function runTableBenchmark(config) {
    return (0, driver_utilities_1.runBenchmark)({
        id: config.id,
        url: config.url,
        ignoreBrowserSynchronization: config.ignoreBrowserSynchronization,
        params: [
            { name: 'cols', value: 40 },
            { name: 'rows', value: 200 },
        ],
        prepare: config.worker.prepare,
        work: config.worker.work,
    });
}
