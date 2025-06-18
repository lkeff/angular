"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ivyTransformFactory = exports.TraitState = exports.Trait = exports.IvyDeclarationDtsTransform = exports.DtsTransformRegistry = exports.declarationTransformFactory = exports.TraitCompiler = exports.aliasTransformFactory = void 0;
__exportStar(require("./src/api"), exports);
var alias_1 = require("./src/alias");
Object.defineProperty(exports, "aliasTransformFactory", { enumerable: true, get: function () { return alias_1.aliasTransformFactory; } });
var compilation_1 = require("./src/compilation");
Object.defineProperty(exports, "TraitCompiler", { enumerable: true, get: function () { return compilation_1.TraitCompiler; } });
var declaration_1 = require("./src/declaration");
Object.defineProperty(exports, "declarationTransformFactory", { enumerable: true, get: function () { return declaration_1.declarationTransformFactory; } });
Object.defineProperty(exports, "DtsTransformRegistry", { enumerable: true, get: function () { return declaration_1.DtsTransformRegistry; } });
Object.defineProperty(exports, "IvyDeclarationDtsTransform", { enumerable: true, get: function () { return declaration_1.IvyDeclarationDtsTransform; } });
var trait_1 = require("./src/trait");
Object.defineProperty(exports, "Trait", { enumerable: true, get: function () { return trait_1.Trait; } });
Object.defineProperty(exports, "TraitState", { enumerable: true, get: function () { return trait_1.TraitState; } });
var transform_1 = require("./src/transform");
Object.defineProperty(exports, "ivyTransformFactory", { enumerable: true, get: function () { return transform_1.ivyTransformFactory; } });
