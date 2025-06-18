"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewEncapsulation = exports.NO_ERRORS_SCHEMA = exports.CUSTOM_ELEMENTS_SCHEMA = exports.NgModule = exports.Pipe = exports.Output = exports.Input = exports.HostListener = exports.HostBinding = exports.Directive = exports.Component = exports.ViewChildren = exports.ViewChild = exports.Query = exports.ContentChildren = exports.ContentChild = exports.Attribute = void 0;
/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
var metadata_attr_1 = require("./di/metadata_attr");
Object.defineProperty(exports, "Attribute", { enumerable: true, get: function () { return metadata_attr_1.Attribute; } });
var di_1 = require("./metadata/di");
Object.defineProperty(exports, "ContentChild", { enumerable: true, get: function () { return di_1.ContentChild; } });
Object.defineProperty(exports, "ContentChildren", { enumerable: true, get: function () { return di_1.ContentChildren; } });
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return di_1.Query; } });
Object.defineProperty(exports, "ViewChild", { enumerable: true, get: function () { return di_1.ViewChild; } });
Object.defineProperty(exports, "ViewChildren", { enumerable: true, get: function () { return di_1.ViewChildren; } });
var directives_1 = require("./metadata/directives");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return directives_1.Component; } });
Object.defineProperty(exports, "Directive", { enumerable: true, get: function () { return directives_1.Directive; } });
Object.defineProperty(exports, "HostBinding", { enumerable: true, get: function () { return directives_1.HostBinding; } });
Object.defineProperty(exports, "HostListener", { enumerable: true, get: function () { return directives_1.HostListener; } });
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return directives_1.Input; } });
Object.defineProperty(exports, "Output", { enumerable: true, get: function () { return directives_1.Output; } });
Object.defineProperty(exports, "Pipe", { enumerable: true, get: function () { return directives_1.Pipe; } });
var ng_module_1 = require("./metadata/ng_module");
Object.defineProperty(exports, "NgModule", { enumerable: true, get: function () { return ng_module_1.NgModule; } });
var schema_1 = require("./metadata/schema");
Object.defineProperty(exports, "CUSTOM_ELEMENTS_SCHEMA", { enumerable: true, get: function () { return schema_1.CUSTOM_ELEMENTS_SCHEMA; } });
Object.defineProperty(exports, "NO_ERRORS_SCHEMA", { enumerable: true, get: function () { return schema_1.NO_ERRORS_SCHEMA; } });
var view_1 = require("./metadata/view");
Object.defineProperty(exports, "ViewEncapsulation", { enumerable: true, get: function () { return view_1.ViewEncapsulation; } });
