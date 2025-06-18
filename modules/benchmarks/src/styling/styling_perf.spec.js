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
/** List of possible scenarios that should be tested.  */
const SCENARIOS = [
    { optionIndex: 0, id: 'no_styling_involved' },
    { optionIndex: 1, id: 'static_class' },
    { optionIndex: 2, id: 'static_class_with_interpolation' },
    { optionIndex: 3, id: 'class_binding' },
    { optionIndex: 4, id: 'static_class_and_class_binding' },
    { optionIndex: 5, id: 'static_class_and_ngclass_binding' },
    { optionIndex: 6, id: 'static_class_and_ngstyle_binding_and_style_binding' },
    { optionIndex: 7, id: 'static_style' },
    { optionIndex: 8, id: 'style_property_bindings' },
    { optionIndex: 9, id: 'static_style_and_property_binding' },
    { optionIndex: 10, id: 'ng_style_with_units' },
];
describe('styling benchmark spec', () => {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    it('should render and interact to update and detect changes', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, driver_utilities_1.openBrowser)({ url: '/', ignoreBrowserSynchronization: true });
        create();
        const items = protractor_1.element.all(protractor_1.by.css('styling-bindings button'));
        expect(yield items.count()).toBe(2000);
        expect(yield items.first().getAttribute('title')).toBe('bar');
        update();
        expect(yield items.first().getAttribute('title')).toBe('baz');
    }));
    it('should render and run noop change detection', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, driver_utilities_1.openBrowser)({ url: '/', ignoreBrowserSynchronization: true });
        create();
        const items = protractor_1.element.all(protractor_1.by.css('styling-bindings button'));
        expect(yield items.count()).toBe(2000);
        expect(yield items.first().getAttribute('title')).toBe('bar');
        detectChanges();
        expect(yield items.first().getAttribute('title')).toBe('bar');
    }));
    // Create benchmarks for each possible test scenario.
    SCENARIOS.forEach(({ optionIndex, id }) => {
        describe(id, () => {
            it('should run create benchmark', () => __awaiter(void 0, void 0, void 0, function* () {
                yield runStylingBenchmark(`styling.${id}.create`, {
                    work: () => create(),
                    prepare: () => {
                        selectScenario(optionIndex);
                        destroy();
                    },
                });
            }));
            it('should run update benchmark', () => __awaiter(void 0, void 0, void 0, function* () {
                yield runStylingBenchmark(`styling.${id}.update`, {
                    work: () => update(),
                    prepare: () => {
                        selectScenario(optionIndex);
                        create();
                    },
                });
            }));
            it('should run detect changes benchmark', () => __awaiter(void 0, void 0, void 0, function* () {
                yield runStylingBenchmark(`styling.${id}.noop_cd`, {
                    work: () => detectChanges(),
                    prepare: () => {
                        selectScenario(optionIndex);
                        create();
                    },
                });
            }));
        });
    });
});
function selectScenario(optionIndex) {
    // Switch to the current scenario by clicking the corresponding option.
    protractor_1.element.all(protractor_1.by.tagName('option')).get(optionIndex).click();
}
function create() {
    (0, protractor_1.$)('#create').click();
}
function destroy() {
    (0, protractor_1.$)('#destroy').click();
}
function update() {
    (0, protractor_1.$)('#update').click();
}
function detectChanges() {
    (0, protractor_1.$)('#detect_changes').click();
}
/**
 * Runs the styling benchmark with the given id and worker. The worker describes
 * the actions that should run for preparation and measurement.
 */
function runStylingBenchmark(id, worker) {
    return (0, driver_utilities_1.runBenchmark)({
        id,
        url: '/',
        params: [],
        ignoreBrowserSynchronization: true,
        prepare: worker.prepare,
        work: worker.work,
    });
}
