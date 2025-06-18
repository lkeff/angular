"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ng_debug_api_1 = require("./ng-debug-api");
const core_enums_1 = require("../component-tree/core-enums");
/** Add a root element to the body. */
const mockRoot = () => {
    document.body.replaceChildren();
    const root = document.createElement('div');
    root.setAttribute('ng-version', '');
    document.body.appendChild(root);
};
/** Creates an `ng` object with a `getDirectiveMetadata` mock. */
const fakeNgGlobal = (framework) => ({
    getComponent() {
        return {};
    },
    getDirectiveMetadata() {
        return {
            framework,
        };
    },
});
describe('ng-debug-api', () => {
    afterEach(() => {
        delete globalThis.ng;
    });
    describe('ngDebugDependencyInjectionApiIsSupported', () => {
        const goldenNg = {
            getInjector() { },
            ɵgetInjectorResolutionPath() { },
            ɵgetDependenciesFromInjectable() { },
            ɵgetInjectorProviders() { },
            ɵgetInjectorMetadata() { },
        };
        it('returns true when required APIs are supported', () => {
            globalThis.ng = goldenNg;
            expect((0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)()).toBeTrue();
        });
        it('returns false when any required API is missing', () => {
            globalThis.ng = Object.assign(Object.assign({}, goldenNg), { getInjector: undefined });
            expect((0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)()).toBeFalse();
            globalThis.ng = Object.assign(Object.assign({}, goldenNg), { ɵgetInjectorResolutionPath: undefined });
            expect((0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)()).toBeFalse();
            globalThis.ng = Object.assign(Object.assign({}, goldenNg), { ɵgetDependenciesFromInjectable: undefined });
            expect((0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)()).toBeFalse();
            globalThis.ng = Object.assign(Object.assign({}, goldenNg), { ɵgetInjectorProviders: undefined });
            expect((0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)()).toBeFalse();
            globalThis.ng = Object.assign(Object.assign({}, goldenNg), { ɵgetInjectorMetadata: undefined });
            expect((0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)()).toBeFalse();
        });
    });
    describe('ngDebugProfilerApiIsSupported', () => {
        // Tests must be updated after the temporary solutions
        // are replaced in favor of the stable API.
        beforeEach(() => mockRoot());
        it('should support Profiler API', () => {
            globalThis.ng = fakeNgGlobal(core_enums_1.Framework.Angular);
            expect((0, ng_debug_api_1.ngDebugProfilerApiIsSupported)()).toBeTrue();
            globalThis.ng = fakeNgGlobal(core_enums_1.Framework.ACX);
            expect((0, ng_debug_api_1.ngDebugProfilerApiIsSupported)()).toBeTrue();
        });
        it('should NOT support Profiler API', () => {
            globalThis.ng = fakeNgGlobal(core_enums_1.Framework.Wiz);
            expect((0, ng_debug_api_1.ngDebugRoutesApiIsSupported)()).toBeFalse();
        });
    });
    describe('ngDebugRoutesApiIsSupported', () => {
        // Tests must be updated after the temporary solutions
        // are replaced in favor of the stable API.
        beforeEach(() => mockRoot());
        it('should support Routes API', () => {
            globalThis.ng = fakeNgGlobal(core_enums_1.Framework.Angular);
            expect((0, ng_debug_api_1.ngDebugRoutesApiIsSupported)()).toBeTrue();
            globalThis.ng = fakeNgGlobal(core_enums_1.Framework.ACX);
            expect((0, ng_debug_api_1.ngDebugRoutesApiIsSupported)()).toBeTrue();
        });
        it('should NOT support Routes API', () => {
            globalThis.ng = fakeNgGlobal(core_enums_1.Framework.Wiz);
            expect((0, ng_debug_api_1.ngDebugRoutesApiIsSupported)()).toBeFalse();
        });
    });
});
