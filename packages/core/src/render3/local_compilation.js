"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵgetComponentDepsFactory = ɵɵgetComponentDepsFactory;
const deps_tracker_1 = require("./deps_tracker/deps_tracker");
function ɵɵgetComponentDepsFactory(type, rawImports) {
    return () => {
        try {
            return deps_tracker_1.depsTracker.getComponentDependencies(type, rawImports).dependencies;
        }
        catch (e) {
            console.error(`Computing dependencies in local compilation mode for the component "${type.name}" failed with the exception:`, e);
            throw e;
        }
    };
}
