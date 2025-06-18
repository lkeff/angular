#!/usr/bin/env node
"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Must be imported first, because Angular decorators throw on load.
require("reflect-metadata");
const file_system_1 = require("../ngtsc/file_system");
const extract_i18n_1 = require("../extract_i18n");
process.title = 'Angular i18n Message Extractor (ng-xi18n)';
const args = process.argv.slice(2);
// We are running the real compiler so run against the real file-system
(0, file_system_1.setFileSystem)(new file_system_1.NodeJSFileSystem());
process.exitCode = (0, extract_i18n_1.mainXi18n)(args);
