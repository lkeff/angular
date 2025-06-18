"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlasterComment = exports.plasterMatcher = exports.regionEndMatcher = exports.regionStartMatcher = void 0;
// These type of comments are used in hash comment based languages such as bash and Yaml
exports.regionStartMatcher = /^\s*#\s*#docregion\s*(.*)\s*$/;
exports.regionEndMatcher = /^\s*#\s*#enddocregion\s*(.*)\s*$/;
exports.plasterMatcher = /^\s*#\s*#docplaster\s*(.*)\s*$/;
const createPlasterComment = (plaster) => `# ${plaster}`;
exports.createPlasterComment = createPlasterComment;
