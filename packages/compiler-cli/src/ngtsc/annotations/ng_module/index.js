"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResolvedModuleWithProviders = exports.createModuleWithProvidersResolver = exports.NgModuleSymbol = exports.NgModuleDecoratorHandler = void 0;
var handler_1 = require("./src/handler");
Object.defineProperty(exports, "NgModuleDecoratorHandler", { enumerable: true, get: function () { return handler_1.NgModuleDecoratorHandler; } });
Object.defineProperty(exports, "NgModuleSymbol", { enumerable: true, get: function () { return handler_1.NgModuleSymbol; } });
var module_with_providers_1 = require("./src/module_with_providers");
Object.defineProperty(exports, "createModuleWithProvidersResolver", { enumerable: true, get: function () { return module_with_providers_1.createModuleWithProvidersResolver; } });
Object.defineProperty(exports, "isResolvedModuleWithProviders", { enumerable: true, get: function () { return module_with_providers_1.isResolvedModuleWithProviders; } });
