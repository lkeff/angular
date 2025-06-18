"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateStatement = exports.translateExpression = exports.TypeScriptAstFactory = exports.createTemplateTail = exports.createTemplateMiddle = exports.attachComments = exports.translateType = exports.TypeEmitter = exports.canEmitType = exports.ExpressionTranslatorVisitor = exports.presetImportManagerForceNamespaceImports = exports.ImportManager = exports.Context = void 0;
var context_1 = require("./src/context");
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return context_1.Context; } });
var import_manager_1 = require("./src/import_manager/import_manager");
Object.defineProperty(exports, "ImportManager", { enumerable: true, get: function () { return import_manager_1.ImportManager; } });
Object.defineProperty(exports, "presetImportManagerForceNamespaceImports", { enumerable: true, get: function () { return import_manager_1.presetImportManagerForceNamespaceImports; } });
var translator_1 = require("./src/translator");
Object.defineProperty(exports, "ExpressionTranslatorVisitor", { enumerable: true, get: function () { return translator_1.ExpressionTranslatorVisitor; } });
var type_emitter_1 = require("./src/type_emitter");
Object.defineProperty(exports, "canEmitType", { enumerable: true, get: function () { return type_emitter_1.canEmitType; } });
Object.defineProperty(exports, "TypeEmitter", { enumerable: true, get: function () { return type_emitter_1.TypeEmitter; } });
var type_translator_1 = require("./src/type_translator");
Object.defineProperty(exports, "translateType", { enumerable: true, get: function () { return type_translator_1.translateType; } });
var typescript_ast_factory_1 = require("./src/typescript_ast_factory");
Object.defineProperty(exports, "attachComments", { enumerable: true, get: function () { return typescript_ast_factory_1.attachComments; } });
Object.defineProperty(exports, "createTemplateMiddle", { enumerable: true, get: function () { return typescript_ast_factory_1.createTemplateMiddle; } });
Object.defineProperty(exports, "createTemplateTail", { enumerable: true, get: function () { return typescript_ast_factory_1.createTemplateTail; } });
Object.defineProperty(exports, "TypeScriptAstFactory", { enumerable: true, get: function () { return typescript_ast_factory_1.TypeScriptAstFactory; } });
var typescript_translator_1 = require("./src/typescript_translator");
Object.defineProperty(exports, "translateExpression", { enumerable: true, get: function () { return typescript_translator_1.translateExpression; } });
Object.defineProperty(exports, "translateStatement", { enumerable: true, get: function () { return typescript_translator_1.translateStatement; } });
