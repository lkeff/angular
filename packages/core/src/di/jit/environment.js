"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularCoreDiEnv = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const forward_ref_1 = require("../forward_ref");
const injector_compatibility_1 = require("../injector_compatibility");
const defs_1 = require("../interface/defs");
/**
 * A mapping of the @angular/core API surface used in generated expressions to the actual symbols.
 *
 * This should be kept up to date with the public exports of @angular/core.
 */
exports.angularCoreDiEnv = {
    'ɵɵdefineInjectable': defs_1.ɵɵdefineInjectable,
    'ɵɵdefineInjector': defs_1.ɵɵdefineInjector,
    'ɵɵinject': injector_compatibility_1.ɵɵinject,
    'ɵɵinvalidFactoryDep': injector_compatibility_1.ɵɵinvalidFactoryDep,
    'resolveForwardRef': forward_ref_1.resolveForwardRef,
};
