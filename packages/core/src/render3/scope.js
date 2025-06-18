"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵsetComponentScope = ɵɵsetComponentScope;
exports.ɵɵsetNgModuleScope = ɵɵsetNgModuleScope;
const forward_ref_1 = require("../di/forward_ref");
const array_utils_1 = require("../util/array_utils");
const closure_1 = require("../util/closure");
const empty_1 = require("../util/empty");
const def_getters_1 = require("./def_getters");
const definition_1 = require("./definition");
const deps_tracker_1 = require("./deps_tracker/deps_tracker");
const util_1 = require("./jit/util");
/**
 * Generated next to NgModules to monkey-patch directive and pipe references onto a component's
 * definition, when generating a direct reference in the component file would otherwise create an
 * import cycle.
 *
 * See [this explanation](https://hackmd.io/Odw80D0pR6yfsOjg_7XCJg?view) for more details.
 *
 * @codeGenApi
 */
function ɵɵsetComponentScope(type, directives, pipes) {
    const def = type.ɵcmp;
    def.directiveDefs = (0, definition_1.extractDefListOrFactory)(directives, /* pipeDef */ false);
    def.pipeDefs = (0, definition_1.extractDefListOrFactory)(pipes, /* pipeDef */ true);
}
/**
 * Adds the module metadata that is necessary to compute the module's transitive scope to an
 * existing module definition.
 *
 * Scope metadata of modules is not used in production builds, so calls to this function can be
 * marked pure to tree-shake it from the bundle, allowing for all referenced declarations
 * to become eligible for tree-shaking as well.
 *
 * @codeGenApi
 */
function ɵɵsetNgModuleScope(type, scope) {
    return (0, closure_1.noSideEffects)(() => {
        const ngModuleDef = (0, def_getters_1.getNgModuleDefOrThrow)(type);
        ngModuleDef.declarations = convertToTypeArray(scope.declarations || empty_1.EMPTY_ARRAY);
        ngModuleDef.imports = convertToTypeArray(scope.imports || empty_1.EMPTY_ARRAY);
        ngModuleDef.exports = convertToTypeArray(scope.exports || empty_1.EMPTY_ARRAY);
        if (scope.bootstrap) {
            // This only happens in local compilation mode.
            ngModuleDef.bootstrap = convertToTypeArray(scope.bootstrap);
        }
        deps_tracker_1.depsTracker.registerNgModule(type, scope);
    });
}
function convertToTypeArray(values) {
    if (typeof values === 'function') {
        return values;
    }
    const flattenValues = (0, array_utils_1.flatten)(values);
    if (flattenValues.some(forward_ref_1.isForwardRef)) {
        return () => flattenValues.map(forward_ref_1.resolveForwardRef).map(maybeUnwrapModuleWithProviders);
    }
    else {
        return flattenValues.map(maybeUnwrapModuleWithProviders);
    }
}
function maybeUnwrapModuleWithProviders(value) {
    return (0, util_1.isModuleWithProviders)(value) ? value.ngModule : value;
}
