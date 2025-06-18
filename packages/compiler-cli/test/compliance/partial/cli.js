"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_compliance_tests_1 = require("../test_helpers/get_compliance_tests");
const generate_golden_partial_1 = require("./generate_golden_partial");
// TODO(devversion): Remove this when RBE issues are resolved.
// tslint:disable-next-line
console.log('TEMPORARY FOR DEBUGGING: Building golden partial:', process.argv.slice(2));
const [testTsconfigPath, outputPath] = process.argv.slice(2);
(0, generate_golden_partial_1.generateGoldenPartial)(get_compliance_tests_1.fs.resolve(testTsconfigPath), get_compliance_tests_1.fs.resolve(outputPath));
