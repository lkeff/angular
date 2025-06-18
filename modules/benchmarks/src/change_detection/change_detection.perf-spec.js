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
// Used to benchmark performance when insertion tree is not dirty.
const InsertionNotDirtyWorker = {
    id: 'insertionNotDirty',
    prepare: () => {
        (0, protractor_1.$)('#destroyDom').click();
        (0, protractor_1.$)('#createDom').click();
    },
    work: () => (0, protractor_1.$)('#detectChanges').click(),
};
// Used to benchmark performance when both declaration and insertion trees are dirty.
const AllComponentsDirtyWorker = {
    id: 'allComponentsDirty',
    prepare: () => {
        (0, protractor_1.$)('#destroyDom').click();
        (0, protractor_1.$)('#createDom').click();
        (0, protractor_1.$)('#markInsertionComponentForCheck').click();
    },
    work: () => (0, protractor_1.$)('#detectChanges').click(),
};
// In order to make sure that we don't change the ids of the benchmarks, we need to
// determine the current test package name from the Bazel target. This is necessary
// because previous to the Bazel conversion, the benchmark test ids contained the test
// name. We determine the name of the Bazel package where this test runs from the current test
// target. The Bazel target
// looks like: "//modules/benchmarks/src/change_detection/{pkg_name}:{target_name}".
const testPackageName = process.env['BAZEL_TARGET'].split(':')[0].split('/').pop();
describe('change detection benchmark perf', () => {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    [InsertionNotDirtyWorker, AllComponentsDirtyWorker].forEach((worker) => {
        describe(worker.id, () => {
            it(`should run benchmark for ${testPackageName}`, () => __awaiter(void 0, void 0, void 0, function* () {
                yield runChangeDetectionBenchmark({
                    id: `change_detection.${testPackageName}.${worker.id}`,
                    url: '/',
                    ignoreBrowserSynchronization: true,
                    worker: worker,
                });
            }));
        });
    });
});
function runChangeDetectionBenchmark(config) {
    return (0, driver_utilities_1.runBenchmark)({
        id: config.id,
        url: config.url,
        ignoreBrowserSynchronization: config.ignoreBrowserSynchronization,
        params: [{ name: 'viewCount', value: 10 }],
        prepare: config.worker.prepare,
        work: config.worker.work,
    });
}
