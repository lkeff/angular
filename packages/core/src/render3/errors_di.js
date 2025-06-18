"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwCyclicDependencyError = throwCyclicDependencyError;
exports.throwMixedMultiProviderError = throwMixedMultiProviderError;
exports.throwInvalidProviderError = throwInvalidProviderError;
exports.throwProviderNotFoundError = throwProviderNotFoundError;
const provider_1 = require("../di/interface/provider");
const errors_1 = require("../errors");
const stringify_1 = require("../util/stringify");
const stringify_utils_1 = require("./util/stringify_utils");
/** Called when directives inject each other (creating a circular dependency) */
function throwCyclicDependencyError(token, path) {
    throw new errors_1.RuntimeError(-200 /* RuntimeErrorCode.CYCLIC_DI_DEPENDENCY */, ngDevMode
        ? `Circular dependency in DI detected for ${token}${path ? `. Dependency path: ${path.join(' > ')} > ${token}` : ''}`
        : token);
}
function throwMixedMultiProviderError() {
    throw new Error(`Cannot mix multi providers and regular providers`);
}
function throwInvalidProviderError(ngModuleType, providers, provider) {
    if (ngModuleType && providers) {
        const providerDetail = providers.map((v) => (v == provider ? '?' + provider + '?' : '...'));
        throw new Error(`Invalid provider for the NgModule '${(0, stringify_1.stringify)(ngModuleType)}' - only instances of Provider and Type are allowed, got: [${providerDetail.join(', ')}]`);
    }
    else if ((0, provider_1.isEnvironmentProviders)(provider)) {
        if (provider.ɵfromNgModule) {
            throw new errors_1.RuntimeError(207 /* RuntimeErrorCode.PROVIDER_IN_WRONG_CONTEXT */, `Invalid providers from 'importProvidersFrom' present in a non-environment injector. 'importProvidersFrom' can't be used for component providers.`);
        }
        else {
            throw new errors_1.RuntimeError(207 /* RuntimeErrorCode.PROVIDER_IN_WRONG_CONTEXT */, `Invalid providers present in a non-environment injector. 'EnvironmentProviders' can't be used for component providers.`);
        }
    }
    else {
        throw new Error('Invalid provider');
    }
}
/** Throws an error when a token is not found in DI. */
function throwProviderNotFoundError(token, injectorName) {
    const errorMessage = ngDevMode &&
        `No provider for ${(0, stringify_utils_1.stringifyForError)(token)} found${injectorName ? ` in ${injectorName}` : ''}`;
    throw new errors_1.RuntimeError(-201 /* RuntimeErrorCode.PROVIDER_NOT_FOUND */, errorMessage);
}
