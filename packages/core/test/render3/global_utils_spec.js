"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const change_detection_utils_1 = require("../../src/render3/util/change_detection_utils");
const discovery_utils_1 = require("../../src/render3/util/discovery_utils");
const global_utils_1 = require("../../src/render3/util/global_utils");
const profiler_1 = require("../../src/render3/profiler");
const defer_1 = require("../../src/render3/util/defer");
const global_1 = require("../../src/util/global");
describe('global utils', () => {
    describe('publishGlobalUtil', () => {
        it('should publish a function to the window', () => {
            const w = global_1.global;
            const foo = 'foo';
            expect(w[global_utils_1.GLOBAL_PUBLISH_EXPANDO_KEY][foo]).toBeFalsy();
            const fooFn = () => { };
            (0, global_utils_1.publishGlobalUtil)(foo, fooFn);
            expect(w[global_utils_1.GLOBAL_PUBLISH_EXPANDO_KEY][foo]).toBe(fooFn);
        });
    });
    describe('publishDefaultGlobalUtils', () => {
        beforeEach(() => (0, global_utils_1.publishDefaultGlobalUtils)());
        it('should publish getComponent', () => {
            assertPublished('getComponent', discovery_utils_1.getComponent);
        });
        it('should publish getContext', () => {
            assertPublished('getContext', discovery_utils_1.getContext);
        });
        it('should publish getListeners', () => {
            assertPublished('getListeners', discovery_utils_1.getListeners);
        });
        it('should publish getOwningComponent', () => {
            assertPublished('getOwningComponent', discovery_utils_1.getOwningComponent);
        });
        it('should publish getRootComponents', () => {
            assertPublished('getRootComponents', discovery_utils_1.getRootComponents);
        });
        it('should publish getDirectives', () => {
            assertPublished('getDirectives', discovery_utils_1.getDirectives);
        });
        it('should publish getHostComponent', () => {
            assertPublished('getHostElement', discovery_utils_1.getHostElement);
        });
        it('should publish getInjector', () => {
            assertPublished('getInjector', discovery_utils_1.getInjector);
        });
        it('should publish applyChanges', () => {
            assertPublished('applyChanges', change_detection_utils_1.applyChanges);
        });
        it('should publish getDirectiveMetadata', () => {
            assertPublished('getDirectiveMetadata', discovery_utils_1.getDirectiveMetadata);
        });
        it('should publish ɵsetProfiler', () => {
            assertPublished('ɵsetProfiler', profiler_1.setProfiler);
        });
        it('should publish ɵgetDeferBlocks', () => {
            assertPublished('ɵgetDeferBlocks', defer_1.getDeferBlocks);
        });
    });
});
function assertPublished(name, value) {
    const w = global_1.global;
    expect(w[global_utils_1.GLOBAL_PUBLISH_EXPANDO_KEY][name]).toBe(value);
}
