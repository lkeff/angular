"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnTypeFfr = exports.arrowReturnValueFfr = void 0;
exports.makeExpression = makeExpression;
exports.makeEvaluator = makeEvaluator;
exports.evaluate = evaluate;
exports.owningModuleOf = owningModuleOf;
exports.firstArgFfr = firstArgFfr;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const reflection_1 = require("../../reflection");
const testing_1 = require("../../testing");
const interface_1 = require("../src/interface");
function makeExpression(code, expr, supportingFiles = []) {
    const { program, options, host } = (0, testing_1.makeProgram)([
        { name: (0, file_system_1.absoluteFrom)('/entry.ts'), contents: `${code}; const target$ = ${expr};` },
        ...supportingFiles,
    ]);
    const checker = program.getTypeChecker();
    const decl = (0, testing_1.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/entry.ts'), 'target$', typescript_1.default.isVariableDeclaration);
    return {
        expression: decl.initializer,
        host,
        options,
        checker,
        program,
    };
}
function makeEvaluator(checker, tracker) {
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
    return new interface_1.PartialEvaluator(reflectionHost, checker, tracker !== undefined ? tracker : null);
}
function evaluate(code, expr, supportingFiles = [], foreignFunctionResolver) {
    const { expression, checker } = makeExpression(code, expr, supportingFiles);
    const evaluator = makeEvaluator(checker);
    return evaluator.evaluate(expression, foreignFunctionResolver);
}
function owningModuleOf(ref) {
    return ref.bestGuessOwningModule !== null ? ref.bestGuessOwningModule.specifier : null;
}
function firstArgFfr(fn, expr, resolve) {
    return resolve(expr.arguments[0]);
}
const arrowReturnValueFfr = (_fn, node, resolve) => {
    // Extracts the `Foo` from `() => Foo`.
    return resolve(node.arguments[0].body);
};
exports.arrowReturnValueFfr = arrowReturnValueFfr;
const returnTypeFfr = (fn, node, resolve) => {
    // Extract the `Foo` from the return type of the `external` function declaration.
    return resolve(fn.node.type.typeName);
};
exports.returnTypeFfr = returnTypeFfr;
