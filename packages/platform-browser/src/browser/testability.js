"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserGetTestability = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
class BrowserGetTestability {
    addToWindow(registry) {
        core_1.ɵglobal['getAngularTestability'] = (elem, findInAncestors = true) => {
            const testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new core_1.ɵRuntimeError(5103 /* RuntimeErrorCode.TESTABILITY_NOT_FOUND */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    'Could not find testability for element.');
            }
            return testability;
        };
        core_1.ɵglobal['getAllAngularTestabilities'] = () => registry.getAllTestabilities();
        core_1.ɵglobal['getAllAngularRootElements'] = () => registry.getAllRootElements();
        const whenAllStable = (callback) => {
            const testabilities = core_1.ɵglobal['getAllAngularTestabilities']();
            let count = testabilities.length;
            const decrement = function () {
                count--;
                if (count == 0) {
                    callback();
                }
            };
            testabilities.forEach((testability) => {
                testability.whenStable(decrement);
            });
        };
        if (!core_1.ɵglobal['frameworkStabilizers']) {
            core_1.ɵglobal['frameworkStabilizers'] = [];
        }
        core_1.ɵglobal['frameworkStabilizers'].push(whenAllStable);
    }
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        const t = registry.getTestability(elem);
        if (t != null) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if ((0, common_1.ɵgetDOM)().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, elem.host, true);
        }
        return this.findTestabilityInTree(registry, elem.parentElement, true);
    }
}
exports.BrowserGetTestability = BrowserGetTestability;
