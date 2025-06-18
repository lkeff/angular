"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInjector = createInjector;
exports.createInjectorWithoutInjectorInstances = createInjectorWithoutInjectorInstances;
const empty_1 = require("../util/empty");
const stringify_1 = require("../util/stringify");
const provider_collection_1 = require("./provider_collection");
const r3_injector_1 = require("./r3_injector");
/**
 * Create a new `Injector` which is configured using a `defType` of `InjectorType<any>`s.
 */
function createInjector(defType, parent = null, additionalProviders = null, name) {
    const injector = createInjectorWithoutInjectorInstances(defType, parent, additionalProviders, name);
    injector.resolveInjectorInitializers();
    return injector;
}
/**
 * Creates a new injector without eagerly resolving its injector types. Can be used in places
 * where resolving the injector types immediately can lead to an infinite loop. The injector types
 * should be resolved at a later point by calling `_resolveInjectorDefTypes`.
 */
function createInjectorWithoutInjectorInstances(defType, parent = null, additionalProviders = null, name, scopes = new Set()) {
    const providers = [additionalProviders || empty_1.EMPTY_ARRAY, (0, provider_collection_1.importProvidersFrom)(defType)];
    name = name || (typeof defType === 'object' ? undefined : (0, stringify_1.stringify)(defType));
    return new r3_injector_1.R3Injector(providers, parent || (0, r3_injector_1.getNullInjector)(), name || null, scopes);
}
