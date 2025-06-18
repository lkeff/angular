"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialEvaluator = void 0;
const interpreter_1 = require("./interpreter");
class PartialEvaluator {
    constructor(host, checker, dependencyTracker) {
        this.host = host;
        this.checker = checker;
        this.dependencyTracker = dependencyTracker;
    }
    evaluate(expr, foreignFunctionResolver) {
        const interpreter = new interpreter_1.StaticInterpreter(this.host, this.checker, this.dependencyTracker);
        const sourceFile = expr.getSourceFile();
        return interpreter.visit(expr, {
            originatingFile: sourceFile,
            absoluteModuleName: null,
            resolutionContext: sourceFile.fileName,
            scope: new Map(),
            foreignFunctionResolver,
        });
    }
}
exports.PartialEvaluator = PartialEvaluator;
