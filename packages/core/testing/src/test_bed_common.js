"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentFixtureNoNgZone = exports.ComponentFixtureAutoDetect = exports.TestComponentRenderer = exports.DEFER_BLOCK_DEFAULT_BEHAVIOR = exports.THROW_ON_UNKNOWN_PROPERTIES_DEFAULT = exports.THROW_ON_UNKNOWN_ELEMENTS_DEFAULT = exports.TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT = void 0;
const core_1 = require("../../src/core");
/** Whether test modules should be torn down by default. */
exports.TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT = true;
/** Whether unknown elements in templates should throw by default. */
exports.THROW_ON_UNKNOWN_ELEMENTS_DEFAULT = false;
/** Whether unknown properties in templates should throw by default. */
exports.THROW_ON_UNKNOWN_PROPERTIES_DEFAULT = false;
/** Whether defer blocks should use manual triggering or play through normally. */
exports.DEFER_BLOCK_DEFAULT_BEHAVIOR = core_1.ɵDeferBlockBehavior.Playthrough;
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @publicApi
 */
class TestComponentRenderer {
    insertRootElement(rootElementId) { }
    removeAllRootElements() { }
}
exports.TestComponentRenderer = TestComponentRenderer;
/**
 * @publicApi
 */
exports.ComponentFixtureAutoDetect = new core_1.InjectionToken('ComponentFixtureAutoDetect');
/**
 * @publicApi
 */
exports.ComponentFixtureNoNgZone = new core_1.InjectionToken('ComponentFixtureNoNgZone');
