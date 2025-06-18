"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgModuleFactory = exports.NgModuleRef = void 0;
/**
 * Represents an instance of an `NgModule` created by an `NgModuleFactory`.
 * Provides access to the `NgModule` instance and related objects.
 *
 * @publicApi
 */
class NgModuleRef {
}
exports.NgModuleRef = NgModuleRef;
/**
 * @publicApi
 *
 * @deprecated
 * This class was mostly used as a part of ViewEngine-based JIT API and is no longer needed in Ivy
 * JIT mode. Angular provides APIs that accept NgModule classes directly (such as
 * [PlatformRef.bootstrapModule](api/core/PlatformRef#bootstrapModule) and
 * [createNgModule](api/core/createNgModule)), consider switching to those APIs instead of
 * using factory-based ones.
 */
class NgModuleFactory {
}
exports.NgModuleFactory = NgModuleFactory;
