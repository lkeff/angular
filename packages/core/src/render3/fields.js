"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NG_ENV_ID = exports.NG_ELEMENT_ID = exports.NG_FACTORY_DEF = exports.NG_MOD_DEF = exports.NG_PIPE_DEF = exports.NG_DIR_DEF = exports.NG_COMP_DEF = void 0;
const property_1 = require("../util/property");
exports.NG_COMP_DEF = (0, property_1.getClosureSafeProperty)({ ɵcmp: property_1.getClosureSafeProperty });
exports.NG_DIR_DEF = (0, property_1.getClosureSafeProperty)({ ɵdir: property_1.getClosureSafeProperty });
exports.NG_PIPE_DEF = (0, property_1.getClosureSafeProperty)({ ɵpipe: property_1.getClosureSafeProperty });
exports.NG_MOD_DEF = (0, property_1.getClosureSafeProperty)({ ɵmod: property_1.getClosureSafeProperty });
exports.NG_FACTORY_DEF = (0, property_1.getClosureSafeProperty)({ ɵfac: property_1.getClosureSafeProperty });
/**
 * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
 * the key and the directive's unique ID as the value. This allows us to map directives to their
 * bloom filter bit for DI.
 */
// TODO(misko): This is wrong. The NG_ELEMENT_ID should never be minified.
exports.NG_ELEMENT_ID = (0, property_1.getClosureSafeProperty)({ __NG_ELEMENT_ID__: property_1.getClosureSafeProperty });
/**
 * The `NG_ENV_ID` field on a DI token indicates special processing in the `EnvironmentInjector`:
 * getting such tokens from the `EnvironmentInjector` will bypass the standard DI resolution
 * strategy and instead will return implementation produced by the `NG_ENV_ID` factory function.
 *
 * This particular retrieval of DI tokens is mostly done to eliminate circular dependencies and
 * improve tree-shaking.
 */
exports.NG_ENV_ID = (0, property_1.getClosureSafeProperty)({ __NG_ENV_ID__: property_1.getClosureSafeProperty });
