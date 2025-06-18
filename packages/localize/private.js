"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵtranslate = exports.ɵsplitBlock = exports.ɵparseTranslation = exports.ɵparseMetadata = exports.ɵparseMessage = exports.ɵMissingTranslationError = exports.ɵmakeTemplateObject = exports.ɵmakeParsedTranslation = exports.ɵisMissingTranslationError = exports.ɵfindEndOfBlock = exports.ɵcomputeMsgId = exports.ɵ$localize = void 0;
// This file exports all the `utils` as private exports so that other parts of `@angular/localize`
// can make use of them.
var localize_1 = require("./src/localize");
Object.defineProperty(exports, "\u0275$localize", { enumerable: true, get: function () { return localize_1.$localize; } });
var utils_1 = require("./src/utils");
Object.defineProperty(exports, "\u0275computeMsgId", { enumerable: true, get: function () { return utils_1.computeMsgId; } });
Object.defineProperty(exports, "\u0275findEndOfBlock", { enumerable: true, get: function () { return utils_1.findEndOfBlock; } });
Object.defineProperty(exports, "\u0275isMissingTranslationError", { enumerable: true, get: function () { return utils_1.isMissingTranslationError; } });
Object.defineProperty(exports, "\u0275makeParsedTranslation", { enumerable: true, get: function () { return utils_1.makeParsedTranslation; } });
Object.defineProperty(exports, "\u0275makeTemplateObject", { enumerable: true, get: function () { return utils_1.makeTemplateObject; } });
Object.defineProperty(exports, "\u0275MissingTranslationError", { enumerable: true, get: function () { return utils_1.MissingTranslationError; } });
Object.defineProperty(exports, "\u0275parseMessage", { enumerable: true, get: function () { return utils_1.parseMessage; } });
Object.defineProperty(exports, "\u0275parseMetadata", { enumerable: true, get: function () { return utils_1.parseMetadata; } });
Object.defineProperty(exports, "\u0275parseTranslation", { enumerable: true, get: function () { return utils_1.parseTranslation; } });
Object.defineProperty(exports, "\u0275splitBlock", { enumerable: true, get: function () { return utils_1.splitBlock; } });
Object.defineProperty(exports, "\u0275translate", { enumerable: true, get: function () { return utils_1.translate; } });
