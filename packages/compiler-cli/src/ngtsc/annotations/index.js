"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipeDecoratorHandler = exports.InjectableDecoratorHandler = exports.NgModuleDecoratorHandler = exports.tryParseSignalQueryFromInitializer = exports.tryParseSignalModelMapping = exports.tryParseSignalInputMapping = exports.tryParseInitializerBasedOutput = exports.tryParseInitializerApi = exports.queryDecoratorNames = exports.QUERY_INITIALIZER_FNS = exports.OUTPUT_INITIALIZER_FNS = exports.MODEL_INITIALIZER_FN = exports.INPUT_INITIALIZER_FN = exports.DirectiveDecoratorHandler = exports.ComponentDecoratorHandler = exports.JitDeclarationRegistry = exports.NoopReferencesRegistry = exports.isAngularDecorator = exports.getAngularDecorators = exports.findAngularDecorator = exports.createForwardRefResolver = void 0;
/// <reference types="node" />
var common_1 = require("./common");
Object.defineProperty(exports, "createForwardRefResolver", { enumerable: true, get: function () { return common_1.createForwardRefResolver; } });
Object.defineProperty(exports, "findAngularDecorator", { enumerable: true, get: function () { return common_1.findAngularDecorator; } });
Object.defineProperty(exports, "getAngularDecorators", { enumerable: true, get: function () { return common_1.getAngularDecorators; } });
Object.defineProperty(exports, "isAngularDecorator", { enumerable: true, get: function () { return common_1.isAngularDecorator; } });
Object.defineProperty(exports, "NoopReferencesRegistry", { enumerable: true, get: function () { return common_1.NoopReferencesRegistry; } });
Object.defineProperty(exports, "JitDeclarationRegistry", { enumerable: true, get: function () { return common_1.JitDeclarationRegistry; } });
var component_1 = require("./component");
Object.defineProperty(exports, "ComponentDecoratorHandler", { enumerable: true, get: function () { return component_1.ComponentDecoratorHandler; } });
var directive_1 = require("./directive");
Object.defineProperty(exports, "DirectiveDecoratorHandler", { enumerable: true, get: function () { return directive_1.DirectiveDecoratorHandler; } });
Object.defineProperty(exports, "INPUT_INITIALIZER_FN", { enumerable: true, get: function () { return directive_1.INPUT_INITIALIZER_FN; } });
Object.defineProperty(exports, "MODEL_INITIALIZER_FN", { enumerable: true, get: function () { return directive_1.MODEL_INITIALIZER_FN; } });
Object.defineProperty(exports, "OUTPUT_INITIALIZER_FNS", { enumerable: true, get: function () { return directive_1.OUTPUT_INITIALIZER_FNS; } });
Object.defineProperty(exports, "QUERY_INITIALIZER_FNS", { enumerable: true, get: function () { return directive_1.QUERY_INITIALIZER_FNS; } });
Object.defineProperty(exports, "queryDecoratorNames", { enumerable: true, get: function () { return directive_1.queryDecoratorNames; } });
Object.defineProperty(exports, "tryParseInitializerApi", { enumerable: true, get: function () { return directive_1.tryParseInitializerApi; } });
Object.defineProperty(exports, "tryParseInitializerBasedOutput", { enumerable: true, get: function () { return directive_1.tryParseInitializerBasedOutput; } });
Object.defineProperty(exports, "tryParseSignalInputMapping", { enumerable: true, get: function () { return directive_1.tryParseSignalInputMapping; } });
Object.defineProperty(exports, "tryParseSignalModelMapping", { enumerable: true, get: function () { return directive_1.tryParseSignalModelMapping; } });
Object.defineProperty(exports, "tryParseSignalQueryFromInitializer", { enumerable: true, get: function () { return directive_1.tryParseSignalQueryFromInitializer; } });
var ng_module_1 = require("./ng_module");
Object.defineProperty(exports, "NgModuleDecoratorHandler", { enumerable: true, get: function () { return ng_module_1.NgModuleDecoratorHandler; } });
var injectable_1 = require("./src/injectable");
Object.defineProperty(exports, "InjectableDecoratorHandler", { enumerable: true, get: function () { return injectable_1.InjectableDecoratorHandler; } });
var pipe_1 = require("./src/pipe");
Object.defineProperty(exports, "PipeDecoratorHandler", { enumerable: true, get: function () { return pipe_1.PipeDecoratorHandler; } });
