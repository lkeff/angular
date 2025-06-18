"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const builder_1 = require("./builder");
const [exampleDir, tmpDir, templateDir, outputFilePath] = process.argv.slice(2);
const htmlOutputContent = await (0, builder_1.generateStackblitzExample)(exampleDir, tmpDir, templateDir);
(0, fs_1.writeFileSync)(outputFilePath, htmlOutputContent, { encoding: 'utf8' });
