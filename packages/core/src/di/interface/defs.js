"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NG_INJ_DEF = exports.NG_PROV_DEF = exports.defineInjectable = void 0;
exports.ɵɵdefineInjectable = ɵɵdefineInjectable;
exports.ɵɵdefineInjector = ɵɵdefineInjector;
exports.getInjectableDef = getInjectableDef;
exports.isInjectable = isInjectable;
exports.getInheritedInjectableDef = getInheritedInjectableDef;
exports.getInjectorDef = getInjectorDef;
const property_1 = require("../../util/property");
/**
 * Construct an injectable definition which defines how a token will be constructed by the DI
 * system, and in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ɵprov` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call [`inject`](api/core/inject) to access the `Injector` and request injection
 * of dependencies.
 *
 * @codeGenApi
 * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
 */
function ɵɵdefineInjectable(opts) {
    return {
        token: opts.token,
        providedIn: opts.providedIn || null,
        factory: opts.factory,
        value: undefined,
    };
}
/**
 * @deprecated in v8, delete after v10. This API should be used only by generated code, and that
 * code should now use ɵɵdefineInjectable instead.
 * @publicApi
 */
exports.defineInjectable = ɵɵdefineInjectable;
/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has a `ɵprov` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @codeGenApi
 */
function ɵɵdefineInjector(options) {
    return { providers: options.providers || [], imports: options.imports || [] };
}
/**
 * Read the injectable def (`ɵprov`) for `type` in a way which is immune to accidentally reading
 * inherited value.
 *
 * @param type A type which may have its own (non-inherited) `ɵprov`.
 */
function getInjectableDef(type) {
    return getOwnDefinition(type, exports.NG_PROV_DEF);
}
function isInjectable(type) {
    return getInjectableDef(type) !== null;
}
/**
 * Return definition only if it is defined directly on `type` and is not inherited from a base
 * class of `type`.
 */
function getOwnDefinition(type, field) {
    // if the ɵprov prop exist but is undefined we still want to return null
    return (type.hasOwnProperty(field) && type[field]) || null;
}
/**
 * Read the injectable def (`ɵprov`) for `type` or read the `ɵprov` from one of its ancestors.
 *
 * @param type A type which may have `ɵprov`, via inheritance.
 *
 * @deprecated Will be removed in a future version of Angular, where an error will occur in the
 *     scenario if we find the `ɵprov` on an ancestor only.
 */
function getInheritedInjectableDef(type) {
    var _a;
    // if the ɵprov prop exist but is undefined we still want to return null
    const def = (_a = type === null || type === void 0 ? void 0 : type[exports.NG_PROV_DEF]) !== null && _a !== void 0 ? _a : null;
    if (def) {
        ngDevMode &&
            console.warn(`DEPRECATED: DI is instantiating a token "${type.name}" that inherits its @Injectable decorator but does not provide one itself.\n` +
                `This will become an error in a future version of Angular. Please add @Injectable() to the "${type.name}" class.`);
        return def;
    }
    else {
        return null;
    }
}
/**
 * Read the injector def type in a way which is immune to accidentally reading inherited value.
 *
 * @param type type which may have an injector def (`ɵinj`)
 */
function getInjectorDef(type) {
    return type && type.hasOwnProperty(exports.NG_INJ_DEF) ? type[exports.NG_INJ_DEF] : null;
}
exports.NG_PROV_DEF = (0, property_1.getClosureSafeProperty)({ ɵprov: property_1.getClosureSafeProperty });
exports.NG_INJ_DEF = (0, property_1.getClosureSafeProperty)({ ɵinj: property_1.getClosureSafeProperty });
