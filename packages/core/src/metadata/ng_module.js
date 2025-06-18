"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgModule = void 0;
const module_1 = require("../render3/jit/module");
const decorators_1 = require("../util/decorators");
/**
 * @Annotation
 */
exports.NgModule = (0, decorators_1.makeDecorator)('NgModule', (ngModule) => ngModule, undefined, undefined, 
/**
 * Decorator that marks the following class as an NgModule, and supplies
 * configuration metadata for it.
 *
 * * The `declarations` option configures the compiler
 * with information about what belongs to the NgModule.
 * * The `providers` options configures the NgModule's injector to provide
 * dependencies the NgModule members.
 * * The `imports` and `exports` options bring in members from other modules, and make
 * this module's members available to others.
 */
(type, meta) => (0, module_1.compileNgModule)(type, meta));
