"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToCanMatch = mapToCanMatch;
exports.mapToCanActivate = mapToCanActivate;
exports.mapToCanActivateChild = mapToCanActivateChild;
exports.mapToCanDeactivate = mapToCanDeactivate;
exports.mapToResolve = mapToResolve;
const core_1 = require("@angular/core");
/**
 * Maps an array of injectable classes with canMatch functions to an array of equivalent
 * `CanMatchFn` for use in a `Route` definition.
 *
 * Usage {@example router/utils/functional_guards.ts region='CanActivate'}
 *
 * @publicApi
 * @see {@link Route}
 */
function mapToCanMatch(providers) {
    return providers.map((provider) => (...params) => (0, core_1.inject)(provider).canMatch(...params));
}
/**
 * Maps an array of injectable classes with canActivate functions to an array of equivalent
 * `CanActivateFn` for use in a `Route` definition.
 *
 * Usage {@example router/utils/functional_guards.ts region='CanActivate'}
 *
 * @publicApi
 * @see {@link Route}
 */
function mapToCanActivate(providers) {
    return providers.map((provider) => (...params) => (0, core_1.inject)(provider).canActivate(...params));
}
/**
 * Maps an array of injectable classes with canActivateChild functions to an array of equivalent
 * `CanActivateChildFn` for use in a `Route` definition.
 *
 * Usage {@example router/utils/functional_guards.ts region='CanActivate'}
 *
 * @publicApi
 * @see {@link Route}
 */
function mapToCanActivateChild(providers) {
    return providers.map((provider) => (...params) => (0, core_1.inject)(provider).canActivateChild(...params));
}
/**
 * Maps an array of injectable classes with canDeactivate functions to an array of equivalent
 * `CanDeactivateFn` for use in a `Route` definition.
 *
 * Usage {@example router/utils/functional_guards.ts region='CanActivate'}
 *
 * @publicApi
 * @see {@link Route}
 */
function mapToCanDeactivate(providers) {
    return providers.map((provider) => (...params) => (0, core_1.inject)(provider).canDeactivate(...params));
}
/**
 * Maps an injectable class with a resolve function to an equivalent `ResolveFn`
 * for use in a `Route` definition.
 *
 * Usage {@example router/utils/functional_guards.ts region='Resolve'}
 *
 * @publicApi
 * @see {@link Route}
 */
function mapToResolve(provider) {
    return (...params) => (0, core_1.inject)(provider).resolve(...params);
}
