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
const SwapFullContext = {
    id: 'swapFullContext',
    work: () => {
        (0, protractor_1.$)('#swapOutFull').click();
    },
};
const ModifyContextProperty = {
    id: 'modifyContextProperty',
    work: () => {
        (0, protractor_1.$)('#modifyProperty').click();
    },
};
const ModifyContextDeepProperty = {
    id: 'modifyContextDeepProperty',
    work: () => {
        (0, protractor_1.$)('#modifyDeepProperty').click();
    },
};
const AddNewContextProperty = {
    id: 'addNewContextProperty',
    work: () => {
        (0, protractor_1.$)('#addNewProperty').click();
    },
};
const scenarios = [
    SwapFullContext,
    ModifyContextProperty,
    ModifyContextDeepProperty,
    AddNewContextProperty,
];
describe('ng_template_outlet_context benchmark spec', () => {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    scenarios.forEach((worker) => {
        describe(worker.id, () => {
            it('should run for ng2', () => __awaiter(void 0, void 0, void 0, function* () {
                yield runBenchmarkScenario({
                    url: '/',
                    id: `ngTemplateOutletContext.ng2.${worker.id}`,
                    worker: worker,
                });
            }));
        });
    });
    function runBenchmarkScenario(config) {
        return (0, driver_utilities_1.runBenchmark)({
            id: config.id,
            url: config.url,
            ignoreBrowserSynchronization: true,
            prepare: config.worker.prepare,
            work: config.worker.work,
        });
    }
});
