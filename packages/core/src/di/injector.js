"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
const create_injector_1 = require("./create_injector");
const injector_compatibility_1 = require("./injector_compatibility");
const injector_token_1 = require("./injector_token");
const defs_1 = require("./interface/defs");
const null_injector_1 = require("./null_injector");
/**
 * Concrete injectors implement this interface. Injectors are configured
 * with [providers](guide/di/dependency-injection-providers) that associate
 * dependencies of various types with [injection tokens](guide/di/dependency-injection-providers).
 *
 * @see [DI Providers](guide/di/dependency-injection-providers).
 * @see {@link StaticProvider}
 *
 * @usageNotes
 *
 *  The following example creates a service injector instance.
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Usage example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @publicApi
 */
class Injector {
    static create(options, parent) {
        var _a;
        if (Array.isArray(options)) {
            return (0, create_injector_1.createInjector)({ name: '' }, parent, options, '');
        }
        else {
            const name = (_a = options.name) !== null && _a !== void 0 ? _a : '';
            return (0, create_injector_1.createInjector)({ name }, options.parent, options.providers, name);
        }
    }
}
exports.Injector = Injector;
Injector.THROW_IF_NOT_FOUND = injector_compatibility_1.THROW_IF_NOT_FOUND;
Injector.NULL = new null_injector_1.NullInjector();
/** @nocollapse */
Injector.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: Injector,
    providedIn: 'any',
    factory: () => (0, injector_compatibility_1.ɵɵinject)(injector_token_1.INJECTOR),
});
/**
 * @internal
 * @nocollapse
 */
Injector.__NG_ELEMENT_ID__ = -1 /* InjectorMarkers.Injector */;
