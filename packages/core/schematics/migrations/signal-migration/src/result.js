"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationResult = void 0;
const typescript_1 = __importDefault(require("typescript"));
/**
 * State of the migration that is passed between
 * the individual phases.
 *
 * The state/phase captures information like:
 *    - list of inputs that are defined in `.ts` and need migration.
 *    - list of references.
 *    - keeps track of computed replacements.
 *    - imports that may need to be updated.
 */
class MigrationResult {
    constructor() {
        this.printer = typescript_1.default.createPrinter({ newLine: typescript_1.default.NewLineKind.LineFeed });
        // May be `null` if the input cannot be converted. This is also
        // signified by an incompatibility- but the input is tracked here as it
        // still is a "source input".
        this.sourceInputs = new Map();
        this.references = [];
        // Execution data
        this.replacements = [];
        this.inputDecoratorSpecifiers = new Map();
    }
}
exports.MigrationResult = MigrationResult;
