"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = exports.compileInjectable = void 0;
const decorators_1 = require("../util/decorators");
const injectable_1 = require("./jit/injectable");
Object.defineProperty(exports, "compileInjectable", { enumerable: true, get: function () { return injectable_1.compileInjectable; } });
/**
 * Injectable decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.Injectable = (0, decorators_1.makeDecorator)('Injectable', undefined, undefined, undefined, (type, meta) => (0, injectable_1.compileInjectable)(type, meta));
