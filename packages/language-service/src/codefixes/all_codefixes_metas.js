"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_CODE_FIXES_METAS = void 0;
const fix_invalid_banana_in_box_1 = require("./fix_invalid_banana_in_box");
const fix_missing_import_1 = require("./fix_missing_import");
const fix_missing_member_1 = require("./fix_missing_member");
const fix_unused_standalone_imports_1 = require("./fix_unused_standalone_imports");
exports.ALL_CODE_FIXES_METAS = [
    fix_missing_member_1.missingMemberMeta,
    fix_invalid_banana_in_box_1.fixInvalidBananaInBoxMeta,
    fix_missing_import_1.missingImportMeta,
    fix_unused_standalone_imports_1.fixUnusedStandaloneImportsMeta,
];
