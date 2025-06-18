"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_LOCALE = void 0;
/**
 * Base locale used as foundation for other locales. For example: A base locale allows
 * generation of a file containing all currencies with their corresponding symbols. If we
 * generate other locales, they can override currency symbols which are different in the base
 * locale. This means that we do not need re-generate all currencies w/ symbols multiple times,
 * and allows us to reduce the locale data payload as the base locale is always included.
 * */
exports.BASE_LOCALE = 'en';
