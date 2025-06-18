"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShimReferenceTagger = exports.untagTsFile = exports.untagAllTsFiles = exports.sfExtensionData = exports.retagTsFile = exports.retagAllTsFiles = exports.isShim = exports.copyFileShimData = exports.ShimAdapter = void 0;
/// <reference types="node" />
var adapter_1 = require("./src/adapter");
Object.defineProperty(exports, "ShimAdapter", { enumerable: true, get: function () { return adapter_1.ShimAdapter; } });
var expando_1 = require("./src/expando");
Object.defineProperty(exports, "copyFileShimData", { enumerable: true, get: function () { return expando_1.copyFileShimData; } });
Object.defineProperty(exports, "isShim", { enumerable: true, get: function () { return expando_1.isShim; } });
Object.defineProperty(exports, "retagAllTsFiles", { enumerable: true, get: function () { return expando_1.retagAllTsFiles; } });
Object.defineProperty(exports, "retagTsFile", { enumerable: true, get: function () { return expando_1.retagTsFile; } });
Object.defineProperty(exports, "sfExtensionData", { enumerable: true, get: function () { return expando_1.sfExtensionData; } });
Object.defineProperty(exports, "untagAllTsFiles", { enumerable: true, get: function () { return expando_1.untagAllTsFiles; } });
Object.defineProperty(exports, "untagTsFile", { enumerable: true, get: function () { return expando_1.untagTsFile; } });
var reference_tagger_1 = require("./src/reference_tagger");
Object.defineProperty(exports, "ShimReferenceTagger", { enumerable: true, get: function () { return reference_tagger_1.ShimReferenceTagger; } });
