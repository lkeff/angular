"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewRef = exports.EmbeddedViewRef = exports.ViewContainerRef = exports.TemplateRef = exports.QueryList = exports.getNgModuleById = exports.getModuleFactory = exports.NgModuleRef = exports.NgModuleFactory = exports.ElementRef = exports.DestroyRef = exports.ComponentFactoryResolver = exports.ComponentRef = exports.ComponentFactory = exports.ModuleWithComponentFactories = exports.CompilerFactory = exports.COMPILER_OPTIONS = exports.Compiler = void 0;
// Public API for compiler
var compiler_1 = require("./linker/compiler");
Object.defineProperty(exports, "Compiler", { enumerable: true, get: function () { return compiler_1.Compiler; } });
Object.defineProperty(exports, "COMPILER_OPTIONS", { enumerable: true, get: function () { return compiler_1.COMPILER_OPTIONS; } });
Object.defineProperty(exports, "CompilerFactory", { enumerable: true, get: function () { return compiler_1.CompilerFactory; } });
Object.defineProperty(exports, "ModuleWithComponentFactories", { enumerable: true, get: function () { return compiler_1.ModuleWithComponentFactories; } });
var component_factory_1 = require("./linker/component_factory");
Object.defineProperty(exports, "ComponentFactory", { enumerable: true, get: function () { return component_factory_1.ComponentFactory; } });
Object.defineProperty(exports, "ComponentRef", { enumerable: true, get: function () { return component_factory_1.ComponentRef; } });
var component_factory_resolver_1 = require("./linker/component_factory_resolver");
Object.defineProperty(exports, "ComponentFactoryResolver", { enumerable: true, get: function () { return component_factory_resolver_1.ComponentFactoryResolver; } });
var destroy_ref_1 = require("./linker/destroy_ref");
Object.defineProperty(exports, "DestroyRef", { enumerable: true, get: function () { return destroy_ref_1.DestroyRef; } });
var element_ref_1 = require("./linker/element_ref");
Object.defineProperty(exports, "ElementRef", { enumerable: true, get: function () { return element_ref_1.ElementRef; } });
var ng_module_factory_1 = require("./linker/ng_module_factory");
Object.defineProperty(exports, "NgModuleFactory", { enumerable: true, get: function () { return ng_module_factory_1.NgModuleFactory; } });
Object.defineProperty(exports, "NgModuleRef", { enumerable: true, get: function () { return ng_module_factory_1.NgModuleRef; } });
var ng_module_factory_loader_1 = require("./linker/ng_module_factory_loader");
Object.defineProperty(exports, "getModuleFactory", { enumerable: true, get: function () { return ng_module_factory_loader_1.getModuleFactory; } });
Object.defineProperty(exports, "getNgModuleById", { enumerable: true, get: function () { return ng_module_factory_loader_1.getNgModuleById; } });
var query_list_1 = require("./linker/query_list");
Object.defineProperty(exports, "QueryList", { enumerable: true, get: function () { return query_list_1.QueryList; } });
var template_ref_1 = require("./linker/template_ref");
Object.defineProperty(exports, "TemplateRef", { enumerable: true, get: function () { return template_ref_1.TemplateRef; } });
var view_container_ref_1 = require("./linker/view_container_ref");
Object.defineProperty(exports, "ViewContainerRef", { enumerable: true, get: function () { return view_container_ref_1.ViewContainerRef; } });
var view_ref_1 = require("./linker/view_ref");
Object.defineProperty(exports, "EmbeddedViewRef", { enumerable: true, get: function () { return view_ref_1.EmbeddedViewRef; } });
Object.defineProperty(exports, "ViewRef", { enumerable: true, get: function () { return view_ref_1.ViewRef; } });
